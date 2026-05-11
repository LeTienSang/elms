import React from 'react';
import { CheckCircle2, Clock3, FileText, Upload } from 'lucide-react';
import type { Assignment, Submission, UserRole } from '../types';

interface ClassAssignmentsProps {
  assignments: Assignment[];
  submissions: Submission[];
  userRole: UserRole;
}

export const ClassAssignments: React.FC<ClassAssignmentsProps> = ({
  assignments,
  submissions,
  userRole,
}) => {
  const getSubmissionStatus = (assignmentId: string) => submissions.find((submission) => submission.assignmentId === assignmentId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
        <FileText size={14} />
        Học liệu & Bài tập
      </div>

      {assignments.map((assignment) => {
        const submission = getSubmissionStatus(assignment.id);
        const isOverdue = new Date(assignment.dueDate) < new Date();

        return (
          <div
            key={assignment.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-gray-300"
          >
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-gray-900">{assignment.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{assignment.description}</p>
                    </div>
                  </div>

                  {assignment.content && (
                    <p className="mt-4 text-sm leading-6 text-gray-700">{assignment.content}</p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <Clock3 size={16} />
                      Hạn nộp:{' '}
                      <span className={isOverdue ? 'font-semibold text-red-600' : 'font-semibold text-gray-900'}>
                        {new Date(assignment.dueDate).toLocaleDateString('vi-VN')}
                      </span>
                    </span>
                    <span>Điểm tối đa: {assignment.totalPoints}</span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      submission ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    {submission ? 'Đã nộp' : 'Chưa nộp'}
                  </span>

                  {userRole === 'student' && !submission ? (
                    <button className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600" type="button">
                      <Upload size={16} />
                      Nộp bài
                    </button>
                  ) : (
                    <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50" type="button">
                      Xem chi tiết
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
