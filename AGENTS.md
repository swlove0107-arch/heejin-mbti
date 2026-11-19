<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# 프로젝트 작업 규칙

## [서비스 소개]
- **이름**: 찌니 MBTI
- 12개 질문에 답하면 16가지 성격 유형 중 하나를 알려주는 검사 서비스
- 유형마다 3D 동물 캐릭터가 있다
- 회원은 검사 결과를 저장하고 마이페이지에서 다시 볼 수 있다

## [기술 규칙]
- **기술 스택**: Next.js(App Router) + TypeScript + Tailwind CSS
- **3D 및 백엔드**: 3D 캐릭터는 React Three Fiber 로, 데이터베이스와 로그인은 Supabase 로 만들 예정이다. 사용자가 요청하기 전에는 미리 설치하지 않는다.
- **언어**: 화면에 보이는 글은 모두 한국어
- **모바일 우선**: 휴대폰 화면(가로 375px)에서 먼저 보기 좋게 만든다

## [작업 방식]
- **요청 범위 준수**: 사용자가 요청한 범위만 작업한다. 요청하지 않은 기능이나 페이지는 만들지 않는다.
- **한국어 주석**: 코드에는 초보자가 읽을 수 있도록 한국어 주석을 단다.
- **빌드 검증**: 코드를 고친 작업을 마치면 `npm run build` 로 오류가 없는지 확인한다.
- **화면 및 동작 검증**: 화면을 바꾼 작업을 마치면 개발 서버가 켜져 있는지 확인하고, 내장 브라우저로 바뀐 페이지를 열어 직접 눌러 본 뒤 화면 캡처를 보여준다.
- **완료 안내**: 마지막에는 "바뀐 점"과 "내가 브라우저에서 확인할 방법"을 짧게 알려준다.
