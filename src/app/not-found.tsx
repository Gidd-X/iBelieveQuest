import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

/**
 * Not found page
 * Displayed when a page or resource is not found (404)
 */
export default function NotFound(): JSX.Element {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <AlertCircle className="mb-4 h-20 w-20 text-muted-foreground" />
      <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 text-muted-foreground max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
