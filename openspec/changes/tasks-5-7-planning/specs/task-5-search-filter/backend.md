# Task 5 — Search and Filtering: Backend

> **Owner:** Teammate B  
> **Prerequisite:** Pull main after Teammate A (Task 6 backend) has merged.  
> **Phase:** Phase 2 (phase 1 is frontend-only, no backend needed)

---

## Files to change

| File | Change type |
|------|------------|
| `server/src/services/todoService.js` | Add `getFiltered()` method |
| `server/src/routes/todos.js` | Add query param handling in `GET /` handler |

---

## Step B-5-1 — Add `getFiltered()` to todoService.js

**File:** `server/src/services/todoService.js`

Add a new method to the `todoService` object, after `getAll()`:

```
getFiltered({ search, status }) {
  let todos = readTodos();
  if (search) {
    todos = todos.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  }
  if (status) {
    todos = todos.filter(t => t.status === status);
  }
  return todos;
}
```

- Do not remove or modify `getAll()` — it is still used by other callers.
- `search` and `status` are both optional. If both are undefined, returns the same result as `getAll()`.

**How to test (Node REPL):**
```js
import { todoService } from './src/services/todoService.js'
todoService.getFiltered({ search: 'git' })        // only todos with 'git' in title
todoService.getFiltered({ status: 'done' })        // only done todos
todoService.getFiltered({})                        // all todos (same as getAll)
todoService.getFiltered({ search: 'x', status: 'todo' })  // AND logic
```

---

## Step B-5-2 — Add `?search=` query param to GET / route

**File:** `server/src/routes/todos.js`

Update the `GET /` handler:

```
// before:
fastify.get('/', async (request, reply) => {
  return todoService.getAll();
});

// after:
fastify.get('/', async (request, reply) => {
  const { search, status } = request.query;
  if (!search && !status) return todoService.getAll();
  if (status && !VALID_STATUSES.includes(status)) {
    return reply.status(400).send({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
  }
  return todoService.getFiltered({ search, status });
});
```

**Important:** `VALID_STATUSES` is already imported at the top of this file — do not duplicate the import.

---

## How to test (curl / Postman)

```
# Returns all todos (unchanged behavior — non-breaking check)
GET /api/todos

# Returns todos with 'git' in title
GET /api/todos?search=git

# Returns only 'done' todos
GET /api/todos?status=done

# Returns 'done' todos with 'git' in title
GET /api/todos?search=git&status=done

# Returns 400 — invalid status
GET /api/todos?status=invalid
```

---

## API impact

> **Non-breaking.** Existing callers that send no query params see identical responses.  
> The only new behavior is for callers that opt in to `?search=` or `?status=`.  
> No change to the response shape — still a flat array of todo objects.

---

## Dependency on Task 6

Pull Task 6 backend changes before starting. Task 6 adds `dueDate` to `todoService.js` and `routes/todos.js`. Merging Task 5 onto a stale base will produce a conflict on those two files.
