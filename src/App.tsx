import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import {
  BoardPage,
  BoardsPage,
  FeedPage,
  HomePage,
  NotFoundPage,
  SearchPage,
} from "./pages/Browse";
import { AuthPage, EditorPage } from "./pages/Forms";
import { ProfilePage, TopicPage } from "./pages/Topic";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="boards" element={<BoardsPage />} />
        <Route path="boards/:boardId" element={<BoardPage />} />
        <Route path="latest" element={<FeedPage key="latest" />} />
        <Route path="featured" element={<FeedPage featured key="featured" />} />
        <Route path="topics/:topicId" element={<TopicPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="login" element={<AuthPage />} />
        <Route path="register" element={<AuthPage register />} />
        <Route path="new" element={<EditorPage />} />
        <Route path="users/:userId" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
