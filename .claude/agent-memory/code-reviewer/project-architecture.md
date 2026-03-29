---
name: Project architecture & conventions
description: Core stack, component structure, styling conventions for expense-tracker-starter
type: project
---

Stack: React 19 + Vite, no routing, no state management library, no backend. Uses Recharts for the SpendingChart.

Component tree: App (owns transactions state + handleAddTransaction/handleDeleteTransaction) → Summary, SpendingChart, TransactionForm, TransactionList. State always lives at App level.

Data model: { id, description, amount (number), type ("income"|"expense"), category, date (YYYY-MM-DD string) }

Styling: Plain CSS in src/App.css and src/index.css. Dark theme using CSS custom properties (--bg-deep, --bg-surface, etc.). Fonts loaded from Google Fonts: Fraunces (display) and Plus Jakarta Sans (body). No CSS framework.

The `categories` constant is intentionally duplicated in TransactionForm.jsx and TransactionList.jsx — not yet extracted to a shared file.

The `form` CSS selector in App.css is global (not scoped), which means it styles any future form in the app.

Animations: fadeInUp keyframe applied to summary cards, spending chart, add-transaction, and transactions sections with staggered delays.
**Why:** Dark-theme design overhaul was done recently; keep in mind when reviewing styling.
**How to apply:** Don't suggest reverting to light theme. Flag CSS specificity or maintainability issues.
