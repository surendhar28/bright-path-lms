import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { CREDENTIALS } from '@/data/dummyData';
import { GraduationCap, User, Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

type LoginType = 'student' | 'admin' | null;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginType, setLoginType] = useState<LoginType>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      toast.success('Login successful!');
      navigate(loginType === 'student' ? '/dashboard' : '/admin');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleQuickLogin = (type: 'student' | 'admin') => {
    const creds = type === 'student' ? CREDENTIALS.learner : CREDENTIALS.admin;
    setEmail(creds.email);
    setPassword(creds.password);
    setLoginType(type);
  };

  if (loginType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="w-full max-w-md relative">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => setLoginType(null)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                {loginType === 'student' ? (
                  <User className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <Shield className="w-8 h-8 text-primary-foreground" />
                )}
              </div>
              <h1 className="text-2xl font-bold">
                {loginType === 'student' ? 'Student' : 'Admin'} Login
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1.5"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="hero" className="w-full" size="lg">
                Login
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-xl bg-secondary/50 text-sm">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <p className="text-muted-foreground">
                Email: <span className="font-mono">{loginType === 'student' ? CREDENTIALS.learner.email : CREDENTIALS.admin.email}</span>
              </p>
              <p className="text-muted-foreground">
                Password: <span className="font-mono">{loginType === 'student' ? CREDENTIALS.learner.password : CREDENTIALS.admin.password}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="w-full max-w-4xl relative">
        <div className="text-center mb-12">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
          <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Welcome to LearnSphere</h1>
          <p className="text-muted-foreground mt-2">Choose your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Card */}
          <div 
            className="group bg-card rounded-3xl border border-border p-8 hover:border-primary/50 hover:shadow-card-hover transition-all duration-300 cursor-pointer"
            onClick={() => handleQuickLogin('student')}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lms-blue to-lms-teal flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 text-info-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Student Login</h2>
            <p className="text-muted-foreground mb-6">
              Access courses, track progress, take assessments, and earn certificates.
            </p>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Email:</span> <span className="font-mono">{CREDENTIALS.learner.email}</span></p>
              <p><span className="text-muted-foreground">Password:</span> <span className="font-mono">{CREDENTIALS.learner.password}</span></p>
            </div>
            <Button variant="hero" className="w-full mt-6">
              Login as Student
            </Button>
          </div>

          {/* Admin Card */}
          <div 
            className="group bg-card rounded-3xl border border-border p-8 hover:border-primary/50 hover:shadow-card-hover transition-all duration-300 cursor-pointer"
            onClick={() => handleQuickLogin('admin')}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lms-purple to-lms-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-info-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Admin / Teacher Login</h2>
            <p className="text-muted-foreground mb-6">
              Manage students, create courses, design exams, and view analytics.
            </p>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Email:</span> <span className="font-mono">{CREDENTIALS.admin.email}</span></p>
              <p><span className="text-muted-foreground">Password:</span> <span className="font-mono">{CREDENTIALS.admin.password}</span></p>
            </div>
            <Button variant="hero" className="w-full mt-6">
              Login as Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
