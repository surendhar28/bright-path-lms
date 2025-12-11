import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exams } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Clock, FileText, Trophy, Play, Eye, 
  CheckCircle, AlertCircle, Camera, Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Exams() {
  const navigate = useNavigate();
  const [showProctoringModal, setShowProctoringModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<typeof exams[0] | null>(null);
  const [proctoringSteps, setProctoringSteps] = useState({
    camera: false,
    fullscreen: false,
    honor: false
  });

  const upcomingExams = exams.filter(e => e.status === 'upcoming');
  const completedExams = exams.filter(e => e.status === 'completed');

  const startExam = (exam: typeof exams[0]) => {
    if (exam.proctored) {
      setSelectedExam(exam);
      setShowProctoringModal(true);
    } else {
      navigate('/dashboard/exams/attempt');
    }
  };

  const handleProctoringComplete = () => {
    if (proctoringSteps.camera && proctoringSteps.fullscreen && proctoringSteps.honor) {
      setShowProctoringModal(false);
      navigate('/dashboard/exams/attempt');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Exams</h1>
        <p className="text-muted-foreground">View and attempt your assessments</p>
      </div>

      {/* Upcoming Exams */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Upcoming Exams
        </h2>
        <div className="space-y-4">
          {upcomingExams.map((exam) => (
            <div key={exam.id} className="p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{exam.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{exam.course}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" /> {exam.duration} minutes
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="w-4 h-4" /> {exam.totalQuestions} questions
                    </span>
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-xs font-medium",
                      exam.type === 'mcq' && "bg-info/10 text-info",
                      exam.type === 'coding' && "bg-success/10 text-success",
                      exam.type === 'mixed' && "bg-warning/10 text-warning"
                    )}>
                      {exam.type.toUpperCase()}
                    </span>
                    {exam.proctored && (
                      <span className="px-2 py-1 rounded-lg bg-destructive/10 text-destructive text-xs font-medium">
                        Proctored
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-2">Scheduled</p>
                  <p className="font-semibold">{exam.scheduledDate}</p>
                  <Button variant="hero" className="mt-4" onClick={() => startExam(exam)}>
                    <Play className="w-4 h-4 mr-2" /> Start Exam
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Completed Exams */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-success" />
          Completed Exams
        </h2>
        <div className="space-y-4">
          {completedExams.map((exam) => (
            <div key={exam.id} className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{exam.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{exam.course}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" /> {exam.completedDate}
                    </span>
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-xs font-medium",
                      exam.type === 'mcq' && "bg-info/10 text-info",
                      exam.type === 'coding' && "bg-success/10 text-success",
                      exam.type === 'mixed' && "bg-warning/10 text-warning"
                    )}>
                      {exam.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-xl",
                    exam.score && exam.score >= 70 ? "bg-success/10" : "bg-warning/10"
                  )}>
                    <Trophy className={cn(
                      "w-5 h-5",
                      exam.score && exam.score >= 70 ? "text-success" : "text-warning"
                    )} />
                    <span className="text-2xl font-bold">{exam.score}%</span>
                  </div>
                  <Button variant="outline" className="mt-4" onClick={() => navigate('/dashboard/exams/results')}>
                    <Eye className="w-4 h-4 mr-2" /> View Results
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proctoring Modal */}
      <Dialog open={showProctoringModal} onOpenChange={setShowProctoringModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Exam Setup</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">Complete the following steps to start your proctored exam:</p>
            
            {/* Camera Check */}
            <div className={cn(
              "p-4 rounded-xl border-2 transition-colors",
              proctoringSteps.camera ? "border-success bg-success/10" : "border-border"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Enable Camera</p>
                    <p className="text-sm text-muted-foreground">Required for proctoring</p>
                  </div>
                </div>
                {proctoringSteps.camera ? (
                  <CheckCircle className="w-6 h-6 text-success" />
                ) : (
                  <Button size="sm" onClick={() => setProctoringSteps(s => ({ ...s, camera: true }))}>
                    Enable
                  </Button>
                )}
              </div>
            </div>

            {/* Fullscreen */}
            <div className={cn(
              "p-4 rounded-xl border-2 transition-colors",
              proctoringSteps.fullscreen ? "border-success bg-success/10" : "border-border"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Maximize2 className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Enable Fullscreen</p>
                    <p className="text-sm text-muted-foreground">Required during exam</p>
                  </div>
                </div>
                {proctoringSteps.fullscreen ? (
                  <CheckCircle className="w-6 h-6 text-success" />
                ) : (
                  <Button size="sm" onClick={() => setProctoringSteps(s => ({ ...s, fullscreen: true }))}>
                    Enable
                  </Button>
                )}
              </div>
            </div>

            {/* Honor Code */}
            <div className={cn(
              "p-4 rounded-xl border-2 transition-colors",
              proctoringSteps.honor ? "border-success bg-success/10" : "border-border"
            )}>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={proctoringSteps.honor}
                  onChange={(e) => setProctoringSteps(s => ({ ...s, honor: e.target.checked }))}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium">Honor Code Agreement</p>
                  <p className="text-sm text-muted-foreground">
                    I agree to complete this exam honestly without any unauthorized assistance or materials.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              variant="hero" 
              className="w-full" 
              onClick={handleProctoringComplete}
              disabled={!proctoringSteps.camera || !proctoringSteps.fullscreen || !proctoringSteps.honor}
            >
              Start Exam
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
