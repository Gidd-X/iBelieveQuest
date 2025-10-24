'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * Global error page
 * Displayed when an unhandled error occurs in the application
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="text-center">
            <h1 className="mb-4 text-6xl font-bold text-primary">Oops!</h1>
            <h2 className="mb-4 text-2xl font-semibold">Something went wrong</h2>
            <p className="mb-8 text-muted-foreground">
              We're sorry for the inconvenience. An unexpected error occurred.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={reset}>
                Try again
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Go home</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
