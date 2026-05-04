# Task 8 — Drag & Drop: Frontend

> **Owner:** Teammate F (ideally the same person who implemented Task 4 — they know the component structure)  
> **Blocked by Task 4.** Do not start until `KanbanBoard.jsx`, `KanbanColumn.jsx`, and `TodoCard.jsx` are merged to main.  
> **Before starting:** Pull main and confirm the three Kanban components exist and render correctly.

---

## Files to modify

| File | Change |
|------|--------|
| `client/src/components/KanbanBoard.jsx` | Add `DndContext`, `onDragEnd` handler, `DragOverlay` |
| `client/src/components/KanbanColumn.jsx` | Add `useDroppable` |
| `client/src/components/TodoCard.jsx` | Add `useDraggable` |

## New files to create (zero conflict risk)

| File | Purpose |
|------|---------|
| `client/src/components/DragOverlayCard.jsx` | Ghost card shown while dragging |

---

## Step F-8-1 — Install dnd-kit

```
cd client
npm install @dnd-kit/core @dnd-kit/sortable
```

Commit `package.json` and `package-lock.json` together in the same commit.

---

## Step F-8-2 — Create `DragOverlayCard.jsx` (new file)

**File:** `client/src/components/DragOverlayCard.jsx`

- Renders a visual copy of a `TodoCard` for use inside `DragOverlay`
- Props: `todo` (the todo object being dragged)
- Should look identical to `TodoCard` but without drag handles or interactive buttons
- Wraps content in a container with a slight shadow/opacity to signal "in flight"
- Does not need `useDraggable` — it is purely presentational

Creating this as a separate component keeps `TodoCard.jsx` clean and avoids nesting drag hooks inside the overlay.

---

## Step F-8-3 — Add `useDraggable` to `TodoCard.jsx`

**File:** `client/src/components/TodoCard.jsx`

- Import `useDraggable` from `@dnd-kit/core`
- Call `useDraggable({ id: todo.id })` inside the component
- Apply `attributes`, `listeners`, and `setNodeRef` to the card's root element
- Apply `transform` style using `CSS.Transform.toString(transform)` for smooth movement
- While dragging (`isDragging`): reduce opacity of the original card (e.g. `opacity: 0.4`) to show the placeholder

```
// Shape of the change — do not copy as code
const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: todo.id });
const style = { transform: CSS.Transform.toString(transform), opacity: isDragging ? 0.4 : 1 };
```

**What NOT to change:**
- Status buttons (forward/backward) — leave them in place
- `onStatusChange` and `onDelete` props — untouched

---

## Step F-8-4 — Add `useDroppable` to `KanbanColumn.jsx`

**File:** `client/src/components/KanbanColumn.jsx`

- Import `useDroppable` from `@dnd-kit/core`
- Call `useDroppable({ id: column.status })` — use the status string as the droppable id
- Apply `setNodeRef` to the column's card list container (not the entire column wrapper)
- When `isOver` is true, apply a highlight style to the container (e.g. `background: rgba(0,0,0,0.04)` or a colored border)

```
// Shape of the change — do not copy as code
const { setNodeRef, isOver } = useDroppable({ id: status });
const style = { background: isOver ? '#f0f9ff' : 'transparent' };
```

---

## Step F-8-5 — Wrap `KanbanBoard.jsx` in `DndContext`

**File:** `client/src/components/KanbanBoard.jsx`

- Import `DndContext`, `DragOverlay` from `@dnd-kit/core`
- Import `DragOverlayCard`
- Add state: `const [activeId, setActiveId] = useState(null)`
- Add `onDragStart` handler: sets `activeId` to the dragged todo's id
- Add `onDragEnd` handler: see Step F-8-6
- Wrap the entire column layout in `<DndContext onDragStart={...} onDragEnd={...}>`
- Add `<DragOverlay>` at the end of the `DndContext`, rendering `<DragOverlayCard todo={activeTodo} />` when `activeId` is set

```
// Shape — do not copy as code
const activeTodo = todos.find(t => t.id === activeId);

<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
  {/* existing column layout */}
  <DragOverlay>
    {activeTodo ? <DragOverlayCard todo={activeTodo} /> : null}
  </DragOverlay>
</DndContext>
```

---

## Step F-8-6 — Implement `onDragEnd` with optimistic update and error handling

**File:** `client/src/components/KanbanBoard.jsx`

```
// Shape of the logic — do not copy as code
async function handleDragEnd(event) {
  const { active, over } = event;
  setActiveId(null);

  if (!over || active.id === over.id) return;           // dropped outside or same column

  const draggedTodo = todos.find(t => t.id === active.id);
  const targetStatus = over.id;                          // droppable id = status string

  if (draggedTodo.status === targetStatus) return;       // same status, no-op

  const originalStatus = draggedTodo.status;

  // Optimistic update
  onStatusChange(active.id, targetStatus);

  try {
    await api.todos.update(active.id, { status: targetStatus });
  } catch (err) {
    // Revert
    onStatusChange(active.id, originalStatus);
    setError('Failed to move task. Please try again.');
  }
}
```

- `onStatusChange` is the existing prop from `App.jsx` — reuse it, do not duplicate state
- `setError` should update a local error state rendered as a banner inside `KanbanBoard`

---

## Step F-8-7 — Add error banner to `KanbanBoard.jsx`

**File:** `client/src/components/KanbanBoard.jsx`

- Add state: `const [error, setError] = useState(null)`
- Render `{error && <p className="dnd-error">{error}</p>}` above the columns
- Clear the error when a new drag starts (`onDragStart` sets `setError(null)`)
- The banner disappears automatically on the next drag attempt — no dismiss button required

---

## How to test manually

| Test | Expected |
|------|----------|
| Drag card to adjacent column | Card moves, API called, status persists on refresh |
| Drag card two columns over | Card moves, API called, status persists |
| Drag and drop on same column | No API call, card stays, no error |
| Drag and release outside any column | Card returns to original column, no API call |
| Disconnect network, drag card | Card reverts after API failure, error banner shown |
| Error banner then new drag | Error banner disappears when drag starts |
| Drag while another drag animation is in progress | Should not be possible — dnd-kit handles this |
| Keyboard accessibility | dnd-kit provides keyboard support by default — confirm arrow keys move cards |

---

## Dependencies

| Dependency | Required to start? | Required to merge? |
|------------|-------------------|--------------------|
| Task 4 merged (`KanbanBoard`, `KanbanColumn`, `TodoCard`) | ✅ Yes | ✅ Yes |
| `@dnd-kit/core` installed | ✅ Yes | ✅ Yes |
| Task 6 backend (dueDate on todos) | No | No |
| Task 5 (search/filter) | No | No |
| Task 7 (statistics) | No | No |
