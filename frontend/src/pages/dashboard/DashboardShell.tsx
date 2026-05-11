import React from 'react';
import { Layout } from '../../features/shared/components';
import type { AppPage, User } from '../../features/shared/types';
import {
  MOCK_CLASS_MEMBERS,
  MOCK_CLASSES,
} from '../../features/classes/mock/classData.ts';
import { PortalPage } from '../PortalPage';

interface DashboardShellProps {
  currentUser: User;
  onGoHome: () => void;
  onLogout: () => void;
}

const getInitialDashboardPage = (user: User): AppPage => {
  if (user.role === 'student') {
    return 'my-classes';
  }

  return 'catalog';
};

const getInitialClassId = (user: User): string | null => {
  if (user.role === 'student') {
    const member = MOCK_CLASS_MEMBERS.find((item) => item.userId === user.id && item.role === 'student');
    return member?.classId ?? MOCK_CLASSES[0]?.id ?? null;
  }

  const firstManagedClass = MOCK_CLASSES.find((item) => item.instructorId === user.id);
  return firstManagedClass?.id ?? MOCK_CLASSES[0]?.id ?? null;
};

export const DashboardShell: React.FC<DashboardShellProps> = ({ currentUser, onGoHome, onLogout }) => {
  const initialPage = React.useMemo(() => getInitialDashboardPage(currentUser), [currentUser]);
  const [activePage, setActivePage] = React.useState<AppPage>(initialPage);
  const [previousPage, setPreviousPage] = React.useState<AppPage>(initialPage);
  const [selectedClassId, setSelectedClassId] = React.useState<string | null>(() => getInitialClassId(currentUser));

  React.useEffect(() => {
    const nextPage = getInitialDashboardPage(currentUser);
    setActivePage(nextPage);
    setPreviousPage(nextPage);
    setSelectedClassId(getInitialClassId(currentUser));
  }, [currentUser]);

  const handleNavigate = (page: AppPage) => {
    setActivePage(page);

    if (page !== 'class-detail') {
      setPreviousPage(page);
    }
  };

  const handleOpenClass = (classId: string, sourcePage: AppPage) => {
    setSelectedClassId(classId);
    setPreviousPage(sourcePage);
    setActivePage('class-detail');
  };

  const handleBackToPreviousPage = () => {
    setActivePage(previousPage === 'class-detail' ? initialPage : previousPage);
  };

  const sidebarActivePage = activePage === 'class-detail' ? previousPage : activePage;

  return (
    <Layout
      user={currentUser}
      activePage={sidebarActivePage}
      onNavigate={handleNavigate}
      onGoHome={onGoHome}
      onLogout={onLogout}
    >
      <PortalPage
        page={activePage}
        currentUser={currentUser}
        selectedClassId={selectedClassId}
        onOpenClass={handleOpenClass}
        onBackToPreviousPage={handleBackToPreviousPage}
      />
    </Layout>
  );
};
