# AGENTS.md

## Project overview

Cronômetro de Cubo Mágico Online — a Rubik's cube speedsolving timer web app.
Bootstrapped with an old Create React App (`react-scripts@0.8.1`), React 15
class components (no hooks), and Firebase (Realtime Database + Auth) for
storing and ranking solve times. UI copy and comments are in Portuguese (pt-BR).

## Setup

```bash
make setup   # npm install
```

The app requires `src/Config.js` (gitignored, not in repo) exporting a
`config` object with Firebase keys and a Google Analytics UA. See the
[README](README.md) for the exact shape. Without it, `firebase.initializeApp`
in [src/App.js](src/App.js) will fail at runtime.

## Build / run / test commands

```bash
make run           # npm start   -> react-scripts start (dev server)
make test          # npm test    -> jest
make test-update    # npm test -- -u  (update snapshots)
npm run build       # production build to build/
make deploy         # npm run build; firebase deploy
```

Run a single test file directly with `npx jest src/__tests__/Stopwatch-test.js`.

## Architecture

- [src/App.js](src/App.js): top-level component. Owns Firebase init, auth
  state, and all Realtime Database reads/writes (`users/{userKey}/times` and
  the global `times` list). Passes data down as props to children.
- [src/Common.js](src/Common.js): shared helpers (e.g. `msToISOString` for
  formatting elapsed milliseconds as `HH' SS.ss"`).
- Components live under `src/<ComponentName>/index.js`:
  [Stopwatch](src/Stopwatch/index.js), [MyTimes](src/MyTimes/index.js),
  [BestTimes](src/BestTimes/index.js), [Shuffle](src/Shuffle/index.js).
  [Footer.js](src/Footer.js) sits at `src/` root (not in its own folder).
- [public/cubejs](public/cubejs): a vendored third-party library (cube.js) for
  scramble generation, loaded outside the normal `src`/webpack module graph —
  do not "fix" its style to match `src`.
- Firebase config lives in [firebase.json](firebase.json) (hosting +
  database rules) and [database.rules.json](database.rules.json).

## Skills library

[.github/skills](.github/skills) holds a bundle of generic, portable
engineering skills (auth perimeter, backend env setup, TDD, code review,
diagnosing bugs, codebase design, etc. — see [.github/skills/README.md](.github/skills/README.md)).
They're stripped of project-specific details and aren't about this cube
timer app itself, but check them for process/pattern guidance (e.g. before
adding auth checks, debugging a hard bug, or planning a refactor).

## Conventions

- ES2015 class components with methods bound in the constructor
  (`this.foo = this.foo.bind(this)`); no hooks, no functional components.
- Plain CSS imports (`App.css`) with literal `className` strings, not CSS
  Modules, despite the Jest `moduleNameMapper` mapping `.css` files.
- Tests are snapshot tests using `react-test-renderer` / `enzyme`, located in
  `src/__tests__/*-test.js` with snapshots in `src/__tests__/__snapshots__`.
  Regenerate snapshots with `make test-update` after intentional UI changes.
- Keep UI-facing strings in Portuguese, matching the rest of the app.

## CI

[.github/workflows/codeql-analysis.yml](.github/workflows/codeql-analysis.yml)
runs CodeQL security scanning. There is no automated test-running CI workflow.
