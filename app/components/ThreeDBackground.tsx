'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import * as THREE from 'three';

// Ultra-realistic Diamond geometry with brilliant-cut proportions
function DiamondGeometry() {
  const geometry = useMemo(() => {
    // Use octahedron as base and modify for diamond shape
    const geo = new THREE.OctahedronGeometry(0.5, 2);
    const vertices = geo.attributes.position.array;
    
    // Transform to create realistic diamond proportions
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      
      // Create diamond-like proportions
      if (y > 0.2) {
        // Upper crown - create table and facets
        const heightFactor = Math.min(1.0, (y - 0.2) / 0.3);
        vertices[i] = x * (0.8 - heightFactor * 0.3); // Narrow towards table
        vertices[i + 1] = 0.2 + heightFactor * 0.6; // Crown height
        vertices[i + 2] = z * (0.8 - heightFactor * 0.3);
      } else if (y > -0.2) {
        // Girdle area - widest part
        vertices[i] = x * 1.0;
        vertices[i + 1] = y;
        vertices[i + 2] = z * 1.0;
      } else {
        // Lower pavilion - taper to culet
        const depthFactor = Math.abs(y + 0.2) / 0.3;
        vertices[i] = x * (1.0 - depthFactor * 0.9); // Narrow towards culet
        vertices[i + 1] = -0.2 - depthFactor * 0.8; // Pavilion depth
        vertices[i + 2] = z * (1.0 - depthFactor * 0.9);
      }
    }
    
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
    
    return geo;
  }, []);
  
  return geometry;
}

