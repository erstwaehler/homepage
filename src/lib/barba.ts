import barba from '@barba/core'
import { gsap } from './gsap'
import { initScrollTrigger, cleanupScrollTrigger } from './gsap'

export function initBarba() {
  if (typeof window === 'undefined') return

  barba.init({
    transitions: [
      {
        name: 'page-transition',
        async leave(data) {
          cleanupScrollTrigger()
          const done = this.async()
          
          gsap.to(data.current.container, {
            opacity: 0,
            y: -50,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: done,
          })
        },
        async enter(data) {
          window.scrollTo(0, 0)
          
          gsap.from(data.next.container, {
            opacity: 0,
            y: 50,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              initScrollTrigger()
            },
          })
        },
      },
    ],
    views: [
      {
        namespace: 'home',
        afterEnter() {
          if (typeof window !== 'undefined' && window.initHeroAnimations) {
            window.initHeroAnimations()
          }
        },
      },
    ],
  })
}

declare global {
  interface Window {
    initHeroAnimations?: () => void
  }
}
