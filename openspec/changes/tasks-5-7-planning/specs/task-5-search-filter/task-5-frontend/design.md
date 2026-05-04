## Context

`App.jsx` currently renders `KanbanBoard` in the tasks view with no filtering. `TodoList.jsx` exists but is unused. The original Task 5 spec addressed only the list view and proposed button-row status filtering; the Kanban board was out of scope. This design covers the updated requirements: dropdown filters, priority filter with mock data, no-results state in both views.

Current todo object shape has no `priority` field. Priority filtering must work entirely client-side with mock/injected data until the backend adds the field.

## Goals / Non-Goals

**Goals:**
- Single filter bar (search + status dropdown + priority dropdown) that applies to both list and board views
- No-results empty state in both views when filtered set is empty
- Priority filter using mock `priority` values — no backend changes required
- Updated `frontend.md` spec for Task 5 reflecting all of the above

**Non-Goals:**
- Backend query-param filtering (phase 2, unchanged from original spec)
- Adding a real `priority` field to the data model or API (separate task)
- Changing the list/board view toggle (already handled by `Header.jsx` + `App.jsx`)
- Any changes to drag-and-drop behavior in `KanbanBoard`

## Decisions

### 1. Filter state lives in `App.jsx`, filtered array passed as prop

**Decision:** `App.jsx` owns `searchTerm`, `filterStatus`, `filterPriority` state and computes the filtered `visibleTodos` array before passing it to `KanbanBoard` or `TodoList`.

**Rationale:** Both views need the same filtered data. Centralising the logic avoids duplicating the filter pipeline in two components. It also means neither `KanbanBoard` nor `TodoList` need to know about the filter mechanics — they just render what they're given.

**Alternative considered:** Each view filters its own copy of `todos` independently. Rejected — duplicates logic, harder to keep in sync.

### 2. Status filter as `<select>` dropdown, not button row

**Decision:** `StatusFilter` renders a `<select>` with options: `All | To Do | In Progress | Review | Done`.

**Rationale:** The user explicitly requested a dropdown. It also scales better if more statuses are added later.

### 3. Priority filter uses mock data injected at the component level

**Decision:** `PriorityFilter` is a simple dropdown (`All | High | Medium | Low`). Since `priority` does not exist on todo objects, the filter is a no-op when the field is absent (every todo passes the priority check if `todo.priority` is `undefined`).

**Rationale:** This lets Task 5 be completed and merged without blocking on the data-model change. When `priority` is added to the backend, the filter becomes live automatically — no code change needed.

**Alternative considered:** Assign random mock priorities to todos on load. Rejected — mutating fetched data is confusing and hard to clean up.

### 4. No-results state is each view's responsibility

**Decision:** Both `TodoList` and `KanbanBoard` detect when the (already-filtered) `todos` prop is empty and render a text message: `"No tasks match your filters."`.

**Rationale:** Each view has its own empty-state rendering already (`TodoList` shows "No todos yet"). The no-results state is a distinct case ("todos exist but nothing matches") and should show a different message. Each component is best placed to know its own layout.

### 5. `FilterBar` wrapper component

**Decision:** Create a `FilterBar.jsx` that composes `SearchBar`, `StatusFilter`, and `PriorityFilter` into one rendered row, accepting all three value/onChange pairs as props.

**Rationale:** Keeps `App.jsx` clean — one component handles the full filter UI. The sub-components remain individually testable.

## Risks / Trade-offs

- **Priority filter is a silent no-op** until `priority` is added to todos. Users won't see any filtering effect if they select High/Medium/Low. → Mitigation: add a small note in the UI or placeholder text indicating priority is "coming soon", or accept the no-op silently and document it in the spec.
- **KanbanBoard receives pre-filtered todos** — columns will simply be empty when filters exclude all cards in a column. This is correct behaviour but may look sparse. → No mitigation needed; consistent with how list view behaves.
- **TodoList is currently unused** in `App.jsx`. This design does not add a list/board toggle — `App.jsx` renders only `KanbanBoard`. If a list view is added later, `TodoList` would receive the same `visibleTodos` prop.

## Open Questions

- Should the priority filter show a "(coming soon)" label or just silently filter with no visible effect for now?
- Should the filter bar be visible on the Statistics page, or only on the tasks view? (Assumption: tasks view only.)
