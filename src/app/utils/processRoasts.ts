import type { UserProfile } from "./profile";

export type ProcessRoastContext = {
  todayTotalBefore: number;
  todayTotalAfter: number;
  todayCountBefore: number;
  dish: string;
  calories: number;
  target: number;
  goal?: UserProfile["goal"];
  foodTypeHint?: "MEAL" | "SNACK" | "DRINK" | null;
};

function pick(seed: number, lines: string[]) {
  return lines[Math.abs(seed) % lines.length];
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function looksHealthy(ctx: ProcessRoastContext) {
  const d = normalize(ctx.dish);
  const healthyKeywords = [
    "salad",
    "fruit",
    "berries",
    "yogurt",
    "sashimi",
    "veggies",
    "vegetable",
    "grilled",
  ];

  if (healthyKeywords.some((k) => d.includes(k))) return true;
  if (ctx.calories > 0 && ctx.calories <= 450) return true;
  return false;
}

export function getProcessRoast(ctx: ProcessRoastContext) {
  const seed = ctx.dish.length + ctx.calories + ctx.todayCountBefore;

  // First meal of the day
  if (ctx.todayCountBefore === 0) {
    const lines = [
      "SYSTEM BOOT: First log detected. The day’s storyline begins.",
      "SYSTEM NOTE: First meal logged. Reality has started.",
      "SYSTEM ONLINE: First entry accepted. We are tracking now.",
    ];
    return pick(seed, lines);
  }

  // Healthy detection (compliment the system, not the user)
  if (looksHealthy(ctx)) {
    const lines = [
      "SYSTEM ANOMALY: Vegetables detected. Metrics stabilizing.",
      "SYSTEM STATUS: Nutrient density increased. Unexpected but welcomed.",
      "SYSTEM LOG: A reasonable choice occurred. The algorithm is recalibrating.",
    ];
    return pick(seed, lines);
  }

  const after = ctx.todayTotalAfter;
  const target = ctx.target;

  // Nearing / over target
  if (after >= target) {
    const lines = [
      "SYSTEM ALERT: Daily target reached. Further inputs will be treated as ‘bonus content’.",
      "SYSTEM WARNING: You have entered the ‘maintenance of consequences’ zone.",
      "SYSTEM NOTE: Target exceeded. Damage control suggestions unlocked.",
    ];
    return pick(seed, lines);
  }

  const ratio = after / target;
  if (ratio >= 0.85) {
    const lines = [
      "SYSTEM NOTICE: Approaching daily target. Proceed with portion awareness.",
      "SYSTEM HUD: 85%+ of target used. The margin is getting thin.",
      "SYSTEM UPDATE: You’re close to the line. Choose your next meal wisely.",
    ];
    return pick(seed, lines);
  }

  if (ratio <= 0.25) {
    const lines = [
      "SYSTEM: Plenty of runway left. The day is young.",
      "SYSTEM STATUS: Low utilization. Suspiciously calm.",
      "SYSTEM: Still early. The app remains optimistic.",
    ];
    return pick(seed, lines);
  }

  // Default
  const lines = [
    "SYSTEM LOG: Entry recorded. The graph continues.",
    "SYSTEM: Noted. The numbers have been updated.",
    "SYSTEM UPDATE: Calories added. Regret pending.",
  ];
  return pick(seed, lines);
}
