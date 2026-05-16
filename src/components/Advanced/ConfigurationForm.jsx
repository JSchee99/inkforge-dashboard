import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const ConfigurationForm = ({ onSave, initialConfig }) => {
  const [config, setConfig] = useState(initialConfig || {
    pipelineName: 'InkForge Production Pipeline',
    autoApprove: false,
    enableNotifications: true,
    refreshInterval: 30,
    maxConcurrentAgents: 8,
    timeoutMinutes: 120,
    outputDirectory: '/output/books',
    enableLogging: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(config);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setConfig(initialConfig || {
      pipelineName: 'InkForge Production Pipeline',
      autoApprove: false,
      enableNotifications: true,
      refreshInterval: 30,
      maxConcurrentAgents: 8,
      timeoutMinutes: 120,
      outputDirectory: '/output/books',
      enableLogging: true,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-mono font-bold text-primary-900">Pipeline Configuration</h2>

      <div className="grid grid-cols-1 gap-6">
        {/* General Settings */}
        <Card title="General Settings" subtitle="Pipeline name and basic configuration">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-900 mb-2">
                Pipeline Name
              </label>
              <input
                type="text"
                value={config.pipelineName}
                onChange={(e) => handleChange('pipelineName', e.target.value)}
                className="w-full px-3 py-2 border border-muted-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-900 mb-2">
                Output Directory
              </label>
              <input
                type="text"
                value={config.outputDirectory}
                onChange={(e) => handleChange('outputDirectory', e.target.value)}
                className="w-full px-3 py-2 border border-muted-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </Card>

        {/* Performance Settings */}
        <Card title="Performance Settings" subtitle="Agent and timeout configuration">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-900 mb-2">
                Max Concurrent Agents: {config.maxConcurrentAgents}
              </label>
              <input
                type="range"
                min="1"
                max="16"
                value={config.maxConcurrentAgents}
                onChange={(e) => handleChange('maxConcurrentAgents', parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-600 mt-1">
                Control how many agents can run simultaneously
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-900 mb-2">
                Agent Timeout (minutes): {config.timeoutMinutes}
              </label>
              <input
                type="range"
                min="30"
                max="480"
                step="30"
                value={config.timeoutMinutes}
                onChange={(e) => handleChange('timeoutMinutes', parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-600 mt-1">
                Max time allowed per agent before timeout
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-900 mb-2">
                Refresh Interval (seconds): {config.refreshInterval}
              </label>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={config.refreshInterval}
                onChange={(e) => handleChange('refreshInterval', parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-600 mt-1">
                How often to check for pipeline updates
              </p>
            </div>
          </div>
        </Card>

        {/* Behavior Settings */}
        <Card title="Behavior Settings" subtitle="Approval and notification preferences">
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.autoApprove}
                onChange={(e) => handleChange('autoApprove', e.target.checked)}
                className="w-4 h-4 rounded border-muted-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-muted-900">
                Auto-approve pipeline stages
              </span>
            </label>
            <p className="text-xs text-muted-600 ml-7">
              Automatically approve checkpoints without manual review
            </p>

            <label className="flex items-center gap-3 cursor-pointer mt-4">
              <input
                type="checkbox"
                checked={config.enableNotifications}
                onChange={(e) => handleChange('enableNotifications', e.target.checked)}
                className="w-4 h-4 rounded border-muted-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-muted-900">
                Enable notifications
              </span>
            </label>
            <p className="text-xs text-muted-600 ml-7">
              Get alerts when pipeline stages complete or fail
            </p>

            <label className="flex items-center gap-3 cursor-pointer mt-4">
              <input
                type="checkbox"
                checked={config.enableLogging}
                onChange={(e) => handleChange('enableLogging', e.target.checked)}
                className="w-4 h-4 rounded border-muted-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-muted-900">
                Enable detailed logging
              </span>
            </label>
            <p className="text-xs text-muted-600 ml-7">
              Store detailed logs for debugging and audit trails
            </p>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="primary"
            onClick={handleSave}
          >
            {saved ? '✓ Saved' : 'Save Configuration'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationForm;
