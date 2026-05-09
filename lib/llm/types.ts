export interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  // For role "tool": content must be JSON of { name: string; response: unknown }
}

export interface ToolDefinition {
  name: string
  description: string
  inputSchema: Record<string, unknown>
}

export interface ToolCall {
  id: string
  name: string
  input: Record<string, unknown>
}

export interface LLMResponse {
  content: string
  toolCalls?: ToolCall[]
  usage?: {
    inputTokens: number
    outputTokens: number
  }
}

export interface ChatOptions {
  model?: string
  maxTokens?: number
  temperature?: number
  systemPrompt?: string
}

export interface LLMProvider {
  chat(messages: Message[], options?: ChatOptions): Promise<LLMResponse>
  chatWithTools(
    messages: Message[],
    tools: ToolDefinition[],
    options?: ChatOptions
  ): Promise<LLMResponse>
  streamChat(messages: Message[], options?: ChatOptions): AsyncIterable<string>
}
