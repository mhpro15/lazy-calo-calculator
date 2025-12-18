import "dotenv/config";
import { FoodType, PrismaClient, RoastScope } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { buildRoastSeeds } from "./seeds/roasts";
import { listScenarioSlugs, pickScenarioSeeds } from "./seeds/scenarios";
import type { SeedScenario } from "./seeds/types";

const connectionString =
  process.env.DATABASE_URL ?? process.env.DIRECT_URL ?? "";

if (!connectionString) {
  throw new Error(
    "Missing DATABASE_URL (or DIRECT_URL). Set it in your .env before running the seed."
  );
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
  log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
});

type CliOptions = {
  list: boolean;
  scenarios: string[] | null;
  seedScenarios: boolean;
  seedRoasts: boolean;
};

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    list: false,
    scenarios: null,
    seedScenarios: true,
    seedRoasts: true,
  };

  const slugs: string[] = [];

  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--list") {
      options.list = true;
      continue;
    }

    if (a === "--roasts-only") {
      options.seedScenarios = false;
      options.seedRoasts = true;
      continue;
    }

    if (a === "--scenarios-only") {
      options.seedScenarios = true;
      options.seedRoasts = false;
      continue;
    }

    if (a === "--scenario") {
      const v = argv[i + 1];
      if (v) {
        slugs.push(v);
        i += 1;
      }
      continue;
    }

    if (a === "--scenarios") {
      const v = argv[i + 1];
      if (v) {
        slugs.push(...v.split(","));
        i += 1;
      }
      continue;
    }
  }

  const cleaned = slugs.map((s) => s.trim()).filter(Boolean);
  options.scenarios = cleaned.length > 0 ? cleaned : null;

  return options;
}

async function upsertScenario(seed: SeedScenario) {
  // Upsert scenario shell
  const scenario = await prisma.scenario.upsert({
    where: { slug: seed.slug },
    update: {
      title: seed.title,
      iconKey: seed.iconKey,
      foodType: seed.foodType,
    },
    create: {
      slug: seed.slug,
      title: seed.title,
      iconKey: seed.iconKey,
      foodType: seed.foodType,
    },
  });

  // Replace keywords/questions/options for a clean, deterministic seed
  await prisma.scenarioKeyword.deleteMany({
    where: { scenarioId: scenario.id },
  });
  await prisma.option.deleteMany({
    where: { question: { scenarioId: scenario.id } },
  });
  await prisma.question.deleteMany({ where: { scenarioId: scenario.id } });

  await prisma.scenarioKeyword.createMany({
    data: seed.keywords.map((value) => ({ scenarioId: scenario.id, value })),
  });

  for (let qIndex = 0; qIndex < seed.questions.length; qIndex += 1) {
    const q = seed.questions[qIndex];
    const question = await prisma.question.create({
      data: {
        scenarioId: scenario.id,
        key: q.id,
        text: q.text,
        order: qIndex,
      },
    });

    await prisma.option.createMany({
      data: q.options.map((o, oIndex) => ({
        questionId: question.id,
        label: o.label,
        value: o.value,
        order: oIndex,
      })),
    });
  }
}

async function seedScenarios(slugs: string[] | null) {
  const picked = pickScenarioSeeds(slugs);
  if (slugs && slugs.length > 0 && picked.length === 0) {
    throw new Error(
      `No scenario seeds matched: ${slugs.join(
        ", "
      )}. Available: ${listScenarioSlugs().join(", ")}`
    );
  }

  for (const seed of picked) {
    console.log(`Seeding scenario: ${seed.slug}`);
    await upsertScenario(seed);
  }

  return picked.length;
}

async function seedRoasts() {
  const roastSeeds = buildRoastSeeds();
  await prisma.roastLine.deleteMany();
  await prisma.roastLine.createMany({
    data: roastSeeds.map((r, idx) => ({
      scope: r.scope as RoastScope,
      foodType: (r.foodType ?? null) as FoodType | null,
      dishKey: r.dishKey ?? null,
      questionKey: r.questionKey ?? null,
      optionLabel: r.optionLabel ?? null,
      text: r.text,
      order: r.order ?? idx,
    })),
  });

  return roastSeeds.length;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.list) {
    console.log(listScenarioSlugs().join("\n"));
    return;
  }

  let scenarioCount = 0;
  let roastCount = 0;

  if (opts.seedScenarios) {
    scenarioCount = await seedScenarios(opts.scenarios);
  }

  if (opts.seedRoasts) {
    roastCount = await seedRoasts();
  }

  console.log(
    `Seed complete. Scenarios: ${scenarioCount}${
      opts.seedScenarios ? "" : " (skipped)"
    }. Roasts: ${roastCount}${opts.seedRoasts ? "" : " (skipped)"}.`
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
