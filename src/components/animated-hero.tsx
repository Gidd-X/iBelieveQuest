"use client"

import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.7,
      delayChildren: 0.5,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
}

export function AnimatedHero() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      <motion.h1 
        variants={itemVariants}
        className="font-headline text-4xl font-bold text-primary md:text-5xl"
      >
        Welcome to iBelieve Quest
      </motion.h1>
      <motion.p 
        variants={itemVariants}
        className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
      >
        A space where faith meets questions, and questions lead to discovery.
      </motion.p>
    </motion.div>
  )
}
