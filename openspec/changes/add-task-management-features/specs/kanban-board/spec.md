## ADDED Requirements

### Requirement: Kanban Column Layout
The Kanban Board SHALL display four columns side-by-side, one for each status value.

#### Scenario: Column rendering
- **WHEN** the Kanban Board view is active
- **THEN** four columns are displayed: Todo, In Progress, Review, Done — each with a header
  showing the column name and count of cards in that column

#### Scenario: Empty column
- **WHEN** a status has no todos
- **THEN** its column is shown with a count of 0 and an empty body

### Requirement: Kanban Card Status Change
Each Kanban card SHALL allow the user to move the todo to a different status.

#### Scenario: Move card forward
- **WHEN** the user triggers a status-advance action on a card not in the `done` column
- **THEN** PUT /api/todos/:id is called with the next status and the card moves to the new column

#### Scenario: Move card backward
- **WHEN** the user triggers a status-retreat action on a card not in the `todo` column
- **THEN** PUT /api/todos/:id is called with the previous status and the card moves to the new column
