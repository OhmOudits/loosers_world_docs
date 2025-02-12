import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams, Navigate } from "react-router-dom";
import { Page, Chapter } from "../types";
import Breadcrumb from "./Breadcrumb";

interface PageContentProps {
  pages: Page[];
  chapters: Chapter[];
}

export default function PageContent({ pages, chapters }: PageContentProps) {
  const { pageId } = useParams();
  const page = pages.find((p) => p.id === pageId);

  if (!page) {
    return <Navigate to={`/${pages[0].id}`} replace />;
  }

  const currentIndex = pages.findIndex((p) => p.id === pageId);
  const prevPage = pages[currentIndex - 1];
  const nextPage = pages[currentIndex + 1];

  return (
    <div>
      <Breadcrumb chapters={chapters} currentPageId={page.id} />
      <article className="prose dark:prose-invert max-w-none prose-pre:p-0 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
        <div className="dark:text-white">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                return (
                  <code
                    className={`${
                      inline
                        ? "bg-gray-100 dark:bg-gray-700 rounded-sm text-sm"
                        : ""
                    } ${className || ""}`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre({ children }) {
                return (
                  <pre className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 overflow-x-auto my-6 border border-gray-200 dark:border-gray-700">
                    {children}
                  </pre>
                );
              },
            }}
          >
            {page.content}
          </ReactMarkdown>
        </div>
      </article>

      <div className="mt-8 pt-8 border-t dark:border-gray-700">
        <div className="flex justify-between items-center">
          {prevPage ? (
            <NavLink
              to={`/${prevPage.id}`}
              direction="prev"
              title={prevPage.title}
            />
          ) : (
            <div />
          )}
          {nextPage ? (
            <NavLink
              to={`/${nextPage.id}`}
              direction="next"
              title={nextPage.title}
            />
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
  direction: "prev" | "next";
  title: string;
}

function NavLink({ to, direction, title }: NavLinkProps) {
  return (
    <a
      href={to}
      className="group flex flex-col space-y-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    >
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {direction === "prev" ? "← Previous" : "Next →"}
      </span>
      <span className="font-medium group-hover:underline">{title}</span>
    </a>
  );
}
