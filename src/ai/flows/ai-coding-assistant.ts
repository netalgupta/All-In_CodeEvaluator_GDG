'use server';

/**
 * @fileOverview An AI-powered chatbot for coding-related questions and guidance.
 *
 * - aiCodingAssistant - A function that provides assistance with coding questions.
 * - AICodingAssistantInput - The input type for the aiCodingAssistant function.
 * - AICodingAssistantOutput - The return type for the aiCodingAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICodingAssistantInputSchema = z.object({
  query: z.string().describe('The coding-related question or request.'),
});
export type AICodingAssistantInput = z.infer<typeof AICodingAssistantInputSchema>;

const AICodingAssistantOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the coding question.'),
});
export type AICodingAssistantOutput = z.infer<typeof AICodingAssistantOutputSchema>;

export async function aiCodingAssistant(input: AICodingAssistantInput): Promise<AICodingAssistantOutput> {
  return aiCodingAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCodingAssistantPrompt',
  input: {schema: AICodingAssistantInputSchema},
  output: {schema: AICodingAssistantOutputSchema},
  prompt: `You are an AI-powered chatbot designed to assist users with coding-related questions and provide guidance.

  Respond to the following query with helpful and informative information. Be friendly, easy to understand, human-like and beginner-safe.

  Query: {{{query}}}`,
});

const aiCodingAssistantFlow = ai.defineFlow(
  {
    name: 'aiCodingAssistantFlow',
    inputSchema: AICodingAssistantInputSchema,
    outputSchema: AICodingAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
