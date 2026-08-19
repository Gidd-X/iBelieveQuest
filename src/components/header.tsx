"use client"

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileMenu } from '@/components/mobile-menu';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

/**
 * Header component
 * Main site navigation and branding
 */
export default function Header(): JSX.Element {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md border-b' : 'bg-background'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Image src="/logo.png" alt="iBelieveQuest Logo" width={40} height={40} className="h-10 w-10 object-contain" />
              </motion.div>
              <span className="font-headline text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">iBelieveQuest</span>
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
          <div className="flex items-center space-x-2 md:space-x-4">
            <form className="relative hidden md:block">
              <Input type="search" placeholder="Search..." className="pl-10 w-[200px] lg:w-[300px] rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary" />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </form>
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
