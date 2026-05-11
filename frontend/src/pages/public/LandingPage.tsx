import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Sparkles,
  Star,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_COURSES_CATALOG, MOCK_INSTRUCTORS } from '../../features/classes/mock/classData.ts';

interface LandingPageProps {
  focusSection?: 'hero' | 'courses' | 'instructors';
}

const SectionTitle = ({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
}) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
      <Icon size={18} />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">{subtitle}</p>
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
    </div>
  </div>
);

const formatLevel = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const LandingPage: React.FC<LandingPageProps> = ({ focusSection = 'hero' }) => {
  const heroRef = React.useRef<HTMLElement | null>(null);
  const coursesRef = React.useRef<HTMLElement | null>(null);
  const instructorsRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const targetRef =
      focusSection === 'courses'
        ? coursesRef
        : focusSection === 'instructors'
          ? instructorsRef
          : heroRef;

    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [focusSection]);

  const programStats = [
    { label: 'Flagship programs', value: `${MOCK_COURSES_CATALOG.length}` },
    { label: 'Expert instructors', value: `${MOCK_INSTRUCTORS.length}` },
    { label: 'Core skills', value: '4' },
    { label: 'English-focused', value: '100%' },
  ];

  const promiseCards = [
    {
      icon: BookOpen,
      title: 'Structured learning paths',
      description: 'Each course follows a clear progression from fundamentals to confident performance.',
    },
    {
      icon: UsersRound,
      title: 'Small-batch engagement',
      description: 'We prioritize interaction, speaking practice, and direct feedback in every lesson.',
    },
    {
      icon: CalendarDays,
      title: 'Consistent weekly rhythm',
      description: 'Balanced schedules keep learners moving without losing momentum or clarity.',
    },
    {
      icon: BadgeCheck,
      title: 'Outcome-oriented coaching',
      description: 'The curriculum is designed to improve test scores, fluency, and workplace communication.',
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(225,33,39,0.12),transparent_30%),linear-gradient(180deg,#fff7f4_0%,#ffffff_42%,#fff8f6_100%)] text-gray-900">
      <section ref={heroRef} className="relative overflow-hidden border-b border-white/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(225,33,39,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,24,39,0.04),transparent_24%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="flex items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-red-600 shadow-sm">
                <Sparkles size={14} />
                English programs for ambitious learners
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Master English, Unlock Your Future.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                ELMS brings together exam preparation, practical communication, and career-focused English training in one polished learning experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => coursesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700"
                >
                  Explore Courses
                  <ArrowRight size={16} />
                </button>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-50"
                >
                  Join Us Now
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {programStats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">{stat.label}</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 self-start rounded-4xl border border-gray-200 bg-white/90 p-6 shadow-xl shadow-black/5 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">Programs at a glance</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">Built for fluency and exam success</h2>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <GraduationCap size={22} />
              </div>
            </div>

            <div className="grid gap-3">
              {MOCK_COURSES_CATALOG.map((course) => {
                const instructor = MOCK_INSTRUCTORS.find((item) => item.id === course.instructorId);

                return (
                  <article key={course.id} className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{formatLevel(course.level)}</p>
                        <h3 className="mt-1 text-base font-semibold text-gray-900">{course.title}</h3>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                        {course.durationWeeks} weeks
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-600">{course.highlights?.[0] ?? course.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                      <span className="rounded-full bg-white px-3 py-1">Course Duration: {course.durationWeeks} weeks</span>
                      <span className="rounded-full bg-white px-3 py-1">
                        Instructor Name: {instructor?.fullName ?? 'ELMS Instructor'}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="rounded-3xl bg-linear-to-br from-red-600 to-red-700 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-100">Learning promise</p>
              <p className="mt-2 text-sm leading-6 text-red-50">
                Speaking, listening, reading, and writing are developed together so progress is visible and practical.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={coursesRef} id="courses" className="border-b border-white/70 bg-white/85 py-20 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Featured Courses" subtitle="Courses" icon={BookOpen} />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {MOCK_COURSES_CATALOG.map((course) => {
              const instructor = MOCK_INSTRUCTORS.find((item) => item.id === course.instructorId);
              const highlights = course.highlights ?? [];

              return (
                <article
                  key={course.id}
                  className="flex h-full flex-col overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="border-b border-gray-100 bg-linear-to-br from-gray-50 to-white p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">{formatLevel(course.level)}</p>
                        <h3 className="mt-2 text-xl font-bold leading-tight text-gray-900">{course.title}</h3>
                      </div>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <Star size={18} />
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-gray-600">{course.description}</p>
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <div className="grid gap-3 text-sm">
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Course Duration</p>
                        <p className="mt-1 text-base font-bold text-gray-900">{course.durationWeeks} weeks</p>
                      </div>
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Instructor Name</p>
                        <p className="mt-1 text-base font-bold text-gray-900">{instructor?.fullName ?? 'ELMS Instructor'}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Key Benefits</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {highlights.slice(0, 4).map((benefit) => (
                          <span key={benefit} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={instructorsRef} id="instructors" className="border-b border-white/70 bg-[#fff8f4] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Meet the Instructors" subtitle="Instructors" icon={GraduationCap} />

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {MOCK_INSTRUCTORS.map((instructor) => (
              <article
                key={instructor.id}
                className="overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={instructor.avatar ?? 'https://via.placeholder.com/800x600'}
                    alt={instructor.fullName}
                    className="h-56 w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-gray-950/80 via-gray-950/20 to-transparent p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">Instructor</p>
                    <h3 className="mt-1 text-2xl font-bold leading-tight">{instructor.fullName}</h3>
                    <p className="mt-2 text-sm text-white/80">{instructor.expertise}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-7 text-gray-600">{instructor.bio}</p>
                  <div className="mt-5 flex items-center justify-between rounded-3xl bg-gray-50 px-4 py-3 text-sm">
                    <span className="font-medium text-gray-500">Courses taught</span>
                    <span className="font-semibold text-gray-900">{instructor.courseCount}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-4xl bg-linear-to-br from-red-600 via-red-600 to-red-700 p-8 text-white shadow-2xl lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-red-100">Join the next cohort</p>
                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                  Your journey to English fluency starts here.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-red-50">
                  Explore the course catalog, meet the instructors, and sign in whenever you are ready to enter the LMS dashboard.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-red-700 transition-all hover:bg-red-50"
                  >
                    Join Us Now
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => coursesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  >
                    Explore Courses
                  </button>
                </div>
              </div>

              <div className="grid gap-3 rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
                {promiseCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-start gap-3 rounded-3xl bg-white/10 p-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-red-50">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
