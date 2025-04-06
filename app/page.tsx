"use client"

import type React from "react"

import {
  ChevronRight,
  Download,
  Lock,
  Clock,
  Code,
  Shield,
  Eye,
  Fingerprint,
  Globe,
  Terminal,
  Server,
  Wifi,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

// Digital Rain (Matrix) Effect Component
const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to store the current y position of each column
    const drops: number[] = Array(columns).fill(1)

    // Characters to display (can include more cybersecurity related symbols)
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    const draw = () => {
      // Set a semi-transparent black to create the fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set the color and font for the characters
      ctx.fillStyle = "#0891b2" // Cyan color
      ctx.font = `${fontSize}px monospace`

      // Loop through each column
      for (let i = 0; i < drops.length; i++) {
        // Choose a random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Randomly reset some drops to the top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move the drop down
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33) // ~30fps

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0" />
}

// Circuit Board Background
const CircuitBoard = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid-size"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-cyan-500 animate-ping-slow opacity-30"></div>
      <div
        className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full border border-cyan-600 animate-ping-slow opacity-20"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full border border-blue-500 animate-ping-slow opacity-25"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  )
}

// Mouse Trail Effect
const MouseTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<{ x: number; y: number; age: number }[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    const trailInterval = setInterval(() => {
      setTrail((prevTrail) => {
        // Add new position to the beginning
        const newTrail = [
          { x: mousePosition.x, y: mousePosition.y, age: 0 },
          ...prevTrail.map((point) => ({ ...point, age: point.age + 1 })),
        ].filter((point) => point.age < 15) // Keep only recent points

        return newTrail
      })
    }, 50)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(trailInterval)
    }
  }, [mousePosition])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-cyan-500"
          style={{
            left: point.x,
            top: point.y,
            width: Math.max(4, 12 - point.age * 0.8),
            height: Math.max(4, 12 - point.age * 0.8),
            opacity: Math.max(0.1, 1 - point.age * 0.07),
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}

// Scanning Effect Component
const ScanningEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 scanline"></div>
      <div className="absolute inset-0 noise-overlay"></div>
    </div>
  )
}

// Terminal typing effect component
const TypingEffect = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className="font-mono">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Animated Terminal Component
const AnimatedTerminal = ({ commands }: { commands: string[] }) => {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [output, setOutput] = useState<string[]>([])

  useEffect(() => {
    if (currentCommand < commands.length) {
      const timeout = setTimeout(
        () => {
          setOutput((prev) => [...prev, commands[currentCommand]])
          setCurrentCommand((prev) => prev + 1)
        },
        1000 + Math.random() * 1000,
      )

      return () => clearTimeout(timeout)
    }
  }, [currentCommand, commands])

  return (
    <div className="bg-black/80 border border-cyan-900 rounded-md p-4 font-mono text-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-2 border-b border-cyan-900/50 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-gray-400 text-xs ml-2">wraith@terminal:~</span>
      </div>
      <div className="text-gray-300">
        {output.map((cmd, index) => (
          <div key={index} className="mb-1">
            <span className="text-cyan-500">wraith@secure:~$</span> <span className="text-white">{cmd}</span>
          </div>
        ))}
        {currentCommand < commands.length && (
          <div className="flex items-center">
            <span className="text-cyan-500">wraith@secure:~$</span>
            <span className="ml-1 text-white">
              <TypingEffect text={commands[currentCommand]} speed={80} />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// Particle background component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }[] = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(0, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 155) + 100}, ${Math.random() * 0.5 + 0.1})`,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 150, 200, ${0.1 - distance / 1000})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

// Glitch text effect
const GlitchText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 z-0 text-red-500 opacity-70 animate-pulse transform translate-x-[1px] translate-y-[1px]">
        {children}
      </span>
      <span className="absolute top-0 left-0 z-0 text-blue-500 opacity-70 animate-pulse transform -translate-x-[1px] -translate-y-[1px]">
        {children}
      </span>
    </div>
  )
}

// Hexagon Grid Component
const HexagonGrid = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
      <div className="hexagon-grid">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="hexagon"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

// Radar Animation Component
const RadarAnimation = () => {
  return (
    <div className="radar-container">
      <div className="radar-circle"></div>
      <div className="radar-sweep"></div>
    </div>
  )
}

// Holographic UI Element
const HolographicUI = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="holographic-container">
      <div className="holographic-glow"></div>
      <div className="holographic-content">{children}</div>
      <div className="holographic-scanline"></div>
    </div>
  )
}

