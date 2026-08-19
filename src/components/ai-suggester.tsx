'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getPassageSuggestions, postComment } from '@/app/actions';
import { Sparkles, BookText, Loader2, Quote, AlertCircle, Send, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Tables } from '@/lib/supabase.type';

import { motion, AnimatePresence } from 'motion/react';

interface AiSuggesterProps {
  blogId: number;
  onCommentPosted: (comment: Tables<'comments'>) => void;
}

/**
 * AiSuggester component
 * Allows users to post comments and get AI-powered religious passage suggestions
 * @param blogId - ID of the blog post
 * @param onCommentPosted - Callback when a comment is successfully posted
 */
export default function AiSuggester({ blogId, onCommentPosted }: AiSuggesterProps): JSX.Element {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);
  const [isPostingComment, startPostingComment] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetSuggestions = async (): Promise<void> => {
    setIsGettingSuggestions(true);
    setError(null);
    setSuggestions([]);

    const result = await getPassageSuggestions(text);

    if ('error' in result) {
      setError(result.error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: result.error,
      });
    } else {
      setSuggestions(result.suggestions);
    }
    setIsGettingSuggestions(false);
  };
  
  const handlePostComment = async (): Promise<void> => {
    startPostingComment(async () => {
      setError(null);
      const { data: newComment, error: postError } = await postComment(blogId, name, text);
      if (postError) {
        setError(postError);
        toast({
          variant: 'destructive',
          title: 'Failed to post comment',
          description: postError,
        });
      } else if (newComment) {
        toast({
          title: 'Comment posted!',
          description: 'Your comment has been successfully posted.',
        });
        setName('');
        setText('');
        setSuggestions([]);
        onCommentPosted(newComment);
      }
    });
  };

  const isLoading = isGettingSuggestions || isPostingComment;

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Sparkles className="text-accent" />
            <span>Engage &amp; Discover</span>
          </CardTitle>
          <CardDescription>
            Leave a comment, or just share a thought. Use our AI tool to find related passages to deepen the conversation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-label="Your Name"
                        className="pl-10"
                        disabled={isLoading}
                    />
                </div>
                <Textarea
                    placeholder="Start writing your thoughts here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                    aria-label="Your comment or thought"
                    disabled={isLoading}
                />
            </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handlePostComment} disabled={isLoading || !text || !name}>
              {isPostingComment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Post Comment
                </>
              )}
            </Button>
            <Button onClick={handleGetSuggestions} disabled={isLoading || !text} variant="outline">
              {isGettingSuggestions ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Suggestions...
                </>
              ) : (
                <>
                  <BookText className="mr-2 h-4 w-4" />
                  Get Passage Suggestions
                </>
              )}
            </Button>
          </div>
        </CardContent>
        
        <AnimatePresence>
          {(isGettingSuggestions || suggestions.length > 0 || error) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <CardFooter className="flex flex-col items-start gap-4 border-t pt-6">
                  {isGettingSuggestions && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center text-muted-foreground"
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Searching sacred texts for relevant passages...</span>
                    </motion.div>
                  )}
                  {error && !isLoading && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {suggestions.length > 0 && !isGettingSuggestions && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                      className="w-full space-y-4"
                    >
                      <h4 className="font-semibold">Suggested Passages:</h4>
                      <ul className="space-y-4">
                        {suggestions.map((suggestion, index) => (
                          <motion.li
                            key={index}
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: { opacity: 1, y: 0 }
                            }}
                            className="flex gap-3"
                          >
                            <Quote className="h-5 w-5 flex-shrink-0 text-primary" />
                            <p className="border-l-2 border-accent pl-4 italic text-muted-foreground">{suggestion}</p>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </section>
  );
}
