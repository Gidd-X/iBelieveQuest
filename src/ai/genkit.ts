import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  // @ts-ignore - bypassing version mismatch type error between @genkit-ai/core and @genkit-ai/googleai
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
