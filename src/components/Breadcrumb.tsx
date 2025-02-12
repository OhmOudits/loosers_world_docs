import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Chapter } from '../types';

interface BreadcrumbProps {
  chapters: Chapter[];
  currentPageId: string;
}

export default function Breadcrumb({ chapters, currentPageId }: BreadcrumbProps) {
  const getCurrentPage = () => {
    for (const chapter of chapters) {
      const page = chapter.pages.find(p => p.id === currentPageId);
      if (page) {
        return { chapter, page };
      }
    }
    return null;
  };

  const current = getCurrentPage();
  if (!current) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link
        to="/"
        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      >
        Docs
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-gray-500 dark:text-gray-400">{current.chapter.title}</span>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-gray-900 dark:text-white font-medium">{current.page.title}</span>
    </nav>
  );
}