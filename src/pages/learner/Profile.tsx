import { useState } from 'react';
import { users, psychometricData } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  User, Mail, Building, Calendar, Edit, Save, Download,
  Code, Award, BookOpen, Target
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Profile() {
  const learner = users.learner;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: learner.name,
    email: learner.email,
    department: learner.department,
    section: learner.section,
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleDownloadResume = () => {
    toast.success('Resume downloaded!');
  };

  // Heatmap data - 52 weeks x 7 days
  const heatmapData = Array.from({ length: 52 }, () => 
    Array.from({ length: 7 }, () => Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0)
  );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account and view progress</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="resume">Resume Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-2xl bg-card border border-border text-center">
                <img
                  src={learner.avatar}
                  alt={learner.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-bold mb-1">{learner.name}</h2>
                <p className="text-muted-foreground mb-4">{learner.email}</p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {learner.department}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary">
                    {learner.section}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className="lg:col-span-2">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Personal Information</h3>
                  {isEditing ? (
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-card border border-border">
              <BookOpen className="w-8 h-8 text-info mb-2" />
              <p className="text-2xl font-bold">{learner.coursesCompleted}</p>
              <p className="text-sm text-muted-foreground">Courses Completed</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <Target className="w-8 h-8 text-success mb-2" />
              <p className="text-2xl font-bold">{learner.averageScore}%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <Code className="w-8 h-8 text-warning mb-2" />
              <p className="text-2xl font-bold">89</p>
              <p className="text-sm text-muted-foreground">Problems Solved</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <Award className="w-8 h-8 text-primary mb-2" />
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Certificates</p>
            </div>
          </div>

          {/* Coding Heatmap */}
          <div className="p-6 rounded-2xl bg-card border border-border mb-6">
            <h3 className="font-semibold mb-4">Coding Activity</h3>
            <div className="overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {heatmapData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="w-3 h-3 rounded-sm"
                        style={{
                          backgroundColor: day === 0 
                            ? 'hsl(var(--secondary))' 
                            : `hsl(var(--success) / ${day * 0.25})`
                        }}
                        title={`${day} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: level === 0 
                      ? 'hsl(var(--secondary))' 
                      : `hsl(var(--success) / ${level * 0.25})`
                  }}
                />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* Skill Radar */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold mb-4">Skill Overview</h3>
            <div className="space-y-4">
              {learner.skills.map((skill) => (
                <div key={skill}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{skill}</span>
                    <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 30 + 70)}%</span>
                  </div>
                  <Progress value={Math.floor(Math.random() * 30 + 70)} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resume">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Auto-Generated Resume</h3>
              <Button variant="hero" onClick={handleDownloadResume}>
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </div>

            {/* Resume Preview */}
            <div className="border rounded-xl p-8 bg-background max-w-2xl mx-auto">
              <div className="text-center mb-6 pb-6 border-b">
                <h2 className="text-2xl font-bold">{learner.name}</h2>
                <p className="text-muted-foreground">{learner.email}</p>
                <p className="text-sm text-muted-foreground">{learner.department} | {learner.section}</p>
              </div>

              <section className="mb-6">
                <h3 className="font-bold text-primary mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {learner.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-secondary text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mb-6">
                <h3 className="font-bold text-primary mb-3">Education</h3>
                <div>
                  <p className="font-medium">Bachelor of Technology in Computer Science</p>
                  <p className="text-sm text-muted-foreground">University of Technology • 2021 - 2025</p>
                  <p className="text-sm text-muted-foreground">CGPA: 8.5/10</p>
                </div>
              </section>

              <section className="mb-6">
                <h3 className="font-bold text-primary mb-3">Courses & Certifications</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Introduction to IT Fundamentals - LearnSphere</li>
                  <li>• Basics of Design Principles - LearnSphere</li>
                  <li>• Cybersecurity Fundamentals (In Progress)</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="font-bold text-primary mb-3">Projects</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Data Analysis Dashboard</p>
                    <p className="text-sm text-muted-foreground">Built interactive dashboards using Python, Pandas, and Matplotlib</p>
                  </div>
                  <div>
                    <p className="font-medium">Web Security Scanner</p>
                    <p className="text-sm text-muted-foreground">Developed automated vulnerability scanner for web applications</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-bold text-primary mb-3">Achievements</h3>
                <ul className="space-y-1 text-sm">
                  <li>• 89 coding problems solved on LearnSphere</li>
                  <li>• Average assessment score: 92%</li>
                  <li>• 5-day learning streak</li>
                </ul>
              </section>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
