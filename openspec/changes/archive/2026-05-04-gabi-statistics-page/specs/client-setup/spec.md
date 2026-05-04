## MODIFIED Requirements

### Requirement: App Navigation
The App component SHALL provide navigation between the Tasks view and the Statistics view.

#### Scenario: Switch to Statistics
- **WHEN** the user clicks the "Statistics" navigation item
- **THEN** the Statistics page is displayed and the Tasks view is hidden

#### Scenario: Switch to Tasks
- **WHEN** the user clicks the "Tasks" navigation item
- **THEN** the Tasks view is restored and the Statistics page is hidden

#### Scenario: Default view
- **WHEN** the app first loads
- **THEN** the Tasks view is shown by default
