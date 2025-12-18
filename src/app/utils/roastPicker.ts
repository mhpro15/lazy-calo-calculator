export type RoastValue = string | string[] | null | undefined;

type MemoryShape = Record<string, string[]>;

const STORAGE_KEY = "lazyCaloRoastMemory.v1";

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function loadMemory(): MemoryShape {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = safeParseJson(raw);
    if (!parsed || typeof parsed !== "object") return {};

    const obj = parsed as Record<string, unknown>;
    const out: MemoryShape = {};
    for (const [k, v] of Object.entries(obj)) {
      if (Array.isArray(v) && v.every((x) => typeof x === "string")) {
        out[k] = v as string[];
      }
    }
    return out;
  } catch {
    return {};
  }
}

function saveMemory(mem: MemoryShape) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mem));
  } catch {
    // ignore
  }
}

function normalizeLine(s: string) {
  return s.trim().replace(/\s+/g, " ");
}

function uniqStable(lines: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const l of lines) {
    const n = normalizeLine(l);
    if (!n) continue;
    if (seen.has(n)) continue;
    seen.add(n);
    out.push(l);
  }
  return out;
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function coerceToLines(value: RoastValue): string[] {
  if (!value) return [];
  if (typeof value === "string") return value.trim() ? [value] : [];
  if (Array.isArray(value)) {
    return value.filter(
      (v): v is string => typeof v === "string" && v.trim() !== ""
    );
  }
  return [];
}

export function pickFreshLine(args: {
  key: string;
  value: RoastValue;
  avoidLast?: number;
}): string | null {
  const avoidLast = Math.max(0, Math.min(args.avoidLast ?? 4, 20));
  const lines = uniqStable(coerceToLines(args.value));
  if (lines.length === 0) return null;
  if (lines.length === 1) return lines[0];

  // Server render / no storage: still randomizes.
  if (typeof window === "undefined") return pickRandom(lines);

  const mem = loadMemory();
  const recent = mem[args.key] ?? [];
  const recentSet = new Set(recent);

  const candidates = lines.filter((l) => !recentSet.has(normalizeLine(l)));
  const chosen =
    candidates.length > 0 ? pickRandom(candidates) : pickRandom(lines);

  const nextRecent = [normalizeLine(chosen), ...recent]
    .filter(Boolean)
    .slice(0, avoidLast);
  mem[args.key] = nextRecent;
  saveMemory(mem);

  return chosen;
}
