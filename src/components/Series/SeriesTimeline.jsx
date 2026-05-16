import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const SeriesTimeline = () => {
  const timeline = [
    {
      book: 1,
      title: 'Blood & Shadows',
      status: 'In Progress',
      completion: 35,
      chapters: 27,
      expectedDate: '2026-08-15',
      milestone: 'CP4 - Marketing Approval',
    },
    {
      book: 2,
      title: "Shadow's Reckoning",
      status: 'Planned',
      completion: 0,
      chapters: 28,
      expectedDate: '2026-11-15',
      milestone: 'Not Started',
    },
    {
      book: 3,
      title: 'Midnight Rising',
      status: 'Planned',
      completion: 0,
      chapters: 26,
      expectedDate: '2027-02-15',
      milestone: 'Not Started',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-mono font-bold text-primary-900">Series Timeline</h2>

      {/* Timeline Visualization */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-muted-200" />

        {/* Timeline Items */}
        <div className="space-y-6">
          {timeline.map((item, idx) => (
            <div key={item.book} className="relative pl-16">
              {/* Timeline Dot */}
              <div className={`
                absolute -left-2.5 top-2 w-5 h-5 rounded-full border-4 border-white
                ${item.status === 'In Progress' ? 'bg-primary-500' : 'bg-muted-300'}
              `} />

              {/* Card */}
              <Card title={`Book ${item.book}: ${item.title}`} subtitle={item.status}>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-muted-600 uppercase font-medium">Chapters</p>
                      <p className="text-lg font-bold text-primary-500 mt-1">{item.chapters}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-600 uppercase font-medium">Completion</p>
                      <p className="text-lg font-bold text-accent-500 mt-1">{item.completion}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-600 uppercase font-medium">Target Date</p>
                      <p className="text-sm font-mono text-primary-900 mt-1">{item.expectedDate}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-muted-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-400 h-full rounded-full"
                      style={{ width: `${item.completion}%` }}
                    />
                  </div>

                  {/* Milestone */}
                  <Badge
                    variant={item.status === 'In Progress' ? 'pending' : 'neutral'}
                    label={item.milestone}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Series Summary */}
      <Card title="Series Summary">
        <div className="space-y-2">
          <p className="text-sm text-muted-700">
            <strong>Total Books:</strong> 3 planned
          </p>
          <p className="text-sm text-muted-700">
            <strong>Total Chapters:</strong> 81 chapters
          </p>
          <p className="text-sm text-muted-700">
            <strong>Series Completion:</strong> 35% (Book 1 in progress)
          </p>
          <p className="text-sm text-muted-700">
            <strong>Expected Series End:</strong> Q1 2027
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SeriesTimeline;
