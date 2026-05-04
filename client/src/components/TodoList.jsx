import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onStatusChange, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add one above!</p>
      </div>
    );
  }

  const sections = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'in-progress' },
    { title: 'Review', status: 'review' },
    { title: 'Done', status: 'done' }
  ];

  return (
    <div className="todo-list">
      {sections.map(section => {
        const sectionTodos = todos.filter(t => t.status === section.status);
        if (sectionTodos.length === 0) return null;

        return (
          <section key={section.status} className="todo-section">
            <h2>{section.title} ({sectionTodos.length})</h2>
            {sectionTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default TodoList;
