"use client"

import { motion } from "framer-motion"

interface TimelineItem {
  title: string
  company: string
  period: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative pl-8 border-l border-sky-200"
        >
          {/* Timeline dot */}
          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-sky-500 border-4 border-white" />

          <div className="mb-1 text-sm text-sky-600 font-medium">{item.period}</div>
          <h4 className="text-lg font-bold text-slate-800">{item.title}</h4>
          <div className="text-sm text-slate-500 mb-2">{item.company}</div>
          <p className="text-slate-600">{item.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

