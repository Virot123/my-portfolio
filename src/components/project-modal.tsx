"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { X, ExternalLink, Github, Tag, CheckCircle2, Lightbulb, Wrench, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  category: "web" | "mobile" | "backend" | "iot"
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  details: {
    challenge: string
    solution: string
    technologies: string[]
    results: string
  }
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5 text-slate-700" />
            </button>

            <div className="flex flex-col h-full overflow-hidden">
              {/* Header image */}
              <div className="relative h-64 md:h-80">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg text-slate-700 mb-8">{project.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Challenge */}
                    <div className="bg-slate-50 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <Lightbulb className="h-4 w-4 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">The Challenge</h3>
                      </div>
                      <p className="text-slate-700">{project.details.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div className="bg-slate-50 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                          <Wrench className="h-4 w-4 text-sky-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">The Solution</h3>
                      </div>
                      <p className="text-slate-700">{project.details.solution}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                        <Code className="h-4 w-4 text-violet-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">Technologies Used</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.details.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-slate-50 rounded-lg p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">Results & Impact</h3>
                    </div>
                    <p className="text-slate-700">{project.details.results}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 p-6 flex justify-between items-center">
                <div className="text-sm text-slate-500">Project ID: {project.id}</div>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </Link>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button variant="default" size="sm" className="bg-sky-600 hover:bg-sky-700" asChild>
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Code({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

