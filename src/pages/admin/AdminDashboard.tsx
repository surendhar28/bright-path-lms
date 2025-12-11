import { useState } from 'react';
import { NavLink } from '@/components/NavLink';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { students, courses } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  LayoutDashboard, Users, BookOpen, HelpCircle, FileText, 
  BarChart3, LogOut, GraduationCap, Plus, Upload, Search,
  TrendingUp, Award, Clock, Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Students', path: '/admin/students' },
  { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
  { icon: HelpCircle, label: 'Question Bank', path: '/admin/questions' },
  { icon: FileText, label: 'Exams', path: '/admin/exams' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPath = location.pathname === '/admin';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold">LearnSphere</span>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
              activeClassName="bg-primary/10 text-primary hover:bg-primary/15"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-secondary/50">
            <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {isRootPath ? <AdminHome /> : <Outlet />}
      </main>
    </div>
  );
}

function AdminHome() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your LMS platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <Users className="w-8 h-8 text-info mb-2" />
          <p className="text-3xl font-bold">{students.length}</p>
          <p className="text-muted-foreground">Total Students</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <BookOpen className="w-8 h-8 text-success mb-2" />
          <p className="text-3xl font-bold">{courses.length}</p>
          <p className="text-muted-foreground">Active Courses</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <FileText className="w-8 h-8 text-warning mb-2" />
          <p className="text-3xl font-bold">45</p>
          <p className="text-muted-foreground">Total Exams</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <TrendingUp className="w-8 h-8 text-primary mb-2" />
          <p className="text-3xl font-bold">82%</p>
          <p className="text-muted-foreground">Avg. Completion</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold mb-4">Recent Students</h3>
          <div className="space-y-3">
            {students.slice(0, 5).map(student => (
              <div key={student.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{student.progress}%</p>
                  <Progress value={student.progress} className="w-20 h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold mb-4">Course Performance</h3>
          <div className="space-y-4">
            {courses.slice(0, 4).map(course => (
              <div key={course.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium truncate">{course.title}</span>
                  <span className="text-sm text-muted-foreground">{course.enrolledCount} enrolled</span>
                </div>
                <Progress value={Math.floor(Math.random() * 40 + 60)} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
