import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// Import specific language components
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import { useParams, Navigate, Link } from "react-router-dom";
import { getContent, Section } from "../utils/content";
import Breadcrumb from "./Breadcrumb";

interface Page {
  id: string;
  title: string;
  content: string;
}

const sections: Section[] = getContent();
const pages: Page[] = sections.flatMap((section) => section.pages);

export default function PageContent() {
  const { pageId } = useParams<{ pageId?: string }>();
  const page = pages.find((p) => p.id === pageId);

  useEffect(() => {
    Prism.highlightAll();
  }, [pageId]);

  if (!pageId || !page) {
    return <Navigate to={`/${pages[0]?.id || ""}`} replace />;
  }

  const currentIndex = pages.findIndex((p) => p.id === pageId);
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : undefined;
  const nextPage =
    currentIndex < pages.length - 1 ? pages[currentIndex + 1] : undefined;

  return (
    <div>
      <Breadcrumb sections={sections} currentPageId={page.id} />
      <article className="prose prose-invert max-w-none bg-secondary p-2 rounded-lg">
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).replace(/\n$/, "");

              if (!inline && match) {
                const language = match[1];
                // Check if language is supported before highlighting
                if (Prism.languages[language]) {
                  try {
                    const highlightedCode = Prism.highlight(
                      codeString,
                      Prism.languages[language],
                      language
                    );
                    return (
                      <code
                        className={className}
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                        {...props}
                      />
                    );
                  } catch (error) {
                    console.error(
                      `Error highlighting ${language} code:`,
                      error
                    );
                  }
                }
                // Fallback if language isn't loaded
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <code
                  className={`${
                    inline
                      ? "bg-[#2D2D2D] px-2 py-1 rounded text-sm text-purple-400"
                      : "text-purple-400"
                  } ${className || ""}`}
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
    <Link
      to={to}
      className="group flex flex-col space-y-1 text-gray-400 hover:text-purple-400"
    >
      <span className="text-sm">
        {direction === "prev" ? "← Previous" : "Next →"}
      </span>
      <span className="font-medium group-hover:underline">{title}</span>
    </Link>
  );
}
