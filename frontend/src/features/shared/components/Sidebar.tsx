import React from 'react';
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  UsersRound,
} from 'lucide-react';
import { PRIMARY_RED } from '../constants';
import type { AppPage, User } from '../types';

interface SidebarProps {
  user: User;
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activePage,
  onNavigate,
  isCollapsed = false,
  setIsCollapsed,
}) => {
  const menuItems =
    user.role === 'guest'
      ? [
          { id: 'catalog' as AppPage, label: 'Danh mục khóa học', icon: BookOpen },
          { id: 'instructors' as AppPage, label: 'Góc giảng viên', icon: GraduationCap },
        ]
      : [
          { id: 'catalog' as AppPage, label: 'Danh mục khóa học', icon: BookOpen },
          { id: 'instructors' as AppPage, label: 'Góc giảng viên', icon: GraduationCap },
          { id: 'my-classes' as AppPage, label: 'Lớp học của tôi', icon: UsersRound },
          { id: 'schedule' as AppPage, label: 'Lịch học', icon: CalendarDays },
          { id: 'assignments' as AppPage, label: 'Bài tập & Điểm', icon: ClipboardList },
        ];

  const isItemActive = (page: AppPage) => {
    if (activePage === page) {
      return true;
    }

    if (activePage === 'class-detail' && page === 'my-classes') {
      return true;
    }

    return false;
  };

  return (
    <aside className={`relative h-full shrink-0 transition-all duration-300 z-50 bg-white border-r border-gray-200 overflow-y-auto flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo & Header */}
      <div className={`border-b border-gray-200 p-5 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: PRIMARY_RED }}
          >
            E
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900">ELMS</p>
              <p className="text-xs text-gray-500">Quản lý học tập</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        {!isCollapsed && (
          <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">
            Điều hướng
          </p>
        )}

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                  active
                    ? 'bg-red-50 text-red-600 ring-1 ring-red-100'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${isCollapsed ? 'justify-center' : 'gap-3'}`}
              >
                <Icon size={18} className="shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-gray-200 p-3">
        <button
          onClick={() => setIsCollapsed?.(!isCollapsed)}
          className="relative z-50 flex w-full items-center justify-center rounded-xl border border-gray-200 py-2 text-gray-600 transition-all hover:bg-gray-50"
          type="button"
        >
          {isCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>
    </aside>
  );
};
