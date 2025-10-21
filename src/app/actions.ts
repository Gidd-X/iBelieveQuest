'use server';

import { suggestReligiousPassages, type SuggestReligiousPassagesOutput } from '@/ai/flows/suggest-religious-passages';
import { createServerClient } from '@/lib/supabase/server';
import type { Tables } from '@/lib/supabase.type';
import { revalidatePath } from 'next/cache';
import type { Article } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const COMMENTS_PER_PAGE = 5;
const ARTICLES_PER_PAGE = 6;

// Helper to map Supabase blog row to Article type
const mapBlogToArticle = (blog: Tables<'Blogs'>): Article => {
  const imageId = `article-${blog.id}`;
  const image = PlaceHolderImages.find(p => p.id === imageId) || PlaceHolderImages.find(p => p.id === 'fallback')!;
  
  return {
    id: blog.id.toString(),
    slug: blog.slug || blog.id.toString(),
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
    image: {
      ...image,
      imageUrl: blog.cover_photo || image.imageUrl,
    },
    comments: [],
  };
};

export async function getArticles({ page = 1 }: { page: number }): Promise<{ articles: Article[], hasMore: boolean, totalPages: number }> {
  const supabase = createServerClient();
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

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from('Blogs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        console.error('Error fetching article by slug:', error);
        return null;
    }

    return mapBlogToArticle(data);
}

export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('Blogs').select('slug');

    if (error) {
        console.error('Error fetching slugs:', error);
        return [];
    }
    return data.filter(item => item.slug).map(item => ({ slug: item.slug! }));
}


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
