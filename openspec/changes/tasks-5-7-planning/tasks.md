# Tasks 5–7: Assignment Plan

## Team assignment (6 teammates)

| Teammate | Tasks | Can start immediately? | Blocked by |
|----------|-------|----------------------|------------|
| **A** | Task 6 — backend | ✅ Yes | Nothing |
| **B** | Task 5 — backend | ⚠️ After A merges | Task 6 backend (A) |
| **C** | Task 7 — backend | ⚠️ After A merges | Task 6 backend (A) |
| **D** | Task 5 frontend + Task 6 frontend | ✅ Yes (can work locally, pull A before final merge) | None to start; pull A before merging |
| **E** | Task 7 — frontend | ✅ Yes (mostly new files) | Pull App.jsx changes from D before merging |
| **F** | Task 8 — drag & drop frontend | ❌ Blocked | Task 4 (Kanban layout) must be merged first |

> **Teammate F** should be the same person who implemented Task 4, or someone who has read the Kanban component code. They know the internal structure of `KanbanBoard`, `KanbanColumn`, and `TodoCard`.

---

## Conflict matrix

| File | A (T6-BE) | B (T5-BE) | C (T7-BE) | D (T5+T6-FE) | E (T7-FE) | F (T8-FE) |
|------|-----------|-----------|-----------|--------------|-----------|-----------|
| `server/src/routes/todos.js` | ✏️ Write | ✏️ Write | ✏️ Write | — | — | — |
| `server/src/services/todoService.js` | ✏️ Write | ✏️ Write | ✏️ Write | — | — | — |
| `client/src/services/api.js` | — | ✏️ Write | — | ✏️ Write | — | 👁 read |
| `client/src/components/App.jsx` | — | — | — | ✏️ Write | ✏️ Write | — |
| `client/src/components/TodoItem.jsx` | — | — | — | ✏️ Write | — | — |
| `client/src/components/AddTodo.jsx` | — | — | — | ✏️ Write | — | — |
| `client/src/components/TodoList.jsx` | — | — | — | ✏️ Write | — | — |
| `client/src/components/KanbanBoard.jsx` | — | — | — | — | — | ✏️ Write |
| `client/src/components/KanbanColumn.jsx` | — | — | — | — | — | ✏️ Write |
| `client/src/components/TodoCard.jsx` | — | — | — | — | — | ✏️ Write |
| `SearchBar.jsx` (new) | — | — | — | ✏️ Create | — | — |
| `StatusFilter.jsx` (new) | — | — | — | ✏️ Create | — | — |
| `StatsPage.jsx` (new) | — | — | — | — | ✏️ Create | — |
| `StatusPieChart.jsx` (new) | — | — | — | — | ✏️ Create | — |
| `ActivityChart.jsx` (new) | — | — | — | — | ✏️ Create | — |
| `DragOverlayCard.jsx` (new) | — | — | — | — | — | ✏️ Create |

---

## Merge order protocol

### Step 1 — Teammate A merges first
- Adds `dueDate` to `todoService.create()`, `todoService.update()`
- Adds `dueDate` validation in `routes/todos.js`
- **Everyone must `git pull` after A merges before touching those files**

### Step 2 — Teammates B and C merge (in parallel, after A)
- B: pull main → add query params to routes/todos.js → merge
- C: pull main → add `/stats` route to routes/todos.js → merge
- If B and C conflict on routes/todos.js: B merges first, C pulls and resolves

### Step 3 — Teammates D, E, and F merge (in parallel)
- D touches: `App.jsx`, `TodoItem.jsx`, `AddTodo.jsx`, `TodoList.jsx`, `api.js` + new files
- E touches: `App.jsx` + new files only
- F touches: `KanbanBoard.jsx`, `KanbanColumn.jsx`, `TodoCard.jsx` + new `DragOverlayCard.jsx`
- D should merge before E if both modify `App.jsx`; E pulls D's changes and resolves the App.jsx section only
- F has **zero overlap** with D and E on the frontend — can merge in any order relative to them
- **F must wait for Task 4 to merge before branching**

---

## Granular task list

### Task 5 — Search and Filtering

#### Backend (Teammate B)
- [ ] B-5-1: Add `getFiltered({ search, status })` to `todoService.js`
- [ ] B-5-2: Add `?search=` query param handling in `GET /` route in `todos.js`
- [ ] B-5-3: Add `?status=` query param handling (validate against `VALID_STATUSES`)
- [ ] B-5-4: Test: `GET /api/todos?search=git` returns only matching todos
- [ ] B-5-5: Test: `GET /api/todos` (no params) returns all todos unchanged ← non-breaking check

#### Frontend (Teammate D)
- [ ] D-5-1: Create `client/src/components/SearchBar.jsx` (controlled input, calls `onSearch`)
- [ ] D-5-2: Create `client/src/components/StatusFilter.jsx` (buttons/tabs for each status + "All")
- [ ] D-5-3: Add `searchTerm` and `filterStatus` state to `App.jsx`
- [ ] D-5-4: Pass `searchTerm` and `filterStatus` down to `TodoList.jsx` as props
- [ ] D-5-5: Add in-memory filtering logic in `TodoList.jsx`
- [ ] D-5-6: Update `api.js` `getAll()` to accept optional `{ search, status }` params (phase 2 hook)
- [ ] D-5-7: Test: search by title hides non-matching cards
- [ ] D-5-8: Test: status filter shows only matching status column
- [ ] D-5-9: Test: clearing search restores all cards

