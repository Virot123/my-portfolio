"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowLeft,          // Back button
  Medal,              // Quality First
  Brain,              // Continuous Learning
  Palette,            // User-Centered Design
  Users,              // Collaboration
  Rocket,             // Innovation
  Briefcase,          // Work Experience
  GraduationCap,      // Education
  Heart,              // Core Values
  Code,               // About Me
  Puzzle             // Problem Solving
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline } from "@/components/timeline"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [60, 0, 0, 60])

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
        <section className="container mx-auto px-4 py-16 md:py-24">
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
                About Me
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">The Story Behind the Code</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Passionate about creating digital experiences that make a difference. Here's a glimpse into my journey,
                values, and what drives me as a developer.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image with floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mx-auto order-2 lg:order-1"
              >
                <div className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px]">
                  {/* Main image */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden bg-white shadow-xl">
                    <div className="relative w-full h-full">
                      <Image
                        src="/profile/pf-professional.webp"
                        alt="Professional Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Floating cards */}
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-40 bg-white rounded-lg shadow-lg p-3"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <div className="text-sm font-medium text-slate-800">Experience</div>
                    <div className="text-3xl font-bold text-sky-600">4+ Years</div>
                    <div className="text-xs text-slate-500">Full-Stack Development</div>
                  </motion.div>

                  <motion.div
                    className="absolute -top-10 -left-10 w-40 bg-white rounded-lg shadow-lg p-3"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="text-sm font-medium text-slate-800">Projects</div>
                    <div className="text-3xl font-bold text-sky-600">10+</div>
                    <div className="text-xs text-slate-500">Completed Successfully</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-3xl font-bold text-slate-800 mb-6">
                  Hello, I'm <span className="text-sky-600">Van Virot</span>
                </h2>

                <div className="space-y-6 text-lg text-slate-600">
                  <p>
                    I'm a passionate Full-Stack Developer and IoT Enthusiast with a deep love for creating elegant
                    solutions to complex problems. My journey in technology began over 4 years ago, and I've been on an
                    exciting path of continuous learning and growth ever since.
                  </p>

                  <p>
                    With expertise in Laravel, Next.js, MongoDB, Docker, and Flutter, I specialize in building
                    responsive, user-friendly applications that deliver exceptional experiences. I'm particularly
                    interested in the intersection of web technologies and IoT, creating connected systems that bridge
                    the digital and physical worlds.
                  </p>

                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source
                    projects, or sharing my knowledge through technical writing and mentorship.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section ref={targetRef} className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div style={{ opacity, y }} className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <Badge
                  variant="outline"
                  className="mb-4 px-4 py-1.5 text-sm bg-white backdrop-blur-sm border-sky-200 text-sky-700"
                >
                  <Briefcase className="mr-1 h-3.5 w-3.5 text-sky-500" />
                  Professional Journey
                </Badge>
                <h2 className="text-4xl font-bold text-slate-800 mb-6">My Career Path</h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  A timeline of my professional experience and educational background.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Work Experience */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-sky-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Work Experience</h3>
                  </div>

                  <Timeline
                    items={[
                      {
                        title: "Senior Full-Stack Developer",
                        company: "Tech Innovations Inc.",
                        period: "2021 - Present",
                        description:
                          "Leading development of enterprise web applications using Next.js, Laravel, and MongoDB. Implementing CI/CD pipelines and mentoring junior developers.",
                      },
                      {
                        title: "Full-Stack Developer",
                        company: "Digital Solutions Ltd.",
                        period: "2019 - 2021",
                        description:
                          "Developed and maintained multiple client projects using React, Node.js, and PostgreSQL. Implemented responsive designs and RESTful APIs.",
                      },
                      {
                        title: "Junior Web Developer",
                        company: "WebCraft Agency",
                        period: "2018 - 2019",
                        description:
                          "Created responsive websites for clients using HTML, CSS, JavaScript, and PHP. Collaborated with designers to implement pixel-perfect interfaces.",
                      },
                    ]}
                  />
                </div>

                {/* Education */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-sky-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Education</h3>
                  </div>

                  <Timeline
                    items={[
                      {
                        title: "Master's in Computer Science",
                        company: "Tech University",
                        period: "2016 - 2018",
                        description:
                          "Specialized in Software Engineering with focus on distributed systems and cloud computing. Graduated with honors.",
                      },
                      { 
                        title: "Bachelor's in Computer Science",
                        company: "State University",
                        period: "2012 - 2016",
                        description:
                          "Focused on programming fundamentals, data structures, algorithms, and web development. Participated in coding competitions.",
                      },
                      {
                        title: "Online Courses & Certifications",
                        company: "Various Platforms",
                        period: "Ongoing",
                        description:
                          "Continuously expanding knowledge through courses on platforms like Coursera, Udemy, and specialized workshops.",
                      },
                    ]}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32 relative bg-gradient-to-b from-white to-sky-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 px-4 py-1.5 text-sm bg-white backdrop-blur-sm border-sky-200 text-sky-700"
              >
                <Heart className="mr-1 h-3.5 w-3.5 text-sky-500" />
                Core Values
              </Badge>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">What Drives Me</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                The principles and values that guide my work and approach to development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center mb-4 group-hover:bg-sky-600 transition-colors duration-300">
                        <value.icon className="h-6 w-6 text-sky-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{value.title}</h3>
                      <p className="text-slate-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <Card className="border-0 bg-gradient-to-r from-sky-500 to-blue-600 shadow-xl">
              <CardContent className="p-10 md:p-16">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's Work Together</h2>
                  <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
                    Have a project in mind or want to discuss potential opportunities? I'm always open to new challenges
                    and collaborations.
                  </p>
                  <Button size="lg" className="bg-white text-sky-700 hover:bg-sky-50 px-8 py-6 text-lg rounded-md">
                    Get In Touch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

// Values data
const values = [
  {
    title: "Quality First",
    description: "I believe in delivering high-quality, well-tested code that stands the test of time. No shortcuts, no compromises.",
    icon: Medal,
  },
  {
    title: "Continuous Learning",
    description: "Technology evolves rapidly, and I'm committed to staying at the forefront through continuous learning and improvement.",
    icon: Brain,
  },
  {
    title: "User-Centered Design",
    description: "I create solutions with the end-user in mind, focusing on intuitive interfaces and exceptional user experiences.",
    icon: Palette,
  },
  {
    title: "Problem Solving",
    description: "I thrive on solving complex problems with elegant, efficient solutions that address the root cause.",
    icon: Puzzle,
  },
  {
    title: "Collaboration",
    description: "I believe the best results come from effective teamwork, open communication, and diverse perspectives.",
    icon: Users,
  },
  {
    title: "Innovation",
    description: "I'm always looking for innovative approaches and technologies to create better, more efficient solutions.",
    icon: Rocket,
  },
]

