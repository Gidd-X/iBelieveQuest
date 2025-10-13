import { articles } from '@/lib/data';
import ArticleCard from '@/components/article-card';

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">Welcome to iBelieve Quest</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A space where faith meets questions, and questions lead to discovery.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
