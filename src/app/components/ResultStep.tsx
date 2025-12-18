"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { getFunnyComment, LAZY_TIPS, type TasteTax } from "../utils/helpers";

interface ResultStepProps {
  totalCalories: number;
  processRoast: string | null;
  tasteTax: TasteTax | null;
  randomTip: string;
  reset: () => void;
  openHistory: () => void;
  openProfile: () => void;
}

export default function ResultStep({
  totalCalories,
  processRoast,
  tasteTax,
  randomTip,
  reset,
  openHistory,
  openProfile,
}: ResultStepProps) {
  return (
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
        <p className="text-xl font-bold uppercase">Calories (Approx-ish)</p>
      </div>

      <div className="p-6 bg-yellow-100 dark:bg-yellow-900/30 border-4 border-black dark:border-yellow-400 rounded-2xl">
        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
        <p className="text-lg font-bold italic">
          {getFunnyComment(totalCalories)}
        </p>

        {processRoast && (
          <div className="mt-4 p-4 bg-white/70 dark:bg-black/20 border-2 border-black dark:border-yellow-400 rounded-xl">
            <p className="font-black uppercase tracking-tight">System Log</p>
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
  );
}
