import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [pipelineData, setPipelineData] = useState({
    agents: [
      { id: 1, name: 'Trend Agent', status: 'completed', progress: 100, eta: '0:00', description: 'Research trending genres' },
      { id: 2, name: 'Outline Agent', status: 'completed', progress: 100, eta: '0:00', description: 'Build series bible & outline' },
      { id: 3, name: 'Writer Agent', status: 'running', progress: 65, eta: '2:30', description: 'Write manuscript chapters' },
      { id: 4, name: 'Cover Agent', status: 'pending', progress: 0, eta: '—', description: 'Generate cover designs' },
      { id: 5, name: 'Blurb Agent', status: 'pending', progress: 0, eta: '—', description: 'Write back-cover blurb' },
      { id: 6, name: 'Audio Agent', status: 'pending', progress: 0, eta: '—', description: 'Audiobook script & voices' },
      { id: 7, name: 'Publish Agent', status: 'pending', progress: 0, eta: '—', description: 'Format & KDP submission' },
      { id: 8, name: 'Social Agent', status: 'pending', progress: 0, eta: '—', description: 'Social media content' },
    ],
    currentBook: {
      id: 1,
      title: 'Blood & Shadows',
      author: 'InkForge AI',
      genre: 'Paranormal Romance',
      themes: ['vampire fiction', 'college setting', 'paranormal powers'],
      characters: [
        { name: 'Iris Asher', role: 'Protagonist', age: 22 },
        { name: 'Dorian Shade', role: 'Love Interest', age: 347 },
        { name: 'Kira Chen', role: 'Best Friend', age: 22 },
      ],
      checkpointStatus: {
        cp1: 'approved',
        cp2: 'in_progress',
        cp3: 'pending',
        cp4: 'pending',
      },
      deadline: '2026-08-15',
    },
    series: {
      id: 1,
      name: 'The Midnight Court',
      books: 3,
      currentBook: 1,
      completion: 35,
    },
  });

  const [config, setConfig] = useState({
    pipelineName: 'InkForge Production Pipeline',
    autoApprove: false,
    enableNotifications: true,
    refreshInterval: 30,
    maxConcurrentAgents: 8,
    timeoutMinutes: 120,
    outputDirectory: '/output/books',
    enableLogging: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update single agent status
  const updateAgentStatus = useCallback((agentId, updates) => {
    setPipelineData(prev => ({
      ...prev,
      agents: prev.agents.map(agent =>
        agent.id === agentId ? { ...agent, ...updates } : agent
      ),
    }));
  }, []);

  // Update checkpoint status
  const updateCheckpointStatus = useCallback((checkpointId, status) => {
    setPipelineData(prev => ({
      ...prev,
      currentBook: {
        ...prev.currentBook,
        checkpointStatus: {
          ...prev.currentBook.checkpointStatus,
          [checkpointId]: status,
        },
      },
    }));
  }, []);

  // Update entire pipeline data
  const setPipeline = useCallback((data) => {
    setPipelineData(data);
  }, []);

  // Update configuration
  const updateConfig = useCallback((newConfig) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig,
    }));
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineData(prev => {
        const updatedAgents = [...prev.agents];
        const writerAgent = updatedAgents.find(a => a.id === 3);
        
        if (writerAgent && writerAgent.status === 'running' && writerAgent.progress < 100) {
          writerAgent.progress = Math.min(writerAgent.progress + Math.random() * 5, 100);
          if (writerAgent.progress >= 100) {
            writerAgent.status = 'completed';
            writerAgent.eta = '0:00';
          }
        }

        return { ...prev, agents: updatedAgents };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const value = {
    pipelineData,
    config,
    loading,
    error,
    updateAgentStatus,
    updateCheckpointStatus,
    setPipeline,
    updateConfig,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

export default DashboardContext;
