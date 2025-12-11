import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, BookOpen, Code, Brain, Award, FileText, 
  ChevronRight, CheckCircle, Users, Zap, Shield
} from 'lucide-react';

const features = [
  { icon: BookOpen, title: "Learning Path", description: "Structured courses with videos, readings, and quizzes" },
  { icon: Code, title: "Practice", description: "Coding challenges across multiple domains" },
  { icon: Brain, title: "Psychometrics", description: "Cognitive and aptitude assessments" },
  { icon: Zap, title: "Projects", description: "Hands-on coding workspace like Google Colab" },
  { icon: Award, title: "Certificates", description: "Earn verifiable certificates on completion" },
  { icon: FileText, title: "Resume Builder", description: "Auto-generate professional resumes" },
];

const steps = [
  { number: "01", title: "Sign Up", description: "Create your account as a student or teacher" },
  { number: "02", title: "Choose Courses", description: "Browse and enroll in courses that match your goals" },
  { number: "03", title: "Learn & Grow", description: "Complete modules, take assessments, and track progress" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">LearnSphere</span>
          </div>
          <Button variant="hero" onClick={() => navigate('/login')}>
            Login <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Academic LMS Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Learn, Build, Excel —{' '}
              <span className="text-gradient">Your Academic LMS Platform</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empowering students and teachers with structured learning paths, 
              interactive assessments, coding challenges, and comprehensive analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" onClick={() => navigate('/login')}>
                <Users className="w-5 h-5" />
                Login as Student
              </Button>
              <Button variant="outline" size="xl" onClick={() => navigate('/login')}>
                <Shield className="w-5 h-5" />
                Login as Teacher
              </Button>
            </div>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 rounded-2xl bg-card border border-border inline-block">
              <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="px-4 py-2 rounded-lg bg-secondary">
                  <span className="font-medium">Student:</span> learner@example.com / 123456
                </div>
                <div className="px-4 py-2 rounded-lg bg-secondary">
                  <span className="font-medium">Admin:</span> admin@example.com / admin123
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete learning ecosystem for modern education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-card-hover transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Get started in three simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students and teachers using LearnSphere
          </p>
          <Button 
            size="xl" 
            variant="secondary"
            onClick={() => navigate('/login')}
            className="bg-card text-foreground hover:bg-card/90"
          >
            Get Started Now <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-card border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold">LearnSphere</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 LearnSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
