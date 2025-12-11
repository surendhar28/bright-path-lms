import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, Users, Star, BookOpen, Video, FileText, 
  CheckCircle, Play, Crown, ArrowLeft
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/dashboard/courses')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
        </Button>
      </div>
    );
  }

  const handleStartLearning = () => {
    if (course.isPremium && course.progress === 0) {
      setShowPayment(true);
    } else {
      navigate(`/dashboard/courses/${courseId}/learn`);
    }
  };

  const handlePayment = () => {
    toast.success('Payment successful! Course unlocked.');
    setShowPayment(false);
    navigate(`/dashboard/courses/${courseId}/learn`);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Button variant="ghost" className="mb-6" onClick={() => navigate('/dashboard/courses')}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
      </Button>

      {/* Course Header */}
      <div className="rounded-3xl overflow-hidden bg-card border border-border">
        <div className={`h-48 ${course.gradient || 'gradient-card-purple'} relative`}>
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
          />
          {course.isPremium && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-1">
                <Crown className="w-4 h-4" /> ${course.price}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium">
              {course.domain}
            </span>
            <span className="px-3 py-1 rounded-lg bg-secondary text-sm font-medium">
              {course.level}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-muted-foreground mb-6">{course.description}</p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" /> {course.duration}
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5" /> {course.enrolledCount.toLocaleString()} enrolled
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" /> {course.rating} rating
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> {course.topics?.length || 3} modules
            </span>
          </div>

          {course.progress > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Your Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-3" />
            </div>
          )}

          <Button variant="hero" size="lg" onClick={handleStartLearning}>
            <Play className="w-5 h-5 mr-2" />
            {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
          </Button>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
        <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.learningOutcomes?.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <span className="text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Content */}
      {course.topics && course.topics.length > 0 && (
        <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
          <h2 className="text-xl font-bold mb-4">Course Content</h2>
          <div className="space-y-4">
            {course.topics.map((topic) => (
              <div key={topic.id} className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {topic.completed ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-border" />
                    )}
                    <span className="font-medium">{topic.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{topic.duration}</span>
                </div>
                <div className="pl-8 space-y-2">
                  {topic.subtopics.map((subtopic) => (
                    <div key={subtopic.id} className="flex items-center gap-3 text-sm">
                      {subtopic.completed ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-border" />
                      )}
                      <span className={subtopic.completed ? 'text-muted-foreground' : ''}>
                        {subtopic.title}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {subtopic.type === 'video' && <Video className="w-3 h-3 inline mr-1" />}
                        {subtopic.type === 'reading' && <FileText className="w-3 h-3 inline mr-1" />}
                        {subtopic.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unlock Premium Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="font-medium">{course.title}</p>
              <p className="text-2xl font-bold text-primary mt-2">${course.price}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" /> Lifetime access
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" /> Certificate on completion
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" /> All course materials
              </div>
            </div>
            <Button variant="hero" className="w-full" onClick={handlePayment}>
              Purchase Course
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              This is a demo. No real payment will be processed.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
