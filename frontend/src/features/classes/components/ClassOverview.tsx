import React from 'react';
import { BookOpen, CalendarDays, Clock3 } from 'lucide-react';
import type { Class, ClassSession } from '../types';
import type { User } from '../../shared/types';

interface ClassOverviewProps {
  classData: Class;
  instructor?: User | null;
  courseTitle?: string;
  sessions: ClassSession[];
}

const InfoRow: React.FC<{ label: string; value: string; hint?: string }> = ({ label, value, hint }) => (
  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{label}</p>
    <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
    {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
  </div>
);

export const ClassOverview: React.FC<ClassOverviewProps> = ({
  classData,
  instructor,
  courseTitle,
  sessions,
}) => {
  const upcomingSessions = sessions.filter((session) => session.status === 'scheduled').slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
          <BookOpen size={14} />
          Tóm tắt lớp học
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-700">{classData.description}</p>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <InfoRow label="Tên lớp" value={classData.name} />
          <InfoRow label="Khóa học" value={courseTitle ?? 'Chưa xác định'} />
          <InfoRow
            label="Giảng viên"
            value={instructor?.fullName ?? classData.instructorName}
            hint={instructor?.email ?? classData.instructorEmail}
          />
          <InfoRow label="Mã lớp" value={classData.code} />
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
          <CalendarDays size={14} />
          Buổi học sắp tới
        </div>

        <div className="mt-4 space-y-3">
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:border-gray-300"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">{session.title}</h3>
                    {session.description && (
                      <p className="mt-1 text-sm text-gray-600">{session.description}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <Clock3 size={16} />
                        {new Date(session.startTime).toLocaleDateString('vi-VN')}{' '}
                        {new Date(session.startTime).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {session.meetingLink && (
                    <button className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600" type="button">
                      Tham gia
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Không có buổi học sắp tới.</p>
          )}
        </div>
      </section>
    </div>
  );
};
