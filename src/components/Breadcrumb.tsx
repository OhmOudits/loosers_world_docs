import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Section } from '../utils/content';

interface BreadcrumbProps {
  sections: Section[];
  currentPageId: string;
}

export default function Breadcrumb({ sections, currentPageId }: BreadcrumbProps) {
  const getCurrentPage = () => {
    for (const section of sections) {
      const page = section.pages.find(p => p.id === currentPageId);
      if (page) {
        return { section, page };
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
        className="text-gray-400 hover:text-purple-400"
      >
        Docs
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-600" />
      <span className="text-gray-400">{current.section.title}</span>
      <ChevronRight className="w-4 h-4 text-gray-600" />
      <span className="text-white font-medium">{current.page.title}</span>
    </nav>
  );
}