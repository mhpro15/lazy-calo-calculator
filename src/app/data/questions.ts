import type { LucideIcon } from "lucide-react";
import { Pizza, Hamburger, Salad, Coffee } from "lucide-react";

export interface Question {
  id: string;
  text: string;
  options: { label: string; value: number; comment?: string }[];
}

export const SCENARIOS: Record<
  string,
  { icon: LucideIcon; questions: Question[] }
> = {
  pizza: {
    icon: Pizza,
    questions: [
      {
        id: "slices",
        text: "How many slices did you 'accidentally' eat?",
        options: [
          { label: "Just 1 (Liar)", value: 250 },
          { label: "2-3 (Respectable)", value: 750 },
          { label: "4-6 (The 'I'm stressed' special)", value: 1500 },
          {
            label: "The whole thing (No judgment... okay, maybe a little)",
            value: 2500,
          },
        ],
      },
      {
        id: "grease",
        text: "How greasy was it?",
        options: [
          { label: "Dry as a bone", value: 0 },
          { label: "Shiny", value: 50 },
          { label: "I needed a second napkin", value: 150 },
          { label: "It's currently transparent", value: 300 },
        ],
      },
    ],
  },
  burger: {
    icon: Hamburger,
    questions: [
      {
        id: "patties",
        text: "How many patties are we talking about?",
        options: [
          { label: "Single (The snack)", value: 400 },
          { label: "Double (The standard)", value: 700 },
          { label: "Triple (The challenge)", value: 1000 },
          { label: "I can't see the bun anymore", value: 1500 },
        ],
      },
      {
        id: "sides",
        text: "Did you add fries?",
        options: [
          { label: "No, I'm on a 'diet'", value: 0 },
          { label: "Small (3 fries)", value: 200 },
          { label: "Large (The bucket)", value: 500 },
          {
            label: "Fries AND a shake (Living life to the fullest)",
            value: 1200,
          },
        ],
      },
    ],
  },
  salad: {
    icon: Salad,
    questions: [
      {
        id: "dressing",
        text: "How much dressing did you drown it in?",
        options: [
          { label: "A light mist", value: 50 },
          { label: "A healthy drizzle", value: 150 },
          { label: "It's a soup now", value: 400 },
        ],
      },
      {
        id: "toppings",
        text: "Any 'salad' extras? (Croutons, cheese, bacon bits...)",
        options: [
          { label: "Just leaves", value: 0 },
          { label: "A few croutons", value: 100 },
          { label: "More cheese than lettuce", value: 400 },
        ],
      },
    ],
  },
  coffee: {
    icon: Coffee,
    questions: [
      {
        id: "type",
        text: "What kind of 'coffee' was it?",
        options: [
          { label: "Black (The soul of a poet)", value: 5 },
          { label: "Latte (The safe choice)", value: 150 },
          { label: "Frappuccino (The dessert in disguise)", value: 450 },
        ],
      },
      {
        id: "sugar",
        text: "How many pumps of syrup/sugar?",
        options: [
          { label: "None, I'm sweet enough", value: 0 },
          { label: "1-2 pumps", value: 40 },
          { label: "I lost count", value: 120 },
        ],
      },
    ],
  },

  bubbleTea: {
    icon: Coffee,
    questions: [
      {
        id: "cupSize",
        text: "Bubble tea size — how big was the cup? (ml/oz)",
        options: [
          { label: "350 ml / 12 oz (small-ish)", value: 220 },
          { label: "500 ml / 16 oz (standard)", value: 350 },
          { label: "700 ml / 24 oz (the bucket)", value: 520 },
        ],
      },
      {
        id: "sugarLevel",
        text: "Sugar level? (Be brave. I can handle the truth.)",
        options: [
          { label: "0% (ascetic) ", value: 0 },
          { label: "25% (polite)", value: 60 },
          { label: "50% (normal human)", value: 120 },
          { label: "75% (sweet-tooth energy)", value: 190 },
          { label: "100% (mainlining joy)", value: 260 },
        ],
      },
      {
        id: "cream",
        text: "Milk/cream situation?",
        options: [
          { label: "No dairy (tea-only mode)", value: 0 },
          { label: "Regular milk", value: 70 },
          { label: "Cream / milk foam / extra creamy", value: 160 },
        ],
      },
      {
        id: "toppings",
        text: "Toppings?",
        options: [
          { label: "None (suspiciously responsible)", value: 0 },
          { label: "Boba pearls", value: 140 },
          { label: "Jelly/pudding", value: 110 },
          { label: "Extra boba + extras (chaos mode)", value: 240 },
        ],
      },
    ],
  },

  sushi: {
    icon: Salad,
    questions: [
      {
        id: "pieces",
        text: "How many pieces are we talking?",
        options: [
          { label: "6 pieces (light snack)", value: 260 },
          { label: "8 pieces (classic)", value: 380 },
          { label: "12 pieces (respectable damage)", value: 620 },
          { label: "16+ pieces (I fear no salmon)", value: 950 },
        ],
      },
      {
        id: "style",
        text: "What kind of sushi vibe?",
        options: [
          { label: "Mostly sashimi (lean-ish)", value: 80 },
          { label: "Nigiri (rice included)", value: 180 },
          { label: "Rolls (standard)", value: 260 },
          { label: "Saucy / mayo / crunchy rolls", value: 420 },
        ],
      },
      {
        id: "extras",
        text: "Extras that " + "definitely" + " don’t count?",
        options: [
          { label: "Just soy + wasabi", value: 0 },
          { label: "Miso soup / salad", value: 120 },
          { label: "Edamame / gyoza (side quest)", value: 260 },
          { label: "Tempura / fried things (plot twist)", value: 520 },
        ],
      },
    ],
  },

  steak: {
    icon: Hamburger,
    questions: [
      {
        id: "weight",
        text: "Steak size — roughly how big? (oz/g)",
        options: [
          { label: "6 oz / ~170 g", value: 420 },
          { label: "8 oz / ~225 g", value: 560 },
          { label: "12 oz / ~340 g", value: 820 },
          { label: "16 oz / ~450 g (absolute unit)", value: 1100 },
        ],
      },
      {
        id: "butter",
        text: "Butter/oil situation?",
        options: [
          { label: "No extra (rare behavior)", value: 0 },
          { label: "A little butter/oil", value: 120 },
          { label: "Basted / garlic butter / sauce fiesta", value: 260 },
        ],
      },
      {
        id: "sides",
        text: "Sides?",
        options: [
          { label: "None (just vibes and protein)", value: 0 },
          { label: "Veggies / salad", value: 120 },
          { label: "Potato / bread", value: 320 },
          { label: "Fries + something else (double side quest)", value: 650 },
        ],
      },
    ],
  },
};

