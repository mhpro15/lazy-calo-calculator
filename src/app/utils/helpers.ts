export const getFunnyComment = (cal: number): string => {
  if (cal < 300) return "Is that all? Are you a hummingbird?";
  if (cal < 700) return "A solid effort. Your metabolism is mildly annoyed.";
  if (cal < 1500)
    return "Wow. That's... impressive. Maybe take the stairs today?";
  return "You've achieved legendary status. Your couch is calling your name.";
};

export const LAZY_TIPS = [
  "Tip: If you eat it standing up, the calories don't count. (Source: Trust me bro)",
  "Tip: Drinking water while eating cancels out the grease. It's science.",
  "Tip: If no one saw you eat it, did it even happen?",
  "Tip: Licking the plate is technically cardio.",
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
  const pick = <T>(arr: T[]) => arr[Math.abs(seed) % arr.length];

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

  const ratingIndex =
    deliciousness === "delicious"
      ? seed + 1
      : deliciousness === "ok"
      ? seed + 2
      : seed + 3;

  return {
    title: pick(titlesByBand[band]),
    suggestion: pick(
      suggestionsByRating[deliciousness]
        .map((s, i) => ({ s, i }))
        .sort((a, b) => ((a.i + ratingIndex) % 3) - ((b.i + ratingIndex) % 3))
        .map((x) => x.s)
    ),
  };
};
