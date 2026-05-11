import React from 'react';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRIMARY_RED } from '../../features/shared/constants';
export const PublicHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white shadow-sm"
            style={{ backgroundColor: PRIMARY_RED }}
          >
            E
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">ELMS English Academy</p>
            <p className="truncate text-xs text-gray-500">English courses and exam prep</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/courses" className="text-sm font-medium text-gray-700 transition-colors hover:text-red-600">
            Courses
          </Link>
          <Link to="/instructors" className="text-sm font-medium text-gray-700 transition-colors hover:text-red-600">
            Instructors
          </Link>
        </nav>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700"
        >
          <LogIn size={16} />
          Login
        </Link>
      </div>
    </header>
  );
};
