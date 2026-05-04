# Task 6 — Due Date: Backend

> **Owner:** Teammate A  
> **Merge first — all other backend tasks depend on this being merged.**  
> No prerequisite — can start immediately on a fresh branch from main.

---

## Files to change

| File | Change type |
|------|------------|
| `server/src/services/todoService.js` | Accept `dueDate` in `create()` and `update()` |
| `server/src/routes/todos.js` | Add `dueDate` format validation in POST and PUT |

---

## Step A-6-1 — Accept `dueDate` in `todoService.create()`

**File:** `server/src/services/todoService.js`

In the `create()` method, add `dueDate` to the new todo object:

```
// before:
const newTodo = {
  id: crypto.randomUUID(),
  title: todoData.title,
  status: todoData.status || 'todo',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// after:
const newTodo = {
  id: crypto.randomUUID(),
  title: todoData.title,
  status: todoData.status || 'todo',
  dueDate: todoData.dueDate ?? null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
```

`dueDate` defaults to `null` if not provided.

---

## Step A-6-2 — Allow `dueDate` in `todoService.update()`

**File:** `server/src/services/todoService.js`

The `update()` method uses spread (`...updates`) so it already passes through any field from the request body — **no change needed here**. The validation in the route layer ensures only valid `dueDate` values reach the service.

---

## Step A-6-3 — Add `dueDate` validation helper

**File:** `server/src/routes/todos.js`

Add a small inline validator at the top of the file (after the import line):

```
function isValidDueDate(value) {
  if (value === null || value === undefined) return true;
  return !isNaN(Date.parse(value));
}
```

---

## Step A-6-4 — Validate `dueDate` in POST handler

**File:** `server/src/routes/todos.js`

In the POST handler, after the status validation block:

```
if ('dueDate' in request.body) {
  if (!isValidDueDate(request.body.dueDate)) {
    return reply.status(400).send({ error: 'Invalid dueDate format. Use ISO date string (e.g. 2026-06-15).' });
  }
}
const todo = todoService.create({ title: title.trim(), status, dueDate: request.body.dueDate });
```

---

## Step A-6-5 — Validate `dueDate` in PUT handler

**File:** `server/src/routes/todos.js`

In the PUT handler, after the status validation block:

```
if ('dueDate' in request.body) {
  if (!isValidDueDate(request.body.dueDate)) {
    return reply.status(400).send({ error: 'Invalid dueDate format. Use ISO date string (e.g. 2026-06-15).' });
  }
}
```

The `todoService.update()` call below already passes `request.body` through spread — no change needed there.

---

## How to test

```
# POST without dueDate → dueDate is null in response
POST /api/todos
{ "title": "test" }

# POST with valid dueDate → stored and returned
POST /api/todos
{ "title": "Deploy", "dueDate": "2026-06-15" }

# POST with invalid dueDate → 400
POST /api/todos
{ "title": "Deploy", "dueDate": "not-a-date" }

# PUT with dueDate → updates the field
PUT /api/todos/:id
{ "dueDate": "2026-07-01" }

# PUT with dueDate: null → clears the field
PUT /api/todos/:id
{ "dueDate": null }

# GET all → dueDate appears in each todo
GET /api/todos
```

---

## API impact

> **⚠️ Additive change.** `dueDate` is added to all todo responses. Existing clients that parse only `id`, `title`, `status`, `createdAt`, `updatedAt` are unaffected. No field is removed or renamed.

> **No data migration needed.** Existing todos in `todos.json` do not have `dueDate`. Clients must treat missing `dueDate` as `null` (no due date set).
