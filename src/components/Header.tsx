'use client'

import { Link } from '@tanstack/react-router'
import ParaglideLocaleSwitcher from './LocaleSwitcher.tsx'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Vote } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import * as m from '@/paraglide/messages'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !headerRef.current) return

    const header = headerRef.current

    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.direction === 1) {
          gsap.to(header, {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            duration: 0.3,
            ease: 'power2.out',
          })
        } else if (self.progress === 0) {
          gsap.to(header, {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(0px)',
            duration: 0.3,
            ease: 'power2.inOut',
          })
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const navItems = [
    { to: '/', label: m.nav_home() },
    { to: '/konzept', label: m.nav_konzept() },
    { to: '/team', label: m.nav_team() },
    { to: '/traeger', label: m.nav_traeger() },
    { to: '/blog', label: m.nav_blog() },
    { to: '/impressum', label: m.nav_impressum() },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 z-40 w-full transition-all duration-300"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity magnetic-target">
            <Vote className="w-8 h-8 text-white" />
            <span className="font-bold text-xl hidden sm:inline text-white">
              {m.site_title()}
            </span>
            <span className="font-bold text-xl sm:hidden text-white">EWF'26</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors magnetic-target"
                activeProps={{
                  className: 'text-sm font-medium text-white',
                }}
              >
                {item.label}
              </Link>
            ))}
            <ParaglideLocaleSwitcher />
          </nav>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-card border-r border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Vote className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-bold">{m.site_title()}</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors mb-2"
              activeProps={{
                className: 'flex items-center gap-3 p-3 rounded-lg bg-primary text-primary-foreground transition-colors mb-2',
              }}
            >
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <ParaglideLocaleSwitcher />
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
