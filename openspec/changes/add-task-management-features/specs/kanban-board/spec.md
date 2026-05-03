## ADDED Requirements

<!-- Eden: Static layout and column structure -->

### Requirement: Kanban Column Layout
The Kanban Board SHALL display four columns side-by-side, one per status value.

#### Scenario: Column rendering
- **WHEN** the Kanban Board view is active
- **THEN** four columns are shown: Todo, In Progress, Review, Done — each with a header
  displaying the column name and count of cards in that column

#### Scenario: Cards grouped by status
- **WHEN** the Kanban Board view is active
- **THEN** each todo card appears in the column that matches its current status

#### Scenario: Empty column
- **WHEN** a status has no todos
- **THEN** its column shows a count of 0 and an empty body (no error, no hidden column)

### Requirement: View Toggle
The application SHALL allow switching between the existing list view and the new Kanban board.

#### Scenario: Switch to board
- **WHEN** the user clicks a "Board" toggle or button
- **THEN** the Kanban board replaces the todo list

#### Scenario: Switch to list
- **WHEN** the user clicks a "List" toggle or button from the board view
- **THEN** the todo list replaces the Kanban board

### Requirement: Kanban Card Status Buttons
Each Kanban card SHALL provide forward/backward buttons to move it to an adjacent status.

#### Scenario: Move card forward
- **WHEN** the user clicks the advance button on a card not in the `done` column
- **THEN** PUT /api/todos/:id is called with the next status and the card moves columns

#### Scenario: Move card backward
- **WHEN** the user clicks the retreat button on a card not in the `todo` column
- **THEN** PUT /api/todos/:id is called with the previous status and the card moves columns

#### Scenario: No advance on done
- **WHEN** a card is in the `done` column
- **THEN** no advance button is shown

#### Scenario: No retreat on todo
- **WHEN** a card is in the `todo` column
- **THEN** no retreat button is shown

---

<!-- Ori: Drag-and-drop on top of the layout above -->

### Requirement: Drag-and-Drop Between Columns
The Kanban Board SHALL support dragging cards between columns to change status.

#### Scenario: Drag card to new column
- **WHEN** the user drags a card and drops it onto a different column
- **THEN** PUT /api/todos/:id is called with the target column's status and the card moves

#### Scenario: Drop on same column
- **WHEN** the user drags a card and drops it onto its current column
- **THEN** no API call is made and nothing changes

#### Scenario: Drag library
- **WHEN** drag-and-drop is implemented
- **THEN** it uses the `dnd-kit` library (`@dnd-kit/core`, `@dnd-kit/sortable`)

#### Scenario: Drag preview
- **WHEN** a card is being dragged
- **THEN** a drag overlay or ghost is shown following the cursor
