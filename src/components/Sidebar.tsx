import { NavLink } from "react-router-dom";
import type { Section } from "../utils/content";

interface SidebarProps {
  onClose: () => void;
  sections: Section[];
}

export default function Sidebar({ onClose, sections }: SidebarProps) {
  return (
    <aside className="fixed  left-0 z-40 w-64 h-screen pt-16 pb-8 pl-2 max-md:p-0">
      <nav className="h-full mt-4 overflow-y-auto p-4 bg-[#121212] pt-4 border-r border-[#1F1F1F] rounded-md">
        {sections.map((section, index) => (
          <div key={section.id} className="mb-6">
            {index > 0 && (
              <h3 className="mb-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <ul className="space-y-2">
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
