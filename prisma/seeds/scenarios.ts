import type { SeedScenario } from "./types";

export const SCENARIO_SEEDS: SeedScenario[] = [
  {
    slug: "pizza",
    title: "Pizza",
    iconKey: "Pizza",
    foodType: "MEAL",
    keywords: ["pizza", "pepperoni", "margherita"],
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
  {
    slug: "burger",
    title: "Burger",
    iconKey: "Hamburger",
    foodType: "MEAL",
    keywords: ["burger", "cheeseburger"],
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
  {
    slug: "salad",
    title: "Salad",
    iconKey: "Salad",
    foodType: "MEAL",
    keywords: ["salad"],
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
  {
    slug: "coffee",
    title: "Coffee",
    iconKey: "Coffee",
    foodType: "DRINK",
    keywords: ["coffee", "latte", "starbucks", "frappuccino"],
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
  {
    slug: "bubbleTea",
    title: "Bubble Tea",
    iconKey: "Coffee",
    foodType: "DRINK",
    keywords: ["bubble tea", "boba", "milk tea", "tapioca"],
    questions: [
      {
        id: "cupSize",
        text: "Bubble tea size — how big was the cup? (ml/oz)",
        options: [
          { label: "350 ml / 12 oz (small-ish)", value: 220 },
          { label: "500 ml / 16 oz (standard)", value: 350 },
          { label: "700 ml / 24 oz (the bucket)", value: 520 },
          { label: "1000 ml / 34 oz (basically a jug)", value: 720 },
        ],
      },
      {
        id: "sugarLevel",
        text: "Sugar level? (Be brave. I can handle the truth.)",
        options: [
          { label: "0% (ascetic)", value: 0 },
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
  {
    slug: "sushi",
    title: "Sushi",
    iconKey: "Salad",
    foodType: "MEAL",
    keywords: ["sushi", "nigiri", "maki", "roll"],
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
        text: "Any extras that definitely don't count?",
        options: [
          { label: "Just soy + wasabi", value: 0 },
          { label: "Miso soup / salad", value: 120 },
          { label: "Edamame / gyoza (side quest)", value: 260 },
          { label: "Tempura / fried things (plot twist)", value: 520 },
        ],
      },
    ],
  },
  {
    slug: "steak",
    title: "Steak",
    iconKey: "Hamburger",
    foodType: "MEAL",
    keywords: ["steak", "ribeye", "sirloin"],
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
  {
    slug: "ramen",
    title: "Ramen",
    iconKey: "Utensils",
    foodType: "MEAL",
    keywords: ["ramen", "tonkotsu", "shoyu", "miso ramen"],
    questions: [
      {
        id: "bowlSize",
        text: "Bowl size?",
        options: [
          { label: "Small bowl", value: 520 },
          { label: "Normal bowl", value: 720 },
          { label: "Big bowl", value: 980 },
        ],
      },
      {
        id: "broth",
        text: "Broth style?",
        options: [
          { label: "Light (shoyu/miso-ish)", value: 0 },
          { label: "Rich (tonkotsu vibes)", value: 180 },
          { label: "Extra rich + oil layer (movie sheen)", value: 320 },
        ],
      },
      {
        id: "extras",
        text: "Extras?",
        options: [
          { label: "None", value: 0 },
          { label: "Egg", value: 90 },
          { label: "Extra chashu/meat", value: 220 },
          { label: "Extra noodles", value: 260 },
        ],
      },
    ],
  },
  {
    slug: "friedChicken",
    title: "Fried Chicken",
    iconKey: "Hamburger",
    foodType: "MEAL",
    keywords: ["fried chicken", "kfc", "chicken tenders", "wings", "nuggets"],
    questions: [
      {
        id: "pieces",
        text: "How much chicken happened?",
        options: [
          { label: "2 tenders / small portion", value: 320 },
          { label: "4 tenders / medium", value: 620 },
          { label: "8 wings / big", value: 900 },
          { label: "Bucket energy", value: 1400 },
        ],
      },
      {
        id: "sauce",
        text: "Sauce situation?",
        options: [
          { label: "No sauce", value: 0 },
          { label: "A little", value: 90 },
          { label: "Drenched", value: 220 },
        ],
      },
      {
        id: "sides",
        text: "Sides?",
        options: [
          { label: "No sides", value: 0 },
          { label: "Fries", value: 420 },
          { label: "Mac & cheese", value: 520 },
          { label: "Fries + a drink", value: 650 },
        ],
      },
    ],
  },
  {
    slug: "iceCream",
    title: "Ice Cream",
    iconKey: "Utensils",
    foodType: "SNACK",
    keywords: ["ice cream", "gelato", "froyo", "sundae"],
    questions: [
      {
        id: "scoops",
        text: "How much ice cream?",
        options: [
          { label: "1 scoop", value: 220 },
          { label: "2 scoops", value: 420 },
          { label: "3 scoops (ambition)", value: 620 },
          { label: "Sundae / huge cup", value: 880 },
        ],
      },
      {
        id: "cone",
        text: "Cone/cup?",
        options: [
          { label: "Cup", value: 0 },
          { label: "Waffle cone", value: 160 },
          { label: "Stuffed cone / extra", value: 260 },
        ],
      },
      {
        id: "toppings",
        text: "Toppings?",
        options: [
          { label: "None", value: 0 },
          { label: "Sprinkles / small toppings", value: 80 },
          { label: "Chocolate sauce / caramel", value: 160 },
          { label: "Nuts + sauce + whipped cream (the deluxe)", value: 320 },
        ],
      },
    ],
  },
  {
    slug: "soda",
    title: "Soda",
    iconKey: "Coffee",
    foodType: "DRINK",
    keywords: ["soda", "cola", "coke", "pepsi", "sprite", "fanta"],
    questions: [
      {
        id: "size",
        text: "Cup size (ml/oz)?",
        options: [
          { label: "250 ml / 8 oz", value: 90 },
          { label: "350 ml / 12 oz", value: 140 },
          { label: "500 ml / 16 oz", value: 210 },
          { label: "700 ml / 24 oz", value: 320 },
          { label: "1000 ml / 34 oz", value: 460 },
        ],
      },
      {
        id: "type",
        text: "Regular or zero/diet?",
        options: [
          { label: "Zero / diet", value: 0 },
          { label: "Regular", value: 120 },
          { label: "Regular + refill(s)", value: 260 },
        ],
      },
      {
        id: "extras",
        text: "Ice / add-ons?",
        options: [
          { label: "Just soda", value: 0 },
          { label: "Sweet syrup add-on (rare but chaotic)", value: 80 },
        ],
      },
    ],
  },
  {
    slug: "chips",
    title: "Chips",
    iconKey: "Utensils",
    foodType: "SNACK",
    keywords: ["chips", "crisps", "doritos", "lays", "pringles"],
    questions: [
      {
        id: "bag",
        text: "How big was the bag?",
        options: [
          { label: "Small bag", value: 180 },
          { label: "Medium bag", value: 360 },
          { label: "Large bag (family size, solo mission)", value: 720 },
        ],
      },
      {
        id: "dip",
        text: "Did you add dip?",
        options: [
          { label: "No dip", value: 0 },
          { label: "Salsa", value: 40 },
          { label: "Cheese dip / creamy dip", value: 220 },
        ],
      },
    ],
  },
  {
    slug: "donut",
    title: "Donut",
    iconKey: "Utensils",
    foodType: "SNACK",
    keywords: ["donut", "doughnut"],
    questions: [
      {
        id: "count",
        text: "How many donuts?",
        options: [
          { label: "1 (innocent)", value: 260 },
          { label: "2 (double trouble)", value: 520 },
          { label: "3+ (donut era)", value: 900 },
        ],
      },
      {
        id: "type",
        text: "Donut style?",
        options: [
          { label: "Plain / glazed", value: 0 },
          { label: "Filled", value: 120 },
          { label: "Frosted + toppings", value: 180 },
        ],
      },
    ],
  },
  {
    slug: "pasta",
    title: "Pasta",
    iconKey: "Utensils",
    foodType: "MEAL",
    keywords: ["pasta", "spaghetti", "alfredo", "carbonara", "mac and cheese"],
    questions: [
      {
        id: "portion",
        text: "Portion size?",
        options: [
          { label: "Small bowl", value: 520 },
          { label: "Normal bowl", value: 780 },
          { label: "Huge bowl", value: 1100 },
        ],
      },
      {
        id: "sauce",
        text: "Sauce type?",
        options: [
          { label: "Tomato-based", value: 0 },
          { label: "Cream-based", value: 260 },
          { label: "Oil/butter-based", value: 180 },
        ],
      },
      {
        id: "extras",
        text: "Extras?",
        options: [
          { label: "No extras", value: 0 },
          { label: "Extra cheese", value: 180 },
          { label: "Meatballs / sausage", value: 320 },
          { label: "Bread on the side", value: 260 },
        ],
      },
    ],
  },
  {
    slug: "tacos",
    title: "Tacos",
    iconKey: "Utensils",
    foodType: "MEAL",
    keywords: ["taco", "tacos", "tortilla"],
    questions: [
      {
        id: "count",
        text: "How many tacos?",
        options: [
          { label: "2 tacos", value: 420 },
          { label: "3 tacos", value: 620 },
          { label: "4+ tacos", value: 900 },
        ],
      },
      {
        id: "type",
        text: "Taco type?",
        options: [
          { label: "Street style (simple)", value: 0 },
          { label: "Cheesy / loaded", value: 180 },
          { label: "Fried shell / extra crunch", value: 260 },
        ],
      },
      {
        id: "sides",
        text: "Sides?",
        options: [
          { label: "No sides", value: 0 },
          { label: "Chips + salsa", value: 220 },
          { label: "Rice/beans", value: 320 },
          { label: "Chips + queso (dangerously tasty)", value: 520 },
        ],
      },
    ],
  },
  {
    slug: "smoothie",
    title: "Smoothie",
    iconKey: "Coffee",
    foodType: "DRINK",
    keywords: ["smoothie", "shake", "milkshake", "protein shake"],
    questions: [
      {
        id: "size",
        text: "Cup size (ml/oz)?",
        options: [
          { label: "350 ml / 12 oz", value: 220 },
          { label: "500 ml / 16 oz", value: 340 },
          { label: "700 ml / 24 oz", value: 520 },
          { label: "1000 ml / 34 oz", value: 720 },
        ],
      },
      {
        id: "base",
        text: "Base?",
        options: [
          { label: "Fruit + water", value: 0 },
          { label: "Milk/yogurt", value: 160 },
          { label: "Ice cream base / milkshake territory", value: 420 },
        ],
      },
      {
        id: "addons",
        text: "Add-ins?",
        options: [
          { label: "None", value: 0 },
          { label: "Protein", value: 120 },
          { label: "Nut butter / oats", value: 260 },
          { label: "Both (the gym-influencer combo)", value: 380 },
        ],
      },
    ],
  },
  {
    slug: "cake",
    title: "Cake",
    iconKey: "Utensils",
    foodType: "SNACK",
    keywords: ["cake", "cheesecake", "cupcake"],
    questions: [
      {
        id: "slice",
        text: "Slice size?",
        options: [
          { label: "Small slice", value: 280 },
          { label: "Normal slice", value: 420 },
          { label: "Big slice", value: 620 },
          { label: "Cheesecake slice (dense mode)", value: 720 },
        ],
      },
      {
        id: "frosting",
        text: "Frosting/toppings?",
        options: [
          { label: "Light frosting", value: 0 },
          { label: "Thick frosting", value: 180 },
          { label: "Frosting + extras", value: 320 },
        ],
      },
      {
        id: "seconds",
        text: "Seconds?",
        options: [
          { label: "No", value: 0 },
          { label: "Yes", value: 420 },
        ],
      },
    ],
  },
  {
    slug: "burrito",
    title: "Burrito / Wrap",
    iconKey: "Utensils",
    foodType: "MEAL",
    keywords: ["burrito", "wrap", "chipotle", "tortilla wrap", "burrito bowl"],
    questions: [
      {
        id: "mealPortion",
        text: "Burrito size — how big was it?",
        options: [
          { label: "Small plate", value: 650 },
          { label: "Normal plate", value: 900 },
          { label: "Big plate", value: 1250 },
          { label: "Seconds happened", value: 1600 },
        ],
      },
      {
        id: "mealExtras",
        text: "Extras? (cheese, sour cream, guac, sauces)",
        options: [
          { label: "None / minimal", value: 0 },
          { label: "Some sauce/cheese", value: 220 },
          { label: "Heavy sauce/cheese/oil", value: 420 },
        ],
      },
    ],
  },
  {
    slug: "sandwich",
    title: "Sandwich / Sub",
    iconKey: "Utensils",
    foodType: "MEAL",
    keywords: [
      "sandwich",
      "sub",
      "hoagie",
      "panini",
      "bagel sandwich",
      "grilled cheese",
    ],
    questions: [
      {
        id: "mealPortion",
        text: "Sandwich size?",
        options: [
          { label: "Small plate", value: 520 },
          { label: "Normal plate", value: 780 },
          { label: "Big plate", value: 1050 },
          { label: "Seconds happened", value: 1400 },
        ],
      },
      {
        id: "mealExtras",
        text: "Extras? (mayo/cheese/oil/sides)",
        options: [
          { label: "None / minimal", value: 0 },
          { label: "Some sauce/cheese", value: 180 },
          { label: "Heavy sauce/cheese/oil", value: 350 },
        ],
      },
    ],
  },
  {
    slug: "pho",
    title: "Pho / Noodle Soup",
    iconKey: "Utensils",
    foodType: "MEAL",
    keywords: ["pho", "noodle soup", "viet", "rice noodles"],
    questions: [
      {
        id: "mealPortion",
        text: "Bowl size?",
        options: [
          { label: "Small plate", value: 520 },
          { label: "Normal plate", value: 720 },
          { label: "Big plate", value: 950 },
          { label: "Seconds happened", value: 1250 },
        ],
      },
      {
        id: "mealExtras",
        text: "Extras? (extra noodles, meat, fried add-ons)",
        options: [
          { label: "None / minimal", value: 0 },
          { label: "Some sauce/cheese", value: 200 },
          { label: "Heavy sauce/cheese/oil", value: 420 },
        ],
      },
    ],
  },
  {
    slug: "curry",
    title: "Curry + Rice",
    iconKey: "Utensils",
    foodType: "MEAL",
    keywords: ["curry", "korma", "tikka", "thai curry", "curry rice"],
    questions: [
      {
        id: "mealPortion",
        text: "Portion size?",
        options: [
          { label: "Small plate", value: 650 },
          { label: "Normal plate", value: 900 },
          { label: "Big plate", value: 1200 },
          { label: "Seconds happened", value: 1550 },
        ],
      },
      {
        id: "mealExtras",
        text: "Extras? (cream, ghee/oil, naan)",
        options: [
          { label: "None / minimal", value: 0 },
          { label: "Some sauce/cheese", value: 220 },
          { label: "Heavy sauce/cheese/oil", value: 480 },
        ],
      },
    ],
  },
  {
    slug: "pancakes",
    title: "Pancakes / Waffles",
    iconKey: "Utensils",
    foodType: "MEAL",
    keywords: ["pancakes", "waffles", "french toast"],
    questions: [
      {
        id: "mealPortion",
        text: "How much breakfast happened?",
        options: [
          { label: "Small plate", value: 520 },
          { label: "Normal plate", value: 820 },
          { label: "Big plate", value: 1150 },
          { label: "Seconds happened", value: 1500 },
        ],
      },
      {
        id: "mealExtras",
        text: "Toppings? (syrup, butter, whipped cream)",
        options: [
          { label: "None / minimal", value: 0 },
          { label: "Some sauce/cheese", value: 260 },
          { label: "Heavy sauce/cheese/oil", value: 520 },
        ],
      },
    ],
  },
  {
    slug: "friedRice",
    title: "Fried Rice / Rice Bowl",
    iconKey: "Utensils",
    foodType: "MEAL",
    keywords: ["fried rice", "rice bowl", "teriyaki", "bibimbap"],
    questions: [
      {
        id: "mealPortion",
        text: "Bowl size?",
        options: [
          { label: "Small plate", value: 620 },
          { label: "Normal plate", value: 920 },
          { label: "Big plate", value: 1250 },
          { label: "Seconds happened", value: 1650 },
        ],
      },
      {
        id: "mealExtras",
        text: "Extras? (extra oil, sauces, fried add-ons)",
        options: [
          { label: "None / minimal", value: 0 },
          { label: "Some sauce/cheese", value: 200 },
          { label: "Heavy sauce/cheese/oil", value: 480 },
        ],
      },
    ],
  },
];

export function listScenarioSlugs() {
  return SCENARIO_SEEDS.map((s) => s.slug);
}

export function pickScenarioSeeds(slugs: string[] | null) {
  if (!slugs || slugs.length === 0) return SCENARIO_SEEDS;
  const wanted = new Set(slugs.map((s) => s.trim()).filter(Boolean));
  return SCENARIO_SEEDS.filter((s) => wanted.has(s.slug));
}
