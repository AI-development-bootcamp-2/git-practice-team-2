# Task 7 — Statistics Charts: Backend

> **Owner:** Teammate C  
> **Phase 2 — optional.** Phase 1 requires no backend changes.  
> **Prerequisite before starting:** Pull main after Teammate A (Task 6 backend) has merged.

---

## Phase 1 — no backend changes required

The frontend calculates all statistics from the existing `GET /api/todos` response.  
Skip this file entirely if the team decides phase 2 is not needed.

---

## Phase 2 — `GET /api/todos/stats` endpoint (optional)

Add this only if frontend calculation becomes a performance concern or the endpoint is needed for other consumers.

---

## Files to change (phase 2 only)

| File | Change type |
|------|------------|
| `server/src/services/todoService.js` | Add `getStats()` method |
| `server/src/routes/todos.js` | Register `GET /stats` route |

---

## Step C-7-1 — Add `getStats()` to `todoService.js`

**File:** `server/src/services/todoService.js`

Add after the existing methods:

```
getStats() {
  const todos = readTodos();
  const total = todos.length;
  const byStatus = { todo: 0, 'in-progress': 0, review: 0, done: 0 };
  for (const t of todos) {
    if (byStatus[t.status] !== undefined) byStatus[t.status]++;
  }
  const completionPct = total === 0 ? 0 : Math.round((byStatus.done / total) * 100);
  return { total, byStatus, completionPct };
}
```

Response shape:
```json
{
  "total": 10,
  "byStatus": {
    "todo": 3,
    "in-progress": 2,
    "review": 1,
    "done": 4
  },
  "completionPct": 40
}
```

---

## Step C-7-2 — Register `GET /stats` route in `todos.js`

**File:** `server/src/routes/todos.js`

> **⚠️ CRITICAL — route registration order.**  
> This route MUST be registered **before** `GET /:id`. If registered after, Fastify will treat `"stats"` as a value for `:id` and route to the wrong handler.

Add at the very top of the route registrations, before any `/:id` route:

```
// GET /api/todos/stats — must be before /:id
fastify.get('/stats', async (request, reply) => {
  return todoService.getStats();
});
```

---

## How to test

```
# Returns stats object
GET /api/todos/stats

# Expected when todos exist:
{ "total": 5, "byStatus": { "todo": 2, "in-progress": 1, "review": 1, "done": 1 }, "completionPct": 20 }

# Expected when no todos exist:
{ "total": 0, "byStatus": { "todo": 0, "in-progress": 0, "review": 0, "done": 0 }, "completionPct": 0 }

# Must still work (non-regression):
GET /api/todos/:id  (with a real id)
GET /api/todos      (no params)
```

---

## API impact

> **⚠️ New route — no existing callers affected.**  
> `GET /api/todos/stats` is a new endpoint. No existing route is modified.  
> The only risk is the registration order (see Step C-7-2).

---

## Conflict with Task 5 backend (Teammate B)

Both B and C modify `routes/todos.js`. Recommended order:  
1. B merges their `GET /` query param changes  
2. C pulls, then adds the `/stats` route at the top — no overlap with B's changes in the `GET /` handler
