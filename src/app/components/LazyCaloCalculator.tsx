"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Utensils,
  Calculator,
  RefreshCw,
  AlertCircle,
  Pizza,
  Hamburger,
  Salad,
  Coffee,
} from "lucide-react";
import {
  GENERIC_QUESTIONS,
  DELICIOUSNESS_QUESTION,
  FOOD_TYPE_QUESTION,
  MEAL_QUESTIONS,
  SNACK_QUESTIONS,
  DRINK_QUESTIONS,
  type Question,
} from "../data/questions";
import {
  deliciousnessFromLabel,
  getFunnyComment,
  getTasteTax,
  LAZY_TIPS,
  type TasteTax,
} from "../utils/helpers";
import {
  appendHistoryEntry,
  getDailySuggestion,
  getLocalDateKey,
  getTodayKey,
  loadHistory,
  type HistoryEntry,
} from "../utils/history";
import { buildRoastPack, type RoastPack } from "../utils/roastEngine";
import {
  clearProfile,
  estimateCaloriePlan,
  loadProfile,
  saveProfile,
  type ActivityLevel,
  type DeficitPace,
  type Goal,
  type Sex,
  type UserProfile,
} from "../utils/profile";
import { getProcessRoast } from "../utils/processRoasts";

type Step = "input" | "questions" | "result" | "history" | "profile";

function parseSex(value: string): Sex {
  return value === "female" ? "female" : "male";
}

function parseActivity(value: string): ActivityLevel {
  switch (value) {
    case "sedentary":
    case "light":
    case "moderate":
    case "very":
    case "athlete":
      return value;
    default:
      return "light";
  }
}

function parseGoal(value: string): Goal {
  switch (value) {
    case "lose":
    case "maintain":
    case "gain":
      return value;
    default:
      return "maintain";
  }
}

function parseDeficitPace(value: string): DeficitPace {
  switch (value) {
    case "mild":
    case "standard":
    case "aggressive":
      return value;
    default:
      return "standard";
  }
}

