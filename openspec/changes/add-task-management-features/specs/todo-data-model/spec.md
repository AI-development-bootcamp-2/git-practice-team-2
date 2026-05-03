## MODIFIED Requirements — Guy

### Requirement: Expanded Status Enum
The todo status field SHALL support four values to reflect a real workflow lifecycle.

#### Scenario: Valid status values
- **WHEN** a todo is created or updated
- **THEN** the status field accepts only `todo | in-progress | review | done`

#### Scenario: Default status
- **WHEN** a todo is created without a status field
- **THEN** status defaults to `"todo"`

#### Scenario: Backward compatibility
- **WHEN** existing todos in storage have status `"todo"` or `"done"`
- **THEN** they are still valid and load without error

### Requirement: Server Validation
The server SHALL enforce the expanded status enum on create and update.

#### Scenario: Invalid status rejected on create
- **WHEN** POST /api/todos is called with a status outside `todo|in-progress|review|done`
- **THEN** 400 status with a descriptive error message is returned

#### Scenario: Invalid status rejected on update
- **WHEN** PUT /api/todos/:id is called with a status outside `todo|in-progress|review|done`
- **THEN** 400 status with a descriptive error message is returned

#### Scenario: Update non-existent todo
- **WHEN** PUT /api/todos/:id is called with an unknown ID
- **THEN** 404 status with error message is returned

### Requirement: Status Display in TodoItem
The TodoItem component SHALL visually indicate the current status of each todo.

#### Scenario: Status badge rendered
- **WHEN** a todo is rendered in the list view
- **THEN** a badge or label shows its current status (e.g. "In Progress", "Review", "Done")

#### Scenario: Done styling unchanged
- **WHEN** a todo has status `"done"`
- **THEN** it retains existing strikethrough / muted styling
