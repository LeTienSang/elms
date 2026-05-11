import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Clock3,
  GraduationCap,
  Layers3,
  School,
  UsersRound,
} from 'lucide-react';
import { ClassDetail } from '../features/classes';
import type { AppPage, User } from '../features/shared/types';
import {
  MOCK_ASSIGNMENTS,
  MOCK_CLASSES,
  MOCK_CLASS_MEMBERS,
  MOCK_CLASS_SESSIONS,
  MOCK_COURSES_CATALOG,
  MOCK_INSTRUCTORS,
  MOCK_SCORES,
  MOCK_SUBMISSIONS,
  MOCK_USERS,
} from '../features/classes/mock/classData.ts';

interface PortalPageProps {
  page: AppPage;
  currentUser: User;
  selectedClassId: string | null;
  onOpenClass: (classId: string, sourcePage: AppPage) => void;
  onBackToPreviousPage: () => void;
}

const roleLabelMap: Record<User['role'], string> = {
  guest: 'Khách',
  student: 'Student',
  teacher: 'Teacher',
  admin: 'Admin',
};

const formatDate = (value: string) => new Date(value).toLocaleDateString('vi-VN');

const formatDateTime = (value: string) =>
  `${new Date(value).toLocaleDateString('vi-VN')} ${new Date(value).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

const StatCard = ({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) => (
  <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <Icon size={20} />
      </div>
    </div>
  </div>
);

const SectionHeading = ({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon: React.ElementType }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
      <Icon size={18} />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">{subtitle}</p>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
  </div>
);

export const PortalPage: React.FC<PortalPageProps> = ({
  page,
  currentUser,
  selectedClassId,
  onOpenClass,
  onBackToPreviousPage,
}) => {
  const [selectedCourseId, setSelectedCourseId] = React.useState(MOCK_COURSES_CATALOG[0]?.id ?? '');

  const userClassIds = React.useMemo(() => {
    if (currentUser.role === 'guest') {
      return [];
    }

    if (currentUser.role === 'student') {
      return MOCK_CLASS_MEMBERS.filter(
        (member) => member.userId === currentUser.id && member.role === 'student',
      ).map((member) => member.classId);
    }

    return MOCK_CLASSES.filter((classItem) => classItem.instructorId === currentUser.id).map((classItem) => classItem.id);
  }, [currentUser]);

  const visibleClasses = React.useMemo(
    () => MOCK_CLASSES.filter((classItem) => userClassIds.includes(classItem.id)),
    [userClassIds],
  );

  const currentCourse = React.useMemo(
    () => MOCK_COURSES_CATALOG.find((course) => course.id === selectedCourseId) ?? MOCK_COURSES_CATALOG[0],
    [selectedCourseId],
  );

  const openClassesByCourse = React.useMemo(
    () => MOCK_CLASSES.filter((classItem) => classItem.courseId === currentCourse?.id && classItem.status === 'active'),
    [currentCourse],
  );

  const instructorCards = React.useMemo(
    () =>
      MOCK_INSTRUCTORS.map((instructor) => {
        const taughtClasses = MOCK_CLASSES.filter((classItem) => classItem.instructorId === instructor.userId);
        const user = MOCK_USERS.find((item) => item.id === instructor.userId) ?? null;

        return {
          ...instructor,
          taughtClasses,
          user,
        };
      }),
    [],
  );

  const upcomingSessions = React.useMemo(() => {
    const relevantClassIds = currentUser.role === 'guest' ? MOCK_CLASSES.map((classItem) => classItem.id) : userClassIds;

    return MOCK_CLASS_SESSIONS.filter((session) => relevantClassIds.includes(session.classId))
      .sort((first, second) => new Date(first.startTime).getTime() - new Date(second.startTime).getTime())
      .slice(0, 8);
  }, [currentUser.role, userClassIds]);

  const assignmentRows = React.useMemo(() => {
    const relevantClassIds = currentUser.role === 'guest' ? [] : userClassIds;
    const relevantAssignments = MOCK_ASSIGNMENTS.filter((assignment) => relevantClassIds.includes(assignment.classId));

    return relevantAssignments
      .map((assignment) => {
        const submission =
          currentUser.role === 'student'
            ? MOCK_SUBMISSIONS.find((item) => item.assignmentId === assignment.id && item.studentId === currentUser.id) ?? null
            : MOCK_SUBMISSIONS.find((item) => item.assignmentId === assignment.id) ?? null;

        const score =
          currentUser.role === 'student'
            ? MOCK_SCORES.find((item) => item.assignmentId === assignment.id && item.studentId === currentUser.id) ?? null
            : MOCK_SCORES.find((item) => item.assignmentId === assignment.id) ?? null;

        return {
          assignment,
          submission,
          score,
          className: MOCK_CLASSES.find((classItem) => classItem.id === assignment.classId)?.name ?? 'Lớp học',
        };
      })
      .sort((first, second) => new Date(second.assignment.createdAt).getTime() - new Date(first.assignment.createdAt).getTime())
      .slice(0, 10);
  }, [currentUser.id, currentUser.role, userClassIds]);

  if (page === 'class-detail') {
    return (
      <ClassDetail
        classId={selectedClassId ?? MOCK_CLASSES[0]?.id}
        currentUser={currentUser}
        onBack={onBackToPreviousPage}
      />
    );
  }

  if (page === 'catalog') {
    return (
      <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-gray-50">
        <div className="space-y-6 px-6 py-6">
          <SectionHeading title="Danh mục khóa học" subtitle="Khám phá" icon={BookOpen} />

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="grid gap-3 lg:grid-cols-2">
                {MOCK_COURSES_CATALOG.map((course) => {
                  const isActive = course.id === currentCourse?.id;
                  const relatedClasses = MOCK_CLASSES.filter((classItem) => classItem.courseId === course.id && classItem.status === 'active');
                  const instructor = instructorCards.find((item) => item.id === course.instructorId);

                  return (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => setSelectedCourseId(course.id)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        isActive ? 'border-red-200 bg-red-50 shadow-sm' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{course.code}</p>
                          <h3 className="mt-1 text-lg font-semibold text-gray-900">{course.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-gray-600">{course.description}</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                          {relatedClasses.length} lớp
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="rounded-full bg-white px-3 py-1">{course.level}</span>
                        <span className="rounded-full bg-white px-3 py-1">{course.durationWeeks} tuần</span>
                        <span className="rounded-full bg-white px-3 py-1">
                          {instructor?.user?.fullName ?? 'Giảng viên'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Lớp học đang mở</p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">{currentCourse?.title}</h3>
                </div>
                <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  {openClassesByCourse.length} lớp
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {openClassesByCourse.length > 0 ? (
                  openClassesByCourse.map((classItem) => {
                    const instructor = MOCK_USERS.find((user) => user.id === classItem.instructorId);

                    return (
                      <article key={classItem.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{classItem.code}</p>
                            <h4 className="mt-1 text-base font-semibold text-gray-900">{classItem.name}</h4>
                            <p className="mt-1 text-sm leading-6 text-gray-600">{classItem.description}</p>
                            <p className="mt-3 text-xs text-gray-500">Giảng viên: {instructor?.fullName ?? classItem.instructorName}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => onOpenClass(classItem.id, 'catalog')}
                            className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600"
                          >
                            Xem lớp
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">Chưa có lớp mở cho khóa học này.</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'instructors') {
    return (
      <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-gray-50">
        <div className="space-y-6 px-6 py-6">
          <SectionHeading title="Góc giảng viên" subtitle="Nhân sự giảng dạy" icon={GraduationCap} />

          <div className="grid gap-4 xl:grid-cols-2">
            {instructorCards.map((instructor) => (
              <article key={instructor.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <img
                    src={instructor.user?.avatar || 'https://via.placeholder.com/48'}
                    alt={instructor.fullName}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{instructor.fullName}</h3>
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                        {instructor.expertise}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{instructor.email}</p>
                    <p className="mt-1 text-sm text-gray-500">Phụ trách {instructor.courseCount} khóa học</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Lớp đang phụ trách</p>
                  <div className="mt-3 space-y-2">
                    {instructor.taughtClasses.length > 0 ? (
                      instructor.taughtClasses.map((classItem) => (
                        <div key={classItem.id} className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{classItem.name}</p>
                            <p className="text-xs text-gray-500">{classItem.code}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onOpenClass(classItem.id, 'instructors')}
                            className="text-sm font-medium text-red-600 transition-colors hover:text-red-700"
                          >
                            Mở lớp
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">Chưa có lớp được gán.</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (page === 'my-classes') {
    const classesToShow = visibleClasses;

    return (
      <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-gray-50">
        <div className="space-y-6 px-6 py-6">
          <SectionHeading title="Lớp học của tôi" subtitle="LMS" icon={UsersRound} />

          {currentUser.role === 'guest' ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-900">Bạn cần đăng nhập để xem các lớp của mình.</p>
              <p className="mt-2 text-sm text-gray-500">Sidebar sẽ mở đầy đủ sau khi đăng nhập bằng tài khoản Student.</p>
            </div>
          ) : classesToShow.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {classesToShow.map((classItem) => {
                const course = MOCK_COURSES_CATALOG.find((item) => item.id === classItem.courseId);
                const instructor = MOCK_USERS.find((item) => item.id === classItem.instructorId);

                return (
                  <article key={classItem.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{classItem.code}</p>
                        <h3 className="mt-1 text-lg font-semibold text-gray-900">{classItem.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{classItem.description}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenClass(classItem.id, 'my-classes')}
                        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-700"
                      >
                        Xem lớp
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <StatCard label="Khóa học" value={course?.title ?? 'N/A'} icon={Layers3} />
                      <StatCard label="Giảng viên" value={instructor?.fullName ?? classItem.instructorName} icon={School} />
                      <StatCard label="Thành viên" value={`${classItem.memberCount}`} icon={UsersRound} />
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-900">Chưa có lớp học nào.</p>
              <p className="mt-2 text-sm text-gray-500">Nếu là Student, hãy đảm bảo bạn có mặt trong bảng CLASS_MEMBERS.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (page === 'schedule') {
    return (
      <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-gray-50">
        <div className="space-y-6 px-6 py-6">
          <SectionHeading title="Lịch học" subtitle="Sessions" icon={CalendarDays} />

          <div className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => {
                const classItem = MOCK_CLASSES.find((item) => item.id === session.classId);
                return (
                  <article key={session.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-gray-900">{session.title}</h3>
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                            {classItem?.code ?? 'Lớp'}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{session.description}</p>
                        <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                          <Clock3 size={16} />
                          {formatDateTime(session.startTime)}
                          {' - '}
                          {new Date(session.endTime).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenClass(session.classId, 'schedule')}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
                      >
                        Mở lớp
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
                <p className="text-lg font-semibold text-gray-900">Chưa có buổi học nào.</p>
                <p className="mt-2 text-sm text-gray-500">Hãy đăng nhập để xem lịch học được cá nhân hóa.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (page === 'assignments') {
    return (
      <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-gray-50">
        <div className="space-y-6 px-6 py-6">
          <SectionHeading title="Bài tập & Điểm" subtitle="Assignments" icon={ClipboardList} />

          <div className="grid gap-4 xl:grid-cols-2">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-gray-900">Bài tập</h3>
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  {assignmentRows.length}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {assignmentRows.length > 0 ? (
                  assignmentRows.map(({ assignment, submission, score, className }) => (
                    <article key={assignment.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-base font-semibold text-gray-900">{assignment.title}</h4>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600">
                              {className}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-gray-600">{assignment.description}</p>
                          <p className="mt-3 text-sm text-gray-500">
                            Hạn nộp: <span className="font-semibold text-gray-900">{formatDate(assignment.dueDate)}</span>
                          </p>
                        </div>

                        {currentUser.role === 'student' && !submission ? (
                          <button className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600" type="button">
                            Nộp bài
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                            <BadgeCheck size={14} />
                            {submission ? 'Đã nộp' : 'Chưa nộp'}
                          </span>
                        )}
                      </div>

                      {submission && (
                        <div className="mt-4 rounded-xl bg-white p-4 text-sm text-gray-600">
                          <p>
                            <span className="font-semibold text-gray-900">Bài nộp:</span> {submission.content}
                          </p>
                          {score && (
                            <p className="mt-2">
                              <span className="font-semibold text-gray-900">Điểm:</span> {score.points}/100 - {score.feedback}
                            </p>
                          )}
                        </div>
                      )}
                    </article>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Không có bài tập phù hợp.</p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-gray-900">Điểm số</h3>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {assignmentRows.filter((row) => row.score).length}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {assignmentRows.filter((row) => row.score).length > 0 ? (
                  assignmentRows
                    .filter((row) => row.score)
                    .map(({ assignment, score, className }) => (
                      <article key={assignment.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900">{assignment.title}</p>
                            <p className="mt-1 text-xs text-gray-500">{className}</p>
                            <p className="mt-3 text-sm text-gray-600">{score?.feedback || 'Chưa có nhận xét.'}</p>
                          </div>
                          <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Điểm</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">{score?.points ?? '-'}</p>
                          </div>
                        </div>
                      </article>
                    ))
                ) : (
                  <p className="text-sm text-gray-500">Chưa có điểm nào.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-gray-50">
      <div className="space-y-6 px-6 py-6">
        <section className="rounded-[28px] border border-gray-200 bg-linear-to-br from-white via-white to-red-50 p-6 shadow-sm">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gray-500">ELMS Portal</p>
              <h1 className="mt-3 text-3xl font-bold text-gray-900">
                Quản lý học tập trong một luồng liền mạch.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
                Kết hợp Landing Page và LMS từ cùng một nguồn dữ liệu: USERS, COURSES_CATALOG,
                CLASSES, CLASS_SESSIONS, ASSIGNMENTS, SUBMISSIONS và SCORES.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                  {roleLabelMap[currentUser.role]}
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                  {currentUser.fullName}
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                  {visibleClasses.length} lớp khả dụng
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
              <StatCard label="Khóa học" value={`${MOCK_COURSES_CATALOG.length}`} icon={BookOpen} />
              <StatCard label="Giảng viên" value={`${MOCK_INSTRUCTORS.length}`} icon={GraduationCap} />
              <StatCard label="Lớp mở" value={`${MOCK_CLASSES.filter((classItem) => classItem.status === 'active').length}`} icon={Layers3} />
              <StatCard label="Buổi học" value={`${MOCK_CLASS_SESSIONS.length}`} icon={CalendarDays} />
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <SectionHeading title="Danh mục khóa học" subtitle="Landing" icon={BookOpen} />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {MOCK_COURSES_CATALOG.map((course) => {
                const isActive = course.id === currentCourse?.id;
                const relatedClasses = MOCK_CLASSES.filter((classItem) => classItem.courseId === course.id && classItem.status === 'active');
                const instructor = instructorCards.find((item) => item.id === course.instructorId);

                return (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => setSelectedCourseId(course.id)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      isActive ? 'border-red-200 bg-red-50 shadow-sm' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{course.code}</p>
                        <h3 className="mt-1 text-base font-semibold text-gray-900">{course.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{course.description}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                        {relatedClasses.length}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                      <span className="rounded-full bg-white px-3 py-1">{course.level}</span>
                      <span className="rounded-full bg-white px-3 py-1">{course.durationWeeks} tuần</span>
                      <span className="rounded-full bg-white px-3 py-1">
                        {instructor?.user?.fullName ?? 'Giảng viên'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <SectionHeading title="Góc giảng viên" subtitle="Preview" icon={GraduationCap} />
            <div className="mt-4 space-y-3">
              {instructorCards.slice(0, 3).map((instructor) => (
                <article key={instructor.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={instructor.user?.avatar || 'https://via.placeholder.com/48'}
                      alt={instructor.fullName}
                      className="h-12 w-12 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-gray-900">{instructor.fullName}</h3>
                      <p className="truncate text-xs text-gray-500">{instructor.expertise}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                      {instructor.taughtClasses.length} lớp
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <SectionHeading title="Lớp đang mở" subtitle="Catalog" icon={School} />
            <div className="mt-4 space-y-3">
              {openClassesByCourse.length > 0 ? (
                openClassesByCourse.map((classItem) => {
                  const instructor = MOCK_USERS.find((user) => user.id === classItem.instructorId);

                  return (
                    <article key={classItem.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{classItem.code}</p>
                          <h3 className="mt-1 text-base font-semibold text-gray-900">{classItem.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-gray-600">{classItem.description}</p>
                          <p className="mt-3 text-xs text-gray-500">Giảng viên: {instructor?.fullName ?? classItem.instructorName}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onOpenClass(classItem.id, 'catalog')}
                          className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600"
                        >
                          Xem lớp
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">Chưa có lớp mở cho khóa học này.</p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <SectionHeading title="Lịch học sắp tới" subtitle="Sessions" icon={CalendarDays} />
            <div className="mt-4 space-y-3">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.slice(0, 4).map((session) => {
                  const classItem = MOCK_CLASSES.find((item) => item.id === session.classId);
                  return (
                    <article key={session.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{classItem?.code ?? 'Lớp học'}</p>
                          <h3 className="mt-1 text-base font-semibold text-gray-900">{session.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-gray-600">{session.description}</p>
                          <p className="mt-3 text-xs text-gray-500">{formatDateTime(session.startTime)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onOpenClass(session.classId, 'schedule')}
                          className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
                        >
                          Mở lớp
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">Chưa có buổi học nào.</p>
              )}
            </div>
          </section>
        </div>

        {currentUser.role === 'guest' ? (
          <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">Truy cập nhanh</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">Đăng nhập để xem lớp học của tôi</span>
              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">Xem chi tiết lớp từ danh mục</span>
              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">Khám phá giảng viên</span>
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <SectionHeading title="Lớp học của tôi" subtitle="Student view" icon={UsersRound} />
              <button
                type="button"
                onClick={() => onOpenClass(visibleClasses[0]?.id ?? MOCK_CLASSES[0].id, 'my-classes')}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                Đi tới lớp
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-4 grid gap-3 xl:grid-cols-2">
              {visibleClasses.length > 0 ? (
                visibleClasses.map((classItem) => {
                  const course = MOCK_COURSES_CATALOG.find((item) => item.id === classItem.courseId);
                  return (
                    <article key={classItem.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{classItem.code}</p>
                      <h3 className="mt-1 text-base font-semibold text-gray-900">{classItem.name}</h3>
                      <p className="mt-2 text-sm text-gray-600">{course?.title}</p>
                      <button
                        type="button"
                        onClick={() => onOpenClass(classItem.id, 'my-classes')}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-700"
                      >
                        Mở lớp
                        <ArrowRight size={16} />
                      </button>
                    </article>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">Chưa có lớp phù hợp cho tài khoản này.</p>
              )}
            </div>
          </section>
        )}

        {currentUser.role === 'guest' && page === 'landing' && (
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <SectionHeading title="Tài khoản demo" subtitle="USERS" icon={BadgeCheck} />
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {MOCK_USERS.filter((user) => user.role !== 'guest').map((demoUser) => (
                <div key={demoUser.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">{demoUser.fullName}</p>
                  <p className="mt-1 text-xs text-gray-500">{roleLabelMap[demoUser.role]}</p>
                  <p className="mt-2 text-xs text-gray-500">{demoUser.email}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
