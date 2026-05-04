# Task 8 — Drag & Drop (Kanban Board): Spec

## Overview

Add drag-and-drop behavior to the Kanban board so users can move cards between columns by dragging.  
Status is persisted via the existing `PUT /api/todos/:id` endpoint.

> **Blocked by Task 4.** The Kanban layout (columns, cards, view toggle) must be fully implemented and merged before Task 8 can begin. Task 8 layers drag-and-drop behavior on top of the existing Kanban structure.

> **Reference:** This is the drag-and-drop requirement specified in `openspec/changes/add-task-management-features/specs/kanban-board/spec.md` (section: "Drag-and-Drop Between Columns", attributed to Ori).

---

## Library

**`@dnd-kit/core`** and **`@dnd-kit/sortable`** — already decided in the kanban-board spec.

```
npm install @dnd-kit/core @dnd-kit/sortable
```

Do not use `react-beautiful-dnd` or any other library — the decision is already made.

---

## Full drag-and-drop flow

```
1. User presses down on a card
       │
       ▼
2. Card becomes a draggable item (useDraggable activates)
   A ghost/overlay card appears following the cursor (DragOverlay)
   The original card slot dims or stays in place
       │
       ▼
3. User drags over a column
   Target column highlights (useDroppable `isOver` state)
       │
       ▼
4. User releases
       │
   ┌───┴──────────────────────────────┐
   │ Dropped on SAME column?          │ → No-op. No API call. No state change.
   └───┬──────────────────────────────┘
       │ Dropped on DIFFERENT column
       ▼
5. Optimistic update:
   Immediately move card to new column in local React state
   (user sees instant feedback — no loading spinner)
       │
       ▼
6. API call: PUT /api/todos/:id  { status: targetColumnStatus }
       │
   ┌───┴──────────────────────────────┐
   │ Success (200)                    │ → State already correct. Done.
   └───┬──────────────────────────────┘
       │ Failure (4xx / network error)
       ▼
7. Revert: move card back to its original column in local state
   Show error message to user (e.g. "Failed to move task. Try again.")
```

---

## Error handling rules

| Scenario | Behavior |
|----------|----------|
| API returns `400` (invalid status) | Revert card + show error — should never happen in practice since column IDs map to valid statuses |
| API returns `404` (todo deleted by another user) | Revert card + show error "Task no longer exists" |
| Network timeout / no response | Revert card + show generic error |
| Drop on same column | No API call, no state change, no error |
| Drop outside any column | Treat as cancel — card returns to original position |

---

## Visual requirements

| State | Visual |
|-------|--------|
| Dragging | Ghost card follows cursor (DragOverlay). Original card slot: dimmed or outlined placeholder |
| Column hovered during drag | Column border or background highlights |
| Drop cancel | Card animates back to original position (dnd-kit default behavior) |
| Error | Error banner or inline message below the board header |

---

## What does NOT change

- The existing forward/backward status buttons on cards (Task 4) stay as-is
- `GET /api/todos` call pattern does not change
- List view is unaffected
- No new routes, no new backend files
- `api.js` `update()` is already compatible — no changes needed
