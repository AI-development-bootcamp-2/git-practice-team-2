# Task 5 — Search and Filtering: Spec

## Overview

Allow users to search todos by title and filter by status.  
Implemented in two phases: frontend-only (phase 1, default), optional backend query params (phase 2).

---

## Decision: frontend-only filtering (phase 1)

The client already fetches all todos on load. Filtering in memory is fast, simple, and requires no API changes.  
Backend query params are added as a non-breaking enhancement for phase 2 — callers without params see identical behavior.

**Priority filter:** Included as a mock-only dropdown (`high | medium | low`). The `priority` field does not yet exist on todo objects — when `todo.priority` is `undefined`, the todo passes the filter for any selected value. No simulation or fake data is injected. The filter becomes live automatically when the backend adds `priority`.

---

## Feature: Search by title

- User types in a search box
- Todos whose `title` does not contain the search string (case-insensitive) are hidden
- Empty search = show all todos
- Search is applied client-side on the already-fetched list

## Feature: Filter by status

- User selects a status from a **dropdown**: `All | To Do | In Progress | Review | Done`
- Only todos matching the selected status are shown
- "All" = no filter applied (`null`)
- Filter is applied client-side

## Feature: Filter by priority

- User selects a priority from a **dropdown**: `All | High | Medium | Low`
- Values: `null | 'high' | 'medium' | 'low'`
- "All" = no filter applied
- Filter is applied client-side
- **Mock phase:** while `todo.priority` is undefined on all todos, every todo passes this filter — no effect, no crash

## Feature: Combined search + filter

- All three filters apply simultaneously (AND logic)
- A todo must match the search term, the selected status, AND the selected priority to be shown

## Feature: No-results state

- When the filtered result set is empty (at least one filter is active), display the message: **"No tasks match your filters."**
- Distinct from the "No todos yet" state (shown when no todos exist at all and no filters are active)

---

## API behavior

### Phase 1 — no API changes
`GET /api/todos` is called without params, as today. Filtering is done on the returned array in the client.

### Phase 2 — optional backend query params (non-breaking)

`GET /api/todos?search=git&status=in-progress`

| Param | Type | Required | Behavior |
|-------|------|----------|----------|
| `search` | string | No | Case-insensitive substring match on `title` |
| `status` | string | No | Must be a valid status or ignored; returns 400 on invalid |

**Non-breaking guarantee:** `GET /api/todos` with no params continues to return all todos unchanged.

---

## Out of scope

- Priority filter backend implementation (`priority` field on the data model — separate task)
- Sorting
- Pagination
- Saved/persistent filters
