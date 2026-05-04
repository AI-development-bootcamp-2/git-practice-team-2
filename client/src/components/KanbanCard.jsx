import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { getNextStatus, getPrevStatus } from '../utils/status';

function KanbanCard({ todo, onStatusChange }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: todo.id,
    data: { status: todo.status },
  });

  const next = getNextStatus(todo.status);
  const prev = getPrevStatus(todo.status);

  return (
    <div
      ref={setNodeRef}
      className={`kanban-card${isDragging ? ' dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      <span className="kanban-card-title">{todo.title}</span>
      <div className="kanban-card-actions">
        {prev && (
          <button
            className="kanban-move-btn"
            onClick={() => onStatusChange(todo.id, prev)}
            aria-label="Move backward"
          >
            ←
          </button>
        )}
        {next && (
          <button
            className="kanban-move-btn"
            onClick={() => onStatusChange(todo.id, next)}
            aria-label="Move forward"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}

export default KanbanCard;
