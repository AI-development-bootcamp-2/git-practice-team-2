## Frontend-Only Spec — Kanban Board (Ori)

> **Scope:** React client only (`client/src/`).
> No backend changes. No API contract changes.
> API used: `PUT /api/todos/:id` with body `{ status }` — already exists.
> Status values defined by the data-model spec: `todo | in-progress | review | done`.

---

## Out of Scope

- Server validation or data-model changes (covered by Guy's spec)
- Backend routes or persistence
- Status badge in the list view (covered by Guy's spec)

---

## Files

### New Files

| File | Purpose |
|---|---|
| `client/src/utils/status.js` | Status constants and navigation helpers |
| `client/src/components/KanbanCard.jsx` | Single draggable todo card |
| `client/src/components/KanbanColumn.jsx` | Single droppable column |
| `client/src/components/KanbanBoard.jsx` | Board container with DnD context |

### Modified Files

| File | Change |
|---|---|
| `client/src/components/App.jsx` | Add `view` state, `handleStatusChange`, render toggle and board |
| `client/src/App.css` | Add Kanban layout, card, column, toggle, and drag-overlay styles |
| `client/package.json` | Add `@dnd-kit/core` and `@dnd-kit/sortable` dependencies |

---

## ADDED Requirements

### Requirement: Status Constants and Helpers
A utility module SHALL define the four ordered status values and provide navigation helpers.

#### Scenario: Ordered status array
- **WHEN** the status utility is imported
- **THEN** it exports `STATUS_ORDER = ['todo', 'in-progress', 'review', 'done']`

#### Scenario: Display labels
- **WHEN** the status utility is imported
- **THEN** it exports `STATUS_LABELS` mapping each status to a human-readable label:
  `{ todo: 'Todo', 'in-progress': 'In Progress', review: 'Review', done: 'Done' }`

#### Scenario: Next status
- **WHEN** `getNextStatus(status)` is called with any value except `'done'`
- **THEN** it returns the immediately following status in `STATUS_ORDER`

#### Scenario: No next at end
- **WHEN** `getNextStatus('done')` is called
- **THEN** it returns `null`

#### Scenario: Previous status
- **WHEN** `getPrevStatus(status)` is called with any value except `'todo'`
- **THEN** it returns the immediately preceding status in `STATUS_ORDER`

#### Scenario: No previous at start
- **WHEN** `getPrevStatus('todo')` is called
- **THEN** it returns `null`

---

### Requirement: View Toggle
The application SHALL allow switching between the existing list view and the Kanban board.

#### Scenario: Toggle rendered
- **WHEN** the app is displayed
- **THEN** a "List" button and a "Board" button are shown above the content area

#### Scenario: Default view
- **WHEN** the app first loads
- **THEN** the list view is active by default

#### Scenario: Switch to board
- **WHEN** the user clicks the "Board" button
- **THEN** the Kanban board replaces the todo list

#### Scenario: Switch to list
- **WHEN** the user clicks the "List" button while the board is active
- **THEN** the todo list replaces the Kanban board

#### Scenario: Active button style
- **WHEN** a view is active
- **THEN** its toggle button is visually distinguished from the inactive one

---

### Requirement: Status Change Handler in App
`App.jsx` SHALL expose a `handleStatusChange` function passed down to the board.

#### Scenario: API call on status change
- **WHEN** `handleStatusChange(id, newStatus)` is called
- **THEN** `PUT /api/todos/:id` is called with body `{ status: newStatus }`

#### Scenario: Local state updated after success
- **WHEN** the PUT call succeeds
- **THEN** the todo's status is updated in the local `todos` state without a full re-fetch

#### Scenario: Error on failure
- **WHEN** the PUT call fails
- **THEN** the existing error display mechanism shows the error to the user

---

### Requirement: Kanban Column Layout
The Kanban Board SHALL display four columns side-by-side, one per status value.

#### Scenario: Four columns rendered
- **WHEN** the Kanban board view is active
- **THEN** exactly four columns are shown in order: Todo, In Progress, Review, Done

#### Scenario: Column headers with count
- **WHEN** a column is rendered
- **THEN** its header shows the status label and the count of cards in that column

#### Scenario: Cards grouped by status
- **WHEN** the Kanban board view is active
- **THEN** each todo card appears only in the column that matches its current status

#### Scenario: Empty column
- **WHEN** a status has no todos
- **THEN** its column shows a count of 0 and an empty body — no error, no hidden column

---

### Requirement: Kanban Card
Each todo SHALL be rendered as a card with forward and backward status buttons.

#### Scenario: Card content
- **WHEN** a card is rendered
- **THEN** the todo's title is displayed

#### Scenario: Forward button visible
- **WHEN** a card's status is not `'done'`
- **THEN** an advance button (e.g. `→`) is shown

#### Scenario: Forward button hidden on done
- **WHEN** a card's status is `'done'`
- **THEN** no advance button is shown

#### Scenario: Backward button visible
- **WHEN** a card's status is not `'todo'`
- **THEN** a retreat button (e.g. `←`) is shown

#### Scenario: Backward button hidden on todo
- **WHEN** a card's status is `'todo'`
- **THEN** no retreat button is shown

#### Scenario: Advance action
- **WHEN** the user clicks the advance button
- **THEN** `handleStatusChange` is called with the card's id and the next status

#### Scenario: Retreat action
- **WHEN** the user clicks the retreat button
- **THEN** `handleStatusChange` is called with the card's id and the previous status

---

### Requirement: Drag-and-Drop Between Columns
The Kanban Board SHALL support dragging cards between columns to change status.

#### Scenario: Library
- **WHEN** drag-and-drop is implemented
- **THEN** it uses `@dnd-kit/core` and `@dnd-kit/sortable`

#### Scenario: Drag preview
- **WHEN** a card is being dragged
- **THEN** a `DragOverlay` ghost card follows the cursor

#### Scenario: Drop on different column
- **WHEN** the user drags a card and drops it onto a different column
- **THEN** `handleStatusChange` is called with the card's id and the target column's status

#### Scenario: Drop on same column
- **WHEN** the user drags a card and drops it onto its current column
- **THEN** no API call is made and the card remains in place

#### Scenario: Card is draggable
- **WHEN** a card is rendered on the board
- **THEN** the user can pick it up by dragging (via `useDraggable`)

#### Scenario: Column is a drop target
- **WHEN** a card is dragged over a column
- **THEN** the column accepts the drop (via `useDroppable`)

---

### Requirement: Kanban Visual Design
The Kanban board SHALL follow the existing app's visual style.

#### Scenario: Board layout
- **WHEN** the board is displayed
- **THEN** the four columns are arranged horizontally with consistent spacing

#### Scenario: Card appearance
- **WHEN** a card is rendered
- **THEN** it has a white background, padding, border-radius, and a subtle shadow

#### Scenario: Drag cursor
- **WHEN** hovering over a card
- **THEN** the cursor changes to `grab`

#### Scenario: Dragging opacity
- **WHEN** a card is actively being dragged
- **THEN** the original card position shows reduced opacity

#### Scenario: Toggle button style
- **WHEN** the view toggle is rendered
- **THEN** the active view button uses the app's primary color (`#4361ee`) and the inactive button is visually muted
