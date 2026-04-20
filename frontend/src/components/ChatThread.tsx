'use client'

import { useEffect, useRef } from 'react'
import type { ChatMessage } from '@/lib/types'
import { MessageIcon, WrenchIcon } from './MonoIcons'

export function ChatThread({
  messages,
  isLoading
}: {
  messages: ChatMessage[]
  isLoading: boolean
}) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='space-y-4'>
      {messages.length === 0 && (
        <div className='flex items-center justify-center gap-2 text-purple-100/60 text-sm italic py-8'>
          <MessageIcon className='h-4 w-4' />
          <p>No follow-up messages yet. Ask your mechanic a question!</p>
        </div>
      )}

      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
        >
          <div
            className={`
              max-w-xs rounded-2xl px-4 py-3 text-sm break-words backdrop-blur-sm
              border transition-all duration-200
              ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-br-sm border-purple-200/45 shadow-lg shadow-purple-500/25'
                  : 'bg-gradient-to-b from-[#1e1e1e]/85 to-[#111111]/85 text-white rounded-bl-sm border-purple-300/25 hover:border-purple-300/45'
              }
            `}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className='flex justify-start'>
          <div className='bg-gradient-to-b from-[#1e1e1e]/85 to-[#111111]/85 text-white rounded-2xl rounded-bl-sm px-4 py-3 border border-purple-300/25 backdrop-blur-sm'>
            <div className='flex gap-2 items-center'>
              <WrenchIcon className='h-4 w-4 text-purple-200' />
              <div className='flex gap-1.5'>
                <div className='w-2 h-2 bg-fuchsia-300 rounded-full animate-bounce' style={{ animationDelay: '0s' }} />
                <div className='w-2 h-2 bg-fuchsia-300 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }} />
                <div className='w-2 h-2 bg-fuchsia-300 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
