export default function GlobalLoading() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        gap: '2rem',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: '2px solid rgba(230, 46, 77, 0.15)',
          borderTopColor: '#e62e4d',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '10px',
          letterSpacing: 4,
          color: '#6b6358',
          textTransform: 'uppercase',
        }}
      >
        Initializing...
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
