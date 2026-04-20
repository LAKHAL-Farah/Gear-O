'use client'

import { BlueprintBackground } from './BlueprintBackground'
import { GearIcon } from './MonoIcons'

export function LoadingMechanic({ message = 'Your mechanic is thinking...' }: { message?: string } = {}) {
  return (
    <div className='relative min-h-screen bg-dark flex flex-col items-center justify-center gap-8 p-6 overflow-hidden'>
      {/* Blueprint background */}
      <BlueprintBackground />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center gap-8'>
        {/* Animated spinning gear with glow */}
        <div className='relative'>
          {/* Outer glow */}
          <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-700 blur-2xl opacity-50 animate-pulse' />

          {/* SVG spinner */}
          <svg
            viewBox='0 0 80 80'
            className='w-24 h-24 relative z-10'
            style={{
              animation: 'spin 3s linear infinite',
            }}
          >
            {/* Outer ring with gradient effect */}
            <defs>
              <linearGradient id='spinnerGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='#C6C6C6' />
                <stop offset='50%' stopColor='#00A19C' />
                <stop offset='100%' stopColor='#003735' />
              </linearGradient>
            </defs>

            <circle
              cx='40'
              cy='40'
              r='34'
              stroke='url(#spinnerGradient)'
              strokeWidth='3'
              fill='none'
              strokeDasharray='80 130'
              opacity='0.9'
            />

            {/* Inner circle */}
            <circle cx='40' cy='40' r='22' stroke='#313131' strokeWidth='2' fill='#151515' opacity='0.85' />

            {/* Center dot with glow */}
            <circle cx='40' cy='40' r='4' fill='#00A19C' />

            {/* Needle */}
            <line
              x1='40'
              y1='40'
              x2='40'
              y2='12'
              stroke='#00A19C'
              strokeWidth='2.5'
              strokeLinecap='round'
              opacity='0.9'
            />

            {/* Speed marks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
              const rad = (angle * Math.PI) / 180
              const x1 = 40 + 28 * Math.cos(rad)
              const y1 = 40 + 28 * Math.sin(rad)
              const x2 = 40 + 32 * Math.cos(rad)
              const y2 = 40 + 32 * Math.sin(rad)
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke='#00514E'
                  strokeWidth='1'
                  opacity='0.6'
                />
              )
            })}
          </svg>
        </div>

        {/* Status text with gradient */}
        <div className='text-center space-y-3'>
          <p className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-purple-200 to-purple-300 font-bold text-lg'>
            {message}
          </p>
          <p className='text-purple-100/60 text-sm'>This may take a moment...</p>
        </div>

        {/* Animated dots */}
        <div className='flex gap-3'>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className='w-3 h-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full shadow-lg shadow-purple-500/60'
              style={{
                animation: `pulse-dot 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Bottom indicator text */}
        <div className='text-xs text-purple-100/55 tracking-widest uppercase font-semibold inline-flex items-center gap-1.5'>
          <GearIcon className='h-3.5 w-3.5' />
          Processing...
        </div>
      </div>
    </div>
  )
}