# Task 6 — Due Date: Frontend

> **Owner:** Teammate D (same person as Task 5 frontend)  
> **Can start immediately** on local branch — no backend dependency to develop/test UI.  
> **Before merging:** Pull Task 6 backend (Teammate A) so `dueDate` is stored and returned by the API.

---

## Files to modify

| File | Change |
|------|--------|
| `client/src/components/AddTodo.jsx` | Add optional date input field |
| `client/src/components/TodoItem.jsx` | Display `dueDate`, show overdue indicator |
| `client/src/services/api.js` | Pass `dueDate` from `create()` |

No new files needed for this task.

---

## Step D-6-1 — Add date input to `AddTodo.jsx`

**File:** `client/src/components/AddTodo.jsx`

- Add a second state: `const [dueDate, setDueDate] = useState('')`
- Add a `<input type="date" />` field below the title input (optional — no required attribute)
- On submit, pass `{ title, dueDate: dueDate || null }` to `onAdd`
- Clear `dueDate` state on submit along with title

**What NOT to change:**
- The `onAdd` prop signature changes (now receives an object instead of a plain string).  
  Update `App.jsx` accordingly — see Step D-6-3 below.
- Do not make the date field required.

---

## Step D-6-2 — Update `api.js` `create()` to pass `dueDate`

**File:** `client/src/services/api.js`

```
// before:
create(title) {
  return fetchApi('/todos', { method: 'POST', body: JSON.stringify({ title }) });
}

// after:
create({ title, dueDate }) {
  return fetchApi('/todos', { method: 'POST', body: JSON.stringify({ title, dueDate }) });
}
```

**Conflict note:** Task 5 frontend also modifies `api.js` (adds `getAll()` params). Since both are owned by Teammate D, handle in the same branch — no merge conflict.

---

## Step D-6-3 — Update `App.jsx` `handleAdd` to pass `dueDate`

**File:** `client/src/components/App.jsx`

```
// before:
const handleAdd = async (title) => {
  await api.todos.create(title);
  ...
}

// after:
const handleAdd = async ({ title, dueDate }) => {
  await api.todos.create({ title, dueDate });
  ...
}
```

---

## Step D-6-4 — Display `dueDate` in `TodoItem.jsx`

**File:** `client/src/components/TodoItem.jsx`

- If `todo.dueDate` is set, display it as a human-readable date (e.g. `"Due Jun 15"`)
- Format suggestion: `new Date(todo.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })`
- Show below the title, in muted/small text

---

## Step D-6-5 — Add overdue indicator in `TodoItem.jsx`

**File:** `client/src/components/TodoItem.jsx`

Overdue logic:
```
const isOverdue = (todo) => {
  if (!todo.dueDate || todo.status === 'done') return false;
  return new Date(todo.dueDate) < new Date(new Date().toDateString());
};
```

- If overdue: show a small red label or badge (e.g. `"Overdue"`) next to the due date
- Do not hide or disable the todo — only add the visual indicator

---

## How to test

| Test | Expected |
|------|----------|
| Create todo without date | No due date shown in card |
| Create todo with future date | Date shown, no overdue indicator |
| Create todo with past date, status `todo` | Date shown + "Overdue" label |
| Create todo with past date, status `done` | Date shown, no overdue indicator |
| Update status to `done` on overdue todo | Overdue indicator disappears |
| Submit form with date → clear form | Date field resets to empty |

---

## Dependency on backend

The `dueDate` field can be locally simulated during development with hardcoded values.  
**Do not merge** to main until Teammate A's backend is merged — without it, `dueDate` sent on POST will be ignored by the server and never returned in GET responses.
