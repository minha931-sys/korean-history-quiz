# AGENTS.md

## Project Context

HistoryMaster is a Korean history quiz and learning site for users preparing for the Korean History Proficiency Test, CSAT Korean history, and general Korean history review. The site should feel useful, trustworthy, and easy to continue using after a search visit.

The main product value is not just "free quizzes." Emphasize:

- 10-question Korean history skill checks
- Wrong-answer review
- Learning analysis
- Core timeline learning
- Confusing concept comparison pages
- Mobile-friendly quick study flow

## Communication With The User

- The user prefers direct, practical Korean.
- If the user asks to implement, make the change instead of only proposing.
- If the user says "구상", "초안", or "적용은 하지마", do not edit files.
- Keep final responses concise and outcome-focused.
- When a change has SEO, AdSense, or UX tradeoffs, mention the practical risk briefly.

## SEO Direction

- SEO pages should not look like thin or spammy pages.
- Prefer pages that satisfy search intent with clear explanations, comparison tables, examples, and useful follow-up links.
- Titles and descriptions should be click-worthy but not exaggerated or misleading.
- Use natural Korean phrases such as "완벽 정리", "차이 정리", "핵심 비교", only when the content actually supports it.
- Important pages should have internal links to related learning flows.
- Search visitors often enter through comparison pages, so comparison detail pages should guide users naturally toward the main quiz.
- Avoid making multiple pages that overlap too much without distinct intent.

## AdSense Approval Direction

The site should look like a real learning service, not a quiz shell or auto-generated content site.

Prioritize:

- Original explanatory content
- Clear site purpose
- About, privacy, terms, contact, and policy pages
- Helpful navigation
- Enough visible content before and after quiz interactions
- Human-written tone
- Avoid excessive repeated boilerplate
- Avoid pages that feel like keyword stuffing or doorway pages

When adding pages or sections, ask whether they improve user value, not only whether they add SEO surface area.

## Content Tone

- Korean copy should sound natural and useful, not AI-generated or promotional.
- Avoid stiff menu labels when possible.
- Prefer user-intent labels:
  - "한국사 실력점검하기"
  - "헷갈리는 개념 모아보기"
  - "핵심 연표"
  - "한국사 실력 점검 바로가기"
- Avoid overly ad-like phrases such as "무료 한국사 퀴즈 풀기" when a softer learning-oriented phrase works better.

## Quiz Question Quality

Do not copy Korean History Proficiency Test, CSAT, EBS, or other copyrighted question wording or option structures.

When adding or revising questions:

- Create original questions and choices.
- Avoid overly easy keyword-to-answer questions.
- Avoid choices from obviously different periods when they make the answer too easy.
- Distractors should be plausible within the same era or same conceptual neighborhood.
- Prefer concept-understanding questions over simple name/year recall.
- Explanations should teach why the answer is right, not merely repeat the answer.
- Keep answer indexes correct after editing.
- Check for duplicate IDs.

Examples of weak patterns to avoid:

- Asking about Silla but using Goryeo, Joseon, and modern history as obvious wrong choices.
- "Who founded X?" with famous names as the only clue.
- Repeating the same core fact in multiple questions with only wording changes.

## Comparison Pages

Comparison pages are important SEO entry points.

They should:

- Explain confusing concepts in enough depth.
- Include a comparison table when it helps.
- Keep mobile readability high.
- Avoid cluttered card layouts that feel spammy.
- Use clear internal navigation.
- Include a bottom CTA to return users to the main learning flow.

Preferred bottom CTA direction:

- Title: "한국사 실력 점검하기"
- Button: "한국사 실력 점검 바로가기"
- Copy should not imply the quiz is specifically about the exact comparison topic unless that feature exists.

## Mobile UX

Mobile usability is a major priority.

- Avoid awkward mid-word line breaks.
- Prefer word-based wrapping for Korean text where possible.
- Navigation should stay on one line on narrow screens when requested, using smaller text or horizontal scroll if necessary.
- Tables must remain readable on mobile; do not make them visually busy.
- Buttons should look clickable but not spammy.
- Avoid layouts that feel crowded or overly decorative.

## Home Page Direction

The first screen should communicate the site's value quickly:

- Main idea: "하루 10분, 한국사 퀴즈로 실력 점검"
- Subcopy direction: "한국사 10분 챌린지는 10문제 퀴즈, 오답노트, 학습 분석으로 한능검·수능 한국사 대비를 도와주는 무료 학습 사이트입니다."

Daily memory keyword:

- Keep it compact.
- Show the current date only, not "업데이트" text.
- Date should change automatically by day.
- Use a 10-day rotating set of comparison keywords.

## Analytics And Tracking

Analytics, Microsoft Clarity, Search Console, Naver verification, and AdSense scripts should be present consistently where intended.

When adding events:

- Track meaningful user actions, especially quiz start and quiz completion.
- Use stable event names.
- Avoid breaking the site if tracking scripts are blocked.

## Verification Checklist

After code edits, run relevant checks when possible:

- Search for duplicate or missing question IDs after question edits.
- Confirm answer indexes are within choices length.
- Check browser rendering for obvious JS errors.
- Run `git diff --check`.
- For SEO/meta changes, verify canonical, description, OG tags, analytics scripts, and internal links where relevant.

Known acceptable warning:

- Git may warn that CRLF will be replaced by LF. This warning alone is not a functional error.

## Editing Notes

- Preserve the existing static HTML/CSS/JS structure unless the user asks for a larger refactor.
- Do not remove existing user work unless explicitly requested.
- Keep changes practical and aligned with the site's learning-service direction.
- 문제를 수정하거나 관련된 작업을 하는게 아니라면 questions 폴더에 있는 문제들은 읽지 마.
