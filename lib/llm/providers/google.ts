import { GoogleGenAI, type FunctionDeclaration } from '@google/genai'
import type { ChatOptions, LLMProvider, LLMResponse, Message, ToolDefinition } from '../types'

const DEFAULT_MODEL = 'gemini-3-flash-preview'

// ---------- message mapping ----------

type GeminiRole = 'user' | 'model' | 'function'

interface GeminiContent {
  role: GeminiRole
  parts: Record<string, unknown>[]
}

function toGeminiContents(messages: Message[]): GeminiContent[] {
  return messages
    .filter((m) => m.role !== 'system')
    .map((m): GeminiContent => {
      if (m.role === 'tool') {
        // content must be JSON: { name: string; response: unknown }
        let parsed: { name: string; response: unknown }
        try {
          parsed = JSON.parse(m.content)
        } catch {
          parsed = { name: 'unknown', response: m.content }
        }
        return {
          role: 'function',
          parts: [{ functionResponse: { name: parsed.name, response: parsed.response } }],
        }
      }
      return {
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }
    })
}

function extractSystem(messages: Message[], options?: ChatOptions): string | undefined {
  const systemMsg = messages.find((m) => m.role === 'system')
  return options?.systemPrompt ?? systemMsg?.content
}

// Build the shared config block, omitting undefined keys
function baseConfig(options?: ChatOptions, systemInstruction?: string) {
  return {
    ...(systemInstruction ? { systemInstruction } : {}),
    ...(options?.maxTokens !== undefined ? { maxOutputTokens: options.maxTokens } : {}),
    ...(options?.temperature !== undefined ? { temperature: options.temperature } : {}),
  }
}

// ---------- provider ----------

export class GoogleProvider implements LLMProvider {
  private client: GoogleGenAI

  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) throw new Error('GOOGLE_API_KEY environment variable is not set')
    this.client = new GoogleGenAI({ apiKey })
  }

  async chat(messages: Message[], options?: ChatOptions): Promise<LLMResponse> {
    const response = await this.client.models.generateContent({
      model: options?.model ?? DEFAULT_MODEL,
      contents: toGeminiContents(messages),
      config: baseConfig(options, extractSystem(messages, options)),
    })

    return {
      content: response.text ?? '',
      usage: {
        inputTokens: response.usageMetadata?.promptTokenCount ?? 0,
        outputTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
      },
    }
  }

  async chatWithTools(
    messages: Message[],
    tools: ToolDefinition[],
    options?: ChatOptions
  ): Promise<LLMResponse> {
    const functionDeclarations: FunctionDeclaration[] = tools.map((t) => ({
      name: t.name,
      description: t.description,
      parametersJsonSchema: t.inputSchema,
    }))

    const response = await this.client.models.generateContent({
      model: options?.model ?? DEFAULT_MODEL,
      contents: toGeminiContents(messages),
      config: {
        ...baseConfig(options, extractSystem(messages, options)),
        tools: [{ functionDeclarations }],
      },
    })

    return {
      content: response.text ?? '',
      toolCalls: (response.functionCalls ?? []).map((fc) => ({
        id: fc.id ?? fc.name ?? crypto.randomUUID(),
        name: fc.name ?? '',
        input: (fc.args ?? {}) as Record<string, unknown>,
      })),
      usage: {
        inputTokens: response.usageMetadata?.promptTokenCount ?? 0,
        outputTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
      },
    }
  }

  async *streamChat(messages: Message[], options?: ChatOptions): AsyncIterable<string> {
    const stream = await this.client.models.generateContentStream({
      model: options?.model ?? DEFAULT_MODEL,
      contents: toGeminiContents(messages),
      config: baseConfig(options, extractSystem(messages, options)),
    })

    for await (const chunk of stream) {
      if (chunk.text) yield chunk.text
    }
  }
}
