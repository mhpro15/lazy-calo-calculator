// Roast script library: all funny copy organized by surface
// This file makes it easy to update humor without touching the component logic

// =====================================================
// A) DISH RECOGNITION LINES (when user enters dish)
// =====================================================

export const dishRecognitionRoasts = {
  pizza: [
    "Logging pizza. The app's credibility just went down.",
    "Pizza noted. This is either very brave or very honest.",
    "Say goodbye to simplicity.",
    "Pizza logged. The calorie band just got wider.",
    "Alright, we're doing this.",
    "Pizza. Of course. Let's see what you did.",
  ],
  burger: [
    "A burger, huh? The math is about to get spicy.",
    "Burger incoming. Buckle up.",
    "Logged. Now let's talk about what happened.",
    "One burger? Let's be honest.",
    "Burger noted. This might be educational.",
    "Okay, burger. Let's calculate the chaos.",
  ],
  salad: [
    "A salad! Okay, but we both know what that means.",
    "Salad logged. (The toppings will tell the truth.)",
    "Salad incoming. This is either very healthy or very not.",
    "Salad. Sure. Let's talk details.",
    "Salad noted. Dressing amount is about to matter.",
    "Salad logged. Now the plot thickens.",
  ],
  coffee: [
    "Coffee, huh? Bold of you to call that a drink.",
    "Logging coffee. Pretty sure this is dessert.",
    "Coffee noted. (Sips of regret incoming.)",
    "Coffee added. Let's see how much sugar we're talking.",
    "Coffee logged. Time to face what you did.",
    "Alright, coffee. But what KIND of coffee?",
  ],
  generic: [
    "Okay, {dish} noted. Let's do this.",
    "Logging {dish}. This is going to be educational.",
    "Brave of you to type that with confidence.",
    "{dish}. The app is listening.",
    "Got it. {dish}. Let's calculate.",
    "Alright, {dish}. Show us what you've got.",
  ],
};

// =====================================================
// B) QUESTION INTRO STINGERS (before options)
// =====================================================

export const questionIntroRoasts = {
  // Pizza
  slices:
    "How many slices before you convinced yourself it was still 'just one pizza'?",
  grease:
    "Now let's talk about the grease situation, because you know how important it is.",

  // Burger
  patties: "How many patties are we hiding between those buns?",
  sides: "Did you keep it light with the sides, or...?",

  // Salad
  dressing: "Alright, truth time: how much dressing are we talking?",
  toppings:
    "And here's where salad becomes interesting (or tragic) — what's in it?",

  // Coffee
  type: "First, what kind of 'coffee' was this really?",
  sugar: "Now the important part: how much sugar did you order?",

  // Generic
  size: "Before we do the math, how big was this?",
  regret:
    "Finally: on a scale of 'pure bliss' to 'why did I do that', where are we?",

  // Food type branch
  foodType: "Quick classification time. Don’t overthink it (you will).",

  // Generic Meal/Snack/Drink flows
  mealPortion: "Meal size. Be brave. Be honest.",
  mealExtras: "Extras count. Yes, even the ‘little bit’.",

  snackAmount: "Snack amount. Define ‘one serving’ with your whole chest.",
  snackType: "Snack energy check: wholesome… or chaos?",

  drinkSize: "Drink size. Liquids count. Sorry.",
  drinkSugar: "How sweet was it? Don’t lie to the app.",
  drinkCream: "Milk/cream situation? This is where it gets suspicious.",

  // Scenario-ish ids used by DB seeds
  cupSize: "Cup size. Tell the truth. The cup remembers.",
  sugarLevel: "Sugar level. We’re measuring joy today.",
};

// =====================================================
// C) OPTION CLICK REACTIONS (micro-roasts per answer)
// =====================================================

