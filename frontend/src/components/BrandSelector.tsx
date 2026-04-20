'use client'

import { CAR_BRANDS, type CarBrand } from '@/lib/brands'
import Image from 'next/image'
import { useState } from 'react'

const DARK_BRANDS = new Set(['Nissan', 'Mini', 'Audi'])

interface BrandSelectorProps {
  selected?: CarBrand
  onSelect: (brand: CarBrand) => void
}

export function BrandSelector({ selected, onSelect }: BrandSelectorProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredBrand, setHoveredBrand] = useState<CarBrand | null>(null)

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    brand: CarBrand
  ) => {
    if (brand !== hoveredBrand) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePos({ x, y })
  }

  return (
    <div className='space-y-4 my-6'>
      <h3 className='text-sm font-semibold text-[#C6C6C6] uppercase tracking-[0.22em]'>
        Select Brand
      </h3>
      <div className='flex justify-center w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 px-0 w-full max-w-5xl'>
          {CAR_BRANDS.map(brand => (
            <button
              key={brand}
              onClick={() => onSelect(brand)}
              onMouseMove={e => handleMouseMove(e, brand)}
              onMouseEnter={() => setHoveredBrand(brand)}
              onMouseLeave={() => setHoveredBrand(null)}
              className={`
                relative p-5 rounded-2xl transition-all duration-300 overflow-hidden
                h-24 flex items-center justify-center border
                ${
                  selected === brand
                    ? 'border-[#C6C6C6]/70 bg-gradient-to-r from-[#003735]/50 to-[#00A19C]/35 shadow-[0_0_28px_rgba(0,161,156,0.28)]'
                    : 'border-[#C6C6C6]/20 bg-gradient-to-b from-[#171717]/90 to-[#111111]/90 hover:border-[#C6C6C6]/55'
                }
              `}
            >
              {/* Dynamic glow following mouse on hover */}
              {hoveredBrand === brand && (
                <div
                  className='absolute w-36 h-36 rounded-full blur-3xl opacity-40 transition-all duration-75 pointer-events-none'
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 161, 156, 0.85), transparent)',
                    left: `${mousePos.x - 72}px`,
                    top: `${mousePos.y - 72}px`,
                  }}
                />
              )}

              {/* Selected animated gradient background */}
              {selected === brand && (
                <div className='absolute inset-0 bg-gradient-to-r from-[#003735]/72 via-[#00514E]/72 to-[#00A19C]/60 rounded-2xl opacity-35 animate-shimmer' />
              )}

              {/* Logo */}
              <div className='relative z-10 flex items-center justify-center'>
                <Image
                  src={`/Car/${brand}.svg`}
                  alt={brand}
                  width={80}
                  height={80}
                  className={`
                    w-20 h-20 object-contain transition-all duration-300
                    ${selected === brand ? 'scale-125 drop-shadow-[0_0_18px_rgba(0,161,156,0.65)]' : 'scale-100 opacity-85 hover:opacity-100'}
                  `}
                  style={
                    DARK_BRANDS.has(brand)
                      ? { filter: 'brightness(0) invert(1)' }
                      : undefined
                  }
                />
              </div>

              {/* Animated border glow when selected */}
              {selected === brand && (
                <div className='absolute inset-0 rounded-2xl border border-[#C6C6C6]/80 opacity-100 animate-pulse' />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
