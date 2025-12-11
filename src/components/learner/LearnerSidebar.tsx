import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, BookOpen, Code, FolderKanban, Brain,
  Award, User, FileText, LogOut, GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: BookOpen, label: 'Learning Path', path: '/dashboard/courses' },
  { icon: Code, label: 'Practice', path: '/dashboard/practice' },
  { icon: FolderKanban, label: 'Projects Workspace', path: '/dashboard/projects' },
  { icon: Brain, label: 'Psychometric Analysis', path: '/dashboard/psychometric' },
  { icon: Award, label: 'Certificates', path: '/dashboard/certificates' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
  { icon: FileText, label: 'Exams', path: '/dashboard/exams' },
];

export default function LearnerSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">LearnSphere</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
            activeClassName="bg-primary/10 text-primary hover:bg-primary/15"
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-secondary/50">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
