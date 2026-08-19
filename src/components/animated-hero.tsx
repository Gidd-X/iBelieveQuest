"use client"

import { motion } from "motion/react"
import { ArrowDown } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  },
}

export function AnimatedHero() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center flex flex-col items-center justify-center min-h-[70vh] py-12"
    >
      <motion.h1 
        variants={itemVariants}
        className="font-headline text-5xl font-bold text-primary md:text-7xl mb-6"
      >
        Welcome to iBelieve Quest
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-4"
      >
        A space where faith meets questions, and questions lead to discovery.
      </motion.p>
      
      <motion.p 
        variants={itemVariants}
        className="mx-auto max-w-2xl text-sm md:text-base font-semibold tracking-widest text-primary uppercase mb-20"
      >
        Faith • Questions • Discovery
      </motion.p>

      <motion.h2 
        variants={itemVariants}
        className="font-headline text-3xl md:text-5xl text-foreground mb-4"
      >
        What do you believe?
      </motion.h2>
      
      <motion.h2 
        variants={itemVariants}
        className="font-headline text-3xl md:text-5xl text-muted-foreground mb-20"
      >
        And why do you believe it?
      </motion.h2>

      <motion.div 
        variants={itemVariants}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-8 h-8 text-primary/40" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