// Animated Loading Bar
const LoadingBar = ({ progress = 75 }: { progress?: number }) => {
  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev < progress) return prev + 1
        return prev
      })
    }, 20)

    return () => clearInterval(interval)
  }, [progress])

  return (
    <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
        style={{ width: `${currentProgress}%` }}
      >
        <div className="absolute inset-0 bg-shimmer"></div>
      </div>
    </div>
  )
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionId = section.getAttribute("id")

        if (sectionTop < window.innerHeight / 2 && sectionTop > -window.innerHeight / 2) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <DigitalRain />
      <ParticleBackground />
      <CircuitBoard />
      <ScanningEffect />
      <MouseTrail />

      {/* Navigation */}
      <nav className="container mx-auto py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-full blur-md opacity-70 animate-pulse"></div>
            <Lock className="h-6 w-6 text-cyan-400 relative" />
          </div>
          <GlitchText>
            <span className="font-bold text-xl tracking-wider">WRAITH</span>
          </GlitchText>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["features", "security", "download", "about"].map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className={cn(
                "hover:text-cyan-400 transition-colors relative group uppercase tracking-wider text-sm",
                activeSection === item ? "text-cyan-400" : "text-gray-300",
              )}
            >
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              {item}
            </Link>
          ))}
        </div>
        <Button
          variant="outline"
          className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300 relative group overflow-hidden"
        >
          <span className="relative z-10">ACCESS</span>
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 transition-all duration-300 group-hover:w-full"></span>
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 relative z-10">
        <div
          className={cn(
            "max-w-3xl mx-auto text-center transform transition-all duration-1000",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <div className="mb-6 inline-block">
            <GlitchText className="text-4xl md:text-6xl font-bold">
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Untraceable. Uncompromising.
              </h1>
            </GlitchText>
          </div>
          <div className="h-16 mb-10">
            <p className="text-lg md:text-xl text-gray-300">
              <TypingEffect text="Dark web messaging with zero footprint. Complete anonymity guaranteed." />
            </p>
          </div>

          <div className="holographic-container mb-10">
            <div className="holographic-content p-6 border border-cyan-900/50 rounded-lg bg-black/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
                  <span className="text-cyan-400 font-mono text-sm">SYSTEM STATUS</span>
                </div>
                <span className="text-cyan-400 font-mono text-sm">SECURE</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">ENCRYPTION</span>
                    <span className="text-cyan-400">ACTIVE</span>
                  </div>
                  <LoadingBar progress={100} />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">ANONYMITY</span>
                    <span className="text-cyan-400">MAXIMUM</span>
                  </div>
                  <LoadingBar progress={95} />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">TOR NETWORK</span>
                    <span className="text-cyan-400">CONNECTED</span>
                  </div>
                  <LoadingBar progress={90} />
                </div>
              </div>
            </div>
            <div className="holographic-scanline"></div>
          </div>

          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
            <Button className="relative px-8 py-6 bg-black border border-cyan-700 rounded-lg text-lg group-hover:border-cyan-400 transition-colors duration-300">
              <span className="relative z-10 group-hover:text-cyan-300 transition-colors duration-300">
                Enter the Shadows
              </span>
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
          <div className="mt-6 text-gray-500 font-mono text-sm">TOR-ENABLED · ENCRYPTED · ANONYMOUS</div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-950 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 glitch-text">Core Security Features</h2>
          <p className="text-center text-cyan-500 mb-16 font-mono">{"<encrypted_communication_protocol>"}</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-cyan-500" />,
                title: "Zero Logging",
                description: "No message storage. No metadata. No digital footprint. Complete deniability.",
              },
              {
                icon: <Clock className="h-10 w-10 text-cyan-500" />,
                title: "Self-Destructing Messages",
                description: "Messages vanish after being read or after your specified time window.",
              },
              {
                icon: <Code className="h-10 w-10 text-cyan-500" />,
                title: "Open Source Cryptography",
                description: "Our encryption protocols are open for review. Trust through verification.",
              },
              {
                icon: <Globe className="h-10 w-10 text-cyan-500" />,
                title: "Dark Web Routing",
                description: "Messages routed through multiple encrypted nodes for untraceable communication.",
              },
              {
                icon: <Fingerprint className="h-10 w-10 text-cyan-500" />,
                title: "Anti-Fingerprinting",
                description: "Prevents digital fingerprinting that could identify your device or location.",
              },
              {
                icon: <Eye className="h-10 w-10 text-cyan-500" />,
                title: "Invisible Mode",
                description: "Operate completely under the radar with our proprietary cloaking technology.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-cyan-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(8,145,178,0.2)] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>

                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 w-0 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-black relative z-10">
        <HexagonGrid />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Security Architecture</h2>
            <p className="text-center text-cyan-500 mb-16 font-mono">{"<advanced_encryption_protocols>"}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-cyan-900 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20">
                  <RadarAnimation />
                </div>
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Multi-Layered Encryption</h3>
                <p className="text-gray-300 mb-4">
                  Every message is encrypted with multiple layers of military-grade encryption before being sent through
                  our anonymous routing network.
                </p>
                <div className="font-mono text-xs text-cyan-600 animate-pulse group-hover:animate-none">
                  {"{AES-256-GCM + ChaCha20-Poly1305 + Curve25519}"}
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-cyan-900 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Perfect Forward Secrecy</h3>
                <p className="text-gray-300 mb-4">
                  New encryption keys are generated for every message, ensuring that compromise of one message doesn't
                  affect others.
                </p>
                <div className="font-mono text-xs text-cyan-600 animate-pulse group-hover:animate-none">
                  {"{Ephemeral Key Exchange + Session Rotation}"}
                </div>
              </div>
            </div>

            <div className="mb-16">
              <AnimatedTerminal
                commands={[
                  "initializing secure connection...",
                  "verifying cryptographic signatures...",
                  "generating ephemeral keys...",
                  "establishing encrypted tunnel...",
                  "routing through anonymous network...",
                  "connection secure. welcome to wraith.",
                ]}
              />
            </div>

            <div className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-lg border border-gray-800 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="text-xl font-bold mb-6 text-center text-cyan-400">Network Security Visualization</h3>

              <div className="relative h-64 mb-8 border border-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black/80"></div>
                <div className="absolute inset-0 network-grid"></div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full animate-pulse-slow"></div>

                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>
                <div
                  className="absolute top-3/4 left-3/4 w-3 h-3 bg-blue-500 rounded-full animate-ping"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/4 right-1/4 w-3 h-3 bg-cyan-600 rounded-full animate-ping"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <div
                  className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-600 rounded-full animate-ping"
                  style={{ animationDelay: "0.8s" }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-cyan-400 font-mono text-sm">SECURE NETWORK ACTIVE</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <Server className="h-8 w-8 text-cyan-500 mb-2" />
                  <div className="text-xs text-center text-gray-400">Encrypted Servers</div>
                </div>
                <div className="flex flex-col items-center">
                  <Wifi className="h-8 w-8 text-cyan-500 mb-2" />
                  <div className="text-xs text-center text-gray-400">Secure Routing</div>
                </div>
                <div className="flex flex-col items-center">
                  <Terminal className="h-8 w-8 text-cyan-500 mb-2" />
                  <div className="text-xs text-center text-gray-400">End-to-End Encryption</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-gradient-to-b from-gray-950 to-black relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Access Wraith Now</h2>
          <p className="text-cyan-500 mb-10 font-mono">{"<secure_distribution_channels>"}</p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { platform: "Windows", icon: "💻", delay: "0ms" },
              { platform: "macOS", icon: "🍎", delay: "100ms" },
              { platform: "Linux", icon: "🐧", delay: "200ms" },
              { platform: "iOS", icon: "📱", delay: "300ms" },
              { platform: "Android", icon: "🤖", delay: "400ms" },
            ].map((os, index) => (
              <div key={index} className="relative group" style={{ animationDelay: os.delay }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-md blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                <Button
                  variant="outline"
                  className="relative bg-black border-cyan-900 hover:bg-cyan-950/30 px-6 py-5 group-hover:border-cyan-500 transition-all duration-300"
                >
                  <span className="mr-2">{os.icon}</span> {os.platform}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-800 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">Secure Installation Instructions</h3>
            <div className="font-mono text-sm text-left bg-black/50 p-4 rounded border border-gray-800 overflow-x-auto">
              <p className="text-gray-400">$ curl -s https://wraith.onion/install.sh | gpg --verify</p>
              <p className="text-gray-400">$ chmod +x ./wraith-install</p>
              <p className="text-cyan-500">$ ./wraith-install --secure --no-logs</p>
              <p className="text-green-500">{"> Installation complete. Your keys have been generated."}</p>
              <p className="text-green-500">{"> Wraith is now running in secure mode."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Disappear?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the shadow network of users who demand absolute privacy and security.
          </p>
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
            <Button className="relative px-8 py-6 bg-black border border-cyan-700 rounded-lg text-lg group-hover:border-cyan-400 transition-colors duration-300">
              <span className="relative z-10 group-hover:text-cyan-300 transition-colors duration-300">Vanish Now</span>
              <Download className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-950 border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-full blur-md opacity-50"></div>
                <Lock className="h-6 w-6 text-cyan-400 relative" />
              </div>
              <span className="font-bold text-xl tracking-wider">WRAITH</span>
            </div>
            <div className="flex gap-8 mb-6 md:mb-0">
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Security
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Canary
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                PGP Keys
              </Link>
            </div>
            <div className="text-gray-500 font-mono text-sm">
              <span className="text-cyan-600">~$</span> WRAITH_v3.0.2 {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

