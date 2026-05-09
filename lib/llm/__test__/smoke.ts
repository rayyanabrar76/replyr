/**
 * Quick smoke test for the LLM provider layer.
 * Run: npm run test:llm
 * Switch providers: LLM_PROVIDER=google npm run test:llm
 */
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { getLLMProvider } from '../index'

async function main() {
  const providerName = process.env.LLM_PROVIDER ?? 'anthropic'
  console.log(`Provider : ${providerName}`)

  const llm = getLLMProvider()

  // ── basic chat ──────────────────────────────────────────────────────────────
  console.log('\n[chat]')
  const chatRes = await llm.chat([{ role: 'user', content: 'Say hello in 5 words' }])
  console.log('Response:', chatRes.content)
  if (chatRes.usage) {
    console.log(`Tokens  : ${chatRes.usage.inputTokens} in / ${chatRes.usage.outputTokens} out`)
  }

  // ── streaming ───────────────────────────────────────────────────────────────
  console.log('\n[streamChat] streaming: ')
  process.stdout.write('  ')
  for await (const chunk of llm.streamChat([
    { role: 'user', content: 'Count to 3, one word each, comma separated' },
  ])) {
    process.stdout.write(chunk)
  }
  console.log()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
