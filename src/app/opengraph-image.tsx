import { ImageResponse } from 'next/og'

export const alt = 'Code Beacons Technologies — Software Development Company Pune'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
          background: 'linear-gradient(135deg, #0A0F1C 0%, #0D3B66 100%)',
          fontFamily: 'system-ui, sans-serif',
          padding: 64,
          position: 'relative',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(10,186,181,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10,186,181,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(10,186,181,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(10,186,181,0.15)',
            border: '1px solid rgba(10,186,181,0.3)',
            borderRadius: 100,
            padding: '8px 20px',
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#0ABAB5',
            }}
          />
          <span style={{ color: '#0ABAB5', fontSize: 16, fontWeight: 600, letterSpacing: 2 }}>
            CODE BEACONS TECHNOLOGIES
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14,
            fontSize: 58,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          <span>Software Development</span>
          <span style={{ color: '#0ABAB5' }}>That Delivers</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: '#9ca3af',
            textAlign: 'center',
            maxWidth: 720,
            lineHeight: 1.5,
          }}
        >
          Custom software, cloud solutions & IT consulting — Pune, India
        </div>
      </div>
    ),
    { ...size }
  )
}