export const optionClickRoasts = {
  // Pizza
  "slices|Just 1 (Liar)": "Sure. Just one. We believe you. (We don't.)",
  "slices|2-3 (Respectable)":
    "Respectable! You're at least honest about your chaos.",
  "slices|4-6 (The 'I'm stressed' special)":
    "The stress special. Classic. The app respects the energy.",
  "slices|The whole thing (No judgment... okay, maybe a little)":
    "You ate the whole thing. The app has no words. Just respect.",

  "grease|Dry as a bone": "A dry pizza? Who hurt you?",
  "grease|Shiny": "Shiny is honest. Shiny we can work with.",
  "grease|I needed a second napkin":
    "Two napkins in, and we're just getting started.",
  "grease|It's currently transparent":
    "Transparent grease pizza. That's actually impressive.",

  // Burger
  "patties|Single (The snack)":
    "A single patty. Restraint! The app is shocked.",
  "patties|Double (The standard)":
    "Double. The safe middle ground. Very reasonable of you.",
  "patties|Triple (The challenge)":
    "Triple patty. Now we're cooking (literally).",
  "patties|I can't see the bun anymore":
    "The bun disappeared. This is a structural problem now.",

  "sides|No, I'm on a 'diet'":
    "Sure you are. (The quotes around 'diet' say otherwise.)",
  "sides|Small (3 fries)": "3 fries. The app respects this lie.",
  "sides|Large (The bucket)": "A bucket of fries. Commitment to the bit.",
  "sides|Fries AND a shake (Living life to the fullest)":
    "Fries AND a shake. You're not wrong. You ARE living.",

  // Salad
  "dressing|A light mist":
    "A _light mist_. Tell the app: do you actually like salad?",
  "dressing|A healthy drizzle": "Healthy drizzle. That's a start.",
  "dressing|It's a soup now":
    "Soup. We're calling it soup. The app isn't mad, just impressed.",

  "toppings|Just leaves": "Just leaves. That's... almost respectable.",
  "toppings|A few croutons": "Croutons! You're adding flavor. Noted.",
  "toppings|More cheese than lettuce":
    "More cheese than lettuce. This is pasta now, but make it work.",

  // Coffee
  "type|Black (The soul of a poet)": "Black coffee! The app nods in respect.",
  "type|Latte (The safe choice)":
    "A latte. The safe middle ground. Very normal of you.",
  "type|Frappuccino (The dessert in disguise)":
    "Frappuccino. Just call it ice cream next time; save us all the drama.",

  "sugar|None, I'm sweet enough": "No sugar added. The confidence here.",
  "sugar|1-2 pumps": "One or two pumps. Reasonable human behavior.",
  "sugar|I lost count": "You lost count of the sugar. The app is not shocked.",

  // Generic
  "size|Tiny (Bird portion)":
    "Tiny? Either you're being humble or you're a bird.",
  "size|Normal (Human portion)": "A human portion. Groundbreaking.",
  "size|Large (Hungry human portion)": "Large. The app respects the honesty.",
  "size|Gigantic (Feeds a small village)":
    "Gigantic. This thing has its own zip code.",

  "regret|0 - Pure bliss": "Pure bliss. The app loves the energy.",
  "regret|5 - It was okay": "Five. Honest middle ground.",
  "regret|10 - I need a nap and a gym membership":
    "Full regret mode. The app feels this in its circuits.",

  // Food type branch
  "foodType|Meal": "Meal. Okay, main character energy.",
  "foodType|Snack":
    "Snack. This can still be dangerous. Don’t get comfortable.",
  "foodType|Drink":
    "Drink. The sneakiest calories. The most innocent-looking lies.",

  // Generic Meal/Snack/Drink flows
  "mealPortion|Small plate": "Small plate. We love portion control cosplay.",
  "mealPortion|Normal plate": "Normal plate. A rare moment of balance.",
  "mealPortion|Big plate": "Big plate. Bold.",
  "mealPortion|Seconds happened": "Seconds. The plot thickens.",

  "mealExtras|None / minimal":
    "Minimal extras. Who are you and what have you done with you?",
  "mealExtras|Some sauce/cheese": "Some extras. Reasonable chaos.",
  "mealExtras|Heavy sauce/cheese/oil":
    "Heavy extras. Sauce said: I’m the captain now.",

  "snackAmount|One serving (allegedly)": "One serving. Allegedly. Sure.",
  "snackAmount|Two servings": "Two servings. The honest path.",
  "snackAmount|Three+ servings (oops)":
    "Three+ servings. ‘Oops’ is doing a lot of work here.",

  "snackType|Fruit / light snack":
    "Fruit. Look at you, pretending you’re balanced.",
  "snackType|Chips / cookies": "Chips/cookies. Classic snack villain arc.",
  "snackType|Candy / dessert snack":
    "Dessert snack. Sugar side quest accepted.",

  "drinkSize|250 ml / 8 oz": "Small drink. Cute.",
  "drinkSize|350 ml / 12 oz": "Normal-ish. We move.",
  "drinkSize|500 ml / 16 oz": "That’s a whole beverage meal.",
  "drinkSize|700 ml / 24 oz": "That cup is doing cardio for you.",
  "drinkSize|1000 ml / 34 oz": "A liter?? This is hydration cosplay.",

  "drinkSugar|No sugar":
    "No sugar? Sure. And I’m a treadmill. I believe you. Mostly.",
  "drinkSugar|Some sugar": "Some sugar. The ‘it’s fine’ special.",
  "drinkSugar|Very sweet": "Very sweet. We’re speedrunning joy.",

  "drinkCream|No": "No cream. Suspiciously responsible.",
  "drinkCream|Yes": "A little creamy. Noted.",
  "drinkCream|Extra creamy": "Extra creamy. That’s basically dessert.",

  // Scenario-ish ids used by DB seeds
  "cupSize|350 ml / 12 oz (small-ish)": "Small-ish. Allegedly responsible.",
  "cupSize|500 ml / 16 oz (standard)": "Standard. Still counts though.",
  "cupSize|700 ml / 24 oz (the bucket)": "Bucket size. Bold choice.",
  "cupSize|1000 ml / 34 oz (basically a jug)":
    "That’s not a cup. That’s a commitment.",

  "sugarLevel|0% (ascetic)": "0% sugar. Ascetic. Also… sure.",
  "sugarLevel|25% (polite)": "25% sugar: the ‘I’m trying’ performance.",
  "sugarLevel|50% (normal human)": "50% sugar: balanced chaos.",
  "sugarLevel|75% (sweet-tooth energy)":
    "75% sugar: your taste buds are the CEO now.",
  "sugarLevel|100% (mainlining joy)":
    "100% sugar: we’re not sipping, we’re speedrunning joy.",
};

