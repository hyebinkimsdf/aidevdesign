import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  PortfolioItem,
  PortfolioItemInput,
  PortfolioStatus,
} from "@/lib/portfolio-types";
export type { PortfolioItem, PortfolioItemInput, PortfolioStatus };

const DATA_FILE = path.join(process.cwd(), "data", "portfolio-items.json");

function normalizeRoute(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "") || "general";
}

function validateInput(input: PortfolioItemInput) {
  const route = normalizeRoute(input.route);
  const title = input.title.trim();
  const summary = input.summary.trim();
  const stack = input.stack.map((item) => item.trim()).filter(Boolean);
  const status: PortfolioStatus = input.status === "draft" ? "draft" : "published";

  if (!title) throw new Error("title is required");
  if (!summary) throw new Error("summary is required");

  return { route, title, summary, stack, status };
}

function makeId() {
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "[]\n", "utf8");
  }
}

export async function getPortfolioItems() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const items = JSON.parse(raw) as PortfolioItem[];

  return items.sort((a, b) => {
    const aTime = new Date(a.updatedAt).getTime();
    const bTime = new Date(b.updatedAt).getTime();
    return bTime - aTime;
  });
}

export async function createPortfolioItem(input: PortfolioItemInput) {
  const valid = validateInput(input);
  const now = new Date().toISOString();
  const next: PortfolioItem = {
    id: makeId(),
    ...valid,
    createdAt: now,
    updatedAt: now,
  };

  const items = await getPortfolioItems();
  items.unshift(next);
  await fs.writeFile(DATA_FILE, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  return next;
}

export async function updatePortfolioItem(id: string, input: PortfolioItemInput) {
  const valid = validateInput(input);
  const items = await getPortfolioItems();
  const index = items.findIndex((item) => item.id === id);

  if (index < 0) return null;

  const existing = items[index];
  const updated: PortfolioItem = {
    ...existing,
    ...valid,
    updatedAt: new Date().toISOString(),
  };

  items[index] = updated;
  await fs.writeFile(DATA_FILE, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  return updated;
}

export async function deletePortfolioItem(id: string) {
  const items = await getPortfolioItems();
  const next = items.filter((item) => item.id !== id);
  const removed = next.length !== items.length;

  if (!removed) return false;

  await fs.writeFile(DATA_FILE, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  return true;
}
