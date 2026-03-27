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

This is a minimal React 19 + Vite app with no routing, no state management library, and no backend. All state lives in a single `useState` call in `src/App.jsx`.

**Key facts about the data model:**
- Transactions have: `id`, `description`, `amount` (stored as string), `type` ("income" | "expense"), `category`, `date`
- `amount` is stored as a string — arithmetic on it produces string concatenation bugs (intentional for the course)
- "Freelance Work" in the seed data is typed as `"expense"` but categorized as `"salary"` (intentional bug)

**State in `App.jsx`:**
- `transactions` — array of all transactions (seeded with 8 hardcoded entries)
- `description`, `amount`, `type`, `category` — controlled form inputs for adding a transaction
- `filterType`, `filterCategory` — filter state for the transaction table

Totals (`totalIncome`, `totalExpenses`, `balance`) and `filteredTransactions` are derived directly in the render body on every render — no memoization.

Styling is plain CSS in `src/App.css` and `src/index.css`. No CSS framework or component library is used.
