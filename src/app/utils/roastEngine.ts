import {
  optionClickRoasts,
  questionIntroRoasts,
  dishRecognitionRoasts,
} from "../data/roasts";
import type { Question } from "../data/questions";
import { pickFreshLine, type RoastValue } from "./roastPicker";

export type RoastPack = {
  dishRoast: string | null;
  questionIntroById: Record<string, RoastValue>;
  optionRoastByKey: Record<string, RoastValue>;
};

function normalizeDish(dish: string) {
  return dish.trim().toLowerCase();
}

function resolveDishRoast(dish: string, seed: number) {
  const d = normalizeDish(dish);

  // Match any defined dishKey (except generic). Longest key wins.
  const entries = Object.entries(dishRecognitionRoasts).filter(
    ([k]) => k !== "generic"
  ) as Array<[string, string[]]>;

  let bestKey: string | null = null;
  for (const [k] of entries) {
    if (!k) continue;
    if (d.includes(k.toLowerCase())) {
      if (!bestKey || k.length > bestKey.length) bestKey = k;
    }
  }

  const candidates = bestKey
    ? (dishRecognitionRoasts as Record<string, string[]>)[bestKey]
    : dishRecognitionRoasts.generic;

  const line =
    pickFreshLine({
      key: `dish:${d || "(blank)"}`,
      value: candidates,
      avoidLast: 6,
    }) ?? candidates[Math.abs(seed) % candidates.length];

  return line.replaceAll("{dish}", dish.trim());
}

export function buildRoastPack(args: {
  dish: string;
  questions: Question[];
  seed: number;
}): RoastPack {
  const dishRoast = args.dish.trim()
    ? resolveDishRoast(args.dish, args.seed)
    : null;

  const questionIntroById: Record<string, RoastValue> = {};
  for (const q of args.questions) {
    const value = (questionIntroRoasts as Record<string, unknown>)[
      q.id
    ] as RoastValue;
    if (value) questionIntroById[q.id] = value;
  }

  const optionRoastByKey: Record<string, RoastValue> = {};
  for (const q of args.questions) {
    for (const opt of q.options) {
      const key = `${q.id}|${opt.label}`;
      const value = (optionClickRoasts as Record<string, unknown>)[
        key
      ] as RoastValue;
      if (value) optionRoastByKey[key] = value;
    }
  }

  return { dishRoast, questionIntroById, optionRoastByKey };
}
