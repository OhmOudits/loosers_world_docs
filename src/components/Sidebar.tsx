// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { X, BookOpen } from "lucide-react";
// import { Chapter } from "../types";

// interface SidebarProps {
//   chapters: Chapter[];
//   isOpen: boolean;
//   onClose: () => void;
//   isDarkMode: boolean;
// }

// export default function Sidebar({ chapters, isOpen, onClose, isDarkMode }: SidebarProps) {
//   const handleNavClick = () => {
//     if (window.innerWidth < 1024) {
//       onClose();
//     }
//   };



//   return (
//     <div className="pt-16 fixed top-0 left-1/2 -translate-x-1/2 w-[1440px] h-full flex justify-between">
//       <aside
//         className={`w-64 h-full transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-lg`}
//       >
//         <nav className="h-full overflow-y-auto p-4">
//           {chapters.map((chapter) => (
//             <div key={chapter.id} className="mb-6">
//               <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 {chapter.title}
//               </h3>
//               <ul className="space-y-1">
//                 {chapter.pages.map((page) => (
//                   <li key={page.id}>
//                     <NavLink
//                       to={`/${page.id}`}
//                       onClick={handleNavClick}
//                       className={({ isActive }) =>
//                         `block px-4 py-2 rounded-lg transition-colors ${
//                           isActive
//                             ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
//                             : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//                         }`
//                       }
//                     >
//                       {page.title}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </nav>
//       </aside>
//       <main>
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <Outlet />
//         </div>
//       </main>
//       <div className="lg:pl-32">
//       </div>
//     </div>
//   );
// }

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { X, BookOpen } from "lucide-react";
import { Chapter } from "../types";

interface SidebarProps {
  chapters: Chapter[];
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function Sidebar({ chapters, isOpen, onClose, isDarkMode }: SidebarProps) {
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className="pt-14 fixed top-0 left-1/2 bg-[#121212] -translate-x-1/2 w-[1440px] h-[99%] flex overflow-hidden">
      <aside
        className={`w-80 rounded-lg mt-5 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} bg-white bg-[#1b1b1b] shadow-lg`}
      >
        <nav className="h-full p-4">
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
                            ? "text-blue-600 dark:text-[#064a44]"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:bg-[#074a44]"
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

      {/* <main>
         <div className="max-w-4xl mx-auto px-4 py-8">
           <Outlet />
         </div>
       </main> */}
      <main className="flex-1 px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}