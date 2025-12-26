'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PersonalizedCodeFeedbackOutput } from '@/ai/flows/personalized-code-feedback';
import { Label, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import { Star, Sparkles } from 'lucide-react';

interface EvaluationAnalysisReportProps {
  result: PersonalizedCodeFeedbackOutput;
}

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
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Overall Rating</h3>
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
              <h3 className="font-semibold mb-2">Key Feedback</h3>
              <div className="p-4 rounded-md bg-muted/20 border border-border/50 text-muted-foreground whitespace-pre-wrap">
                {result.feedback}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-center">Skills Analysis</h3>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarAngleAxis dataKey="skill" />
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
      </CardContent>
    </Card>
  );
}
