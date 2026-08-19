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
      
      <div className="relative w-full overflow-hidden h-[40vh] md:h-[50vh]">
        <Image
          src={article.coverPhoto.src}
          alt={article.coverPhoto.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <AnimatedArticle className="mx-auto max-w-4xl px-6 pt-12 pb-24">
        <div className="mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold leading-tight text-foreground mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.authorAvatarUrl} alt={article.author} />
                <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{article.author}</p>
                <p className="text-xs text-muted-foreground">{article.date}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div
          className="space-y-6 text-lg leading-relaxed text-foreground/90 [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <Separator className="my-16" />

        <CommentSection blogId={parseInt(article.id, 10)} />
      </AnimatedArticle>
    </>
  );
}