---

### Task 6 — Due Date

#### Backend (Teammate A)
- [ ] A-6-1: Update `todoService.create()` to accept and store optional `dueDate`
- [ ] A-6-2: Update `todoService.update()` to allow updating `dueDate`
- [ ] A-6-3: Add `dueDate` format validation in `POST /` route (ISO string or null)
- [ ] A-6-4: Add `dueDate` format validation in `PUT /:id` route
- [ ] A-6-5: Test: POST without `dueDate` → response has no `dueDate` (or `null`)
- [ ] A-6-6: Test: POST with valid `dueDate` → stored and returned
- [ ] A-6-7: Test: POST with invalid `dueDate` (e.g. `"not-a-date"`) → `400`
- [ ] A-6-8: Test: PUT with `dueDate: null` → clears the due date

#### Frontend (Teammate D)
- [ ] D-6-0: Install `react-datepicker` dependency in `client/`
- [ ] D-6-1: Add `DatePicker` to `AddTodo.jsx` with `isClearable` and `dateFormat="dd/MM/yyyy"`
- [ ] D-6-2: Update `api.js` `create()` to pass `dueDate` (ISO string)
- [ ] D-6-3: Display `dueDate` in `TodoItem.jsx` (formatted: `DD/MM/YYYY`)
- [ ] D-6-4: Add overdue indicator and light red background highlight in `TodoItem.jsx`
- [ ] D-6-5: Define overdue = `dueDate < today (start of day) AND status !== 'done'`
- [ ] D-6-6: Test: create todo with due date → shows as DD/MM/YYYY in card
- [ ] D-6-7: Test: past due date + not done → overdue label + light red highlight visible
- [ ] D-6-8: Test: past due date + done → no overdue highlight
- [ ] D-6-9: Test: clearing date in picker removes `dueDate` from todo object

---

### Task 7 — Statistics Charts

#### Backend (Teammate C — optional)
- [ ] C-7-1: Add `getStats()` to `todoService.js` (counts by status, total, completionPct)
- [ ] C-7-2: Register `GET /api/todos/stats` route in `todos.js` **before** `/:id` route
- [ ] C-7-3: Test: `GET /api/todos/stats` returns `{ total, byStatus, completionPct }`
- [ ] C-7-4: Test: empty data → returns `{ total: 0, byStatus: {...}, completionPct: 0 }`

#### Frontend (Teammate E)
- [ ] E-7-1: Install `recharts` in client (`npm install recharts`)
- [ ] E-7-2: Create `client/src/components/StatsPage.jsx` (container, fetches todos, calculates stats)
- [ ] E-7-3: Create `client/src/components/StatusPieChart.jsx` (PieChart by status using recharts)
- [ ] E-7-4: Create `client/src/components/ActivityChart.jsx` (BarChart of todos created over time)
- [ ] E-7-5: Add navigation toggle to `App.jsx` ("Tasks" / "Statistics" views)
- [ ] E-7-6: Test: switching to Statistics view renders charts
- [ ] E-7-7: Test: pie chart shows correct slice per status
- [ ] E-7-8: Test: bar chart groups todos by creation date
- [ ] E-7-9: Test: empty state (no todos) renders gracefully without crash

---

---

### Task 8 — Drag & Drop (Kanban Board)

#### Backend (Teammate F — verification only)
- [ ] F-8-V1: Confirm `PUT /api/todos/:id` with `{ status }` returns `200` + updated todo
- [ ] F-8-V2: Confirm invalid status returns `400` with correct error message
- [ ] F-8-V3: Confirm unknown id returns `404`
- [ ] F-8-V4: Confirm response includes `id`, `title`, `status`, `createdAt`, `updatedAt`

#### Frontend (Teammate F)
- [ ] F-8-1: Install `@dnd-kit/core` and `@dnd-kit/sortable` in client
- [ ] F-8-2: Create `client/src/components/DragOverlayCard.jsx` (ghost card, presentational only)
- [ ] F-8-3: Add `useDraggable` to `TodoCard.jsx` (ref, attributes, listeners, transform style, `isDragging` opacity)
- [ ] F-8-4: Add `useDroppable` to `KanbanColumn.jsx` (ref, `isOver` highlight style)
- [ ] F-8-5: Add `DndContext` wrapper to `KanbanBoard.jsx`
- [ ] F-8-6: Add `activeId` state to `KanbanBoard.jsx`, set on `onDragStart`
- [ ] F-8-7: Add `DragOverlay` inside `DndContext`, renders `DragOverlayCard` when `activeId` is set
- [ ] F-8-8: Implement `onDragEnd` — no-op if same column, else optimistic update + API call
- [ ] F-8-9: Add revert logic in `onDragEnd` catch block (restore original status)
- [ ] F-8-10: Add error state + banner in `KanbanBoard.jsx`, cleared on next `onDragStart`
- [ ] F-8-11: Test: drag to new column → card moves, status persists on page refresh
- [ ] F-8-12: Test: drop on same column → no API call, no state change
- [ ] F-8-13: Test: drop outside any column → card returns to origin, no API call
- [ ] F-8-14: Test: simulate network failure → card reverts, error banner shown

---

## Priority order flag

> **Start Task 6 backend (Teammate A) before anything else.** It is the only task that changes the stored data shape, and all other backend tasks need a clean base to merge onto.

> **Task 8 cannot start until Task 4 (Kanban layout) is merged.** Teammate F should use the waiting time to read the existing Kanban component code and confirm component names match the spec.
