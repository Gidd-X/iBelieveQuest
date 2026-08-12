import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleById, getAllArticleIds } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';
import CommentSection from '@/components/comment-section';
import { ReadingProgress } from '@/components/reading-progress';
import { AnimatedArticle } from '@/components/animated-article';

// Allow dynamic params for articles not in generateStaticParams
export const dynamicParams = true;

type ArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * Generates metadata for the article page
 */
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(parseInt(id, 10));
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

/**
 * Generates static paths for all articles
 */
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const ids = await getAllArticleIds();
  return ids;
}

/**
 * Article detail page component
 * Displays full article content with comments section
 */
export default async function ArticlePage({ params }: ArticlePageProps): Promise<JSX.Element> {
  const { id } = await params;
  const articleId = parseInt(id, 10);
  
  if (isNaN(articleId)) {
    notFound();
  }
  
  const article = await getArticleById(articleId);

  if (!article) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <AnimatedArticle className="mx-auto max-w-4xl">
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
          src={article.coverPhoto.src}
          alt={article.coverPhoto.alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div
        className="space-y-6 text-lg leading-relaxed text-foreground/90 [&_p]:mb-4"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      
      <Separator className="my-12" />

      <CommentSection blogId={parseInt(article.id, 10)} />
    </AnimatedArticle>
    </>
  );
}
