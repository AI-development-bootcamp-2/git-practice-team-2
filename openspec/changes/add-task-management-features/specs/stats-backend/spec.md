## ADDED Requirements — Adi

### Requirement: Statistics Endpoint
The API SHALL provide an endpoint returning aggregate metrics across all todos.

#### Response Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["total", "byStatus", "completionPct"],
  "additionalProperties": false,
  "properties": {
    "total": {
      "type": "integer",
      "minimum": 0,
      "description": "Total number of todos"
    },
    "byStatus": {
      "type": "object",
      "required": ["todo", "in-progress", "review", "done"],
      "additionalProperties": false,
      "description": "Count per status — all four keys always present, even when 0",
      "properties": {
        "todo":        { "type": "integer", "minimum": 0 },
        "in-progress": { "type": "integer", "minimum": 0 },
        "review":      { "type": "integer", "minimum": 0 },
        "done":        { "type": "integer", "minimum": 0 }
      }
    },
    "completionPct": {
      "type": "number",
      "minimum": 0,
      "maximum": 100,
      "description": "Percentage of todos with status `done`, rounded to one decimal place"
    }
  }
}
```

#### Scenario: Get stats
- **WHEN** GET /api/todos/stats is called
- **THEN** a 200 JSON response is returned with:
  - `total` — total number of todos
  - `byStatus` — count per status; all four keys (`todo`, `in-progress`, `review`, `done`) are always present, even when their count is 0
  - `completionPct` — percentage of todos with status `done` (0–100, rounded to one decimal)

#### Scenario: Empty state
- **WHEN** GET /api/todos/stats is called and no todos exist
- **THEN** `total` is 0, all `byStatus` counts are 0, and `completionPct` is 0
