'use server';

import { suggestReligiousPassages, type SuggestReligiousPassagesOutput } from '@/ai/flows/suggest-religious-passages';
import { createServerClient } from '@/lib/supabase/server';
import type { Tables } from '@/lib/supabase.type';
import { revalidatePath } from 'next/cache';

const COMMENTS_PER_PAGE = 5;

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

export async function postComment(blog_id: number, name: string, text: string): Promise<{ data: Tables<'comments'> | null, error: string | null }> {
  if (!name || name.trim().length === 0) {
    return { data: null, error: 'Please enter your name.' };
  }
  if (!text || text.trim().length === 0) {
    return { data: null, error: 'Please enter a comment.' };
  }
  if (text.trim().length > 500) {
    return { data: null, error: 'Comment cannot be longer than 500 characters.' };
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('comments')
    .insert([{ name, comment: text, blog_id }])
    .select()
    .single();

  if (error) {
    console.error('Error posting comment:', error);
    return { data: null, error: 'Failed to post comment. Please try again later.' };
  }
  
  // Instead of revalidating the whole path, we will return the new comment
  // and the client will add it to the state.
  return { data, error: null };
}

export async function getComments({ blogId, page = 1 }: { blogId: number, page: number }): Promise<{ comments: Tables<'comments'>[], hasMore: boolean }> {
  const supabase = createServerClient();
  const from = (page - 1) * COMMENTS_PER_PAGE;
  const to = from + COMMENTS_PER_PAGE - 1;

  const { data: comments, error, count } = await supabase
    .from('comments')
    .select('*', { count: 'exact' })
    .eq('blog_id', blogId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching comments:', error);
    return { comments: [], hasMore: false };
  }

  const hasMore = (count ?? 0) > page * COMMENTS_PER_PAGE;

  return { comments: comments || [], hasMore };
}
