import {
  dishRecognitionRoasts,
  optionClickRoasts,
  questionIntroRoasts,
} from "../../src/app/data/roasts";
import type { FoodTypeLiteral, SeedRoastLine } from "./types";

const foodTypeForQuestionKey = (
  questionKey: string
): FoodTypeLiteral | undefined => {
  if (
    questionKey.startsWith("meal") ||
    questionKey === "slices" ||
    questionKey === "patties" ||
    questionKey === "grease" ||
    questionKey === "dressing" ||
    questionKey === "toppings" ||
    questionKey === "pieces" ||
    questionKey === "bowlSize" ||
    questionKey === "broth" ||
    questionKey === "sauce" ||
    questionKey === "portion" ||
    questionKey === "weight" ||
    questionKey === "style" ||
    questionKey === "extras" ||
    questionKey === "sides"
  ) {
    return "MEAL";
  }

  if (
    questionKey.startsWith("snack") ||
    questionKey === "bag" ||
    questionKey === "count" ||
    questionKey === "scoops" ||
    questionKey === "cone" ||
    questionKey === "slice" ||
    questionKey === "frosting" ||
    questionKey === "seconds" ||
    questionKey === "dip"
  ) {
    return "SNACK";
  }

  if (
    questionKey.startsWith("drink") ||
    questionKey === "cupSize" ||
    questionKey === "sugarLevel" ||
    questionKey === "cream" ||
    questionKey === "type" ||
    questionKey === "size" ||
    questionKey === "base" ||
    questionKey === "addons"
  ) {
    return "DRINK";
  }

  return undefined;
};

export function buildRoastSeeds(): SeedRoastLine[] {
  const rows: SeedRoastLine[] = [];

  for (const [dishKey, lines] of Object.entries(dishRecognitionRoasts)) {
    const key = dishKey === "generic" ? null : dishKey;
    for (let i = 0; i < lines.length; i += 1) {
      rows.push({
        scope: "DISH",
        dishKey: key,
        text: lines[i],
        order: i,
      });
    }
  }

  for (const [questionKey, line] of Object.entries(questionIntroRoasts)) {
    const lines = Array.isArray(line) ? line : [line];
    for (let i = 0; i < lines.length; i += 1) {
      rows.push({
        scope: "QUESTION",
        foodType: foodTypeForQuestionKey(questionKey),
        questionKey,
        text: lines[i],
        order: i,
      });
    }
  }

  for (const [key, text] of Object.entries(optionClickRoasts)) {
    const pipeIndex = key.indexOf("|");
    if (pipeIndex <= 0) continue;
    const questionKey = key.slice(0, pipeIndex);
    const optionLabel = key.slice(pipeIndex + 1);

    const lines = Array.isArray(text) ? text : [text];
    for (let i = 0; i < lines.length; i += 1) {
      rows.push({
        scope: "OPTION",
        foodType: foodTypeForQuestionKey(questionKey),
        questionKey,
        optionLabel,
        text: lines[i],
        order: i,
      });
    }
  }

  return rows;
}
