import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// iOS home screen icon. Apple recommends no transparency, slightly more
// padding than the favicon. Same R monogram, no sparkle (iOS auto-rounds).
export default function AppleIcon() {
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
        }}
      >
        <span
          style={{
            fontSize: 150,
            fontWeight: 900,
            color: '#7c3aed',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.08em',
            lineHeight: 1,
            marginTop: -8,
            textShadow: '0 0 30px rgba(124,58,237,0.5)',
          }}
        >
          r
        </span>
      </div>
    ),
    { ...size }
  )
}
