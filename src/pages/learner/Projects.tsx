import { useState } from 'react';
import { projectTemplates } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { 
  Plus, Play, Save, Download, Upload, Trash2, 
  Code, FileText, ChevronDown, ChevronUp, Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type CellType = 'markdown' | 'code';

interface Cell {
  id: string;
  type: CellType;
  content: string;
  output?: string;
}

export default function Projects() {
  const project = projectTemplates[0];
  const [cells, setCells] = useState<Cell[]>(project.cells as Cell[]);
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const addCell = (type: CellType, afterId?: string) => {
    const newCell: Cell = {
      id: `cell-${Date.now()}`,
      type,
      content: type === 'markdown' ? '# New Section\n\nAdd your content here.' : '# Your code here\n',
    };
    
    if (afterId) {
      const index = cells.findIndex(c => c.id === afterId);
      setCells([...cells.slice(0, index + 1), newCell, ...cells.slice(index + 1)]);
    } else {
      setCells([...cells, newCell]);
    }
  };

  const deleteCell = (id: string) => {
    setCells(cells.filter(c => c.id !== id));
  };

  const updateCell = (id: string, content: string) => {
    setCells(cells.map(c => c.id === id ? { ...c, content } : c));
  };

  const runCell = (id: string) => {
    setIsRunning(true);
    setTimeout(() => {
      setCells(cells.map(c => c.id === id ? { ...c, output: 'Output:\n   x  y\n0  0  2\n1  1  4\n2  2  5\n3  3  4\n4  4  5' } : c));
      setIsRunning(false);
    }, 1000);
  };

  const runAll = () => {
    setIsRunning(true);
    setTimeout(() => {
      setCells(cells.map(c => c.type === 'code' ? { ...c, output: 'Executed successfully' } : c));
      setIsRunning(false);
      toast.success('All cells executed!');
    }, 2000);
  };

  const saveVersion = () => {
    toast.success('Version saved successfully!');
  };

  const downloadNotebook = () => {
    toast.success('Downloading notebook...');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-72 border-r border-border bg-card p-4 overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">Project Workspace</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>

        <div className="space-y-2 mb-6">
          <Button variant="outline" className="w-full justify-start" onClick={runAll} disabled={isRunning}>
            <Play className="w-4 h-4 mr-2" /> Run All
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={saveVersion}>
            <Save className="w-4 h-4 mr-2" /> Save Version
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={downloadNotebook}>
            <Download className="w-4 h-4 mr-2" /> Download .ipynb
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Upload className="w-4 h-4 mr-2" /> Upload Dataset
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="font-medium mb-3">Cells ({cells.length})</h4>
          <div className="space-y-1">
            {cells.map((cell, index) => (
              <button
                key={cell.id}
                onClick={() => setActiveCell(cell.id)}
                className={cn(
                  "w-full flex items-center gap-2 p-2 rounded-lg text-sm text-left transition-colors",
                  "hover:bg-secondary",
                  activeCell === cell.id && "bg-primary/10"
                )}
              >
                {cell.type === 'code' ? (
                  <Code className="w-4 h-4 text-success" />
                ) : (
                  <FileText className="w-4 h-4 text-info" />
                )}
                <span className="truncate">Cell {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Notebook Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Toolbar */}
          <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-card border border-border">
            <Button size="sm" onClick={() => addCell('code')}>
              <Plus className="w-4 h-4 mr-1" /> Code
            </Button>
            <Button size="sm" variant="outline" onClick={() => addCell('markdown')}>
              <Plus className="w-4 h-4 mr-1" /> Markdown
            </Button>
            <div className="flex-1" />
            <Button size="sm" variant="outline" onClick={runAll} disabled={isRunning}>
              <Play className="w-4 h-4 mr-1" /> Run All
            </Button>
          </div>

          {/* Cells */}
          <div className="space-y-4">
            {cells.map((cell, index) => (
              <div
                key={cell.id}
                className={cn(
                  "rounded-xl border overflow-hidden transition-all",
                  activeCell === cell.id ? "border-primary shadow-card" : "border-border"
                )}
                onClick={() => setActiveCell(cell.id)}
              >
                {/* Cell Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 border-b border-border">
                  <div className="flex items-center gap-2">
                    {cell.type === 'code' ? (
                      <Code className="w-4 h-4 text-success" />
                    ) : (
                      <FileText className="w-4 h-4 text-info" />
                    )}
                    <span className="text-sm font-medium">
                      {cell.type === 'code' ? 'Code' : 'Markdown'} [{index + 1}]
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {cell.type === 'code' && (
                      <Button size="sm" variant="ghost" onClick={() => runCell(cell.id)} disabled={isRunning}>
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => deleteCell(cell.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Cell Content */}
                <div className={cn(
                  "p-4",
                  cell.type === 'code' && "bg-[#1e1e1e]"
                )}>
                  <textarea
                    value={cell.content}
                    onChange={(e) => updateCell(cell.id, e.target.value)}
                    className={cn(
                      "w-full min-h-[100px] resize-none outline-none",
                      cell.type === 'code' 
                        ? "bg-transparent text-[#d4d4d4] font-mono text-sm" 
                        : "bg-transparent"
                    )}
                    placeholder={cell.type === 'code' ? '# Enter your code...' : 'Enter markdown...'}
                  />
                </div>

                {/* Output */}
                {cell.output && (
                  <div className="px-4 py-3 bg-[#252526] border-t border-[#3e3e42]">
                    <pre className="text-sm text-[#cccccc] font-mono whitespace-pre-wrap">
                      {cell.output}
                    </pre>
                  </div>
                )}

                {/* Add Cell Button */}
                <div className="flex justify-center py-2 border-t border-border bg-secondary/20">
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => addCell('code', cell.id)}>
                      <Plus className="w-3 h-3 mr-1" /> Code
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => addCell('markdown', cell.id)}>
                      <Plus className="w-3 h-3 mr-1" /> Text
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
