'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/data'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About Us' },
  { href: '/reviews', label: 'Reviews' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="MuchiBari"
              width={140}
              height={40}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop call button */}
          <a href={`tel:${WHATSAPP_NUMBER}`}
            className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Phone className="w-4 h-4" />
            <span>{WHATSAPP_NUMBER}</span>
          </a>

          {/* Mobile: call button only */}
          <a href={`tel:${WHATSAPP_NUMBER}`}
            className="md:hidden flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm">
            <Phone className="w-4 h-4" />
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </header>
  )
}