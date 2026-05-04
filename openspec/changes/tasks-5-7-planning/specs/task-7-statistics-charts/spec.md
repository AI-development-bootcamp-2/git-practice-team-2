# Task 7 — Statistics Charts: Spec

## Overview

Add a Statistics view showing charts and metrics calculated from existing todo data.  
A navigation toggle in the app switches between the Tasks view and the Statistics view.

> **Reference:** An earlier spec exists at `openspec/changes/add-task-management-features/specs/statistics-page/spec.md` and `specs/stats-backend/spec.md`. This spec supersedes and expands on those documents.

---

## Decision: frontend calculation vs backend endpoint

**Default: frontend calculation from `GET /api/todos`.**  
The client already fetches all todos. Computing counts and groupings on the client is fast and requires no new API.  
A `GET /api/todos/stats` backend endpoint is specced as optional (phase 2) for cases where the dataset grows large enough that client-side calculation becomes a concern. For now, this is unnecessary.

---

## Charts required

### 1. Status Pie Chart
- Groups todos by `status`
- Shows count per status as a slice
- Labels: `Todo (3)`, `In Progress (1)`, `Review (2)`, `Done (4)`
- Empty state: show message "No data yet" instead of an empty chart

### 2. Activity Bar Chart (todos created over time)
- Groups todos by `createdAt` date (by day or by week)
- X-axis: date labels
- Y-axis: count of todos created on that date
- If all todos were created on the same day (common in early development): group by hour instead
- If fewer than 2 distinct dates exist: skip this chart and show a message "Not enough data to display activity over time"

---

## Metric cards (above charts)

| Metric | Calculation |
|--------|------------|
| Total tasks | `todos.length` |
| Completion % | `(done count / total) * 100`, rounded to 0 decimal places |
| Overdue | Count of todos where `dueDate < today && status !== 'done'` (requires Task 6) |

**Overdue metric:** Only show if Task 6 (dueDate) is already implemented. If `dueDate` does not exist on any todo, omit the Overdue card entirely rather than showing `0`.

---

## Navigation

- The app currently has no page routing (no React Router, no pages/ directory)
- Add a simple toggle: two buttons ("Tasks" / "Statistics") at the top of the app
- Clicking "Statistics" replaces the todo list with the Stats page
- Clicking "Tasks" returns to the todo list
- No URL change — state only (no routing library needed at this scale)

---

## Library

- `recharts` — already referenced in the existing statistics-page spec
- Install in the client: `npm install recharts`
- Components to use: `PieChart`, `Pie`, `Cell`, `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`, `Legend`

---

## Out of scope

- Real-time updates (the Stats page fetches once on mount)
- Filtering charts by date range
- Exporting chart data
- Backend stats endpoint (phase 2 only)
