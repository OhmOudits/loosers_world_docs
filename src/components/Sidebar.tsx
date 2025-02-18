import { NavLink } from "react-router-dom";
import type { Section } from "../utils/content";

interface SidebarProps {
  onClose: () => void;
  sections: Section[];
}

export default function Sidebar({ onClose, sections }: SidebarProps) {
  const rootPages = sections[0].pages;
  const otherSections = sections.slice(1);

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 bg-[#0A0A0A] border-r border-[#1F1F1F]">
      <nav className="h-full mt-4 overflow-y-auto p-4">
        <ul className="space-y-1 mb-6">
          {rootPages.map((page) => (
            <li key={page.id}>
              <NavLink
                to={`/${page.id}`}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-purple-500/10 text-purple-400"
                      : "text-gray-400 hover:text-white hover:bg-[#1F1F1F]"
                  }`
                }
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
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-purple-500/10 text-purple-400"
                          : "text-gray-400 hover:text-white hover:bg-[#1F1F1F]"
                      }`
                    }
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
  );
}
