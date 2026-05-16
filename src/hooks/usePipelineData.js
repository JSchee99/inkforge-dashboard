import { useState, useCallback, useEffect } from 'react';

export const usePipelineData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate fetching pipeline data from JSON files
  const loadPipelineData = useCallback(async (bookId = 1) => {
    setLoading(true);
    setError(null);

    try {
      // In production, this would load from actual JSON files
      // const response = await fetch(`/data/books/${bookId}/pipeline.json`);
      // const data = await response.json();

      // Mock data for now
      const mockData = {
        bookId,
        agents: [
          { id: 1, name: 'Trend Agent', status: 'completed', progress: 100 },
          { id: 2, name: 'Outline Agent', status: 'completed', progress: 100 },
          { id: 3, name: 'Writer Agent', status: 'running', progress: 65 },
          { id: 4, name: 'Cover Agent', status: 'pending', progress: 0 },
          { id: 5, name: 'Blurb Agent', status: 'pending', progress: 0 },
          { id: 6, name: 'Audio Agent', status: 'pending', progress: 0 },
          { id: 7, name: 'Publish Agent', status: 'pending', progress: 0 },
          { id: 8, name: 'Social Agent', status: 'pending', progress: 0 },
        ],
        lastUpdated: new Date().toISOString(),
      };

      setData(mockData);
      return mockData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh pipeline data
  const refresh = useCallback(() => {
    return loadPipelineData();
  }, [loadPipelineData]);

  // Load on mount
  useEffect(() => {
    loadPipelineData();
  }, [loadPipelineData]);

  return {
    data,
    loading,
    error,
    refresh,
    loadPipelineData,
  };
};

export default usePipelineData;
