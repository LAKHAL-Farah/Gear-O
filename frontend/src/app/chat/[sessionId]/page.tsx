'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/store/sessionStore'
import { sendChat, getSessionInfo, APIError } from '@/lib/api'
import { ModCard } from '../../../components/ModCard'
import { BudgetStages } from '../../../components/BudgetStages'
import { ChatThread } from '../../../components/ChatThread'
import { BlueprintBackground } from '../../../components/BlueprintBackground'
import { AlertIcon, GearIcon, MessageIcon, TargetIcon } from '../../../components/MonoIcons'

export default function ChatPage() {
  const router = useRouter()
  const { sessionId, initialAdvice, messages, appendMessage, reset, isLoading, setLoading, carSpec } = useSession()
  const [input, setInput] = useState('')
  const [sessionTurns, setSessionTurns] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Redirect if no session
  useEffect(() => {
    if (!sessionId || !initialAdvice) {
      router.replace('/garage')
      return
    }

    // Verify session exists on backend
    const verifySession = async () => {
      try {
        const info = await getSessionInfo(sessionId)
        setSessionTurns(info.turns)
      } catch (e) {
        if (e instanceof APIError && e.code === 'SESSION_NOT_FOUND') {
          setError('Session expired. Starting a new build...')
          setTimeout(() => {
            reset()
            router.push('/garage')
          }, 2000)
        }
      }
    }

    verifySession()
  }, [sessionId, initialAdvice, router, reset])

  const sendFollowUp = async () => {
    if (!input.trim() || !sessionId) return

    const userMsg = input.trim()
    setInput('')
    setError(null)
    appendMessage({ role: 'user', content: userMsg, timestamp: Date.now() })
    setLoading(true)

    try {
      const res = await sendChat({
        car: '',
        goal: '',
        budget: '',
        follow_up: userMsg,
        session_id: sessionId,
      })
      appendMessage({
        role: 'mechanic',
        content: res.raw_feedback,
        timestamp: Date.now(),
      })
      setSessionTurns(prev => prev + 1)
    } catch (e) {
      // Remove the user message on error
      const newMessages = messages.filter(m => m.content !== userMsg)
      setInput(userMsg) // Put it back in input

      if (e instanceof APIError) {
        if (e.code === 'SESSION_NOT_FOUND') {
          setError('Session expired. Please start a new build.')
        } else if (e.code === 'TIMEOUT_ERROR') {
          setError('Request took too long. The mechanic is thinking very hard... try again.')
        } else {
          setError(e.message)
        }
      } else {
        setError('Failed to send message. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!initialAdvice) return null

  return (
    <div className='relative min-h-screen bg-dark flex flex-col overflow-hidden'>
      {/* Blueprint background */}
      <div className='fixed inset-0 z-0'>
        <BlueprintBackground />
      </div>

      {/* Content */}
      <div className='relative z-10 flex flex-col min-h-screen'>
        {/* Header */}
        <header className='sticky top-0 z-50 border-b border-purple-300/15 bg-black/70 backdrop-blur-xl'>
          <div className='flex items-center justify-between px-6 py-4 max-w-4xl mx-auto w-full'>
            <div className='flex-1 space-y-1'>
              <div className='flex items-center gap-2'>
                <GearIcon className='h-6 w-6 text-purple-100' />
                <h1 className='text-white font-bold text-lg'>AI <span className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 to-purple-300'>Mechanic</span></h1>
              </div>
              <p className='text-purple-100/70 text-xs font-semibold'>{carSpec}</p>
            </div>
            <div className='text-right space-y-1'>
              <div className='flex items-center justify-end gap-2'>
                <span className='text-purple-100/60 text-xs'>Turn</span>
                <span className='bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_18px_rgba(0,161,156,0.45)]'>
                  {sessionTurns}
                </span>
              </div>
              <button
                onClick={() => {
                  reset()
                  router.push('/garage')
                }}
                className='text-purple-300 hover:text-fuchsia-200 text-sm font-semibold transition-colors mt-1'
              >
                New Build →
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className='flex-1 overflow-y-auto px-4 py-6'>
          <div className='space-y-6 max-w-2xl mx-auto'>
            {/* Assessment banner */}
            {initialAdvice.assessment && (
              <div className='glass-card rounded-2xl p-5 animate-fade-in'>
                <p className='text-purple-200 font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-1.5'>
                  <TargetIcon className='h-4 w-4' />
                  Build Assessment
                </p>
                <p className='text-white mt-2 leading-relaxed'>{initialAdvice.assessment}</p>
              </div>
            )}

            {/* Mod list */}
            {initialAdvice.mods.length > 0 && (
              <div className='space-y-4 animate-slide-up'>
                <h2 className='text-white font-bold text-lg flex items-center gap-2'>
                  <GearIcon className='h-5 w-5 text-purple-200' />
                  Priority Mod List
                </h2>
                <div className='space-y-3'>
                  {initialAdvice.mods.map((mod, i) => (
                    <ModCard key={mod.name} mod={mod} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Budget stages */}
            {initialAdvice.raw_feedback && <BudgetStages raw={initialAdvice.raw_feedback} />}

            {/* Honest verdict */}
            {initialAdvice.verdict && (
              <div className='glass-card rounded-2xl p-5'>
                <p className='text-purple-200 font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-1.5'>
                  <MessageIcon className='h-4 w-4' />
                  Honest Verdict
                </p>
                <p className='text-white mt-2 leading-relaxed'>{initialAdvice.verdict}</p>
              </div>
            )}

            {/* Chat follow-ups */}
            <ChatThread messages={messages} isLoading={isLoading} />

            {/* Error message */}
            {error && (
              <div className='bg-red-950/35 border border-red-400/40 rounded-xl px-4 py-3 animate-slide-down backdrop-blur-sm'>
                <p className='text-red-300 text-sm font-semibold inline-flex items-center gap-1.5'>
                  <AlertIcon className='h-4 w-4' />
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sticky chat input */}
        <div className='border-t border-purple-300/15 px-4 py-4 bg-black/70 backdrop-blur-xl sticky bottom-0'>
          <div className='flex gap-2 max-w-2xl mx-auto'>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                  e.preventDefault()
                  sendFollowUp()
                }
              }}
              placeholder='Ask a follow-up — e.g. which should I do first with £500?'
              rows={2}
              disabled={isLoading}
              className='flex-1 bg-[#151515]/85 border border-purple-300/20 rounded-xl px-4 py-3
                text-white placeholder:text-purple-100/45 resize-none outline-none
                focus:border-purple-300/60 focus:bg-[#1f1f1f] focus:shadow-[0_0_28px_rgba(0,161,156,0.22)] disabled:opacity-50 disabled:cursor-not-allowed
                transition-all text-sm'
            />
            <button
              onClick={sendFollowUp}
              disabled={isLoading || !input.trim()}
              className={`
                px-5 py-3 rounded-lg font-bold transition-all duration-200
                flex items-center gap-2 whitespace-nowrap
                ${
                  isLoading || !input.trim()
                    ? 'bg-surface/30 text-muted cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/35 hover:scale-[1.02]'
                }
              `}
            >
              {isLoading ? (
                <>
                  <span className='w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  <span className='hidden sm:inline'>...</span>
                </>
              ) : (
                <>
                  <span className='hidden sm:inline'>Send</span>
                  <span className='sm:hidden'>→</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
