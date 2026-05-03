## ADDED Requirements

### Requirement: Drag and Drop Between Kanban Columns
The Kanban Board SHALL support dragging cards between columns to change their status.

#### Scenario: Drag to new column
- **WHEN** the user drags a card and drops it onto a different column
- **THEN** PUT /api/todos/:id is called with the new column's status and the card appears in the target column

#### Scenario: Visual feedback
- **WHEN** a card is being dragged
- **THEN** a drag preview is shown and the target column is visually highlighted

#### Scenario: Drag library
- **WHEN** drag-and-drop is implemented
- **THEN** it uses `@dnd-kit/core` as the drag-and-drop library

### Requirement: Inline Title Editing
The UI SHALL allow users to edit a todo title in place without opening a separate form.

#### Scenario: Activate edit mode
- **WHEN** the user clicks on a todo title
- **THEN** the title text is replaced by an editable input pre-filled with the current title

#### Scenario: Save on confirm
- **WHEN** the user presses Enter or moves focus away from the input
- **THEN** PUT /api/todos/:id is called with the new title and the input is replaced by the updated text

#### Scenario: Cancel on Escape
- **WHEN** the user presses Escape while editing
- **THEN** the original title is restored and no API call is made

#### Scenario: Empty title validation
- **WHEN** the user attempts to save an empty title
- **THEN** the save is blocked and an error indicator is shown

### Requirement: View Toggle
The application SHALL provide a toggle to switch between List view and Board view.

#### Scenario: Switch to board
- **WHEN** the user clicks the Board toggle button
- **THEN** the Kanban Board view replaces the Todo List view

#### Scenario: Switch to list
- **WHEN** the user clicks the List toggle button while in Board view
- **THEN** the Todo List view replaces the Kanban Board view

#### Scenario: Preference in memory
- **WHEN** the user switches views
- **THEN** the chosen view persists for the session (held in React state, not localStorage)
