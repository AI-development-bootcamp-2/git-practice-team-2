# Task 5 — Conflict Warnings

## High-risk files

### `server/src/routes/todos.js` ⚠️ HIGH
**Also modified by:** Task 6 (dueDate validation), Task 7 (stats route)

| Who modifies it | What they change |
|----------------|-----------------|
| Task 6 backend (A) | Adds dueDate validation to POST and PUT |
| Task 5 backend (B) | Adds query params to GET / handler |
| Task 7 backend (C) | Adds new GET /stats route |

**Safe order:**
1. A merges (Task 6 backend)
2. B pulls main, then modifies only the `GET /` handler
3. C pulls main after B, then adds the `/stats` route at the top of the route registrations

These changes are in different sections of the file, so conflict is resolvable even if order is wrong — but following the order avoids it entirely.

---

### `server/src/services/todoService.js` ⚠️ HIGH
**Also modified by:** Task 6 (dueDate in create/update), Task 7 (getStats method)

| Who modifies it | What they change |
|----------------|-----------------|
| Task 6 backend (A) | `create()` and `update()` accept `dueDate` |
| Task 5 backend (B) | Adds new `getFiltered()` method |
| Task 7 backend (C) | Adds new `getStats()` method |

**Safe order:** Same as routes — A first, then B and C in parallel after pulling.  
B and C add new methods (not modifying existing ones) so they can merge in either order after A.

---

### `client/src/components/App.jsx` ⚠️ MEDIUM
**Also modified by:** Task 7 frontend (Teammate E) for navigation toggle

| Who modifies it | What they change |
|----------------|-----------------|
| Task 5 frontend (D) | Adds `searchTerm`, `filterStatus` state; renders SearchBar and StatusFilter |
| Task 7 frontend (E) | Adds `currentView` state; renders StatsPage vs TodoList toggle |

**Safe order:** D merges first. E pulls D's changes, then adds the navigation state below D's state declarations and wraps the render section in a view conditional.  
These changes are in different sections of the JSX (state declarations and render area) — conflict is minimal if E pulls before editing.

---

### `client/src/services/api.js` ⚠️ MEDIUM
**Also modified by:** Task 6 frontend (Teammate D) for dueDate in `create()`

Both changes are by the **same person (D)**, so no merge conflict. Handle both in the same branch.

---

## Files with NO conflict risk (new files)

| File | Owner |
|------|-------|
| `client/src/components/SearchBar.jsx` | D — new file |
| `client/src/components/StatusFilter.jsx` | D — new file |

---

## Priority filter — blocked dependency

> **Do not implement priority filtering.** The `priority` field does not exist in `todoService.js`, `todos.json`, `TodoItem.jsx`, or `api.js`. There is nothing to filter on. This sub-feature must wait until a separate "Add priority field" task is completed and merged.
