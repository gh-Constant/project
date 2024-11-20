import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import BannedPage from './components/BannedPage';

function AppContent() {
  const { isAuthenticated, isAdmin, isBanned } = useAuth();

  if (isBanned) {
    return <BannedPage />;
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return isAdmin ? <AdminPanel /> : <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;