import React, { useState } from 'react';
import { HiMenu, HiCog, HiQuestionMarkCircle, HiChevronDown, HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext.jsx';

const Header = ({ onMenuClick, pageTitle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleHelpClick = () => {
    alert('Help & Support\n\nFor assistance, contact support@inkforge.dev');
  };

  const handleSettingsClick = () => {
    alert('Settings panel is now available from the sidebar navigation');
  };

  const handleProfileClick = () => {
    alert('Profile management coming soon');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-primary-500 dark:bg-slate-800 text-white shadow-lg z-20">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Logo and Page Title */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-primary-600 rounded-md transition lg:hidden"
          >
            <HiMenu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-2xl font-mono font-bold">⚡ InkForge</span>
          </div>

          {/* Page Title */}
          <span className="text-lg font-semibold lg:border-l lg:border-primary-400 lg:pl-4">
            {pageTitle}
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-primary-600 rounded-md transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 focus:outline-none"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </button>

          {/* Help Button */}
          <button
            onClick={handleHelpClick}
            className="p-2 hover:bg-primary-600 rounded-md transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 focus:outline-none"
            aria-label="Help and support"
            title="Help"
          >
            <HiQuestionMarkCircle className="w-5 h-5" />
          </button>

          {/* Settings Button */}
          <button
            onClick={handleSettingsClick}
            className="p-2 hover:bg-primary-600 rounded-md transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 focus:outline-none"
            aria-label="Open settings"
            title="Settings"
          >
            <HiCog className="w-5 h-5" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-primary-600 rounded-md transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 focus:outline-none"
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <div className="w-8 h-8 bg-primary-300 rounded-full flex items-center justify-center font-bold text-primary-900">
                U
              </div>
              <HiChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white text-muted-900 rounded-md shadow-lg py-2"
                role="menu"
                aria-label="User options"
              >
                <button
                  onClick={handleProfileClick}
                  className="w-full text-left px-4 py-2 hover:bg-muted-100 transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-200 focus:outline-none"
                  role="menuitem"
                >
                  Profile
                </button>
                <button
                  onClick={handleSettingsClick}
                  className="w-full text-left px-4 py-2 hover:bg-muted-100 transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-200 focus:outline-none"
                  role="menuitem"
                >
                  Settings
                </button>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-muted-100 transition text-destructive-500 font-medium focus:ring-2 focus:ring-offset-2 focus:ring-destructive-200 focus:outline-none"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
