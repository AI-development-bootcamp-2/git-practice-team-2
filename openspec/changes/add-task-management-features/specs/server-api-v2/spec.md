## MODIFIED Requirements

### Requirement: Create Todo Endpoint
The API SHALL provide an endpoint to create a new todo accepting title, optional priority,
optional dueDate, and optional tags.

#### Scenario: Create with valid title
- **WHEN** POST /api/todos is called with a non-empty title
- **THEN** a new todo is created with provided fields, defaults applied, and returned with 201 status

#### Scenario: Create with invalid status
- **WHEN** POST /api/todos is called with a status value outside `todo|in-progress|review|done`
- **THEN** 400 status with a descriptive error message is returned

#### Scenario: Create with empty title
- **WHEN** POST /api/todos is called with empty or missing title
- **THEN** 400 status with error message is returned

### Requirement: Update Todo Endpoint
The API SHALL provide an endpoint to update status, title, priority, dueDate, and tags of
an existing todo.

#### Scenario: Update status to valid value
- **WHEN** PUT /api/todos/:id is called with status `in-progress`
- **THEN** the todo status is updated and the full updated todo is returned

#### Scenario: Update with invalid status
- **WHEN** PUT /api/todos/:id is called with a status value not in `todo|in-progress|review|done`
- **THEN** 400 status with error message is returned

#### Scenario: Update non-existent todo
- **WHEN** PUT /api/todos/:id is called with an invalid ID
- **THEN** 404 status with error message is returned

## ADDED Requirements

### Requirement: Statistics Endpoint
The API SHALL provide an endpoint returning aggregate metrics across all todos.

#### Scenario: Get stats
- **WHEN** GET /api/todos/stats is called
- **THEN** a JSON object is returned with `total`, `byStatus` (count per status), and
  `completionPct` (percentage of todos with status `done`)

#### Scenario: Stats with date range
- **WHEN** GET /api/todos/stats is called with `from` and `to` query parameters (ISO dates)
- **THEN** metrics are calculated only for todos whose `createdAt` falls within the range
