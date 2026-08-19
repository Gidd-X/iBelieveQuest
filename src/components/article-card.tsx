"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { motion, AnimatePresence } from 'motion/react';

type ArticleCardProps = {
  article: Article;
  index?: number;
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  },
  exit: { 
    opacity: 0, 
    x: 50, 
    transition: { duration: 0.2 } 
  }
};

/**
 * ArticleCard component displays a blog article in card format
 * Used on the homepage and article listing pages
 */
export default function ArticleCard({ article, index = 0 }: ArticleCardProps): JSX.Element {
  const [isExpanding, setIsExpanding] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanding(true);
    
    // Pre-fetch the route if possible
    router.prefetch(`/posts/${article.id}`);
    
    // Wait for the expansion animation to finish before navigating
    setTimeout(() => {
      router.push(`/posts/${article.id}`);
      
      // Reset state after a delay in case the user navigates back
      setTimeout(() => setIsExpanding(false), 500);
    }, 400); 
  };

  return (
    <>
      {/* Invisible spacer to maintain grid layout when the card becomes fixed */}
      {isExpanding && <div className="h-full w-full rounded-xl" />}

      <motion.div
        layout
        layoutId={`article-${article.id}`}
        variants={!isExpanding ? itemVariants : undefined}
        whileHover={!isExpanding ? { y: -8, scale: 1.02 } : undefined}
        transition={{ 
          layout: { type: "spring", stiffness: 300, damping: 30 },
          default: { type: "spring", stiffness: 400, damping: 10 }
        }}
        className={isExpanding 
          ? "fixed inset-0 z-[100] m-0 p-0 flex flex-col bg-background overflow-hidden" 
          : "h-full relative origin-center"
        }
        style={{ borderRadius: isExpanding ? 0 : 12 }}
      >
        <a href={`/posts/${article.id}`} onClick={handleClick} className="group flex flex-col h-full w-full cursor-pointer outline-none">
          <Card className={`flex h-full flex-col overflow-hidden shadow-sm transition-shadow duration-300 ${!isExpanding && 'hover:shadow-xl dark:border-border/50'} ${isExpanding && 'border-none rounded-none shadow-none'}`}>
            <CardHeader className="p-0">
              <motion.div 
                layout
                className={`relative w-full overflow-hidden ${isExpanding ? 'h-[40vh] md:h-[50vh]' : 'h-48'}`}
              >
                <Image
                  src={article.coverPhoto.src}
                  alt={article.coverPhoto.alt}
                  fill
                  priority={isExpanding}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover transition-transform duration-500 ${!isExpanding && 'group-hover:scale-105'}`}
                />
                
                {/* Overlay gradient that appears only when expanding to mimic the article page hero */}
                <AnimatePresence>
                  {isExpanding && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" 
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </CardHeader>

            <motion.div layout className={`flex-grow ${isExpanding ? 'max-w-4xl mx-auto w-full px-6 pt-12' : 'p-6'}`}>
              <CardTitle className={`font-headline leading-tight transition-colors ${!isExpanding && 'group-hover:text-primary'} ${isExpanding ? 'text-4xl md:text-6xl mb-6' : 'text-xl'}`}>
                {article.title}
              </CardTitle>
              
              <AnimatePresence>
                {!isExpanding && (
                  <motion.p 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0, margin: 0 }}
                    className="mt-3 text-sm text-muted-foreground"
                  >
                    {article.excerpt}
                  </motion.p>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {isExpanding && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-4 mt-8"
                  >
                    {/* Simulated Article Header Meta Data */}
                    <div className="h-10 w-10 rounded-full bg-muted overflow-hidden relative">
                      <Image src={article.authorAvatarUrl} alt={article.author} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{article.author}</p>
                      <p className="text-xs text-muted-foreground">{article.date}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {!isExpanding && (
                <motion.div exit={{ opacity: 0, height: 0, padding: 0 }}>
                  <CardFooter className="flex items-center justify-between p-6 pt-0">
                      <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                          ))}
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </CardFooter>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </a>
      </motion.div>
    </>
  );
}
