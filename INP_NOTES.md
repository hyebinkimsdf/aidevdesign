# INP Improvement Notes

## Summary

This project showed likely INP risk from client-side rendering cost, repeated timers, scroll-driven state updates, and early third-party script execution.

The goal of the recent changes was to reduce main-thread work during and shortly after user interaction.

## Main Suspected Causes

1. Heavy client-side hydration in interactive sections such as `Projects` and `ClientPortfolio`.
2. Thumbnail sliders rendering multiple images per card at the same time.
3. Search and category filtering running immediately on every input update.
4. Navigation scroll listeners updating React state too often.
5. Analytics and GTM scripts loading too early and competing with early interactions.

## Changes Applied

### 1. Deferred filtering in Projects

File: [app/components/Projects.tsx](/Users/hyebin/개발/portfoilo/app/components/Projects.tsx)

- Added `startTransition` for search/category updates.
- Added `useDeferredValue` so filtering work does not block typing responsiveness.

### 2. Reduced thumbnail rendering cost

Files:
- [app/components/Projects.tsx](/Users/hyebin/개발/portfoilo/app/components/Projects.tsx)
- [app/homepage-development/components/ClientPortfolio.tsx](/Users/hyebin/개발/portfoilo/app/homepage-development/components/ClientPortfolio.tsx)

- Changed slider rendering from "all slides mounted with opacity toggle" to "current slide only".
- This reduces DOM nodes, image decode work, and per-card render cost.

### 3. Reduced scroll-driven re-renders

Files:
- [app/components/Nav.tsx](/Users/hyebin/개발/portfoilo/app/components/Nav.tsx)
- [app/homepage-development/components/ClientNav.tsx](/Users/hyebin/개발/portfoilo/app/homepage-development/components/ClientNav.tsx)

- Scroll handlers now update state only when the threshold result actually changes.
- This reduces unnecessary rerenders while scrolling.

### 4. Delayed third-party scripts

File: [app/layout.tsx](/Users/hyebin/개발/portfoilo/app/layout.tsx)

- Changed analytics-related `next/script` strategy from `afterInteractive` to `lazyOnload`.
- This helps prevent analytics scripts from competing with early UI interactions.

## Expected Impact

- Better responsiveness while typing in project search.
- Less main-thread pressure from project thumbnails.
- Fewer unnecessary rerenders during scroll.
- Lower chance of analytics scripts affecting early interaction latency.

## Remaining Risk Areas

1. `Projects` is still a large client component and may benefit from further splitting.
2. Each card slider still uses a timer; this could be optimized further if needed.
3. Field measurement is still needed to confirm which interaction contributes most to INP.

## Recommended Next Steps

1. Measure INP with Lighthouse, Vercel Speed Insights, or Chrome Performance panel.
2. Identify the worst interaction: search input, menu open, card click, or form interaction.
3. If INP is still high, consider:
   - splitting large client components,
   - pausing offscreen sliders,
   - reducing animation and observer work,
   - minimizing additional third-party scripts.

## Verification

- `npm run build` completed successfully after the changes.

---

## SSG 전환 — 2026-04-10

### 원인

Next.js App Router는 기본적으로 SSR 구조라, 요청마다 서버에서 HTML을 생성한다.
서버 상태가 좋지 않거나 콜드 스타트가 발생하면 TTFB(Time To First Byte)가 늘어나 초기 로딩이 느려진다.
포트폴리오 사이트는 콘텐츠가 정적이므로 SSR의 이점이 없음에도 불필요한 서버 비용을 지불하고 있었다.

### 수정 사항

파일: [app/page.tsx](app/page.tsx)

```tsx
// 변경 전 — SSR (요청마다 서버 렌더링)
import dynamic from "next/dynamic";

const Projects = dynamic(...);

// 변경 후 — SSG (빌드 시 HTML 미리 생성)
import dynamicImport from "next/dynamic";

export const dynamic = "force-static";   // ← 추가

const Projects = dynamicImport(...);
```

