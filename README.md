# Lakhi Group - Pure Brilliance Website

A sophisticated, story-driven B2B diamond company website featuring cutting-edge 3D graphics, smooth animations, and modern design.

## Features

- **3D Interactive Background**: Beautiful diamond animations that respond to scroll
- **Glass Morphism UI**: Modern, elegant design with backdrop blur effects
- **Story-Driven Sections**: Five key "Pure" sections showcasing company values
- **Smooth Animations**: GSAP and Framer Motion for premium interactions
- **Responsive Design**: Perfect on all devices from mobile to desktop
- **Performance Optimized**: Efficient 3D rendering with adaptive quality

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D graphics and animations
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Framer Motion** - Advanced animations
- **GSAP** - Professional-grade animations
- **Lucide React** - Beautiful icons

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/
│   ├── ThreeDBackground.tsx    # Interactive 3D diamond background
│   ├── Navigation.tsx          # Modern glass navigation
│   ├── HeroSection.tsx         # Hero with animated stats
│   ├── StorySection.tsx        # Five "Pure" story sections
│   ├── GlassCard.tsx          # Reusable glass morphism card
│   └── AnimateOnScroll.tsx    # GSAP scroll animations
├── globals.css                 # Global styles and utilities
├── layout.tsx                  # Root layout with metadata
└── page.tsx                    # Main page composition
```

## Design Philosophy

Inspired by the concept of "Pure" excellence, this website elevates the traditional diamond industry website with:

- **Pure Excellence**: Uncompromising quality and precision
- **Pure Craft**: Innovation meeting tradition
- **Pure Innovation**: Technology-driven future
- **Pure Responsibility**: Ethical excellence and sustainability
- **Pure Careers**: Growing together as a team

## Performance

- Adaptive 3D quality based on device capabilities
- Optimized bundle size with code splitting
- Smooth 60fps animations
- Responsive images and lazy loading

## Deployment

This website is ready for deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any platform supporting Next.js

## License

© 2024 Lakhi Group. All rights reserved.
