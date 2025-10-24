import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Send as TelegramIcon } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
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
          <div className="md:col-span-1">
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
          <div className="md:col-span-1">
            <h4 className="font-semibold">Follow Us</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Join the conversation on our social channels.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="https://www.facebook.com/share/19e9XdXBmQ/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Button variant="outline" size="icon">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://t.me/iBelieveQuest" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <Button variant="outline" size="icon">
                  <TelegramIcon className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} iBelieveQuest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
