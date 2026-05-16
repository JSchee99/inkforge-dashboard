import React, { useState } from 'react';
import Card from '../common/Card';

const SeriesChecklist = ({ seriesId = 1 }) => {
  const [checklist, setChecklist] = useState({
    'book1-outline': true,
    'book1-manuscript': true,
    'book1-cover': true,
    'book1-marketing': false,
    'book1-publish': false,
    'book2-outline': false,
    'book2-manuscript': false,
    'book3-outline': false,
  });

  const categories = [
    {
      name: 'Book 1: Blood & Shadows',
      items: [
        { id: 'book1-outline', label: 'Story Outline - APPROVED' },
        { id: 'book1-manuscript', label: 'Manuscript Draft - APPROVED' },
        { id: 'book1-cover', label: 'Cover Design - APPROVED' },
        { id: 'book1-marketing', label: 'Marketing Materials - PENDING' },
        { id: 'book1-publish', label: 'Publishing Setup - PENDING' },
      ],
    },
    {
      name: 'Book 2: Shadow\'s Reckoning',
      items: [
        { id: 'book2-outline', label: 'Story Outline - PLANNED' },
        { id: 'book2-manuscript', label: 'Manuscript Draft - PLANNED' },
      ],
    },
    {
      name: 'Book 3: Midnight Rising',
      items: [
        { id: 'book3-outline', label: 'Story Outline - PLANNED' },
      ],
    },
  ];

  const toggleItem = (itemId) => {
    setChecklist(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;

  return (
    <div className="space-y-6">
      <Card title="Series Checklist" subtitle={`${completedCount}/${totalCount} items complete`}>
        <div className="space-y-6">
          {categories.map(category => (
            <div key={category.name}>
              <h3 className="font-mono font-semibold text-primary-900 mb-3">{category.name}</h3>
              <div className="space-y-2 bg-muted-50 p-4 rounded-md">
                {category.items.map(item => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checklist[item.id] || false}
                      onChange={() => toggleItem(item.id)}
                      className="w-5 h-5 rounded accent-primary-500"
                    />
                    <span className={`
                      text-sm transition
                      ${checklist[item.id]
                        ? 'text-muted-600 line-through'
                        : 'text-primary-900 group-hover:text-primary-600'
                      }
                    `}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Summary */}
      <Card title="Progress Summary">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-600">Overall Completion</span>
            <span className="text-lg font-bold text-primary-900">{Math.round((completedCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full bg-muted-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-secondary-400 h-full rounded-full transition-all"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SeriesChecklist;
