import React from 'react';
import { ClassAssignments } from './ClassAssignments';
import { ClassGrades } from './ClassGrades';
import { ClassOverview } from './ClassOverview';
import { ClassPeople } from './ClassPeople';
import { ClassSchedule } from './ClassSchedule';
import { PRIMARY_RED, TABS } from '../../shared/constants';
import type { User } from '../../shared/types';
import {
  MOCK_ASSIGNMENTS,
  MOCK_CLASS,
  MOCK_CLASSES,
  MOCK_CLASS_MEMBERS,
  MOCK_CLASS_SESSIONS,
  MOCK_COURSES_CATALOG,
  MOCK_SCORES,
  MOCK_SUBMISSIONS,
  MOCK_USERS,
} from '../mock/classData.ts';

interface ClassDetailProps {
  classId?: string;
  currentUser: User;
  onBack?: () => void;
}

export const ClassDetail: React.FC<ClassDetailProps> = ({
  classId,
  currentUser,
  onBack,
}) => {
  const [activeTab, setActiveTab] = React.useState<string>(TABS.OVERVIEW);

  const classData = React.useMemo(
    () => MOCK_CLASSES.find((item) => item.id === classId) ?? MOCK_CLASS,
    [classId],
  );
  const instructor = MOCK_USERS.find((user) => user.id === classData.instructorId) ?? null;
  const courseTitle = MOCK_COURSES_CATALOG.find((course) => course.id === classData.courseId)?.title;
  const isGuest = currentUser.role === 'guest';
  const classAssignments = MOCK_ASSIGNMENTS.filter((assignment) => assignment.classId === classData.id);
  const classAssignmentIds = new Set(classAssignments.map((assignment) => assignment.id));
  const classSubmissions = MOCK_SUBMISSIONS.filter((submission) => classAssignmentIds.has(submission.assignmentId));
  const classScores = MOCK_SCORES.filter((score) => classAssignmentIds.has(score.assignmentId));

  const tabItems = React.useMemo(() => {
    const baseTabs: Array<{ id: string; label: string }> = [
      { id: TABS.OVERVIEW, label: 'Tổng quan' },
      { id: TABS.CONTENT, label: 'Nội dung buổi học' },
      { id: TABS.PEOPLE, label: 'Mọi người' },
    ];

    if (!isGuest) {
      baseTabs.push(
        { id: TABS.ASSIGNMENTS, label: 'Bài tập' },
        { id: TABS.GRADES, label: 'Bảng điểm' },
      );
    }

    return baseTabs;
  }, [isGuest]);

  React.useEffect(() => {
    if (!tabItems.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabItems[0]?.id ?? TABS.OVERVIEW);
    }
  }, [activeTab, tabItems]);

  return (
    <div className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden bg-gray-50">
      <div className="w-full px-6 py-6 space-y-6 min-w-0">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                Thông tin lớp học
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{classData.name}</h1>
                <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  Đang hoạt động
                </span>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
                {classData.description}
              </p>
            </div>

            <button
              onClick={onBack}
              className="inline-flex self-start items-center rounded-full border-2 border-red-600 px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
              type="button"
            >
              ← Quay lại
            </button>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Mã lớp</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{classData.code}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Khóa học</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{courseTitle ?? 'Chưa xác định'}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Giảng viên phụ trách</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {instructor?.fullName ?? classData.instructorName}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {instructor?.email ?? classData.instructorEmail}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Số thành viên</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{classData.memberCount}</p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-4">
            <div className="flex flex-wrap gap-2">
              {tabItems.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white'
                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    style={isActive ? { backgroundColor: PRIMARY_RED, border: 'none' } : undefined}
                    type="button"
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {activeTab === TABS.OVERVIEW && (
              <ClassOverview
                classData={classData}
                instructor={instructor}
                courseTitle={courseTitle}
                sessions={MOCK_CLASS_SESSIONS.filter((session) => session.classId === classData.id)}
              />
            )}

            {activeTab === TABS.CONTENT && (
              <ClassSchedule sessions={MOCK_CLASS_SESSIONS.filter((session) => session.classId === classData.id)} />
            )}

            {activeTab === TABS.ASSIGNMENTS && (
              <ClassAssignments
                assignments={classAssignments}
                submissions={classSubmissions}
                userRole={currentUser.role}
              />
            )}

            {activeTab === TABS.PEOPLE && (
              <ClassPeople members={MOCK_CLASS_MEMBERS.filter((member) => member.classId === classData.id)} />
            )}

            {activeTab === TABS.GRADES && (
              <ClassGrades
                assignments={classAssignments}
                submissions={classSubmissions}
                scores={classScores}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
