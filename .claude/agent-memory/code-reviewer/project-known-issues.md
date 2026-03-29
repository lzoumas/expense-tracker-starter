---
name: Known codebase issues
description: Bugs, anti-patterns, and intentional issues found during review sessions
type: project
---

**Intentional bug (course exercise):** "Freelance Work" seed transaction has type "expense" but category "salary". Do not flag this.

**Bugs found in review:**
- TransactionList.jsx L63: Amount formatting uses `t.amount.toLocaleString()` without fraction digit options — amounts like 1200 display as "1,200" not "1,200.00". Summary.jsx uses minimumFractionDigits: 2 but TransactionList does not match.
- TransactionForm.jsx L13: Validation `!amount` allows negative numbers — no guard against parseFloat("-5"). The string "-5" is truthy so it passes the guard, and negative amounts enter state silently.
- SpendingChart.jsx L56: `key={index}` used on Cell components. Should use `key={entry.name}` since category names are unique stable strings.
- App.jsx handleAddTransaction/handleDeleteTransaction: Both correctly use functional `prev =>` update form — no stale closure issue.
- id generation via `Date.now()` in TransactionForm — collision risk on rapid double-submit.
- SpendingChart.jsx L36: `radius` prop on `<BarChart>` is not a valid Recharts BarChart prop; it should only be on `<Bar>` (where it also appears correctly on line 54). The BarChart one is silently ignored.
- TransactionForm.jsx: No `date` field in the form — all new transactions are silently stamped with today's date; user cannot override it.
- TransactionList.jsx L63: Amount column shows raw decimal from input (e.g. "5.5" renders as "5.5" not "5.50") because toLocaleString() without fractionDigits options is inconsistent with Summary formatting.
- SpendingChart Tooltip formatter: `value.toLocaleString()` without fraction options — inconsistent with Summary.jsx formatting.

**Anti-patterns:**
- `window.confirm()` in TransactionList for delete confirmation — blocks the main thread, unstyled, not accessible.
- Global `form` CSS selector in App.css will affect any future form added to the app.
- Hardcoded color `#6b6560` in SpendingChart.jsx XAxis/YAxis tick props instead of the CSS variable `--text-muted`.
- The empty `<th></th>` for the delete column in TransactionList has no scope or aria-label.
- SpendingChart returns `null` when there are no expenses — no empty state message for the user.

**Accessibility:**
- Form inputs in TransactionForm use `aria-label` (not visible `<label>` elements) — fine for screen readers but sighted users lose context once fields are filled.
- The delete button text is just "Delete" with no association to the row — screen readers cannot tell which transaction is being deleted. Should use `aria-label={`Delete ${t.description}`}`.
- `<th>` elements in TransactionList are missing `scope="col"`.
- `body::before` noise overlay has `z-index: 9999` — will sit above modals or tooltips added in the future.
- Summary cards use `<h3>` labels (Income, Expenses, Balance) but the amounts below them are bare `<p>` elements — no semantic association between label and value for AT users.

**Maintainability:**
- `categories` array duplicated in TransactionForm.jsx and TransactionList.jsx — should live in a shared constants file.
- COLORS object in SpendingChart.jsx duplicates the same color values already used for category-badge in App.css. No single source of truth for category colors.
- App.css `form` selector is globally scoped — will break layout of any second form added to the app.
