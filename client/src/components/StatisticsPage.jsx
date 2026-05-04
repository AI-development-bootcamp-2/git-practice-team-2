import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { api } from '../services/api';

const STATUS_COLORS = {
  todo: '#94a3b8',
  'in-progress': '#3b82f6',
  review: '#f97316',
  done: '#22c55e',
};

const STATUS_LABELS = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  review: 'Review',
  done: 'Done',
};

export function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.stats.get()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  const pieData = Object.entries(stats.byStatus)
    .map(([status, count]) => ({
      name: STATUS_LABELS[status],
      value: count,
      color: STATUS_COLORS[status],
    }))
    .filter(d => d.value > 0);

  const completionPct = Math.round(stats.completionPct);

  return (
    <div className="statistics-page">
      <div className="stats-hero">
        <span className="stats-hero-number">{stats.total}</span>
        <span className="stats-hero-label">total tasks</span>
      </div>

      <div className="metric-cards">
        {Object.entries(stats.byStatus).map(([status, count]) => (
          <div
            className="metric-card"
            key={status}
            style={{ '--card-accent': STATUS_COLORS[status] }}
          >
            <span className="metric-value">{count}</span>
            <span className="metric-label">{STATUS_LABELS[status]}</span>
          </div>
        ))}
      </div>

      <div className="completion-card">
        <div className="completion-header">
          <span className="completion-label">Completion</span>
          <span className="completion-pct">{completionPct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${completionPct}%` }} />
        </div>
      </div>

      {stats.total === 0 ? (
        <p className="empty-state">No todos yet — nothing to chart.</p>
      ) : (
        <div className="chart-section">
          <div className="chart-wrapper">
            <PieChart width={240} height={240}>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                strokeWidth={0}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [value, name]}
                contentStyle={{
                  background: '#16213e',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '13px',
                }}
              />
            </PieChart>
          </div>
          <div className="chart-legend">
            {pieData.map(entry => (
              <div className="legend-item" key={entry.name}>
                <span className="legend-dot" style={{ background: entry.color }} />
                <span className="legend-name">{entry.name}</span>
                <span className="legend-count">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