// Individual Diamond component with realistic materials
function Diamond({ position, scale, rotationSpeed, smoothScrollProgress, size }: { 
  position: [number, number, number]; 
  scale: number; 
  rotationSpeed: number;
  smoothScrollProgress: MotionValue<number>;
  size: 'small' | 'medium' | 'large';
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = DiamondGeometry();
  
  // Create ultra-realistic diamond material based on size
  const material = useMemo(() => {
    // Different color tints for variety
    const colorVariations = {
      large: new THREE.Color(0.99, 0.995, 1.0),    // Crystal clear
      medium: new THREE.Color(0.98, 0.99, 1.0),    // Slight blue tint
      small: new THREE.Color(0.97, 0.985, 0.995)   // Very subtle tint
    };
    
    return new THREE.MeshPhysicalMaterial({
      color: colorVariations[size],
      metalness: 0.0,              // Diamonds are not metallic
      roughness: 0.0,              // Perfect glass smoothness
      transmission: 0.99,          // Maximum glass transparency
      thickness: 0.2,              // Thin for maximum brilliance
      ior: 2.417,                  // Exact diamond IOR for realistic refraction
      reflectivity: 1.0,           // Maximum reflectivity
      clearcoat: 1.0,              // Perfect glass coating
      clearcoatRoughness: 0.0,     // Perfect glass smoothness
      transparent: true,
      opacity: size === 'large' ? 0.98 : size === 'medium' ? 0.95 : 0.92,
      envMapIntensity: 4.0,        // Strong environment reflections for glass
      
      // Enhanced glass-like properties
      sheen: 1.0,                  // Maximum glass sheen
      sheenRoughness: 0.0,         // Perfect sheen
      sheenColor: new THREE.Color(0.98, 0.99, 1.0),
      
      // Rainbow dispersion effects like real diamonds
      iridescence: 0.9,            // Strong rainbow effects
      iridescenceIOR: 1.4,         // Glass-like iridescence
      iridescenceThicknessRange: [50, 600], // Wide range for varied colors
      
      // Glass brilliance
      emissive: new THREE.Color(0.02, 0.02, 0.03),
      emissiveIntensity: 0.05,
      
      // Double-sided for glass effect
      side: THREE.DoubleSide,
      
      // Advanced glass properties
      attenuationColor: new THREE.Color(0.99, 0.995, 1.0),
      attenuationDistance: 0.5,
    });
  }, [size]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const scrollProgress = smoothScrollProgress.get(); // Get current scroll value
    
    // Complex rotation based on scroll and time
    meshRef.current.rotation.x = time * rotationSpeed + scrollProgress * Math.PI * 3;
    meshRef.current.rotation.y = time * rotationSpeed * 0.7 + scrollProgress * Math.PI * 2;
    meshRef.current.rotation.z = time * rotationSpeed * 0.5 + scrollProgress * Math.PI;
    
    // Sophisticated float animation with scroll influence
    const baseY = position[1];
    const floatAmplitude = size === 'large' ? 0.8 : size === 'medium' ? 0.6 : 0.4;
    meshRef.current.position.y = baseY + 
      Math.sin(time * 0.5 + position[0]) * floatAmplitude + 
      scrollProgress * 8;
    
    // Scale pulsing with scroll
    const basePulse = 1 + Math.sin(time * 1.5) * 0.08;
    const scrollScale = 1 + scrollProgress * 0.5;
    meshRef.current.scale.setScalar(scale * basePulse * scrollScale);
    
    // Depth movement based on scroll
    meshRef.current.position.z = position[2] + scrollProgress * 25;
    
    // Horizontal drift
    meshRef.current.position.x = position[0] + Math.cos(time * 0.3) * 0.5;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={geometry}
      material={material}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
}

// Diamond Field component with sophisticated layout
function DiamondField({ smoothScrollProgress, isLightMode }: { smoothScrollProgress: MotionValue<number>; isLightMode: boolean }) {
  const { scene } = useThree();
  
  // Generate sophisticated diamond positions with clustering
  const diamonds = useMemo(() => {
    const temp = [];
    
    // Create clusters of diamonds
    const clusters = [
      { center: [0, 0, -5], count: 15, radius: 8 },
      { center: [-12, 5, -15], count: 12, radius: 6 },
      { center: [15, -8, -25], count: 10, radius: 5 },
      { center: [-8, -12, -35], count: 8, radius: 4 },
      { center: [20, 15, -45], count: 6, radius: 3 },
    ];
    
    clusters.forEach((cluster, clusterIndex) => {
      for (let i = 0; i < cluster.count; i++) {
        const angle = (i / cluster.count) * Math.PI * 2 + Math.random() * 0.8;
        const distance = Math.random() * cluster.radius;
        const height = (Math.random() - 0.5) * cluster.radius * 2;
        
        const size = Math.random() < 0.1 ? 'large' : 
                     Math.random() < 0.3 ? 'medium' : 'small';
        
        const baseScale = size === 'large' ? 0.4 + Math.random() * 0.3 :
                         size === 'medium' ? 0.2 + Math.random() * 0.2 :
                         0.1 + Math.random() * 0.15;
        
        temp.push({
          position: [
            cluster.center[0] + Math.cos(angle) * distance,
            cluster.center[1] + height,
            cluster.center[2] + Math.sin(angle) * distance
          ] as [number, number, number],
          scale: baseScale,
          rotationSpeed: 0.1 + Math.random() * 0.4,
          size,
          id: clusterIndex * 100 + i
        });
      }
    });
    
    // Add some scattered diamonds
    for (let i = 0; i < 20; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40,
          -20 - Math.random() * 60
        ] as [number, number, number],
        scale: 0.05 + Math.random() * 0.1,
        rotationSpeed: 0.1 + Math.random() * 0.3,
        size: 'small' as const,
        id: 1000 + i
      });
    }
    
    return temp;
  }, []);

  // Professional lighting setup for maximum diamond brilliance
  useEffect(() => {
    // Clear existing lights
    const lights = scene.children.filter(child => 
      child.type === 'DirectionalLight' || 
      child.type === 'PointLight' || 
      child.type === 'SpotLight' ||
      child.type === 'AmbientLight'
    );
    lights.forEach(light => scene.remove(light));
    
    // Enhanced lighting for glass-like diamonds - dramatic difference between modes
    const lightIntensity = isLightMode ? 5.0 : 2.5;        // Much brighter in light mode
    const ambientIntensity = isLightMode ? 3.0 : 0.8;      // Strong ambient in light mode
    
    // Main key light - pure white for glass clarity
    const keyLight = new THREE.DirectionalLight(0xffffff, lightIntensity);
    keyLight.position.set(25, 25, 15);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 4096;
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 150;
    keyLight.shadow.camera.left = -60;
    keyLight.shadow.camera.right = 60;
    keyLight.shadow.camera.top = 60;
    keyLight.shadow.camera.bottom = -60;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);
    
    // Secondary key light for glass refraction
    const keyLight2 = new THREE.DirectionalLight(0xf8fcff, lightIntensity * 1.2);
    keyLight2.position.set(-20, 15, 20);
    scene.add(keyLight2);
    
    // Fill light with cool tone for glass
    const fillLight = new THREE.DirectionalLight(0xf0f8ff, lightIntensity * 0.8);
    fillLight.position.set(-15, 8, 12);
    scene.add(fillLight);
    
    // Rim light for glass edge brilliance
    const rimLight = new THREE.DirectionalLight(0xe3f2fd, lightIntensity * 1.0);
    rimLight.position.set(0, -10, -15);
    scene.add(rimLight);
    
    // Enhanced ambient light for glass glow
    const ambientLight = new THREE.AmbientLight(0xa0b0c0, ambientIntensity);
    scene.add(ambientLight);
    
    // Enhanced sparkle lights for glass dispersion - much brighter in light mode
    const sparkleIntensity = isLightMode ? lightIntensity * 1.5 : lightIntensity * 0.8;
    const sparkleColors = [
      { color: 0xff2866, intensity: sparkleIntensity, pos: [30, 20, 15] },   // Bright red
      { color: 0x00ff88, intensity: sparkleIntensity * 0.9, pos: [-25, 15, 20] },  // Bright green
      { color: 0x4488ff, intensity: sparkleIntensity * 1.1, pos: [15, -20, 25] }, // Bright blue
      { color: 0xff8800, intensity: sparkleIntensity, pos: [-20, 25, -15] }, // Bright orange
      { color: 0xdd22ff, intensity: sparkleIntensity, pos: [25, -15, -20] },  // Bright purple
      { color: 0x22ddff, intensity: sparkleIntensity * 0.9, pos: [-15, -25, 30] },  // Bright cyan
      { color: 0xffdd22, intensity: sparkleIntensity * 0.9, pos: [20, 30, -10] },   // Bright yellow
      { color: 0xff4488, intensity: sparkleIntensity, pos: [-30, 10, 25] }    // Bright pink
    ];
    
    sparkleColors.forEach((light) => {
      const pointLight = new THREE.PointLight(light.color, light.intensity, 45, 1.8);
      pointLight.position.set(light.pos[0], light.pos[1], light.pos[2]);
      scene.add(pointLight);
    });
    
    // Add spot lights for focused brilliance
    const spotLight1 = new THREE.SpotLight(0xffffff, lightIntensity * 0.85, 50, Math.PI / 6, 0.3);
    spotLight1.position.set(0, 30, 20);
    spotLight1.target.position.set(0, 0, -10);
    scene.add(spotLight1);
    scene.add(spotLight1.target);
    
    const spotLight2 = new THREE.SpotLight(0xf0f8ff, lightIntensity * 0.7, 45, Math.PI / 8, 0.4);
    spotLight2.position.set(-25, -20, 25);
    spotLight2.target.position.set(5, 5, -15);
    scene.add(spotLight2);
    scene.add(spotLight2.target);
    
    return () => {
      // Cleanup
      const allLights = scene.children.filter(child => 
        child.type === 'DirectionalLight' || 
        child.type === 'PointLight' || 
        child.type === 'SpotLight' ||
        child.type === 'AmbientLight'
      );
      allLights.forEach(light => scene.remove(light));
    };
  }, [scene, isLightMode]);

  return (
    <>
      {diamonds.map((diamond) => (
        <Diamond
          key={diamond.id}
          position={diamond.position}
          scale={diamond.scale}
          rotationSpeed={diamond.rotationSpeed}
          smoothScrollProgress={smoothScrollProgress}
          size={diamond.size}
        />
      ))}
    </>
  );
}

