import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ZULOO — Web Development Studio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <svg
            width="120"
            height="120"
            viewBox="280 180 220 220"
            fill="none"
            style={{ color: '#F5F7FA' }}
          >
            <path
              d="M 320 200 L 460 200 L 340 320 L 460 320 A 20 20 0 0 1 480 340 L 480 360 A 20 20 0 0 1 460 380 L 320 380 L 440 260 L 320 260 A 20 20 0 0 1 300 240 L 300 220 A 20 20 0 0 1 320 200 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h1
          style={{
            fontSize: '100px',
            fontWeight: '900',
            color: '#F5F7FA',
            letterSpacing: '-0.05em',
            margin: 0,
            marginBottom: '20px',
          }}
        >
          ZULOO
        </h1>
        
        <p
          style={{
            fontSize: '40px',
            color: '#A0A0A0',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Custom Websites That Work.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
