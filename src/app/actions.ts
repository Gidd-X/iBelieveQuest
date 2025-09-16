'use server';

import { suggestReligiousPassages, type SuggestReligiousPassagesOutput } from '@/ai/flows/suggest-religious-passages';
import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

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

export async function postComment(slug: string, name: string, text: string) {
  if (!name || name.trim().length === 0) {
    return { error: 'Please enter your name.' };
  }
  if (!text || text.trim().length === 0) {
    return { error: 'Please enter a comment.' };
  }
  if (text.trim().length > 500) {
    return { error: 'Comment cannot be longer than 500 characters.' };
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('comments')
    .insert([{ name, comment: text, post_slug: slug }]);

  if (error) {
    console.error('Error posting comment:', error);
    return { error: 'Failed to post comment. Please try again later.' };
  }
  
  revalidatePath(`/posts/${slug}`);

  return { success: true };
}