// Camera controller for cinematic scroll effects
function CameraController({ smoothScrollProgress }: { smoothScrollProgress: MotionValue<number> }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const scrollProgress = smoothScrollProgress.get(); // Get current scroll value
    
    // Subtle camera movement - reduced zoom out
    camera.position.z = 8 + scrollProgress * 15;           // Reduced from 40 to 15
    camera.position.y = scrollProgress * 8;                // Reduced from 15 to 8
    camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 3; // Reduced from 8 to 3
    
    // Gentle camera rotation for cinematic effect
    camera.rotation.x = -scrollProgress * 0.3;             // Reduced from 0.6 to 0.3
    camera.rotation.z = Math.sin(scrollProgress * Math.PI) * 0.08;  // Reduced from 0.15 to 0.08
    camera.rotation.y = scrollProgress * 0.15;             // Reduced from 0.3 to 0.15
    
    // Minimal field of view changes - focus on rotation
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 75 + scrollProgress * 10;  // Reduced from 35 to 10
      camera.updateProjectionMatrix();
    }
  });
  
  return null;
}

// Premium rendering and post-processing for diamond brilliance
function RenderController({ smoothScrollProgress, isLightMode }: { smoothScrollProgress: MotionValue<number>; isLightMode: boolean }) {
  const { gl, scene } = useThree();
  
  useEffect(() => {
    const updateRendering = () => {
      const scrollProgress = smoothScrollProgress.get(); // Get current scroll value
      
      // Ultra high-quality rendering settings
      gl.toneMapping = THREE.ACESFilmicToneMapping;
      gl.toneMappingExposure = isLightMode 
        ? 1.2 + scrollProgress * 0.5  // Lower exposure for light mode
        : 1.8 + scrollProgress * 0.8; // Higher exposure for dark mode
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = THREE.PCFSoftShadowMap;
      gl.shadowMap.autoUpdate = true;
      gl.outputColorSpace = THREE.SRGBColorSpace;
      
      // Enhanced pixel ratio for crisp reflections
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Scene fog for atmospheric depth - adaptive to theme
      const fogColor = isLightMode ? 0xf1f5f9 : 0x000008;
      const fogDensity = isLightMode 
        ? 0.003 + scrollProgress * 0.005
        : 0.006 + scrollProgress * 0.008;
      
      scene.fog = new THREE.FogExp2(fogColor, fogDensity);
      
      // Enhanced background for better reflections
      scene.background = new THREE.Color(fogColor);
    };
    
    updateRendering();
    
    // Update on scroll changes
    const unsubscribe = smoothScrollProgress.onChange(updateRendering);
    return unsubscribe;
  }, [gl, scene, smoothScrollProgress, isLightMode]);
  
  return null;
}

