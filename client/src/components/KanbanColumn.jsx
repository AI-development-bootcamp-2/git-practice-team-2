import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { STATUS_LABELS } from '../utils/status';
import KanbanCard from './KanbanCard';

function KanbanColumn({ status, todos, onStatusChange }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className={`kanban-column${isOver ? ' drop-over' : ''}`}>
      <div className="kanban-column-header">
        <span className="kanban-column-title">{STATUS_LABELS[status]}</span>
        <span className="kanban-column-count">{todos.length}</span>
      </div>
      <div ref={setNodeRef} className="kanban-column-body">
        {todos.map(todo => (
          <KanbanCard key={todo.id} todo={todo} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
