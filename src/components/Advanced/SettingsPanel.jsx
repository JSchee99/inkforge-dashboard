import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    autoRefresh: true,
    refreshInterval: 30,
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-mono font-bold text-primary-900">Settings</h2>

      {/* Display Settings */}
      <Card title="Display">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-primary-900 mb-2 block">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({...settings, theme: e.target.value})}
              className="w-full px-3 py-2 border border-muted-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Pipeline Settings */}
      <Card title="Pipeline Configuration">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-900">Auto-Refresh</p>
              <p className="text-xs text-muted-600">Automatically update agent status</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoRefresh}
              onChange={(e) => setSettings({...settings, autoRefresh: e.target.checked})}
              className="w-5 h-5"
            />
          </div>

          {settings.autoRefresh && (
            <div>
              <label className="text-sm font-medium text-primary-900 mb-2 block">Refresh Interval (seconds)</label>
              <input
                type="number"
                value={settings.refreshInterval}
                onChange={(e) => setSettings({...settings, refreshInterval: e.target.value})}
                className="w-full px-3 py-2 border border-muted-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                min="5"
                max="300"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Notifications */}
      <Card title="Notifications">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-900">Enable Notifications</p>
              <p className="text-xs text-muted-600">Alert on agent completion</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
              className="w-5 h-5"
            />
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="primary" onClick={() => console.log('Save settings')}>
          Save Settings
        </Button>
        <Button variant="ghost" onClick={() => console.log('Reset')}>
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
