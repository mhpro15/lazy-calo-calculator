"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  clearProfile,
  estimateCaloriePlan,
  saveProfile,
  type UserProfile,
} from "../utils/profile";

interface ProfileStepProps {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  setStep: (
    step: "input" | "questions" | "result" | "history" | "profile"
  ) => void;
}

function parseSex(value: string): "male" | "female" {
  return value === "female" ? "female" : "male";
}

function parseActivity(
  value: string
): "sedentary" | "light" | "moderate" | "very" | "athlete" {
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

function parseGoal(value: string): "lose" | "maintain" | "gain" {
  switch (value) {
    case "lose":
    case "maintain":
    case "gain":
      return value;
    default:
      return "maintain";
  }
}

function parseDeficitPace(value: string): "mild" | "standard" | "aggressive" {
  switch (value) {
    case "mild":
    case "standard":
    case "aggressive":
      return value;
    default:
      return "standard";
  }
}

export default function ProfileStep({
  profile,
  setProfile,
  setStep,
}: ProfileStepProps) {
  return (
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
          This is a rough calorie target estimate (Mifflin–St Jeor + activity
          multiplier). Not medical advice.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-sm font-black uppercase">Sex</span>
            <select
              value={profile?.sex ?? "male"}
              onChange={(e) =>
                setProfile({
                  sex: parseSex(e.target.value),
                  ageYears: profile?.ageYears ?? 25,
                  heightCm: profile?.heightCm ?? 175,
                  weightKg: profile?.weightKg ?? 75,
                  activity: profile?.activity ?? "light",
                  goal: profile?.goal ?? "maintain",
                  deficitPace: profile?.deficitPace ?? "standard",
                })
              }
              className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
            >
              <option value="male" className="text-black">
                Male
              </option>
              <option value="female" className="text-black">
                Female
              </option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-black uppercase">Age</span>
            <input
              type="number"
              value={profile?.ageYears ?? 25}
              onChange={(e) =>
                setProfile({
                  sex: profile?.sex ?? "male",
                  ageYears: Number(e.target.value),
                  heightCm: profile?.heightCm ?? 175,
                  weightKg: profile?.weightKg ?? 75,
                  activity: profile?.activity ?? "light",
                  goal: profile?.goal ?? "maintain",
                  deficitPace: profile?.deficitPace ?? "standard",
                })
              }
              className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-black uppercase">Height (cm)</span>
            <input
              type="number"
              value={profile?.heightCm ?? 175}
              onChange={(e) =>
                setProfile({
                  sex: profile?.sex ?? "male",
                  ageYears: profile?.ageYears ?? 25,
                  heightCm: Number(e.target.value),
                  weightKg: profile?.weightKg ?? 75,
                  activity: profile?.activity ?? "light",
                  goal: profile?.goal ?? "maintain",
                  deficitPace: profile?.deficitPace ?? "standard",
                })
              }
              className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-black uppercase">Weight (kg)</span>
            <input
              type="number"
              value={profile?.weightKg ?? 75}
              onChange={(e) =>
                setProfile({
                  sex: profile?.sex ?? "male",
                  ageYears: profile?.ageYears ?? 25,
                  heightCm: profile?.heightCm ?? 175,
                  weightKg: Number(e.target.value),
                  activity: profile?.activity ?? "light",
                  goal: profile?.goal ?? "maintain",
                  deficitPace: profile?.deficitPace ?? "standard",
                })
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
              setProfile({
                sex: profile?.sex ?? "male",
                ageYears: profile?.ageYears ?? 25,
                heightCm: profile?.heightCm ?? 175,
                weightKg: profile?.weightKg ?? 75,
                activity: parseActivity(e.target.value),
                goal: profile?.goal ?? "maintain",
                deficitPace: profile?.deficitPace ?? "standard",
              })
            }
            className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
          >
            <option value="sedentary" className="text-black">
              Sedentary
            </option>
            <option value="light" className="text-black">
              Light
            </option>
            <option value="moderate" className="text-black">
              Moderate
            </option>
            <option value="very" className="text-black">
              Very active
            </option>
            <option value="athlete" className="text-black">
              Athlete
            </option>
          </select>
        </label>

        <label className="space-y-1 block">
          <span className="text-sm font-black uppercase">Goal</span>
          <select
            value={profile?.goal ?? "maintain"}
            onChange={(e) =>
              setProfile({
                sex: profile?.sex ?? "male",
                ageYears: profile?.ageYears ?? 25,
                heightCm: profile?.heightCm ?? 175,
                weightKg: profile?.weightKg ?? 75,
                activity: profile?.activity ?? "light",
                goal: parseGoal(e.target.value),
                deficitPace: profile?.deficitPace ?? "standard",
              })
            }
            className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
          >
            <option value="lose" className="text-black">
              Lose weight
            </option>
            <option value="maintain" className="text-black">
              Maintain
            </option>
            <option value="gain" className="text-black">
              Gain
            </option>
          </select>
        </label>

        {profile?.goal === "lose" && (
          <label className="space-y-1 block">
            <span className="text-sm font-black uppercase">Deficit pace</span>
            <select
              value={profile?.deficitPace ?? "standard"}
              onChange={(e) =>
                setProfile({
                  sex: profile?.sex ?? "male",
                  ageYears: profile?.ageYears ?? 25,
                  heightCm: profile?.heightCm ?? 175,
                  weightKg: profile?.weightKg ?? 75,
                  activity: profile?.activity ?? "light",
                  goal: profile?.goal ?? "maintain",
                  deficitPace: parseDeficitPace(e.target.value),
                })
              }
              className="w-full p-3 border-2 border-black dark:border-white rounded-xl"
            >
              <option value="mild" className="text-black">
                Mild (~250/day)
              </option>
              <option value="standard" className="text-black">
                Standard (~500/day)
              </option>
              <option value="aggressive" className="text-black">
                Aggressive (~750/day)
              </option>
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
              setProfile({
                sex: "male",
                ageYears: 25,
                heightCm: 175,
                weightKg: 75,
                activity: "light",
                goal: "maintain",
                deficitPace: "standard",
              });
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
  );
}
