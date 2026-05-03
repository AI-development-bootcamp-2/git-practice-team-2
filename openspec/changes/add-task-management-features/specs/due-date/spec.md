## ADDED Requirements

### Requirement: Due Date Field
The todo data model SHALL support an optional due date stored as an ISO date string.

#### Scenario: Set due date at creation
- **WHEN** the user picks a date in the AddTodo form and submits
- **THEN** the new todo is created with the selected dueDate value persisted on the server

#### Scenario: No due date
- **WHEN** the user submits the AddTodo form without choosing a date
- **THEN** the todo is created without a dueDate field

### Requirement: Due Date Display and Overdue Highlighting
The UI SHALL display the due date on each todo card and highlight overdue incomplete todos.

#### Scenario: Due date on card
- **WHEN** a todo has a dueDate and is rendered
- **THEN** the formatted due date is shown on the card

#### Scenario: Overdue highlight
- **WHEN** a todo has a dueDate earlier than today's date and its status is not `done`
- **THEN** the due date label is rendered in red to signal overdue status

#### Scenario: No highlight when done
- **WHEN** a todo has a past dueDate but its status is `done`
- **THEN** no overdue styling is applied
