import { courses, certificates } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';
import { users } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, Flame, BookOpen, Target, Clock, Award, 
  ArrowRight, Star, Calendar, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const learnerData = users.learner;

const gradients = [
  'gradient-card-green',
  'gradient-card-blue',
  'gradient-card-teal',
  'gradient-card-yellow',
  'gradient-card-purple',
  'gradient-card-pink',
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const enrolledCourses = courses.slice(0, 4);
  const recommendedCourses = courses.slice(2, 6);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0]}!</span>
            </h1>
            <p className="text-muted-foreground">Continue your learning journey today</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
              <Flame className="w-5 h-5 text-warning" />
              <span className="font-semibold">{learnerData.streak} day streak</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold">{learnerData.totalCoins} coins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{learnerData.averageScore}%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold">{learnerData.coursesCompleted}</p>
              <p className="text-sm text-muted-foreground">Courses Completed</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">3 days</p>
              <p className="text-sm text-muted-foreground">Fastest Completion</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{learnerData.highestQuizScore}%</p>
              <p className="text-sm text-muted-foreground">Highest Quiz Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">My Courses</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/courses')}>
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrolledCourses.map((course, index) => (
                <div
                  key={course.id}
                  className={`relative p-5 rounded-2xl ${gradients[index % gradients.length]} cursor-pointer hover:scale-[1.02] transition-transform`}
                  onClick={() => navigate(`/dashboard/courses/${course.id}`)}
                >
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-lg bg-card/90 text-xs font-medium">
                      {course.domain}
                    </span>
                  </div>
                  <div className="pt-4">
                    <h3 className="font-semibold text-foreground mb-1">{course.title}</h3>
                    <p className="text-sm text-foreground/70">{course.duration}</p>
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-foreground/80">{course.progress}% completed</span>
                    </div>
                    <Progress value={course.progress} className="h-2 bg-card/50" />
                  </div>
                  <Button 
                    variant="glass" 
                    size="sm" 
                    className="mt-4 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/courses/${course.id}/learn`);
                    }}
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div>
            <h2 className="text-xl font-bold mb-4">Other students also bought</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedCourses.map((course, index) => (
                <div
                  key={course.id}
                  className={`p-4 rounded-xl ${gradients[(index + 2) % gradients.length]} cursor-pointer hover:scale-[1.02] transition-transform`}
                  onClick={() => navigate(`/dashboard/courses/${course.id}`)}
                >
                  <span className="px-2 py-1 rounded-md bg-card/90 text-xs font-medium">
                    {course.domain}
                  </span>
                  <h3 className="font-medium text-sm mt-3 text-foreground line-clamp-2">{course.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Certificates */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold mb-4">Certificates</h3>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
                  onClick={() => navigate('/dashboard/certificates')}
                >
                  <Award className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{cert.title}</p>
                    <p className="text-xs text-muted-foreground">Certificate ID: {cert.certificateId}</p>
                    <p className="text-xs text-muted-foreground">{cert.issueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-warning/10 border border-warning/20">
                <p className="font-medium text-sm">Cybersecurity Assessment</p>
                <p className="text-xs text-muted-foreground">Dec 20, 2024 at 10:00 AM</p>
              </div>
              <div className="p-3 rounded-xl bg-info/10 border border-info/20">
                <p className="font-medium text-sm">Python Project Due</p>
                <p className="text-xs text-muted-foreground">Dec 25, 2024</p>
              </div>
            </div>
          </div>

          {/* Role Suggestions */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <h3 className="font-semibold mb-2">Recommended Role</h3>
            <p className="text-sm text-muted-foreground mb-3">Based on your skills</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Security Analyst
              </span>
              <span className="px-3 py-1 rounded-full bg-card border border-border text-xs font-medium">
                Python Developer
              </span>
              <span className="px-3 py-1 rounded-full bg-card border border-border text-xs font-medium">
                Data Engineer
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
