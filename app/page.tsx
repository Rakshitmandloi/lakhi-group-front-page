// app/page.tsx
"use client";

import ThreeDBackground from './components/ThreeDBackground';
import HeroSection from './components/HeroSection_New';


export default function Home() {
  return (
    <main style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh',
      overflow: 'hidden' 
    }}>
      {/* 1. The 3D background sits at the bottom layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ThreeDBackground />
      </div>

      {/* 2. The Hero content sits on top */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <HeroSection />
    
      </div>
    </main>
  );
}