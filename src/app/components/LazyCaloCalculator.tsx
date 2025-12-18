"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
  getTasteTax,
  LAZY_TIPS,
  type TasteTax,
} from "../utils/helpers";
import {
  appendHistoryEntry,
  clearHistory,
  getDailySuggestion,
  getLocalDateKey,
  getTodayKey,
  loadHistory,
  getTimeSinceLastLog,
  type HistoryEntry,
} from "../utils/history";
import { buildRoastPack, type RoastPack } from "../utils/roastEngine";
import { pickFreshLine } from "../utils/roastPicker";
import { greetingRoasts } from "../data/roasts";
import {
  estimateCaloriePlan,
  loadProfile,
  type UserProfile,
} from "../utils/profile";
import { getProcessRoast } from "../utils/processRoasts";
import InputStep from "./InputStep";
import QuestionsStep from "./QuestionsStep";
import ResultStep from "./ResultStep";
import HistoryStep from "./HistoryStep";
import ProfileStep from "./ProfileStep";

type Step = "input" | "questions" | "result" | "history" | "profile";

export default function LazyCaloCalculator() {
  const INTRO_STORAGE_KEY = "lazyCaloIntroSeen";

  const [step, setStep] = useState<Step>("input");
  const [dish, setDish] = useState("");
  const [greeting, setGreeting] = useState<string>("");
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [scenarioQuestions, setScenarioQuestions] = useState<Question[] | null>(
    null
  );

  const pickGreeting = () => {
    const history = loadHistory();
    const timeSinceLast = getTimeSinceLastLog();

    if (history.length === 0) {
      return (
        pickFreshLine({
          key: "greeting:first",
          value: greetingRoasts.firstTime,
        }) || "Welcome!"
      );
    }

    if (timeSinceLast !== null && timeSinceLast < 4 * 60 * 60 * 1000) {
      return (
        pickFreshLine({
          key: "greeting:recent",
          value: greetingRoasts.recent,
        }) || "Back already?"
      );
    }

    return (
      pickFreshLine({
        key: "greeting:absent",
        value: greetingRoasts.absent,
      }) || "Where have you been?"
    );
  };

  useEffect(() => {
    setGreeting(pickGreeting());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seenIntro = window.localStorage.getItem(INTRO_STORAGE_KEY);
    if (!seenIntro) {
      setShowIntroModal(true);
    }
  }, []);

  const dismissIntro = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "1");
    }
    setShowIntroModal(false);
  };

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
    const optionRoast = pickFreshLine({
      key: `opt:${tableKey}`,
      value: roastPack.optionRoastByKey[tableKey],
      avoidLast: 5,
    });
    if (optionRoast) return optionRoast;

    const questionRoast = pickFreshLine({
      key: `q:${args.questionId}`,
      value: roastPack.questionIntroById[args.questionId],
      avoidLast: 5,
    });
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
        return (
          pickFreshLine({
            key: "fallback:sugar:none",
            value: [
              "No sugar? Sure. And I’m a treadmill. I believe you. Mostly.",
              "No sugar. Suspiciously responsible.",
              "Zero sugar. Either discipline or denial. Respect.",
              "No sugar? The app is cautiously optimistic.",
            ],
            avoidLast: 6,
          }) ?? "No sugar. Noted."
        );
      }

      if (label.includes("25%") || label.includes("polite")) {
        return (
          pickFreshLine({
            key: "fallback:sugar:25",
            value: [
              "25% sugar: the ‘I’m trying’ performance. Respect.",
              "25% sugar. A polite little treat.",
              "Quarter sugar. Moderation cosplay. I'll take it.",
            ],
            avoidLast: 6,
          }) ?? "25% sugar. Noted."
        );
      }

      if (label.includes("50%") || label.includes("normal")) {
        return (
          pickFreshLine({
            key: "fallback:sugar:50",
            value: [
              "50% sugar: balanced chaos. A classic.",
              "Half sugar. The default setting of humanity.",
              "50% sugar. Reasonable chaos.",
            ],
            avoidLast: 6,
          }) ?? "50% sugar. Noted."
        );
      }

      if (label.includes("75%") || label.includes("sweet")) {
        return (
          pickFreshLine({
            key: "fallback:sugar:75",
            value: [
              "75% sugar: your taste buds are the CEO now.",
              "75% sugar. Your sweet tooth just took the wheel.",
              "Three-quarters sugar. Bold choice.",
            ],
            avoidLast: 6,
          }) ?? "75% sugar. Noted."
        );
      }

      if (label.includes("100%") || label.includes("mainlining")) {
        return (
          pickFreshLine({
            key: "fallback:sugar:100",
            value: [
              "100% sugar: we’re not sipping, we’re speedrunning joy.",
              "Full sugar. No brakes.",
              "100% sugar. Your drink has become a side dish.",
              "Maximum sugar. The app is blinking rapidly.",
            ],
            avoidLast: 6,
          }) ?? "100% sugar. Noted."
        );
      }

      return (
        pickFreshLine({
          key: "fallback:sugar:generic",
          value: [
            "Sugar noted. Future you will remember this moment.",
            "Sugar logged. Your taste buds won the meeting.",
            "Sweetness recorded. The app is taking notes.",
            "Sugar situation acknowledged.",
          ],
          avoidLast: 6,
        }) ?? "Sugar noted."
      );
    }

    if (args.questionId === "cupSize" || args.questionId === "drinkSize") {
      if (args.value >= 700)
        return (
          pickFreshLine({
            key: "fallback:drinkSize:700",
            value: [
              "That cup is doing cardio for you.",
              "That size is basically a subscription.",
              "That cup has a zip code.",
            ],
            avoidLast: 6,
          }) ?? "Big drink. Noted."
        );
      if (args.value >= 500)
        return (
          pickFreshLine({
            key: "fallback:drinkSize:500",
            value: [
              "Respect. That’s a whole beverage meal.",
              "Medium-large drink. We’re counting it.",
              "That’s a serious cup. Noted.",
            ],
            avoidLast: 6,
          }) ?? "Drink size noted."
        );
      return (
        pickFreshLine({
          key: "fallback:drinkSize:small",
          value: [
            "Cute. A responsible size. Allegedly.",
            "Small-ish. The app nods politely.",
            "Okay, modest cup energy. Rare.",
          ],
          avoidLast: 6,
        }) ?? "Small drink. Noted."
      );
    }

    if (args.questionId === "deliciousness") {
      if (args.label.startsWith("Delicious"))
        return (
          pickFreshLine({
            key: "fallback:deliciousness:delicious",
            value: [
              "Fair. Sometimes joy costs.",
              "Worth it. The app respects the hedonism.",
              "Delicious? Then we call it 'investment in happiness'.",
            ],
            avoidLast: 6,
          }) ?? "Worth it."
        );
      if (args.label.startsWith("Ok")) return "Mid, but committed. Powerful.";
      return (
        pickFreshLine({
          key: "fallback:deliciousness:not",
          value: [
            "So we suffered… on purpose. Incredible.",
            "Not even good? That's the cruelest part.",
            "Pain and calories. A tragic combo.",
          ],
          avoidLast: 6,
        }) ?? "Noted."
      );
    }

    if (args.value === 0)
      return (
        pickFreshLine({
          key: "fallback:value:0",
          value: [
            "Interesting. Self-control appeared briefly.",
            "Zero? A rare moment of restraint.",
            "0 calories added. The app is momentarily calm.",
          ],
          avoidLast: 6,
        }) ?? "0. Noted."
      );
    if (args.value >= 800)
      return (
        pickFreshLine({
          key: "fallback:value:800",
          value: [
            "That option had a mortgage.",
            "That choice came with paperwork.",
            "That option is paying rent in calories.",
          ],
          avoidLast: 6,
        }) ?? "Big option. Noted."
      );
    if (args.value >= 400)
      return (
        pickFreshLine({
          key: "fallback:value:400",
          value: [
            "Alright. Bold.",
            "Okay, we’re committing.",
            "Noted. That’s a real choice.",
          ],
          avoidLast: 6,
        }) ?? "Bold."
      );
    return (
      pickFreshLine({
        key: "fallback:default",
        value: [
          "Noted. We move.",
          "Logged. Next.",
          "Okay. Continuing.",
          "Recorded. The math continues.",
        ],
        avoidLast: 6,
      }) ?? "Noted."
    );
  };

  const startCalculation = async () => {
    if (!dish.trim()) return;

    setIsLoadingScenario(true);
    setScenarioQuestions(null);
    setScenarioIconKey(null);

    let pickedQuestions: Question[] | null = null;

    try {
      const res = await fetch(
        `/api/scenario?dish=${encodeURIComponent(dish)}`,
        { cache: "no-store" }
      );
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
    setRoastPack({
      dishRoast: null,
      questionIntroById: {},
      optionRoastByKey: {},
    });
    setGreeting(pickGreeting());
    setRandomTip(
      pickFreshLine({ key: "tip:lazy", value: LAZY_TIPS, avoidLast: 6 }) ||
        LAZY_TIPS[Math.floor(Math.random() * LAZY_TIPS.length)]
    );
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

  const handleClearHistory = () => {
    clearHistory();
    setHistoryEntries([]);
  };

  const [randomTip, setRandomTip] = useState(() => {
    return (
      pickFreshLine({ key: "tip:lazy", value: LAZY_TIPS, avoidLast: 6 }) ||
      LAZY_TIPS[Math.floor(Math.random() * LAZY_TIPS.length)]
    );
  });

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
      {showIntroModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-xl rounded-3xl border-4 border-black bg-white p-6 text-center shadow-2xl dark:bg-zinc-900 dark:border-white">
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Ever think calorie tracking was too tedious? Me too.
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              That&apos;s why I made this. You tell me what you ate, I&apos;ll
              do the math. No weighing. No spreadsheets. Just vibes, numbers,
              and the slow collapse of plausible deniability.
            </p>
            <button
              onClick={dismissIntro}
              className="mt-6 w-full rounded-xl border-4 border-black bg-yellow-400 py-3 font-black uppercase tracking-widest text-black transition-all hover:bg-yellow-500"
            >
              Ok fine, expose me
            </button>
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        {step === "input" && (
          <InputStep
            dish={dish}
            setDish={setDish}
            greeting={greeting}
            isLoadingScenario={isLoadingScenario}
            startCalculation={startCalculation}
            openHistory={openHistory}
            openProfile={openProfile}
          />
        )}

        {step === "questions" && (
          <QuestionsStep
            dish={dish}
            scenarioIconKey={scenarioIconKey}
            isLoadingScenario={isLoadingScenario}
            currentQuestion={currentQuestion}
            pendingAnswer={pendingAnswer}
            setPendingAnswer={setPendingAnswer}
            canGoNext={canGoNext}
            isLastQuestion={isLastQuestion}
            handleAnswer={handleAnswer}
            getSelectionComment={getSelectionComment}
            onDoOver={reset}
          />
        )}

        {step === "result" && (
          <ResultStep
            totalCalories={totalCalories}
            processRoast={processRoast}
            tasteTax={tasteTax}
            randomTip={randomTip}
            reset={reset}
            openHistory={openHistory}
            openProfile={openProfile}
          />
        )}

        {step === "history" && (
          <HistoryStep
            historyEntries={historyEntries}
            todayKey={todayKey}
            todayTotal={todayTotal}
            dailyTarget={dailyTarget}
            plan={plan}
            activeProfile={activeProfile}
            dailySuggestion={dailySuggestion}
            historyRoast={historyRoast}
            setStep={setStep}
            onClearHistory={handleClearHistory}
          />
        )}

        {step === "profile" && (
          <ProfileStep
            profile={profile}
            setProfile={setProfile}
            setStep={setStep}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
