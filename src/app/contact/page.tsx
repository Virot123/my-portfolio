"use client"

import type React from "react"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContactMap } from "@/components/contact-map"

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
  })

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, budget: value }))

    // Clear error when user selects
    if (errors.budget) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.budget
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formState.message.length < 20) {
      newErrors.message = "Message should be at least 20 characters"
    }

    if (!formState.budget) {
      newErrors.budget = "Please select a budget range"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormStatus("submitting")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFormStatus("success")

      // Reset form after success
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
          budget: "",
        })
        setFormStatus("idle")
      }, 3000)
    } catch (error) {
      setFormStatus("error")

      // Reset error state after a while
      setTimeout(() => {
        setFormStatus("idle")
      }, 3000)
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
                <Mail className="mr-1 h-3.5 w-3.5 text-sky-500" />
                Get in Touch
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">Let's Work Together</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Have a project in mind or want to discuss potential opportunities? I'm always open to new challenges and
                collaborations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Send Me a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formState.name}
                          onChange={handleInputChange}
                          className={errors.name ? "border-red-300 focus-visible:ring-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formState.email}
                          onChange={handleInputChange}
                          className={errors.email ? "border-red-300 focus-visible:ring-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Project Inquiry"
                          value={formState.subject}
                          onChange={handleInputChange}
                          className={errors.subject ? "border-red-300 focus-visible:ring-red-500" : ""}
                        />
                        {errors.subject && (
                          <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select value={formState.budget} onValueChange={handleSelectChange}>
                          <SelectTrigger
                            id="budget"
                            className={errors.budget ? "border-red-300 focus-visible:ring-red-500" : ""}
                          >
                            <SelectValue placeholder="Select a budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less-than-5k">Less than $5,000</SelectItem>
                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="more-than-50k">More than $50,000</SelectItem>
                            <SelectItem value="not-sure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.budget && (
                          <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.budget}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project or inquiry..."
                          rows={5}
                          value={formState.message}
                          onChange={handleInputChange}
                          className={errors.message ? "border-red-300 focus-visible:ring-red-500" : ""}
                        />
                        {errors.message && (
                          <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700"
                        disabled={formStatus === "submitting" || formStatus === "success"}
                      >
                        {formStatus === "idle" && (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                        {formStatus === "submitting" && (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        )}
                        {formStatus === "success" && (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Message Sent!
                          </>
                        )}
                        {formStatus === "error" && (
                          <>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Error Sending
                          </>
                        )}
                      </Button>

                      {formStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Thank you for your message! I'll get back to you as soon as possible.
                        </motion.div>
                      )}

                      {formStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-center gap-2"
                        >
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          There was an error sending your message. Please try again later.
                        </motion.div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Contact Details */}
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h2>

                    <div className="space-y-6">
                      <ContactInfoItem
                        icon={<Mail className="h-5 w-5 text-sky-500" />}
                        title="Email"
                        content="vanvirot24@gmail.com"
                        link="mailto:vanvirot24@gmail.com"
                      />

                      <ContactInfoItem
                        icon={<Phone className="h-5 w-5 text-sky-500" />}
                        title="Phone"
                        content="(855) 71-65-16791"
                        link="tel:+1855716516791"
                      />

                      <ContactInfoItem
                        icon={<MapPin className="h-5 w-5 text-sky-500" />}
                        title="Location"
                        content="Lum (St.), Trapaing Chrey Village, Sangkat Kakap, Khan Por Senchey, Phnom Penh, Cambodia"
                      />

                      <ContactInfoItem
                        icon={<Calendar className="h-5 w-5 text-sky-500" />}
                        title="Availability"
                        content="Monday - Friday"
                      />
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <h3 className="text-lg font-medium text-slate-800 mb-4">Connect With Me</h3>
                      <div className="flex gap-3">
                        <SocialButton
                          href="https://github.com/Virot123"
                          icon={<Github className="h-5 w-5" />}
                          label="GitHub"
                        />
                        <SocialButton
                          href="https://www.linkedin.com/in/van-virot-120bb0298/"
                          icon={<Linkedin className="h-5 w-5" />}
                          label="LinkedIn"
                        />
                        <SocialButton
                          href="https://x.com/VanVirot"
                          icon={<Twitter className="h-5 w-5" />}
                          label="Twitter"
                        />
                        <SocialButton
                          href="https://www.instagram.com/lotta_onesta/"
                          icon={<Instagram className="h-5 w-5" />}
                          label="Instagram"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map */}
                <Card className="border-0 shadow-lg overflow-hidden h-[300px]">
                  <CardContent className="p-0 h-full">
                    <ContactMap />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Here are answers to some common questions about my services and process.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FaqItem
                question="What is your typical process for new projects?"
                answer="I follow a structured approach: initial consultation, requirements gathering, proposal with timeline and cost estimate, design phase, development, testing, and finally deployment with ongoing support as needed."
              />

              <FaqItem
                question="How long does a typical project take?"
                answer="Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 2-6 months. I'll provide a detailed timeline during our initial consultation."
              />

              <FaqItem
                question="Do you offer maintenance services after completion?"
                answer="Yes, I offer various maintenance packages to keep your project running smoothly after launch. These can include regular updates, security patches, performance optimization, and content updates."
              />

              <FaqItem
                question="What payment methods do you accept?"
                answer="I accept payments via bank transfer, PayPal, and credit cards. For most projects, I require a 50% deposit to begin work, with the remaining balance due upon completion."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

interface ContactInfoItemProps {
  icon: React.ReactNode
  title: string
  content: string
  link?: string
}

function ContactInfoItem({ icon, title, content, link }: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        {link ? (
          <a href={link} className="text-lg font-medium text-slate-800 hover:text-sky-600 transition-colors">
            {content}
          </a>
        ) : (
          <p className="text-lg font-medium text-slate-800">{content}</p>
        )}
      </div>
    </div>
  )
}

interface SocialButtonProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SocialButton({ href, icon, label }: SocialButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-slate-100 hover:bg-sky-100 flex items-center justify-center text-slate-600 hover:text-sky-600 transition-colors"
        aria-label={label}
      >
        {icon}
      </Link>
    </motion.div>
  )
}

interface FaqItemProps {
  question: string
  answer: string
}

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-lg font-bold text-slate-800 mb-3">{question}</h3>
      <p className="text-slate-600">{answer}</p>
    </motion.div>
  )
}

