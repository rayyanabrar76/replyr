import { ImageResponse } from 'next/og'
import { COMPETITORS } from './compare-data'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ competitor: string }>
}

export default async function OpenGraphImage({ params }: Props) {
  const { competitor } = await params
  const data = COMPETITORS[competitor]
  const competitorName = data?.name ?? 'Competitor'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#252525',
          color: '#fafafa',
          fontFamily: '"Inter", system-ui, sans-serif',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            background:
              'radial-gradient(circle, rgba(124,58,237,0.35), rgba(124,58,237,0.05) 60%, transparent 80%)',
          }}
        />

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#7c3aed',
              boxShadow: '0 0 18px rgba(124,58,237,0.7)',
            }}
          />
          <div style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em' }}>Replyr</div>
        </div>

        {/* Tag */}
        <div
          style={{
            display: 'flex',
            padding: '6px 14px',
            border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: 999,
            background: 'rgba(124,58,237,0.12)',
            color: '#a78bfa',
            fontSize: 16,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            marginBottom: 28,
          }}
        >
          Comparison
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          Replyr vs. {competitorName}
        </div>

        <div
          style={{
            fontSize: 24,
            color: '#a3a3a3',
            marginTop: 28,
            lineHeight: 1.4,
          }}
        >
          Purpose-built for home services contractors · $99/mo
        </div>
      </div>
    ),
    { ...size }
  )
}
