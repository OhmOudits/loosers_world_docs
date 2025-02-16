import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import { Page, Chapter } from "../types";

interface LayoutProps {
  pages: Page[];
  chapters: Chapter[];
}

export default function Layout({ pages, chapters }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Page[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = pages.filter(
        (page) =>
          page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          page.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, pages]);

  const handleSearchSelect = (pageId: string) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/${pageId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-[#121212] transition-colors duration-200">
      <header 
      style={{
        background:
          "linear-gradient(to right, #0a0510, #0f0d0d, #121212,  #0f0d0d, #0a0510)",
      }}
      className="w-full fixed top-0 left-0 h-[70px] sm:h-[70px] md:h-[70px] z-50">
        <div className="max-w-[1440px] mx-auto px-4 flex justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSidebarOpen((p) => !p)}
              className="rounded-lg hover:bg-gray-100 dark:hover:bg-[#1d1d1d] lg:hidden"
            >
              <Menu className="w-5 h-5 dark:text-gray-200" />
            </button>
            <div className="flex items-center ml-1 mr-2">
              <img src="logo_.png" alt="LW" className="h-16 mt-1" />
              <span className="ml-1 text-2xl font-semibold dark:text-white">
                Docs
              </span>
            </div>
          </div>

          <div className="md:flex items-center flex-1 max-w-sm mx-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-bg-red dark:bg-[#1d1d1d] bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 max-h-96 overflow-y-auto">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSearchSelect(result.id)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      {result.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>


      <Sidebar
        chapters={chapters}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isDarkMode={isDarkMode}
      />

      {/* <main className="lg:pl-64 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main> */}
    </div>
  );
}
