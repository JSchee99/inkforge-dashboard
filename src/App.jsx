import React, { useState } from 'react';
import { DashboardProvider } from './context/DashboardContext';
import { ApprovalProvider } from './context/ApprovalContext';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Checkpoint1Outline from './components/Checkpoints/Checkpoint1Outline';
import Checkpoint2Manuscript from './components/Checkpoints/Checkpoint2Manuscript';
import Checkpoint3Designs from './components/Checkpoints/Checkpoint3Designs';
import Checkpoint4Marketing from './components/Checkpoints/Checkpoint4Marketing';
import SeriesList from './components/Series/SeriesList';
import SeriesChecklist from './components/Series/SeriesChecklist';
import CharacterWeb from './components/Series/CharacterWeb';
import SeriesTimeline from './components/Series/SeriesTimeline';
import ManuscriptBrowser from './components/ContentExplorer/ManuscriptBrowser';
import DesignGallery from './components/ContentExplorer/DesignGallery';
import AudioPlayer from './components/ContentExplorer/AudioPlayer';
import SocialContentLibrary from './components/ContentExplorer/SocialContentLibrary';
import AnalyticsDashboard from './components/Advanced/AnalyticsDashboard';
import SettingsPanel from './components/Advanced/SettingsPanel';
import ConfigurationForm from './components/Advanced/ConfigurationForm';
import './styles/globals.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedSeries, setSelectedSeries] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'checkpoint1':
        return <Checkpoint1Outline />;
      case 'checkpoint2':
        return <Checkpoint2Manuscript />;
      case 'checkpoint3':
        return <Checkpoint3Designs />;
      case 'checkpoint4':
        return <Checkpoint4Marketing />;
      case 'series':
        return <SeriesList onSelectSeries={(series) => {
          setSelectedSeries(series);
          setCurrentPage('series-detail');
        }} />;
      case 'series-detail':
        return (
          <div className="space-y-6">
            <SeriesTimeline />
            <SeriesChecklist seriesId={selectedSeries?.id} />
            <CharacterWeb seriesId={selectedSeries?.id} />
          </div>
        );
      case 'content-explorer':
        return (
          <div className="space-y-6">
            <ManuscriptBrowser />
            <DesignGallery />
            <AudioPlayer />
            <SocialContentLibrary />
          </div>
        );
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'settings':
        return (
          <div className="space-y-6">
            <SettingsPanel />
            <ConfigurationForm />
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardProvider>
      <ApprovalProvider>
        <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <div className="p-6">
            {renderPage()}
          </div>
        </MainLayout>
      </ApprovalProvider>
    </DashboardProvider>
  );
}

export default App;
