## ADDED Requirements

### Requirement: Statistics Page Component
The application SHALL provide a Statistics page component that fetches and displays aggregate todo metrics.

#### Scenario: Page mounts and fetches data
- **WHEN** the Statistics page mounts
- **THEN** it calls `GET /api/todos/stats` and displays the result

#### Scenario: Loading state
- **WHEN** the stats fetch is in progress
- **THEN** a loading spinner is shown in place of the content

### Requirement: Metric Cards
The Statistics page SHALL display summary metric cards for all key stats.

#### Scenario: Cards rendered with data
- **WHEN** stats data has loaded
- **THEN** cards are shown for Total, count per status (todo / in-progress / review / done), and Completion %

### Requirement: Status Pie Chart
The Statistics page SHALL display a pie chart showing todo distribution by status using recharts.

#### Scenario: Pie chart with data
- **WHEN** at least one todo exists
- **THEN** a recharts PieChart renders with one segment per status, sized by count

#### Scenario: Empty state
- **WHEN** no todos exist
- **THEN** an empty-state message is shown instead of the chart

### Requirement: recharts Dependency
The client SHALL have recharts installed as a dependency.

#### Scenario: recharts available
- **WHEN** the Statistics page renders charts
- **THEN** it imports from the `recharts` package without error
