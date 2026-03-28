# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run lint     # run ESLint
npm run preview  # preview production build
```

## Architecture

This is a minimal React 19 + Vite app with no routing, no state management library, and no backend.

**Component tree:**
- `App` — holds the `transactions` array in state (seeded with 8 hardcoded entries) and passes it down. The only logic here is `handleAdd`, which appends a new transaction.
  - `Summary` — receives `transactions`, derives `totalIncome`, `totalExpenses`, and `balance` internally.
  - `TransactionForm` — owns its own form state (`description`, `amount`, `type`, `category`); calls `onAdd(transaction)` prop on submit.
  - `TransactionList` — owns its own filter state (`filterType`, `filterCategory`); receives `transactions` and filters them internally.

**Data model:**
- Transactions have: `id`, `description`, `amount` (number), `type` ("income" | "expense"), `category`, `date`
- `categories` constant is duplicated in `TransactionForm` and `TransactionList` — not yet shared.
- "Freelance Work" in the seed data is typed as `"expense"` but categorized as `"salary"` (intentional bug for the course).

Styling is plain CSS in `src/App.css` and `src/index.css`. No CSS framework or component library is used.
