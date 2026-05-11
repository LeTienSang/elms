import React from 'react';
import { CalendarDays, Clock3, PlayCircle, Video } from 'lucide-react';
import type { ClassSession } from '../types';

interface ClassScheduleProps {
  sessions: ClassSession[];
}

const statusLabelMap: Record<ClassSession['status'], string> = {
  scheduled: 'Sắp tới',
  ongoing: 'Đang diễn ra',
  completed: 'Đã học',
};

const statusClassMap: Record<ClassSession['status'], string> = {
  scheduled: 'bg-blue-50 text-blue-600',
  ongoing: 'bg-amber-50 text-amber-700',
  completed: 'bg-emerald-50 text-emerald-600',
};

export const ClassSchedule: React.FC<ClassScheduleProps> = ({ sessions }) => {
  const orderedSessions = [...sessions].sort(
    (first, second) => new Date(first.startTime).getTime() - new Date(second.startTime).getTime(),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
        <CalendarDays size={14} />
        Nội dung buổi học
      </div>

      {orderedSessions.length > 0 ? (
        <div className="space-y-3">
          {orderedSessions.map((session) => (
            <article
              key={session.id}
              className="rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-gray-900">{session.title}</h3>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassMap[session.status]}`}>
                      {statusLabelMap[session.status]}
                    </span>
                  </div>

                  {session.description && (
                    <p className="mt-2 text-sm leading-6 text-gray-600">{session.description}</p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {new Date(session.startTime).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock3 size={16} />
                      {new Date(session.startTime).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {' - '}
                      {new Date(session.endTime).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  {session.meetingLink && (
                    <button className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600" type="button">
                      <Video size={16} />
                      Tham gia
                    </button>
                  )}

                  {session.recordingUrl && (
                    <button className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50" type="button">
                      <PlayCircle size={16} />
                      Xem ghi âm
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Chưa có nội dung buổi học.</p>
      )}
    </div>
  );
};