`next/dynamic` import 이름이 `dynamic`이라 Route Segment Config의 `export const dynamic`과 충돌하므로 import를 `dynamicImport`로 rename 후 적용.

### 언제 이 방법을 써야 하는가

| 조건 | SSG 적합 여부 |
|------|--------------|
| 콘텐츠가 자주 바뀌지 않는 정적 페이지 (포트폴리오, 랜딩) | ✅ 적합 |
| 사용자별 데이터, 인증, 실시간 업데이트가 필요한 페이지 | ❌ SSR 유지 |
| 콘텐츠가 가끔 바뀌는 경우 | ISR (`export const revalidate = N`) 사용 |

### 예상 개선 효과

| 지표 | 변경 전 | 변경 후 | 개선 |
|------|--------|--------|------|
| TTFB | 서버 응답 의존 (가변) | CDN 캐시 서빙 (고정) | ~60–80% 단축 예상 |
| 초기 HTML 생성 시점 | 요청 시 | 빌드 시 (미리 생성) | 서버 처리 비용 제거 |

> 실측값은 Vercel Speed Insights 또는 Chrome DevTools Network 탭의 TTFB로 확인 필요.

---

## Lighthouse Performance Audit — 2026-04-09

### 측정 결과

| 지표 | 현재 | 목표 |
|------|------|------|
| FCP  | 1.9s | ≤ 1.8s |
| LCP  | 3.5s | ≤ 2.5s |
| 색상 대비 | 불합격 | WCAG AA (4.5:1 이상) |

---

### LCP 문제

#### 근본 원인 1 — Hero h1 opacity 애니메이션 (최우선)

파일: [app/components/Hero.tsx](app/components/Hero.tsx)

```tsx
<h1 className="... animate-fade-in-up delay-100">
  Hyebin
</h1>
```

`animate-fade-in-up`은 `opacity: 0`에서 시작하고, `delay-100`은 120ms 딜레이를 추가한다.
Lighthouse는 opacity가 0인 동안 해당 요소를 LCP 후보로 인식하지 않는다.

- FCP 1.9s + 딜레이 120ms + 애니메이션 650ms = LCP 측정 기준점 ≈ 2.7s 이후
- 실제 LCP 3.5s는 이 구조에서 비롯된 것으로 판단됨

**해결 방안:**

```tsx
// 변경 전
<h1 className="... animate-fade-in-up delay-100">

// 변경 후 — h1은 opacity:1로 즉시 노출, 내부 span에만 시각 효과
<h1 className="... text-foreground">
  <span className="animate-fade-in-up delay-100 inline-block">Hyebin</span>
</h1>
```

또는 h1 자체에서 `animate-fade-in-up`을 제거하고 `animate-fade-in`(opacity만)을 매우 짧게 유지하거나 제거.

> LCP 개선 예상: 최대 1.0s 단축 가능

---

#### 근본 원인 2 — Image `unoptimized` prop

파일: [app/components/Projects.tsx](app/components/Projects.tsx) (line 348)

```tsx
<Image
  src={`/thumbs/${thumb}/${current + 1}.jpg`}
  fill
  unoptimized   // ← WebP 변환, 크기 최적화, 캐시 헤더 모두 비활성화
  ...
/>
```

Next.js Image 최적화를 완전히 우회해 `.jpg` 원본이 그대로 전달된다.
Projects 섹션이 뷰포트에 일찍 들어오면 LCP 후보가 될 수 있음.

**해결 방안:** `unoptimized` 제거. 이미지가 `public/thumbs/` 경로에 있으면 Next.js가 자동으로 WebP 변환 + 크기 최적화 적용.

```tsx
// 변경 전
<Image src={...} fill unoptimized sizes="..." className="..." ... />

// 변경 후
<Image src={...} fill sizes="(max-width: 640px) 100vw, 50vw" className="..." ... />
```

