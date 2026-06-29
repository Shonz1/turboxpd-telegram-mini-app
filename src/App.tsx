import { Route, Routes } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { BackButtonRouter } from "@/telegram/BackButtonRouter";
import { ThemeSync } from "@/telegram/ThemeSync";
import { HomePage } from "@/pages/HomePage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SettingsPage } from "@/pages/SettingsPage";

export default function App() {
  return (
    <>
      <ThemeSync />
      <BackButtonRouter />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </>
  );
}
