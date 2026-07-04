// Brew journal, kept entirely on this device (localStorage). No accounts.

export interface JournalEntry {
  id: string;
  ts: number; // epoch ms
  method: string; // display name, e.g. "V60 Pour Over"
  brewer?: string; // e.g. "AeroPress Go"
  ratio: number;
  oz: number;
  beans?: string;
  roaster?: string;
  rating?: number; // 1–5
  notes?: string;
}

const KEY = "pb:journal";

export function loadJournal(): JournalEntry[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.filter(
      (e): e is JournalEntry =>
        e && typeof e === "object" && typeof e.id === "string" && typeof e.ts === "number"
    );
  } catch {
    return [];
  }
}

export function saveEntry(entry: JournalEntry): JournalEntry[] {
  const all = [entry, ...loadJournal()].slice(0, 500);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  } catch {}
  return all;
}

export function deleteEntry(id: string): JournalEntry[] {
  const all = loadJournal().filter((e) => e.id !== id);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  } catch {}
  return all;
}

export function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  }
}
