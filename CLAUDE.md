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
- `App` — holds `transactions` state (seeded with 8 hardcoded entries); provides `handleAddTransaction` and `handleDeleteTransaction`.
  - `Summary` — receives `transactions`, derives totals and balance internally.
  - `TransactionForm` — owns form state; calls `onAdd(transaction)` on submit.
  - `TransactionList` — owns filter state; receives `transactions` and `onDelete`; filters internally.

**Data model:**
- Transactions have: `id`, `description`, `amount` (number), `type` ("income" | "expense"), `category`, `date`
- `categories` constant is duplicated in `TransactionForm` and `TransactionList` — not yet shared.
- "Freelance Work" in the seed data is typed as `"expense"` but categorized as `"salary"` (intentional bug for the course).

Styling is plain CSS in `src/App.css` and `src/index.css`. No CSS framework or component library is used.
