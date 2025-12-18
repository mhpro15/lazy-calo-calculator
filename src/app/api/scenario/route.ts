import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type ScenarioResponse =
  | {
      matched: true;
      scenario: {
        slug: string;
        title: string;
        iconKey: string;
        foodType: "MEAL" | "SNACK" | "DRINK";
        questions: Array<{
          id: string;
          text: string;
          options: Array<{ label: string; value: number }>;
        }>;
      };
      roasts: {
        dishRoast: string | null;
        questionIntroById: Record<string, string[]>;
        optionRoastByKey: Record<string, string[]>;
      };
    }
  | {
      matched: false;
      roasts: {
        dishRoast: string | null;
        questionIntroById: Record<string, string[]>;
        optionRoastByKey: Record<string, string[]>;
      };
    };

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function pick(seed: number, items: Array<{ text: string }>) {
  if (items.length === 0) return null;
  return items[Math.abs(seed) % items.length].text;
}

function pickRandom(items: Array<{ text: string }>) {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)].text;
}

async function getDishRoast(dish: string) {
  const seed = dish.length;
  const rows = await prisma.roastLine.findMany({
    where: { scope: "DISH" },
    select: { dishKey: true, text: true, order: true },
    orderBy: { order: "asc" },
  });

  const dishLower = normalize(dish);
  const specific = rows
    .filter(
      (r: (typeof rows)[0]) =>
        r.dishKey && dishLower.includes(normalize(r.dishKey))
    )
    .sort((a, b) => (b.dishKey?.length ?? 0) - (a.dishKey?.length ?? 0));

  const chosenPool =
    specific.length > 0 ? specific : rows.filter((r) => !r.dishKey);
  // Randomized per request so users don't see the same opener forever.
  const line = pickRandom(chosenPool) ?? pick(seed, chosenPool);
  return line ? line.replaceAll("{dish}", dish.trim()) : null;
}

async function getRoastPack(args: {
  dish: string;
  foodType: "MEAL" | "SNACK" | "DRINK";
  questionKeys: string[];
}) {
  const rows = await prisma.roastLine.findMany({
    where: {
      scope: { in: ["QUESTION", "OPTION"] },
      questionKey: { in: args.questionKeys },
      OR: [{ foodType: null }, { foodType: args.foodType }],
    },
    select: {
      scope: true,
      questionKey: true,
      optionLabel: true,
      text: true,
      order: true,
    },
    orderBy: { order: "asc" },
  });

  const questionIntroById: Record<string, string[]> = {};
  const optionRoastByKey: Record<string, string[]> = {};

  for (const q of args.questionKeys) {
    const qRows = rows.filter(
      (r) => r.scope === "QUESTION" && r.questionKey === q
    );
    const lines = qRows.map((r) => r.text).filter(Boolean);
    if (lines.length > 0) questionIntroById[q] = lines;
  }

  const optionRows = rows.filter(
    (r) => r.scope === "OPTION" && r.questionKey && r.optionLabel
  );
  for (const r of optionRows) {
    const key = `${r.questionKey}|${r.optionLabel}`;
    optionRoastByKey[key] ??= [];
    optionRoastByKey[key].push(r.text);
  }

  return {
    dishRoast: await getDishRoast(args.dish),
    questionIntroById,
    optionRoastByKey,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dish = normalize(url.searchParams.get("dish") ?? "");

  if (!dish) {
    return NextResponse.json<ScenarioResponse>(
      {
        matched: false,
        roasts: {
          dishRoast: null,
          questionIntroById: {},
          optionRoastByKey: {},
        },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const scenarios = await prisma.scenario.findMany({
    select: {
      slug: true,
      title: true,
      iconKey: true,
      foodType: true,
      keywords: { select: { value: true } },
      questions: {
        orderBy: { order: "asc" },
        select: {
          key: true,
          text: true,
          options: {
            orderBy: { order: "asc" },
            select: { label: true, value: true },
          },
        },
      },
    },
  });

  const matched = scenarios.find((s) =>
    s.keywords.some((k) => dish.includes(normalize(k.value)))
  );

  if (!matched) {
    return NextResponse.json<ScenarioResponse>(
      {
        matched: false,
        roasts: {
          dishRoast: await getDishRoast(dish),
          questionIntroById: {},
          optionRoastByKey: {},
        },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const questionKeys = matched.questions.map((q) => q.key);
  const roasts = await getRoastPack({
    dish,
    foodType: matched.foodType,
    questionKeys,
  });

  return NextResponse.json<ScenarioResponse>(
    {
      matched: true,
      scenario: {
        slug: matched.slug,
        title: matched.title,
        iconKey: matched.iconKey,
        foodType: matched.foodType,
        questions: matched.questions.map((q) => ({
          id: q.key,
          text: q.text,
          options: q.options,
        })),
      },
      roasts,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
