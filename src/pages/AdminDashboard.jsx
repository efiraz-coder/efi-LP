import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getContent, updateContent, resetContent } from '../data/content'
import { LogOut, Save, RotateCcw, Edit2, Home } from 'lucide-react'

const AdminDashboard = () => {
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [content, setContent] = useState(getContent())
  const [activeSection, setActiveSection] = useState('hero')
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleInputChange = (section, field, value) => {
    setContent(prev => {
      const newContent = { ...prev }
      const keys = field.split('.')
      let current = newContent[section]
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newContent
    })
  }

  const handleSave = () => {
    localStorage.setItem('siteContent', JSON.stringify(content))
    setSaveMessage('השינויים נשמרו בהצלחה!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleReset = () => {
    if (window.confirm('האם אתה בטוח שברצונך לאפס את כל התוכן למצב ברירת המחדל?')) {
      const defaultContent = resetContent()
      setContent(defaultContent)
      setSaveMessage('התוכן אופס למצב ברירת המחדל')
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const sections = [
    { id: 'hero', name: 'Hero Section' },
    { id: 'bio', name: 'Bio Section' },
    { id: 'router', name: 'Router Section' },
    { id: 'footer', name: 'Footer' }
  ]

  const handleVisualEditor = () => {
    navigate('/admin/visual-editor')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Edit2 className="w-6 h-6 text-accent" />
              <h1 className="text-2xl font-bold">לוח בקרה - ניהול תוכן</h1>
            </div>
            <div className="flex items-center gap-4">
              {saveMessage && (
                <span className="text-green-400 text-sm">{saveMessage}</span>
              )}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>צפה באתר</span>
              </a>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-red-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>שמור שינויים</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>יציאה</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Visual Editor Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-accent/20 to-red-900/20 border border-accent/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">עורך ויזואלי מתקדם 🎨</h3>
              <p className="text-zinc-300">
                ערוך את האתר ישירות עם drag & drop, שינוי פונטים, צבעים, תמונות ועוד - בדיוק כמו Wix!
              </p>
            </div>
            <button
              onClick={handleVisualEditor}
              className="px-8 py-4 bg-accent hover:bg-red-700 text-white font-bold text-lg transition-all hover:scale-105"
            >
              פתח עורך ויזואלי →
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-right px-4 py-3 transition-colors ${
                    activeSection === section.id
                      ? 'bg-accent text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900 border border-zinc-800 p-8">
              <h2 className="text-3xl font-bold mb-8 text-right">
                עריכת {sections.find(s => s.id === activeSection)?.name}
              </h2>

              {/* Hero Section */}
              {activeSection === 'hero' && content.hero && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">תווית</label>
                    <input
                      type="text"
                      value={content.hero.label || ''}
                      onChange={(e) => handleInputChange('hero', 'label', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">כותרת משנה</label>
                    <input
                      type="text"
                      value={content.hero.subtitle}
                      onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">תיאור</label>
                    <input
                      type="text"
                      value={content.hero.description}
                      onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">הצהרה מרכזית</label>
                    <textarea
                      value={content.hero.statement}
                      onChange={(e) => handleInputChange('hero', 'statement', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">כפתור CTA</label>
                    <input
                      type="text"
                      value={content.hero.ctaButton}
                      onChange={(e) => handleInputChange('hero', 'ctaButton', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">טקסט משני CTA</label>
                    <input
                      type="text"
                      value={content.hero.ctaSubtext}
                      onChange={(e) => handleInputChange('hero', 'ctaSubtext', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">URL תמונה</label>
                    <input
                      type="text"
                      value={content.hero.imageUrl}
                      onChange={(e) => handleInputChange('hero', 'imageUrl', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Bio Section */}
              {activeSection === 'bio' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">כותרת 1</label>
                    <input
                      type="text"
                      value={content.bio.headline1}
                      onChange={(e) => handleInputChange('bio', 'headline1', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">כותרת 2</label>
                    <input
                      type="text"
                      value={content.bio.headline2}
                      onChange={(e) => handleInputChange('bio', 'headline2', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">ציטוט</label>
                    <textarea
                      value={content.bio.quote}
                      onChange={(e) => handleInputChange('bio', 'quote', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">שנות ניסיון</label>
                    <input
                      type="number"
                      value={content.bio.yearsExperience}
                      onChange={(e) => handleInputChange('bio', 'yearsExperience', parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">למה לא קואצ'ינג - פסקה 1</label>
                    <textarea
                      value={content.bio.whyNotCoaching.paragraph1}
                      onChange={(e) => handleInputChange('bio', 'whyNotCoaching.paragraph1', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">למה לא קואצ'ינג - פסקה 2</label>
                    <textarea
                      value={content.bio.whyNotCoaching.paragraph2}
                      onChange={(e) => handleInputChange('bio', 'whyNotCoaching.paragraph2', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">עם מי אני עובד - פסקה 1</label>
                    <textarea
                      value={content.bio.whoIWorkWith.paragraph1}
                      onChange={(e) => handleInputChange('bio', 'whoIWorkWith.paragraph1', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">עם מי אני עובד - פסקה 2</label>
                    <textarea
                      value={content.bio.whoIWorkWith.paragraph2}
                      onChange={(e) => handleInputChange('bio', 'whoIWorkWith.paragraph2', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Router Section */}
              {activeSection === 'router' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">כותרת ראשית</label>
                    <input
                      type="text"
                      value={content.router.headline}
                      onChange={(e) => handleInputChange('router', 'headline', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">כותרת מודגשת</label>
                    <input
                      type="text"
                      value={content.router.headlineAccent}
                      onChange={(e) => handleInputChange('router', 'headlineAccent', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">כותרת משנה</label>
                    <input
                      type="text"
                      value={content.router.subtitle}
                      onChange={(e) => handleInputChange('router', 'subtitle', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  {content.router.services.map((service, index) => (
                    <div key={service.id} className="p-6 bg-black border border-zinc-800 space-y-4">
                      <h3 className="text-xl font-bold text-accent text-right">שירות {service.id}</h3>
                      
                      <div>
                        <label className="block text-zinc-300 mb-2 text-right">כותרת</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const newServices = [...content.router.services]
                            newServices[index].title = e.target.value
                            handleInputChange('router', 'services', newServices)
                          }}
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-300 mb-2 text-right">Hook</label>
                        <textarea
                          value={service.hook}
                          onChange={(e) => {
                            const newServices = [...content.router.services]
                            newServices[index].hook = e.target.value
                            handleInputChange('router', 'services', newServices)
                          }}
                          rows="2"
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-300 mb-2 text-right">פרטים</label>
                        <textarea
                          value={service.details}
                          onChange={(e) => {
                            const newServices = [...content.router.services]
                            newServices[index].details = e.target.value
                            handleInputChange('router', 'services', newServices)
                          }}
                          rows="3"
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">טקסט CTA</label>
                    <input
                      type="text"
                      value={content.router.ctaText}
                      onChange={(e) => handleInputChange('router', 'ctaText', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">כפתור CTA</label>
                    <input
                      type="text"
                      value={content.router.ctaButton}
                      onChange={(e) => handleInputChange('router', 'ctaButton', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Footer Section */}
              {activeSection === 'footer' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-zinc-300 mb-2 text-right">זכויות יוצרים</label>
                    <input
                      type="text"
                      value={content.footer.copyright}
                      onChange={(e) => handleInputChange('footer', 'copyright', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-right focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
