import React from 'react';
import { HiPlay, HiEye } from 'react-icons/hi';
import { FaSync } from 'react-icons/fa';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import Button from '../common/Button';

const AgentStatusCard = ({
  agentName,
  status = 'pending',
  progress = 0,
  eta,
  description,
  onRetry,
  onViewLogs,
  onPause,
}) => {
  const statusMap = {
    running: { variant: 'active', label: 'Running', animate: true },
    completed: { variant: 'completed', label: 'Complete', animate: false },
    pending: { variant: 'pending', label: 'Pending', animate: false },
    failed: { variant: 'failed', label: 'Failed', animate: false },
  };

  const statusInfo = statusMap[status] || statusMap.pending;

  return (
    <Card
      title={agentName}
      subtitle={description}
      status={statusInfo.variant}
      className="hover:shadow-lg transition-shadow"
    >
      <div className="space-y-4">
        {/* Progress Bar */}
        {(status === 'running' || status === 'completed') && (
          <ProgressBar
            value={progress}
            max={100}
            label="Progress"
            animated={status === 'running'}
            color={status === 'completed' ? 'success' : 'primary'}
          />
        )}

        {/* ETA */}
        {eta && (
          <div className="bg-muted-100 rounded-md p-3">
            <p className="text-xs font-medium" style={{ color: '#000000' }}>ESTIMATED COMPLETION</p>
            <p className="text-sm font-mono text-primary-900 mt-1">{eta}</p>
          </div>
        )}

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge variant={statusInfo.variant} label={statusInfo.label} />
          {statusInfo.animate && (
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <p className="text-xs text-success">Active</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-muted-100">
          {status === 'failed' && (
            <Button
              variant="secondary"
              size="sm"
              icon={FaSync}
              onClick={onRetry}
            >
              Retry
            </Button>
          )}
          <Button
            variant="tertiary"
            size="sm"
            icon={HiEye}
            onClick={onViewLogs}
          >
            Logs
          </Button>
          {status === 'running' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onPause}
            >
              Pause
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AgentStatusCard;
