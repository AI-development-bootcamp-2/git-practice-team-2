# Tasks: Add Task Management Features

## Guy — Data Foundation
> Branch from `main`. Must merge first — everyone else depends on this.

- [x] Extend status enum in `server/src/services/todoService.js` to `todo | in-progress | review | done`
- [x] Update status validation in `server/src/routes/todos.js` (create + update endpoints)
  - *Ensure create endpoint allows receiving an initial status*
- [x] Replace toggle button with a status dropdown in `client/src/components/TodoItem.jsx`
- [x] Update `client/src/components/TodoList.jsx` to render 4 distinct status sections
- [x] Verify existing todos with `todo` / `done` status still load and display correctly

**Spec:** `specs/todo-data-model/spec.md`

---

## Eden — Kanban Board Layout
> Branch from Guy's branch (or `main` after Guy merges).

- [x] Create `client/src/components/KanbanBoard.jsx` — renders four columns side-by-side
- [x] Create `client/src/components/KanbanColumn.jsx` — column header with name + count, renders cards
- [x] Group todos by status into the correct columns
- [x] Add forward / backward status buttons on each card (calls PUT /api/todos/:id)
- [x] Add view toggle (List / Board) in `client/src/components/App.jsx`

**Spec:** `specs/kanban-board/spec.md` (Eden's section)

## Guy & Ori — Due Date Feature
- [ ] Create `specs/due-date/spec.md` describing due date format, UI placement, and overdue highlighting.
- [ ] Extend `server/src/services/todoService.js` to include `dueDate` validation (DD-MM-YYYY) and allow null.
- [ ] Update `server/src/routes/todos.js` to accept `dueDate` on create/update.
- [ ] Add `react-datepicker` to client dependencies.
- [ ] Update `client/src/components/TodoItem.jsx` to show a date picker when creating a new task.
- [ ] Update `client/src/components/KanbanBoard.jsx` cards to allow editing the due date via the date picker.
- [ ] Display an **red bold "Overdue"** label on cards when the current date is after the due date (day after).
- [ ] Ensure clearing the date removes the field via API.


---

## Ori — Kanban Drag and Drop
> Branch from Eden's branch (needs column structure in place).

- [x] Install `@dnd-kit/core` and `@dnd-kit/sortable` as client dependencies
- [x] Wrap `KanbanBoard` with `DndContext`
- [x] Make `KanbanColumn` a drop target (`useDroppable`)
- [x] Make each card a drag source (`useDraggable`)
- [x] On drop to a different column: call PUT /api/todos/:id with new status
- [x] Show drag overlay/ghost while dragging

**Spec:** `specs/kanban-board/spec.md` (Ori's section)

---

## Adi — Statistics Backend
> Branch from `main`. Can run in parallel with Eden and Ori.

- [x] Add `getStats()` function to `server/src/services/todoService.js`
  - Returns `total`, `byStatus` (count per status), `completionPct`
- [x] Add `GET /api/todos/stats` route to `server/src/routes/todos.js`
- [x] Handle empty state (zero todos → all counts 0, completionPct 0)

**Spec:** `specs/stats-backend/spec.md`

---

## Gabi — Statistics Frontend
> Branch from `main`. Can stub with mock data, swap in real endpoint after Adi merges.

- [x] Add `getStats()` to `client/src/services/api.js`
- [x] Create `client/src/components/StatisticsPage.jsx`
  - Navigation link in App (Tasks / Statistics)
  - Metric cards: Total, per-status counts, completion %
  - Loading state while fetching
- [x] Add pie chart (recharts `PieChart`) showing distribution by status
- [x] Install `recharts` as a client dependency

**Spec:** `specs/statistics-page/spec.md`

---

## Dependency Order

```
Guy (foundation) ──► Eden (board layout) ──► Ori (drag-drop)
             └──────► Adi (stats BE) ────────► Gabi (stats FE)
```

Eden and Adi can start in parallel once Guy merges.
Ori starts after Eden. Gabi starts (with stubs) in parallel with Adi.
