'use server';

import { suggestReligiousPassages, type SuggestReligiousPassagesOutput } from '@/ai/flows/suggest-religious-passages';
import { createServerClient } from '@/lib/supabase/server';
import { createBuildTimeClient } from '@/lib/supabase/build-time';
import type { Tables } from '@/lib/supabase.type';
import type { Article } from '@/lib/data';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

const COMMENTS_PER_PAGE = 5;
const ARTICLES_PER_PAGE = 6;

/**
 * Default fallback image for blog posts without a cover photo
 */
const DEFAULT_COVER_PHOTO = PlaceHolderImages.find(p => p.id === 'fallback')!;

/**
 * Maps a Supabase blog row to the Article type for UI display
 * @param blog - Blog row from Supabase
 * @returns Formatted article for display
 */
const mapBlogToArticle = (blog: Tables<'Blogs'>): Article => {
  const coverPhoto: ImagePlaceholder = blog.cover_photo
    ? { id: blog.id.toString(), src: blog.cover_photo, alt: blog.title || 'Blog post cover' }
    : DEFAULT_COVER_PHOTO;

  return {
    id: blog.id.toString(),
    title: blog.title || 'Untitled',
    author: blog.author || 'Anonymous',
    authorAvatarUrl: `https://picsum.photos/seed/${blog.author || 'anon'}/40/40`,
    date: new Date(blog.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    excerpt: blog.excerpt || '',
    content: blog.content || '',
    tags: blog.tags || [],
    coverPhoto: coverPhoto,
    comments: [],
  };
};

/**
 * Fetches paginated blog articles from Supabase
 * @param page - Page number (1-indexed)
 * @returns Object containing articles array, hasMore flag, and total pages
 */
export async function getArticles({ page = 1 }: { page: number }): Promise<{ articles: Article[], hasMore: boolean, totalPages: number }> {
  const supabase = await createServerClient();
  const from = (page - 1) * ARTICLES_PER_PAGE;
  const to = from + ARTICLES_PER_PAGE - 1;

  const { data, error, count } = await supabase
    .from('Blogs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching articles:', error);
    return { articles: [], hasMore: false, totalPages: 0 };
  }

  const articles = data.map(mapBlogToArticle);
  const totalPages = Math.ceil((count ?? 0) / ARTICLES_PER_PAGE);
  const hasMore = page * ARTICLES_PER_PAGE < (count ?? 0);
  
  return { articles, hasMore, totalPages };
}

/**
 * Fetches a single blog article by ID
 * @param id - Numeric blog ID
 * @returns Article object or null if not found
 */
export async function getArticleById(id: number): Promise<Article | null> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('Blogs')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        console.error('Error fetching article by id:', error);
        return null;
    }

    return mapBlogToArticle(data);
}

/**
 * Fetches all blog IDs for static site generation
 * Uses build-time client to avoid cookie access during build
 * @returns Array of objects containing blog IDs as strings
 */
export async function getAllArticleIds(): Promise<{ id: string }[]> {
    try {
        const supabase = createBuildTimeClient();
        const { data, error } = await supabase.from('Blogs').select('id');

        if (error) {
            console.error('Error fetching ids:', error);
            return [];
        }
        // Handle case where data could be null
        return (data || []).map((item: { id: number }) => ({ id: item.id.toString() }));
    } catch (error) {
        console.error('Error creating Supabase client or fetching IDs:', error);
        // Return empty array if environment variables aren't available or other error occurs
        // This allows the build to continue without static generation
        return [];
    }
}

/**
 * Gets AI-powered religious passage suggestions based on input text
 * @param text - User input text to analyze
 * @returns Suggestions object or error object
 */
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

/**
 * Posts a new comment to a blog post
 * @param blog_id - ID of the blog post
 * @param name - Commenter's name
 * @param text - Comment text
 * @returns Object with comment data or error message
 */
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

  const supabase = await createServerClient();
  
  // Supabase client type inference issue with async cookies API in Next.js 15
  // @ts-ignore
  const { data, error } = await supabase.from('comments').insert({ name, comment: text, blog_id }).select().single();

  if (error) {
    console.error('Error posting comment:', error);
    return { data: null, error: 'Failed to post comment. Please try again later.' };
  }
  
  return { data, error: null };
}

/**
 * Fetches paginated comments for a blog post
 * @param blogId - ID of the blog post
 * @param page - Page number (1-indexed)
 * @returns Object containing comments array and hasMore flag
 */
export async function getComments({ blogId, page = 1 }: { blogId: number, page: number }): Promise<{ comments: Tables<'comments'>[], hasMore: boolean }> {
  const supabase = await createServerClient();
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

/**
 * Subscribes a user to the newsletter.
 * @param email The user's email address.
 * @returns An object with a success or error message.
 */
export async function subscribeToNewsletter(
  email: string
): Promise<{ success?: string; error?: string }> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.from('subscribers').insert({ email });

  if (error) {
    if (error.code === '23505') { // Unique constraint violation
      return { error: 'This email is already subscribed.' };
    }
    console.error('Error subscribing to newsletter:', error);
    return { error: 'Could not subscribe. Please try again later.' };
  }

  return { success: 'Thank you for subscribing!' };
}
