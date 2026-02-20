import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { getContent } from '../../data/content'
import EditableElement from '../editor/EditableElement'
import EditableImage from '../editor/EditableImage'

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [content, setContent] = useState(() => {
    const loadedContent = getContent()
    return loadedContent?.hero || {
      label: 'אפי רוזנברג - יועץ אסטרטגי',
      rotatingWords: ['בהירות', 'מיקוד', 'החלטה', 'אסטרטגיה'],
      subtitle: 'שווה כוח.',
      description: 'לשעבר מנכ"ל וסמנכ"ל ב-Visa, AIG וטלכלל',
      statement: 'אני לא כאן לעודד — אני כאן לבנות.',
      ctaButton: 'פגישת אסטרטגיה',
      ctaSubtext: '  ללא התחייבות.',
      imageUrl: 'https://i.ibb.co/BVhjVnR1/1.png'
    }
  })
  
  // Reload content when component mounts or when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const loadedContent = getContent()
      if (loadedContent?.hero) {
        setContent(loadedContent.hero)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    // Also check on focus in case changes were made in another tab
    window.addEventListener('focus', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleStorageChange)
    }
  }, [])
  
  const words = content?.rotatingWords || ['בהירות', 'מיקוד', 'החלטה', 'אסטרטגיה']
  
  // Rotating words effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
          style={{ transform: `translateX(${mousePosition.x}px)` }}
        />
        <div 
          className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
          style={{ transform: `translateX(${-mousePosition.x}px)` }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right Side - Content */}
          <motion.div 
            className="space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <EditableElement
                id="hero-label"
                as="span"
                className="inline-block px-4 py-2 border border-zinc-800 text-zinc-400 text-sm tracking-wider"
              >
                {content.label}
              </EditableElement>
            </motion.div>

            {/* Main Headline with Rotating Words */}
            <div className="space-y-4">
              <div className="relative h-[160px] md:h-[200px] overflow-hidden">
                <motion.h1 
                  className="text-[7rem] md:text-[10rem] font-bold leading-none tracking-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  {words.map((word, index) => (
                    <span
                      key={word}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        currentWord === index 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-10'
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #DC2626 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </motion.h1>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <EditableElement
                  id="hero-subtitle"
                  as="h2"
                  className="text-4xl md:text-6xl font-bold text-white"
                >
                  {content.subtitle}
                </EditableElement>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <EditableElement
                id="hero-description"
                as="p"
                className="text-zinc-400 text-lg leading-relaxed max-w-xl"
              >
                {content.description}
              </EditableElement>
            </motion.div>

            {/* Key Statement */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <EditableElement
                id="hero-statement"
                as="p"
                className="text-2xl md:text-3xl font-semibold text-white leading-relaxed border-r-4 border-accent pr-6"
              >
                {content.statement}
              </EditableElement>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <a
                href="https://wa.me/972542005886?text=היי%20אפי,%20אני%20מעוניין%20בשיחת%20היכרות"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-accent text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] inline-block"
              >
                <span className="relative z-10">{content.ctaButton}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
              
              <EditableElement
                id="hero-cta-subtext"
                as="span"
                className="text-zinc-500 text-sm"
              >
                {content.ctaSubtext}
              </EditableElement>
            </motion.div>
          </motion.div>

          {/* Left Side - Image */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-red-900/10 rounded-full blur-3xl animate-pulse delay-1000" />
            
            {/* Profile Image Container */}
            <div className="relative z-10 aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 border border-zinc-800 transform rotate-6 transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 border border-accent/30 transform -rotate-6 transition-transform group-hover:-rotate-12" />
              
              <img
                src={content.imageUrl}
                alt="אפי רוזנברג"
                className="relative z-20 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
      >
        <ArrowDown className="w-6 h-6 text-zinc-600" />
      </motion.div>
    </section>
  )
}

export default HeroSection
