# Task 6 — Due Date: Conflict Warnings

## This task must merge first on the backend

Task 6 backend (Teammate A) is the **anchor** for all other backend work. It changes the stored data shape and modifies `todoService.js` and `routes/todos.js`. Everyone else must pull after A merges.

---

## High-risk files

### `server/src/services/todoService.js` ⚠️ HIGH
**Also modified by:** Task 5 backend (B), Task 7 backend (C)

Task 6 modifies the body of `create()`. Tasks 5 and 7 add new methods (`getFiltered`, `getStats`).  
**Conflict scenario:** If B or C start before A merges and both touch `create()`, there will be a conflict.  
**Resolution:** A merges first. B and C pull, then add their new methods at the end of the `todoService` object — no overlap with A's `create()` changes.

---

### `server/src/routes/todos.js` ⚠️ HIGH
**Also modified by:** Task 5 backend (B), Task 7 backend (C)

Task 6 adds validation in the POST and PUT handlers.  
Task 5 modifies the GET handler.  
Task 7 adds a new route registration.

**These are in different sections of the file** — conflict is avoidable by merging in order:
1. A merges (POST/PUT changes)
2. B pulls, modifies GET handler only
3. C pulls after B, adds new `/stats` route before `/:id`

If B and C accidentally conflict: manually merge — the changes do not logically overlap.

---

### `client/src/services/api.js` ⚠️ MEDIUM
**Also modified by:** Task 5 frontend (D)

Both changes are by **Teammate D** — handle in a single branch, no external conflict.

### `client/src/components/App.jsx` ⚠️ MEDIUM
**Also modified by:** Task 5 frontend (D), Task 7 frontend (E)

Task 6 changes `handleAdd` signature. Task 5 adds state declarations. Task 7 adds navigation state.  
All three are by D (Tasks 5+6) and E (Task 7). D merges first; E pulls D's changes and resolves `App.jsx` manually — the changes are in different logical sections.

---

### `client/src/components/AddTodo.jsx` LOW
**Only modified by Task 6.** No conflict risk.

### `client/src/components/TodoItem.jsx` LOW
**Only modified by Task 6.** No conflict risk.

---

## `onAdd` prop signature change ⚠️

`AddTodo.jsx` currently calls `onAdd(title)` (a plain string).  
After Task 6, it calls `onAdd({ title, dueDate })` (an object).

`App.jsx`'s `handleAdd` must be updated in the same PR to match.  
If Kanban board (Task 4) also uses `onAdd`, check that component too before merging.

> **Check:** grep for `onAdd` in `client/src/` before merging to catch all call sites.
