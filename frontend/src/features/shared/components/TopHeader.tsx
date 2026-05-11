import React from 'react';
import { Bell, ChevronDown, Home } from 'lucide-react';
import { PRIMARY_RED } from '../constants';
import type { User } from '../types';

interface TopHeaderProps {
  user: User;
  onGoHome?: () => void;
  onLogout?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  user,
  onGoHome,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const roleLabelMap: Record<User['role'], string> = {
    guest: 'Guest',
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Admin',
  };

  const roleLabel = roleLabelMap[user.role];

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');
  };

  return (
    <header className="relative z-20 w-full shrink-0 min-w-0 border-b border-gray-200 bg-white h-16">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: PRIMARY_RED }}
          >
            E
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">ELMS</p>
            <p className="truncate text-xs text-gray-500">Learning management</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 sm:inline-flex"
              type="button"
            >
              <Home size={16} />
              Quay lại trang chủ
            </button>
          )}

          <button className="relative rounded-full p-2 transition-all hover:bg-gray-100" type="button">
            <Bell size={20} className="text-gray-600" />
            <span
              className="absolute right-1 top-1 h-2 w-2 rounded-full"
              style={{ backgroundColor: PRIMARY_RED }}
            ></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 transition-all hover:bg-gray-50"
              type="button"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user.fullName)
                )}
              </div>

              <div className="hidden text-left sm:block">
                <p className="max-w-45 truncate text-sm font-semibold text-gray-900">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500">{roleLabel}</p>
              </div>

              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{roleLabel}</p>
                </div>

                <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50" type="button">
                  Hồ sơ
                </button>
                <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50" type="button">
                  Cài đặt
                </button>
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                  type="button"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
