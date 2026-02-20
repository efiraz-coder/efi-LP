import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, Award, Target } from 'lucide-react'
import EditableElement from '../editor/EditableElement'

const BioSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [count, setCount] = useState(0)

  // Counter animation for statistics
  useEffect(() => {
    if (isInView && count < 25) {
      const timer = setTimeout(() => setCount(count + 1), 50)
      return () => clearTimeout(timer)
    }
  }, [isInView, count])

  const companies = [
    { name: 'Visa', role: 'מנכ"ל', icon: Building2 },
    { name: 'AIG', role: 'סמנכ"ל', icon: Award },
    { name: 'טלכלל', role: 'סמנכ"ל', icon: Target }
  ]

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-black">
      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <h2 className="text-[20vw] font-bold text-zinc-950 opacity-50 whitespace-nowrap select-none">
          STRATEGY
        </h2>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-2 border border-zinc-800 text-zinc-400 text-sm tracking-wider">
            הגישה
          </span>
        </motion.div>

        {/* Main Headlines */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <EditableElement 
            id="bio-headline1"
            as="h2"
            className="text-6xl md:text-8xl font-bold mb-4"
          >
            לא קואצ׳ינג.
          </EditableElement>
          <EditableElement 
            id="bio-headline2"
            as="h2"
            className="text-6xl md:text-8xl font-bold text-gradient"
          >
            אסטרטגיה.
          </EditableElement>
        </motion.div>

        {/* Quote Section */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="space-y-8">
            <EditableElement
              id="bio-quote"
              as="blockquote"
              className="text-2xl md:text-3xl text-zinc-300 leading-relaxed font-light border-r-4 border-accent pr-8"
            >
              "אני מגיע מהצמתים שבהם ההנדסה פוגשת את הנפש. עם השכלה בהנדסה, מינהל עסקים ופסיכולוגיה — אני בוחן עסקים וקריירות כמערכות."
            </EditableElement>

            {/* Statistics */}
            <div className="flex items-baseline gap-4">
              <div className="text-8xl font-bold text-accent">
                {count}
              </div>
              <EditableElement
                id="bio-stats-label"
                as="div"
                className="text-zinc-400 text-lg"
              >
                שנות ניסיון
              </EditableElement>
            </div>
          </div>

          {/* Companies Experience Cards */}
          <div className="space-y-6">
            {companies.map((company, index) => {
              const Icon = company.icon
              return (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="group relative p-6 border border-zinc-800 bg-zinc-950/50 backdrop-blur hover:border-accent/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <EditableElement 
                        id={`bio-company-${index}-name`}
                        as="h3"
                        className="text-2xl font-bold text-white mb-1"
                      >
                        {company.name}
                      </EditableElement>
                      <EditableElement 
                        id={`bio-company-${index}-role`}
                        as="p"
                        className="text-zinc-400"
                      >
                        {company.role}
                      </EditableElement>
                    </div>
                  </div>
                  
                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500" />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Two Column Text Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-12 pt-12 border-t border-zinc-800"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="space-y-4">
            <EditableElement
              id="bio-section1-title"
              as="h3"
              className="text-3xl font-bold text-white mb-6"
            >
              למה לא קואצ'ינג?
            </EditableElement>
            <EditableElement
              id="bio-section1-p1"
              as="p"
              className="text-zinc-400 text-lg leading-relaxed"
            >
              כי עסקים לא צריכים עידוד — הם צריכים מבנה. קואצ'ים שואלים שאלות. אני בונה תשתיות. אני מעביר חברות ואנשים מרגש לתוצאה, ממחשבה למערכת, מחזון לביצוע.
            </EditableElement>
            <EditableElement
              id="bio-section1-p2"
              as="p"
              className="text-zinc-400 text-lg leading-relaxed"
            >
              אני מאמין שהבעיות הכי עמוקות דורשות הבנה טכנית ואנושית בו זמנית. לא רק "מה קורה" אלא גם "למה זה קורה" ו"איך זה משתנה".
            </EditableElement>
          </div>

          <div className="space-y-4">
            <EditableElement
              id="bio-section2-title"
              as="h3"
              className="text-3xl font-bold text-white mb-6"
            >
              עם מי אני עובד?
            </EditableElement>
            <EditableElement
              id="bio-section2-p1"
              as="p"
              className="text-zinc-400 text-lg leading-relaxed"
            >
              עם מנכ"לים שלא רוצים עוד פרזנטציה — רוצים תוכנית. עם מנהלים שתקועים בין חזון למציאות. עם אנשים שמרגישים שמשהו לא זז, אבל לא יודעים מה.
            </EditableElement>
            <EditableElement
              id="bio-section2-p2"
              as="p"
              className="text-zinc-400 text-lg leading-relaxed"
            >
              אם אתה מחפש מוטיבציה — זה לא המקום. אם אתה מחפש מבנה, אסטרטגיה, וביצוע — בוא נדבר.
            </EditableElement>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BioSection
