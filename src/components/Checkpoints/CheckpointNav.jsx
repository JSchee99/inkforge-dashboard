import React from 'react';
import { HiCheckCircle } from 'react-icons/hi';

const CheckpointNav = ({ currentCheckpoint = 1, checkpointStatuses = {} }) => {
  const checkpoints = [
    { id: 1, label: 'Story Outline', status: checkpointStatuses[1] || 'ready' },
    { id: 2, label: 'Manuscript', status: checkpointStatuses[2] || 'pending' },
    { id: 3, label: 'Cover Designs', status: checkpointStatuses[3] || 'pending' },
    { id: 4, label: 'Marketing', status: checkpointStatuses[4] || 'pending' },
  ];

  const statusColors = {
    approved: 'bg-success text-white',
    pending: 'bg-muted-100 text-primary-900',
    ready: 'bg-accent-500 text-white',
    rejected: 'bg-destructive text-white',
  };

  return (
    <div className="bg-white border-b border-muted-100">
      <div className="flex overflow-x-auto">
        {checkpoints.map((cp, index) => (
          <div key={cp.id} className="flex items-center flex-1 min-w-max md:flex-none">
            {/* Checkpoint Tab */}
            <button className={`
              flex-1 px-4 py-4 text-center border-b-2 transition-all
              ${currentCheckpoint === cp.id
                ? 'border-primary-500 bg-primary-50 text-primary-900 font-semibold'
                : 'border-transparent text-muted-600 hover:bg-muted-50'
              }
            `}>
              <div className="flex items-center justify-center gap-2">
                <HiCheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{cp.label}</span>
                <span className="sm:hidden">CP {cp.id}</span>
              </div>
              <p className="text-xs mt-1 capitalize">{cp.status}</p>
            </button>

            {/* Connector Line */}
            {index < checkpoints.length - 1 && (
              <div className="hidden md:block w-8 h-0.5 bg-muted-200" />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-muted-100">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-400 transition-all duration-300"
          style={{ width: `${(currentCheckpoint / 4) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default CheckpointNav;
