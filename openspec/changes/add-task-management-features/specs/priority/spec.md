## ADDED Requirements

### Requirement: Priority Field
Each todo SHALL carry a priority value of `low`, `medium`, or `high`, defaulting to `medium`.

#### Scenario: Default priority
- **WHEN** a todo is created without specifying priority
- **THEN** the stored todo has priority `medium`

#### Scenario: Explicit priority at creation
- **WHEN** the user selects a priority in the AddTodo form before submitting
- **THEN** the new todo is created with the chosen priority value

#### Scenario: Invalid priority rejected
- **WHEN** POST or PUT /api/todos is called with a priority outside `low|medium|high`
- **THEN** the server returns 400 with an error message

### Requirement: Priority Badge Display
The UI SHALL display a color-coded priority badge on each todo card.

#### Scenario: Priority badge colors
- **WHEN** a todo is rendered
- **THEN** its priority badge is green for `low`, orange for `medium`, and red for `high`

#### Scenario: Edit priority
- **WHEN** the user changes the priority control on a rendered todo
- **THEN** PUT /api/todos/:id is called with the new priority and the badge updates immediately
