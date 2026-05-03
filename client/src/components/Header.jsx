export function Header({ view, onViewChange }) {
  return (
    <header className="header">
      <h1>Todo App</h1>
      <nav className="nav">
        <button
          className={`nav-btn${view === 'tasks' ? ' active' : ''}`}
          onClick={() => onViewChange('tasks')}
        >Tasks</button>
        <button
          className={`nav-btn${view === 'statistics' ? ' active' : ''}`}
          onClick={() => onViewChange('statistics')}
        >Statistics</button>
      </nav>
    </header>
  );
}
