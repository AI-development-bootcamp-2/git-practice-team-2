import React from 'react';
import SearchBar from './SearchBar';
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';

function FilterBar({ searchTerm, onSearchChange, filterStatus, onStatusChange, filterPriority, onPriorityChange }) {
  return (
    <div className="filter-bar">
      <SearchBar value={searchTerm} onChange={onSearchChange} />
      <StatusFilter value={filterStatus} onChange={onStatusChange} />
      <PriorityFilter value={filterPriority} onChange={onPriorityChange} />
    </div>
  );
}

export default FilterBar;
