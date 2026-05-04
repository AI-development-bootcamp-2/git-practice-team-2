# Task 6 — Due Date: Spec

## Overview

Add an optional `dueDate` field to the todo object. Allow setting it on create and update. Show it in the UI with an overdue indicator.

---

## Updated todo object shape

```json
{
  "id": "uuid",
  "title": "string",
  "status": "todo | in-progress | review | done",
  "createdAt": "ISO string",
  "updatedAt": "ISO string",
  "dueDate": "ISO string | null | undefined"
}
```

`dueDate` is optional. Existing todos without it are valid — treat as "no due date set."

---

## Field rules

| Rule | Detail |
|------|--------|
| Format | ISO 8601 date string, e.g. `"2026-06-15"` or `"2026-06-15T00:00:00.000Z"` |
| Required | No — omitting it is valid |
| Null | Sending `dueDate: null` clears the due date |
| Invalid format | Server returns `400` |
| Past dates | Allowed on create and update (no restriction — just marks the task as overdue) |

---

## Overdue definition

A todo is **overdue** when ALL of the following are true:
1. `dueDate` is set (not null/undefined)
2. `dueDate < today` (compared by date, ignoring time)
3. `status !== 'done'`

A completed (`done`) todo is never overdue, even if its due date is in the past.

---

## API changes

> **⚠️ Additive change to the response shape.** The `dueDate` field is added to todo objects in all responses (GET, POST, PUT). Callers that ignore unknown fields are unaffected. Callers that destructure specific fields also see no change — `dueDate` is simply a new optional key.

### POST /api/todos

Accepts optional `dueDate` in request body:
```json
{ "title": "Deploy release", "dueDate": "2026-06-15" }
```

On invalid format:
```json
HTTP 400
{ "error": "Invalid dueDate format. Use ISO date string (e.g. 2026-06-15)." }
```

### PUT /api/todos/:id

Accepts optional `dueDate` in request body. Setting `null` clears it.

### GET /api/todos / GET /api/todos/:id

Returns `dueDate` field in each todo object (value is the stored string or omitted if never set).

---

## Out of scope

- Reminders or notifications
- Recurring due dates
- Sorting by due date (separate task)
- Time-of-day precision (date only is sufficient)
