# Task 7 — Statistics Charts: Frontend

> **Owner:** Teammate E  
> **Can start immediately** — all new files, no dependency on backend phase 2.  
> **Before merging:** Pull Teammate D's changes (Task 5+6 frontend) to get the updated `App.jsx` before adding navigation.

---

## Install recharts

```
cd client
npm install recharts
```

Add `recharts` to `client/package.json` — commit `package.json` and `package-lock.json` together.

---

## New files to create (zero conflict risk)

### `client/src/components/StatsPage.jsx`

- Fetches all todos on mount via `api.todos.getAll()`
- Calculates all metrics client-side (no backend endpoint needed for phase 1)
- Renders metric cards + two charts
- Props: none (fetches its own data)

**Calculations to perform:**
```
total = todos.length
byStatus = group todos by status, count each
completionPct = Math.round((byStatus.done / total) * 100) || 0
overdue = todos.filter(t => t.dueDate && t.status !== 'done' && new Date(t.dueDate) < today).length
byDate = group todos by createdAt date (YYYY-MM-DD), count each
```

**Overdue card:** Only render if at least one todo has a `dueDate` field set. If none have it, omit the card.

---

### `client/src/components/StatusPieChart.jsx`

- Props: `byStatus` (object: `{ todo, 'in-progress', review, done }`)
- Uses recharts `PieChart`, `Pie`, `Cell`, `Tooltip`, `Legend`
- Color map (suggested):
  ```
  todo       → #94a3b8  (slate)
  in-progress → #60a5fa  (blue)
  review     → #fbbf24  (amber)
  done       → #34d399  (green)
  ```
- Label format: `"Todo (3)"`
- Empty state: if `total === 0`, render `<p>No data yet</p>` instead of the chart

---

### `client/src/components/ActivityChart.jsx`

- Props: `byDate` (object: `{ "2026-05-03": 3, "2026-05-04": 1, ... }`)
- Uses recharts `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`
- X-axis: date strings (format `"May 3"`)
- Y-axis: count
- Minimum viable: if fewer than 2 distinct dates, render:
  ```
  <p>Not enough data to display activity over time</p>
  ```

---

## Files to modify

### `client/src/components/App.jsx`

**What to add:**
- State: `const [currentView, setCurrentView] = useState('tasks')`
- Navigation bar: two buttons — "Tasks" and "Statistics"
  - Active button has a highlighted/bold style
  - Each button calls `setCurrentView('tasks')` or `setCurrentView('statistics')`
- Conditional render:
  ```
  {currentView === 'tasks' && <TodoList ... />}
  {currentView === 'statistics' && <StatsPage />}
  ```

**What NOT to change:**
- Do not move or rename `loadTodos`, `handleAdd`, `handleDelete`, `handleStatusChange`
- Do not remove the `AddTodo` form — keep it visible only in the tasks view (`currentView === 'tasks'`)
- Do not introduce React Router — state toggle only

**Conflict note:** Teammate D also modifies `App.jsx` (Task 5+6 — adds search/filter state and `handleAdd` signature). Pull D's merged changes before editing `App.jsx`. Add `currentView` state below D's state declarations. Add the navigation bar at the top of the JSX. Wrap the existing render in `{currentView === 'tasks' && ...}`.

---

## How to test

| Test | Expected |
|------|----------|
| Click "Statistics" | Charts render, todo list hidden |
| Click "Tasks" | Todo list visible, charts hidden |
| Pie chart with todos in all 4 statuses | 4 slices, each labeled |
| Pie chart with no todos | "No data yet" message |
| Bar chart with todos on 2+ different days | Chart renders |
| Bar chart with all todos on same day | "Not enough data" message |
| Overdue card — todos have dueDate | Shows count of overdue todos |
| Overdue card — no todos have dueDate | Card not rendered |
| Completion % | `(done / total) * 100`, rounded |

---

## Dependency on Task 6 frontend

The `overdue` metric requires `todo.dueDate` to exist. The component handles this gracefully — if no todos have `dueDate`, the overdue card is simply not rendered. No hard dependency; the component works without Task 6 being merged.
