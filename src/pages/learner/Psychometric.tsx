import { psychometricData } from '@/data/dummyData';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, Target, MessageSquare, Code, Lightbulb, 
  TrendingUp, Zap, Heart, AlertTriangle
} from 'lucide-react';

export default function Psychometric() {
  const { logicalReasoning, verbalAbility, codingAptitude, problemSolving, analyticalThinking, creativity, personality, insights } = psychometricData;

  const aptitudeMetrics = [
    { label: 'Logical Reasoning', value: logicalReasoning, icon: Brain, color: 'primary' },
    { label: 'Verbal Ability', value: verbalAbility, icon: MessageSquare, color: 'info' },
    { label: 'Coding Aptitude', value: codingAptitude, icon: Code, color: 'success' },
    { label: 'Problem Solving', value: problemSolving, icon: Target, color: 'warning' },
    { label: 'Analytical Thinking', value: analyticalThinking, icon: TrendingUp, color: 'purple' },
    { label: 'Creativity', value: creativity, icon: Lightbulb, color: 'pink' },
  ];

  const personalityTraits = [
    { label: 'Openness', value: personality.openness },
    { label: 'Conscientiousness', value: personality.conscientiousness },
    { label: 'Extraversion', value: personality.extraversion },
    { label: 'Agreeableness', value: personality.agreeableness },
    { label: 'Emotional Stability', value: 100 - personality.neuroticism },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Psychometric Analysis</h1>
        <p className="text-muted-foreground">Comprehensive cognitive and personality assessment</p>
      </div>

      {/* Aptitude Metrics */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">Cognitive Aptitude</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aptitudeMetrics.map((metric) => (
            <div key={metric.label} className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${metric.color}/10 flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}%</p>
                </div>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>
      </section>

      {/* Radar Chart Visualization */}
      <section className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-bold mb-6">Skill Radar</h3>
          <div className="aspect-square relative flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs">
              {/* Radar background */}
              {[100, 80, 60, 40, 20].map((r, i) => (
                <polygon
                  key={i}
                  points={Array.from({ length: 6 }, (_, j) => {
                    const angle = (j * 60 - 90) * Math.PI / 180;
                    return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
                  }).join(' ')}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                />
              ))}
              {/* Radar data */}
              <polygon
                points={[
                  [logicalReasoning, 0],
                  [verbalAbility, 60],
                  [codingAptitude, 120],
                  [problemSolving, 180],
                  [analyticalThinking, 240],
                  [creativity, 300],
                ].map(([value, angle]) => {
                  const rad = (angle - 90) * Math.PI / 180;
                  return `${100 + value * Math.cos(rad)},${100 + value * Math.sin(rad)}`;
                }).join(' ')}
                fill="hsl(var(--primary) / 0.3)"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
              {/* Labels */}
              {['Logic', 'Verbal', 'Code', 'Problem', 'Analysis', 'Creative'].map((label, i) => {
                const angle = (i * 60 - 90) * Math.PI / 180;
                return (
                  <text
                    key={label}
                    x={100 + 115 * Math.cos(angle)}
                    y={100 + 115 * Math.sin(angle)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-muted-foreground text-xs"
                  >
                    {label}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Cognitive Heatmap */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-bold mb-6">Cognitive Heatmap</h3>
          <div className="grid grid-cols-4 gap-2">
            {psychometricData.cognitiveHeatmap.flat().map((value, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg flex items-center justify-center font-bold text-sm"
                style={{
                  backgroundColor: `hsl(var(--primary) / ${value / 100})`,
                  color: value > 60 ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'
                }}
              >
                {value}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>Low Activity</span>
            <div className="flex gap-1">
              {[20, 40, 60, 80, 100].map(v => (
                <div 
                  key={v}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: `hsl(var(--primary) / ${v / 100})` }}
                />
              ))}
            </div>
            <span>High Activity</span>
          </div>
        </div>
      </section>

      {/* Personality Analysis */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">Personality Profile (Big Five)</h2>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="space-y-6">
            {personalityTraits.map((trait) => (
              <div key={trait.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{trait.label}</span>
                  <span className="text-muted-foreground">{trait.value}%</span>
                </div>
                <Progress value={trait.value} className="h-3" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" /> AI Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, i) => (
            <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-sm">{insight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
