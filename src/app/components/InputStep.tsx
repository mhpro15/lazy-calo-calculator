"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

interface InputStepProps {
  dish: string;
  setDish: (dish: string) => void;
  greeting: string;
  isLoadingScenario: boolean;
  startCalculation: () => void;
  openHistory: () => void;
  openProfile: () => void;
}

export default function InputStep({
  dish,
  setDish,
  greeting,
  isLoadingScenario,
  startCalculation,
  openHistory,
  openProfile,
}: InputStepProps) {
  return (
    <motion.div
      key="input"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8" />
          Lazy Calo
        </h1>
        <p className="text-zinc-500 font-medium italic">
          &quot;{greeting || "Because counting is hard."}&quot;
        </p>
      </div>

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
        className="w-full py-4 bg-green-400 hover:bg-green-500 text-black font-black text-xl rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
      >
        {isLoadingScenario ? "CHECKING THE DATABASE..." : "Enter"}
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
  );
}
