import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import type { Section } from "../utils/content";
import { X, Menu } from "lucide-react"; // Using Lucide icons

interface SidebarProps {
  sections: Section[];
}

export default function Sidebar({ sections }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootPages = sections[0].pages;
  const otherSections = sections.slice(1);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#1F1F1F] rounded-lg text-gray-400 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#0A0A0A] border-r border-[#1F1F1F] transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:h-auto md:w-64`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        <nav className="h-full mt-4 overflow-y-auto p-4">
          <ul className="space-y-1 mb-6">
            {rootPages.map((page) => (
              <li key={page.id}>
                <NavLink
                  to={`/${page.id}`}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-purple-500/10 text-purple-400"
                        : "text-gray-400 hover:text-white hover:bg-[#1F1F1F]"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <page.icon className="w-4 h-4" />
                  <span>{page.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {otherSections.map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="mb-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.pages.map((page) => (
                  <li key={page.id}>
                    <NavLink
                      to={`/${page.id}`}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-purple-500/10 text-purple-400"
                            : "text-gray-400 hover:text-white hover:bg-[#1F1F1F]"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <page.icon className="w-4 h-4" />
                      <span>{page.title}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
