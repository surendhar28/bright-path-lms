import { certificates } from '@/data/dummyData';
import { users } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Award, Download, Eye, Calendar, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  const handleDownload = () => {
    toast.success('Certificate downloaded!');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Certificates</h1>
        <p className="text-muted-foreground">Your earned achievements and credentials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-1 truncate">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">Certificate ID: {cert.certificateId}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {cert.issueDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {cert.instructor}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedCert(cert)}>
                <Eye className="w-4 h-4 mr-2" /> View
              </Button>
              <Button variant="hero" className="flex-1" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Preview Dialog */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>
          {selectedCert && (
            <div className="p-8">
              {/* Certificate Design */}
              <div className="aspect-[1.4/1] border-8 border-primary rounded-lg bg-card p-8 relative overflow-hidden">
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-primary" />
                <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-primary" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-primary" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-primary" />
                
                <div className="text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-center mb-4">
                      <Award className="w-16 h-16 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Certificate of Completion</h2>
                    <p className="text-muted-foreground">This is to certify that</p>
                  </div>
                  
                  <div>
                    <p className="text-2xl font-bold mb-2">{users.learner.name}</p>
                    <p className="text-muted-foreground mb-4">has successfully completed</p>
                    <p className="text-xl font-semibold text-primary">{selectedCert.title}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{selectedCert.issueDate}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Certificate ID</p>
                      <p className="text-xs font-mono">{selectedCert.certificateId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-medium italic">{selectedCert.instructor}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="hero" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" /> Download Certificate
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
