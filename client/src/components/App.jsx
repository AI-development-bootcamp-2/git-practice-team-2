import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import KanbanBoard from './KanbanBoard';
import AddTodo from './AddTodo';
import FilterBar from './FilterBar';
import { StatisticsPage } from './StatisticsPage';
import { Header } from './Header';
import '../App.css';

function App() {
  const [view, setView] = useState('tasks');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);

  let visibleTodos = todos;
  if (searchTerm) visibleTodos = visibleTodos.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));
  if (filterStatus) visibleTodos = visibleTodos.filter(t => t.status === filterStatus);
  if (filterPriority) visibleTodos = visibleTodos.filter(t => t.priority === filterPriority);

  const hasActiveFilters = !!searchTerm || !!filterStatus || !!filterPriority;

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
      <Header view={view} onViewChange={setView} />

      <main className="main">
        {view === 'statistics' ? (
          <StatisticsPage />
        ) : (
          <>
            <AddTodo onAdd={handleAdd} />
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterStatus={filterStatus}
              onStatusChange={setFilterStatus}
              filterPriority={filterPriority}
              onPriorityChange={setFilterPriority}
            />

            {error && (
              <div className="error-message">
                {error}
                <button onClick={() => setError(null)}>x</button>
              </div>
            )}

            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <KanbanBoard
                todos={visibleTodos}
                hasActiveFilters={hasActiveFilters}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
