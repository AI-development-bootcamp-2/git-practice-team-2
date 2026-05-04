# Task 5 — Search and Filtering: Frontend

> **Owner:** Teammate D  
> **Can start immediately.** No backend dependency for phase 1 (frontend-only filtering).  
> **Before merging:** Pull latest main (Task 6 backend + Task 6 frontend from Teammate A/D).

---

## Strategy

All filtering happens on the array already returned by `GET /api/todos`.  
No new API calls are made when the user types or changes a filter.  
`App.jsx` owns all filter state and computes a single `visibleTodos` array that is passed to `KanbanBoard`.

---

## New files to create (zero conflict risk)

### `client/src/components/SearchBar.jsx`

- Controlled text input
- Props: `value`, `onChange`
- Placeholder: `"Search tasks..."`
- No internal state — parent (`App.jsx`) owns the value

### `client/src/components/StatusFilter.jsx`

- A `<select>` dropdown with options: `All`, `To Do`, `In Progress`, `Review`, `Done`
- Props: `value`, `onChange`
- `All` maps to `null` (no filter)
- The status values passed to `onChange`: `null | 'todo' | 'in-progress' | 'review' | 'done'`

### `client/src/components/PriorityFilter.jsx`

- A `<select>` dropdown with options: `All`, `High`, `Medium`, `Low`
- Props: `value`, `onChange`
- `All` maps to `null` (no filter)
- The priority values passed to `onChange`: `null | 'high' | 'medium' | 'low'`
- **Mock only:** the `priority` field does not exist on todo objects. When `todo.priority` is `undefined`, the todo passes the priority filter for any selected value. The filter becomes live automatically when the backend adds the `priority` field.

### `client/src/components/FilterBar.jsx`

- Composes `SearchBar`, `StatusFilter`, and `PriorityFilter` in a single row
- Props: `searchTerm`, `onSearchChange`, `filterStatus`, `onStatusChange`, `filterPriority`, `onPriorityChange`
- Rendered above both the list and board views (inside the tasks view in `App.jsx`)

---

## Files to modify

### `client/src/components/App.jsx`

**What to add:**
- State: `const [searchTerm, setSearchTerm] = useState('')`
- State: `const [filterStatus, setFilterStatus] = useState(null)`
- State: `const [filterPriority, setFilterPriority] = useState(null)`
- Computed filtered array (derived, not state):
  ```js
  let visibleTodos = todos;
  if (searchTerm) visibleTodos = visibleTodos.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));
  if (filterStatus) visibleTodos = visibleTodos.filter(t => t.status === filterStatus);
  if (filterPriority) visibleTodos = visibleTodos.filter(t => t.priority === filterPriority);
  ```
- Render `<FilterBar ... />` above the board in the tasks view
- Pass `visibleTodos` (not `todos`) to `<KanbanBoard />` as the `todos` prop

**What NOT to change:**
- Do not move `loadTodos`, `handleAdd`, `handleDelete`, `handleStatusChange` — leave them in place
- Do not change the API call in `loadTodos`

**Conflict note:** Task 7 frontend (Teammate E) also modifies `App.jsx` to add navigation. If E has already merged, pull before editing and resolve only the state/render section.

---

### `client/src/components/KanbanBoard.jsx`

**What to add:**
- When all columns are empty (i.e. `todos.length === 0` from the filtered prop), render a no-results message:
  ```jsx
  if (todos.length === 0) {
    return <div className="empty-state"><p>No tasks match your filters.</p></div>;
  }
  ```
- Place this check **before** the `DndContext` render

**What NOT to change:**
- Drag-and-drop logic (`handleDragStart`, `handleDragEnd`) stays untouched
- Column structure and `STATUS_ORDER` stay the same

---

### `client/src/components/TodoList.jsx`

**What to add:**
- The component already filters by the `todos` prop it receives. No filtering logic needed here — `App.jsx` passes `visibleTodos`.
- Update the empty-state check to distinguish "no todos at all" from "no results":
  - If `todos.length === 0` and no filters are active → show `"No todos yet. Add one above!"`
  - If `todos.length === 0` and at least one filter is active → show `"No tasks match your filters."`
  - Pass a boolean prop `hasActiveFilters` from `App.jsx` to support this distinction

**What NOT to change:**
- Section definitions (`{ title: 'To Do', status: 'todo' }` etc.) stay the same
- `TodoItem` rendering stays the same

---

## How to test

| Test | Expected |
|------|----------|
| Type "git" in search | Only todos with "git" in title visible in both list and board |
| Type "xyz" (no match) | No todos shown; "No tasks match your filters." message appears |
| Clear search | All todos restored |
| Select "Done" from status dropdown | Only done todos shown in both views |
| Select "All" from status dropdown | All todos shown |
| Search "git" + status "done" | Only done todos with "git" in title |
| Select "High" from priority dropdown | All todos shown (mock — no priority field yet); no crash |
| Search while no todos exist | Renders gracefully (empty board, no crash) |

---

## Dependency note

No backend dependency — this task can be developed, tested, and merged independently.  
Priority filter becomes live automatically once the `priority` field is added to the data model — no frontend code change needed at that point.
