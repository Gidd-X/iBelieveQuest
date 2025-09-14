'use server';

import { suggestReligiousPassages, type SuggestReligiousPassagesOutput } from '@/ai/flows/suggest-religious-passages';

export async function getPassageSuggestions(text: string): Promise<SuggestReligiousPassagesOutput | { error: string }> {
  if (!text || text.trim().length < 10) {
    return { error: 'Please enter more text to get suggestions.' };
  }
  
  try {
    const result = await suggestReligiousPassages({ text });
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get suggestions. Please try again later.' };
  }
}
