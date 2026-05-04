## Why

The Task 5 search/filter spec needs to be updated before implementation begins: the original spec described a button-row status filter, but we need a dropdown-based filter UI, a priority filter (using mock data since the `priority` field doesn't exist yet), and an explicit no-results message when filters return an empty set. Critically, filters must also work in the Kanban board view — not just the list view — since `App.jsx` currently renders only `KanbanBoard` in the tasks view.

## What Changes

- **Status filter component**: change from a row of buttons to a `<select>` dropdown (`All`, `To Do`, `In Progress`, `Review`, `Done`)
- **Priority filter component**: new `<select>` dropdown with values `All`, `High`, `Medium`, `Low` — backed by mock `priority` data since the field is not yet in the backend or todo object shape
- **No-results state**: when active filters produce zero visible todos, render a descriptive text message (e.g. "No tasks match your filters.") instead of an empty screen
- **Filter scope**: both `TodoList` (list view) and `KanbanBoard` (board view) must respect `searchTerm`, `filterStatus`, and `filterPriority` — filtered todos are passed down as props so the filter logic lives in one place (`App.jsx`)
- **SearchBar**: unchanged from original spec — controlled text input, placeholder "Search tasks..."

## Capabilities

### New Capabilities

- `search-filter-bar`: Combined filter bar housing SearchBar, StatusFilter dropdown, and PriorityFilter dropdown — rendered above both list and board views
- `priority-filter`: PriorityFilter dropdown component using mock priority values (`high`, `medium`, `low`); no backend dependency
- `no-results-state`: Empty-state message shown in both list and board views when filtered result set is empty

### Modified Capabilities

- None — this change only introduces new components and updates the Task 5 spec document; existing backend routes and todo data shape are not changed

## Impact

- **Spec file updated**: `openspec/changes/tasks-5-7-planning/specs/task-5-search-filter/frontend.md`
- **New components**: `SearchBar.jsx`, `StatusFilter.jsx` (now dropdown), `PriorityFilter.jsx` (new, mock data)
- **Modified components**: `App.jsx` (add filter state + filter bar), `KanbanBoard.jsx` (accept and apply filtered todos), `TodoList.jsx` (accept and apply filtered todos, add no-results state)
- **No backend changes** — priority is frontend-only mock until the `priority` field is added to the data model
