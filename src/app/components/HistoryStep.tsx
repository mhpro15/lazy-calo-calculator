"use client";

import React from "react";
import { motion } from "framer-motion";
import { getLocalDateKey } from "../utils/history";
import type { HistoryEntry } from "../utils/history";
import type { UserProfile } from "../utils/profile";

interface HistoryStepProps {
  historyEntries: HistoryEntry[];
  todayKey: string;
  todayTotal: number;
  dailyTarget: number;
  plan: { bmr: number; tdee: number; target: number } | null;
  activeProfile: UserProfile | null;
  dailySuggestion: { title: string; suggestion: string };
  historyRoast: string;
  setStep: (
    step: "input" | "questions" | "result" | "history" | "profile"
  ) => void;
  onClearHistory: () => void;
}

export default function HistoryStep({
  historyEntries,
  todayKey,
  todayTotal,
  dailyTarget,
  plan,
  activeProfile,
  dailySuggestion,
  historyRoast,
  setStep,
  onClearHistory,
}: HistoryStepProps) {
  const todayEntries = historyEntries.filter(
    (e) => getLocalDateKey(e.timestamp) === todayKey
  );

  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-2xl font-black uppercase tracking-tight">History</h2>
        <div className="flex flex-col gap-2 items-end">
          <button
            onClick={() => setStep("input")}
            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-black rounded-xl transition-all hover:opacity-90"
          >
            Back
          </button>
           
        </div>
      </div>
<button
  onClick={onClearHistory}
  className="self-center mx-auto text-[0.65rem] uppercase tracking-widest text-red-600 hover:text-red-900"
>
  Dump the milkshake on the server, nobody needs to know your secrets
</button>
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
          <p className="font-black uppercase tracking-tight">System Log</p>
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
  );
}
