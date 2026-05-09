import Anthropic from '@anthropic-ai/sdk'
import type { ChatOptions, LLMProvider, LLMResponse, Message, ToolDefinition } from '../types'

const DEFAULT_MODEL = 'claude-sonnet-4-6'
const DEFAULT_MAX_TOKENS = 4096

function toAnthropicMessages(
  messages: Message[]
): Anthropic.Messages.MessageParam[] {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
}

function extractSystem(messages: Message[], options?: ChatOptions): string | undefined {
  const systemMsg = messages.find((m) => m.role === 'system')
  return options?.systemPrompt ?? systemMsg?.content
}

export class AnthropicProvider implements LLMProvider {
  private client: Anthropic

  constructor() {
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }

  async chat(messages: Message[], options?: ChatOptions): Promise<LLMResponse> {
    const response = await this.client.messages.create({
      model: options?.model ?? DEFAULT_MODEL,
      max_tokens: options?.maxTokens ?? DEFAULT_MAX_TOKENS,
      system: extractSystem(messages, options),
      messages: toAnthropicMessages(messages),
    })

    const content =
      response.content.find((b) => b.type === 'text')?.text ?? ''

    return {
      content,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    }
  }

  async chatWithTools(
    messages: Message[],
    tools: ToolDefinition[],
    options?: ChatOptions
  ): Promise<LLMResponse> {
    const anthropicTools: Anthropic.Messages.Tool[] = tools.map((t) => ({
      name: t.name,
      description: t.description,
      input_schema: t.inputSchema as Anthropic.Messages.Tool['input_schema'],
    }))

    const response = await this.client.messages.create({
      model: options?.model ?? DEFAULT_MODEL,
      max_tokens: options?.maxTokens ?? DEFAULT_MAX_TOKENS,
      system: extractSystem(messages, options),
      messages: toAnthropicMessages(messages),
      tools: anthropicTools,
    })

    const textContent = response.content.find((b) => b.type === 'text')?.text ?? ''
    const toolUseBlocks = response.content.filter(
      (b): b is Anthropic.Messages.ToolUseBlock => b.type === 'tool_use'
    )

    return {
      content: textContent,
      toolCalls: toolUseBlocks.map((b) => ({
        id: b.id,
        name: b.name,
        input: b.input as Record<string, unknown>,
      })),
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    }
  }

  async *streamChat(messages: Message[], options?: ChatOptions): AsyncIterable<string> {
    const stream = await this.client.messages.stream({
      model: options?.model ?? DEFAULT_MODEL,
      max_tokens: options?.maxTokens ?? DEFAULT_MAX_TOKENS,
      system: extractSystem(messages, options),
      messages: toAnthropicMessages(messages),
    })

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        yield chunk.delta.text
      }
    }
  }
}
