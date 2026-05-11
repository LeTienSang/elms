# iZONE Learning Management System (LMS) - Frontend

A modern Learning Management System built with **React (Vite)**, **TypeScript**, **Tailwind CSS**, and **Lucide React icons**. Organized with a feature-based folder structure for optimal scalability and maintainability.

## 🎯 Project Overview

The iZONE LMS frontend provides a comprehensive platform for:
- **Teachers**: Create and manage classes, assignments, grading, and feedback
- **Students**: Browse courses, submit assignments, view grades, and interact with class materials
- **Admins**: Manage users, roles, and system-wide settings

## 📁 Folder Structure

```
src/
├── features/
│   ├── auth/                          # Authentication & Authorization
│   │   ├── components/                # Login, role-based guards
│   │   ├── services/                  # Auth API services
│   │   └── hooks/                     # useAuth, useProtectedRoute
│   │
│   ├── classes/                       # Class Management
│   │   ├── components/
│   │   │   ├── ClassDetail.tsx        # Main class view with tabs
│   │   │   ├── ClassOverview.tsx      # General info & upcoming sessions
│   │   │   ├── ClassAssignments.tsx   # Assignment list & submission
│   │   │   ├── ClassPeople.tsx        # Members list (teachers & students)
│   │   │   ├── ClassGrades.tsx        # Grade tracking & input (teacher only)
│   │   │   ├── ClassSchedule.tsx      # Class sessions & timetable
│   │   │   ├── ClassFeedback.tsx      # Ratings & feedback from students
│   │   │   └── index.ts               # Public exports
│   │   ├── services/                  # Class API calls
│   │   ├── hooks/                     # useClass, useClassMembers
│   │   ├── types/                     # Class interfaces & types
│   │   │   └── index.ts               # ClassSession, Assignment, etc.
│   │   ├── mock/
│   │   │   ├── classData.ts           # Mock data for development
│   │   │   └── index.ts
│   │   └── index.ts                   # Feature exports
│   │
│   ├── assignments/                   # Assignment Management
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── index.ts
│   │
│   ├── grading/                       # Grading & Scoring
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── index.ts
│   │
│   ├── catalog/                       # Course Catalog
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── index.ts
│   │
│   └── shared/                        # Shared Components & Utils
│       ├── components/
│       │   ├── Sidebar.tsx            # Fixed left sidebar
│       │   ├── TopHeader.tsx          # Top header with profile
│       │   ├── Tabs.tsx               # Reusable tab component
│       │   ├── ActivityHistory.tsx    # Activity feed timeline
│       │   ├── Layout.tsx             # Main layout wrapper
│       │   └── index.ts
│       ├── types/                     # Shared types (User, Auth)
│       ├── hooks/                     # Shared hooks
│       ├── constants/                 # Colors, tabs, activity types
│       └── index.ts
│
├── pages/                             # Page components (future)
├── App.tsx                            # Root component
├── App.css                            # App styles
├── index.css                          # Global styles + Tailwind
└── main.tsx                           # Entry point
```

## 🎨 UI Layout

### Main Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Sidebar (264px) │         Top Header (56px)            │
│                  │ Search │       Profile │ Notifications│
├──────────────────┼─────────────────────────────────────┤
│                  │                                       │
│  Navigation      │     Main Content Area                │
│  - Classes       │   ┌─ Tabs Navigation ─────────────┐  │
│  - Home          │   │ Overview│Assignments│People... │  │
│  - People        │   ├────────────────────────────────┤  │
│  - Grading       │   │                                │  │
│  - Catalog       │   │  Content Panel    Activity     │  │
│                  │   │  (8 cols)         History      │  │
│                  │   │                   (4 cols)     │  │
│                  │   │                                │  │
│  [Logout]        │   └────────────────────────────────┘  │
│                  │                                       │
└──────────────────┴─────────────────────────────────────┘
```

### Color Scheme

- **Primary Red**: `#E12127` - Main brand color for active states
- **Soft Gray**: `#F5F5F5` - Background
- **White**: `#FFFFFF` - Cards and overlays
- **Dark Text**: `#333333` - Main text
- **Light Text**: `#666666` - Secondary text

## 🔑 Core Interfaces

