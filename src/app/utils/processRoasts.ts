import type { UserProfile } from "./profile";
import { pickFreshLine } from "./roastPicker";

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
  // First meal of the day
  if (ctx.todayCountBefore === 0) {
    const lines = [
      "SYSTEM BOOT: First log detected. The day’s storyline begins.",
      "SYSTEM NOTE: First meal logged. Reality has started.",
      "SYSTEM ONLINE: First entry accepted. We are tracking now.",
      "SYSTEM INIT: First entry received. The narrative begins.",
      "SYSTEM STATUS: Tracking enabled. The day has started.",
    ];
    return (
      pickFreshLine({ key: "process:first", value: lines, avoidLast: 6 }) ??
      lines[0]
    );
  }

  // Healthy detection (compliment the system, not the user)
  if (looksHealthy(ctx)) {
    const lines = [
      "SYSTEM ANOMALY: Vegetables detected. Metrics stabilizing.",
      "SYSTEM STATUS: Nutrient density increased. Unexpected but welcomed.",
      "SYSTEM LOG: A reasonable choice occurred. The algorithm is recalibrating.",
      "SYSTEM NOTE: Fiber detected. The app is intrigued.",
      "SYSTEM UPDATE: A sensible decision happened. Recording for science.",
    ];
    return (
      pickFreshLine({ key: "process:healthy", value: lines, avoidLast: 6 }) ??
      lines[0]
    );
  }

  const after = ctx.todayTotalAfter;
  const target = ctx.target;

  // Nearing / over target
  if (after >= target) {
    const lines = [
      "SYSTEM ALERT: Daily target reached. Further inputs will be treated as ‘bonus content’.",
      "SYSTEM WARNING: You have entered the ‘maintenance of consequences’ zone.",
      "SYSTEM NOTE: Target exceeded. Damage control suggestions unlocked.",
      "SYSTEM ALERT: Target hit. Proceed with caution and vibes.",
      "SYSTEM NOTICE: You are now in the ‘extra credit’ portion of the day.",
    ];
    return (
      pickFreshLine({ key: "process:over", value: lines, avoidLast: 6 }) ??
      lines[0]
    );
  }

  const ratio = after / target;
  if (ratio >= 0.85) {
    const lines = [
      "SYSTEM NOTICE: Approaching daily target. Proceed with portion awareness.",
      "SYSTEM HUD: 85%+ of target used. The margin is getting thin.",
      "SYSTEM UPDATE: You’re close to the line. Choose your next meal wisely.",
      "SYSTEM WARNING: Buffer shrinking. Choose your next move carefully.",
      "SYSTEM STATUS: Near target. Liquid calories are now illegal (not really).",
    ];
    return (
      pickFreshLine({ key: "process:near", value: lines, avoidLast: 6 }) ??
      lines[0]
    );
  }

  if (ratio <= 0.25) {
    const lines = [
      "SYSTEM: Plenty of runway left. The day is young.",
      "SYSTEM STATUS: Low utilization. Suspiciously calm.",
      "SYSTEM: Still early. The app remains optimistic.",
      "SYSTEM NOTE: Low intake so far. The plot could still twist.",
      "SYSTEM STATUS: Calm dashboard. For now.",
    ];
    return (
      pickFreshLine({ key: "process:low", value: lines, avoidLast: 6 }) ??
      lines[0]
    );
  }

  // Default
  const lines = [
    "SYSTEM LOG: Entry recorded. The graph continues.",
    "SYSTEM: Noted. The numbers have been updated.",
    "SYSTEM UPDATE: Calories added. Regret pending.",
    "SYSTEM: Logged. The spreadsheet grows stronger.",
    "SYSTEM UPDATE: Numbers updated. Consequences scheduled.",
  ];
  return (
    pickFreshLine({ key: "process:default", value: lines, avoidLast: 6 }) ??
    lines[0]
  );
}
