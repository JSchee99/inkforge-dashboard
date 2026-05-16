import React, { useState } from 'react';
import { HiMenu, HiCog, HiQuestionMarkCircle, HiChevronDown } from 'react-icons/hi';

const Header = ({ onMenuClick, pageTitle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-primary-500 text-white shadow-lg z-20">
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
          {/* Help Button */}
          <button
            className="p-2 hover:bg-primary-600 rounded-md transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 focus:outline-none"
            aria-label="Help and support"
          >
            <HiQuestionMarkCircle className="w-5 h-5" />
          </button>

          {/* Settings Button */}
          <button
            className="p-2 hover:bg-primary-600 rounded-md transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 focus:outline-none"
            aria-label="Open settings"
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
                  className="w-full text-left px-4 py-2 hover:bg-muted-100 transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-200 focus:outline-none"
                  role="menuitem"
                >
                  Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-muted-100 transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-200 focus:outline-none"
                  role="menuitem"
                >
                  Settings
                </button>
                <hr className="my-2" />
                <button
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
