import { getLLMProvider } from '@/lib/llm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { messages } = await request.json()

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'messages array is required' }, { status: 400 })
  }

  const llm = getLLMProvider()
  const response = await llm.chat(messages)

  return NextResponse.json(response)
}
