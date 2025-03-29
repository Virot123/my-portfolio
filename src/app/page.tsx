"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
  RocketIcon,
  CodeIcon,
  GearIcon,
} from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SkillsShowcase } from "@/components/skills-showcase"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>("/profile/profile.jpg")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
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
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <Badge
                  variant="outline"
                  className="px-4 py-1.5 text-sm bg-white/80 backdrop-blur-sm border-sky-200 text-sky-700"
                >
                  <CodeIcon className="mr-1 h-3.5 w-3.5 text-sky-500" />
                  Full-Stack Developer & IoT Enthusiast
                </Badge>

                <motion.h1
                  className="text-5xl md:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <span className="block text-slate-800">Crafting Digital</span>
                  <span className="block text-sky-600">Experiences</span>
                </motion.h1>

                <motion.p
                  className="text-xl text-slate-600 max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  Specializing in Laravel, Next.js, MongoDB, Docker, and building real-time applications that
                  deliver exceptional user experiences.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <Link
                    href="/projects"
                    className="relative h-12 px-8 flex items-center justify-center overflow-hidden group rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative text-sm font-medium tracking-wide">View Projects</span>
                  </Link>
                  <Link
                    href="/about"
                    className="relative h-12 px-8 flex items-center justify-center overflow-hidden group rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative text-sm font-medium tracking-wide">About Me</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="relative h-12 px-8 flex items-center justify-center overflow-hidden group rounded-lg bg-white border border-sky-600 text-sky-600 shadow-lg hover:shadow-xl hover:bg-sky-600 hover:text-white transition-all duration-300"
                  >
                    <span className="relative text-sm font-medium tracking-wide">Contact Me</span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  className="flex items-center gap-4 pt-4"
                >
                  <SocialLink href="https://github.com/Virot123" icon={<GitHubLogoIcon className="h-5 w-5" />} />
                  <SocialLink
                    href="https://www.linkedin.com/in/van-virot-120bb0298/"
                    icon={<LinkedInLogoIcon className="h-5 w-5" />}
                  />
                  <SocialLink href="mailto:vanvirot24@gmail.com" icon={<EnvelopeClosedIcon className="h-5 w-5" />} />
                </motion.div>
              </motion.div>

              {/* Profile Image with Clean Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative mx-auto"
              >
                <div className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px]">
                  {/* Clean frame with subtle shadow */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden bg-white shadow-xl">
                    <div className="relative w-full h-full">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt="Professional Profile"
                        fill
                        className="object-cover"
                        style={{ objectPosition: "center top" }}
                      />

                      {/* Upload overlay */}
                      <div
                        onClick={triggerFileInput}
                        className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      >
                        <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                          <p className="text-sky-700 font-medium mb-2">Upload Professional Photo</p>
                          <p className="text-sm text-slate-600">Click to select an image</p>
                        </div>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <GearIcon className="h-8 w-8 text-sky-500" />
                  </motion.div>

                  <motion.div
                    className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                  >
                    <RocketIcon className="h-7 w-7 text-sky-500" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="border-0 bg-white shadow-lg">
                <CardContent className="p-10 md:p-16">
                  <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="relative">
                      <div className="absolute -top-10 -left-4 text-7xl text-sky-200 font-serif">"</div>
                      <blockquote className="text-2xl md:text-3xl font-light text-slate-700 leading-relaxed">
                        The best way to predict the future is to{" "}
                        <span className="text-sky-600 font-normal">invent it</span>. Technology is just a tool — it's
                        what we <span className="text-sky-600 font-normal">build with it</span> that matters.
                      </blockquote>
                      <div className="absolute -bottom-16 -right-4 text-7xl text-sky-200 font-serif">"</div>
                    </div>
                    <div className="mt-8 text-slate-500 font-medium">
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-sky-200"></div>
                        <span>My Development Philosophy</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-sky-200"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Skills Section - Ultra Creative */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <Badge
                variant="outline"
                className="mb-4 px-4 py-1.5 text-sm bg-white backdrop-blur-sm border-sky-200 text-sky-700"
              >
                <GearIcon className="mr-1 h-3.5 w-3.5 text-sky-500" />
                Technical Expertise
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800">My Skillset</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <SkillsShowcase />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-md bg-white shadow-md hover:shadow-lg hover:bg-sky-50 transition-all duration-300"
        aria-label="Social Link"
      >
        <span className="text-sky-600">{icon}</span>
      </Link>
    </motion.div>
  )
}

interface Skill {
  name: string
  level: number
}

interface SkillsGridProps {
  skills: Skill[]
  baseDelay: number
}

function SkillsGrid({ skills, baseDelay }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: baseDelay + index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          className="bg-white shadow-md rounded-lg p-6 transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-slate-800">{skill.name}</h3>
            <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100">{skill.level}%</Badge>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: baseDelay + index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

