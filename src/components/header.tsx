import Link from 'next/link';
import Image from 'next/image';
import { Search, BookOpenText } from 'lucide-react';
import { Input } from '@/components/ui/input';

/**
 * Header component
 * Main site navigation and branding
 */
export default function Header(): JSX.Element {
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <BookOpenText className="h-10 w-10 text-primary" />
              <span className="font-headline text-2xl font-bold text-primary">iBelieveQuest</span>
            </Link>
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            <Link href="/" className="text-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="text-foreground transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <div className="hidden items-center space-x-2 md:flex">
            <form className="relative">
              <Input type="search" placeholder="Search..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
