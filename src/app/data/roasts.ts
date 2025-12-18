// Roast script library: all funny copy organized by surface
// This file makes it easy to update humor without touching the component logic

// =====================================================
// A) DISH RECOGNITION LINES (when user enters dish)
// =====================================================

export const greetingRoasts = {
  recent: [
    "Back already? The last meal hasn't even left your stomach.",
    "Again? Your digestive system is working overtime.",
    "You just logged something. Are you speedrunning a heart attack?",
    "Welcome back, hungry human. Still hungry, or just bored?",
    "The kitchen called; wants to know when you plan to leave for the day.",
    "Is this a snack or a second lunch? Pick a lane before I do it for you.",
    "Your stomach is a bottomless pit, or are you trying to prove relativity wrong?",
    "Back so soon? I hope the fridge at least gave you a goodbye hug.",
    "Logging again? The app already scheduled another existential crisis for you.",
    "Welcome back. Let's see what else you've 'accidentally' inhaled.",
    "Back already? Did you forget to log the side of fries and now you're correcting it?",
    "You're back. Is this a snack or a cry for help? Either way, tell the truth.",
    "Again? Your digestive system needs a union representative with overtime pay.",
    "Welcome back. The fridge door is still open, so either you're sloppy or rebellious.",
    "Back so soon? I assume the first meal was just a warm-up act.",
    "Logging again? You're single-handedly keeping the calorie economy in motion.",
    "Welcome back. Time to put numbers on this nutritionally questionable art.",
  ],
  absent: [
    "Where have you been? The scale was starting to get lonely.",
    "Oh, look who decided to show up. Forgot your password or just the gym?",
    "Long time no see. Did you finally finish that 5-pound burrito?",
    "Welcome back. I assume you've been 'forgetting' to log for a while.",
    "Back from your 'break'? Let's see the damage.",
    "The app missed you. Your belt, however, did not.",
    "Decided to face the music, huh? Let's see what you've been hiding.",
    "Welcome back. I hope you enjoyed your period of denial.",
    "You're back! Did you run out of excuses or just out of food?",
    "Look who's back. Ready to pretend you're still on track?",
    "Where were you? I was about to file a missing person report with the gym.",
    "Back at last. Did you have to buy new pants before coming back?",
    "Oh, you're still alive. I thought you'd drowned in a vat of gravy.",
    "Welcome back. How was your vacation from accountability?",
    "Look who decided to stop hiding. Let's see the results of your 'off-grid' eating.",
    "I was about to send a search party to the fridge. Glad you resurfaced.",
    "You've been gone so long I gave your fridge a condolence card.",
  ],
  firstTime: [
    "Welcome! Ready to face the truth about your life choices?",
    "First time? Don't worry, the app is only slightly judgmental.",
    "New here? Let's start the journey of regret together.",
    "Welcome to Lazy Calo. Where we count the things you wish you didn't eat.",
    "First log? Make it a good one. Or a bad one, I don't care.",
    "Wow, look at you showing up. Let's pretend this is the beginning of a trend.",
    "Newbie alert! Prepare for roast-level accountability.",
    "First log? I expect dramatic honesty or an elaborate lie.",
    "Logging for the first time? This is where denial meets math.",
    "Nice to meet you. Now hand over the receipts from your last meal.",
  ],
};

