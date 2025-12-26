import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EvaluationForm } from '@/components/evaluate/evaluation-form';

export default function EvaluatePage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight">Code Evaluation</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Submit your code to get personalized feedback and a rating from our AI.
          </p>
        </header>

        <Card className="bg-card/50 border-border/50 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline">Submit Your Code</CardTitle>
            <CardDescription>
              Select the language, your skill level, and paste your code below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EvaluationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
