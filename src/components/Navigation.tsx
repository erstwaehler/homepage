import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import * as m from '@/paraglide/messages'
import ParaglideLocaleSwitcher from './LocaleSwitcher'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { to: '/', label: m.nav_home() },
    { to: '/konzept', label: m.nav_konzept() },
    { to: '/team', label: m.nav_team() },
    { to: '/traeger', label: m.nav_traeger() },
    { to: '/blog', label: m.nav_blog() },
    { to: '/impressum', label: m.nav_impressum() },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="font-bold text-xl text-primary">
              EWF<span className="text-accent">26</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                activeProps={{
                  className: 'text-sm font-medium text-primary border-b-2 border-primary pb-0.5',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2">
              <ParaglideLocaleSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-foreground hover:bg-accent rounded-md transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="fixed top-0 right-0 h-full w-80 bg-card border-l border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Navigation</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-accent rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
                  activeProps={{
                    className: 'px-4 py-3 rounded-lg bg-primary text-primary-foreground',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 px-4">
                <ParaglideLocaleSwitcher />
              </div>
            </nav>
          </aside>
        </div>
      )}
    </header>
  )
}
