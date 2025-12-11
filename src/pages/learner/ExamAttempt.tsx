import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { examQuestions } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { 
  Clock, ChevronLeft, ChevronRight, Flag, Check, 
  Maximize2, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ExamAttempt() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [totalTime, setTotalTime] = useState(30 * 60); // 30 minutes
  const [sectionTime, setSectionTime] = useState(5 * 60);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const questions = examQuestions;
  const question = questions[currentQuestion];
  
  const sections = [
    { name: 'Aptitude', questions: questions.filter(q => q.section === 'Aptitude'), count: 5 },
    { name: 'Verbal', questions: questions.filter(q => q.section === 'Verbal'), count: 4 },
    { name: 'Essay Writing', questions: [], count: 1 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalTime(t => t > 0 ? t - 1 : 0);
      setSectionTime(t => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: optionIndex }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => 
      prev.includes(question.id) 
        ? prev.filter(id => id !== question.id)
        : [...prev, question.id]
    );
  };

  const handleSubmit = () => {
    toast.success('Exam submitted successfully!');
    navigate('/dashboard/exams/results');
  };

  const getQuestionStatus = (qId: string) => {
    if (answers[qId] !== undefined && answers[qId] !== null) {
      if (markedForReview.includes(qId)) return 'marked-answered';
      return 'answered';
    }
    if (markedForReview.includes(qId)) return 'marked';
    return 'not-visited';
  };

  const answeredCount = Object.keys(answers).filter(k => answers[k] !== null).length;
  const markedCount = markedForReview.length;
  const notVisitedCount = questions.length - new Set([...Object.keys(answers), ...markedForReview]).size;
  const notAnsweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <span className="font-semibold">Aptitude</span>
            <span className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-sm">
              Q {currentQuestion + 1}/{questions.length}
            </span>
            <span className="text-sm text-muted-foreground">Marks: +1 -0</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Question Time: <strong>{formatTime(59)}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Section Time: <strong>{formatTime(sectionTime)}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">Total Time: <strong className="text-primary">{formatTime(totalTime)}</strong></span>
            </div>
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4 mr-1" /> Exit Fullscreen
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Question Area */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            <p className="text-lg mb-6 leading-relaxed">{question.question}</p>
            <p className="text-sm text-muted-foreground mb-4">Select only one option:</p>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all",
                    "hover:border-primary/50 hover:bg-primary/5",
                    answers[question.id] === index && "border-primary bg-primary/10"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-80 bg-card border-t border-border p-4">
            <div className="flex items-center justify-between max-w-4xl">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestion(c => Math.max(0, c - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                <Button variant="outline" onClick={() => setCurrentQuestion(c => c + 1)}>
                  Skip <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button 
                  variant={answers[question.id] !== undefined ? 'destructive' : 'outline'}
                  onClick={() => setAnswers(prev => ({ ...prev, [question.id]: null }))}
                >
                  <X className="w-4 h-4 mr-1" /> Clear Response
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={markedForReview.includes(question.id) ? 'warning' : 'outline'}
                  onClick={toggleMarkForReview}
                >
                  <Flag className="w-4 h-4 mr-1" /> Mark Review & Next
                </Button>
                <Button 
                  variant="success"
                  onClick={() => setCurrentQuestion(c => Math.min(questions.length - 1, c + 1))}
                >
                  <Check className="w-4 h-4 mr-1" /> Save & Next
                </Button>
                <Button variant="hero" onClick={() => setShowSubmitDialog(true)}>
                  Submit Exam
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-border bg-card min-h-screen p-4">
          <h3 className="font-semibold mb-4">Sections</h3>
          <p className="text-sm text-muted-foreground mb-4">{sections.length} total sections</p>
          
          <div className="space-y-4 mb-6">
            {sections.map((section, idx) => (
              <div key={idx} className={cn(
                "p-3 rounded-xl border",
                idx === 0 && "bg-primary/10 border-primary"
              )}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{section.name}</span>
                  <span className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground">
                    {section.count} Qs
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Question Grid */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(idx)}
                className={cn(
                  "w-10 h-10 rounded-lg font-medium text-sm transition-colors",
                  currentQuestion === idx && "ring-2 ring-primary",
                  getQuestionStatus(q.id) === 'answered' && "bg-success text-success-foreground",
                  getQuestionStatus(q.id) === 'marked' && "bg-warning text-warning-foreground",
                  getQuestionStatus(q.id) === 'marked-answered' && "bg-warning text-warning-foreground",
                  getQuestionStatus(q.id) === 'not-visited' && "bg-secondary"
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Status Legend */}
          <div className="p-4 rounded-xl bg-secondary/50">
            <h4 className="font-medium mb-3">Status Legend</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-success" />
                <span>Answered</span>
                <span className="ml-auto">{answeredCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-warning" />
                <span>Marked</span>
                <span className="ml-auto">{markedCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-secondary border" />
                <span>Not Visited</span>
                <span className="ml-auto">{notVisitedCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-destructive/30" />
                <span>Not Answered</span>
                <span className="ml-auto">{notAnsweredCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Exam?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">Are you sure you want to submit your exam?</p>
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Answered: <strong>{answeredCount}</strong></div>
                <div>Unanswered: <strong>{notAnsweredCount}</strong></div>
                <div>Marked for Review: <strong>{markedCount}</strong></div>
                <div>Time Remaining: <strong>{formatTime(totalTime)}</strong></div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowSubmitDialog(false)}>
                Continue Exam
              </Button>
              <Button variant="hero" className="flex-1" onClick={handleSubmit}>
                Submit Exam
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
