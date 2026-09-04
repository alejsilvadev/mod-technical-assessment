# MOD JSON Posts

A Next.js site built around the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API. The homepage opens with an animated hero, then an About/Approach section built around a custom scroll-driven wireframe sphere, and a carousel of the latest posts pulled live from the API. Each post has its own page with previous/next navigation, and a badge tracks how many you've read this visit.

Live demo: https://mod-technical-assessment.vercel.app/

## What's here

- **Homepage** — a full-bleed video hero with a hand-traced "MOD" logo that draws and undraws as you scroll, an About/Approach section where a wireframe sphere draws itself in, slides across, and unravels as the text around it crossfades, and a coverflow-style carousel of posts from the API.
- **Post details** (`/posts/[id]`) — full post content with previous/next navigation and loading/error/not-found states.
- **Read counter** — tracks how many distinct posts you've opened this visit, shown as a badge on the homepage.
- **Lab** (`/lab/...`) — a few standalone animation experiments kept around from building the homepage: a staggered shape grid, a 3D exploded-brick rocket, and the wireframe sphere on its own full-bleed page.

All of the scroll-driven animation is hand-rolled (no animation library driving it) — a scroll listener drives a `[0, 1]` progress value that's applied directly as inline styles/SVG attributes each frame, respecting `prefers-reduced-motion` throughout.

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

- `npm run build` – production build
- `npm run start` – run the production build
- `npm run lint` – run ESLint

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4
- [anime.js](https://animejs.com/) — the MOD logo intro/outro
- [react-three-fiber](https://r3f.docs.pmnd.rs/) / three.js — the lab's 3D brick animation
