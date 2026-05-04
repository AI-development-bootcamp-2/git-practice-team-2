export function Header({ view, onViewChange }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-mark"></span>
          <h1 className="header-title">My Check List</h1>
        </div>
        <nav className="nav">
          <button
            className={`nav-btn${view === 'tasks' ? ' active' : ''}`}
            onClick={() => onViewChange('tasks')}
          >Tasks</button>
          <button
            className={`nav-btn${view === 'statistics' ? ' active' : ''}`}
            onClick={() => onViewChange('statistics')}
          >Stats</button>
        </nav>
      </div>
    </header>
  );
}
