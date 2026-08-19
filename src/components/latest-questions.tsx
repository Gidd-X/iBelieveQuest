"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { Article } from '@/lib/data'

type LatestQuestionsProps = {
  articles: Article[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  },
}

export function LatestQuestions({ articles }: LatestQuestionsProps) {
  const [expandingId, setExpandingId] = useState<string | null>(null)
  const router = useRouter()

  if (!articles || articles.length === 0) return null

  const firstArticle = articles[0]
  const secondArticle = articles[1] // Might be undefined if only 1 article exists

  const handleExpand = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setExpandingId(id)
    router.prefetch(`/posts/${id}`)
    setTimeout(() => {
      router.push(`/posts/${id}`)
      setTimeout(() => setExpandingId(null), 500)
    }, 400)
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16 text-center"
      >
        <h3 className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Latest Questions
        </h3>
        <div className="w-24 h-[1px] bg-border mx-auto mt-6" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center"
      >
        {/* First Article: Card Layout */}
        {firstArticle && (
          <div className="relative h-full w-full">
            {expandingId === firstArticle.id && <div className="absolute inset-0 bg-transparent" />}
            <motion.div 
              layout
              layoutId={`latest-${firstArticle.id}`}
              variants={expandingId === firstArticle.id ? undefined : itemVariants}
              transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
              className={expandingId === firstArticle.id 
                ? "fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden" 
                : "relative group h-full w-full"
              }
            >
              {!expandingId && (
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl" />
              )}
              
              <Link href={`/posts/${firstArticle.id}`} onClick={(e) => handleExpand(e, firstArticle.id)} className="block relative h-full w-full outline-none prefetch-intent">
                <div className={`flex flex-col overflow-hidden transition-all duration-300 ${expandingId === firstArticle.id ? 'h-full justify-start' : 'border border-border/50 bg-card rounded-xl p-8 md:p-12 h-full justify-center min-h-[400px] group-hover:border-primary/30'}`}>
                  
                  {/* Hero Image appears only when expanding */}
                  <AnimatePresence>
                    {expandingId === firstArticle.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '40vh' }}
                        className="relative w-full overflow-hidden"
                      >
                        <Image
                          src={firstArticle.coverPhoto.src}
                          alt={firstArticle.coverPhoto.alt}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`relative z-10 flex flex-col ${expandingId === firstArticle.id ? 'max-w-4xl mx-auto w-full px-6 pt-12' : ''}`}>
                    {!expandingId && (
                      <div className="absolute -top-10 -right-4 text-[12rem] font-bold text-muted/10 font-headline leading-none select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                        01
                      </div>
                    )}
                    
                    <AnimatePresence>
                      {!expandingId && (
                        <motion.span exit={{ opacity: 0 }} className="text-primary font-bold tracking-widest text-sm mb-6 uppercase">
                          01
                        </motion.span>
                      )}
                    </AnimatePresence>
                    
                    <motion.h4 
                      layout
                      className={`font-headline text-foreground relative z-10 transition-colors duration-300 ${expandingId === firstArticle.id ? 'text-4xl md:text-6xl mb-6' : 'text-3xl md:text-5xl leading-tight group-hover:text-primary'}`}
                    >
                      {firstArticle.title}
                    </motion.h4>
                    
                    <AnimatePresence>
                      {!expandingId && (
                        <motion.div exit={{ opacity: 0, height: 0 }} className="mt-8 flex items-center text-muted-foreground group-hover:text-primary transition-colors duration-300">
                          <span className="text-sm font-semibold tracking-wider uppercase mr-2">Read</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {expandingId === firstArticle.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center space-x-4 mt-8"
                        >
                          <div className="h-10 w-10 rounded-full bg-muted overflow-hidden relative">
                            <Image src={firstArticle.authorAvatarUrl} alt={firstArticle.author} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{firstArticle.author}</p>
                            <p className="text-xs text-muted-foreground">{firstArticle.date}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        )}

        {/* Second Article: Editorial Text Block Layout */}
        {secondArticle && (
          <div className="relative h-full w-full md:pl-12">
            {expandingId === secondArticle.id && <div className="absolute inset-0 bg-transparent" />}
            <motion.div 
              layout
              layoutId={`latest-${secondArticle.id}`}
              variants={expandingId === secondArticle.id ? undefined : itemVariants}
              transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
              className={expandingId === secondArticle.id 
                ? "fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden m-0 p-0" 
                : "relative group h-full w-full"
              }
            >
              <Link href={`/posts/${secondArticle.id}`} onClick={(e) => handleExpand(e, secondArticle.id)} className="block h-full py-12 outline-none prefetch-intent">
                <div className={`flex flex-col h-full ${expandingId === secondArticle.id ? 'justify-start' : 'justify-center min-h-[300px]'}`}>
                  
                  {/* Hero Image appears only when expanding */}
                  <AnimatePresence>
                    {expandingId === secondArticle.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '40vh' }}
                        className="relative w-full overflow-hidden"
                      >
                        <Image
                          src={secondArticle.coverPhoto.src}
                          alt={secondArticle.coverPhoto.alt}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`relative z-10 flex flex-col h-full ${expandingId === secondArticle.id ? 'max-w-4xl mx-auto w-full px-6 pt-12' : 'justify-center min-h-[300px]'}`}>
                    {!expandingId && (
                      <div className="absolute -left-8 md:left-0 top-0 text-[10rem] font-bold text-muted/10 font-headline leading-none select-none pointer-events-none transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-4">
                        02
                      </div>
                    )}
                    
                    <AnimatePresence>
                      {!expandingId && (
                        <motion.span exit={{ opacity: 0 }} className="text-primary font-bold tracking-widest text-sm mb-6 uppercase">
                          02
                        </motion.span>
                      )}
                    </AnimatePresence>
                    
                    <motion.h4 
                      layout
                      className={`font-headline text-foreground transition-colors duration-300 ${expandingId === secondArticle.id ? 'text-4xl md:text-6xl mb-6' : 'text-3xl md:text-4xl leading-snug group-hover:text-primary'}`}
                    >
                      {secondArticle.title}
                    </motion.h4>
                    
                    <AnimatePresence>
                      {!expandingId && (
                        <motion.div exit={{ opacity: 0, height: 0 }} className="mt-8 flex items-center text-muted-foreground group-hover:text-primary transition-colors duration-300">
                          <span className="text-sm font-semibold tracking-wider uppercase mr-2">Read</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {expandingId === secondArticle.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center space-x-4 mt-8"
                        >
                          <div className="h-10 w-10 rounded-full bg-muted overflow-hidden relative">
                            <Image src={secondArticle.authorAvatarUrl} alt={secondArticle.author} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{secondArticle.author}</p>
                            <p className="text-xs text-muted-foreground">{secondArticle.date}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        )}
      </motion.div>
      
      <div className="w-full max-w-xs mx-auto h-[1px] bg-border mt-24 mb-16" />
    </div>
  )
}
