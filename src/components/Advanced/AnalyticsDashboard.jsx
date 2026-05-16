import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const AnalyticsDashboard = () => {
  const metrics = [
    { label: 'Books Published', value: 0, trend: '↗ 3 planned' },
    { label: 'Total Chapters Written', value: 27, trend: '✓ On track' },
    { label: 'Design Variations', value: 3, trend: 'Primary selected' },
    { label: 'Marketing Assets', value: 8, trend: 'Ready to deploy' },
    { label: 'Average Agent Speed', value: '5.2 hrs', trend: '↓ Improving' },
    { label: 'Series Completion', value: '35%', trend: '→ In progress' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-mono font-bold text-primary-900">Publishing Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <Card key={i} title={metric.label}>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary-500">{metric.value}</p>
              <p className="text-sm text-muted-600">{metric.trend}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Chart Placeholder */}
      <Card title="Agent Performance">
        <div className="h-64 bg-muted-50 rounded-lg flex items-center justify-center">
          <p className="text-muted-600">Performance chart coming soon</p>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
