import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses, readingContent, quizQuestions } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  BookOpen, Video, HelpCircle, CheckCircle, Clock, Play, 
  Target, Award, Coins, ArrowLeft, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type ContentType = 'reading' | 'video' | 'quiz';

export default function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === courseId);

  const [expandedTopics, setExpandedTopics] = useState<string[]>(['t1', 't2']);
  const [activeSubtopic, setActiveSubtopic] = useState(course?.topics?.[0]?.subtopics?.[0] || null);
  const [showQuiz, setShowQuiz] = useState(false);

  if (!course || !course.topics) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Course content not found</h1>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/dashboard/courses')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
        </Button>
      </div>
    );
  }

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const completedSubtopics = course.topics.flatMap(t => t.subtopics.filter(s => s.completed)).length;
  const totalSubtopics = course.topics.flatMap(t => t.subtopics).length;
  const completedTopics = course.topics.filter(t => t.completed).length;

  const handleSubtopicClick = (subtopic: any) => {
    if (subtopic.type === 'quiz') {
      setShowQuiz(true);
      setActiveSubtopic(subtopic);
    } else {
      setShowQuiz(false);
      setActiveSubtopic(subtopic);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Top Metrics Bar */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-card border-b border-border z-50 flex items-center px-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/courses/${courseId}`)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Exit
        </Button>
        
        <div className="flex-1 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Modules</p>
              <p className="text-sm font-semibold">{completedTopics}/{course.topics.length}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-info" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Topics</p>
              <p className="text-sm font-semibold">{completedSubtopics}/{totalSubtopics}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Questions</p>
              <p className="text-sm font-semibold">12/15</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time Spent</p>
              <p className="text-sm font-semibold">2h 15m</p>
            </div>
          </div>
          
          <div className="w-48">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex pt-14">
        {/* Left Panel - Topic Navigation */}
        <div className="w-80 border-r border-border bg-card overflow-y-auto scrollbar-thin">
          <div className="p-4 border-b border-border sticky top-0 bg-card z-10">
            <h2 className="font-semibold truncate">{course.title}</h2>
            <p className="text-sm text-muted-foreground">{course.instructor}</p>
          </div>

          <div className="p-2">
            {course.topics.map((topic) => (
              <div key={topic.id} className="mb-1">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors",
                    "hover:bg-secondary/50",
                    topic.completed && "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {topic.completed ? (
                      <CheckCircle className="w-5 h-5 text-success shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-primary shrink-0" />
                    )}
                    <span className="font-medium text-sm">{topic.title}</span>
                  </div>
                  {expandedTopics.includes(topic.id) ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                
                {expandedTopics.includes(topic.id) && (
                  <div className="ml-4 pl-4 border-l border-border space-y-1">
                    {topic.subtopics.map((subtopic) => (
                      <button
                        key={subtopic.id}
                        onClick={() => handleSubtopicClick(subtopic)}
                        className={cn(
                          "w-full flex items-center gap-3 p-2 rounded-lg text-sm text-left transition-colors",
                          "hover:bg-secondary/50",
                          activeSubtopic?.id === subtopic.id && "bg-primary/10 text-primary",
                          subtopic.completed && activeSubtopic?.id !== subtopic.id && "text-muted-foreground"
                        )}
                      >
                        {subtopic.completed ? (
                          <CheckCircle className="w-4 h-4 text-success shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-border shrink-0" />
                        )}
                        <span className="flex-1 truncate">{subtopic.title}</span>
                        {subtopic.type === 'video' && <Video className="w-3 h-3 text-muted-foreground" />}
                        {subtopic.type === 'reading' && <BookOpen className="w-3 h-3 text-muted-foreground" />}
                        {subtopic.type === 'quiz' && <HelpCircle className="w-3 h-3 text-muted-foreground" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Content Viewer */}
        <div className="flex-1 overflow-y-auto bg-background">
          {showQuiz ? (
            <QuizView 
              subtopic={activeSubtopic} 
              onClose={() => {
                setShowQuiz(false);
                toast.success('Quiz completed!');
              }} 
            />
          ) : (
            <ContentView subtopic={activeSubtopic} />
          )}
        </div>
      </div>
    </div>
  );
}

function ContentView({ subtopic }: { subtopic: any }) {
  if (!subtopic) return null;

  const content = readingContent[subtopic.id as keyof typeof readingContent];

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          {subtopic.type === 'video' && <Video className="w-4 h-4" />}
          {subtopic.type === 'reading' && <BookOpen className="w-4 h-4" />}
          <span className="capitalize">{subtopic.type}</span>
          <span>•</span>
          <span>{subtopic.duration}</span>
        </div>
        <h1 className="text-2xl font-bold">{subtopic.title}</h1>
      </div>

      {/* Video Player */}
      {subtopic.type === 'video' && (
        <div className="aspect-video bg-[#1e1e1e] rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors z-10">
            <Play className="w-8 h-8 text-primary-foreground ml-1" />
          </button>
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
            <div className="flex-1 h-1 bg-muted rounded-full">
              <div className="w-1/3 h-full bg-primary rounded-full" />
            </div>
            <span className="text-sm text-muted-foreground">12:45 / 35:00</span>
          </div>
        </div>
      )}

      {/* Reading Content */}
      {subtopic.type === 'reading' && content && (
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="prose prose-lg max-w-none">
            {content.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-bold mt-6 mb-4 text-primary">{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-semibold mt-4">{line.replace(/\*\*/g, '')}</p>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="ml-4 mb-1">{line.replace('- ', '')}</li>;
              }
              if (line.startsWith('```')) {
                return null;
              }
              if (line.trim() === '') {
                return <br key={i} />;
              }
              return <p key={i} className="text-muted-foreground leading-relaxed mb-2">{line}</p>;
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button variant="outline">
          <ChevronLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button variant="hero">
          Mark Complete & Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function QuizView({ subtopic, onClose }: { subtopic: any; onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [coins, setCoins] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
  
  const questions = quizQuestions.s4 || [];
  const question = questions[currentQuestion];
  
  if (!question) return null;

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === question.correct) {
      const timePct = timeLeft / 15;
      if (timePct > 0.6) {
        const earned = question.difficulty === 'easy' ? 0.25 : 
                       question.difficulty === 'medium' ? 0.40 : 0.50;
        setCoins(c => c + earned);
        toast.success(`+${earned} coins earned!`);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(question.difficulty === 'easy' ? 15 : question.difficulty === 'medium' ? 30 : 60);
      setRevealedLetters([]);
    } else {
      onClose();
    }
  };

  const buyHint = () => {
    if (coins >= 0.25 && hintsUsed < 3) {
      setCoins(c => c - 0.25);
      setHintsUsed(h => h + 1);
      // Reveal random letter from correct answer
      const answer = question.options[question.correct];
      const letters = answer.split('').filter((l: string) => l !== ' ' && !revealedLetters.includes(l.toLowerCase()));
      if (letters.length > 0) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        setRevealedLetters([...revealedLetters, randomLetter.toLowerCase()]);
        toast.info(`Hint: The answer contains the letter "${randomLetter.toUpperCase()}"`);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Quiz Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Question {currentQuestion + 1}/{questions.length}</span>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            question.difficulty === 'easy' && "bg-success/10 text-success",
            question.difficulty === 'medium' && "bg-warning/10 text-warning",
            question.difficulty === 'hard' && "bg-destructive/10 text-destructive"
          )}>
            {question.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10">
            <Coins className="w-4 h-4 text-primary" />
            <span className="font-semibold">{coins.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full border-4 border-primary flex items-center justify-center">
              <span className="text-lg font-bold">{timeLeft}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-2xl border border-border p-8 mb-6">
        <h2 className="text-xl font-semibold mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && handleAnswer(index)}
              disabled={showExplanation}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left transition-all",
                "hover:border-primary hover:bg-primary/5",
                selectedAnswer === index && index === question.correct && "border-success bg-success/10",
                selectedAnswer === index && index !== question.correct && "border-destructive bg-destructive/10",
                showExplanation && index === question.correct && "border-success bg-success/10",
                !showExplanation && "border-border"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Hint Button */}
        {!showExplanation && coins >= 0.25 && (
          <Button variant="outline" size="sm" className="mt-4" onClick={buyHint}>
            <Coins className="w-4 h-4 mr-2" /> Buy Hint (0.25 coins)
          </Button>
        )}

        {/* Revealed Letters */}
        {revealedLetters.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-primary/10">
            <p className="text-sm">
              <span className="font-medium">Hints:</span> Answer contains: {revealedLetters.map(l => l.toUpperCase()).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-info/10 rounded-2xl border border-info/20 p-6 mb-6 animate-slide-up">
          <h3 className="font-semibold mb-2">Explanation</h3>
          <p className="text-muted-foreground">{question.explanation}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-end">
        <Button variant="hero" onClick={handleNext} disabled={!showExplanation}>
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
