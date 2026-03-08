import { ActionRow, OwnerRole, flattenRows } from "@/lib/regulation-data";

export type AuditEvent = {
  timestamp: string;
  action: string;
  details: string;
};

export type ItemState = {
  assignedOwner: OwnerRole;
  dueDate: string;
  completed: boolean;
  completedAt: string;
  auditTrail: AuditEvent[];
};

export type PersistedState = Record<string, ItemState>;

export type CountryProgress = {
  total: number;
  completed: number;
  overdue: number;
};

export type PriorityItem = {
  row: ActionRow;
  state: ItemState;
  score: number;
  reasons: string[];
};

export const ACTION_CENTER_STORAGE_KEY = "igaming-action-center-v1";

export const ownerOptions: OwnerRole[] = ["Legal", "Compliance Ops", "Product", "Engineering", "CRM"];

export function withDefaultState(map: PersistedState, row: ActionRow): ItemState {
  const existing = map[row.id];

  if (existing) {
    return existing;
  }

  return {
    assignedOwner: row.owner,
    dueDate: "",
    completed: false,
    completedAt: "",
    auditTrail: [],
  };
}

export function readPersistedState(): PersistedState {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(ACTION_CENTER_STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as PersistedState;
  } catch {
    return {};
  }
}

export function savePersistedState(state: PersistedState): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ACTION_CENTER_STORAGE_KEY, JSON.stringify(state));
}

export function getCountryProgress(countrySlug: string, state: PersistedState): CountryProgress {
  const rows = flattenRows().filter((row) => row.countrySlug === countrySlug);

  return rows.reduce(
    (acc, row) => {
      const rowState = withDefaultState(state, row);
      const hasOverdue = rowState.dueDate && !rowState.completed && rowState.dueDate < new Date().toISOString().slice(0, 10);

      acc.total += 1;

      if (rowState.completed) {
        acc.completed += 1;
      }

      if (hasOverdue) {
        acc.overdue += 1;
      }

      return acc;
    },
    { total: 0, completed: 0, overdue: 0 },
  );
}

export function getTodayPriorities(state: PersistedState, limit = 6): PriorityItem[] {
  const today = new Date().toISOString().slice(0, 10);

  const items = flattenRows()
    .map((row) => {
      const rowState = withDefaultState(state, row);

      if (rowState.completed) {
        return null;
      }

      let score = 0;
      const reasons: string[] = [];

      if (rowState.dueDate && rowState.dueDate < today) {
        score += 100;
        reasons.push("Overdue");
      }

      if (row.status === "Action Needed") {
        score += 60;
        reasons.push("Action Needed");
      } else if (row.status === "At Risk") {
        score += 30;
        reasons.push("At Risk");
      }

      if (row.priority === "Critical") {
        score += 30;
        reasons.push("Critical");
      } else if (row.priority === "High") {
        score += 15;
      }

      if (!rowState.dueDate) {
        score += 8;
        reasons.push("No due date");
      }

      return {
        row,
        state: rowState,
        score,
        reasons,
      } satisfies PriorityItem;
    })
    .filter((item): item is PriorityItem => item !== null)
    .sort((a, b) => b.score - a.score);

  return items.slice(0, limit);
}
