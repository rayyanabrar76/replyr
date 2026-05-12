import { ImageResponse } from 'next/og'
import { VERTICALS } from './vertical-data'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ vertical: string }>
}

export default async function OpenGraphImage({ params }: Props) {
  const { vertical } = await params
  const data = VERTICALS[vertical]
  const displayName = data?.displayName ?? 'Contractors'
  const headline = data ? `AI Lead Response\nfor ${displayName}` : 'AI Lead Response\nfor Contractors'

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
            top: -150,
            right: -150,
            width: 600,
            height: 600,
            background:
              'radial-gradient(circle, rgba(124,58,237,0.4), rgba(124,58,237,0.06) 60%, transparent 80%)',
          }}
        />

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#7c3aed',
              boxShadow: '0 0 18px rgba(124,58,237,0.7)',
            }}
          />
          <div style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em', color: '#fafafa' }}>
            Replyr
          </div>
        </div>

        {/* Vertical tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '6px 14px',
            border: '1px solid rgba(124,58,237,0.5)',
            borderRadius: 999,
            background: 'rgba(124,58,237,0.15)',
            color: '#a78bfa',
            fontSize: 16,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            marginBottom: 32,
          }}
        >
          {displayName}
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            maxWidth: 900,
            color: '#fafafa',
          }}
        >
          {headline}
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 24,
            color: '#a3a3a3',
            marginTop: 28,
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          30-second replies · Google Calendar booking · $99/mo
        </div>
      </div>
    ),
    { ...size }
  )
}
