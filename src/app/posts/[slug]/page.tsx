import { notFound } from 'next/navigation';
import Image from 'next/image';
import { articles, getArticleBySlug } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import CommentSection from '@/components/comment-section';

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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="default" className="capitalize">{tag}</Badge>
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

      <CommentSection blogId={parseInt(article.id, 10)} slug={params.slug} />

    </article>
  );
}
