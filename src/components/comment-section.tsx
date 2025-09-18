
'use client';

import { useState, useEffect, useTransition } from 'react';
import { getComments, postComment, getPassageSuggestions } from '@/app/actions';
import type { Tables } from '@/lib/supabase.type';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, Send, User } from 'lucide-react';
import AiSuggester from './ai-suggester';
import { Separator } from './ui/separator';

type FormattedComment = Tables<'comments'> & {
  avatarUrl: string;
  date: string;
};

const formatComment = (comment: Tables<'comments'>): FormattedComment => ({
  ...comment,
  avatarUrl: `https://picsum.photos/seed/${comment.name}/40/40`,
  date: `${formatDistanceToNow(new Date(comment.created_at))} ago`,
});

export default function CommentSection({ blogId, slug }: { blogId: number; slug: string }) {
  const [comments, setComments] = useState<FormattedComment[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  
  const fetchAndSetComments = async (pageNum: number) => {
    setIsFetching(true);
    const { comments: newComments, hasMore: newHasMore } = await getComments({ blogId, page: pageNum });
    const formatted = newComments.map(formatComment);
    setComments(prev => pageNum === 1 ? formatted : [...prev, ...formatted]);
    setHasMore(newHasMore);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchAndSetComments(1);
  }, [blogId]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAndSetComments(nextPage);
  };

  const handleCommentPosted = (newComment: Tables<'comments'>) => {
    setComments(prev => [formatComment(newComment), ...prev]);
  };

  return (
    <>
      <section id="comments" className="space-y-8">
        <h2 className="flex items-center gap-3 font-headline text-3xl font-bold">
          <MessageSquare className="text-primary" />
          <span>Comments ({comments.length})</span>
        </h2>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.avatarUrl} alt={comment.name || 'User'} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-lg bg-secondary/30 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-semibold">{comment.name}</p>
                  <p className="text-xs text-muted-foreground">{comment.date}</p>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && !isFetching && (
            <p className="text-muted-foreground">Be the first to leave a comment.</p>
          )}
        </div>
        {hasMore && (
          <div className="text-center">
            <Button onClick={handleLoadMore} disabled={isFetching} variant="outline">
              {isFetching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Comments'
              )}
            </Button>
          </div>
        )}
      </section>

      <Separator className="my-12" />

      <AiSuggester slug={slug} blogId={blogId} onCommentPosted={handleCommentPosted} />
    </>
  );
}
