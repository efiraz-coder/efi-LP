import React from 'react'
import HeroSection from '../components/landing/HeroSection'
import BioSection from '../components/landing/BioSection'
import RouterSection from '../components/landing/RouterSection'

const Home = () => {
  return (
    <main className="relative">
      <HeroSection />
      <BioSection />
      <RouterSection />
      
      {/* Footer */}
      <footer className="relative py-12 bg-black border-t border-zinc-900">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-zinc-500 text-sm">
              © 2026 אפי רוזנברג. כל הזכויות שמורות.
            </div>
            <div className="flex gap-8">
              <a 
                href="https://wa.me/972542005886" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-accent transition-colors"
              >
                WhatsApp
              </a>
              <a 
                href="mailto:efiraz@gmail.com" 
                className="text-zinc-400 hover:text-accent transition-colors"
              >
                Email
              </a>
              <a 
                href="tel:+972542005886" 
                className="text-zinc-400 hover:text-accent transition-colors"
              >
                טלפון
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home
