import { useState } from 'react';
import { students as initialStudents } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Upload, Search, Eye, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

export default function AdminStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newStudent, setNewStudent] = useState({ id: '', name: '', email: '', department: '', section: '' });

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email) {
      setStudents([...students, { ...newStudent, id: `STU${String(students.length + 1).padStart(3, '0')}`, progress: 0 }]);
      setShowAddModal(false);
      setNewStudent({ id: '', name: '', email: '', department: '', section: '' });
      toast.success('Student added successfully!');
    }
  };

  const handleBulkUpload = () => {
    const newStudents = [
      { id: 'STU009', name: 'Alice Cooper', email: 'alice@example.com', department: 'CS', section: 'CS-A', progress: 0 },
      { id: 'STU010', name: 'Bob Martin', email: 'bob@example.com', department: 'IT', section: 'IT-A', progress: 0 },
    ];
    setStudents([...students, ...newStudents]);
    setShowBulkModal(false);
    toast.success('2 students imported successfully!');
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Student Management</h1>
          <p className="text-muted-foreground">Manage and track student progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowBulkModal(true)}>
            <Upload className="w-4 h-4 mr-2" /> Bulk Upload
          </Button>
          <Button variant="hero" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Student
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search students..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left p-4 font-medium">ID</th>
              <th className="text-left p-4 font-medium">Name</th>
              <th className="text-left p-4 font-medium">Email</th>
              <th className="text-left p-4 font-medium">Department</th>
              <th className="text-left p-4 font-medium">Section</th>
              <th className="text-left p-4 font-medium">Progress</th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-border last:border-0">
                <td className="p-4 font-mono text-sm">{student.id}</td>
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4 text-muted-foreground">{student.email}</td>
                <td className="p-4">{student.department}</td>
                <td className="p-4">{student.section}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Progress value={student.progress} className="w-20 h-2" />
                    <span className="text-sm">{student.progress}%</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><RefreshCw className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Student</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Name</Label><Input value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} className="mt-1.5" /></div>
            <div><Label>Email</Label><Input value={newStudent.email} onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} className="mt-1.5" /></div>
            <div><Label>Department</Label><Input value={newStudent.department} onChange={(e) => setNewStudent({...newStudent, department: e.target.value})} className="mt-1.5" /></div>
            <div><Label>Section</Label><Input value={newStudent.section} onChange={(e) => setNewStudent({...newStudent, section: e.target.value})} className="mt-1.5" /></div>
            <Button variant="hero" className="w-full" onClick={handleAddStudent}>Add Student</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Modal */}
      <Dialog open={showBulkModal} onOpenChange={setShowBulkModal}>
        <DialogContent>
          <DialogHeader><DialogTitle>Bulk Upload Students</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="font-medium mb-2">Upload CSV File</p>
              <p className="text-sm text-muted-foreground">Columns: ID, Name, Email, Department, Section</p>
            </div>
            <Button variant="hero" className="w-full" onClick={handleBulkUpload}>Import Students</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
