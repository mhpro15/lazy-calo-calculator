import {
  optionClickRoasts,
  questionIntroRoasts,
  dishRecognitionRoasts,
} from "../data/roasts";
import type { Question } from "../data/questions";

export type RoastPack = {
  dishRoast: string | null;
  questionIntroById: Record<string, string>;
  optionRoastByKey: Record<string, string>;
};

function pick(seed: number, items: string[]) {
  if (items.length === 0) return "";
  return items[Math.abs(seed) % items.length];
}

function normalizeDish(dish: string) {
  return dish.trim().toLowerCase();
}

function resolveDishRoast(dish: string, seed: number) {
  const d = normalizeDish(dish);
  const candidates = d.includes("pizza")
    ? dishRecognitionRoasts.pizza
    : d.includes("burger")
    ? dishRecognitionRoasts.burger
    : d.includes("salad")
    ? dishRecognitionRoasts.salad
    : d.includes("coffee")
    ? dishRecognitionRoasts.coffee
    : dishRecognitionRoasts.generic;

  const line = pick(seed, candidates);
  return line.replaceAll("{dish}", dish.trim());
}

function coerceToLines(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
    return value as string[];
  }
  return [];
}

export function buildRoastPack(args: {
  dish: string;
  questions: Question[];
  seed: number;
}): RoastPack {
  const dishRoast = args.dish.trim()
    ? resolveDishRoast(args.dish, args.seed)
    : null;

  const questionIntroById: Record<string, string> = {};
  for (const q of args.questions) {
    const lines = coerceToLines(
      (questionIntroRoasts as Record<string, unknown>)[q.id]
    );
    if (lines.length > 0)
      questionIntroById[q.id] = pick(args.seed + q.id.length, lines);
  }

  const optionRoastByKey: Record<string, string> = {};
  for (const q of args.questions) {
    for (const opt of q.options) {
      const key = `${q.id}|${opt.label}`;
      const line = (optionClickRoasts as Record<string, string>)[key];
      if (line) optionRoastByKey[key] = line;
    }
  }

  return { dishRoast, questionIntroById, optionRoastByKey };
}
