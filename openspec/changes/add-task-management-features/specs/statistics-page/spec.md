## ADDED Requirements

### Requirement: Page Navigation
The application SHALL provide navigation between the Tasks view and the Statistics view.

#### Scenario: Navigate to stats
- **WHEN** the user clicks the "Statistics" navigation item
- **THEN** the Statistics Page is displayed and the Tasks view is hidden

#### Scenario: Navigate back to tasks
- **WHEN** the user clicks the "Tasks" navigation item from the Statistics Page
- **THEN** the Tasks view is restored

### Requirement: Metric Cards
The Statistics Page SHALL display summary metric cards fetched from the server.

#### Scenario: Metric card display
- **WHEN** the Statistics Page is loaded
- **THEN** cards are shown for: Total todos, count per status, and completion percentage

#### Scenario: Live data
- **WHEN** the Statistics Page mounts
- **THEN** it fetches data from GET /api/todos/stats and populates metric cards with real values
