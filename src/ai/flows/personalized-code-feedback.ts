'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized feedback on code submissions using AI.
 *
 * It includes:
 * - `getPersonalizedCodeFeedback`: A function to initiate the code feedback process.
 * - `PersonalizedCodeFeedbackInput`: The input type for the `getPersonalizedCodeFeedback` function.
 * - `PersonalizedCodeFeedbackOutput`: The output type for the `getPersonalizedCodeFeedback` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCodeFeedbackInputSchema = z.object({
  code: z.string().describe('The code submitted by the user.'),
  programmingLanguage: z.string().describe('The programming language of the code.'),
  userSkillLevel: z.string().describe('The skill level of the user (e.g., beginner, intermediate, advanced).'),
  userCodingStyle: z.string().optional().describe('The coding style of the user (e.g., verbose, concise).'),
});
export type PersonalizedCodeFeedbackInput = z.infer<typeof PersonalizedCodeFeedbackInputSchema>;

const PersonalizedCodeFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Personalized feedback on the code submission as 2-3 bullet points.'),
  rating: z.number().describe('A rating of the code submission (e.g., 1-5).'),
  readability: z.number().describe('A rating for readability (1-5).'),
  logic: z.number().describe('A rating for logic (1-5).'),
  optimization: z.number().describe('A rating for optimization (1-5).'),
  maintainability: z.number().describe('A rating for maintainability (1-5).'),
});
export type PersonalizedCodeFeedbackOutput = z.infer<typeof PersonalizedCodeFeedbackOutputSchema>;

export async function getPersonalizedCodeFeedback(input: PersonalizedCodeFeedbackInput): Promise<PersonalizedCodeFeedbackOutput> {
  return personalizedCodeFeedbackFlow(input);
}

const personalizedCodeFeedbackPrompt = ai.definePrompt({
  name: 'personalizedCodeFeedbackPrompt',
  input: {schema: PersonalizedCodeFeedbackInputSchema},
  output: {schema: PersonalizedCodeFeedbackOutputSchema},
  prompt: `You are an AI code reviewer providing personalized feedback on code submissions.

  Your goal is to provide feedback that is friendly, easy to understand, human-like, and beginner-safe.
  Avoid robotic or harsh wording.

  Consider the user's skill level and coding style when providing feedback.

  Programming Language: {{{programmingLanguage}}}
  User Skill Level: {{{userSkillLevel}}}
  User Coding Style: {{{userCodingStyle}}}

  Code:
  {{{
    code
  }}}

  Provide personalized feedback as 2-3 bullet points and a rating (1-5) for the code submission.
  Also provide ratings (1-5) for readability, logic, optimization, and maintainability.
  Ensure that the feedback is tailored to the user's skill level and coding style.
  The feedback must include specific suggestions for improvement.
`,
});

const personalizedCodeFeedbackFlow = ai.defineFlow(
  {
    name: 'personalizedCodeFeedbackFlow',
    inputSchema: PersonalizedCodeFeedbackInputSchema,
    outputSchema: PersonalizedCodeFeedbackOutputSchema,
  },
  async input => {
    const {output} = await personalizedCodeFeedbackPrompt(input);
    return output!;
  }
);
