"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Define all skills without categories
const skills = [
    { name: "Laravel", icon: "/skills/laravel.png" },
    { name: "Tailwind", icon: "/skills/tailwind.png" },
    { name: "Next.js", icon: "/skills/nextjs.png" },
    { name: "React", icon: "/skills/react.png" },
    { name: "TypeScript", icon: "/skills/typescript.png" },
    { name: "Node.js", icon: "/skills/nodejs.png" },
    { name: "GraphQL", icon: "/skills/graphql.png" },
    { name: "MySQL", icon: "/skills/mysql.png" },
    { name: "PostgreSQL", icon: "/skills/postgresql.png" },
    { name: "MongoDB", icon: "/skills/mongodb.png" },
    { name: "Docker", icon: "/skills/docker.png" },
    { name: "IoT", icon: "/skills/iot.png" },
    { name: "AWS", icon: "/skills/aws.png" },
]

export function SkillsShowcase() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-sky-50 to-white rounded-3xl shadow-xl"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs that move with mouse */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.8) 0%, rgba(59,130,246,0.4) 70%, rgba(0,0,0,0) 100%)",
            x: mousePosition.x * dimensions.width - 250,
            y: mousePosition.y * dimensions.height - 250,
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-[80px]"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(79,70,229,0.4) 70%, rgba(0,0,0,0) 100%)",
            x: (1 - mousePosition.x) * dimensions.width - 150,
            y: (1 - mousePosition.y) * dimensions.height - 150,
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.25, 0.2] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Floating skill orbs */}
      <div className="absolute inset-0">
        {skills.map((skill, index) => {
          // Calculate position based on a circular pattern
          const angle = (index / skills.length) * Math.PI * 2
          const radius = Math.min(dimensions.width, dimensions.height) * 0.35
          const centerX = dimensions.width / 2
          const centerY = dimensions.height / 2

          // Add some randomness to make it more organic
          const randomOffset = Math.sin(index * 500) * 20

          const x = centerX + Math.cos(angle) * (radius + randomOffset)
          const y = centerY + Math.sin(angle) * (radius + randomOffset)

          const isHovered = hoveredSkill === skill.name
          console.log(skill)

          return (
            <motion.div
              key={skill.name}
              className="absolute"
              initial={{
                x,
                y,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: x + Math.sin(Date.now() * 0.001 + index) * 15,
                y: y + Math.cos(Date.now() * 0.001 + index) * 15,
                opacity: 1,
                scale: isHovered ? 1.5 : 1,
                zIndex: isHovered ? 10 : 1,
              }}
              transition={{
                x: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.1,
                },
                y: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.1,
                },
                opacity: { duration: 1, delay: index * 0.1 },
                scale: { duration: 0.3, type: "spring" },
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <motion.div
                className={`relative flex items-center justify-center rounded-full overflow-hidden
                  ${isHovered ? "shadow-lg shadow-sky-200" : "shadow-md"}`}
                animate={{
                  width: isHovered ? 100 : 70,
                  height: isHovered ? 100 : 70,
                  backgroundColor: isHovered ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)",
                }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <Image
                  src={
                    skill.icon.startsWith("/") ? skill.icon : `/placeholder.svg?height=50&width=50&text=${skill.name}`
                  }
                  alt={skill.name}
                  width={isHovered ? 60 : 40}
                  height={isHovered ? 60 : 40}
                  className="object-contain transition-all duration-300"
                />

                {/* Pulsing ring animation on hover */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-sky-400"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.4 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Central connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <g stroke="rgba(186, 230, 253, 0.4)" strokeWidth="1">
          {skills.map((skill, i) =>
            skills.slice(i + 1).map((otherSkill, j) => {
              // Only connect some skills to avoid too many lines
              if ((i + j) % 3 !== 0) return null

              const angle1 = (i / skills.length) * Math.PI * 2
              const angle2 = ((i + j + 1) / skills.length) * Math.PI * 2
              const radius = Math.min(dimensions.width, dimensions.height) * 0.35
              const centerX = dimensions.width / 2
              const centerY = dimensions.height / 2

              const randomOffset1 = Math.sin(i * 500) * 20
              const randomOffset2 = Math.sin((i + j + 1) * 500) * 20

              const x1 = centerX + Math.cos(angle1) * (radius + randomOffset1)
              const y1 = centerY + Math.sin(angle1) * (radius + randomOffset1)
              const x2 = centerX + Math.cos(angle2) * (radius + randomOffset2)
              const y2 = centerY + Math.sin(angle2) * (radius + randomOffset2)

              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 1, delay: (i + j) * 0.05 }}
                />
              )
            }),
          )}
        </g>
      </svg>

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 4 + 2
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sky-200"
            style={{ width: size, height: size }}
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: [Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.3, Math.random() * 0.3 + 0.1],
            }}
            transition={{
              x: { duration: Math.random() * 20 + 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              y: { duration: Math.random() * 20 + 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              opacity: { duration: Math.random() * 5 + 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
            }}
          />
        )
      })}

      {/* Central element */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center z-20"
        animate={{
          boxShadow: [
            "0 0 20px rgba(56,189,248,0.3)",
            "0 0 40px rgba(56,189,248,0.5)",
            "0 0 20px rgba(56,189,248,0.3)",
          ],
          rotate: 360,
        }}
        transition={{
          boxShadow: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        }}
      >
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <GearAnimation />
        </div>
      </motion.div>
    </div>
  )
}

// Animated gear icon
function GearAnimation() {
  return (
    <div className="relative w-12 h-12">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full opacity-50">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1" strokeDasharray="40 10" />
        </svg>
      </motion.div>
    </div>
  )
}

