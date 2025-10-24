import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * Footer component
 * Site footer with newsletter subscription form
 */
export default function Footer(): JSX.Element {
  return (
    <footer className="mt-12 border-t bg-card">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <h3 className="font-headline text-lg font-bold text-primary">iBelieveQuest</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              One question, one truth, one step at a time.
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-semibold">Subscribe to our newsletter</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Receive email notifications for new posts and updates.
            </p>
            <form className="mt-4 flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-sm"
                aria-label="Email for newsletter"
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} iBelieveQuest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
