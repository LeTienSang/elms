import React from 'react';
import type { Assignment, Score, Submission } from '../types';

interface ClassGradesProps {
  assignments: Assignment[];
  submissions: Submission[];
  scores: Score[];
}

export const ClassGrades: React.FC<ClassGradesProps> = ({
  assignments,
  submissions,
  scores,
}) => {
  const rows = scores
    .map((score) => {
      const submission = submissions.find((item) => item.id === score.submissionId);
      const assignment = assignments.find((item) => item.id === score.assignmentId);

      return {
        score,
        submission,
        assignment,
      };
    })
    .sort((first, second) => new Date(second.score.gradedAt).getTime() - new Date(first.score.gradedAt).getTime());

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
        Bảng điểm
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {rows.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Bài tập</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Học viên</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Điểm</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nhận xét</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ngày chấm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {rows.map(({ score, submission, assignment }) => (
                <tr key={score.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {assignment?.title ?? 'Bài tập'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {submission?.studentName ?? 'Học viên'}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {score.points}/100
                  </td>
                  <td className="px-6 py-4 text-sm leading-6 text-gray-600">
                    {score.feedback || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(score.gradedAt).toLocaleDateString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-10 text-center text-sm text-gray-500">
            Chưa có điểm được ghi nhận.
          </div>
        )}
      </div>
    </div>
  );
};
