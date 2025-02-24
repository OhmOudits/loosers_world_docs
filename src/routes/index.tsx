import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import PageContent from "../components/PageContent";
import { pages, chapters } from "../data/pages";
import { useEffect } from "react";

export default function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout pages={pages} chapters={chapters} />}>
        <Route index element={<Navigate to={`/${pages[0].id}`} replace />} />
        <Route
          path=":pageId"
          element={<PageContent pages={pages} chapters={chapters} />}
        />
      </Route>
    </Routes>
  );
}
