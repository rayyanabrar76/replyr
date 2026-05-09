'use client'

// global-error.tsx replaces the root layout when a top-level error occurs.
// Must include its own <html> and <body>.

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: '#252525',
          color: '#fafafa',
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <p
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#f87171',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              margin: 0,
            }}
          >
            Critical error
          </p>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              marginTop: 12,
            }}
          >
            Something went very wrong.
          </h1>
          <p style={{ color: '#a3a3a3', marginTop: 16, lineHeight: 1.6 }}>
            We&apos;ve been notified. Try reloading — if the issue persists, head home.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 32,
              padding: '10px 20px',
              background: '#7c3aed',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  )
}
