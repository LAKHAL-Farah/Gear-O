'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/garage')
  }, [router])

  return (
    <div className='min-h-screen bg-dark flex items-center justify-center'>
      <div className='text-center glass-card rounded-2xl px-8 py-6'>
        <p className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 to-purple-300 text-lg font-semibold'>
          Loading...
        </p>
      </div>
    </div>
  )
}
