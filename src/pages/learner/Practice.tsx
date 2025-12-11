import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { practiceProblems, domains, dsaSubdomains } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Filter, Code, CheckCircle, ChevronRight, 
  TrendingUp, Star, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Practice() {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState<string>('dsa');
  const [selectedSubdomain, setSelectedSubdomain] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  const filteredProblems = practiceProblems.filter(p => {
    const matchesDomain = p.domain === selectedDomain;
    const matchesSubdomain = !selectedSubdomain || p.subdomain === selectedSubdomain;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !difficultyFilter || p.difficulty === difficultyFilter;
    return matchesDomain && matchesSubdomain && matchesSearch && matchesDifficulty;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Practice</h1>
        <p className="text-muted-foreground">Sharpen your coding skills with challenges</p>
      </div>

      {/* Domain Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {domains.filter(d => ['python', 'java', 'cpp', 'sql', 'cybersecurity', 'dsa'].includes(d.id)).map((domain) => (
          <Button
            key={domain.id}
            variant={selectedDomain === domain.id ? 'default' : 'outline'}
            onClick={() => {
              setSelectedDomain(domain.id);
              setSelectedSubdomain(null);
            }}
          >
            {domain.name}
          </Button>
        ))}
      </div>

      {/* DSA Subdomains */}
      {selectedDomain === 'dsa' && (
        <div className="mb-6 p-4 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold mb-3">Topics</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSubdomain === null ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedSubdomain(null)}
            >
              All
            </Button>
            {dsaSubdomains.map((sub) => (
              <Button
                key={sub}
                variant={selectedSubdomain === sub ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedSubdomain(sub)}
              >
                {sub}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search problems..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['Easy', 'Medium', 'Hard'].map((diff) => (
            <Button
              key={diff}
              variant={difficultyFilter === diff ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDifficultyFilter(difficultyFilter === diff ? null : diff)}
              className={cn(
                difficultyFilter === diff && diff === 'Easy' && 'bg-success hover:bg-success/90',
                difficultyFilter === diff && diff === 'Medium' && 'bg-warning hover:bg-warning/90',
                difficultyFilter === diff && diff === 'Hard' && 'bg-destructive hover:bg-destructive/90'
              )}
            >
              {diff}
            </Button>
          ))}
        </div>
      </div>

      {/* Problem Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <p className="text-2xl font-bold text-success">45</p>
              <p className="text-sm text-muted-foreground">Easy Solved</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-warning" />
            <div>
              <p className="text-2xl font-bold text-warning">32</p>
              <p className="text-sm text-muted-foreground">Medium Solved</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-destructive" />
            <div>
              <p className="text-2xl font-bold text-destructive">12</p>
              <p className="text-sm text-muted-foreground">Hard Solved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem List */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Title</th>
              <th className="text-left p-4 font-medium">Difficulty</th>
              <th className="text-left p-4 font-medium">Topic</th>
              <th className="text-left p-4 font-medium">Acceptance</th>
              <th className="text-right p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem, index) => (
              <tr 
                key={problem.id}
                className="border-b border-border last:border-0 hover:bg-secondary/20 cursor-pointer transition-colors"
                onClick={() => navigate(`/dashboard/practice/${problem.id}`)}
              >
                <td className="p-4">
                  {index % 3 === 0 ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-border" />
                  )}
                </td>
                <td className="p-4">
                  <span className="font-medium hover:text-primary">{problem.title}</span>
                </td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-md text-xs font-medium",
                    problem.difficulty === 'Easy' && "bg-success/10 text-success",
                    problem.difficulty === 'Medium' && "bg-warning/10 text-warning",
                    problem.difficulty === 'Hard' && "bg-destructive/10 text-destructive"
                  )}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground text-sm">{problem.subdomain}</td>
                <td className="p-4 text-muted-foreground text-sm">{problem.acceptance}%</td>
                <td className="p-4 text-right">
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
