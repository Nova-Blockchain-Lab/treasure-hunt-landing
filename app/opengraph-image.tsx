import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Treasure Hunt — Interactive Event Engagement Game'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
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
          backgroundColor: '#06080F',
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(88,166,255,0.08), transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 700,
            color: '#E6EDF3',
            letterSpacing: '0.04em',
            marginBottom: 16,
          }}
        >
          TREASURE HUNT
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#8B949E',
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Turn your event into an adventure attendees talk about
        </div>
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 40,
          }}
        >
          {['QR & NFC Checkpoints', 'Live Leaderboard', 'Real-Time Analytics'].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  padding: '10px 24px',
                  borderRadius: 8,
                  border: '1px solid rgba(88,166,255,0.25)',
                  color: '#58A6FF',
                  fontSize: 18,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 40,
            color: '#484F58',
            fontSize: 16,
            letterSpacing: '0.1em',
          }}
        >
          www.treasurehunt.pt
        </div>
      </div>
    ),
    { ...size }
  )
}