> LCP + FCP 개선 기여. 이미지 전송 용량 40-70% 감소 예상

---

### 색상 대비 문제

#### CSS 변수 현황

파일: [app/globals.css](app/globals.css)

```css
--background: #0c0c0c
--muted:      #6b7280   ← 문제 원인
```

#### 실패 케이스

| 사용 클래스 | 추정 대비율 | 기준 | 판정 |
|------------|------------|------|------|
| `text-muted` (`#6b7280` on `#0c0c0c`) | ~4.8:1 | 4.5:1 | 소형 텍스트 위험 |
| `text-muted/80` | ~3.8:1 | 4.5:1 | **실패** |
| `text-muted/75` | ~3.6:1 | 4.5:1 | **실패** |
| `text-muted/50` | ~2.4:1 | 4.5:1 | **실패** |
| `text-foreground/60` | ~3.5:1 | 4.5:1 | **실패** |
| `text-foreground/65` | ~3.7:1 | 4.5:1 | **실패** |

주요 등장 위치:
- `text-muted/50` → Hero scroll 인디케이터, footer (app/page.tsx)
- `text-muted/75` → Projects 설명 텍스트 (Projects.tsx)
- `text-foreground/60` → Hero 소개 문단 (Hero.tsx)
- `text-foreground/65` → Contact 설명 (Contact.tsx)

#### 해결 방안

`--muted`를 `#6b7280`(gray-500)에서 `#9ca3af`(gray-400)로 상향 조정.

```css
/* 변경 전 */
--muted: #6b7280;

/* 변경 후 */
--muted: #9ca3af;   /* #0c0c0c 배경 대비 ~5.8:1 → WCAG AA 통과 */
```

단, `text-muted/50`처럼 50% 이하 투명도 클래스는 변경 후에도 대비 기준 미달이므로:
- `text-muted/50` → `text-muted/70` 이상으로 올리거나
- 해당 요소가 장식용이라면 `aria-hidden="true"` 처리

---

### 수정 우선순위

| 우선순위 | 항목 | 예상 효과 |
|---------|------|----------|
| 1 | Hero h1 opacity 애니메이션 제거 | LCP -1.0s |
| 2 | `Image unoptimized` 제거 | LCP/FCP 개선 + 전송량 감소 |
| 3 | `--muted` CSS 변수 상향 | 접근성 WCAG AA 통과 |
| 4 | `/50`, `/60`, `/65` opacity 클래스 정리 | 접근성 세부 대응 |

---

## Additional Context For Future Agents

### Favicon confusion

There was separate favicon-related confusion during this work.

- The project currently contains both [public/favicon.ico](/Users/hyebin/개발/portfoilo/public/favicon.ico) and [app/favicon.ico](/Users/hyebin/개발/portfoilo/app/favicon.ico).
- Because this project uses the App Router, favicon behavior was being driven mainly by the `app/` metadata/file convention, not by `public/favicon.ico` alone.
- This created confusion when the user expected the public favicon to be the only source of truth.

Recommended rule for future work:

1. Decide one canonical favicon source.
2. If using App Router conventions, prefer `app/favicon.ico` and keep metadata aligned with that choice.
3. Do not assume `public/favicon.ico` is controlling favicon output unless the actual head output is verified.

### Process issue during earlier AI assistance

The user reported that earlier AI assistance did not stay focused on the favicon issue and kept changing unrelated problems instead.

This caused:

- wasted tokens,
- unnecessary edits,
- extra back-and-forth,
- lower trust in the debugging process.

Recommended behavior for future agents:

1. Stay tightly scoped to the user’s active issue before making adjacent optimizations.
2. Confirm the actual source of truth first when debugging favicon or metadata behavior.
3. Avoid mixing unrelated performance, metadata, or UI fixes into the same thread unless the user asks for them.
4. If additional issues are discovered, note them separately instead of changing them immediately.
