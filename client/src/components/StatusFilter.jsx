import React from 'react';

const STATUS_OPTIONS = [
  { label: 'All', value: null },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Review', value: 'review' },
  { label: 'Done', value: 'done' },
];

function StatusFilter({ value, onChange }) {
  return (
    <select
      className="status-filter"
      value={value ?? ''}
      onChange={e => onChange(e.target.value || null)}
    >
      {STATUS_OPTIONS.map(opt => (
        <option key={opt.label} value={opt.value ?? ''}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default StatusFilter;
