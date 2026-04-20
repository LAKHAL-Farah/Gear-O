'use client'

import { useState } from 'react'
import { BrandSelector } from './BrandSelector'
import { type GarageBuildStep, YEARS, CAR_CONDITIONS } from '@/lib/brands'
import {
  AlertIcon,
  CalendarIcon,
  CarIcon,
  CoinIcon,
  GearIcon,
  PoundIcon,
  TagIcon,
  TargetIcon,
  WrenchIcon,
} from './MonoIcons'

interface GarageFormWizardProps {
  onSubmit: (car: string, goal: 'street' | 'track' | 'drift' | 'show', budget: string) => void
  isLoading: boolean
  error?: string | null
}

const GOALS = ['street', 'track', 'drift', 'show'] as const

const STEP_TITLES = {
  brand: 'Select Your Car Brand',
  year: 'What Year?',
  model: 'Model Name',
  condition: 'Current Condition',
  goal: 'Build Goal',
  budget: 'Budget',
}

const STEP_ICONS = {
  brand: TagIcon,
  year: CalendarIcon,
  model: CarIcon,
  condition: WrenchIcon,
  goal: TargetIcon,
  budget: CoinIcon,
}

type FormStep = keyof typeof STEP_TITLES

const STEPS: FormStep[] = ['brand', 'year', 'model', 'condition', 'goal', 'budget']