export const dishRecognitionRoasts = {
  pizza: [
    "Logging pizza. The app's credibility just went down.",
    "Pizza noted. This is either very brave or very honest.",
    "Say goodbye to simplicity.",
    "Pizza logged. The calorie band just got wider.",
    "Alright, we're doing this.",
    "Pizza. Of course. Let's see what you did.",
    "Pizza detected. Somewhere, a nap schedule just shifted.",
    "Pizza entered. The algorithm is pre-heating.",
    "Pizza. Classic. The numbers are about to get emotional.",
    "Pizza logged. Grease math engaged.",
    "Okay, pizza. This is either a treat or a lifestyle.",
    "Pizza? Bold. Let's quantify the vibes.",
    "Pizza confirmed. Your future self just sighed.",
    "Pizza recognized. Sauce-to-regret ratio pending.",
  ],
  burger: [
    "A burger, huh? The math is about to get spicy.",
    "Burger incoming. Buckle up.",
    "Logged. Now let's talk about what happened.",
    "One burger? Let's be honest.",
    "Burger noted. This might be educational.",
    "Okay, burger. Let's calculate the chaos.",
    "Burger logged. Structural integrity check in progress.",
    "Burger detected. Buns are hiding secrets.",
    "Burger entered. The napkin budget just increased.",
    "Burger confirmed. This is going to be a story.",
    "Burger acknowledged. We're measuring consequences now.",
    "Burger. The safest way to accidentally eat 900 calories.",
    "Burger recorded. The app is chewing on the numbers.",
  ],
  salad: [
    "A salad! Okay, but we both know what that means.",
    "Salad logged. (The toppings will tell the truth.)",
    "Salad incoming. This is either very healthy or very not.",
    "Salad. Sure. Let's talk details.",
    "Salad noted. Dressing amount is about to matter.",
    "Salad logged. Now the plot thickens.",
    "Salad detected. Please declare the cheese situation.",
    "Salad entered. It's either virtue or camouflage.",
    "Salad confirmed. The croutons are about to testify.",
    "Salad logged. We're auditing the toppings.",
    "Salad. The most deceptive word in food.",
    "Salad recorded. I'm watching the dressing hand.",
    "Salad. Okay. Now show me what you *did* to it.",
  ],
  coffee: [
    "Coffee, huh? Bold of you to call that a drink.",
    "Logging coffee. Pretty sure this is dessert.",
    "Coffee noted. (Sips of regret incoming.)",
    "Coffee added. Let's see how much sugar we're talking.",
    "Coffee logged. Time to face what you did.",
    "Alright, coffee. But what KIND of coffee?",
    "Coffee detected. Please disclose the syrup crimes.",
    "Coffee logged. We're counting pumps, not feelings.",
    "Coffee entered. This might be a milkshake in denial.",
    "Coffee confirmed. Your barista knows the truth.",
    "Coffee. The gateway to accidental calories.",
    "Coffee recorded. The foam is suspicious.",
    "Coffee added. Tell me it wasn't 'extra sweet'.",
  ],
  "bubble tea": [
    "Bubble tea logged. Tea cosplay with dessert consequences.",
    "Bubble tea detected. The pearls are about to testify.",
    "Bubble tea entered. We will be auditing sugar and toppings.",
    "Bubble tea confirmed. Straw-to-regret ratio pending.",
    "Bubble tea recorded. Liquid calories in a cute cup.",
    "Bubble tea logged. Please disclose the boba situation.",
  ],
  boba: [
    "Boba logged. Chewing your drink was a choice.",
    "Boba detected. The tapioca pearls are basically side quests.",
    "Boba entered. Sugar level confession time.",
    "Boba confirmed. This is dessert pretending to hydrate you.",
    "Boba recorded. The straw is a pipeline of consequences.",
  ],
  sushi: [
    "Sushi logged. Elegant chaos, served cold.",
    "Sushi detected. The soy sauce will decide your fate.",
    "Sushi entered. Please disclose the mayo roll crimes.",
    "Sushi confirmed. Pieces count confession required.",
    "Sushi recorded. Rice adds up fast. Surprise.",
    "Sushi logged. We will be auditing the side quests.",
  ],
  steak: [
    "Steak logged. Protein with a butter budget.",
    "Steak detected. Size matters and you know it.",
    "Steak entered. Please disclose the sauce/butter situation.",
    "Steak confirmed. Sides are where things get dangerous.",
    "Steak recorded. The plate is doing the heavy lifting.",
    "Steak logged. We respect the commitment, fear the sides.",
  ],
  ramen: [
    "Ramen logged. Broth-to-regret ratio pending.",
    "Ramen detected. This is going to be salty in multiple ways.",
    "Ramen entered. The noodles are doing the most.",
    "Ramen confirmed. We are now measuring comfort in calories.",
    "Ramen logged. Please disclose the extra noodles.",
    "Ramen. The warm hug that comes with paperwork.",
    "Ramen recorded. The bowl is deeper than your honesty.",
    "Ramen spotted. It's soup, but make it expensive.",
    "Ramen noted. We will be auditing the add-ons.",
  ],
  "fried chicken": [
    "Fried chicken detected. The crunch tax is real.",
    "Fried chicken logged. Somewhere a nap is forming.",
    "Fried chicken entered. We are counting pieces, not vibes.",
    "Fried chicken confirmed. Sauce is about to snitch.",
    "Fried chicken. The safest way to accidentally eat a side dish.",
    "Fried chicken recorded. Your fingers are telling on you.",
    "Fried chicken logged. The bucket is watching.",
    "Crispy chicken detected. The app is bracing itself.",
  ],
  "ice cream": [
    "Ice cream logged. Dessert has entered the chat.",
    "Ice cream detected. This is joy with a receipt.",
    "Ice cream confirmed. We're measuring scoops, not dreams.",
    "Ice cream entered. Please declare the toppings crime.",
    "Ice cream recorded. Summer behavior, year-round consequences.",
    "Ice cream logged. Cone math engaged.",
    "Ice cream. Cute. Dangerous.",
    "Ice cream spotted. The sprinkles are a distraction tactic.",
  ],
  soda: [
    "Soda logged. Liquid calories: the stealth boss.",
    "Soda detected. The bubbles are not innocent.",
    "Soda entered. That's basically dessert water.",
    "Soda confirmed. Please disclose the refill situation.",
    "Soda recorded. Your teeth felt that.",
    "Soda logged. We are now counting sips.",
    "Soda. The sweetest way to pretend you're just thirsty.",
    "Soda spotted. The cup size is doing the talking.",
  ],
  chips: [
    "Chips logged. The bag said 'share'. You said 'no'.",
    "Chips detected. Crunchy chaos incoming.",
    "Chips entered. This is portion control's nemesis.",
    "Chips confirmed. Please disclose if dip was involved.",
    "Chips recorded. The crumbs are evidence.",
    "Chips logged. The family-size bag is suspicious.",
    "Chips. The snack that becomes a meal if you blink.",
  ],
  donut: [
    "Donut logged. Breakfast? Dessert? Yes.",
    "Donut detected. Glaze-to-regret ratio pending.",
    "Donut entered. The frosting is doing payroll.",
    "Donut confirmed. How many was 'just one' again?",
    "Donut recorded. The box is judging.",
    "Donut logged. Tiny circle, huge consequences.",
    "Donut. The most efficient sugar delivery system.",
  ],
  pasta: [
    "Pasta logged. Carb hugs have a price.",
    "Pasta detected. The bowl is doing heavy lifting.",
    "Pasta entered. Sauce type will decide your fate.",
    "Pasta confirmed. This is comfort, quantified.",
    "Pasta recorded. We will be auditing the cheese.",
    "Pasta logged. Bread on the side? Of course.",
    "Pasta. The 'one more bite' loop.",
    "Pasta spotted. The app can smell the alfredo.",
  ],
  tacos: [
    "Tacos logged. This is about to be deliciously chaotic.",
    "Tacos detected. Counting tacos is a courage test.",
    "Tacos entered. Please disclose the queso.",
    "Tacos confirmed. The sides will hurt.",
    "Tacos recorded. Two is never two.",
    "Tacos logged. Crunch math engaged.",
    "Tacos. The tastiest way to lose track of numbers.",
  ],
  smoothie: [
    "Smoothie logged. This is either health or dessert cosplay.",
    "Smoothie detected. The base will tell the truth.",
    "Smoothie entered. Add-ins are about to snitch.",
    "Smoothie confirmed. Liquid calories, but make it wholesome.",
    "Smoothie recorded. Protein? Or just vibes?",
    "Smoothie logged. Cup size matters.",
    "Smoothie. The sneakiest 'it's basically fruit' lie.",
  ],
  cake: [
    "Cake logged. The celebration has consequences.",
    "Cake detected. Frosting is about to do numbers.",
    "Cake entered. Slice size confession time.",
    "Cake confirmed. Seconds are suspicious.",
    "Cake recorded. That's not a snack, that's an event.",
    "Cake logged. The fork is a weapon.",
    "Cake. Cute. Devastating.",
  ],
  burrito: [
    "Burrito logged. The tortilla is hiding secrets.",
    "Burrito detected. This is a portable commitment.",
    "Burrito entered. Please disclose the guac.",
    "Burrito confirmed. Rice + cheese are doing overtime.",
    "Burrito recorded. This is a meal you can hold.",
    "Burrito logged. The wrap is thicker than your excuses.",
    "Burrito. The most efficient way to eat 1,000 calories politely.",
  ],
  sandwich: [
    "Sandwich logged. Bread math incoming.",
    "Sandwich detected. Please disclose the mayo.",
    "Sandwich entered. This is either lunch or a saga.",
    "Sandwich confirmed. The cheese will testify.",
    "Sandwich recorded. Subs are never 'just a sandwich'.",
    "Sandwich logged. Panini energy detected.",
    "Sandwich. The innocent-looking calorie envelope.",
  ],
  pho: [
    "Pho logged. Comfort soup with a side of math.",
    "Pho detected. The broth is calm. The add-ons are not.",
    "Pho entered. Noodles will be counted.",
    "Pho confirmed. Extra meat? Be honest.",
    "Pho recorded. This is soup, but make it a whole meal.",
    "Pho logged. The bowl is deeper than your restraint.",
  ],
  curry: [
    "Curry logged. Sauce-to-rice ratio pending.",
    "Curry detected. This is about to be deliciously dense.",
    "Curry entered. Cream/ghee situation will decide everything.",
    "Curry confirmed. Naan on the side? Of course.",
    "Curry recorded. Comfort food with consequences.",
    "Curry logged. The app is smelling butter.",
  ],
  pancakes: [
    "Pancakes logged. Syrup is about to snitch.",
    "Pancakes detected. Breakfast dessert incoming.",
    "Pancakes entered. Butter math engaged.",
    "Pancakes confirmed. How tall was the stack?",
    "Pancakes recorded. This is a sweet start to a day.",
    "Pancakes logged. Waffle behavior also counts.",
  ],
  "fried rice": [
    "Fried rice logged. The oil is doing the talking.",
    "Fried rice detected. Bowl size confession required.",
    "Fried rice entered. Sauce will decide your fate.",
    "Fried rice confirmed. This is comfort, quantified.",
    "Fried rice recorded. Extra toppings are suspicious.",
    "Fried rice logged. The rice bowl is never as small as you think.",
  ],
  generic: [
    "Okay, {dish} noted. Let's do this.",
    "Logging {dish}. This is going to be educational.",
    "Brave of you to type that with confidence.",
    "{dish}. The app is listening.",
    "Got it. {dish}. Let's calculate.",
    "Alright, {dish}. Show us what you've got.",
    "{dish} entered. The spreadsheet has feelings now.",
    "{dish} logged. Let's translate vibes into numbers.",
    "Noted: {dish}. The math is sharpening its knives.",
    "{dish}. Interesting. We'll pretend this is normal.",
    "{dish} confirmed. The app is quietly judging the portion size.",
    "Got {dish}. This is either a snack or a chapter.",
    "{dish}. Alright. Let's see how honest you plan to be.",
    "{dish} accepted. The consequences are being calculated.",
    "{dish}. Great. Now we do the part where numbers happen.",
    "Logging {dish}. You sure about that spelling? Anyway.",
    "{dish}. Cool. The app has turned on its 'suspicious' mode.",
    "{dish} noted. Please refrain from lying to the algorithm.",
  ],
};

