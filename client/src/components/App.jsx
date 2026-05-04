import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import TodoList from './TodoList';
import KanbanBoard from './KanbanBoard';
import AddTodo from './AddTodo';
import '../App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await api.todos.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title) => {
    try {
      const newTodo = await api.todos.create(title);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      const newStatus = todo.status === 'done' ? 'todo' : 'done';
      const updated = await api.todos.update(id, { status: newStatus });
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.todos.delete(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await api.todos.update(id, { status: newStatus });
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Todo App</h1>
      </header>

      <main className="main">
        <AddTodo onAdd={handleAdd} />

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>x</button>
          </div>
        )}

        <div className="view-toggle">
          <button
            className={`view-toggle-btn${view === 'list' ? ' active' : ''}`}
            onClick={() => setView('list')}
          >
            List
          </button>
          <button
            className={`view-toggle-btn${view === 'board' ? ' active' : ''}`}
            onClick={() => setView('board')}
          >
            Board
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : view === 'board' ? (
          <KanbanBoard todos={todos} onStatusChange={handleStatusChange} />
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
