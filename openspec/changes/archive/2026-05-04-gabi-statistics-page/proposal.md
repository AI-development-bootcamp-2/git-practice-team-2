## Why

The statistics page needs to be broken into concrete, ordered implementation tasks so Gabi has a clear step-by-step plan to follow. The spec exists but lacks a task-level breakdown.

## What Changes

- Install `recharts` as a client dependency
- Add `getStats()` to `client/src/services/api.js`
- Add navigation between Tasks view and Statistics view in `App.jsx`
- Create `StatisticsPage.jsx` with metric cards, loading spinner, and pie chart

## Capabilities

### New Capabilities
- `statistics-page-ui`: Full implementation of the Statistics page — navigation, metric cards with loading state, and recharts pie chart

### Modified Capabilities
- `client-setup`: App.jsx gains a view toggle between Tasks and Statistics

## Impact

- `client/src/services/api.js` — new `getStats()` call
- `client/src/components/App.jsx` — navigation state
- `client/src/components/StatisticsPage.jsx` — new component
- `package.json` (client) — new `recharts` dependency
