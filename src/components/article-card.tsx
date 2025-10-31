import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type ArticleCardProps = {
  article: Article;
};

/**
 * ArticleCard component displays a blog article in card format
 * Used on the homepage and article listing pages
 */
export default function ArticleCard({ article }: ArticleCardProps): JSX.Element {
  return (
    <Link href={`/posts/${article.id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={article.coverPhoto.src}
              alt={article.coverPhoto.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <CardTitle className="font-headline text-xl leading-tight transition-colors group-hover:text-primary">
            {article.title}
          </CardTitle>
          <p className="mt-3 text-sm text-muted-foreground">{article.excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-6 pt-0">
            <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                    <Badge key={tag} variant="default" className="capitalize">{tag}</Badge>
                ))}
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </CardFooter>
      </Card>
    </Link>
  );
}
