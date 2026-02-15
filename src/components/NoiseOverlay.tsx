export function NoiseOverlay() {
  return (
    <>
      <svg
        style={{
          visibility: 'hidden',
          position: 'absolute',
          width: 0,
          height: 0,
        }}
      >
        <filter id="grainy-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.60"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          filter: 'url(#grainy-noise)',
          opacity: 0.05,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        aria-hidden="true"
      />
    </>
  )
}

export default NoiseOverlay
