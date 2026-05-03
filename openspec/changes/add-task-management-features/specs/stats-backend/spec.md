## ADDED Requirements — Adi

### Requirement: Statistics Endpoint
The API SHALL provide an endpoint returning aggregate metrics across all todos.

#### Scenario: Get stats
- **WHEN** GET /api/todos/stats is called
- **THEN** a JSON object is returned with:
  - `total` — total number of todos
  - `byStatus` — count per status value (`todo`, `in-progress`, `review`, `done`)
  - `completionPct` — percentage of todos with status `done` (0–100, rounded to one decimal)

#### Scenario: Empty state
- **WHEN** GET /api/todos/stats is called and no todos exist
- **THEN** `total` is 0, all `byStatus` counts are 0, and `completionPct` is 0
