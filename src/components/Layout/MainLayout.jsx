import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = ({ currentPage, setCurrentPage, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'checkpoint1', label: 'Checkpoint 1: Outline', icon: '📝' },
    { id: 'checkpoint2', label: 'Checkpoint 2: Manuscript', icon: '📖' },
    { id: 'checkpoint3', label: 'Checkpoint 3: Designs', icon: '🎨' },
    { id: 'checkpoint4', label: 'Checkpoint 4: Marketing', icon: '📢' },
    { id: 'series', label: 'Series Management', icon: '📚' },
    { id: 'content-explorer', label: 'Content Explorer', icon: '🔍' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-muted-50 dark:bg-slate-950">
      {/* Header */}
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        pageTitle={navigationItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            setSidebarOpen(false);
          }}
          onCloseSidebar={() => setSidebarOpen(false)}
          navigationItems={navigationItems}
        />

        {/* Main Content */}
        <main className="flex-1 pt-20 lg:ml-64">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