// =====================================================
// D) RESULT SCRIPTS BY CALORIE BAND
// =====================================================

export const resultScriptsByBand = {
  // Band A: < 300
  under300: {
    titles: [
      "Is that all? Are you a hummingbird?",
      "The app is impressed. And confused.",
      "That's... actually not bad.",
      "Sub-300. You've got restraint.",
      "Okay, that was efficient.",
      "The app did not expect this.",
    ],
    details: [
      "This is what 'reasonable' looks like.",
      "Your stomach probably wondered what was happening.",
      "Plot twist: you ate healthier than expected.",
      "The calories barely registered on the app's radar.",
      "Your metabolism shrugged and moved on.",
    ],
    callbacks: [
      "The fact that you said '{answer}' makes this even more respectable.",
      "With that choice, you actually kept it reasonable.",
    ],
  },

  // Band B: 300–699
  low700: {
    titles: [
      "A solid effort. Your metabolism is mildly annoyed.",
      "That's a good snack energy.",
      "Not bad. The app approves-ish.",
      "You're in the sweet spot of honesty.",
      "Respectable chaos.",
      "The app nods slowly.",
    ],
    details: [
      "This is a normal meal. Nothing shocking here.",
      "Your body can handle this. Probably.",
      "The math checked out. The app is pleasantly surprised.",
      "You're staying in reasonable territory.",
      "This is what balanced looks like (sort of).",
    ],
    callbacks: [
      "Picking '{answer}' shows some self-awareness.",
      "That '{answer}' choice was honest. Respect.",
    ],
  },

  // Band C: 700–1499
  mid1500: {
    titles: [
      "Wow. That's... impressive. Maybe take the stairs today?",
      "Okay, we need to talk.",
      "The plot thickens. And thickens.",
      "This is the 'I'll regret this later' zone.",
      "The app is taking notes.",
      "Your future self will remember this.",
    ],
    details: [
      "That's... a lot. In a casual way.",
      "Your couch has opinions now.",
      "The calories are getting loud.",
      "One meal = half your daily budget. Math is real.",
      "Tomorrow-you will have thoughts about this.",
    ],
    callbacks: [
      "And you said '{answer}'. The app gets it.",
      "That '{answer}' choice really committed to the bit.",
    ],
  },

  // Band D: >= 1500
  legendary: {
    titles: [
      "You've achieved legendary status. Your couch is calling your name.",
      "The app has no judgment. Only awe.",
      "This is the stuff of legend.",
      "Your metabolism is filing a complaint.",
      "The stairs will definitely remember.",
      "This is a meal that makes history.",
    ],
    details: [
      "That's a full day's calories. In one sitting.",
      "The app's confidence in its math just went up.",
      "Your body is about to have a very interesting afternoon.",
      "This is what 'commitment' looks like.",
      "Future-you will have a lot of feelings about this.",
    ],
    callbacks: [
      "And with '{answer}' on top of it? Legendary.",
      "The '{answer}' choice sealed the deal on this epic.",
    ],
  },
};

