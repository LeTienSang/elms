import React from 'react';
import { PublicHeader } from './PublicHeader';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white text-gray-900">
      <PublicHeader />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
};
