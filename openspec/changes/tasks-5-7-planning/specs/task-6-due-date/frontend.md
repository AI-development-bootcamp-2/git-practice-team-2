# Task 6 — Due Date: Frontend

> **Owner:** Teammate D (same person as Task 5 frontend)  
> **Can start immediately** on local branch — no backend dependency to develop/test UI.  
> **Before merging:** Pull Task 6 backend (Teammate A) so `dueDate` is stored and returned by the API.

---

## Files to modify

| File | Change |
|------|--------|
| `client/src/components/AddTodo.jsx` | Add `react-datepicker` with clear button |
| `client/src/components/TodoItem.jsx` | Display `dueDate` (DD/MM/YYYY), show light red highlight if overdue |
| `client/src/services/api.js` | Pass `dueDate` from `create()` |
| `client/package.json` | Add `react-datepicker` dependency |

---

## Step D-6-0 — Install Dependencies

Install `react-datepicker`:
```bash
cd client && npm install react-datepicker
```

---

## Step D-6-1 — Add date input to `AddTodo.jsx`

**File:** `client/src/components/AddTodo.jsx`

- Import `DatePicker` from `react-datepicker` and its CSS.
- Add a second state: `const [dueDate, setDueDate] = useState(null)`
- Add the `DatePicker` component:
  - `selected={dueDate}`
  - `onChange={(date) => setDueDate(date)}`
  - `dateFormat="dd/MM/yyyy"`
  - `isClearable` (to allow removal)
  - `placeholderText="Add due date"`
- On submit, pass `{ title, dueDate: dueDate ? dueDate.toISOString() : null }` to `onAdd`
- Clear `dueDate` state on submit.

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

- If `todo.dueDate` is set, display it formatted as `DD/MM/YYYY`.
- Format suggestion: `new Date(todo.dueDate).toLocaleDateString('en-GB')`
- Show below the title, in muted/small text.

---

## Step D-6-5 — Add overdue indicator in `TodoItem.jsx`

**File:** `client/src/components/TodoItem.jsx`

Overdue logic:
```javascript
const isOverdue = (todo) => {
  if (!todo.dueDate || todo.status === 'done') return false;
  const today = new Date();
  today.setHours(0,0,0,0);
  return new Date(todo.dueDate) < today;
};
```

- If overdue: 
  - Show a small red label (e.g. `"Overdue"`)
  - Apply a light background highlight to the entire `.todo-item` container (e.g., `background-color: #fff5f5`).

---

## How to test

| Test | Expected |
|------|----------|
| Create todo without date | No due date shown in card |
| Create todo with future date | Date shown as DD/MM/YYYY, no overdue indicator |
| Create todo with past date, status `todo` | Date shown + "Overdue" label + light red background |
| Create todo with past date, status `done` | Date shown, no overdue indicator/highlight |
| Update status to `done` on overdue todo | Overdue indicator and highlight disappear |
| Submit form with date → clear form | Date field resets to empty |

---

## Dependency on backend

The `dueDate` field can be locally simulated during development with hardcoded values.  
**Do not merge** to main until Teammate A's backend is merged — without it, `dueDate` sent on POST will be ignored by the server and never returned in GET responses.
