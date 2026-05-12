import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Replyr Pricing — $99/month, everything included'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
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
        <div
          style={{
            position: 'absolute',
            top: -150,
            left: -150,
            width: 600,
            height: 600,
            background:
              'radial-gradient(circle, rgba(124,58,237,0.4), rgba(124,58,237,0.06) 55%, transparent 80%)',
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
          <div style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em' }}>Replyr</div>
        </div>

        {/* Price */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 120,
              fontWeight: 500,
              letterSpacing: '-0.04em',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              color: '#fafafa',
            }}
          >
            $99
          </span>
          <span style={{ fontSize: 32, color: '#a3a3a3' }}>/month</span>
        </div>

        <div
          style={{
            fontSize: 28,
            color: '#a3a3a3',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Everything included. Unlimited leads. No contracts.
        </div>

        <div
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 16,
          }}
        >
          {['14-day free trial', 'No credit card', 'Cancel anytime'].map((item) => (
            <div
              key={item}
              style={{
                padding: '8px 16px',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 999,
                fontSize: 16,
                color: '#a3a3a3',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