// =====================================================
// B) QUESTION INTRO STINGERS (before options)
// =====================================================

export const questionIntroRoasts = {
  // Pizza
  slices: [
    "How many slices before you convinced yourself it was still 'just one pizza'?",
    "Slice count. Be honest — the box knows.",
    "How many slices did you *mean* to eat? And how many actually happened?",
    "Count the slices like you're reporting to a court.",
    "Slice audit time. No vibes, just numbers.",
    "How many slices disappeared mysteriously?",
  ],
  grease: [
    "Now let's talk about the grease situation, because you know how important it is.",
    "Grease level check. Napkins will be called as witnesses.",
    "How shiny was it? This matters more than your feelings.",
    "Grease report required. The crust can't hide forever.",
    "Let's quantify the oil situation.",
  ],

  // Burger
  patties: [
    "How many patties are we hiding between those buns?",
    "Patty count. Speak now.",
    "How many layers of commitment are in this burger?",
    "Patty inventory time. Don't make me guess.",
    "How tall was the burger, emotionally?",
  ],
  sides: [
    "Did you keep it light with the sides, or...?",
    "Sides included? This is where things get expensive.",
    "What did the burger come with? Be specific.",
    "Sides check: innocent… or full side quest?",
    "Okay, and what else joined the party?",
  ],

  // Salad
  dressing: [
    "Alright, truth time: how much dressing are we talking?",
    "Dressing amount. The salad's alibi depends on it.",
    "How much sauce did you put on your leaves?",
    "Dressing check: mist, drizzle, or soup?",
    "Be honest about the dressing hand.",
  ],
  toppings: [
    "And here's where salad becomes interesting (or tragic) — what's in it?",
    "Toppings time. This is where salad turns into pasta.",
    "What's in the salad besides optimism?",
    "List the add-ons. Yes, the cheese too.",
    "Tell me the toppings. I can handle the truth.",
  ],

  // Coffee
  type: [
    "Type check. What kind of thing was this?",
    "What kind of *version* are we dealing with here?",
    "Pick the type. Don't overthink it (you will).",
    "Type classification time. Be brave.",
    "Name it. The app can handle the truth.",
  ],
  sugar: [
    "Now the important part: how much sugar did you order?",
    "Sugar check. Count the pumps.",
    "How sweet was it? Don't make me do forensic math.",
    "Declare the syrup situation.",
    "Sugar level confession booth.",
  ],

  // Bubble Tea
  cream: [
    "Milk/cream situation? The stealth multiplier.",
    "Dairy check. This is where tea becomes dessert.",
    "Cream level? Be honest. The cup remembers.",
    "Tell me the milk situation before we do the math.",
  ],

  // Generic
  size: [
    "Before we do the math, how big was this?",
    "Portion size. No poetry, please.",
    "How big are we talking? Like… realistically.",
    "Size check. Choose honesty over vibes.",
    "Portion report: tiny, normal, or 'I blacked out'?",
  ],
  regret: [
    "Finally: on a scale of 'pure bliss' to 'why did I do that', where are we?",
    "Regret rating. This helps calibrate reality.",
    "How's the post-meal emotional weather?",
    "Regret meter: calm, meh, or full nap mode?",
    "Tell me how you feel about this decision.",
  ],

  // Food type branch
  foodType: [
    "Quick classification time. Don't overthink it (you will).",
    "What category are we filing this under?",
    "Pick a lane: meal, snack, or drink.",
    "Classification time. Please don't argue with reality.",
    "What are we calling this? Be brave.",
  ],

  // Generic Meal/Snack/Drink flows
  mealPortion: [
    "Meal size. Be brave. Be honest.",
    "Meal portion. How serious was it?",
    "How big was the meal, realistically?",
    "Plate size confession time.",
  ],
  mealExtras: [
    "Extras count. Yes, even the 'little bit'.",
    "How extra did we get with sauces/cheese/oil?",
    "Add-ons check: minimal, some, or full chaos?",
    "What did you add that 'doesn't count'?",
  ],

  snackAmount: [
    "Snack amount. Define 'one serving' with your whole chest.",
    "Snack quantity. Don't use the word 'just'.",
    "How many servings *actually* happened?",
    "Snack portion: one, two, or 'oops'?",
  ],
  snackType: [
    "Snack energy check: wholesome… or chaos?",
    "Snack category. Are we being decent today?",
    "Snack vibe: fruit, chips, or dessert arc?",
    "Snack type. Choose your character.",
  ],

  drinkSize: [
    "Drink size. Liquids count. Sorry.",
    "Drink size check. Cups have consequences.",
    "How big was the drink? Be specific.",
    "Size matters. In beverages too.",
  ],
  drinkSugar: [
    "How sweet was it? Don't lie to the app.",
    "Sugar level in the drink?",
    "How sweet are we going — polite or main character?",
    "Sweetness check. Be honest.",
  ],
  drinkCream: [
    "Milk/cream situation? This is where it gets suspicious.",
    "Cream/milk check. This is the stealth calories part.",
    "Any milk/cream involved?",
    "Dairy situation: none, some, or dessert?",
  ],

  // Scenario-ish ids used by DB seeds
  cupSize: [
    "Cup size. Tell the truth. The cup remembers.",
    "Cup size. The straw has seen everything.",
    "How big was the cup? No lies.",
    "Size check: small-ish, standard, bucket, or jug?",
  ],
  sugarLevel: [
    "Sugar level. We're measuring joy today.",
    "Sugar percentage. Choose your destiny.",
    "Sweetness level confession.",
    "How sweet was it, objectively?",
  ],
  // Common scenario keys (keeps DB scenarios from feeling generic)
  pieces: [
    "Pieces count. This is where the truth lives.",
    "How many pieces are we talking?",
    "Pieces: be specific. The app is listening.",
    "Count them like you're reporting to a committee.",
  ],
  bowlSize: [
    "Bowl size. The bowl remembers.",
    "How big was the bowl?",
    "Bowl size confession time.",
    "Small, normal, or 'I fear no broth'?",
  ],
  broth: [
    "Broth style. Light, rich, or full movie-sheen?",
    "How rich was the broth?",
    "Broth check. This matters more than you'd like.",
    "Tell me if it was the heavy kind.",
  ],
  sauce: [
    "Sauce situation? This is where it gets expensive.",
    "How saucy are we talking?",
    "Sauce level confession.",
    "Sauce: none, some, or 'captain now'?",
  ],
  dip: [
    "Dip involved? Be honest.",
    "Did you bring dip into this?",
    "Dip check. This is the stealth calories part.",
    "Tell me about the dip situation.",
  ],
  bag: [
    "Bag size. The bag is never as small as you think.",
    "How big was the bag?",
    "Bag size confession time.",
    "Small, medium, or family size (solo mission)?",
  ],
  count: [
    "Count them. No, really.",
    "How many did you have?",
    "Count check. Be brave.",
    "Quantity confession booth.",
  ],
  portion: [
    "Portion size. Choose honesty over vibes.",
    "How big was the portion?",
    "Portion check. No poetry.",
    "Small, normal, or 'oops'?",
  ],
  scoops: [
    "Scoops count. We measure joy in scoops.",
    "How many scoops happened?",
    "Scoops: be honest.",
    "How many times did the scoop go back in?",
  ],
  cone: [
    "Cone or cup? This matters.",
    "Delivery method: cup, cone, or chaos?",
    "Cone check. Be honest.",
    "Cup or waffle cone? Choose wisely.",
  ],
  base: [
    "Base check. What are we building this on?",
    "What was the base?",
    "Base confession time.",
    "Pick the base. This is where lies happen.",
  ],
  addons: [
    "Add-ins? This is the stealth upgrade section.",
    "Any add-ons involved?",
    "Add-on check. Yes, protein counts.",
    "What did you add that 'doesn't count'?",
  ],
  frosting: [
    "Frosting situation?",
    "How frosted are we talking?",
    "Frosting check. This is the fun part.",
    "Thin layer or full cement?",
  ],
  seconds: [
    "Seconds happened?",
    "Did you go back for another round?",
    "Seconds check. Be honest.",
    "Round two or no?",
  ],
  slice: [
    "Slice size?",
    "How big was the slice?",
    "Slice check. Dense things count.",
    "Tiny slice or main character slice?",
  ],
  weight: [
    "Weight/size check. Rough estimate is fine.",
    "How big was it, weight-wise?",
    "Size by weight. Be brave.",
    "How much protein unit are we dealing with?",
  ],
  butter: [
    "Butter/oil situation?",
    "How buttery was this, realistically?",
    "Butter check. This is the stealth multiplier.",
    "Tell me about the butter.",
  ],
  style: [
    "Style check. What's the vibe?",
    "What style are we talking?",
    "Pick the style. This changes everything.",
    "Style classification time.",
  ],
  extras: [
    "Any extras that 'don't count'?",
    "Extras check. Be honest.",
    "What else joined the party?",
    "Extra add-ons: none, some, or chaos?",
  ],
};

