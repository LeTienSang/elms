import React from 'react';
import type { ClassMember } from '../types';

interface ClassPeopleProps {
  members: ClassMember[];
}

const MemberCard: React.FC<{ member: ClassMember }> = ({ member }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300">
    <div className="flex items-center gap-4">
      <img
        src={member.avatar || 'https://via.placeholder.com/48'}
        alt={member.fullName}
        className="h-12 w-12 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-gray-900">{member.fullName}</h3>
        <p className="truncate text-sm text-gray-600">{member.email}</p>
        <p className="mt-1 text-xs text-gray-500">
          Tham gia: {new Date(member.joinedAt).toLocaleDateString('vi-VN')}
        </p>
      </div>

      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 capitalize">
        {member.role === 'teacher' ? 'Giảng viên' : 'Học viên'}
      </span>
    </div>
  </div>
);

export const ClassPeople: React.FC<ClassPeopleProps> = ({ members }) => {
  const teachers = members.filter((member) => member.role === 'teacher');
  const students = members.filter((member) => member.role === 'student');

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
        Thành viên lớp học
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900">Giảng viên ({teachers.length})</h2>
        <div className="space-y-3">
          {teachers.map((teacher) => (
            <MemberCard key={teacher.id} member={teacher} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900">Học viên ({students.length})</h2>
        <div className="grid grid-cols-1 gap-3">
          {students.map((student) => (
            <MemberCard key={student.id} member={student} />
          ))}
        </div>
      </section>
    </div>
  );
};
