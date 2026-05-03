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

  const pieData = Object.entries(stats.byStatus).map(([status, count]) => ({
    name: STATUS_LABELS[status],
    value: count,
    color: STATUS_COLORS[status],
  }));

  return (
    <div className="statistics-page">
      <h2>Statistics</h2>

      <div className="metric-cards">
        <div className="metric-card">
          <span className="metric-value">{stats.total}</span>
          <span className="metric-label">Total</span>
        </div>
        {Object.entries(stats.byStatus).map(([status, count]) => (
          <div className="metric-card" key={status}>
            <span className="metric-value">{count}</span>
            <span className="metric-label">{STATUS_LABELS[status]}</span>
          </div>
        ))}
        <div className="metric-card">
          <span className="metric-value">{stats.completionPct}%</span>
          <span className="metric-label">Completion</span>
        </div>
      </div>

      {stats.total === 0 ? (
        <p className="empty-state">No todos yet — nothing to chart.</p>
      ) : (
        <PieChart width={300} height={300}>
          <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
            {pieData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
        </PieChart>
      )}
    </div>
  );
}
