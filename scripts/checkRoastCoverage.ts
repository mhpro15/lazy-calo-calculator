import { SCENARIO_SEEDS } from "../prisma/seeds/scenarios";
import {
  questionIntroRoasts,
  optionClickRoasts,
  dishRecognitionRoasts,
} from "../src/app/data/roasts";

type RoastValue = string | string[] | null | undefined;

function toLines(value: RoastValue): string[] {
  if (!value) return [];
  if (typeof value === "string") return value.trim() ? [value] : [];
  if (Array.isArray(value))
    return value.filter((v) => typeof v === "string" && v.trim());
  return [];
}

function main() {
  const questionKeys = new Set<string>();
  const optionKeys = new Set<string>();
  const scenarioSlugs: string[] = [];

  for (const s of SCENARIO_SEEDS) {
    scenarioSlugs.push(s.slug);
    for (const q of s.questions) {
      questionKeys.add(q.id);
      for (const o of q.options) {
        optionKeys.add(`${q.id}|${o.label}`);
      }
    }
  }

  const missingQuestionIntro: string[] = [];
  for (const q of [...questionKeys].sort()) {
    const lines = toLines(
      (questionIntroRoasts as Record<string, RoastValue>)[q]
    );
    if (lines.length === 0) missingQuestionIntro.push(q);
  }

  const missingOptionRoasts: string[] = [];
  for (const ok of [...optionKeys].sort()) {
    const lines = toLines(
      (optionClickRoasts as Record<string, RoastValue>)[ok]
    );
    if (lines.length === 0) missingOptionRoasts.push(ok);
  }

  const missingDishKeysForScenarios: string[] = [];
  for (const s of SCENARIO_SEEDS) {
    const keyGuess = s.title.trim().toLowerCase();
    const has = Object.keys(dishRecognitionRoasts).some(
      (k) => k !== "generic" && keyGuess.includes(k.toLowerCase())
    );
    if (!has) missingDishKeysForScenarios.push(`${s.slug} (title: ${s.title})`);
  }

  console.log("Scenarios:", scenarioSlugs.length);
  console.log("Distinct question keys:", questionKeys.size);
  console.log("Distinct option keys:", optionKeys.size);

  console.log("\nMissing questionIntroRoasts keys:");
  console.log(
    missingQuestionIntro.length ? missingQuestionIntro.join("\n") : "(none)"
  );

  console.log("\nMissing optionClickRoasts keys:");
  console.log(
    missingOptionRoasts.length ? missingOptionRoasts.join("\n") : "(none)"
  );

  console.log(
    "\nScenarios with no obvious dishRecognitionRoasts match by title:"
  );
  console.log(
    missingDishKeysForScenarios.length
      ? missingDishKeysForScenarios.join("\n")
      : "(none)"
  );
}

main();
