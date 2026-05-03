## ADDED Requirements

### Requirement: Status Pie Chart
The Statistics Page SHALL display a pie chart showing the distribution of todos by status.

#### Scenario: Pie chart segments
- **WHEN** the Statistics Page is displayed and at least one todo exists
- **THEN** a pie chart renders with one segment per status, sized proportionally to its count

#### Scenario: Empty state
- **WHEN** no todos exist
- **THEN** the pie chart area shows an empty-state message instead of a chart

### Requirement: Timeline Chart
The Statistics Page SHALL display a bar or line chart showing todos created and completed over time.

#### Scenario: Timeline data
- **WHEN** the Statistics Page is displayed
- **THEN** a bar or line chart renders with data points showing count of todos created and
  count completed per day (or week)

#### Scenario: Chart library
- **WHEN** charts are rendered
- **THEN** they are built using the `recharts` library imported as a client dependency
