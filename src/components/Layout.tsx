"use client";

import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { getContent } from "../utils/content";
import type { Page } from "../utils/content";

const sections = getContent();
const allPages = sections.flatMap((section) => section.pages);

export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Page[]>([]);
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarOpenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth < 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarOpenRef.current &&
        !sidebarOpenRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchResults(
      query.trim()
        ? allPages.filter(
            (page) =>
              page.title.toLowerCase().includes(query.toLowerCase()) ||
              page.content.toLowerCase().includes(query.toLowerCase())
          )
        : []
    );
  };

  const handleSearchSelect = (pageId: string) => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
    navigate(`/${pageId}`);
  };

  return (
    <div className="min-h-screen w-full bg-secondary text-[#D1D5DB]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-[auto_1fr] md:grid-cols-[16rem_1fr]">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 h-screen w-64 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 z-40`}
        >
          <div className="h-full">
            <div className="flex justify-end p-4 md:hidden">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-[#1F1F1F] text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <Sidebar onClose={() => setIsSidebarOpen(false)} sections={sections} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 border-b-[0.1px] border-[#1F1F1F] bg-secondary">
            <div className="max-w-[1440px] mx-auto h-16 flex items-center px-4 justify-between">
              <div className="flex items-center mr-4" ref={sidebarOpenRef}>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-[#1F1F1F] text-gray-400 hover:text-white md:hidden"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-2">
                  <img src="/logo.png" className="w-12 rounded-lg" alt="Logo" />
                  <span className="text-lg font-semibold text-white">Loosers World</span>
                </div>
              </div>
              <div className="hidden md:block w-1/3 max-w-[240px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-[#1F1F1F] text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-[#1F1F1F] text-gray-400 hover:text-white md:hidden"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Search Modal */}
          {isSearchOpen && (
            <>
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setIsSearchOpen(false)} />
              <div className="fixed top-[10%] left-0 right-0 z-50">
                <div className="max-w-2xl mx-auto p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documentation..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-[#1F1F1F] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                  {searchResults.length > 0 && (
                    <div className="mt-4 bg-[#1F1F1F] rounded-lg max-h-[60vh] overflow-y-auto">
                      {searchResults.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleSearchSelect(result.id)}
                          className="w-full text-left px-4 py-3 hover:bg-[#2D2D2D] text-gray-300 hover:text-white flex items-center space-x-2"
                        >
                          {result.icon && <result.icon className="w-4 h-4" />}
                          <span>{result.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Main Content */}
          <div className="pt-16 md:pl-64 bg-secondary w-[95vw] max-w-[1440px]">
            <main className="max-w-[1024px] min-h-screen mx-auto px-4 py-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
