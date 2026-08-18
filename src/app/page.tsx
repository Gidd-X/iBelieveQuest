import { Suspense } from 'react';
import { getArticles } from '@/app/actions';
import ArticleCard from '@/components/article-card';
import ArticleSkeleton from '@/components/article-skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatedGrid } from '@/components/animated-grid';
import { AnimatedHero } from '@/components/animated-hero';

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

async function ArticleList({ page }: { page: number }) {
  const { articles, hasMore, totalPages } = await getArticles({ page });

  return (
    <>
      {articles.length > 0 ? (
        <AnimatedGrid className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" gridKey={page}>
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </AnimatedGrid>
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
    </>
  );
}

function ArticleListFallback() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Home page component
 * Displays paginated list of blog articles
 */
export default async function Home({ searchParams }: HomePageProps): Promise<JSX.Element> {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  return (
    <div className="space-y-12">
      <AnimatedHero />
      
      <Suspense key={page} fallback={<ArticleListFallback />}>
        <ArticleList page={page} />
      </Suspense>
    </div>
  );
}
