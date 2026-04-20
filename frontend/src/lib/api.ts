import type { ChatRequest, AdvisorResponse } from './types'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
const TIMEOUT = 60000 // 60 seconds

export class APIError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number
  ) {
    super(message)
    this.name = 'APIError'
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), ms)
    ),
  ])
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await withTimeout(
      fetch(`${BASE}/health`),
      5000
    )
    return res.ok
  } catch {
    return false
  }
}

export async function getSessionInfo(sessionId: string): Promise<{ turns: number; created_at?: string }> {
  try {
    const res = await withTimeout(
      fetch(`${BASE}/session/${sessionId}`),
      TIMEOUT
    )
    if (!res.ok) throw new APIError('Session not found', 'SESSION_NOT_FOUND', res.status)
    return res.json()
  } catch (e) {
    if (e instanceof APIError) throw e
    throw new APIError('Failed to fetch session info', 'FETCH_ERROR')
  }
}

export async function newSession(): Promise<string> {
  try {
    const res = await withTimeout(
      fetch(`${BASE}/new-session`, { method: 'POST' }),
      TIMEOUT
    )
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new APIError(err.detail ?? 'Failed to create session', 'SESSION_CREATE_ERROR', res.status)
    }
    const data = await res.json()
    return data.session_id as string
  } catch (e) {
    if (e instanceof APIError) throw e
    throw new APIError('Failed to create session', 'NETWORK_ERROR')
  }
}

export async function sendChat(req: ChatRequest): Promise<AdvisorResponse> {
  try {
    const res = await withTimeout(
      fetch(`${BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      }),
      TIMEOUT
    )
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      if (res.status === 422) {
        throw new APIError('Invalid input', 'VALIDATION_ERROR', 422)
      }
      throw new APIError(err.detail ?? 'Chat request failed', 'CHAT_ERROR', res.status)
    }
    return res.json() as Promise<AdvisorResponse>
  } catch (e) {
    if (e instanceof APIError) throw e
    if (e instanceof Error && e.message.includes('timeout')) {
      throw new APIError('Request took too long. Backend may be busy.', 'TIMEOUT_ERROR')
    }
    throw new APIError('Failed to send message', 'NETWORK_ERROR')
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  try {
    await withTimeout(
      fetch(`${BASE}/session/${sessionId}`, { method: 'DELETE' }),
      TIMEOUT
    )
  } catch (e) {
    console.error('Failed to delete session:', e)
    // Don't throw - deletion is non-critical
  }
}
