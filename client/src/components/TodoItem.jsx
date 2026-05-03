import React from 'react';

function TodoItem({ todo, onStatusChange, onDelete }) {
  return (
    <div className={`todo-item ${todo.status === 'done' ? 'done' : ''}`}>
      <select
        className="status-dropdown"
        value={todo.status}
        onChange={(e) => onStatusChange(todo.id, e.target.value)}
        aria-label="Change status"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="review">Review</option>
        <option value="done">Done</option>
      </select>

      <span className="todo-title">{todo.title}</span>

      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
