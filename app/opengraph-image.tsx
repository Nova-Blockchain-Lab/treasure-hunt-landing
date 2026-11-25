import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

// No `runtime = 'edge'`: it served HTTP 500 on Vercel (see CLAUDE.md, Static SSG).
// This renders once at build time, so the files below are read from the repo.
// Every page points at this image through OG_IMAGE in lib/og-image.ts: bump its
// ?v= whenever this file changes, or X and LinkedIn keep the old card.

export const alt =
  'Treasure Hunt: an NFC and QR scavenger hunt for events. A visitor taps a Treasure Hunt poster with a phone.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const file = (path: string) => readFile(join(process.cwd(), path))

// Figures from TREASURE_HUNT_FACTSHEET.md (25 Nov 2026, full LGW report), nine measured events.
const STATS = [
  ['9', 'events'],
  ['3,505', 'players'],
  ['71,346', 'finds'],
]

export default async function OgImage() {
  const [bebas, tomorrow, photo, mark] = await Promise.all([
    file('assets/BebasNeue-Regular.ttf'),
    file('assets/Tomorrow-Medium.ttf'),
    file('public/media/datasummit-tap.jpg'),
    file('public/treasure-hunt-only-logo.png'),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#06080F',
          fontFamily: 'Tomorrow',
          color: '#E6EDF3',
        }}
      >
        {/* Text column. The bottom ~120px stays empty: X draws the link label there. */}
        <div style={{ display: 'flex', flexDirection: 'column', width: 660, padding: '62px 0 0 60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={`data:image/png;base64,${mark.toString('base64')}`} width={60} height={57} alt="" />
            <div style={{ fontFamily: 'Bebas', fontSize: 48, color: '#F0605D', letterSpacing: '0.03em', paddingTop: 6 }}>
              Treasure Hunt
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 34,
              fontFamily: 'Bebas',
              fontSize: 88,
              lineHeight: 0.92,
              whiteSpace: 'nowrap',
            }}
          >
            <span>Players tap tags</span>
            <span>around your venue</span>
            <span style={{ color: '#F0605D' }}>and claim prizes</span>
          </div>

          <div style={{ display: 'flex', marginTop: 24, fontSize: 28, lineHeight: 1.3, color: '#C5CDD6', width: 540 }}>
            An NFC and QR scavenger hunt for events. No app, no sign-up.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: 540 }}>
          {/* Cropped to the poster, the phone and the hand: x 250-1080, y 60-830 of the 1080x1040 photo. */}
          <div style={{ display: 'flex', width: 540, height: 500, overflow: 'hidden' }}>
            <img
              src={`data:image/jpeg;base64,${photo.toString('base64')}`}
              width={702}
              height={676}
              alt=""
              style={{ marginLeft: -163, marginTop: -39, flexShrink: 0 }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: '#0A0E14',
              borderTop: '3px solid #F0605D',
            }}
          >
            {STATS.map(([n, label]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Bebas', fontSize: 58, lineHeight: 1 }}>{n}</span>
                <span style={{ fontSize: 24, color: '#8B949E' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Bebas', data: bebas, weight: 400, style: 'normal' },
        { name: 'Tomorrow', data: tomorrow, weight: 500, style: 'normal' },
      ],
    }
  )
}
