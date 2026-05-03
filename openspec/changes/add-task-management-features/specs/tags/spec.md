## ADDED Requirements

### Requirement: Tag Data Model
Each todo SHALL support an optional array of tags, where each tag has a name and a color.

#### Scenario: Tag structure
- **WHEN** a tag is added to a todo
- **THEN** it is stored as `{ name: string, color: string (hex) }` within the todo's tags array

#### Scenario: Tags default to empty
- **WHEN** a todo is created without specifying tags
- **THEN** the tags array is stored as `[]`

### Requirement: Tag Management UI
The UI SHALL allow users to create tags and assign them to todos.

#### Scenario: Tags on card
- **WHEN** a todo with tags is rendered
- **THEN** each tag is displayed as a colored chip on the card

### Requirement: Filter by Tag
The application SHALL support filtering todos by one or more tags.

#### Scenario: Tag filter
- **WHEN** the user selects a tag in the filter UI
- **THEN** only todos that include that tag are shown in the active view