// =====================================================
// C) OPTION CLICK REACTIONS (micro-roasts per answer)
// =====================================================

export const optionClickRoasts = {
  // Pizza
  "slices|Just 1 (Liar)": [
    "Sure. Just one. We believe you. (We don't.)",
    "One slice. Absolutely. Totally. Sure.",
    "Just one? The box disagrees, but okay.",
  ],
  "slices|2-3 (Respectable)": [
    "Respectable! You're at least honest about your chaos.",
    "2-3 slices: the responsible chaos bracket.",
    "Okay, that's a real answer. Respect.",
  ],
  "slices|4-6 (The 'I'm stressed' special)": [
    "The stress special. Classic. The app respects the energy.",
    "Ah yes, the 'today was a lot' portion.",
    "4-6 slices. The app is widening the chart.",
  ],
  "slices|The whole thing (No judgment... okay, maybe a little)": [
    "You ate the whole thing. The app has no words. Just respect.",
    "Whole pizza. That's a decision.",
    "You chose the full arc. Legendary.",
  ],

  "grease|Dry as a bone": [
    "A dry pizza? Who hurt you?",
    "Dry pizza. That's character development.",
  ],
  "grease|Shiny": "Shiny is honest. Shiny we can work with.",
  "grease|I needed a second napkin":
    "Two napkins in, and we're just getting started.",
  "grease|It's currently transparent":
    "Transparent grease pizza. That's actually impressive.",

  // Burger
  "patties|Single (The snack)": [
    "A single patty. Restraint! The app is shocked.",
    "Single patty. Calm and collected.",
    "One patty. Rare discipline sighting.",
  ],
  "patties|Double (The standard)": [
    "Double. The safe middle ground. Very reasonable of you.",
    "Double patty: the classic.",
    "Two patties. You came prepared.",
  ],
  "patties|Triple (The challenge)": [
    "Triple patty. Now we're cooking (literally).",
    "Triple patty. That's not lunch, that's a statement.",
    "Three patties. The bun is doing overtime.",
  ],
  "patties|I can't see the bun anymore": [
    "The bun disappeared. This is a structural problem now.",
    "Bun? Never heard of her.",
    "This burger has become architecture.",
  ],

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
  "size|Tiny (Bird portion)": [
    "Tiny? Either you're being humble or you're a bird.",
    "Tiny portion. Are you a sparrow?",
    "Small. Cute. Suspicious.",
  ],
  "size|Normal (Human portion)": "A human portion. Groundbreaking.",
  "size|Large (Hungry human portion)": [
    "Large. The app respects the honesty.",
    "Large portion. Bold but clear.",
    "Okay, big plate energy. Noted.",
  ],
  "size|Gigantic (Feeds a small village)": [
    "Gigantic. This thing has its own zip code.",
    "Gigantic. This meal pays taxes.",
    "That's not a portion, that's a project.",
  ],

  "regret|0 - Pure bliss": "Pure bliss. The app loves the energy.",
  "regret|5 - It was okay": "Five. Honest middle ground.",
  "regret|10 - I need a nap and a gym membership": [
    "Full regret mode. The app feels this in its circuits.",
    "10/10 regret. The couch is calling.",
    "Regret maxed. At least you're self-aware.",
  ],

  // Food type branch
  "foodType|Meal": "Meal. Okay, main character energy.",
  "foodType|Snack":
    "Snack. This can still be dangerous. Don't get comfortable.",
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
    "Heavy extras. Sauce said: I'm the captain now.",

  "snackAmount|One serving (allegedly)": "One serving. Allegedly. Sure.",
  "snackAmount|Two servings": "Two servings. The honest path.",
  "snackAmount|Three+ servings (oops)":
    "Three+ servings. 'Oops' is doing a lot of work here.",

  "snackType|Fruit / light snack":
    "Fruit. Look at you, pretending you're balanced.",
  "snackType|Chips / cookies": "Chips/cookies. Classic snack villain arc.",
  "snackType|Candy / dessert snack":
    "Dessert snack. Sugar side quest accepted.",

  "drinkSize|250 ml / 8 oz": "Small drink. Cute.",
  "drinkSize|350 ml / 12 oz": "Normal-ish. We move.",
  "drinkSize|500 ml / 16 oz": "That's a whole beverage meal.",
  "drinkSize|700 ml / 24 oz": "That cup is doing cardio for you.",
  "drinkSize|1000 ml / 34 oz": "A liter?? This is hydration cosplay.",

  "drinkSugar|No sugar":
    "No sugar? Sure. And I'm a treadmill. I believe you. Mostly.",
  "drinkSugar|Some sugar": "Some sugar. The 'it's fine' special.",
  "drinkSugar|Very sweet": "Very sweet. We're speedrunning joy.",

  "drinkCream|No": "No cream. Suspiciously responsible.",
  "drinkCream|Yes": "A little creamy. Noted.",
  "drinkCream|Extra creamy": "Extra creamy. That's basically dessert.",

  // Scenario-ish ids used by DB seeds
  "cupSize|350 ml / 12 oz (small-ish)": "Small-ish. Allegedly responsible.",
  "cupSize|500 ml / 16 oz (standard)": "Standard. Still counts though.",
  "cupSize|700 ml / 24 oz (the bucket)": "Bucket size. Bold choice.",
  "cupSize|1000 ml / 34 oz (basically a jug)":
    "That's not a cup. That's a commitment.",

  "sugarLevel|0% (ascetic)": "0% sugar. Ascetic. Also… sure.",
  "sugarLevel|25% (polite)": "25% sugar: the 'I'm trying' performance.",
  "sugarLevel|50% (normal human)": "50% sugar: balanced chaos.",
  "sugarLevel|75% (sweet-tooth energy)":
    "75% sugar: your taste buds are the CEO now.",
  "sugarLevel|100% (mainlining joy)":
    "100% sugar: we're not sipping, we're speedrunning joy.",

  // Bubble Tea (extra option reactions)
  "cream|No dairy (tea-only mode)": "Tea-only mode. Suspiciously responsible.",
  "cream|Regular milk": "Regular milk. Classic, comfy, and countable.",
  "cream|Cream / milk foam / extra creamy":
    "Extra creamy. Your tea just became a dessert.",

  "toppings|None (suspiciously responsible)":
    "No toppings. Who are you and what happened?",
  "toppings|Boba pearls": "Boba pearls. Chewable calories. Noted.",
  "toppings|Jelly/pudding": "Jelly/pudding. Fancy sugar textures. Respect.",
  "toppings|Extra boba + extras (chaos mode)":
    "Chaos mode. Your drink is now a full meal.",

  // Sushi
  "pieces|6 pieces (light snack)": "6 pieces. Light snack energy. Allegedly.",
  "pieces|8 pieces (classic)": "8 pieces. Classic. Respectable damage.",
  "pieces|12 pieces (respectable damage)":
    "12 pieces. The app respects the honesty.",
  "pieces|16+ pieces (I fear no salmon)":
    "16+ pieces. Fearless. Unhinged. Iconic.",

  "style|Mostly sashimi (lean-ish)": "Mostly sashimi. Lean-ish. We see you.",
  "style|Nigiri (rice included)": "Nigiri. Rice adds up. Still delicious.",
  "style|Rolls (standard)": "Standard rolls. Safe chaos.",
  "style|Saucy / mayo / crunchy rolls":
    "Saucy mayo rolls. You chose flavor over peace.",

  "extras|Just soy + wasabi": "Just soy/wasabi. Minimalism. Rare.",
  "extras|Miso soup / salad": "Miso/salad. A responsible side quest.",
  "extras|Edamame / gyoza (side quest)":
    "Side quest accepted. The calories came with it.",
  "extras|Tempura / fried things (plot twist)":
    "Plot twist: fried sides. The app sighed.",

  // Steak
  "weight|6 oz / ~170 g": "6 oz. Calm. Controlled. Respect.",
  "weight|8 oz / ~225 g": "8 oz. Standard steak behavior.",
  "weight|12 oz / ~340 g": "12 oz. Big protein energy.",
  "weight|16 oz / ~450 g (absolute unit)":
    "Absolute unit. The plate is filing a complaint.",

  "butter|No extra (rare behavior)": "No extra butter. Rare discipline.",
  "butter|A little butter/oil": "A little butter. The stealth tax.",
  "butter|Basted / garlic butter / sauce fiesta":
    "Garlic butter fiesta. Your steak just got expensive.",

  "sides|None (just vibes and protein)":
    "No sides. Just protein and power. Okay.",
  "sides|Veggies / salad": "Veggies/salad. Balance cosplay. Respect.",
  "sides|Potato / bread": "Potato/bread. Classic side damage.",
  "sides|Fries + something else (double side quest)":
    "Double side quest. Your steak brought friends.",

  // Generic (coverage keys used across multiple scenarios)
  "addons|None": "No add-ons. Minimalist era. Suspicious.",
  "addons|Protein": "Protein add-on. You're cosplaying as disciplined.",
  "addons|Nut butter / oats": "Nut butter/oats. Healthy-ish, but dense.",
  "addons|Both (the gym-influencer combo)":
    "Both add-ons. Gym-influencer combo unlocked.",

  "bag|Small bag": "Small bag. Cute. Potentially a lie.",
  "bag|Medium bag": "Medium bag. Standard snack damage.",
  "bag|Large bag (family size, solo mission)":
    "Family size, solo mission. The app salutes your bravery.",

  "base|Fruit + water": "Fruit + water base. The responsible timeline.",
  "base|Milk/yogurt": "Milk/yogurt base. Creamy calories have entered.",
  "base|Ice cream base / milkshake territory":
    "Ice cream base. We're in milkshake territory now.",

  "bowlSize|Small bowl": "Small bowl. Restraint cosplay. Respect.",
  "bowlSize|Normal bowl": "Normal bowl. The calm option. Allegedly.",
  "bowlSize|Big bowl": "Big bowl. The app is widening the chart.",

  "broth|Light (shoyu/miso-ish)": "Light broth. A rare peaceful choice.",
  "broth|Rich (tonkotsu vibes)": "Rich broth. The mouthfeel tax begins.",
  "broth|Extra rich + oil layer (movie sheen)":
    "Oil layer with a movie sheen. Cinematic calories.",

  "cone|Cup": "Cup. Practical. Still dangerous.",
  "cone|Waffle cone": "Waffle cone. The cone is also dessert. Noted.",
  "cone|Stuffed cone / extra": "Stuffed cone. You chose chaos on purpose.",

  "count|1 (innocent)": "One. Innocent behavior. Rare.",
  "count|2 (double trouble)": "Two. Double trouble. We move.",
  "count|2 tacos": "Two tacos. A warm-up round.",
  "count|3 tacos": "Three tacos. The app respects the honesty.",
  "count|4+ tacos": "4+ tacos. This is an event now.",
  "count|3+ (donut era)": "3+ donuts. You're in your donut era.",

  "dip|No dip": "No dip. Raw-dogging the snack. Bold.",
  "dip|Salsa": "Salsa. Acid and spice. Slightly responsible.",
  "dip|Cheese dip / creamy dip": "Cheese dip. Cream-based temptation.",

  "extras|None": "No extras. Minimalism. Rare.",
  "extras|No extras": "No extras. You kept it clean. Respect.",
  "extras|Bread on the side": "Bread on the side. Side quest accepted.",
  "extras|Egg": "Egg add-on. Protein with a side of calories.",
  "extras|Extra cheese": "Extra cheese. The app sighed.",
  "extras|Extra noodles": "Extra noodles. Doubling down on comfort.",
  "extras|Extra chashu/meat": "Extra meat. Protein flex. Still counts.",
  "extras|Meatballs / sausage": "Meatballs/sausage. Suddenly it's a feast.",
  "extras|Just soda": "Just soda. Liquid calories doing stealth work.",
  "extras|Sweet syrup add-on (rare but chaotic)":
    "Sweet syrup add-on. Rare, chaotic, and countable.",

  "frosting|Light frosting": "Light frosting. The 'I'm trying' performance.",
  "frosting|Thick frosting": "Thick frosting. Cement layer. Iconic.",
  "frosting|Frosting + extras": "Frosting plus extras. You chose violence.",

  "pieces|2 tenders / small portion": "2 tenders. Small portion. Allegedly.",
  "pieces|4 tenders / medium": "4 tenders. The classic damage.",
  "pieces|8 wings / big": "8 wings. Big energy. Sticky fingers incoming.",
  "pieces|Bucket energy": "Bucket energy. This is not a snack anymore.",

  "portion|Small bowl": "Small bowl. Cute. Suspicious.",
  "portion|Normal bowl": "Normal bowl. The 'it's fine' bracket.",
  "portion|Huge bowl": "Huge bowl. The app is bracing itself.",

  "sauce|No sauce": "No sauce. Dry era. Who hurt you?",
  "sauce|A little": "A little sauce. Controlled chaos.",
  "sauce|Drenched": "Drenched. Sauce is the main character.",
  "sauce|Tomato-based": "Tomato-based. Classic comfort tax.",
  "sauce|Cream-based": "Cream-based. The stealth multiplier.",
  "sauce|Oil/butter-based": "Oil/butter-based. The shine means calories.",

  "scoops|1 scoop": "One scoop. Innocent-ish.",
  "scoops|2 scoops": "Two scoops. The standard spiral.",
  "scoops|3 scoops (ambition)": "Three scoops. Ambition. Chaos.",
  "scoops|Sundae / huge cup": "Sundae mode. You came to win.",

  "seconds|No": "No seconds. Character growth.",
  "seconds|Yes": "Yes seconds. Round two energy. Noted.",

  "sides|No sides": "No sides. Minimalism. Rare behavior.",
  "sides|Fries": "Fries. The side that never stays a side.",
  "sides|Fries + a drink": "Fries + a drink. Combo behavior detected.",
  "sides|Mac & cheese": "Mac & cheese side. Comfort on comfort.",
  "sides|Rice/beans": "Rice/beans. The classic support squad.",
  "sides|Chips + salsa": "Chips + salsa. Crunch with a conscience.",
  "sides|Chips + queso (dangerously tasty)":
    "Chips + queso. Dangerously tasty. Loud calories.",

  "size|250 ml / 8 oz": "8 oz. Cute. Still counts.",
  "size|350 ml / 12 oz": "12 oz. Normal-ish. We move.",
  "size|500 ml / 16 oz": "16 oz. That's a whole beverage.",
  "size|700 ml / 24 oz": "24 oz. That cup is doing cardio.",
  "size|1000 ml / 34 oz": "34 oz. This is a jug in disguise.",

  "slice|Small slice": "Small slice. Cute. Suspicious.",
  "slice|Normal slice": "Normal slice. The baseline damage.",
  "slice|Big slice": "Big slice. Main character slice.",
  "slice|Cheesecake slice (dense mode)": "Cheesecake slice. Dense mode engaged.",

  "toppings|None": "No toppings. Raw choice. Respect.",
  "toppings|Sprinkles / small toppings": "Sprinkles. Tiny chaos. Mostly vibes.",
  "toppings|Chocolate sauce / caramel": "Sauce drizzle. Sweet tax applied.",
  "toppings|Nuts + sauce + whipped cream (the deluxe)":
    "The deluxe toppings. You built a project.",

  "type|Regular": "Regular. Classic. Still dangerous.",
  "type|Filled": "Filled. Surprise calories inside.",
  "type|Plain / glazed": "Plain/glazed. Simple chaos.",
  "type|Frosted + toppings": "Frosted + toppings. Fully committed.",
  "type|Cheesy / loaded": "Cheesy/loaded. The app felt that.",
  "type|Fried shell / extra crunch": "Fried shell. Extra crunch, extra math.",
  "type|Street style (simple)": "Street style. Simple. Dangerous anyway.",
  "type|Regular + refill(s)": "Refills happened. The plot thickens.",
  "type|Zero / diet": "Zero/diet. The app nods politely.",
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

  // Band B: 300-699
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

  // Band C: 700-1499
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
