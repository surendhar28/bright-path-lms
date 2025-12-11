import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { practiceProblems } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Play, Upload, ChevronDown, CheckCircle, 
  XCircle, Clock, Star, Users, Bookmark
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CodingEnvironment() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'python' | 'java' | 'cpp'>('python');
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const problem = practiceProblems.find(p => p.id === problemId);

  if (!problem) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Problem not found</h1>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/dashboard/practice')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Practice
        </Button>
      </div>
    );
  }

  const starterCode = problem.starterCode[language] || '';
  
  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setTestResults([
        { id: 1, input: problem.testCases[0].input, expected: problem.testCases[0].expected, output: problem.testCases[0].expected, passed: true, time: '12ms' },
        { id: 2, input: problem.testCases[1]?.input, expected: problem.testCases[1]?.expected, output: problem.testCases[1]?.expected, passed: true, time: '8ms' },
      ]);
      setIsRunning(false);
      toast.success('All test cases passed!');
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      toast.success('Solution accepted!');
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e]">
      {/* Top Bar */}
      <div className="h-12 bg-[#252526] border-b border-[#3e3e42] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-[#cccccc]" onClick={() => navigate('/dashboard/practice')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Problem List
          </Button>
          <span className="text-[#cccccc] font-medium">{problem.title}</span>
          <span className={cn(
            "px-2 py-0.5 rounded text-xs font-medium",
            problem.difficulty === 'Easy' && "bg-success/20 text-success",
            problem.difficulty === 'Medium' && "bg-warning/20 text-warning",
            problem.difficulty === 'Hard' && "bg-destructive/20 text-destructive"
          )}>
            {problem.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRun} disabled={isRunning}>
            <Play className="w-4 h-4 mr-1" /> Run
          </Button>
          <Button variant="hero" size="sm" onClick={handleSubmit} disabled={isRunning}>
            <Upload className="w-4 h-4 mr-1" /> Submit
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Problem Description */}
        <div className="w-[45%] border-r border-[#3e3e42] overflow-y-auto bg-[#1e1e1e]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="w-full justify-start rounded-none border-b border-[#3e3e42] bg-[#252526] px-2">
              <TabsTrigger value="description" className="data-[state=active]:bg-[#1e1e1e]">Description</TabsTrigger>
              <TabsTrigger value="editorial" className="data-[state=active]:bg-[#1e1e1e]">Editorial</TabsTrigger>
              <TabsTrigger value="solutions" className="data-[state=active]:bg-[#1e1e1e]">Solutions</TabsTrigger>
              <TabsTrigger value="submissions" className="data-[state=active]:bg-[#1e1e1e]">Submissions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-6 text-[#cccccc]">
              <h1 className="text-xl font-bold mb-4">{problem.title}</h1>
              
              <div className="flex items-center gap-4 mb-6 text-sm">
                <span className={cn(
                  "px-2 py-1 rounded",
                  problem.difficulty === 'Easy' && "bg-success/20 text-success",
                  problem.difficulty === 'Medium' && "bg-warning/20 text-warning",
                  problem.difficulty === 'Hard' && "bg-destructive/20 text-destructive"
                )}>
                  {problem.difficulty}
                </span>
                <span className="flex items-center gap-1 text-[#888]">
                  <Users className="w-4 h-4" /> {(problem.submissions / 1000000).toFixed(1)}M submissions
                </span>
                <span className="flex items-center gap-1 text-[#888]">
                  Acceptance: {problem.acceptance}%
                </span>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="mb-4 leading-relaxed">{problem.description}</p>
                
                {problem.examples.map((example, i) => (
                  <div key={i} className="mb-6">
                    <h4 className="font-semibold mb-2">Example {i + 1}:</h4>
                    <div className="bg-[#2d2d2d] rounded-lg p-4 font-mono text-sm">
                      <p><span className="text-[#888]">Input:</span> {example.input}</p>
                      <p><span className="text-[#888]">Output:</span> {example.output}</p>
                      {example.explanation && (
                        <p><span className="text-[#888]">Explanation:</span> {example.explanation}</p>
                      )}
                    </div>
                  </div>
                ))}

                <h4 className="font-semibold mb-2">Constraints:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {problem.constraints.map((c, i) => (
                    <li key={i} className="font-mono text-sm text-[#888]">{c}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="editorial" className="p-6">
              <p className="text-[#888]">Editorial content would appear here...</p>
            </TabsContent>
            
            <TabsContent value="solutions" className="p-6">
              <p className="text-[#888]">Community solutions would appear here...</p>
            </TabsContent>
            
            <TabsContent value="submissions" className="p-6">
              <p className="text-[#888]">Your submissions would appear here...</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col">
          {/* Language Selector */}
          <div className="h-10 bg-[#252526] border-b border-[#3e3e42] flex items-center px-4">
            <select 
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value as any);
                setCode('');
              }}
              className="bg-[#3c3c3c] text-[#cccccc] rounded px-3 py-1 text-sm border-none outline-none"
            >
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>

          {/* Code Editor Area */}
          <div className="flex-1 overflow-hidden">
            <textarea
              value={code || starterCode}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-4 resize-none outline-none"
              spellCheck={false}
              placeholder="Write your code here..."
            />
          </div>

          {/* Test Results */}
          <div className="h-48 bg-[#252526] border-t border-[#3e3e42]">
            <div className="h-10 flex items-center px-4 border-b border-[#3e3e42]">
              <span className="text-sm font-medium text-[#cccccc]">Testcase</span>
              <span className="text-sm font-medium text-[#cccccc] ml-4">Test Result</span>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-40px)]">
              {testResults.length === 0 ? (
                <p className="text-[#888] text-sm">Click "Run" to test your code</p>
              ) : (
                <div className="space-y-3">
                  {testResults.map((result) => (
                    <div key={result.id} className="flex items-start gap-3">
                      {result.passed ? (
                        <CheckCircle className="w-5 h-5 text-success shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive shrink-0" />
                      )}
                      <div className="text-sm">
                        <p className="text-[#cccccc]">
                          <span className="text-[#888]">Input:</span> {JSON.stringify(result.input)}
                        </p>
                        <p className="text-[#cccccc]">
                          <span className="text-[#888]">Output:</span> {JSON.stringify(result.output)}
                        </p>
                        <p className="text-[#888] text-xs">Runtime: {result.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
