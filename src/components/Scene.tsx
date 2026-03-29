import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import Bike from './Bike';
import { Environment, ContactShadows } from '@react-three/drei';
import { BikeType } from '../App';

export default function Scene({ bikeType }: { bikeType: BikeType }) {
  const bikeRef = useRef<THREE.Group>(null);
  const introFinished = useRef(false);
  const { viewport } = useThree();

  useEffect(() => {
    if (!bikeRef.current) return;
    
    // Start rotated back by 360 degrees (Math.PI * 2)
    bikeRef.current.rotation.y = (Math.PI / 4) - (Math.PI * 2);
    
    gsap.to(bikeRef.current.rotation, {
      y: Math.PI / 4,
      duration: 2.5,
      ease: "power3.inOut",
      onComplete: () => {
        introFinished.current = true;
      }
    });
  }, []);

  useFrame((state) => {
    if (!bikeRef.current || !introFinished.current) return;
    // Gentle floating and rotation for the hero section AFTER intro
    bikeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + Math.PI / 4;
    bikeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  // Calculate a responsive scale based on viewport width
  // This ensures the bike scales down on mobile devices and stays centered
  // Adjusted divisor to make the bike slightly larger on mobile screens
  const responsiveScale = Math.min(1.1, viewport.width / 7.5);

  return (
    <>
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.2} 
        color="#fff5e6" 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.4} 
        color="#e6f2ff" 
      />
      
      <Environment preset="city" environmentIntensity={0.5} />

      <group ref={bikeRef} scale={responsiveScale}>
        <Bike bikeType={bikeType} />
      </group>

      <ContactShadows 
        position={[0, -2.5 * responsiveScale, 0]} 
        opacity={0.4} 
        scale={20 * responsiveScale} 
        blur={2} 
        far={4.5} 
        color="#8A9A5B" 
      />
    </>
  );
}