export const GENERIC_QUESTIONS: Question[] = [
  {
    id: "size",
    text: "How big was this 'dish'?",
    options: [
      { label: "Tiny (Bird portion)", value: 200 },
      { label: "Normal (Human portion)", value: 600 },
      { label: "Large (Hungry human portion)", value: 1000 },
      { label: "Gigantic (Feeds a small village)", value: 2000 },
    ],
  },
  {
    id: "regret",
    text: "How much do you regret this choice? (1-10)",
    options: [
      { label: "0 - Pure bliss", value: 0 },
      { label: "5 - It was okay", value: 100 },
      { label: "10 - I need a nap and a gym membership", value: 300 },
    ],
  },
];

export const FOOD_TYPE_QUESTION: Question = {
  id: "foodType",
  text: "Quick classification: what is this mostly?",
  options: [
    { label: "Meal", value: 0 },
    { label: "Snack", value: 0 },
    { label: "Drink", value: 0 },
  ],
};

export const MEAL_QUESTIONS: Question[] = [
  {
    id: "mealPortion",
    text: "Meal size — be honest. How big?",
    options: [
      { label: "Small plate", value: 450 },
      { label: "Normal plate", value: 750 },
      { label: "Big plate", value: 1100 },
      { label: "Seconds happened", value: 1500 },
    ],
  },
  {
    id: "mealExtras",
    text: "Any extras (sauce, cheese, oil, etc.)?",
    options: [
      { label: "None / minimal", value: 0 },
      { label: "Some sauce/cheese", value: 180 },
      { label: "Heavy sauce/cheese/oil", value: 350 },
    ],
  },
];

export const SNACK_QUESTIONS: Question[] = [
  {
    id: "snackAmount",
    text: "Snack amount?",
    options: [
      { label: "One serving (allegedly)", value: 180 },
      { label: "Two servings", value: 360 },
      { label: "Three+ servings (oops)", value: 600 },
    ],
  },
  {
    id: "snackType",
    text: "Snack energy?",
    options: [
      { label: "Fruit / light snack", value: 60 },
      { label: "Chips / cookies", value: 220 },
      { label: "Candy / dessert snack", value: 320 },
    ],
  },
];

export const DRINK_QUESTIONS: Question[] = [
  {
    id: "drinkSize",
    text: "Drink size (ml/oz)?",
    options: [
      { label: "250 ml / 8 oz", value: 80 },
      { label: "350 ml / 12 oz", value: 140 },
      { label: "500 ml / 16 oz", value: 220 },
      { label: "700 ml / 24 oz", value: 340 },
    ],
  },
  {
    id: "drinkSugar",
    text: "How sweet was it?",
    options: [
      { label: "No sugar", value: 0 },
      { label: "Some sugar", value: 90 },
      { label: "Very sweet", value: 180 },
    ],
  },
  {
    id: "drinkCream",
    text: "Milk/cream?",
    options: [
      { label: "No", value: 0 },
      { label: "Yes", value: 90 },
      { label: "Extra creamy", value: 170 },
    ],
  },
];

export const DELICIOUSNESS_QUESTION: Question = {
  id: "deliciousness",
  text: "Be honest: how delicious was it?",
  options: [
    { label: "Delicious (worth it)", value: 0 },
    { label: "Ok (mid, but fine)", value: 0 },
    { label: "Not really (why did you do that)", value: 0 },
  ],
};