// =====================================================
// E) DELICIOUSNESS / TASTE TAX LINES
// =====================================================

export const tasteTaxRoasts = {
  delicious: {
    reactions: [
      "So it was actually worth it. The app respects the energy.",
      "Worth every calorie. Honestly based.",
      "You went full hedonist. Respect.",
      "When food is THIS good, the app gets it.",
      "Delicious is delicious. No regrets (except maybe tomorrow).",
    ],
    suggestions: [
      "Tomorrow: eat something boring and light. Call it a 'balance meal.'",
      "Next meal should be protein and veggies. Make it a win-win.",
      "Swap the fancy drink for water. Keep the flavor, lose the liquid calories.",
      "Next time: same energy, smaller portion.",
      "Tomorrow's meal just became 'light and chill.' You earned it.",
    ],
  },
  ok: {
    reactions: [
      "It was okay. Honest. The app appreciates the truth.",
      "Mid, but fine. Fair energy.",
      "Decent choice. Nothing to write home about, but you're alive.",
      "It was fine. The app won't judge.",
      "Okay is okay. Let's move on.",
    ],
    suggestions: [
      "Next meal: go lighter. Balance the scales a little.",
      "Add a walk. Even 10 minutes. Tiny effort, big vibes.",
      "Next time: same portion, better toppings.",
      "Keep the protein, drop the extra sides.",
      "Tomorrow: boring but nourishing. You've got this.",
    ],
  },
  not_really: {
    reactions: [
      "So you paid the calorie price AND didn't even enjoy it? Tragic.",
      "Rough. You suffered AND the math is bad.",
      "Yikes. This is the one that stings.",
      "Not worth it, and you knew that. The app sees you.",
      "That's the saddest part: it wasn't even good.",
    ],
    suggestions: [
      "Next meal: make it GOOD. If you're eating it, savor it.",
      "Pick something you actually like. Life is too short.",
      "Next time: better choice, same confidence.",
      "Food should be a joy, not a regret. Let's fix that.",
      "The app believes in you. Eat something YOU want next time.",
    ],
  },
};

// =====================================================
// F) RESET VARIANTS (button label rotations)
// =====================================================

export const resetVariants = [
  "EAT AGAIN?",
  "NEXT MEAL?",
  "AGAIN?",
  "TRY ANOTHER?",
  "MORE?",
  "LET'S GO AGAIN?",
  "ROUND TWO?",
];

// =====================================================
// HELPER: Pick random line from an array with stable seed
// =====================================================

export function pickRandom<T>(items: T[], seed?: number): T {
  if (!items.length) return items[0];
  const index = seed
    ? (seed * 9301 + 49297) % 233280 // simple seeded random
    : Math.floor(Math.random() * items.length);
  return items[index % items.length];
}

// =====================================================
// HELPER: Format roast with variables
// =====================================================

export function formatRoast(
  template: string,
  vars: { dish?: string; cal?: number; answer?: string; scenario?: string }
): string {
  let result = template;
  if (vars.dish) result = result.replace(/{dish}/g, vars.dish.toLowerCase());
  if (vars.cal) result = result.replace(/{cal}/g, vars.cal.toString());
  if (vars.answer) result = result.replace(/{answer}/g, vars.answer);
  if (vars.scenario) result = result.replace(/{scenario}/g, vars.scenario);
  return result;
}

// =====================================================
// HELPER: Get result script for calorie band
// =====================================================

export function getResultScript(
  calories: number,
  answer?: string
): { title: string; detail: string; callback: string } {
  let band: keyof typeof resultScriptsByBand;
  if (calories < 300) band = "under300";
  else if (calories < 700) band = "low700";
  else if (calories < 1500) band = "mid1500";
  else band = "legendary";

  const script = resultScriptsByBand[band];
  return {
    title: pickRandom(script.titles),
    detail: pickRandom(script.details),
    callback: pickRandom(
      script.callbacks,
      answer ? answer.charCodeAt(0) : undefined
    ),
  };
}
