import React from 'react';
import {
  ArrowRight,
  BookOpen,
  LogIn,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PRIMARY_RED } from '../../features/shared/constants';
import type { User } from '../../features/shared/types';

interface LoginPageProps {
  currentUser: User;
  loginUsers: User[];
  onLogin: (userId: string) => void;
}

const roleLabelMap: Record<User['role'], string> = {
  guest: 'Guest',
  student: 'Student',
  teacher: 'Teacher',
  admin: 'Admin',
};

const getInitials = (fullName: string) =>
  fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

export const LoginPage: React.FC<LoginPageProps> = ({ currentUser, loginUsers, onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (userId: string) => {
    onLogin(userId);
    navigate('/dashboard', { replace: true });
  };

  const featureItems = [
    {
      icon: BookOpen,
      title: 'Access course materials',
      description: 'Browse lessons, homework, and supporting resources in one dashboard.',
    },
    {
      icon: UsersRound,
      title: 'Track class progress',
      description: 'View class members, attendance, and learning activity at a glance.',
    },
    {
      icon: ShieldCheck,
      title: 'Role-based access',
      description: 'Student, teacher, and admin accounts follow their own workspace permissions.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_right,rgba(225,33,39,0.12),transparent_28%),linear-gradient(180deg,#fff7f4_0%,#ffffff_38%,#fff6f3_100%)] text-gray-900">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white shadow-sm"
            style={{ backgroundColor: PRIMARY_RED }}
          >
            E
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">ELMS English Academy</p>
            <p className="truncate text-xs text-gray-500">Sign in to your learning dashboard</p>
          </div>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-50"
        >
          Back to Home
        </Link>
      </div>

      <main className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-20 pt-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:pt-10">
        <section className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-600 shadow-sm">
            <Sparkles size={14} />
            Private access
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Sign in to continue your learning journey.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Choose a demo account to enter the LMS dashboard. Each role is configured to reflect the responsibilities of a real Student, Teacher, or Admin.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {featureItems.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm backdrop-blur">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <Icon size={20} />
                  </div>
                  <h2 className="mt-4 text-sm font-semibold text-gray-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                </article>
              );
            })}
          </div>

          {currentUser.role !== 'guest' && (
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Current session</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">You are already signed in as {currentUser.fullName}.</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                You can go straight to the dashboard or switch accounts below if you want to preview another role.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800"
                >
                  Enter Dashboard
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-2xl shadow-black/10">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Demo accounts</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">Select a profile</h2>
            </div>
            <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
              {loginUsers.length} options
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {loginUsers.map((loginUser) => (
              <button
                key={loginUser.id}
                type="button"
                onClick={() => handleLogin(loginUser.id)}
                className="flex items-start gap-3 rounded-3xl border border-gray-200 bg-gray-50 p-4 text-left transition-all hover:border-gray-300 hover:bg-white"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-200 text-sm font-semibold text-gray-700">
                  {loginUser.avatar ? (
                    <img src={loginUser.avatar} alt={loginUser.fullName} className="h-full w-full object-cover" />
                  ) : (
                    getInitials(loginUser.fullName)
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-gray-900">{loginUser.fullName}</p>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                      {roleLabelMap[loginUser.role]}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Continue as this profile to enter the dashboard and explore the role-specific workspace.
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-linear-to-br from-red-600 to-red-700 p-5 text-white">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <LogIn size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-100">What happens next</p>
                <p className="mt-2 text-sm leading-6 text-red-50">
                  After sign-in, you will be routed to the LMS dashboard with the matching permissions for your selected role.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
