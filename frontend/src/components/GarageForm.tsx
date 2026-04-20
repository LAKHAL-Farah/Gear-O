'use client'

import { useState } from 'react'
import { AlertIcon, XIcon } from './MonoIcons'

type BuildStyle = 'street' | 'track' | 'drift' | 'show'

const GOALS: readonly BuildStyle[] = ['street', 'track', 'drift', 'show']

interface GarageFormProps {
  onSubmit: (car: string, goal: BuildStyle, budget: string) => void
  isLoading: boolean
  error?: string | null
}

export function GarageForm({ onSubmit, isLoading, error }: GarageFormProps) {
  const [car, setCar] = useState('')
  const [goal, setGoal] = useState<BuildStyle>('street')
  const [budget, setBudget] = useState('')
  const [touched, setTouched] = useState({ car: false, budget: false })

  const isValid = car.trim().length > 0 && budget.trim().length > 0
  const carError = touched.car && car.trim().length === 0
  const budgetError = touched.budget && budget.trim().length === 0

  const handleSubmit = () => {
    if (!isValid) {
      setTouched({ car: true, budget: true })
      return
    }
    onSubmit(car, goal, budget)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && isValid) {
      handleSubmit()
    }
  }

  return (
    <div className='w-full max-w-lg space-y-8 animate-slide-up'>
      {/* Header */}
      <div>
        <h1 className='text-5xl font-bold text-white mb-3'>
          Your <span className='text-accent'>Mechanic</span>
        </h1>
        <p className='text-muted text-lg'>Tell me about your car and I'll give you exactly what you need to modify.</p>
      </div>

      {/* Car input */}
      <div className='space-y-3'>
        <label className='text-sm font-semibold text-white block'>Your car</label>
        <div className='relative'>
          <input
            value={car}
            onChange={e => setCar(e.target.value)}
            onBlur={() => setTouched({ ...touched, car: true })}
            onKeyDown={handleKeyDown}
            placeholder='e.g. 2003 Subaru WRX, stock, 80k miles'
            disabled={isLoading}
            className={`w-full bg-surface border-2 rounded-lg px-4 py-3
              text-white placeholder:text-muted focus:outline-none
              disabled:opacity-50 disabled:cursor-not-allowed transition-all
              ${
                carError
                  ? 'border-danger focus:border-danger'
                  : 'border-card focus:border-accent'
              }`}
          />
          {carError && (
            <p className='text-danger text-xs mt-1 flex items-center gap-1'>
              <XIcon className='h-3.5 w-3.5' />
              Car details required
            </p>
          )}
        </div>
      </div>

      {/* Goal selector */}
      <div className='space-y-3'>
        <label className='text-sm font-semibold text-white block'>Build goal</label>
        <div className='grid grid-cols-2 gap-2 sm:flex sm:gap-2'>
          {GOALS.map(g => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              disabled={isLoading}
              className={`px-4 py-3 rounded-lg text-sm font-semibold capitalize
              transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              ${
                goal === g
                  ? 'bg-accent text-white shadow-lg scale-105'
                  : 'bg-surface text-muted border border-card hover:border-accent hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Budget input */}
      <div className='space-y-3'>
        <label className='text-sm font-semibold text-white block'>Budget</label>
        <div className='relative'>
          <span className='absolute left-4 top-3 text-muted text-lg'>£</span>
          <input
            value={budget}
            onChange={e => setBudget(e.target.value)}
            onBlur={() => setTouched({ ...touched, budget: true })}
            onKeyDown={handleKeyDown}
            placeholder='e.g. 3000'
            disabled={isLoading}
            className={`w-full bg-surface border-2 rounded-lg px-4 py-3 pl-8
              text-white placeholder:text-muted focus:outline-none
              disabled:opacity-50 disabled:cursor-not-allowed transition-all
              ${
                budgetError
                  ? 'border-danger focus:border-danger'
                  : 'border-card focus:border-accent'
              }`}
          />
          {budgetError && (
            <p className='text-danger text-xs mt-1 flex items-center gap-1'>
              <XIcon className='h-3.5 w-3.5' />
              Budget required
            </p>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className='bg-danger/20 border border-danger/40 rounded-lg px-4 py-3 animate-slide-down'>
          <p className='text-danger text-sm font-semibold inline-flex items-center gap-1.5'>
            <AlertIcon className='h-4 w-4' />
            {error}
          </p>
          <p className='text-danger/80 text-xs mt-1'>Make sure the backend is running on localhost:8000</p>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || !isValid}
        className={`w-full py-4 rounded-lg transition-all duration-200 text-lg font-bold
          disabled:cursor-not-allowed
          ${
            isLoading
              ? 'bg-accent/50 text-white'
              : isValid
                ? 'bg-accent hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-surface text-muted border border-card'
          }`}
      >
        {isLoading ? (
          <span className='flex items-center justify-center gap-2'>
            <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
            Consulting Mechanic...
          </span>
        ) : (
          'Ask your Mechanic →'
        )}
      </button>
    </div>
  )
}
