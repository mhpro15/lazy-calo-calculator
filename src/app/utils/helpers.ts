import { pickFreshLine } from "./roastPicker";

export const getFunnyComment = (cal: number): string => {
  const band = cal < 300 ? "A" : cal < 700 ? "B" : cal < 1500 ? "C" : "D";
  const linesByBand: Record<typeof band, string[]> = {
    A: [
      "Is that all? Are you a hummingbird?",
      "Sub-300. Suspiciously responsible.",
      "Okay, light work. The app is confused.",
      "This is what restraint looks like. Rare.",
      "The calories barely registered. Impressive.",
      "Clean. Efficient. Mildly unsettling.",
    ],
    B: [
      "A solid effort. Your metabolism is mildly annoyed.",
      "Respectable chaos. Nothing to panic about.",
      "Normal meal energy. The app nods.",
      "Okay, that’s reasonable-ish.",
      "Mid-range. The safest kind of honesty.",
      "Not bad. You’re still in the ‘it’s fine’ zone.",
    ],
    C: [
      "Wow. That's... impressive. Maybe take the stairs today?",
      "We’ve entered the ‘this counts as a workout’ bracket.",
      "Okay bestie. That’s a lot.",
      "This meal has plot. And chapters.",
      "Your couch is about to learn your name.",
      "That was… committed.",
    ],
    D: [
      "You've achieved legendary status. Your couch is calling your name.",
      "Legendary. The app is clapping slowly.",
      "This is a meal that makes history.",
      "Okay. That's basically a day.",
      "Your metabolism just filed a ticket.",
      "Epic. Unhinged. Iconic.",
    ],
  };

  const picked = pickFreshLine({
    key: `result:comment:${band}`,
    value: linesByBand[band],
    avoidLast: 6,
  });

  return picked ?? linesByBand[band][0];
};

export const LAZY_TIPS = [
  "Tip: If you eat it standing up, the calories don't count. (Source: Trust me bro)",
  "Tip: Drinking water while eating cancels out the grease. It's science.",
  "Tip: If no one saw you eat it, did it even happen?",
  "Tip: Licking the plate is technically cardio.",
  "Tip: If you split it into two sittings, it becomes 'meal prep'.",
  "Tip: Reading the nutrition label counts as self-improvement.",
  "Tip: The first bite is free. (This is not legal advice.)",
  "Tip: If you call it a 'treat', the calories get shy.",
];

export type Deliciousness = "delicious" | "ok" | "not_really";

export type TasteTax = {
  title: string;
  suggestion: string;
};

export const deliciousnessFromLabel = (
  label: string | undefined
): Deliciousness | null => {
  if (!label) return null;
  if (label.startsWith("Delicious")) return "delicious";
  if (label.startsWith("Ok")) return "ok";
  if (label.startsWith("Not really")) return "not_really";
  return null;
};

export const getTasteTax = (
  deliciousness: Deliciousness | null,
  calories: number,
  seed: number
): TasteTax => {
  const band: "A" | "B" | "C" | "D" =
    calories < 300 ? "A" : calories < 700 ? "B" : calories < 1500 ? "C" : "D";

  if (!deliciousness) {
    return {
      title: "Balance tip (optional):",
      suggestion:
        "One tasty meal, one lighter meal later. That’s the lazy math.",
    };
  }

  const suggestionsByRating: Record<Deliciousness, string[]> = {
    delicious: [
      "Next meal: protein + veggies. Sauce on the side, still delicious.",
      "Swap the drink for water/zero-sugar and keep the main character meal.",
      "Keep the treat, shrink the side. Balance, not punishment.",
    ],
    ok: [
      "Next meal: same vibe, smaller portion. Easy win.",
      "Add a 10-minute walk later. Yes, that counts. I checked (I didn’t).",
      "Pick one: fries or dessert. Not both. Future You says thanks.",
    ],
    not_really: [
      "You suffered AND paid calories? Tragic.",
      "Next meal: make it worth it, but keep it lighter. Justice for your taste buds.",
      "Your next meal deserves flavor AND balance. I believe in you.",
    ],
  };

  const titlesByBand: Record<typeof band, string[]> = {
    A: ["Taste Tax: basically free", "Balance Meter: calm vibes"],
    B: ["Taste Tax: manageable", "Balance Meter: slightly judgmental"],
    C: ["Taste Tax: okay bestie", "Balance Meter: the plot thickens"],
    D: ["Taste Tax: legendary mode", "Balance Meter: tomorrow-you is watching"],
  };

  const titleLines = titlesByBand[band];
  const suggestionLines = suggestionsByRating[deliciousness];

  const title =
    pickFreshLine({
      key: `tasteTax:title:${band}`,
      value: titleLines,
      avoidLast: 4,
    }) ?? titleLines[Math.abs(seed) % titleLines.length];

  const suggestion =
    pickFreshLine({
      key: `tasteTax:suggestion:${deliciousness}:${band}`,
      value: suggestionLines,
      avoidLast: 6,
    }) ?? suggestionLines[Math.abs(seed + calories) % suggestionLines.length];

  return { title, suggestion };
};
