import { Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Layout from "../components/Layout";
import PageContent from "../components/PageContent";
import { chapters, pages } from "../data/pages";

export default function AppRoutes() {
  const location = useLocation();
  const { pageId } = useParams();
  const currentPage = pages.find((page) => page.id === pageId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{currentPage ? currentPage.title : "Loosers World"}</title>
        <meta
          name="description"
          content={currentPage ? `Learn more about ${currentPage.title}` : "Welcome to Loosers World"}
        />
      </Helmet>

      <Routes>
        <Route path="/" element={<Layout pages={pages} chapters={chapters} />}>
          <Route index element={<Navigate to={`/${pages[0].id}`} replace />} />
          <Route path=":pageId" element={<PageContent pages={pages} chapters={chapters} />} />
        </Route>
      </Routes>
    </>
  );
}