export default function ThreeDBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Light mode state
  const [isLightMode, setIsLightMode] = useState(false);
  
  useEffect(() => {
    // Listen for light mode toggle events from HeroSection
    const handleLightModeToggle = (event: CustomEvent) => {
      setIsLightMode(event.detail.isLightMode);
    };
    
    window.addEventListener('lightModeToggle', handleLightModeToggle as EventListener);
    
    return () => {
      window.removeEventListener('lightModeToggle', handleLightModeToggle as EventListener);
    };
  }, []);
  
  // Smooth scroll progress with sophisticated spring
  const smoothScrollProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]), 
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
      mass: 1.0
    }
  );
  
  // Dynamic background based on theme and scroll
  const backgroundStyle = isLightMode 
    ? 'radial-gradient(ellipse at center, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
    : 'radial-gradient(ellipse at center, #000010 0%, #000000 70%, #000000 100%)';

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10,
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75, near: 0.1, far: 200 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          precision: "highp",
          preserveDrawingBuffer: false,
          logarithmicDepthBuffer: true, // Better depth precision for transparency
        }}
        style={{ 
          background: backgroundStyle,
          width: '100%',
          height: '100%'
        }}
        dpr={[1, 2]} // High pixel ratio for sharp details
        frameloop="always" // Ensure continuous rendering for smooth animations
      >
        <CameraController smoothScrollProgress={smoothScrollProgress} />
        <RenderController smoothScrollProgress={smoothScrollProgress} isLightMode={isLightMode} />
        <DiamondField smoothScrollProgress={smoothScrollProgress} isLightMode={isLightMode} />
      </Canvas>
      
      {/* Subtle gradient overlay for depth */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          transition: 'all 0.5s',
          background: isLightMode 
            ? 'linear-gradient(to bottom, transparent, transparent, rgba(255,255,255,0.1))' 
            : 'linear-gradient(to bottom, transparent, transparent, rgba(0,0,0,0.2))'
        }} 
      />
    </div>
  );
}
