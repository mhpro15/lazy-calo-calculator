"use client";

import React, { useMemo, useState } from "react";
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
  dishRecognitionRoasts,
  questionIntroRoasts,
  optionClickRoasts,
  getResultScript,
  tasteTaxRoasts,
  resetVariants,
  formatRoast,
  pickRandom,
} from "../data/roasts";

type Step = "input" | "questions" | "result";

export default function LazyCaloCalculator() {
  const [step, setStep] = useState<Step>("input");
  const [dish, setDish] = useState("");
  const [currentScenario, setCurrentScenario] = useState<string | null>(null);
  const [scenarioQuestions, setScenarioQuestions] = useState<Question[] | null>(
    null
  );
  const [scenarioIconKey, setScenarioIconKey] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [answersById, setAnswersById] = useState<Record<string, string>>({});
  const [tasteTax, setTasteTax] = useState<TasteTax | null>(null);
  const [isLoadingScenario, setIsLoadingScenario] = useState(false);

  const startCalculation = async () => {
    if (!dish.trim()) return;

    setIsLoadingScenario(true);
    setScenarioQuestions(null);
    setScenarioIconKey(null);
    setCurrentScenario(null);

    try {
      const res = await fetch(`/api/scenario?dish=${encodeURIComponent(dish)}`);
      const json = (await res.json()) as
        | {
            matched: true;
            scenario: { slug: string; iconKey: string; questions: Question[] };
          }
        | { matched: false };

      if (json.matched) {
        setCurrentScenario(json.scenario.slug);
        setScenarioIconKey(json.scenario.iconKey);
        setScenarioQuestions(json.scenario.questions);
      }
    } catch {
      // Silent fallback to generic questions.
    } finally {
      setIsLoadingScenario(false);
    }

    setStep("questions");
    setCurrentQuestionIndex(0);
    setTotalCalories(0);
    setAnswersById({});
    setTasteTax(null);
  };

  const handleAnswer = (questionId: string, value: number, label: string) => {
    const nextTotal = totalCalories + value;
    setTotalCalories(nextTotal);
    setAnswersById((prev) => ({ ...prev, [questionId]: label }));

    const baseQuestions = getBaseQuestions(currentScenario, {
      ...answersById,
      [questionId]: label,
    });
    const allQuestions = [...baseQuestions, DELICIOUSNESS_QUESTION];

    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    const nextAnswersById = { ...answersById, [questionId]: label };
    const deliciousness = deliciousnessFromLabel(nextAnswersById.deliciousness);
    const seed = dish.length + nextTotal;
    setTasteTax(getTasteTax(deliciousness, nextTotal, seed));
    setStep("result");
  };

  const reset = () => {
    setStep("input");
    setDish("");
    setCurrentScenario(null);
    setScenarioQuestions(null);
    setScenarioIconKey(null);
    setIsLoadingScenario(false);
    setCurrentQuestionIndex(0);
    setTotalCalories(0);
    setAnswersById({});
    setTasteTax(null);
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

  const questions = useMemo(
    () => [...getBaseQuestions(answersById), DELICIOUSNESS_QUESTION],
    [answersById, scenarioQuestions]
  );

  const iconMap: Record<string, LucideIcon> = {
    Pizza,
    Hamburger,
    Salad,
    Coffee,
    Utensils,
  };

  const CurrentIcon: LucideIcon =
    (scenarioIconKey && iconMap[scenarioIconKey]) || Utensils;

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
              className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xl rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              {isLoadingScenario
                ? "CHECKING THE DATABASE..."
                : "ESTIMATE MY REGRET"}
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
                  : questions[currentQuestionIndex].text}
              </p>
              <div className="grid gap-3">
                {isLoadingScenario
                  ? null
                  : questions[currentQuestionIndex].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          handleAnswer(
                            questions[currentQuestionIndex].id,
                            opt.value,
                            opt.label
                          )
                        }
                        className="w-full p-4 text-left border-2 border-black dark:border-white rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-bold"
                      >
                        {opt.label}
                      </button>
                    ))}
              </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
