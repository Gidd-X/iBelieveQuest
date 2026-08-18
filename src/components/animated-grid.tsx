"use client"

import { motion, AnimatePresence } from "framer-motion"
import * as React from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  }
}

export function AnimatedGrid({
  children,
  className,
  gridKey,
}: {
  children: React.ReactNode
  className?: string
  gridKey?: string | number
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={gridKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
