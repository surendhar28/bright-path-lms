import { useState } from 'react';
import { courses, domains } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Search, Filter, Star, Clock, Users, Crown, ArrowRight 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const gradients = [
  'gradient-card-purple',
  'gradient-card-green',
  'gradient-card-teal',
  'gradient-card-yellow',
  'gradient-card-blue',
  'gradient-card-pink',
];

export default function Courses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = !selectedDomain || course.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const freeCourses = filteredCourses.filter(c => !c.isPremium);
  const premiumCourses = filteredCourses.filter(c => c.isPremium);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Path</h1>
        <p className="text-muted-foreground">Explore courses and continue your learning journey</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={selectedDomain === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDomain(null)}
          >
            All
          </Button>
          {domains.slice(0, 5).map((domain) => (
            <Button
              key={domain.id}
              variant={selectedDomain === domain.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDomain(domain.id)}
            >
              {domain.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Free Courses */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Free Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeCourses.map((course, index) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              gradient={gradients[index % gradients.length]}
              onClick={() => navigate(`/dashboard/courses/${course.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Premium Courses */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Premium Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumCourses.map((course, index) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              gradient={gradients[(index + 3) % gradients.length]}
              onClick={() => navigate(`/dashboard/courses/${course.id}`)}
              isPremium
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function CourseCard({ 
  course, 
  gradient, 
  onClick, 
  isPremium = false 
}: { 
  course: typeof courses[0]; 
  gradient: string;
  onClick: () => void;
  isPremium?: boolean;
}) {
  return (
    <div 
      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className={`h-32 ${gradient} relative`}>
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded-lg bg-card/90 text-xs font-medium">
            {course.domain}
          </span>
        </div>
        {isPremium && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
              <Crown className="w-3 h-3" /> ${course.price}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" /> {course.enrolledCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary" /> {course.rating}
          </span>
        </div>

        {course.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        <Button variant="hero" className="w-full">
          {course.progress > 0 ? 'Continue Learning' : 'Start Learning'} 
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
