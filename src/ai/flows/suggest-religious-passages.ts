'use server';
/**
 * @fileOverview An AI agent that suggests relevant passages from religious texts based on the content being written.
 *
 * - suggestReligiousPassages - A function that suggests relevant passages.
 * - SuggestReligiousPassagesInput - The input type for the suggestReligiousPassages function.
 * - SuggestReligiousPassagesOutput - The return type for the suggestReligiousPassages function.
 */

import { z } from 'zod';
import { getAi } from '@/ai/genkit';

const SuggestReligiousPassagesInputSchema = z.object({
  text: z
    .string()
    .describe('The content of the article or comment being written.'),
});
export type SuggestReligiousPassagesInput = z.infer<
  typeof SuggestReligiousPassagesInputSchema
>;

const SuggestReligiousPassagesOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of relevant passages from religious texts.'),
});
export type SuggestReligiousPassagesOutput = z.infer<
  typeof SuggestReligiousPassagesOutputSchema
>;

let suggestFlow: any = null;

export async function initFlows() {
  if (suggestFlow) return suggestFlow;

  const ai = await getAi();

  const prompt = ai.definePrompt({
    name: 'suggestReligiousPassagesPrompt',
    input: {schema: SuggestReligiousPassagesInputSchema},
    output: {schema: SuggestReligiousPassagesOutputSchema},
    prompt: `You are a helpful assistant that suggests relevant passages from religious texts based on the content provided. The passages should enrich the articles and provide deeper context to readers.

Content: {{{text}}}

Suggest religious passages:`,
  });

  suggestFlow = ai.defineFlow(
    {
      name: 'suggestReligiousPassagesFlow',
      inputSchema: SuggestReligiousPassagesInputSchema,
      outputSchema: SuggestReligiousPassagesOutputSchema,
    },
    async (input: any) => {
      const {output} = await prompt(input);
      return output!;
    }
  );

  return suggestFlow;
}

export async function suggestReligiousPassages(
  input: SuggestReligiousPassagesInput
): Promise<SuggestReligiousPassagesOutput> {
  const flow = await initFlows();
  return flow(input);
}
