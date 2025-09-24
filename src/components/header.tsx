import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="iBelieveQuest Logo"
                width={150}
                height={40}
                priority
              />
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
          {/* A Sheet component could be added here for a mobile menu trigger */}
        </div>
      </div>
    </header>
  );
}
