import { useGLTF, Decal } from '@react-three/drei';
import { useStore } from '../store';
import * as THREE from 'three';
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { getFirstMeshNode, usePatternMap, useTextureMap, useLogoMap, useTextTexture } from './clothesUtils';


export function Blazer({
  logo,
  texture,
  pattern,
  logoPosition = { x: 0.5, y: 0.3 },
  logoScale = 0.25,
  textDesign,
  textPosition = { x: 0.5, y: 0.5 },
  textRotation = 0,
  textFont = 'Arial',
  textColor = '#000',
  textFontSize = 32,
  animation = 'static',
  animationSpeed = 0.5,
}: {
  logo?: string;
  texture?: string;
  pattern?: string;
  logoPosition?: { x: number; y: number };
  logoScale?: number;
  textDesign?: string;
  textPosition?: { x: number; y: number };
  textRotation?: number;
  textFont?: string;
  textColor?: string;
  textFontSize?: number;
  animation?: string;
  animationSpeed?: number;
}) {
  const { nodes } = useGLTF('/3.gltf') as { nodes: { [key: string]: THREE.Object3D } };
  const { color, material } = useStore();
  const meshNode = nodes.shirt && (nodes.shirt as THREE.Mesh).geometry ? (nodes.shirt as THREE.Mesh) : getFirstMeshNode(nodes);
  const patternMap = usePatternMap(pattern, color);
  const map = useTextureMap(texture);
  const logoMap = useLogoMap(logo);
  const textTexture = useTextTexture(textDesign, textFont, textFontSize, textColor);
  const groupRef = React.useRef<THREE.Group>(null);
  useFrame((state) => {
    if (animation === 'walk' && groupRef.current) {
      const t = state.clock.getElapsedTime() * (animationSpeed || 0.5) * 2;
      groupRef.current.position.y = -0.5 + Math.sin(t) * 0.08;
      groupRef.current.rotation.z = Math.sin(t) * 0.05;
    } else if (animation === 'lattime' && groupRef.current) {
      const t = state.clock.getElapsedTime() * (animationSpeed || 1);
      groupRef.current.position.y = -0.5 + Math.sin(t * 2) * 0.12;
      groupRef.current.rotation.z = Math.sin(t) * 0.28;
      groupRef.current.rotation.x = Math.cos(t * 1.5) * 0.18;
      groupRef.current.scale.set(
        1.15 + Math.sin(t * 2) * 0.05,
        1.15 + Math.cos(t * 2) * 0.05,
        1.15 + Math.sin(t) * 0.03
      );
    } else if (groupRef.current) {
      groupRef.current.position.y = -0.5;
      groupRef.current.rotation.z = 0;
      groupRef.current.rotation.x = 0;
      groupRef.current.scale.set(1.15, 1.15, 1.15);
    }
  });
  let shirtMaterial: JSX.Element;
  if (patternMap) {
    shirtMaterial = (
      <meshStandardMaterial color={color} map={patternMap} roughness={material === 'silk' ? 0.1 : 0.8} metalness={0} />
    );
  } else if (map) {
    shirtMaterial = (
      <meshStandardMaterial color={color} map={map} roughness={material === 'silk' ? 0.1 : 0.8} metalness={0} />
    );
  } else {
    shirtMaterial = (
      <meshStandardMaterial color={color} roughness={material === 'silk' ? 0.1 : 0.8} metalness={0} />
    );
  }
  return (
    <group
      ref={groupRef}
      rotation={[0, Math.PI, 0]}
      position={[0, -0.5, 0]}
      scale={[1.15, 1.15, 1.15]}
    >
      {meshNode && (
        <mesh castShadow geometry={meshNode.geometry}>
          {shirtMaterial}
          {logoMap && (
            <Decal
              map={logoMap}
              position={[(logoPosition.x - 0.5) * 1.2, 0.7 - logoPosition.y * 1.2, 0.13]}
              rotation={[0, 0, 0]}
              scale={[logoScale * 1.2, logoScale * 1.2, 1]}
            />
          )}
          {textTexture && (
            <mesh
              position={[(textPosition.x - 0.5) * 1.2, 0.7 - textPosition.y * 1.2, 0.14]}
              rotation={[0, 0, THREE.MathUtils.degToRad(textRotation)]}
            >
              <planeGeometry args={[textFontSize / 100, textFontSize / 40]} />
              <meshBasicMaterial map={textTexture} transparent />
            </mesh>
          )}
        </mesh>
      )}
    </group>
  );
}
