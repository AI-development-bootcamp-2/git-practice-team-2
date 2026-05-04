# Task 8 — Drag & Drop: Backend

> **Owner:** Teammate F (same as frontend — verification only, no code changes expected)  
> **No new endpoints. No new files. Verification only.**

---

## Summary

The drag-and-drop feature calls `PUT /api/todos/:id` with `{ status: targetStatus }` when a card is dropped on a new column. This endpoint already exists and already validates status values. No backend work is required unless a gap is found during verification.

---

## Verification steps

Run these checks before starting frontend work. If any check fails, open a new task — do not fix it inline here.

### V-8-1 — PUT accepts status-only body

```
PUT /api/todos/:id
{ "status": "in-progress" }
```

Expected: `200` with updated todo object. `updatedAt` is refreshed. All other fields unchanged.

---

### V-8-2 — PUT rejects invalid status

```
PUT /api/todos/:id
{ "status": "wip" }
```

Expected: `400` with `{ "error": "Invalid status. Must be one of: todo, in-progress, review, done" }`

Drag-and-drop only ever sends one of the four valid column statuses, so this case should never be hit in practice. Confirming the guard exists is important for defense-in-depth.

---

### V-8-3 — PUT returns 404 on unknown id

```
PUT /api/todos/nonexistent-id
{ "status": "done" }
```

Expected: `404` with `{ "error": "Todo not found" }`

This is the scenario where a todo was deleted by another user between the drag starting and the drop completing. The frontend error handler covers this case (revert + show error).

---

### V-8-4 — Response shape includes all fields needed by frontend

```
PUT /api/todos/:id
{ "status": "review" }
```

Expected response must include: `id`, `title`, `status`, `createdAt`, `updatedAt`.  
The frontend's optimistic update does not depend on the response shape, but the data must be consistent for any future state reconciliation.

---

### V-8-5 — No same-column API call is needed (frontend handles this)

The frontend already guards: if `draggedTodo.status === targetStatus`, it returns early and makes no API call.  
No backend change is needed for this — confirming here for clarity.

---

## If a gap is found

If any verification step fails, do not fix it within Task 8. Instead:

1. Note the specific failure (endpoint, status code, actual vs expected response)
2. Open a separate task describing the fix required
3. Block Task 8 frontend merge until the fix is merged
4. Ping Teammate A (who owns the backend routes) to address the gap

---

## API contract (for frontend reference)

```
PUT /api/todos/:id
Content-Type: application/json
Body: { "status": "todo" | "in-progress" | "review" | "done" }

Success:   200  { id, title, status, createdAt, updatedAt, dueDate? }
Not found: 404  { error: "Todo not found" }
Bad status: 400 { error: "Invalid status. Must be one of: ..." }
```
