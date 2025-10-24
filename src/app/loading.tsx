import { Loader2 } from 'lucide-react';

/**
 * Loading page
 * Displayed while page content is being loaded
 */
export default function Loading(): JSX.Element {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
