export type HistoryEntry = {
  id: string;
  timestamp: number;
  dish: string;
  calories: number;
  answersById?: Record<string, string>;
};

const STORAGE_KEY = "lazyCaloHistory";
const MAX_ENTRIES = 200;

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.timestamp === "number" &&
    typeof v.dish === "string" &&
    typeof v.calories === "number"
  );
}

function makeId() {
  // crypto.randomUUID is available in modern browsers; fall back if needed.
  try {
    return (
      globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
    );
  } catch {
    return `${Date.now()}-${Math.random()}`;
  }
}

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = safeParseJson(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(isHistoryEntry)
      .sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

export function saveHistory(entries: HistoryEntry[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore
  }
}

export function clearHistory() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore errors during purge
  }
}

export function appendHistoryEntry(
  entry: Omit<HistoryEntry, "id">
): HistoryEntry {
  const fullEntry: HistoryEntry = { id: makeId(), ...entry };
  const current = loadHistory();
  const next = [fullEntry, ...current].slice(0, MAX_ENTRIES);
  saveHistory(next);
  return fullEntry;
}

export function getLocalDateKey(timestamp: number) {
  const d = new Date(timestamp);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function getTodayKey() {
  return getLocalDateKey(Date.now());
}

export function getTimeSinceLastLog(): number | null {
  const history = loadHistory();
  if (history.length === 0) return null;
  const lastEntry = history[0];
  return Date.now() - lastEntry.timestamp;
}

export function getDailySuggestion(totalCalories: number): {
  title: string;
  suggestion: string;
} {
  if (totalCalories <= 0) {
    return {
      title: "Today so far:",
      suggestion: "No logs yet. Either you’re fasting… or hiding evidence.",
    };
  }

  if (totalCalories < 800) {
    return {
      title: "Today so far:",
      suggestion:
        "Light day. If you’re actually hungry later, add something with protein so you don’t rebound-snack at 2am.",
    };
  }

  if (totalCalories < 1600) {
    return {
      title: "Today so far:",
      suggestion:
        "Pretty reasonable. Next meal: keep it tasty, go easy on the liquid calories.",
    };
  }

  if (totalCalories < 2400) {
    return {
      title: "Today so far:",
      suggestion:
        "Solid intake. Next meal: lighter plate (protein + veggies) and you’re back on track.",
    };
  }

  return {
    title: "Today so far:",
    suggestion:
      "Okay. Next meal: ‘taste tax’ mode — same flavor, smaller portion, skip the sugary drink. Easy damage control.",
  };
}
