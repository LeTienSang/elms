export interface ClassSession {
  id: string;
  classId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  meetingLink?: string;
  status: 'scheduled' | 'ongoing' | 'completed';
  recordingUrl?: string;
}

export interface ClassMember {
  id: string;
  userId: string;
  classId: string;
  fullName: string;
  email: string;
  role: 'student' | 'teacher';
  avatar?: string;
  joinedAt: string;
}

export interface Assignment {
  id: string;
  classId: string;
  title: string;
  description: string;
  content?: string;
  dueDate: string;
  createdBy: string;
  createdAt: string;
  totalPoints: number;
  status: 'draft' | 'published' | 'closed';
}

export interface Instructor {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  avatar?: string;
  expertise: string;
  bio?: string;
  courseCount: number;
}

export interface CourseCatalog {
  id: string;
  code: string;
  title: string;
  description: string;
  highlights?: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  durationWeeks: number;
  instructorId: string;
  status: 'active' | 'draft';
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  attachments?: string[];
  status: 'pending' | 'submitted' | 'graded';
}

export interface Score {
  id: string;
  submissionId: string;
  studentId: string;
  assignmentId: string;
  points: number;
  feedback?: string;
  gradedAt: string;
  gradedBy: string;
}

export interface Class {
  id: string;
  courseId: string;
  name: string;
  code: string;
  description: string;
  instructorId: string;
  instructorName: string;
  instructorEmail: string;
  startDate: string;
  endDate: string;
  capacity: number;
  status: 'active' | 'archived' | 'draft';
  cover?: string;
  createdAt: string;
  memberCount: number;
}

export type UserRole = 'guest' | 'student' | 'teacher' | 'admin';