export function GarageFormWizard({ onSubmit, isLoading, error }: GarageFormWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [data, setData] = useState<GarageBuildStep>({})

  const step = STEPS[currentStep] as FormStep
  const StepIcon = STEP_ICONS[step]
  const progress = ((currentStep + 1) / STEPS.length) * 100
  const isLastStep = currentStep === STEPS.length - 1

  const handleNext = () => {
    if (isLastStep) {
      // Submit
      const carSpec = `${data.year || ''} ${data.brand || ''} ${data.model || ''} (${data.condition || 'Unknown'})`.trim()
      onSubmit(
        carSpec,
        (data.goal as 'street' | 'track' | 'drift' | 'show') || 'street',
        data.budget || '0',
      )
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 'brand':
        return !!data.brand
      case 'year':
        return !!data.year
      case 'model':
        return !!data.model?.trim()
      case 'condition':
        return !!data.condition
      case 'goal':
        return !!data.goal
      case 'budget':
        return !!data.budget?.trim()
      default:
        return false
    }
  }

  return (
    <div className='w-full max-w-6xl mx-auto rounded-3xl glass-card p-6 md:p-10 space-y-8'>
      {/* Header with Avatar */}
      <div className='text-center space-y-3'>
        <div className='flex items-center justify-center'>
          <div className='relative'>
            {/* Glow background */}
            <div className='absolute inset-0 bg-gradient-to-r from-[#003735] via-[#00514e] to-[#00A19C] rounded-full blur-2xl opacity-60 animate-pulse' />

            {/* Avatar */}
            <div className='relative w-20 h-20 bg-gradient-to-br from-[#003735] to-[#00A19C] rounded-full flex items-center justify-center border-2 border-[#C6C6C6]/80 shadow-lg shadow-[0_0_24px_rgba(0,161,156,0.32)]'>
              <GearIcon className='h-10 w-10 text-white' />
            </div>
          </div>
        </div>

        <div>
          <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C6C6C6] via-white to-[#00A19C]'>
            Gear-o
          </h1>
          <p className='text-[#C6C6C6]/80 text-sm'>Your AI Mechanic Awaits</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className='space-y-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xs font-semibold text-purple-300 uppercase tracking-wider'>
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <span className='text-xs text-purple-200/70'>{Math.round(progress)}%</span>
        </div>
        <div className='h-1.5 bg-purple-950/70 rounded-full overflow-hidden border border-purple-400/20'>
          <div
            className='h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-400 transition-all duration-500'
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className='space-y-6'>
        {/* Title */}
        <div className='text-center space-y-2'>
          <p className='flex justify-center text-[#DDEEEE] drop-shadow-[0_0_16px_rgba(0,161,156,0.5)]'>
            <StepIcon className='h-10 w-10' />
          </p>
          <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E8E8E8] to-[#C6C6C6]'>
            {STEP_TITLES[step]}
          </h2>
        </div>

        {/* Step-specific content */}
        <div className='space-y-4'>
          {step === 'brand' && (
            <BrandSelector
              selected={data.brand}
              onSelect={brand => setData({ ...data, brand })}
            />
          )}

          {step === 'year' && (
            <div className='rounded-2xl border border-purple-400/25 bg-purple-950/30 p-5'>
              <label className='text-sm font-semibold text-purple-100 block mb-3'>Year</label>
              <select
                value={data.year || ''}
                onChange={e => setData({ ...data, year: e.target.value })}
                className='w-full bg-[#151515]/85 border border-purple-300/30 rounded-xl px-4 py-3
                  text-white placeholder:text-purple-200/40 focus:border-purple-300 focus:shadow-[0_0_24px_rgba(0,161,156,0.2)] outline-none
                  transition-all'
              >
                <option value=''>Select year</option>
                {YEARS.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}

          {step === 'model' && (
            <div className='rounded-2xl border border-purple-400/25 bg-purple-950/30 p-5'>
              <label className='text-sm font-semibold text-purple-100 block mb-3'>Model</label>
              <input
                type='text'
                value={data.model || ''}
                onChange={e => setData({ ...data, model: e.target.value })}
                placeholder='e.g. WRX STI, M3, Civic Type R'
                className='w-full bg-[#151515]/85 border border-purple-300/30 rounded-xl px-4 py-3
                  text-white placeholder:text-purple-200/40 focus:border-purple-300 focus:shadow-[0_0_24px_rgba(0,161,156,0.2)] outline-none
                  transition-all'
              />
            </div>
          )}

          {step === 'condition' && (
            <div className='grid grid-cols-2 gap-3'>
              {CAR_CONDITIONS.map(condition => (
                <button
                  key={condition}
                  onClick={() => setData({ ...data, condition })}
                  className={`
                    p-4 rounded-2xl border transition-all duration-200 backdrop-blur-sm
                    ${
                      data.condition === condition
                          ? 'border-purple-300/80 bg-gradient-to-br from-purple-500/40 to-fuchsia-500/30 text-white shadow-[0_0_24px_rgba(0,161,156,0.3)]'
                        : 'border-purple-400/20 bg-purple-950/30 hover:border-purple-300/50 hover:bg-purple-900/35'
                    }
                  `}
                >
                  <p className='font-semibold text-sm'>{condition}</p>
                </button>
              ))}
            </div>
          )}

          {step === 'goal' && (
            <div className='grid grid-cols-2 gap-3'>
              {GOALS.map(goal => (
                <button
                  key={goal}
                  onClick={() => setData({ ...data, goal })}
                  className={`
                    p-4 rounded-2xl border transition-all duration-200 uppercase text-sm font-bold backdrop-blur-sm
                    ${
                      data.goal === goal
                          ? 'border-purple-300/80 bg-gradient-to-br from-purple-500/40 to-fuchsia-500/30 text-purple-100 shadow-[0_0_24px_rgba(0,161,156,0.3)]'
                        : 'border-purple-400/20 text-purple-200/70 bg-purple-950/30 hover:border-purple-300/50 hover:text-white'
                    }
                  `}
                >
                  {goal}
                </button>
              ))}
            </div>
          )}

          {step === 'budget' && (
            <div className='rounded-2xl border border-purple-400/25 bg-purple-950/30 p-5'>
              <label className='text-sm font-semibold text-purple-100 block mb-3'>Budget</label>
              <div className='relative'>
                <span className='absolute left-4 top-3 text-purple-100/70'>
                  <PoundIcon className='h-6 w-6' />
                </span>
                <input
                  type='number'
                  value={data.budget || ''}
                  onChange={e => setData({ ...data, budget: e.target.value })}
                  placeholder='e.g. 5000'
                  className='w-full bg-[#151515]/85 border border-purple-300/30 rounded-xl px-4 py-3 pl-12
                    text-white placeholder:text-purple-200/40 focus:border-purple-300 focus:shadow-[0_0_24px_rgba(0,161,156,0.2)] outline-none
                    transition-all'
                />
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className='bg-red-900/20 border border-red-400/40 rounded-xl px-4 py-3'>
            <p className='text-red-300 text-sm font-semibold inline-flex items-center gap-1.5'>
              <AlertIcon className='h-4 w-4' />
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className='flex gap-3 pt-4'>
        <button
          onClick={handleBack}
          disabled={currentStep === 0 || isLoading}
          className='px-6 py-3 rounded-xl border border-purple-300/30 text-purple-200/70 bg-purple-950/35
            hover:border-purple-300/60 hover:text-white disabled:opacity-50
            transition-all duration-200 font-semibold'
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          disabled={!isStepValid() || isLoading}
          className={`
            flex-1 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-200
            flex items-center justify-center gap-2
            ${
              !isStepValid() || isLoading
                ? 'bg-surface/30 text-muted cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 text-white hover:shadow-lg hover:shadow-[0_0_28px_rgba(0,161,156,0.35)] hover:scale-[1.02]'
            }
          `}
        >
          {isLoading ? (
            <>
              <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              Consulting...
            </>
          ) : isLastStep ? (
            <>
              Ask Mechanic →
            </>
          ) : (
            <>
              Next →
            </>
          )}
        </button>
      </div>
    </div>
  )
}
