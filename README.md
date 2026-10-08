# react-router-starter

Opinionated starter for server-rendered web apps with React Router (framework mode) and
TypeScript. Strict by default, tested in a real browser, ready for CI and Docker.

## What's included

| Area         | Tools                                                                             |
| ------------ | --------------------------------------------------------------------------------- |
| Framework    | React Router 8 (SSR), React 19, Vite                                              |
| Language     | TypeScript (strict + `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, …) |
| Styling      | Tailwind CSS 4, dark mode, no external fonts or CDNs (GDPR-friendly)              |
| i18n         | i18next with German (`/`) and English (`/en`), type-safe keys, language switcher  |
| Code quality | Oxfmt (formatting), Oxlint (type-aware linting, a11y, React hooks)                |
| Tests        | Vitest + Testing Library (unit), Playwright + axe-core (E2E + WCAG 2.2 AA)        |
| Git workflow | lefthook hooks, commitlint (Conventional Commits), Copilot commit message rules   |
| CI           | GitHub Actions (check, test, build, E2E), PR title check, Renovate                |
| Deployment   | Multi-stage Dockerfile, non-root runtime                                          |
| AI tooling   | Playwright MCP server (`.mcp.json`) for agent-driven browser testing              |

## Start a new project

```sh
pnpm create react-router@latest my-app --template Sibo1505/react-router-starter
cd my-app
pnpm i                                  # installs dependencies and git hooks
pnpm exec playwright install chromium   # once per machine, for E2E tests
pnpm dev                                # http://localhost:5173
```

Alternatively click **Use this template** on GitHub.

### First steps in the new project

- [ ] Set the project name in `package.json` and `app/config/site.ts`
- [ ] Replace texts in `app/locales/*/translation.json`
- [ ] Update the copyright holder in `LICENSE` (or choose another license)
- [ ] Rewrite this README for your project

### GitHub settings (not copied by templates)

**Settings → General → Pull Requests**

- [ ] Only **Allow squash merging**, default message: **Pull request title and description**
- [ ] **Automatically delete head branches**

**Settings → Rules → Rulesets → New branch ruleset** (after the first CI run, so checks can be selected)

- [ ] Name `protect-main`, enforcement **Active**, target **default branch**
- [ ] **Restrict deletions**, **Block force pushes**
- [ ] **Require a pull request before merging**, 0 approvals, merge method **Squash** only
- [ ] **Require status checks to pass** + up to date: `Lint, typecheck, test, build`,
      `E2E tests`, `Validate PR title`

**Renovate** (dependency updates, configured in `.github/renovate.json5`)

- [ ] Install the [Renovate GitHub App](https://github.com/apps/renovate) for the new repository
- [ ] Keep **Issues** enabled: Renovate lists all pending updates in a "Dependency Dashboard" issue

## Scripts

```sh
pnpm dev            # dev server
pnpm check          # format check + lint + type check
pnpm test           # unit tests (pnpm test:watch for watch mode)
pnpm test:e2e       # E2E + accessibility tests against the production build
pnpm test:e2e:ui    # Playwright UI mode
pnpm build          # production build
pnpm start          # serve the production build
pnpm format         # format all files
```

## Project structure

```
app/
├── components/   reusable components (layout/, ui/)
├── config/       project-wide settings (site name, …)
├── lib/          framework-independent helpers (i18n URL helpers, hooks)
├── locales/      translations (plain i18next JSON, editable by tools like Weblate)
├── middleware/   React Router middleware (i18next per request)
├── routes/       route modules (pages and layouts)
├── routes.ts     route config, registers every page once per locale
└── root.tsx      HTML document, error boundary
e2e/              Playwright tests
test/             unit test setup and helpers
```

## i18n

- The URL is the only source of the language: `/` is German, `/en/...` is English.
- German (`app/locales/de`) is the source of truth; TypeScript fails if another locale is
  missing a key, and a unit test fails on extra or empty keys.
- **Add a language:** add it to `locales` in `app/lib/i18n.ts`, create
  `app/locales/<lang>/translation.json` and register it in `app/locales/index.ts`.
  Routes are generated automatically.

## Git workflow

- Branch from `main`, open a PR, squash-merge. The PR title becomes the commit on `main`, so it
  must follow [Conventional Commits](https://www.conventionalcommits.org) (`feat: …`, `fix: …`).
- Hooks: `pre-commit` formats and lints staged files, `commit-msg` runs commitlint,
  `pre-push` runs `pnpm check` and unit tests.

## Dependency updates

[Renovate](https://docs.renovatebot.com) opens update PRs every Monday morning; merge them once CI
is green.

- Minor and patch updates of npm packages come as one grouped PR, GitHub Actions as another.
- Major updates come as separate PRs, so breaking changes can be reviewed one at a time.
- Releases must be at least 3 days old before Renovate proposes them (supply-chain protection).
- Node.js major upgrades (`.nvmrc`, `Dockerfile`, `@types/node`) are only opened after ticking
  them in the **Dependency Dashboard** issue.

## License

[MIT](./LICENSE)