### User & Auth

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'guest' | 'student' | 'teacher' | 'admin';
  avatar?: string;
  createdAt: string;
}
```

### Classes

```typescript
interface Class {
  id: string;
  name: string;
  code: string;
  description: string;
  instructorId: string;
  instructorName: string;
  startDate: string;
  endDate: string;
  capacity: number;
  status: 'active' | 'archived' | 'draft';
  memberCount: number;
}

interface ClassSession {
  id: string;
  classId: string;
  title: string;
  startTime: string;
  endTime: string;
  meetingLink?: string;
  status: 'scheduled' | 'ongoing' | 'completed';
  recordingUrl?: string;
}
```

### Assignments & Grading

```typescript
interface Assignment {
  id: string;
  classId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  status: 'draft' | 'published' | 'closed';
}

interface Score {
  id: string;
  submissionId: string;
  studentId: string;
  points: number;
  feedback?: string;
  gradedAt: string;
}
```

## 📋 Tab Navigation

The `ClassDetail` component contains 6 main tabs:

1. **Tổng quan (Overview)**
   - Class description
   - Upcoming sessions
   - Class statistics

2. **Bài tập (Assignments)**
   - Assignment list with due dates
   - Submission status
   - Submit/Download buttons

3. **Mọi người (People)**
   - Teachers list
   - Students list
   - Member profiles

4. **Điểm (Grades)** *(Teacher only)*
   - Grade tracking table
   - Grading input form
   - Feedback editing

5. **Thời khóa biểu (Schedule)**
   - Regular timetable
   - Upcoming sessions
   - Meeting links & recordings

6. **Feedback**
   - Student ratings & comments
   - Average rating display
   - Feedback submission form

## 🚀 Getting Started

### Installation

```bash
cd elms/frontend
npm install
npm run dev
```

### Building

```bash
npm run build
```

### Development

```bash
npm run dev
```

The dev server runs at `http://localhost:5173`

## 🔐 Role-Based Features

### Student
- ✅ View class overview
- ✅ See assignments
- ✅ Submit assignments
- ✅ View grades and feedback
- ✅ View schedule
- ✅ Submit feedback/ratings

### Teacher
- ✅ All student features
- ✅ Create/edit assignments
- ✅ View all submissions
- ✅ Grade submissions with feedback
- ✅ See activity history

### Admin
- ✅ All teacher features
- ✅ Manage users & roles
- ✅ System configuration

## 📦 Mock Data

All demo data is in [`src/features/classes/mock/classData.ts`](src/features/classes/mock/classData.ts) with:

- **MOCK_CLASS**: Sample class with Web Development course
- **MOCK_CLASS_MEMBERS**: Teachers and 4 students
- **MOCK_ASSIGNMENTS**: 3 assignments with submissions
- **MOCK_CLASS_SESSIONS**: 4 sessions (past and upcoming)
- **MOCK_ACTIVITY_LOGS**: 6 activity entries
- **MOCK_FEEDBACKS**: Student ratings and comments
- **MOCK_SCHEDULE**: Class timetable

## 🔧 Technologies

- **React 19** - UI library
- **Vite 8** - Build tool
- **TypeScript 5.9** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Icon library
- **date-fns** - Date formatting

## 📝 Component Architecture

Each feature follows a consistent structure:

```
feature/
├── components/        # React UI components
├── services/         # API calls & data fetching
├── hooks/           # Custom React hooks
├── types/           # TypeScript interfaces
├── mock/            # Mock data for development
└── index.ts         # Public API exports
```

### Using a Component

```typescript
import { ClassDetail } from '@/features/classes';

function App() {
  return <ClassDetail />;
}
```

## 🎯 Future Enhancements

- [ ] Authentication integration
- [ ] Real API backend connection
- [ ] Dark mode support
- [ ] Mobile responsiveness improvements
- [ ] Real-time notifications
- [ ] File upload for assignments
- [ ] Advanced reporting

## 📖 Development Guidelines

1. **Keep components small** - One responsibility per component
2. **Use TypeScript** - Define all interfaces
3. **Mock data** - Use mock data for UI development
4. **Tailwind classes** - Avoid custom CSS when possible
5. **Feature isolation** - Components in features should not import from other features (except shared)

## 🐛 Known Limitations

- Currently uses mock data (no backend connection)
- No authentication implemented
- No file upload yet
- Chunk size warning in build (non-critical)

## 📄 License

MIT

---

**Happy coding! 🚀**
