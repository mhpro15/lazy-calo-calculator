export type Sex = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "athlete";
export type Goal = "lose" | "maintain" | "gain";
export type DeficitPace = "mild" | "standard" | "aggressive";

export type UserProfile = {
  sex: Sex;
  ageYears: number;
  heightCm: number;
  weightKg: number;
  activity: ActivityLevel;
  goal: Goal;
  deficitPace: DeficitPace;
};

export type CaloriePlan = {
  bmr: number;
  tdee: number;
  target: number;
  deficit: number;
};

const STORAGE_KEY = "lazyCaloProfile";

export function loadProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const p = parsed as Partial<UserProfile>;

    if (
      (p.sex !== "male" && p.sex !== "female") ||
      typeof p.ageYears !== "number" ||
      typeof p.heightCm !== "number" ||
      typeof p.weightKg !== "number" ||
      !p.activity ||
      !p.goal ||
      !p.deficitPace
    ) {
      return null;
    }

    return p as UserProfile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function activityMultiplier(level: ActivityLevel) {
  switch (level) {
    case "sedentary":
      return 1.2;
    case "light":
      return 1.375;
    case "moderate":
      return 1.55;
    case "very":
      return 1.725;
    case "athlete":
      return 1.9;
  }
}

// Mifflin–St Jeor equation (commonly used estimate for adults)
export function estimateCaloriePlan(profile: UserProfile): CaloriePlan {
  const age = clamp(profile.ageYears, 13, 100);
  const height = clamp(profile.heightCm, 120, 220);
  const weight = clamp(profile.weightKg, 30, 250);

  const base = 10 * weight + 6.25 * height - 5 * age;
  const bmr = profile.sex === "male" ? base + 5 : base - 161;
  const tdee = bmr * activityMultiplier(profile.activity);

  let deficit = 0;
  if (profile.goal === "lose") {
    deficit =
      profile.deficitPace === "mild"
        ? 250
        : profile.deficitPace === "standard"
        ? 500
        : 750;
  } else if (profile.goal === "gain") {
    deficit = -300;
  }

  // Guardrails: avoid pushing targets extremely low via this toy UI.
  const minTarget = profile.sex === "male" ? 1500 : 1200;
  const target = clamp(Math.round(tdee - deficit), minTarget, 5000);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    target,
    deficit,
  };
}
