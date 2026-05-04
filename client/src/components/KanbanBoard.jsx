import React, { useState } from 'react';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { STATUS_ORDER } from '../utils/status';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';

function KanbanBoard({ todos, onStatusChange }) {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const activeTodo = activeId ? todos.find(t => t.id === activeId) : null;

  const todosByStatus = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = todos.filter(t => t.status === status);
    return acc;
  }, {});

  function handleDragStart({ active }) {
    setActiveId(active.id);
  }

  function handleDragEnd({ active, over }) {
    setActiveId(null);
    if (!over) return;

    const targetStatus = over.id;
    const currentStatus = active.data.current?.status;

    if (targetStatus === currentStatus) return;

    onStatusChange(active.id, targetStatus);
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {STATUS_ORDER.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            todos={todosByStatus[status]}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTodo && (
          <div className="kanban-card drag-overlay-card">
            <span className="kanban-card-title">{activeTodo.title}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;
