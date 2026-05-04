# Task 5 — Search and Filtering: Frontend

> **Owner:** Teammate D  
> **Can start immediately.** No backend dependency for phase 1 (frontend-only filtering).  
> **Before merging:** Pull latest main (Task 6 backend + Task 6 frontend from Teammate A/D).

---

## Strategy

All filtering happens on the array already returned by `GET /api/todos`.  
No new API calls are made when the user types or changes the filter.

---

## New files to create (zero conflict risk)

### `client/src/components/SearchBar.jsx`

- Controlled text input
- Props: `value`, `onChange`
- Placeholder: `"Search tasks..."`
- No internal state — parent (App.jsx) owns the value

### `client/src/components/StatusFilter.jsx`

- A row of buttons: `All`, `To Do`, `In Progress`, `Review`, `Done`
- Props: `activeStatus`, `onChange`
- Active button has a highlighted style
- `All` maps to `null` (no filter)
- The status values passed to `onChange`: `null | 'todo' | 'in-progress' | 'review' | 'done'`

---

## Files to modify

### `client/src/components/App.jsx`

**What to add:**
- State: `const [searchTerm, setSearchTerm] = useState('')`
- State: `const [filterStatus, setFilterStatus] = useState(null)`
- Render `<SearchBar value={searchTerm} onChange={setSearchTerm} />` in the header area
- Render `<StatusFilter activeStatus={filterStatus} onChange={setFilterStatus} />` below the search bar
- Pass `searchTerm` and `filterStatus` as props to `<TodoList />`

**What NOT to change:**
- Do not move `loadTodos`, `handleAdd`, `handleDelete`, `handleStatusChange` — leave them in place
- Do not change the API call in `loadTodos` for phase 1

**Conflict note:** Task 7 frontend (Teammate E) also modifies `App.jsx` to add navigation. If E has already merged, pull before editing and resolve only the state/render section.

---

### `client/src/components/TodoList.jsx`

**What to add:**
- Accept new props: `searchTerm`, `filterStatus`
- Before rendering sections, filter the `todos` array:
  ```
  let visible = todos;
  if (searchTerm) visible = visible.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));
  if (filterStatus) visible = visible.filter(t => t.status === filterStatus);
  ```
- Use `visible` instead of `todos` when building section arrays

**What NOT to change:**
- Section definitions (`{ title: 'To Do', status: 'todo' }` etc.) stay the same
- `TodoItem` rendering stays the same

---

### `client/src/services/api.js`

**What to add (phase 2 hook — optional):**
- Update `getAll()` signature to accept an optional `params` object:
  ```
  getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/todos${query ? '?' + query : ''}`);
  }
  ```
- If phase 2 backend is not yet merged, this change is safe — passing no params produces the same URL as before.

**What NOT to change:**
- `create()`, `update()`, `delete()` — leave untouched for this task (Task 6 modifies `create()`)
- Do not change the `fetchApi` helper

---

## How to test

| Test | Expected |
|------|----------|
| Type "git" in search | Only todos with "git" in title visible |
| Type "xyz" (no match) | No todos shown, no crash |
| Clear search | All todos restored |
| Select "Done" filter | Only done todos shown |
| Select "All" filter | All todos shown |
| Search "git" + filter "done" | Only done todos with "git" in title |
| Search while no todos exist | Renders gracefully (empty list, no crash) |

---

## Dependency note

Phase 1 (frontend filtering) has no backend dependency — it can be developed, tested, and merged independently of Teammate B's backend work.
