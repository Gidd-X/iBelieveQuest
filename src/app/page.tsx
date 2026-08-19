import { Suspense } from 'react';
import { getArticles } from '@/app/actions';
import ArticleCard from '@/components/article-card';
import ArticleSkeleton from '@/components/article-skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatedGrid } from '@/components/animated-grid';
import { AnimatedHero } from '@/components/animated-hero';
import { LatestQuestions } from '@/components/latest-questions';

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

async function ArticleList({ page }: { page: number }) {
  const { articles, hasMore, totalPages } = await getArticles({ page });

  const isFirstPage = page === 1;
  const latestArticles = isFirstPage ? articles.slice(0, 2) : [];
  const gridArticles = isFirstPage ? articles.slice(2) : articles;

  return (
    <>
      {isFirstPage && latestArticles.length > 0 && (
        <div className="px-4 sm:px-6 lg:px-8">
          <LatestQuestions articles={latestArticles} />
        </div>
      )}

      {gridArticles.length > 0 ? (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isFirstPage && (
            <div className="mb-12 text-center">
              <h3 className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Explore Other Questions
              </h3>
            </div>
          )}
          <AnimatedGrid className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" gridKey={page}>
            {gridArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </AnimatedGrid>
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>No more articles to explore.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-20">
          <Button asChild variant="outline" disabled={page <= 1}>
            <Link href={`/?page=${page - 1}`}>
              <ArrowLeft />
              <span>Previous</span>
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground font-medium">
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
    <div className="pb-24">
      {page === 1 && (
        <div className="px-4 sm:px-6 lg:px-8">
          <AnimatedHero />
        </div>
      )}
      
      <Suspense key={page} fallback={<ArticleListFallback />}>
        <ArticleList page={page} />
      </Suspense>
    </div>
  );
}
