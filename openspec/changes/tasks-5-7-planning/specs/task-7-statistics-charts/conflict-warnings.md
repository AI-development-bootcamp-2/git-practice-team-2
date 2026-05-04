# Task 7 — Statistics Charts: Conflict Warnings

## Frontend

### `client/src/components/App.jsx` ⚠️ MEDIUM
**Also modified by:** Task 5+6 frontend (Teammate D)

| Change | Who |
|--------|-----|
| Adds `searchTerm`, `filterStatus` state | D |
| Updates `handleAdd` signature | D |
| Renders `SearchBar`, `StatusFilter` | D |
| Adds `currentView` state | E |
| Renders navigation bar | E |
| Wraps render in view conditional | E |

**Safe merge order:**  
D merges first. E pulls, then:
- Adds `currentView` state on a new line after D's state declarations
- Adds navigation buttons above D's `SearchBar`/`StatusFilter`
- Wraps the existing todo list section (including D's components) in `{currentView === 'tasks' && ...}`
- Adds `{currentView === 'statistics' && <StatsPage />}` below

The changes are logically additive — a manual merge of `App.jsx` takes ~5 minutes.

---

## Backend

### `server/src/routes/todos.js` ⚠️ HIGH (phase 2 only)
**Also modified by:** Task 6 backend (A), Task 5 backend (B)

Task 7 adds a new route (`GET /stats`) at the top. Tasks 5 and 6 modify the existing `GET /` and POST/PUT handlers.  
**These do not overlap** — but all three touch the same file.

Safe merge order:
1. A merges (POST/PUT changes)
2. B merges (GET / query params) — pulls A first
3. C merges (new GET /stats route) — pulls A and B first, adds `/stats` registration at the top of the handler block

> **⚠️ Registration order is critical.** The `/stats` route MUST appear before the `/:id` route in the file. When C resolves the merge, confirm `/stats` is above `/:id`.

---

### `server/src/services/todoService.js` ⚠️ HIGH (phase 2 only)
**Also modified by:** Task 6 backend (A), Task 5 backend (B)

Task 7 adds `getStats()` as a new method. Tasks 5 and 6 modify `create()` and add `getFiltered()`.  
**All are different methods** — append `getStats()` at the end of the `todoService` object after pulling A and B.

---

## New files — zero conflict risk

| File | Risk |
|------|------|
| `client/src/components/StatsPage.jsx` | None — new file |
| `client/src/components/StatusPieChart.jsx` | None — new file |
| `client/src/components/ActivityChart.jsx` | None — new file |

---

## Dependency summary

| Dependency | Required to start? | Required to merge? |
|------------|-------------------|-------------------|
| Task 6 backend (A) merged | No | Yes (phase 2 backend only) |
| Task 5+6 frontend (D) merged | No | Yes — pull before editing App.jsx |
| recharts installed | Yes — run npm install | Yes — commit package.json |
| `dueDate` on todos | No — overdue card degrades gracefully | No |
