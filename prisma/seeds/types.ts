export type FoodTypeLiteral = "MEAL" | "SNACK" | "DRINK";

export type SeedQuestion = {
  id: string;
  text: string;
  options: { label: string; value: number }[];
};

export type SeedScenario = {
  slug: string;
  title: string;
  iconKey: string;
  foodType: FoodTypeLiteral;
  keywords: string[];
  questions: SeedQuestion[];
};

export type RoastScopeLiteral = "DISH" | "QUESTION" | "OPTION";

export type SeedRoastLine = {
  scope: RoastScopeLiteral;
  foodType?: FoodTypeLiteral;
  dishKey?: string | null;
  questionKey?: string | null;
  optionLabel?: string | null;
  text: string;
  order: number;
};
