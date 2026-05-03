# Change: Add Task Management Features

## Why
The current todo app supports only two statuses (todo/done) and lacks priority, due dates,
and richer UI views (Kanban, Statistics). Upgrading to a full task management model enables
teams to track work across a real workflow lifecycle and practice Git collaboration skills.

## What Changes
- **BREAKING** Extended status enum: `todo | in-progress | review | done` (replaces `todo | done`)
- **BREAKING** Server validation updated to accept new status values
- Added optional `priority` field (`low | medium | high`, default `medium`)
- Added optional `dueDate` field (ISO date string)
- Added optional `tags` array (name + color per tag)
- New GET /api/todos/stats endpoint returning aggregate metrics
- New Kanban Board view with one column per status
- New Statistics Page with metric cards and charts
- Search and filter capability (client-side, works in list and board)
- Due date picker with overdue highlighting
- Drag-and-drop between Kanban columns
- Inline title editing
- View toggle (list vs. board), preference held in memory
- Charts: pie by status, timeline of created/completed todos
- Advanced date-range filter applied to stats and charts
- Tag creation, assignment, and filter by tag

## Impact
- Affected specs: `todo-persistence`, `server-api`, `todo-components`
- New specs: `todo-data-model`, `server-api-v2`, `kanban-board`, `statistics-page`,
  `search-filter`, `due-date`, `priority`, `charts`, `tags`, `advanced-interactions`
- Affected code:
  - `server/src/services/todoService.js` — model fields + validation
  - `server/src/routes/todos.js` — stats endpoint, updated create/update validation
  - `client/src/` — new components, updated App state, recharts + dnd-kit dependencies
