import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import KnowledgePage from "./components/KnowledgePage";
import KnowledgeDetailPage from "./components/KnowledgeDetailPage";
import ServicesPage from "./components/ServicesPage";
import CommunityPage from "./components/CommunityPage";
import ConsultationPage from "./components/ConsultationPage";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./components/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "knowledge", Component: KnowledgePage },
      { path: "knowledge/:id", Component: KnowledgeDetailPage },
      { path: "services", Component: ServicesPage },
      { path: "community", Component: CommunityPage },
      { path: "consultation", Component: ConsultationPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
  { path: "/login", Component: LoginPage },
]);