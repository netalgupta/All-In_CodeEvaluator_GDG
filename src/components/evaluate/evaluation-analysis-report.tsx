'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PersonalizedCodeFeedbackOutput } from '@/ai/flows/personalized-code-feedback';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import { Star, Sparkles, BookOpen, Lightbulb, BrainCircuit, AlertTriangle, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface EvaluationAnalysisReportProps {
  result: PersonalizedCodeFeedbackOutput;
}

const CustomPolarAngleAxisTick = ({ payload, x, y, cx, cy, ...rest }: any) => {
  return (
    <text
      {...rest}
      y={y + (y - cy) / 10}
      x={x + (x - cx) / 10}
      className="fill-muted-foreground text-sm"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {payload.value}
    </text>
  );
};


export function EvaluationAnalysisReport({
  result,
}: EvaluationAnalysisReportProps) {

  const chartData = [
    { skill: 'Readability', score: result.readability, fullMark: 5 },
    { skill: 'Logic', score: result.logic, fullMark: 5 },
    { skill: 'Optimization', score: result.optimization, fullMark: 5 },
    { skill: 'Maintainability', score: result.maintainability, fullMark: 5 },
  ];

  const chartConfig = {
    score: {
      label: 'Score',
      color: 'hsl(var(--chart-1))',
    },
  };

  const aiLikelihood = result.aiDetection.likelihood;
  const getLikelihoodColor = (likelihood: number) => {
    if (likelihood > 75) return 'text-destructive';
    if (likelihood > 50) return 'text-yellow-400';
    return 'text-green-400';
  }

  return (
    <Card className="mt-10 bg-card/50 border-border/50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="text-primary w-6 h-6" />
          Evaluation Analysis Report
        </CardTitle>
        <CardDescription>
          Here's a detailed breakdown of your code evaluation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="overview" className="py-2">
                <Lightbulb className="w-4 h-4 mr-2"/>
                Feedback & Analysis
            </TabsTrigger>
             <TabsTrigger value="ai-detection" className="py-2">
                <BrainCircuit className="w-4 h-4 mr-2"/>
                AI Authorship
            </TabsTrigger>
            <TabsTrigger value="explanation" className="py-2">
                <BookOpen className="w-4 h-4 mr-2"/>
                Code Explanation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 font-headline">Overall Rating</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < result.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-muted-foreground'
                        }
                      />
                    ))}
                    <span className="ml-2 font-bold text-lg">
                      {result.rating.toFixed(1)} / 5.0
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 font-headline">Key Feedback</h3>
                  <div className="prose prose-sm dark:prose-invert text-muted-foreground bg-muted/20 p-4 rounded-md border border-border/50">
                    <ul className="list-disc pl-5 space-y-2">
                       {result.feedback.split('\n').filter(fb => fb.trim().startsWith('*')).map((fb, i) => (
                          <li key={i}>{fb.trim().substring(1).trim()}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-center font-headline">Skills Analysis</h3>
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[300px]"
                >
                  <RadarChart data={chartData} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <PolarAngleAxis dataKey="skill" tick={<CustomPolarAngleAxisTick />} />
                    <PolarGrid />
                    <PolarRadiusAxis
                      tick={({ x, y, payload }) => (
                        <text
                          x={x}
                          y={y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-muted-foreground text-xs"
                        >
                          {payload.value}
                        </text>
                      )}
                      angle={30}
                      domain={[0, 5]}
                      tickCount={6}
                    />
                    <Radar
                      dataKey="score"
                      fill="var(--color-score)"
                      fillOpacity={0.6}
                      dot={{
                        r: 4,
                        fillOpacity: 1,
                      }}
                    />
                  </RadarChart>
                </ChartContainer>
              </div>
            </div>
          </TabsContent>
           <TabsContent value="ai-detection" className="mt-6">
              <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <BrainCircuit className="text-primary w-5 h-5"/>
                        AI Authorship Analysis
                    </CardTitle>
                    <CardDescription>An assessment of the likelihood that this code was generated by an AI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                     <div className={`font-bold text-5xl font-headline ${getLikelihoodColor(aiLikelihood)}`}>
                        {aiLikelihood}%
                     </div>
                     <p className="text-muted-foreground">Likelihood of AI Generation</p>
                     <Progress value={aiLikelihood} className="mt-4 h-3" indicatorClassName={
                       aiLikelihood > 75 ? 'bg-destructive' : aiLikelihood > 50 ? 'bg-yellow-400' : 'bg-primary'
                     }/>
                  </div>

                  <div className="flex items-start gap-4 bg-muted/20 p-4 rounded-lg border border-border/50">
                    {aiLikelihood > 75 ? <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" /> :
                     aiLikelihood > 50 ? <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" /> :
                     <UserCheck className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    }
                    <div>
                      <h4 className="font-semibold font-headline">Analyst's Reasoning</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {result.aiDetection.reasoning}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </TabsContent>
          <TabsContent value="explanation" className="mt-6">
              <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <BookOpen className="text-primary w-5 h-5"/>
                        Code Explained
                    </CardTitle>
                    <CardDescription>A beginner-friendly breakdown of your code.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm dark:prose-invert text-muted-foreground space-y-4">
                        {result.codeExplanation.split('\n').map((line, index) => {
                          if(line.trim() === '') return null;
                          return <p key={index}>{line}</p>
                        })}
                    </div>
                </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
