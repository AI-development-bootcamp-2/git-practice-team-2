## Context

The todo app already has a working list view with full CRUD. Adi (Person 4) is building `GET /api/todos/stats` which returns `{ total, byStatus, completionPct }`. Gabi's job is the frontend Statistics page that consumes that endpoint.

The client already has a central `api.js` fetch wrapper and a component-based structure in `client/src/components/`.

## Goals / Non-Goals

**Goals:**
- Add a Statistics page with navigation, metric cards, loading state, and a pie chart
- Keep the existing list view fully intact

**Non-Goals:**
- Backend work (that's Adi's job)
- Search, filter, tags, due dates, priority — out of scope for this iteration

## Decisions

**Stub data while Adi's endpoint isn't ready**
Start with hardcoded mock data in `getStats()`, swap for the real fetch once Adi merges. This unblocks Gabi from day one.

**Navigation as simple React state in App.jsx**
A single `view` state (`"tasks" | "statistics"`) in App switches between `<TodoList />` and `<StatisticsPage />`. No router needed — the app is single-page and simple.

**recharts for the pie chart**
Already specified in the spec. `PieChart` + `Pie` + `Cell` covers the status distribution chart with minimal setup.

**Loading spinner, not skeleton**
A simple CSS spinner while `getStats()` resolves. Keeps implementation straightforward for a workshop context.

## Risks / Trade-offs

- **Adi's endpoint not ready** → Mitigated by starting with mock data
- **recharts bundle size** → Acceptable for this app; no optimization needed
