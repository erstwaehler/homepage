'use client'

import { useEffect, useState } from 'react'
import * as m from '@/paraglide/messages'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const eventDate = new Date('2026-06-02T08:00:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      <TimeUnit value={timeLeft.days} label={m.countdown_days()} />
      <TimeUnit value={timeLeft.hours} label={m.countdown_hours()} />
      <TimeUnit value={timeLeft.minutes} label={m.countdown_minutes()} />
      <TimeUnit value={timeLeft.seconds} label={m.countdown_seconds()} />
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[80px]">
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <div className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="text-sm text-muted-foreground mt-2 font-medium">{label}</div>
    </div>
  )
}
