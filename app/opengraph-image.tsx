import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Replyr — Never miss another lead'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#252525',
          color: '#fafafa',
          fontFamily: '"Inter", system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Violet glow top-left */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            background:
              'radial-gradient(circle, rgba(124,58,237,0.45), rgba(124,58,237,0.08) 50%, transparent 75%)',
          }}
        />
        {/* Violet glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            right: -200,
            width: 700,
            height: 700,
            background:
              'radial-gradient(circle, rgba(124,58,237,0.35), rgba(124,58,237,0.06) 50%, transparent 75%)',
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 56,
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#7c3aed',
              boxShadow: '0 0 24px rgba(124,58,237,0.7)',
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em' }}>Replyr</div>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 100,
            fontWeight: 500,
            letterSpacing: '-0.04em',
            margin: 0,
            lineHeight: 1.05,
            zIndex: 10,
            textAlign: 'center',
            maxWidth: 1000,
          }}
        >
          Never miss another lead.
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontSize: 28,
            color: '#a3a3a3',
            marginTop: 36,
            maxWidth: 820,
            textAlign: 'center',
            lineHeight: 1.4,
            zIndex: 10,
          }}
        >
          AI lead-response agent for home services contractors
        </p>

        {/* Bottom mono pill */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 16px',
            border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: 999,
            background: 'rgba(124,58,237,0.12)',
            color: '#a78bfa',
            fontSize: 18,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            zIndex: 10,
          }}
        >
          Built for HVAC · Plumbing · Roofing · Electrical
        </div>
      </div>
    ),
    { ...size }
  )
}
