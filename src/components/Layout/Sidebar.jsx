import React from 'react';
import { HiX } from 'react-icons/hi';

const Sidebar = ({ isOpen, currentPage, onNavigate, navigationItems }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => onNavigate(currentPage)}
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-primary-900 dark:bg-slate-900 text-white pt-20
          transform transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:translate-x-0
        `}
        aria-label="Main navigation sidebar"
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={() => onNavigate(currentPage)}
          className="absolute top-20 right-4 lg:hidden p-2 hover:bg-primary-800 rounded-md transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 focus:outline-none"
          aria-label="Close navigation menu"
        >
          <HiX className="w-6 h-6" />
        </button>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2" role="navigation" aria-label="Main navigation links">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full text-left px-4 py-3 rounded-md transition-colors font-medium focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 focus:outline-none
                ${currentPage === item.id
                  ? 'bg-primary-700 text-white'
                  : 'text-primary-100 hover:bg-primary-800 hover:text-white'
                }
              `}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Status Indicator */}
        <div className="absolute bottom-6 left-4 right-4 p-4 bg-primary-800 rounded-md">
          <p className="text-xs text-primary-200 mb-2">Pipeline Status</p>
          <p className="text-lg font-bold text-success-300">✓ 8 Agents Active</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
