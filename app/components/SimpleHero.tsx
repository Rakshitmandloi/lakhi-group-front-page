'use client';

export default function SimpleHero() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div>
        <h1 style={{ margin: 0, marginBottom: '20px' }}>LAKHI GROUP</h1>
        <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.8 }}>Diamonds & Luxury</p>
      </div>
    </div>
  );
}
