## MODIFIED Requirements

### Requirement: Todo Data Model
Each todo SHALL have id, title, status, priority, createdAt, updatedAt, and optionally
dueDate and tags fields.

#### Scenario: New todo structure
- **WHEN** a todo is created
- **THEN** it has id (UUID), title (string), status (`todo|in-progress|review|done`),
  priority (`low|medium|high`), createdAt (ISO date), updatedAt (ISO date), and optionally
  dueDate (ISO date string) and tags (array of `{ name, color }`)

#### Scenario: Default status
- **WHEN** a todo is created without a status field
- **THEN** status defaults to `"todo"`

#### Scenario: Default priority
- **WHEN** a todo is created without a priority field
- **THEN** priority defaults to `"medium"`

#### Scenario: Optional due date
- **WHEN** a todo is created without a dueDate field
- **THEN** dueDate is absent from the stored object

#### Scenario: Tags default
- **WHEN** a todo is created without a tags field
- **THEN** tags defaults to an empty array `[]`
