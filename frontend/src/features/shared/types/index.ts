export type UserRole = 'guest' | 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export type AppPage =
  | 'landing'
  | 'catalog'
  | 'instructors'
  | 'my-classes'
  | 'schedule'
  | 'assignments'
  | 'class-detail';
