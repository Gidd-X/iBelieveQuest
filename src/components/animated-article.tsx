"use client"

import { motion } from "framer-motion"
import * as React from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function AnimatedArticle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {React.Children.map(children, (child) => {
        // Only wrap valid React elements to avoid wrapping null/undefined or fragments weirdly
        if (React.isValidElement(child)) {
          return (
            <motion.div variants={itemVariants}>
              {child}
            </motion.div>
          )
        }
        return child
      })}
    </motion.article>
  )
}
