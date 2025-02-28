import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import { useParams, Navigate, Link } from "react-router-dom";
import { getContent, Section } from "../utils/content";
import Breadcrumb from "./Breadcrumb";

interface Page {
  id: string;
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  author: string;
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
  const prevPage = pages[currentIndex - 1];
  const nextPage = pages[currentIndex + 1];

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={page.keywords} />
        <meta name="author" content={page.author} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://docs.loosers.world/${page.id}`} />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={`https://docs.loosers.world/${page.id}`} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.metaTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
      </Helmet>

      <Breadcrumb sections={sections} currentPageId={page.id} />

      <article className="prose prose-invert max-w-none bg-secondary p-2 rounded-lg">
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).trim();

              if (!inline && match) {
                const language = match[1];
                if (Prism.languages[language]) {
                  try {
                    return (
                      <code
                        className={className}
                        dangerouslySetInnerHTML={{
                          __html: Prism.highlight(codeString, Prism.languages[language], language),
                        }}
                        {...props}
                      />
                    );
                  } catch (error) {
                    console.error(`Error highlighting ${language} code:`, error);
                  }
                }
              }

              return (
                <code className={`${inline ? "bg-[#2D2D2D] px-2 py-1 rounded text-sm text-purple-400" : "text-purple-400"} ${className || ""}`} {...props}>
                  {children}
                </code>
              );
            },
            pre({ children }) {
              return <pre className="bg-[#0A0A0A] rounded-xl p-6 overflow-x-auto my-6 border border-[#2D2D2D]">{children}</pre>;
            },
          }}
        >
          {page.content}
        </ReactMarkdown>
      </article>

      <div className="mt-8 pt-8 border-t border-[#1F1F1F] flex justify-between items-center">
        {prevPage && <NavLink to={`/${prevPage.id}`} direction="prev" title={prevPage.title} />}
        {nextPage && <NavLink to={`/${nextPage.id}`} direction="next" title={nextPage.title} />}
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
    <Link to={to} className="group flex flex-col space-y-1 text-gray-400 hover:text-purple-400">
      <span className="text-sm">{direction === "prev" ? "← Previous" : "Next →"}</span>
      <span className="font-medium group-hover:underline">{title}</span>
    </Link>
  );
}
