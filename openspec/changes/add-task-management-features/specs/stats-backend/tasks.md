# Tasks: Statistics Backend

## 1. Service Layer

- [x] 1.1 Add `getStats()` to `server/src/services/todoService.js`
- [x] 1.2 Compute `total` as the count of all todos
- [x] 1.3 Compute `byStatus` with all four keys (`todo`, `in-progress`, `review`, `done`) always present
- [x] 1.4 Compute `completionPct` as `done / total * 100`, rounded to one decimal (return `0` when total is 0)

## 2. Route

- [ ] 2.1 Register `GET /api/todos/stats` in `server/src/routes/todos.js` **before** the `/:id` route
- [ ] 2.2 Call `todoService.getStats()` and return the result with status 200

## 3. Verification

- [ ] 3.1 Manually call the endpoint with existing todos and confirm all three fields match expected values
- [ ] 3.2 Clear todos.json to `[]` and confirm empty-state response (`total: 0`, all byStatus counts `0`, `completionPct: 0`)
