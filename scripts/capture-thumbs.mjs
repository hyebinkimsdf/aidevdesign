import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "../public/thumbs");

const PROJECTS = [
  {
    id: "withbill",
    pages: [
      "https://www.withbilldanceacademy.com/nwba001",
      "https://www.withbilldanceacademy.com/ahall",
      "https://www.withbilldanceacademy.com/wb1on1",
    ],
  },
  { id: "pwin",      pages: ["https://www.pwin.co.kr"] },
  { id: "lgshop",    pages: ["https://www.lgshop-ys.com"] },
  { id: "micimpact", pages: ["https://www.micimpact.net"] },
];

// 단일 URL 프로젝트용 스크롤 위치 (페이지 높이 비율)
const SCROLL_STEPS = [0, 0.6, 1.4];

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1280, height: 800 });

  for (const project of PROJECTS) {
    const dir = join(PUBLIC_DIR, project.id);
    await mkdir(dir, { recursive: true });

    const isMultiPage = project.pages.length > 1;
    console.log(`캡처 중: ${project.id} (${isMultiPage ? "멀티 페이지" : project.pages[0]})`);

    if (isMultiPage) {
      // 페이지별 1장씩
      for (let i = 0; i < project.pages.length; i++) {
        const url = project.pages[i];
        try {
          await page.goto(url, { waitUntil: "load", timeout: 30000 });
          await page.waitForTimeout(1500);
          await page.screenshot({
            path: join(dir, `${i + 1}.jpg`),
            type: "jpeg",
            quality: 85,
          });
          console.log(`  ✓ ${i + 1}.jpg → ${url}`);
        } catch (err) {
          console.error(`  ✗ 실패 (${url}): ${err.message}`);
        }
      }
    } else {
      // 단일 URL - 스크롤 3단계
      try {
        await page.goto(project.pages[0], { waitUntil: "load", timeout: 30000 });
        await page.waitForTimeout(2000);

        const pageHeight = await page.evaluate(() => document.body.scrollHeight);
        const viewportHeight = 800;
        const maxScroll = Math.max(0, pageHeight - viewportHeight);

        for (let i = 0; i < SCROLL_STEPS.length; i++) {
          const scrollY = Math.min(
            Math.floor(SCROLL_STEPS[i] * pageHeight),
            maxScroll,
          );
          await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollY);
          await page.waitForTimeout(500);
          await page.screenshot({
            path: join(dir, `${i + 1}.jpg`),
            type: "jpeg",
            quality: 85,
          });
          console.log(`  ✓ ${i + 1}.jpg (scrollY: ${scrollY})`);
        }
      } catch (err) {
        console.error(`  ✗ 실패: ${err.message}`);
      }
    }
  }

  await browser.close();
  console.log("\n완료! public/thumbs/ 에 저장됐습니다.");
}

capture();
