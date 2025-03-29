"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Code,
  ExternalLink,
  Github,
  Layers,
  Search,
  Tag,
  Monitor,
  Smartphone,
  Server,
  Cpu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ProjectModal } from "@/components/project-modal"

// Project type definition
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

// Sample projects data
const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/projects/e-commerce.jpg",
    tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
    category: "web",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    details: {
      challenge:
        "Create a scalable e-commerce solution with a seamless checkout process and robust product management.",
      solution:
        "Developed a Next.js application with server-side rendering for SEO, MongoDB for flexible data storage, and integrated Stripe for secure payments.",
      technologies: ["Next.js", "React", "MongoDB", "Stripe API", "Tailwind CSS", "Redux"],
      results:
        "Increased conversion rates by 25% and reduced page load times by 40% compared to the client's previous solution.",
    },
  },
  {
    id: "project-2",
    title: "Fitness Tracking App",
    description:
      "Mobile application for tracking workouts, nutrition, and fitness goals with personalized recommendations.",
    image: "/projects/fitness.jpg",
    tags: ["Flutter", "Firebase", "Machine Learning"],
    category: "mobile",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    details: {
      challenge:
        "Build a cross-platform mobile app that provides personalized fitness tracking with an intuitive interface.",
      solution:
        "Created a Flutter application with Firebase backend for real-time data synchronization and implemented machine learning for workout recommendations.",
      technologies: ["Flutter", "Dart", "Firebase", "TensorFlow Lite", "Google Fit API"],
      results:
        "Over 50,000 downloads with a 4.7-star rating. Users report an average 30% improvement in workout consistency.",
    },
  },
  {
    id: "project-3",
    title: "Smart Home IoT System",
    description:
      "IoT system for home automation with energy monitoring, security features, and voice control integration.",
    image: "/projects/smart-home.jpg",
    tags: ["Raspberry Pi", "MQTT", "Node.js", "React"],
    category: "iot",
    githubUrl: "https://github.com",
    featured: true,
    details: {
      challenge:
        "Develop an affordable and secure smart home system that integrates with existing devices and provides meaningful energy insights.",
      solution:
        "Built a Raspberry Pi-based hub using MQTT for device communication, with a Node.js backend and React dashboard for monitoring and control.",
      technologies: ["Raspberry Pi", "MQTT", "Node.js", "React", "WebSockets", "TensorFlow"],
      results:
        "Reduced energy consumption by 20% in test homes and improved response time for automated actions by 60%.",
    },
  },
  {
    id: "project-4",
    title: "Task Management API",
    description:
      "RESTful API for task management with authentication, permissions, and advanced filtering capabilities.",
    image: "/projects/task-management.jpg",
    tags: ["Laravel", "MySQL", "Docker", "Redis"],
    category: "backend",
    githubUrl: "https://github.com",
    featured: false,
    details: {
      challenge:
        "Create a high-performance API that handles complex task relationships and permissions while maintaining excellent response times.",
      solution:
        "Developed a Laravel-based API with optimized database queries, Redis caching, and containerized with Docker for easy deployment.",
      technologies: ["Laravel", "MySQL", "Docker", "Redis", "JWT Authentication", "PHPUnit"],
      results: "API handles over 1 million requests per day with 99.9% uptime and average response time under 100ms.",
    },
  },
  {
    id: "project-5",
    title: "Real Estate Marketplace",
    description:
      "Web platform connecting property buyers, sellers, and agents with virtual tours and mortgage calculator.",
    image: "/projects/online-real-estate.jpg",
    tags: ["React", "Node.js", "MongoDB", "Google Maps API"],
    category: "web",
    demoUrl: "https://example.com",
    featured: false,
    details: {
      challenge:
        "Build a comprehensive real estate platform with advanced search capabilities and virtual property tours.",
      solution:
        "Created a React frontend with Node.js backend, integrating Google Maps for location-based searches and WebGL for 3D property tours.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Google Maps API", "Three.js"],
      results: "Platform now hosts over 10,000 property listings with 30,000 monthly active users.",
    },
  },
  {
    id: "project-6",
    title: "Inventory Management System",
    description: "Backend system for inventory tracking, supplier management, and automated reordering with analytics.",
    image: "/projects/features-inventory.jpg",
    tags: ["Laravel", "PostgreSQL", "Docker", "GraphQL"],
    category: "backend",
    githubUrl: "https://github.com",
    featured: false,
    details: {
      challenge:
        "Develop a scalable inventory system that provides real-time insights and automates routine procurement tasks.",
      solution:
        "Built a Laravel application with PostgreSQL for complex inventory relationships and GraphQL API for flexible data querying.",
      technologies: ["Laravel", "PostgreSQL", "Docker", "GraphQL", "Redis", "AWS"],
      results:
        "Reduced inventory discrepancies by 35% and automated 70% of reordering processes, saving clients an average of 15 hours per week.",
    },
  },
  {
    id: "project-7",
    title: "Healthcare Monitoring App",
    description:
      "Mobile application for patients to track health metrics, medication schedules, and communicate with healthcare providers.",
    image: "/projects/patient-monitoring.jpg",
    tags: ["Flutter", "Firebase", "HIPAA Compliant"],
    category: "mobile",
    demoUrl: "https://example.com",
    featured: false,
    details: {
      challenge:
        "Create a HIPAA-compliant mobile application that helps patients manage chronic conditions and improves communication with healthcare providers.",
      solution:
        "Developed a Flutter application with end-to-end encryption, secure Firebase backend, and integration with health monitoring devices.",
      technologies: ["Flutter", "Firebase", "FHIR API", "Bluetooth LE", "Push Notifications"],
      results:
        "Used by 12 healthcare facilities with over 5,000 patients, resulting in 23% reduction in missed appointments and improved medication adherence.",
    },
  },
  {
    id: "project-8",
    title: "Agricultural IoT Solution",
    description:
      "IoT system for monitoring soil conditions, automating irrigation, and providing crop health insights for farmers.",
    image: "/projects/applications-of-iot-in-agriculture.jpg",
    tags: ["ESP32", "LoRaWAN", "Python", "TensorFlow"],
    category: "iot",
    githubUrl: "https://github.com",
    featured: false,
    details: {
      challenge:
        "Build an affordable IoT solution for small-scale farmers to optimize irrigation and improve crop yields.",
      solution:
        "Created a network of ESP32-based sensors using LoRaWAN for long-range communication, with Python backend for data analysis and predictions.",
      technologies: ["ESP32", "LoRaWAN", "Python", "TensorFlow", "Time Series Analysis", "Solar Power"],
      results:
        "Deployed on 15 farms with average water savings of 30% and yield improvements of 20% in the first growing season.",
    },
  },
]

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Filter projects based on search query and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory ? project.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return <Monitor className="h-5 w-5" />
      case "mobile":
        return <Smartphone className="h-5 w-5" />
      case "backend":
        return <Server className="h-5 w-5" />
      case "iot":
        return <Cpu className="h-5 w-5" />
      default:
        return <Layers className="h-5 w-5" />
    }
  }

  if (!mounted) return null

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Interactive background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white to-slate-100">
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Interactive gradient that follows mouse */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[80px] transition-transform duration-1000 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(56,189,248,0.6) 0%, rgba(59,130,246,0.4) 30%, rgba(0,0,0,0) 70%)",
            left: `${mousePosition.x - 400}px`,
            top: `${mousePosition.y - 400}px`,
            transform: `translate(${mousePosition.x > 0 ? "0" : "-50%"}, ${mousePosition.y > 0 ? "0" : "-50%"})`,
          }}
        />
      </div>

      <main className="relative z-10">
        {/* Header with back button */}
        <header className="container mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Badge
                variant="outline"
                className="mb-4 px-4 py-1.5 text-sm bg-white backdrop-blur-sm border-sky-200 text-sky-700"
              >
                <Code className="mr-1 h-3.5 w-3.5 text-sky-500" />
                My Work
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">Featured Projects</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                A collection of my best work across web, mobile, backend, and IoT development. Each project represents
                unique challenges and innovative solutions.
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    className="pl-10 bg-white border-sky-200 focus-visible:ring-sky-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className={selectedCategory === null ? "bg-sky-600 hover:bg-sky-700" : ""}
                  >
                    <Layers className="mr-1 h-4 w-4" />
                    All
                  </Button>
                  <Button
                    variant={selectedCategory === "web" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("web")}
                    className={selectedCategory === "web" ? "bg-sky-600 hover:bg-sky-700" : ""}
                  >
                    <Monitor className="mr-1 h-4 w-4" />
                    Web
                  </Button>
                  <Button
                    variant={selectedCategory === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("mobile")}
                    className={selectedCategory === "mobile" ? "bg-sky-600 hover:bg-sky-700" : ""}
                  >
                    <Smartphone className="mr-1 h-4 w-4" />
                    Mobile
                  </Button>
                  <Button
                    variant={selectedCategory === "backend" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("backend")}
                    className={selectedCategory === "backend" ? "bg-sky-600 hover:bg-sky-700" : ""}
                  >
                    <Server className="mr-1 h-4 w-4" />
                    Backend
                  </Button>
                  <Button
                    variant={selectedCategory === "iot" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("iot")}
                    className={selectedCategory === "iot" ? "bg-sky-600 hover:bg-sky-700" : ""}
                  >
                    <Cpu className="mr-1 h-4 w-4" />
                    IoT
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    layout
                  >
                    <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="text-slate-500 text-lg">No projects found matching your criteria.</div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-white text-sky-700 hover:bg-white">
            {getCategoryIcon(project.category)}
            <span className="ml-1 capitalize">{project.category}</span>
          </Badge>
        </div>
      </div>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
        <p className="text-slate-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
              +{project.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onClick}>
          View Details
        </Button>
        <div className="flex gap-2">
          {project.githubUrl && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          )}
          {project.demoUrl && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Live Demo</span>
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "web":
      return <Monitor className="h-4 w-4" />
    case "mobile":
      return <Smartphone className="h-4 w-4" />
    case "backend":
      return <Server className="h-4 w-4" />
    case "iot":
      return <Cpu className="h-4 w-4" />
    default:
      return <Layers className="h-4 w-4" />
  }
}

