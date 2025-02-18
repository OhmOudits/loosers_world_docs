import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageContent from "../components/PageContent";
import { pages, chapters } from "../data/pages";

export default function AppRoutes() {
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
