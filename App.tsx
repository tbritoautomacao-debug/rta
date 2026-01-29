
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingWizard from './pages/OnboardingWizard';
import DashboardPage from './pages/DashboardPage';
import MenuEditorPage from './pages/MenuEditorPage';
import SettingsPage from './pages/SettingsPage';
import PublicMenuPage from './pages/PublicMenuPage';

const App: React.FC = () => {
  const { user, restaurant } = useStore();

  const isAuth = !!user;
  const isSetupDone = !!restaurant?.address;

  return (
    <HashRouter>
      <Routes>
        {/* Public Marketing */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth */}
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/cadastro" element={<AuthPage type="register" />} />
        
        {/* Public Digital Menu (Dynamic) */}
        <Route path="/m/:slug" element={<PublicMenuPage />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard/*" 
          element={
            !isAuth ? <Navigate to="/login" /> : 
            !isSetupDone ? <Navigate to="/onboarding" /> : 
            <DashboardLayout />
          } 
        >
          <Route index element={<DashboardPage />} />
          <Route path="cardapio" element={<MenuEditorPage />} />
          <Route path="configuracoes" element={<SettingsPage />} />
        </Route>

        {/* Onboarding */}
        <Route 
          path="/onboarding" 
          element={isAuth ? <OnboardingWizard /> : <Navigate to="/login" />} 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

// Internal Layout Component for Dashboard
import Sidebar from './components/Sidebar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="cardapio" element={<MenuEditorPage />} />
          <Route path="configuracoes" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
