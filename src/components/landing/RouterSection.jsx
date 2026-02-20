import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Users, Heart, ArrowLeft } from 'lucide-react'
import EditableElement from '../editor/EditableElement'

const RouterSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const services = [
    {
      id: '01',
      title: 'עסק תקוע',
      hook: 'המערכת לא זורמת. הצוות לא מבצע. אתה מרגיש שאתה היחיד שעובד.',
      details: 'נבנה מבנה ארגוני, זרימת תהליכים, ותרבות של אחריות. מתוך ניסיון כמנכ"ל וסמנכ"ל בחברות גלובליות.',
      icon: Briefcase,
      gradient: 'from-red-600 to-orange-600'
    },
    {
      id: '02',
      title: 'קריירה תקועה',
      hook: 'אתה מנהל טוב, אבל לא יודע איך לעבור לשלב הבא.',
      details: 'נזהה פערי מיומנויות, נבנה מסלול, ונעבוד על הדרך שמעבירה אותך מאיפה שאתה לאן שאתה רוצה להיות.',
      icon: Users,
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: '03',
      title: 'אישי תקוע',
      hook: 'אתה יודע מה אתה רוצה, אבל לא מצליח להגיע לשם.',
      details: 'נעבוד על דפוסי חשיבה, החלטות, והרגלים. עם כלים מפסיכולוגיה קוגניטיבית ואימון אסטרטגי.',
      icon: Heart,
      gradient: 'from-pink-600 to-red-600'
    }
  ]

  return (
    <section ref={ref} className="relative py-32 bg-zinc-950">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <EditableElement
            id="router-main-title"
            as="h2"
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            איפה המערכת
            <br />
            <span className="text-gradient">תקועה?</span>
          </EditableElement>
          <EditableElement
            id="router-subtitle"
            as="p"
            className="text-zinc-400 text-xl"
          >
            בחר את נקודת הכניסה שלך
          </EditableElement>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-8 bg-black border border-zinc-800 hover:border-zinc-700 transition-all duration-500 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Number Badge */}
                  <div className="relative z-10 mb-6">
                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${service.gradient} text-white font-bold text-sm`}>
                      {service.id}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`inline-flex p-4 bg-gradient-to-br ${service.gradient} bg-opacity-10`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <EditableElement 
                      id={`router-service-${index}-title`}
                      as="h3"
                      className="text-3xl font-bold text-white"
                    >
                      {service.title}
                    </EditableElement>
                    
                    <EditableElement 
                      id={`router-service-${index}-hook`}
                      as="p"
                      className="text-lg text-zinc-300 leading-relaxed font-medium"
                    >
                      {service.hook}
                    </EditableElement>
                    
                    <EditableElement 
                      id={`router-service-${index}-details`}
                      as="p"
                      className="text-zinc-400 leading-relaxed"
                    >
                      {service.details}
                    </EditableElement>
                  </div>

                  {/* Arrow Icon - Bottom Right */}
                  <div className="absolute bottom-6 left-6 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                    <ArrowLeft className="w-6 h-6 text-zinc-600 group-hover:text-accent" />
                  </div>

                  {/* Decorative Line */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right`} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="inline-block p-12 border-2 border-zinc-800 bg-zinc-950/50 backdrop-blur">
            <EditableElement
              id="router-cta-text"
              as="p"
              className="text-2xl text-zinc-300 mb-8 max-w-2xl"
            >
              לא בטוח איפה להתחיל? נדבר ונבין יחד
            </EditableElement>
            <a
              href="https://wa.me/972542005886?text=היי%20אפי,%20אני%20מעוניין%20בשיחת%20היכרות"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-10 py-5 border-2 border-accent text-accent font-bold text-lg overflow-hidden hover:text-white transition-colors duration-300"
            >
              <span className="relative z-10">קבע שיחת היכרות</span>
              <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}

export default RouterSection
