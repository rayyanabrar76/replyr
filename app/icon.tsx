import { ImageResponse } from 'next/og'

export const size = { width: 256, height: 256 }
export const contentType = 'image/png'

// Browser tab favicon — bold violet R monogram on a dark rounded square.
// Rendered once on the server, served as a PNG; consistent across browsers.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 30% 20%, #2a1a4a 0%, #1a1a1a 70%)',
          borderRadius: 56,
          position: 'relative',
        }}
      >
        {/* Main R glyph */}
        <span
          style={{
            fontSize: 220,
            fontWeight: 900,
            color: '#7c3aed',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.08em',
            lineHeight: 1,
            marginTop: -10,
            textShadow: '0 0 40px rgba(124,58,237,0.4)',
          }}
        >
          r
        </span>

        {/* Sparkle accent — top right */}
        <div
          style={{
            position: 'absolute',
            top: 36,
            right: 36,
            width: 28,
            height: 28,
            background: '#7c3aed',
            transform: 'rotate(45deg)',
            borderRadius: 4,
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 44,
            right: 44,
            width: 12,
            height: 12,
            background: '#1a1a1a',
            transform: 'rotate(45deg)',
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  )
}
