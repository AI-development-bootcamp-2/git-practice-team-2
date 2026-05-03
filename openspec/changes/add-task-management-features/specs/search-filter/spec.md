## ADDED Requirements

### Requirement: Free-Text Search
The application SHALL support client-side free-text search on todo titles.

#### Scenario: Title match
- **WHEN** the user types in the search input
- **THEN** only todos whose title contains the search string (case-insensitive) are shown

#### Scenario: Empty search
- **WHEN** the search input is cleared
- **THEN** all todos are shown again

### Requirement: Status and Priority Filters
The application SHALL provide dropdown filters for status and priority.

#### Scenario: Filter by status
- **WHEN** the user selects a status from the filter dropdown
- **THEN** only todos with that status are shown in the active view

#### Scenario: Filter by priority
- **WHEN** the user selects a priority from the filter dropdown
- **THEN** only todos with that priority are shown in the active view

#### Scenario: Combined filters
- **WHEN** multiple filter values are active simultaneously
- **THEN** only todos matching all active criteria are shown

#### Scenario: Reset filters
- **WHEN** the user clicks the reset button
- **THEN** all filter and search fields are cleared and all todos are shown
