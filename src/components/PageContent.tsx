import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Navigate } from 'react-router-dom';
import { getContent } from '../utils/content';
import Breadcrumb from './Breadcrumb';

const sections = getContent();
const pages = sections.flatMap(section => section.pages);

export default function PageContent() {
  const { pageId } = useParams();
  const page = pages.find((p) => p.id === pageId);
  
  if (!page) {
    return <Navigate to={`/${pages[0].id}`} replace />;
  }

  const currentIndex = pages.findIndex(p => p.id === pageId);
  const prevPage = pages[currentIndex - 1];
  const nextPage = pages[currentIndex + 1];

  return (
    <div>
      <Breadcrumb sections={sections} currentPageId={page.id} />
      <article className="prose prose-invert max-w-none bg-[#1F1F1F] p-8 rounded-lg">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              return (
                <code
                  className={`${inline ? 'bg-[#2D2D2D] px-2 py-1 rounded text-sm' : ''} ${className || ''}`}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            pre({ children }) {
              return (
                <pre className="bg-[#0A0A0A] rounded-xl p-6 overflow-x-auto my-6 border border-[#2D2D2D]">
                  {children}
                </pre>
              );
            },
          }}
        >
          {page.content}
        </ReactMarkdown>
      </article>

      <div className="mt-8 pt-8 border-t border-[#1F1F1F]">
        <div className="flex justify-between items-center">
          {prevPage ? (
            <NavLink to={`/${prevPage.id}`} direction="prev" title={prevPage.title} />
          ) : (
            <div />
          )}
          {nextPage ? (
            <NavLink to={`/${nextPage.id}`} direction="next" title={nextPage.title} />
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  to: string;
  direction: 'prev' | 'next';
  title: string;
}

function NavLink({ to, direction, title }: NavLinkProps) {
  return (
    <a
      href={to}
      className="group flex flex-col space-y-1 text-gray-400 hover:text-purple-400"
    >
      <span className="text-sm">
        {direction === 'prev' ? '← Previous' : 'Next →'}
      </span>
      <span className="font-medium group-hover:underline">{title}</span>
    </a>
  );
}