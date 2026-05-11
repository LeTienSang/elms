import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { MOCK_USERS } from './features/classes/mock';
import type { User } from './features/shared/types';
import { DashboardShell } from './pages/dashboard/DashboardShell';
import { LoginPage } from './pages/public/LoginPage';
import { LandingPage } from './pages/public/LandingPage';
import { PublicLayout } from './pages/public/PublicLayout';

const STORAGE_KEY = 'elms.currentUserId';

const GUEST_USER: User = {
  id: 'guest',
  username: 'guest',
  email: 'guest@elms.vn',
  fullName: 'Guest',
  role: 'guest',
  createdAt: '2026-04-05',
};

const readStoredUserId = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const getUserById = (userId: string | null) => {
  if (!userId) {
    return GUEST_USER;
  }

  return MOCK_USERS.find((user) => user.id === userId) ?? GUEST_USER;
};

function AppRouter({
  currentUser,
  loginUsers,
  setStoredUserId,
}: {
  currentUser: User;
  loginUsers: User[];
  setStoredUserId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const navigate = useNavigate();

  const handleLogin = (userId: string) => {
    setStoredUserId(userId);
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    setStoredUserId(null);
    navigate('/', { replace: true });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <LandingPage focusSection="hero" />
          </PublicLayout>
        }
      />
      <Route
        path="/courses"
        element={
          <PublicLayout>
            <LandingPage focusSection="courses" />
          </PublicLayout>
        }
      />
      <Route
        path="/instructors"
        element={
          <PublicLayout>
            <LandingPage focusSection="instructors" />
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={<LoginPage currentUser={currentUser} loginUsers={loginUsers} onLogin={handleLogin} />}
      />
      <Route
        path="/dashboard"
        element={
          currentUser.role === 'guest' ? (
            <Navigate to="/login" replace />
          ) : (
            <DashboardShell currentUser={currentUser} onGoHome={() => navigate('/')} onLogout={handleLogout} />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const [storedUserId, setStoredUserId] = React.useState<string | null>(readStoredUserId);
  const currentUser = React.useMemo(() => getUserById(storedUserId), [storedUserId]);
  const loginUsers = React.useMemo(() => MOCK_USERS.filter((user) => user.role !== 'guest'), []);

  React.useEffect(() => {
    try {
      if (storedUserId) {
        window.localStorage.setItem(STORAGE_KEY, storedUserId);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors in private browsing or blocked storage.
    }
  }, [storedUserId]);

  return (
    <BrowserRouter>
      <AppRouter currentUser={currentUser} loginUsers={loginUsers} setStoredUserId={setStoredUserId} />
    </BrowserRouter>
  );
}

export default App;
