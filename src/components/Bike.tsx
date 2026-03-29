import { Torus, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BikeType } from '../App';

function Tube({ start, end, radius, material }: { start: [number, number, number], end: [number, number, number], radius: number, material: any }) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const distance = startVec.distanceTo(endVec);
  const position = startVec.clone().lerp(endVec, 0.5);
  
  const quaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const direction = new THREE.Vector3().subVectors(endVec, startVec).normalize();
  quaternion.setFromUnitVectors(up, direction);

  return (
    <mesh position={position} quaternion={quaternion} material={material} castShadow>
      <cylinderGeometry args={[radius, radius, distance, 16]} />
    </mesh>
  );
}

export default function Bike({ bikeType }: { bikeType: BikeType }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  const isMountain = bikeType === 'mountain';
  const isElectric = bikeType === 'electric';
  const isCity = bikeType === 'city';

  const frameColor = isMountain ? '#5a6b3b' : isElectric ? '#6b9eb3' : '#2c3e50';
  const tireRadius = isMountain ? 0.09 : isElectric ? 0.07 : 0.045;

  // Materials
  const materials = useMemo(() => ({
    frame: new THREE.MeshStandardMaterial({ color: frameColor, metalness: 0.6, roughness: 0.4 }),
    tire: new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.9 }),
    metal: new THREE.MeshStandardMaterial({ color: '#bdc3c7', metalness: 0.9, roughness: 0.1 }),
    accent: new THREE.MeshStandardMaterial({ color: '#e74c3c', metalness: 0.5, roughness: 0.5 }),
  }), [frameColor]);

  const pts = {
    rw: [-1.5, 0, 0] as [number, number, number],
    fw: [1.5, 0, 0] as [number, number, number],
    bb: [-0.2, 0, 0] as [number, number, number],
    st: [-0.6, 1.2, 0] as [number, number, number],
    htt: [0.8, 1.2, 0] as [number, number, number],
    htb: [1.0, 0.6, 0] as [number, number, number],
  };

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={1.8}>
      {/* Wheels */}
      <Torus args={[0.7, tireRadius, 16, 100]} position={pts.rw} rotation={[0, 0, 0]} material={materials.tire} castShadow />
      <Torus args={[0.7, tireRadius, 16, 100]} position={pts.fw} rotation={[0, 0, 0]} material={materials.tire} castShadow />

      {/* Spokes (simplified) */}
      {[0, Math.PI/4, Math.PI/2, Math.PI*3/4].map((angle, i) => (
        <group key={i}>
          <Cylinder args={[0.01, 0.01, 1.35, 8]} position={pts.rw} rotation={[0, 0, angle]} material={materials.metal} />
          <Cylinder args={[0.01, 0.01, 1.35, 8]} position={pts.fw} rotation={[0, 0, angle]} material={materials.metal} />
        </group>
      ))}

      {/* Frame Tubes */}
      <Tube start={pts.bb} end={pts.st} radius={0.04} material={materials.frame} /> {/* Seat Tube */}
      <Tube start={pts.st} end={pts.htt} radius={0.035} material={materials.frame} /> {/* Top Tube */}
      <Tube start={pts.bb} end={pts.htb} radius={0.045} material={materials.frame} /> {/* Down Tube */}
      <Tube start={pts.htt} end={pts.htb} radius={0.04} material={materials.frame} /> {/* Head Tube */}

      {/* Chainstays */}
      <Tube start={pts.bb} end={[-1.5, 0, 0.08]} radius={0.02} material={materials.frame} />
      <Tube start={pts.bb} end={[-1.5, 0, -0.08]} radius={0.02} material={materials.frame} />

      {/* Seatstays */}
      <Tube start={[-0.6, 1.1, 0]} end={[-1.5, 0, 0.08]} radius={0.02} material={materials.frame} />
      <Tube start={[-0.6, 1.1, 0]} end={[-1.5, 0, -0.08]} radius={0.02} material={materials.frame} />

      {/* Fork */}
      <Tube start={pts.htb} end={[1.5, 0, 0.08]} radius={isMountain ? 0.04 : 0.025} material={isMountain ? materials.metal : materials.frame} />
      <Tube start={pts.htb} end={[1.5, 0, -0.08]} radius={isMountain ? 0.04 : 0.025} material={isMountain ? materials.metal : materials.frame} />

      {/* Handlebars */}
      <Tube start={pts.htt} end={[0.7, 1.4, 0]} radius={0.02} material={materials.metal} /> {/* Stem */}
      {isMountain ? (
        <Cylinder args={[0.02, 0.02, 0.8, 16]} position={[0.7, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.metal} castShadow />
      ) : isCity ? (
        <group position={[0.7, 1.4, 0]}>
          <Cylinder args={[0.02, 0.02, 0.5, 16]} rotation={[Math.PI / 2, 0, 0]} material={materials.metal} castShadow />
          <Cylinder args={[0.02, 0.02, 0.2, 16]} position={[-0.05, 0, 0.25]} rotation={[Math.PI / 2, Math.PI/4, 0]} material={materials.metal} castShadow />
          <Cylinder args={[0.02, 0.02, 0.2, 16]} position={[-0.05, 0, -0.25]} rotation={[Math.PI / 2, -Math.PI/4, 0]} material={materials.metal} castShadow />
        </group>
      ) : (
        <Cylinder args={[0.02, 0.02, 0.6, 16]} position={[0.7, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.metal} castShadow />
      )}

      {/* Seat */}
      <Tube start={pts.st} end={[-0.7, 1.4, 0]} radius={0.02} material={materials.metal} /> {/* Seatpost */}
      <Box args={[0.3, 0.08, 0.15]} position={[-0.75, 1.45, 0]} rotation={[0, 0, -0.05]} material={materials.tire} castShadow />

      {/* Crank & Pedals */}
      <Cylinder args={[0.1, 0.1, 0.05, 32]} position={pts.bb} rotation={[Math.PI / 2, 0, 0]} material={materials.metal} castShadow />
      <Box args={[0.02, 0.4, 0.02]} position={pts.bb} rotation={[0, 0, Math.PI / 4]} material={materials.metal} castShadow />
      <Box args={[0.1, 0.02, 0.08]} position={[-0.2 + 0.14, 0 + 0.14, 0.1]} material={materials.tire} castShadow />
      <Box args={[0.1, 0.02, 0.08]} position={[-0.2 - 0.14, 0 - 0.14, -0.1]} material={materials.tire} castShadow />

      {/* Electric Battery & Motor */}
      {isElectric && (
        <>
          <Box args={[0.12, 0.6, 0.08]} position={[0.4, 0.3, 0]} rotation={[0, 0, Math.PI / 4 + 0.1]} material={materials.tire} castShadow />
          <Cylinder args={[0.15, 0.15, 0.1, 32]} position={pts.rw} rotation={[Math.PI / 2, 0, 0]} material={materials.metal} castShadow />
        </>
      )}

      {/* Drivetrain Logic */}
      {isMountain ? (
        <group position={[-1.5, 0, 0.05]}>
          <Cylinder args={[0.2, 0.2, 0.02, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.metal} castShadow />
          <Cylinder args={[0.16, 0.16, 0.02, 32]} position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={materials.metal} castShadow />
          <Cylinder args={[0.12, 0.12, 0.02, 32]} position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]} material={materials.metal} castShadow />
          <Cylinder args={[0.08, 0.08, 0.02, 32]} position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]} material={materials.metal} castShadow />
          <Box args={[0.05, 0.2, 0.03]} position={[0, -0.15, 0.05]} rotation={[0, 0, -0.2]} material={materials.accent} castShadow />
        </group>
      ) : (
        <group position={[-1.5, 0, 0.05]}>
          <Cylinder args={[0.1, 0.1, 0.02, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.metal} castShadow />
        </group>
      )}

      {/* Chain (simplified) */}
      <Tube start={[-0.2, 0.1, 0.05]} end={[-1.5, 0.05, 0.05]} radius={0.005} material={materials.metal} />
      <Tube start={[-0.2, -0.1, 0.05]} end={[-1.5, -0.05, 0.05]} radius={0.005} material={materials.metal} />
    </group>
  );
}
