import type { LLMProvider } from './types'

type SupportedProvider = 'anthropic' | 'google'

let _provider: LLMProvider | null = null

export function getLLMProvider(): LLMProvider {
  if (_provider) return _provider

  const providerName = (process.env.LLM_PROVIDER ?? 'anthropic') as SupportedProvider

  switch (providerName) {
    case 'anthropic': {
      const { AnthropicProvider } = require('./providers/anthropic')
      _provider = new AnthropicProvider()
      break
    }
    case 'google': {
      const { GoogleProvider } = require('./providers/google')
      _provider = new GoogleProvider()
      break
    }
    default:
      throw new Error(`Unsupported LLM_PROVIDER: "${providerName}". Use "anthropic" or "google".`)
  }

  return _provider!
}

export type { LLMProvider, Message, ToolDefinition, LLMResponse, ChatOptions } from './types'
