import React from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import type { AppPage, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  onGoHome?: () => void;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  user,
  activePage,
  onNavigate,
  onGoHome,
  onLogout,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex flex-row h-screen w-full overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar
        user={user}
        activePage={activePage}
        onNavigate={onNavigate}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Top Header */}
        <TopHeader
          user={user}
          onGoHome={onGoHome}
          onLogout={onLogout}
        />

        {/* Page Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
