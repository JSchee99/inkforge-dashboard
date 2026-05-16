import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import PipelineOverview from '../components/Dashboard/PipelineOverview';
import CurrentBookInfo from '../components/Dashboard/CurrentBookInfo';

const DashboardPage = () => {
  const [pipelineData, setPipelineData] = useState({});
  const [bookData, setBookData] = useState({
    title: 'Blood & Shadows',
    series: 'The Midnight Court',
    genre: 'Paranormal Romance',
    themes: ['Magic', 'Romance', 'Mystery'],
    protagonist: 'Iris Asher',
    antagonist: 'Dorian Shade',
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineData(prev => ({
        ...prev,
        outline: {
          status: 'running',
          progress: Math.min((prev.outline?.progress || 0) + Math.random() * 10, 100),
        },
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout currentPage="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <PipelineOverview pipelineData={pipelineData} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <CurrentBookInfo bookData={bookData} />
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
