import { getArticles } from '@/app/actions';
import ArticleCard from '@/components/article-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

/**
 * Home page component
 * Displays paginated list of blog articles
 */
export default async function Home({ searchParams }: HomePageProps): Promise<JSX.Element> {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const { articles, hasMore, totalPages } = await getArticles({ page });

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">Welcome to iBelieve Quest</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A space where faith meets questions, and questions lead to discovery.
        </p>
      </div>
      
      {articles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>No articles found.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button asChild variant="outline" disabled={page <= 1}>
            <Link href={`/?page=${page - 1}`}>
              <ArrowLeft />
              <span>Previous</span>
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button asChild variant="outline" disabled={!hasMore}>
            <Link href={`/?page=${page + 1}`}>
              <span>Next</span>
              <ArrowRight />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
