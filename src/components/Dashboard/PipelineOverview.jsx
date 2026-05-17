import React from 'react';
import AgentStatusCard from './AgentStatusCard';
import Card from '../common/Card';

const PipelineOverview = ({ pipelineData = {} }) => {
  const agents = [
    {
      id: 'trend',
      name: 'Trend Analyzer',
      description: 'Identifies trending genres and themes',
      status: pipelineData.trend?.status || 'completed',
      progress: pipelineData.trend?.progress || 100,
      eta: pipelineData.trend?.eta || null,
    },
    {
      id: 'outline',
      name: 'Outline Generator',
      description: 'Creates chapter outline from concept',
      status: pipelineData.outline?.status || 'running',
      progress: pipelineData.outline?.progress || 65,
      eta: '~5 minutes',
    },
    {
      id: 'writer',
      name: 'Manuscript Writer',
      description: 'Writes manuscript chapters',
      status: pipelineData.writer?.status || 'pending',
      progress: pipelineData.writer?.progress || 0,
      eta: '~1 hour',
    },
    {
      id: 'cover',
      name: 'Cover Designer',
      description: 'Generates cover design variations',
      status: pipelineData.cover?.status || 'pending',
      progress: pipelineData.cover?.progress || 0,
      eta: '~30 minutes',
    },
    {
      id: 'blurb',
      name: 'Blurb Writer',
      description: 'Creates book description and marketing copy',
      status: pipelineData.blurb?.status || 'pending',
      progress: pipelineData.blurb?.progress || 0,
      eta: '~10 minutes',
    },
    {
      id: 'audio',
      name: 'Audio Producer',
      description: 'Generates audiobook narration',
      status: pipelineData.audio?.status || 'pending',
      progress: pipelineData.audio?.progress || 0,
      eta: '~45 minutes',
    },
    {
      id: 'publish',
      name: 'Publisher',
      description: 'Handles publishing to platforms',
      status: pipelineData.publish?.status || 'pending',
      progress: pipelineData.publish?.progress || 0,
      eta: '~15 minutes',
    },
    {
      id: 'social',
      name: 'Social Media Manager',
      description: 'Creates social media content and ads',
      status: pipelineData.social?.status || 'pending',
      progress: pipelineData.social?.progress || 0,
      eta: '~20 minutes',
    },
  ];

  const completedCount = agents.filter(a => a.status === 'completed').length;
  const runningCount = agents.filter(a => a.status === 'running').length;
  const failedCount = agents.filter(a => a.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Pipeline Summary */}
      <Card title="Pipeline Status" subtitle="Real-time agent monitoring">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{completedCount}</p>
            <p className="text-xs text-muted-600 uppercase mt-1">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">{runningCount}</p>
            <p className="text-xs text-muted-600 uppercase mt-1">Running</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-500">{agents.length - completedCount - runningCount}</p>
            <p className="text-xs text-muted-600 uppercase mt-1">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">{failedCount}</p>
            <p className="text-xs text-muted-600 uppercase mt-1">Failed</p>
          </div>
        </div>
      </Card>

      {/* Agent Grid */}
      <div>
        <h2 className="text-lg font-mono font-semibold text-primary-900 mb-4">Agents (8)</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {agents.map(agent => (
            <AgentStatusCard
              key={agent.id}
              agentName={agent.name}
              description={agent.description}
              status={agent.status}
              progress={agent.progress}
              eta={agent.eta}
              onRetry={() => alert(`Retrying ${agent.name}...`)}
              onViewLogs={() => alert(`Logs for ${agent.name}:\n\n[Agent logs would be displayed here]\n\nAgent ID: ${agent.id}\nStatus: ${agent.status}\nProgress: ${agent.progress}%`)}
              onPause={() => alert(`Paused ${agent.name}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineOverview;
