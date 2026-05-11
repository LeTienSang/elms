# Quick Start Guide - iZONE LMS Frontend

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Step 1: Navigate to Frontend Directory
```bash
cd elms/frontend
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

You should see:
```
  VITE v8.0.3  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open in Browser
Visit: **http://localhost:5173/**

## 📖 Understanding the Layout

```
┌──────────────────────────┐
│  Sidebar  │   Top Header  │
├──────────────────────────┤
│          │   Main Content │
│  Classes │   - Class Info │
│  Home    │   - Tabs       │
│  People  │   - Activity   │
│  Grading │     Feed       │
│  Catalog │                │
└──────────────────────────┘
```

## 🎨 Exploring the UI

### Default View
- **Page**: Class Detail (Web Development Course)
- **Current User**: Nguyễn Văn A (Teacher)
- **Tab**: Overview (first tab)

### Navigate Between Tabs
Click on any of the 6 tabs at the top of the class content:

1. **Tổng quan** - Overview with class info & upcoming sessions
2. **Bài tập** - Assignments with submission tracking
3. **Mọi người** - Class members (teachers & students)
4. **Điểm** - Grades (grading form visible for teachers)
5. **Thời khóa biểu** - Class schedule & sessions
6. **Feedback** - Student ratings & feedback

### Activity History
Right sidebar shows recent class activities with timestamps.

## 🔧 Making Changes

### Editing Components
Example: Edit the sidebar navigation

```typescript
// File: src/features/shared/components/Sidebar.tsx
const menuItems = [
  { id: 'classes', label: 'Quản lý lớp', icon: BookOpen },
  // Add more items here
];
```

Changes save automatically with hot module reload (HMR).

### Adding New Assignments
Edit mock data to add more assignments:

```typescript
// File: src/features/classes/mock/classData.ts
export const MOCK_ASSIGNMENTS: Assignment[] = [
  // Add new assignment object here
];
```

### Changing Colors
Update constants:

```typescript
// File: src/features/shared/constants/index.ts
export const PRIMARY_RED = '#E12127';  // Customize brand color
```

## 🎯 Working with Mock Data

All demo data is in a single file for easy testing:

**File**: `src/features/classes/mock/classData.ts`

Contains:
- Current user (teacher)
- Class information
- Members list
- Assignments & submissions
- Grades & scores
- Activity logs
- Student feedback
- Class schedule

## 📋 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run linter
npm run lint
```

## 🐛 Troubleshooting

### Issue: Port 5173 Already in Use
**Solution**: Change port in `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000,  // Use different port
  },
});
```

### Issue: Styles Not Applying
**Solution**: Tailwind CSS not compiling
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Types Not Found Errors
**Solution**: Rebuild TypeScript
```bash
npm run build
```

## 🗂️ Key Files Structure

```
elms/frontend/
├── src/
│   ├── features/
│   │   ├── shared/         # Shared components & styles
│   │   │   ├── components/ # Sidebar, TopHeader, Tabs, etc.
│   │   │   ├── types/      # User, Auth types
│   │   │   └── constants/  # Colors, tab names, etc.
│   │   ├── classes/        # Class feature
│   │   │   ├── components/ # ClassDetail, ClassOverview, etc.
│   │   │   ├── types/      # Class interfaces
│   │   │   └── mock/       # Mock data
│   │   ├── auth/           # Auth (future)
│   │   ├── assignments/    # Assignments (future)
│   │   ├── grading/        # Grading (future)
│   │   └── catalog/        # Catalog (future)
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static files
├── package.json            # Dependencies
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
└── tailwind.config.js      # Tailwind config
```

## 💡 Tips & Tricks

### Quick Component Reload
The dev server supports Hot Module Reload (HMR). Changes to components reload instantly without losing state.

### TypeScript Errors
If you see TypeScript errors in the browser console, check:
1. File names (case-sensitive on Linux/Mac)
2. Import paths (use relative paths)
3. Interface exports (check `index.ts` files)

### Debugging Activity Feed
The activity history needs specific icons from `lucide-react`. Valid icon names:
- `CheckCircle` - Submission
- `Award` - Grading
- `FileText` - Assignment
- `MessageSquare` - Comment

## 🔌 Connecting to Backend (Future)

When you're ready to connect to a real API:

1. Create services in `src/features/*/services/`
2. Replace mock data with API calls
3. Add error handling
4. Update types based on API responses

Example:
```typescript
// src/features/classes/services/classService.ts
export const fetchClass = async (classId: string) => {
  const response = await fetch(`/api/classes/${classId}`);
  return response.json();
};
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Lucide Icons](https://lucide.dev)

## 📞 Support

For issues or questions:
1. Check the `PROJECT_SUMMARY.md` for detailed information
2. Review the `README.md` in `src/features/`
3. Check component JSDoc comments
4. Look at mock data structure for examples

## ✨ You're All Set!

Start the dev server and explore the LMS interface. All features are functional with mock data!

```bash
npm run dev
# Visit http://localhost:5173
```

Happy coding! 🚀
