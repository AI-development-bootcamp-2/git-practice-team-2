# Proposal: Tasks 5–7 Planning

## Context

Tasks 1–3 (status enum, validation, Kanban backend) are complete.  
Task 4 (Kanban frontend) is in progress by another teammate.  
This document plans the next three features so **5 teammates can work in parallel with minimal merge conflicts**.

---

## Current codebase state (as of planning)

### Todo object shape
```json
{
  "id": "uuid",
  "title": "string",
  "status": "todo | in-progress | review | done",
  "createdAt": "ISO string",
  "updatedAt": "ISO string"
}
```
No `priority`, no `dueDate`, no tags — these are planned but not implemented.

### Server
- Fastify on port 3001
- `server/src/routes/todos.js` — all CRUD routes
- `server/src/services/todoService.js` — data layer + `VALID_STATUSES`
- `server/src/data/todos.json` — JSON file store

### Client
- Vite + React on port 5173
- No pages/ directory — everything lives in `client/src/components/`
- `App.jsx` owns all state and API calls
- `api.js` wraps all fetch calls

---

## What we are planning

| Task | Feature | Backend? | Frontend? |
|------|---------|----------|-----------|
| 5 | Search and Filtering | Optional (non-breaking query params) | Yes — primary approach |
| 6 | Due Date | Yes (new field) | Yes (date input + overdue indicator) |
| 7 | Statistics Charts | Optional (stats endpoint) | Yes — primary approach |

---

## Key decisions

### Task 5 — Filtering approach
Frontend-only filtering is the default. All todos are already fetched; the client can filter in memory.  
Backend query params (`?search=`, `?status=`) are added as a non-breaking opt-in — callers without params see no change.  
Priority filter is **blocked** — the `priority` field does not exist yet. Mark as not-ready.

### Task 6 — dueDate
Added as an optional field to the todo object. No existing data breaks (undefined = no due date).  
Overdue = `dueDate` is set + `dueDate < now` + `status !== 'done'`.

### Task 7 — Statistics
Frontend calculates from the existing `GET /api/todos` response. No new endpoint required for phase 1.  
A `GET /api/todos/stats` backend route is specced as optional (phase 2).  
Library: `recharts` (already referenced in existing statistics-page spec).

---

## Conflict risk summary

| File | Tasks that touch it | Risk |
|------|---------------------|------|
| `server/src/routes/todos.js` | 5, 6, 7 | **HIGH** |
| `server/src/services/todoService.js` | 5, 6, 7 | **HIGH** |
| `client/src/components/App.jsx` | 5, 7 | **MEDIUM** |
| `client/src/services/api.js` | 5, 6 | **MEDIUM** |
| `client/src/components/TodoItem.jsx` | 6 only | LOW |
| `client/src/components/AddTodo.jsx` | 6 only | LOW |
| `client/src/components/TodoList.jsx` | 5 only | LOW |

**New files only (zero conflict risk):**  
`SearchBar.jsx`, `StatusFilter.jsx`, `StatsPage.jsx`, `StatusPieChart.jsx`, `ActivityChart.jsx`

---

## Recommended merge order

```
Task 6 backend  ──► merge first (adds dueDate to service + routes)
       │
       ▼
Task 5 backend  ─┐
Task 7 backend  ─┘  merge in parallel after Task 6 backend is merged
       │
       ▼
Task 5 frontend ─┐
Task 6 frontend ─┤  merge in parallel (touch different components)
Task 7 frontend ─┘  mostly new files — lowest risk
```
