# Task 8 — Drag & Drop: Conflict Warnings

## Task 8 is entirely blocked by Task 4

`KanbanBoard.jsx`, `KanbanColumn.jsx`, and `TodoCard.jsx` are created by Task 4 (in progress).  
Task 8 modifies all three. Do not branch off main until Task 4 is merged — branching early guarantees a conflict.

**Protocol:** Wait for Task 4 PR to merge → `git pull main` → create the Task 8 branch.

---

## High-risk files

### `client/src/components/KanbanBoard.jsx` ⚠️ HIGH
**Created by:** Task 4  
**Modified by:** Task 8 (adds `DndContext`, `DragOverlay`, `onDragEnd`, `activeId` state, error state)

This is the most heavily modified file in Task 8. If Task 4 makes any last-minute changes to `KanbanBoard.jsx` after Task 8 branches, a manual merge is required. Coordinate with the Task 4 developer before starting: confirm that `KanbanBoard.jsx` is stable and the PR is ready to merge.

---

### `client/src/components/KanbanColumn.jsx` ⚠️ MEDIUM
**Created by:** Task 4  
**Modified by:** Task 8 (adds `useDroppable`, `isOver` highlight)

Task 8 modifies only the column's card list container — adding `setNodeRef` and an `isOver` style. If Task 4 changes the column's internal structure after Task 8 branches, `setNodeRef` may be applied to the wrong element. Sync with Task 4 before starting.

---

### `client/src/components/TodoCard.jsx` ⚠️ MEDIUM
**Created by:** Task 4  
**Modified by:** Task 8 (adds `useDraggable`, transform style, `isDragging` opacity)

The card's root element needs `setNodeRef`, `attributes`, and `listeners` applied. If Task 4 changes the root element (e.g., wraps it in another div), Task 8's hook attachment point changes. Confirm the final card structure with Task 4 before starting.

---

### `client/src/services/api.js` LOW
**Modified by:** Task 5+6 frontend (Teammate D)  
**Used by Task 8:** reads `api.todos.update()` — no modifications

Task 8 only calls `api.todos.update()`. It does not modify `api.js`. Pull D's changes before merging to get the updated `getAll()` signature, but there is no write conflict.

---

### `client/src/components/App.jsx` — NO CONFLICT
Task 8 does not modify `App.jsx`. The `onStatusChange` handler already in `App.jsx` (from Task 4) is reused as-is through props. No changes needed.

---

### `server/src/routes/todos.js` — NO CONFLICT
Task 8 makes no backend changes. Tasks 5 (B), 6 (A), and 7 (C) all modify this file — Task 8 does not touch it.

### `server/src/services/todoService.js` — NO CONFLICT
Same as above — Task 8 is backend-free.

---

## Files with zero conflict risk (new)

| File | Owner |
|------|-------|
| `client/src/components/DragOverlayCard.jsx` | F — new file |

---

## Conflict matrix — full picture including Task 8

| File | A (T6-BE) | B (T5-BE) | C (T7-BE) | D (T5+T6-FE) | E (T7-FE) | F (T8-FE) |
|------|-----------|-----------|-----------|--------------|-----------|-----------|
| `server/src/routes/todos.js` | ✏️ | ✏️ | ✏️ | — | — | — |
| `server/src/services/todoService.js` | ✏️ | ✏️ | ✏️ | — | — | — |
| `client/src/services/api.js` | — | ✏️ | — | ✏️ | — | 👁 read |
| `client/src/components/App.jsx` | — | — | — | ✏️ | ✏️ | — |
| `client/src/components/TodoItem.jsx` | — | — | — | ✏️ | — | — |
| `client/src/components/AddTodo.jsx` | — | — | — | ✏️ | — | — |
| `client/src/components/TodoList.jsx` | — | — | — | ✏️ | — | — |
| `client/src/components/KanbanBoard.jsx` | — | — | — | — | — | ✏️ |
| `client/src/components/KanbanColumn.jsx` | — | — | — | — | — | ✏️ |
| `client/src/components/TodoCard.jsx` | — | — | — | — | — | ✏️ |
| `SearchBar.jsx` (new) | — | — | — | ✏️ | — | — |
| `StatusFilter.jsx` (new) | — | — | — | ✏️ | — | — |
| `StatsPage.jsx` (new) | — | — | — | — | ✏️ | — |
| `StatusPieChart.jsx` (new) | — | — | — | — | ✏️ | — |
| `ActivityChart.jsx` (new) | — | — | — | — | ✏️ | — |
| `DragOverlayCard.jsx` (new) | — | — | — | — | — | ✏️ |

**Task 8 has zero overlap with Tasks 5, 6, and 7** on the frontend side — different components entirely. It can be merged in any order relative to D and E, as long as Task 4 is already merged.

---

## Recommended merge order (updated for Task 8)

```
Task 4 (Kanban layout) ──► must merge first
       │
       ├──► Task 6 backend (A) ──► must merge second (anchor for all backend)
       │           │
       │     ┌─────┴─────┐
       │     ▼           ▼
       │  Task 5 BE (B)  Task 7 BE (C)   (parallel, after A)
       │
       ├──► Task 5+6 FE (D) ──┐
       ├──► Task 7 FE (E)    ─┤  (parallel, after Task 4 + after A merges for D)
       └──► Task 8 FE (F)    ─┘  (parallel with D and E — touches different files)
```
