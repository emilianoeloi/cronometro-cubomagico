# Copilot instructions for this repo

This is an old Create React App (`react-scripts@0.8.1`) project: a Rubik's
cube speedsolving timer (pt-BR UI) backed by Firebase. See [AGENTS.md](../AGENTS.md)
for full architecture, setup, and conventions — read it first.

## Quick facts

- React 15 class components only — no hooks, no functional components. Match
  existing style (methods bound in constructor) rather than modernizing.
- Components live at `src/<Name>/index.js`; `Footer.js` and `Common.js` are
  the exceptions living directly under `src/`.
- Firebase reads/writes are centralized in [src/App.js](../src/App.js) and
  passed down as props — don't add direct Firebase calls inside leaf
  components.
- `public/cubejs/**` is a vendored third-party library; leave its code style
  alone.
- Tests are Jest snapshot tests (`react-test-renderer`/`enzyme`) in
  `src/__tests__/*-test.js`. Run with `make test`; update snapshots with
  `make test-update` after an intentional render change.
- `src/Config.js` is required at runtime but is gitignored — never commit
  real Firebase/GA keys, and don't create this file with placeholder secrets.

## When making changes

- Keep new UI text in Portuguese, consistent with existing copy.
- Prefer editing existing files over introducing new abstractions/frameworks
  in this small, legacy codebase.
