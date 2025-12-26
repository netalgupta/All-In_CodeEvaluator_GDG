'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Star, Sparkles } from 'lucide-react';
import { PersonalizedCodeFeedbackOutput, getPersonalizedCodeFeedback } from '@/ai/flows/personalized-code-feedback';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  programmingLanguage: z.string().min(1, 'Please select a language.'),
  userSkillLevel: z.string().min(1, 'Please select your skill level.'),
  code: z.string().min(20, 'Please enter at least 20 characters of code.'),
  userCodingStyle: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function EvaluationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedCodeFeedbackOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programmingLanguage: 'javascript',
      userSkillLevel: 'beginner',
      code: '',
      userCodingStyle: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const feedback = await getPersonalizedCodeFeedback(values);
      setResult(feedback);
    } catch (e) {
      console.error(e);
      setError('An error occurred while evaluating your code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="programmingLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programming Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userSkillLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your skill level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your code here..."
                    className="min-h-[250px] font-code text-sm bg-black/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto font-bold transition-all duration-300 hover:scale-105">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Evaluating...
              </>
            ) : (
              'Evaluate Code'
            )}
          </Button>
        </form>
      </Form>

      {error && <p className="mt-8 text-destructive text-center">{error}</p>}

      {result && (
        <Card className="mt-10 bg-card/50 border-border/50 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Sparkles className="text-primary w-6 h-6" />
              Evaluation Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Rating</h3>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={i < result.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}
                  />
                ))}
                <span className="ml-2 font-bold text-lg">{result.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Feedback</h3>
              <div className="p-4 rounded-md bg-black/30 border border-border/50 text-muted-foreground whitespace-pre-wrap">
                {result.feedback}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
