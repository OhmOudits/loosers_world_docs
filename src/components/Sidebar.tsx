import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, BookOpen } from 'lucide-react';
import { Chapter } from '../types';

interface SidebarProps {
  chapters: Chapter[];
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function Sidebar({ chapters, isOpen, onClose, isDarkMode }: SidebarProps) {
  const handleNavClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 1024) { // 1024px is the lg breakpoint in Tailwind
      onClose();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 bg-white dark:bg-gray-900 border-r dark:border-gray-800`}
      >
        <nav className="h-full overflow-y-auto p-4">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="mb-6">
              <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {chapter.title}
              </h3>
              <ul className="space-y-1">
                {chapter.pages.map((page) => (
                  <li key={page.id}>
                    <NavLink
                      to={`/${page.id}`}
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      {page.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}