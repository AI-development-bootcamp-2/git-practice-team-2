## ADDED Requirements — Gabi

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
- **WHEN** the Statistics Page loads
- **THEN** cards are shown for: Total todos, count per status (4 statuses), and completion percentage

#### Scenario: Live data
- **WHEN** the Statistics Page mounts
- **THEN** it fetches from GET /api/todos/stats and populates metric cards with real values

#### Scenario: Loading state
- **WHEN** the fetch is in progress
- **THEN** a loading indicator is shown in place of the cards

### Requirement: Status Pie Chart
The Statistics Page SHALL display a pie chart showing the distribution of todos by status.

#### Scenario: Pie chart segments
- **WHEN** the Statistics Page is displayed and at least one todo exists
- **THEN** a pie chart renders with one segment per status, sized proportionally to its count

#### Scenario: Empty state
- **WHEN** no todos exist
- **THEN** the chart area shows an empty-state message instead of a chart

### Requirement: Chart Library
Charts SHALL be implemented using recharts.

#### Scenario: Recharts dependency
- **WHEN** charts are rendered
- **THEN** they use components from the `recharts` package installed as a client dependency
