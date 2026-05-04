# Task 5 — Search and Filtering: Frontend Tasks

> **Owner:** Teammate D  
> All tasks are frontend-only. No backend changes required.

---

## New components

- [x] D-5-1: Create `client/src/components/SearchBar.jsx` — controlled text input, props: `value`, `onChange`, placeholder `"Search tasks..."`
- [x] D-5-2: Create `client/src/components/StatusFilter.jsx` — `<select>` dropdown with options All / To Do / In Progress / Review / Done; props: `value`, `onChange`; `All` maps to `null`
- [x] D-5-3: Create `client/src/components/PriorityFilter.jsx` — `<select>` dropdown with options All / High / Medium / Low; props: `value`, `onChange`; `All` maps to `null`; no-op when `todo.priority` is undefined
- [x] D-5-4: Create `client/src/components/FilterBar.jsx` — composes `SearchBar`, `StatusFilter`, and `PriorityFilter` in one row; props: `searchTerm`, `onSearchChange`, `filterStatus`, `onStatusChange`, `filterPriority`, `onPriorityChange`

## Modify existing components

- [ ] D-5-5: Add `searchTerm`, `filterStatus`, `filterPriority` state to `App.jsx`
- [ ] D-5-6: Compute `visibleTodos` in `App.jsx` (search + status + priority, AND logic) and pass it to `<KanbanBoard />` as the `todos` prop instead of the raw `todos`
- [ ] D-5-7: Render `<FilterBar />` in `App.jsx` above the board; derive `hasActiveFilters = !!searchTerm || !!filterStatus || !!filterPriority` and pass it to `<KanbanBoard />` and `<TodoList />`
- [ ] D-5-8: Add no-results state to `KanbanBoard.jsx` — accept `hasActiveFilters` boolean prop from `App.jsx`; when `todos.length === 0 && hasActiveFilters` render `"No tasks match your filters."`; when `todos.length === 0 && !hasActiveFilters` render `"No tasks yet. Add one above!"`; place check before the `DndContext`
- [ ] D-5-9: Add no-results state to `TodoList.jsx` — accept `hasActiveFilters` boolean prop from `App.jsx`; show `"No tasks match your filters."` when `todos.length === 0 && hasActiveFilters`, keep existing `"No todos yet. Add one above!"` when no filters are active

## Test checklist

- [ ] T-5-1: Type in search bar → only todos with matching title are visible in the board
- [ ] T-5-2: Type a non-matching term → board shows `"No tasks match your filters."`
- [ ] T-5-3: Clear search → all todos restored
- [ ] T-5-4: Select a status from the dropdown → only matching status cards shown
- [ ] T-5-5: Select `All` from status dropdown → all todos shown
- [ ] T-5-6: Combine search + status filter → AND logic applied correctly
- [ ] T-5-7: Select any priority (High / Medium / Low) → no crash; all todos still shown (mock phase)
- [ ] T-5-8: No todos exist and no filters active → `"No todos yet. Add one above!"` shown
