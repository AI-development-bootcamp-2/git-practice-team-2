import React from 'react';

const PRIORITY_OPTIONS = [
  { label: 'All', value: null },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

function PriorityFilter({ value, onChange }) {
  return (
    <select
      className="priority-filter"
      value={value ?? ''}
      onChange={e => onChange(e.target.value || null)}
    >
      {PRIORITY_OPTIONS.map(opt => (
        <option key={opt.label} value={opt.value ?? ''}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default PriorityFilter;
