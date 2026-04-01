import { promises as fs } from "node:fs";
import path from "node:path";

export type ClientInquiryInput = {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
};

export type ClientInquiry = ClientInquiryInput & {
  id: string;
  createdAt: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "client-inquiries.json");

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "[]\n", "utf8");
  }
}

function normalizeText(value: string) {
  return value.trim();
}

function validateInput(input: ClientInquiryInput) {
  const name = normalizeText(input.name);
  const phone = normalizeText(input.phone);
  const email = normalizeText(input.email);
  const company = normalizeText(input.company);
  const message = normalizeText(input.message);

  if (!name) throw new Error("이름을 입력해 주세요.");
  if (!phone) throw new Error("전화번호를 입력해 주세요.");
  if (!message) throw new Error("문의 내용을 입력해 주세요.");

  return { name, phone, email, company, message };
}

function makeId() {
  return `inq-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function createClientInquiry(input: ClientInquiryInput) {
  await ensureDataFile();
  const valid = validateInput(input);

  const next: ClientInquiry = {
    id: makeId(),
    ...valid,
    createdAt: new Date().toISOString(),
  };

  const raw = await fs.readFile(DATA_FILE, "utf8");
  const items = JSON.parse(raw) as ClientInquiry[];
  items.unshift(next);

  await fs.writeFile(DATA_FILE, `${JSON.stringify(items, null, 2)}\n`, "utf8");

  return next;
}
