# Task 5 — Search and Filtering: Spec

## Overview

Allow users to search todos by title and filter by status.  
Implemented in two phases: frontend-only (phase 1, default), optional backend query params (phase 2).

---

## Decision: frontend-only filtering (phase 1)

The client already fetches all todos on load. Filtering in memory is fast, simple, and requires no API changes.  
Backend query params are added as a non-breaking enhancement for phase 2 — callers without params see identical behavior.

**Priority filter:** NOT READY. The `priority` field does not exist in the codebase. This sub-feature is blocked until priority is implemented (separate task, not in scope here). Do not stub or simulate it.

---

## Feature: Search by title

- User types in a search box
- Todos whose `title` does not contain the search string (case-insensitive) are hidden
- Empty search = show all todos
- Search is applied client-side on the already-fetched list

## Feature: Filter by status

- User selects a status from: All | todo | in-progress | review | done
- Only todos matching the selected status are shown
- "All" = no filter applied
- Filter is applied client-side

## Feature: Combined search + filter

- Both filters apply simultaneously (AND logic)
- A todo must match both the search term and the selected status to be shown

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

- Priority filter (field not implemented)
- Sorting
- Pagination
- Saved/persistent filters
