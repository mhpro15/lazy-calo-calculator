"use client";

import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Pizza, Hamburger, Salad, Coffee, Utensils } from "lucide-react";
import type { Question } from "../data/questions";

interface QuestionsStepProps {
  dish: string;
  scenarioIconKey: string | null;
  isLoadingScenario: boolean;
  currentQuestion: Question;
  pendingAnswer: {
    questionId: string;
    value: number;
    label: string;
    comment: string;
  } | null;
  setPendingAnswer: (
    answer: {
      questionId: string;
      value: number;
      label: string;
      comment: string;
    } | null
  ) => void;
  canGoNext: boolean;
  isLastQuestion: boolean;
  handleAnswer: (questionId: string, value: number, label: string) => void;
  getSelectionComment: (args: {
    questionId: string;
    label: string;
    value: number;
    optionComment?: string;
  }) => string;
  onDoOver: () => void;
}

export default function QuestionsStep({
  dish,
  scenarioIconKey,
  isLoadingScenario,
  currentQuestion,
  pendingAnswer,
  setPendingAnswer,
  canGoNext,
  isLastQuestion,
  handleAnswer,
  getSelectionComment,
  onDoOver,
}: QuestionsStepProps) {
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
        <button
          onClick={onDoOver}
          className="ml-auto text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-800"
        >
          Do over
        </button>
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
  );
}
