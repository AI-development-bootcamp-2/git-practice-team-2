## 1. Setup

- [x] 1.1 Install recharts: `cd client && npm install recharts`
- [x] 1.2 Add `getStats()` to `client/src/services/api.js` (stub with mock data first: `{ total: 3, byStatus: { todo: 1, 'in-progress': 1, review: 0, done: 1 }, completionPct: 33.3 }`)

## 2. Navigation

- [x] 2.1 Add `view` state to `client/src/components/App.jsx` (`"tasks"` | `"statistics"`, default `"tasks"`)
- [x] 2.2 Add nav buttons/links ("Tasks" and "Statistics") that update the `view` state
- [x] 2.3 Conditionally render `<TodoList />` or `<StatisticsPage />` based on `view`

## 3. Statistics Page — Skeleton

- [x] 3.1 Create `client/src/components/StatisticsPage.jsx`
- [x] 3.2 On mount, call `getStats()` and store result in local state
- [x] 3.3 Show a loading spinner while the fetch is in progress

## 4. Metric Cards

- [x] 4.1 Once data loads, render a card for **Total** todos
- [x] 4.2 Render cards for each status count: Todo, In Progress, Review, Done
- [x] 4.3 Render a card for **Completion %**

## 5. Pie Chart

- [x] 5.1 Import `PieChart`, `Pie`, `Cell`, `Tooltip` from `recharts`
- [x] 5.2 Render a pie chart with one segment per status, sized by count
- [x] 5.3 Show an empty-state message when total is 0

## 6. Connect to Real Endpoint

- [ ] 6.1 Once Adi's `GET /api/todos/stats` is merged, update `getStats()` in `api.js` to call the real endpoint
- [ ] 6.2 Verify metric cards and chart populate correctly with live data
