import { Outlet } from 'react-router-dom';
import LearnerSidebar from './LearnerSidebar';

export default function LearnerLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <LearnerSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
