import { notFound } from 'next/navigation';
import Image from 'next/image';
import { articles, getArticleBySlug } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import AiSuggester from '@/components/ai-suggester';
import { MessageSquare, User } from 'lucide-react';
import type { Metadata } from 'next';

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return {
      title: 'Not Found'
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
          ))}
        </div>
        <h1 className="font-headline text-4xl font-bold leading-tight text-primary md:text-5xl">
          {article.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={article.authorAvatarUrl} alt={article.author} />
              <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{article.author}</span>
          </div>
          <span>&bull;</span>
          <span>{article.date}</span>
        </div>
      </div>

      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg shadow-lg md:h-96">
        <Image
          src={article.image.imageUrl}
          alt={article.image.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={article.image.imageHint}
        />
      </div>

      <div
        className="space-y-6 text-lg leading-relaxed text-foreground/90 [&_p]:mb-4"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      
      <Separator className="my-12" />

      <section id="comments" className="space-y-8">
        <h2 className="flex items-center gap-3 font-headline text-3xl font-bold">
            <MessageSquare className="text-primary" />
            <span>Comments ({article.comments.length})</span>
        </h2>
        <div className="space-y-6">
          {article.comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-lg bg-secondary/30 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-semibold">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">{comment.date}</p>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
           {article.comments.length === 0 && (
            <p className="text-muted-foreground">Be the first to leave a comment.</p>
          )}
        </div>
      </section>

      <Separator className="my-12" />

      <AiSuggester />

    </article>
  );
}
