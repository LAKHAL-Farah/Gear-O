'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { newSession, sendChat, healthCheck, APIError } from '@/lib/api'
import { useSession } from '@/store/sessionStore'
import { LoadingMechanic } from '@/components/LoadingMechanic'
import { GarageFormWizard } from '@/components/GarageFormWizard'
import { BlueprintBackground } from '@/components/BlueprintBackground'
import type { BuildStyle } from '@/lib/types'
import { PlugIcon, RefreshIcon } from '@/components/MonoIcons'

export default function GaragePage() {
  const router = useRouter()
  const { setSession, isLoading, setLoading } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [isHealthy, setIsHealthy] = useState(true)
  const [checkingHealth, setCheckingHealth] = useState(true)

  // Check backend health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const healthy = await healthCheck()
        setIsHealthy(healthy)
        if (!healthy) {
          setError('Backend is not responding. Please ensure it\'s running on localhost:8000')
        }
      } finally {
        setCheckingHealth(false)
      }
    }

    checkHealth()
  }, [])

  const handleSubmit = async (car: string, goal: BuildStyle, budget: string) => {
    // Check health before submitting
    const healthy = await healthCheck()
    if (!healthy) {
      setError('Backend connection lost. Please check if the server is running.')
      setIsHealthy(false)
      return
    }

    setError(null)
    setIsHealthy(true)
    setLoading(true)

    try {
      const sid = await newSession()
      const advice = await sendChat({
        car,
        goal,
        budget,
        session_id: sid,
        build_style: goal,
      })
      setSession(sid, car, advice)
      router.push(`/chat/${sid}`)
    } catch (e) {
      if (e instanceof APIError) {
        if (e.code === 'NETWORK_ERROR' || e.code === 'TIMEOUT_ERROR') {
          setError('Backend is not responding. Please ensure it\'s running on localhost:8000')
          setIsHealthy(false)
        } else if (e.code === 'VALIDATION_ERROR') {
          setError('Invalid input. Please check your car details and budget.')
        } else {
          setError(e.message)
        }
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (checkingHealth) {
    return <LoadingMechanic message='Connecting to backend...' />
  }

  if (isLoading) return <LoadingMechanic />

  return (
    <main className='relative min-h-screen bg-dark flex items-center justify-center p-4 md:p-8'>
      {/* Blueprint background */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        <BlueprintBackground />
      </div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center gap-8 w-full max-w-7xl'>
        <GarageFormWizard onSubmit={handleSubmit} isLoading={isLoading} error={error} />

        {!isHealthy && (
          <div className='mt-6 w-full max-w-lg'>
            <div className='glass-card rounded-xl px-4 py-3 text-center border-red-400/35'>
              <p className='text-red-300 text-sm font-semibold inline-flex items-center justify-center gap-1.5'>
                <PlugIcon className='h-4 w-4' />
                Connecting to backend...
              </p>
              <p className='text-[#C6C6C6]/75 text-xs mt-1'>
                Ensure backend is running on <code className='bg-black/40 px-2 py-1 rounded text-[#00A19C]'>localhost:8000</code>
              </p>
              <button
                onClick={async () => {
                  setCheckingHealth(true)
                  const healthy = await healthCheck()
                  setIsHealthy(healthy)
                  setCheckingHealth(false)
                  if (healthy) setError(null)
                }}
                className='mt-3 text-[#00A19C] hover:text-[#7FD8D5] text-sm font-semibold transition-colors'
              >
                <span className='inline-flex items-center gap-1'>
                  <RefreshIcon className='h-4 w-4' />
                  Retry connection
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}