export default function LazyCaloCalculator() {
  const [step, setStep] = useState<Step>("input");
  const [dish, setDish] = useState("");
  const [scenarioQuestions, setScenarioQuestions] = useState<Question[] | null>(
    null
  );
  const [scenarioIconKey, setScenarioIconKey] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [answersById, setAnswersById] = useState<Record<string, string>>({});
  const [pendingAnswer, setPendingAnswer] = useState<{
    questionId: string;
    value: number;
    label: string;
    comment: string;
  } | null>(null);
  const [tasteTax, setTasteTax] = useState<TasteTax | null>(null);
  const [isLoadingScenario, setIsLoadingScenario] = useState(false);
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [processRoast, setProcessRoast] = useState<string | null>(null);
  const [roastPack, setRoastPack] = useState<RoastPack>({
    dishRoast: null,
    questionIntroById: {},
    optionRoastByKey: {},
  });

  const getSelectionComment = (args: {
    questionId: string;
    label: string;
    value: number;
    optionComment?: string;
  }) => {
    if (args.optionComment) return args.optionComment;

    const tableKey = `${args.questionId}|${args.label}`;
    const optionRoast = roastPack.optionRoastByKey[tableKey];
    if (optionRoast) return optionRoast;

    const questionRoast = roastPack.questionIntroById[args.questionId];
    if (questionRoast) return questionRoast;

    const qid = args.questionId.toLowerCase();
    const label = args.label.toLowerCase();

    if (
      qid.includes("sugar") ||
      label.includes("sugar") ||
      label.includes("syrup")
    ) {
      const pickedZeroish =
        label.includes("0%") ||
        label.includes("no sugar") ||
        label.includes("none") ||
        label.includes("zero") ||
        label.includes("diet") ||
        label.includes("ascetic");

      if (pickedZeroish) {
        return "No sugar? Sure. And I’m a treadmill. I believe you. Mostly.";
      }

      if (label.includes("25%") || label.includes("polite")) {
        return "25% sugar: the ‘I’m trying’ performance. Respect.";
      }

      if (label.includes("50%") || label.includes("normal")) {
        return "50% sugar: balanced chaos. A classic.";
      }

      if (label.includes("75%") || label.includes("sweet")) {
        return "75% sugar: your taste buds are the CEO now.";
      }

      if (label.includes("100%") || label.includes("mainlining")) {
        return "100% sugar: we’re not sipping, we’re speedrunning joy.";
      }

      return "Sugar noted. Future you will remember this moment.";
    }

    if (args.questionId === "cupSize" || args.questionId === "drinkSize") {
      if (args.value >= 700) return "That cup is doing cardio for you.";
      if (args.value >= 500) return "Respect. That’s a whole beverage meal.";
      return "Cute. A responsible size. Allegedly.";
    }

    if (args.questionId === "deliciousness") {
      if (args.label.startsWith("Delicious"))
        return "Fair. Sometimes joy costs.";
      if (args.label.startsWith("Ok")) return "Mid, but committed. Powerful.";
      return "So we suffered… on purpose. Incredible.";
    }

    if (args.value === 0) return "Interesting. Self-control appeared briefly.";
    if (args.value >= 800) return "That option had a mortgage.";
    if (args.value >= 400) return "Alright. Bold.";
    return "Noted. We move.";
  };

  const startCalculation = async () => {
    if (!dish.trim()) return;

    setIsLoadingScenario(true);
    setScenarioQuestions(null);
    setScenarioIconKey(null);

    let pickedQuestions: Question[] | null = null;

    try {
      const res = await fetch(`/api/scenario?dish=${encodeURIComponent(dish)}`);
      const json = (await res.json()) as
        | {
            matched: true;
            scenario: {
              slug: string;
              iconKey: string;
              foodType: "MEAL" | "SNACK" | "DRINK";
              questions: Question[];
            };
            roasts?: RoastPack;
          }
        | { matched: false; roasts?: RoastPack };

      if (json.matched) {
        setScenarioIconKey(json.scenario.iconKey);
        setScenarioQuestions(json.scenario.questions);
        pickedQuestions = json.scenario.questions;

        if (json.roasts) {
          setRoastPack(json.roasts);
        }
      }

      if (!json.matched && json.roasts) {
        setRoastPack(json.roasts);
      }
    } catch {
      // Silent fallback to generic questions.
    } finally {
      setIsLoadingScenario(false);
    }

    const baseQuestions = pickedQuestions ?? [
      FOOD_TYPE_QUESTION,
      ...GENERIC_QUESTIONS,
    ];
    const allQuestions = [...baseQuestions, DELICIOUSNESS_QUESTION];
    setRoastPack((prev) =>
      prev.dishRoast ||
      Object.keys(prev.questionIntroById).length > 0 ||
      Object.keys(prev.optionRoastByKey).length > 0
        ? prev
        : buildRoastPack({ dish, questions: allQuestions, seed: dish.length })
    );

    setStep("questions");
    setCurrentQuestionIndex(0);
    setTotalCalories(0);
    setAnswersById({});
    setPendingAnswer(null);
    setTasteTax(null);
  };

  const handleAnswer = (questionId: string, value: number, label: string) => {
    const nextTotal = totalCalories + value;
    setTotalCalories(nextTotal);
    setAnswersById((prev) => ({ ...prev, [questionId]: label }));

    const baseQuestions = getBaseQuestions({
      ...answersById,
      [questionId]: label,
    });
    const allQuestions = [...baseQuestions, DELICIOUSNESS_QUESTION];

    // If the answer changes the rest of the flow (foodType), refresh the roast pack now.
    if (!scenarioQuestions && questionId === "foodType") {
      setRoastPack(
        buildRoastPack({
          dish,
          questions: allQuestions,
          seed: dish.length + label.length,
        })
      );
    }

    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setPendingAnswer(null);
      return;
    }

    const nextAnswersById = { ...answersById, [questionId]: label };
    const deliciousness = deliciousnessFromLabel(nextAnswersById.deliciousness);
    const seed = dish.length + nextTotal;
    setTasteTax(getTasteTax(deliciousness, nextTotal, seed));

    const currentHistory = loadHistory();
    const todayKeyLocal = getTodayKey();
    const todayEntriesLocal = currentHistory.filter(
      (e) => getLocalDateKey(e.timestamp) === todayKeyLocal
    );
    const todayTotalBefore = todayEntriesLocal.reduce(
      (sum, e) => sum + e.calories,
      0
    );

    const activeProfile = profile ?? loadProfile();
    const plan = activeProfile ? estimateCaloriePlan(activeProfile) : null;
    const target = plan?.target ?? 2000;

    const foodTypeHint =
      nextAnswersById.foodType === "Meal"
        ? "MEAL"
        : nextAnswersById.foodType === "Snack"
        ? "SNACK"
        : nextAnswersById.foodType === "Drink"
        ? "DRINK"
        : null;

    setProcessRoast(
      getProcessRoast({
        todayTotalBefore,
        todayTotalAfter: todayTotalBefore + nextTotal,
        todayCountBefore: todayEntriesLocal.length,
        dish: dish.trim(),
        calories: nextTotal,
        target,
        goal: activeProfile?.goal,
        foodTypeHint,
      })
    );

    appendHistoryEntry({
      timestamp: Date.now(),
      dish: dish.trim(),
      calories: nextTotal,
      answersById: nextAnswersById,
    });

    setStep("result");
    setPendingAnswer(null);
  };

  const reset = () => {
    setStep("input");
    setDish("");
    setScenarioQuestions(null);
    setScenarioIconKey(null);
    setIsLoadingScenario(false);
    setCurrentQuestionIndex(0);
    setTotalCalories(0);
    setAnswersById({});
    setPendingAnswer(null);
    setTasteTax(null);
    setProcessRoast(null);
  };

  const openHistory = () => {
    setProfile(loadProfile());
    const entries = loadHistory();
    setHistoryEntries(entries);
    setStep("history");
  };

  const openProfile = () => {
    setProfile(loadProfile());
    setStep("profile");
  };

  const [randomTip] = useState(
    () => LAZY_TIPS[Math.floor(Math.random() * LAZY_TIPS.length)]
  );

  const getBaseQuestions = (currentAnswers: Record<string, string>) => {
    if (scenarioQuestions) return scenarioQuestions;

    const foodType = currentAnswers.foodType;
    if (foodType === "Meal") return [FOOD_TYPE_QUESTION, ...MEAL_QUESTIONS];
    if (foodType === "Snack") return [FOOD_TYPE_QUESTION, ...SNACK_QUESTIONS];
    if (foodType === "Drink") return [FOOD_TYPE_QUESTION, ...DRINK_QUESTIONS];

    return [FOOD_TYPE_QUESTION, ...GENERIC_QUESTIONS];
  };

  const questions = [...getBaseQuestions(answersById), DELICIOUSNESS_QUESTION];

  const currentQuestion = questions[currentQuestionIndex];
  const canGoNext =
    !isLoadingScenario &&
    !!pendingAnswer &&
    pendingAnswer.questionId === currentQuestion.id;
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;

  const iconMap: Record<string, LucideIcon> = {
    Pizza,
    Hamburger,
    Salad,
    Coffee,
    Utensils,
  };

  const CurrentIcon: LucideIcon =
    (scenarioIconKey && iconMap[scenarioIconKey]) || Utensils;

  const todayKey = getTodayKey();
  const todayEntries = historyEntries.filter(
    (e) => getLocalDateKey(e.timestamp) === todayKey
  );
  const todayTotal = todayEntries.reduce((sum, e) => sum + e.calories, 0);

  const activeProfile =
    profile ?? (typeof window !== "undefined" ? loadProfile() : null);
  const plan = activeProfile ? estimateCaloriePlan(activeProfile) : null;
  const dailyTarget = plan?.target ?? 2000;
  const dailySuggestion = getDailySuggestion(todayTotal);

  const historyRoast = getProcessRoast({
    todayTotalBefore: todayTotal,
    todayTotalAfter: todayTotal,
    todayCountBefore: todayEntries.length,
    dish: "(history)",
    calories: 0,
    target: dailyTarget,
    goal: activeProfile?.goal,
  });

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border-4 border-black dark:border-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8" />
          Lazy Calo
        </h1>
        <p className="text-zinc-500 font-medium italic">
          &quot;Because counting is hard.&quot;
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="relative">
              <label className="block text-sm font-bold uppercase mb-2">
                What did you devour?
              </label>
              <input
                type="text"
                value={dish}
                onChange={(e) => setDish(e.target.value)}
                placeholder="e.g. A massive pizza, a sad salad..."
                className="w-full p-4 text-lg border-4 border-black dark:border-white rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all"
                onKeyDown={(e) => e.key === "Enter" && startCalculation()}
              />
            </div>
            <button
              onClick={startCalculation}
              disabled={isLoadingScenario}
              className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xl rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              {isLoadingScenario
                ? "CHECKING THE DATABASE..."
                : "ESTIMATE MY REGRET"}
            </button>

            <button
              onClick={openHistory}
              className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xl rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              VIEW HISTORY
            </button>

            <button
              onClick={openProfile}
              className="w-full py-4 bg-white dark:bg-zinc-900 text-black dark:text-white font-black text-xl rounded-xl border-4 border-black dark:border-white transition-all hover:opacity-90"
            >
              PROFILE
            </button>
          </motion.div>
        )}

        {step === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                <CurrentIcon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold">{dish}</h2>
            </div>

            <div className="space-y-4">
              <p className="text-lg font-medium">
                {isLoadingScenario
                  ? "Loading your consequences..."
                  : currentQuestion.text}
              </p>
              <div className="grid gap-3">
                {isLoadingScenario
                  ? null
                  : currentQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setPendingAnswer({
                            questionId: currentQuestion.id,
                            value: opt.value,
                            label: opt.label,
                            comment: getSelectionComment({
                              questionId: currentQuestion.id,
                              label: opt.label,
                              value: opt.value,
                              optionComment: opt.comment,
                            }),
                          })
                        }
                        className={`w-full p-4 text-left border-2 border-black dark:border-white rounded-xl transition-colors font-bold ${
                          pendingAnswer?.questionId === currentQuestion.id &&
                          pendingAnswer?.label === opt.label
                            ? "bg-zinc-100 dark:bg-zinc-800"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
              </div>

              {pendingAnswer?.questionId === currentQuestion.id && (
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-black dark:border-yellow-400 rounded-xl">
                  <p className="font-bold italic">{pendingAnswer.comment}</p>
                </div>
              )}

              <button
                onClick={() => {
                  if (!pendingAnswer) return;
                  handleAnswer(
                    pendingAnswer.questionId,
                    pendingAnswer.value,
                    pendingAnswer.label
                  );
                }}
                disabled={!canGoNext}
                className={`w-full py-4 font-black text-xl rounded-xl border-4 border-black transition-all ${
                  canGoNext
                    ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                    : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 border-zinc-600"
                }`}
              >
                {isLastQuestion ? "FINISH" : "NEXT"}
              </button>
            </div>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="text-7xl font-black mb-2"
              >
                {totalCalories}
              </motion.div>
              <p className="text-xl font-bold uppercase">
                Calories (Approx-ish)
              </p>
            </div>

            <div className="p-6 bg-yellow-100 dark:bg-yellow-900/30 border-4 border-black dark:border-yellow-400 rounded-2xl">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
              <p className="text-lg font-bold italic">
                {getFunnyComment(totalCalories)}
              </p>

              {processRoast && (
                <div className="mt-4 p-4 bg-white/70 dark:bg-black/20 border-2 border-black dark:border-yellow-400 rounded-xl">
                  <p className="font-black uppercase tracking-tight">
                    System Log
                  </p>
                  <p className="font-bold italic">{processRoast}</p>
                </div>
              )}

              {tasteTax && (
                <div className="mt-4 text-left">
                  <p className="font-black uppercase tracking-tight">
                    {tasteTax.title}
                  </p>
                  <p className="font-bold">{tasteTax.suggestion}</p>
                </div>
              )}
            </div>

            <p className="text-sm text-zinc-500 font-medium">{randomTip}</p>

            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white dark:bg-white dark:text-black font-black text-xl rounded-xl transition-all hover:opacity-90"
            >
              <RefreshCw className="w-6 h-6" />
              EAT AGAIN?
            </button>

            <button
              onClick={openHistory}
              className="w-full py-4 bg-white dark:bg-zinc-900 text-black dark:text-white font-black text-xl rounded-xl border-4 border-black dark:border-white transition-all hover:opacity-90"
            >
              VIEW HISTORY
            </button>

            <button
              onClick={openProfile}
              className="w-full py-4 bg-white dark:bg-zinc-900 text-black dark:text-white font-black text-xl rounded-xl border-4 border-black dark:border-white transition-all hover:opacity-90"
            >
              PROFILE
            </button>
          </motion.div>
        )}

        {step === "history" && (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                History
              </h2>
              <button
                onClick={() => setStep("input")}
                className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-black rounded-xl transition-all hover:opacity-90"
              >
                Back
              </button>
            </div>

            <div className="p-6 bg-yellow-100 dark:bg-yellow-900/30 border-4 border-black dark:border-yellow-400 rounded-2xl">
              <p className="font-black uppercase tracking-tight">
                Today total: {todayTotal}
              </p>
              <p className="font-black uppercase tracking-tight">
                Daily target: {dailyTarget}
              </p>
              {plan && (
                <p className="text-sm text-zinc-600 dark:text-zinc-300 font-bold mt-2">
                  Estimated from profile: BMR {plan.bmr}, TDEE {plan.tdee}, goal{" "}
                  {activeProfile?.goal}
                </p>
              )}
              <p className="mt-2 font-bold">{dailySuggestion.title}</p>
              <p className="font-bold">{dailySuggestion.suggestion}</p>

              <div className="mt-4 p-4 bg-white/70 dark:bg-black/20 border-2 border-black dark:border-yellow-400 rounded-xl">
                <p className="font-black uppercase tracking-tight">
                  System Log
                </p>
                <p className="font-bold italic">{historyRoast}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-black uppercase tracking-tight">Today</p>

              {todayEntries.length === 0 ? (
                <div className="p-4 border-2 border-black dark:border-white rounded-xl">
                  <p className="font-bold">
                    Nothing logged today. Innocent… or hiding evidence.
                  </p>
                </div>
              ) : (
                todayEntries.map((e) => (
                  <div
                    key={e.id}
                    className="p-4 border-2 border-black dark:border-white rounded-xl"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-bold truncate">{e.dish}</p>
                      <p className="font-black">{e.calories}</p>
                    </div>
                    <p className="text-sm text-zinc-500 font-medium">
                      {new Date(e.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {step === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Profile
              </h2>
              <button
                onClick={() => setStep("input")}
                className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-black rounded-xl transition-all hover:opacity-90"
              >
                Back
              </button>
            </div>

            <div className="p-4 border-2 border-black dark:border-white rounded-xl space-y-4">
              <p className="font-bold">
                This is a rough calorie target estimate (Mifflin–St Jeor +
                activity multiplier). Not medical advice.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <span className="text-sm font-black uppercase">Sex</span>
                  <select
                    value={profile?.sex ?? "male"}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        sex: parseSex(e.target.value),
                        ageYears: prev?.ageYears ?? 25,
                        heightCm: prev?.heightCm ?? 175,
                        weightKg: prev?.weightKg ?? 75,
                        activity: prev?.activity ?? "light",
                        goal: prev?.goal ?? "maintain",
                        deficitPace: prev?.deficitPace ?? "standard",
                      }))
                    }
                    className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-black uppercase">Age</span>
                  <input
                    type="number"
                    value={profile?.ageYears ?? 25}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        sex: prev?.sex ?? "male",
                        ageYears: Number(e.target.value),
                        heightCm: prev?.heightCm ?? 175,
                        weightKg: prev?.weightKg ?? 75,
                        activity: prev?.activity ?? "light",
                        goal: prev?.goal ?? "maintain",
                        deficitPace: prev?.deficitPace ?? "standard",
                      }))
                    }
                    className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-black uppercase">
                    Height (cm)
                  </span>
                  <input
                    type="number"
                    value={profile?.heightCm ?? 175}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        sex: prev?.sex ?? "male",
                        ageYears: prev?.ageYears ?? 25,
                        heightCm: Number(e.target.value),
                        weightKg: prev?.weightKg ?? 75,
                        activity: prev?.activity ?? "light",
                        goal: prev?.goal ?? "maintain",
                        deficitPace: prev?.deficitPace ?? "standard",
                      }))
                    }
                    className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-black uppercase">
                    Weight (kg)
                  </span>
                  <input
                    type="number"
                    value={profile?.weightKg ?? 75}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        sex: prev?.sex ?? "male",
                        ageYears: prev?.ageYears ?? 25,
                        heightCm: prev?.heightCm ?? 175,
                        weightKg: Number(e.target.value),
                        activity: prev?.activity ?? "light",
                        goal: prev?.goal ?? "maintain",
                        deficitPace: prev?.deficitPace ?? "standard",
                      }))
                    }
                    className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
                  />
                </label>
              </div>

              <label className="space-y-1 block">
                <span className="text-sm font-black uppercase">Activity</span>
                <select
                  value={profile?.activity ?? "light"}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      sex: prev?.sex ?? "male",
                      ageYears: prev?.ageYears ?? 25,
                      heightCm: prev?.heightCm ?? 175,
                      weightKg: prev?.weightKg ?? 75,
                      activity: parseActivity(e.target.value),
                      goal: prev?.goal ?? "maintain",
                      deficitPace: prev?.deficitPace ?? "standard",
                    }))
                  }
                  className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="very">Very active</option>
                  <option value="athlete">Athlete</option>
                </select>
              </label>

              <label className="space-y-1 block">
                <span className="text-sm font-black uppercase">Goal</span>
                <select
                  value={profile?.goal ?? "maintain"}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      sex: prev?.sex ?? "male",
                      ageYears: prev?.ageYears ?? 25,
                      heightCm: prev?.heightCm ?? 175,
                      weightKg: prev?.weightKg ?? 75,
                      activity: prev?.activity ?? "light",
                      goal: parseGoal(e.target.value),
                      deficitPace: prev?.deficitPace ?? "standard",
                    }))
                  }
                  className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
                >
                  <option value="lose">Lose weight</option>
                  <option value="maintain">Maintain</option>
                  <option value="gain">Gain</option>
                </select>
              </label>

              {profile?.goal === "lose" && (
                <label className="space-y-1 block">
                  <span className="text-sm font-black uppercase">
                    Deficit pace
                  </span>
                  <select
                    value={profile?.deficitPace ?? "standard"}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        sex: prev?.sex ?? "male",
                        ageYears: prev?.ageYears ?? 25,
                        heightCm: prev?.heightCm ?? 175,
                        weightKg: prev?.weightKg ?? 75,
                        activity: prev?.activity ?? "light",
                        goal: prev?.goal ?? "maintain",
                        deficitPace: parseDeficitPace(e.target.value),
                      }))
                    }
                    className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
                  >
                    <option value="mild">Mild (~250/day)</option>
                    <option value="standard">Standard (~500/day)</option>
                    <option value="aggressive">Aggressive (~750/day)</option>
                  </select>
                </label>
              )}

              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (!profile) return;
                    saveProfile(profile);
                  }}
                  className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xl rounded-xl border-4 border-black transition-all"
                >
                  SAVE PROFILE
                </button>

                <button
                  onClick={() => {
                    clearProfile();
                    setProfile(null);
                  }}
                  className="w-full py-4 bg-white dark:bg-zinc-900 text-black dark:text-white font-black text-xl rounded-xl border-4 border-black dark:border-white transition-all hover:opacity-90"
                >
                  CLEAR PROFILE
                </button>
              </div>

              {profile && (
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-black dark:border-yellow-400 rounded-xl">
                  {(() => {
                    const computed = estimateCaloriePlan(profile);
                    return (
                      <>
                        <p className="font-black uppercase tracking-tight">
                          Estimated daily target: {computed.target}
                        </p>
                        <p className="font-bold">
                          BMR {computed.bmr} · TDEE {computed.tdee} · Goal{" "}
                          {profile.goal}
                        </p>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
