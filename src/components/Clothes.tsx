import { useGLTF, Decal } from '@react-three/drei';
import { useStore } from '../store';
import * as THREE from 'three';
import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

// Pre-load models to improve performance
useGLTF.preload('/shirt.gltf');
useGLTF.preload('/workout.gltf');
useGLTF.preload('/baked.gltf');
useGLTF.preload('/1.gltf');
useGLTF.preload('/3.glb');

function getFirstMeshNode(nodes: { [key: string]: THREE.Object3D }) {
  // Try to find a mesh by name, else fallback to first mesh
  for (const key in nodes) {
    const node = nodes[key];
    if ((node as THREE.Mesh).isMesh && (node as THREE.Mesh).geometry) {
      return node as THREE.Mesh;
    }
  }
  return undefined;
}

function createTextCanvas(text: string, font: string, fontSize: number, color: string) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = 512;
  canvas.height = 128;
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px ${font}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  return canvas;
}

// --- Utility functions (shared) ---
function usePatternMap(pattern: string | undefined, color: string) {
  const [patternMap, setPatternMap] = React.useState<THREE.Texture | null>(null);
  React.useEffect(() => {
    if (pattern === 'stripes' || pattern === 'dots') {
      const size = 512;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      ctx.save();
      ctx.translate(0, size);
      ctx.scale(1, -1);
      if (pattern === 'stripes') {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, size, size);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 32;
        for (let y = 0; y < size; y += 64) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(size, y);
          ctx.stroke();
        }
      } else if (pattern === 'dots') {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#fff';
        for (let y = 32; y < size; y += 64) {
          for (let x = 32; x < size; x += 64) {
            ctx.beginPath();
            ctx.arc(x, y, 16, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }
      ctx.restore();
      const tex = new THREE.CanvasTexture(canvas);
      tex.flipY = false;
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set(1, 1);
      setPatternMap(tex);
    } else {
      setPatternMap(null);
    }
  }, [pattern, color]);
  return patternMap;
}

function useTextureMap(texture: string | undefined) {
  const [map, setMap] = React.useState<THREE.Texture | null>(null);
  React.useEffect(() => {
    if (texture) {
      new THREE.TextureLoader().load(texture, (tex) => {
        tex.flipY = false;
        setMap(tex);
      });
    } else {
      setMap(null);
    }
  }, [texture]);
  return map;
}

function useLogoMap(logo: string | undefined) {
  const [logoMap, setLogoMap] = React.useState<THREE.Texture | null>(null);
  React.useEffect(() => {
    if (logo) {
      new THREE.TextureLoader().load(logo, (tex) => {
        tex.flipY = false;
        setLogoMap(tex);
      });
    } else {
      setLogoMap(null);
    }
  }, [logo]);
  return logoMap;
}

function useTextTexture(textDesign: string | undefined, textFont: string, textFontSize: number, textColor: string) {
  return useMemo(() => {
    if (!textDesign) return null;
    const canvas = createTextCanvas(textDesign, textFont, textFontSize, textColor);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [textDesign, textFont, textFontSize, textColor]);
}

// --- Shirt Model ---
export function ShirtModel(props: React.ComponentProps<typeof Shirt>) {
  return <Shirt {...props} />;
}
export function Shirt({
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
  const { nodes } = useGLTF('/baked.gltf') as { nodes: { [key: string]: THREE.Object3D } };
  const { color, material } = useStore();
  const meshNode = nodes.shirt && (nodes.shirt as THREE.Mesh).geometry ? (nodes.shirt as THREE.Mesh) : getFirstMeshNode(nodes);
  const patternMap = usePatternMap(pattern, color);
  const map = useTextureMap(texture);
  const logoMap = useLogoMap(logo);
  const textTexture = useTextTexture(textDesign, textFont, textFontSize, textColor);

  const groupRef = React.useRef<THREE.Group>(null);

  // Walk animation: bob up/down
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

  // Material logic: pattern > texture > color
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
          {/* Logo as decal (if present) */}
          {logoMap && (
            <Decal
              map={logoMap}
              position={[
                (logoPosition.x - 0.5) * 1.2, // X: center 0, spread -0.6 to 0.6
                0.7 - logoPosition.y * 1.2,   // Y: top 0.7, bottom -0.5
                0.13
              ]}
              rotation={[0, 0, 0]}
              scale={[logoScale * 1.2, logoScale * 1.2, 1]}
            />
          )}
          {/* Text as overlay (if present) */}
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

// --- Blazer Model ---
export function BlazerModel(props: React.ComponentProps<typeof Blazer>) {
  return <Blazer {...props} />;
}
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

  // Walk animation: bob up/down
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

  // Material logic: pattern > texture > color
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
          {/* Logo as decal (if present) */}
          {logoMap && (
            <Decal
              map={logoMap}
              position={[
                (logoPosition.x - 0.5) * 1.2, // X: center 0, spread -0.6 to 0.6
                0.7 - logoPosition.y * 1.2,   // Y: top 0.7, bottom -0.5
                0.13
              ]}
              rotation={[0, 0, 0]}
              scale={[logoScale * 1.2, logoScale * 1.2, 1]}
            />
          )}
          {/* Text as overlay (if present) */}
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

// --- Pants Model ---
export function PantsModel(props: React.ComponentProps<typeof Pants>) {
  return <Pants {...props} />;
}
export function Pants({
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
  const meshNode = nodes.pants && (nodes.pants as THREE.Mesh).geometry ? (nodes.pants as THREE.Mesh) : getFirstMeshNode(nodes);
  const patternMap = usePatternMap(pattern, color);
  const map = useTextureMap(texture);
  const logoMap = useLogoMap(logo);
  const textTexture = useTextTexture(textDesign, textFont, textFontSize, textColor);

  const groupRef = React.useRef<THREE.Group>(null);

  // Walk animation: bob up/down
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

  // Material logic: pattern > texture > color
  let pantsMaterial: JSX.Element;
  if (patternMap) {
    pantsMaterial = (
      <meshStandardMaterial color={color} map={patternMap} roughness={material === 'silk' ? 0.1 : 0.8} metalness={0} />
    );
  } else if (map) {
    pantsMaterial = (
      <meshStandardMaterial color={color} map={map} roughness={material === 'silk' ? 0.1 : 0.8} metalness={0} />
    );
  } else {
    pantsMaterial = (
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
          {pantsMaterial}
          {/* Logo as decal (if present) */}
          {logoMap && (
            <Decal
              map={logoMap}
              position={[
                (logoPosition.x - 0.5) * 1.2,
                0.7 - logoPosition.y * 1.2,
                0.13
              ]}
              rotation={[0, 0, 0]}
              scale={[logoScale * 1.2, logoScale * 1.2, 1]}
            />
          )}
          {/* Text as overlay (if present) */}
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

// --- VNeck Model ---
export function VNeckModel(props: React.ComponentProps<typeof VNeck>) {
  return <VNeck {...props} />;
}
export function VNeck({
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
  const { nodes } = useGLTF('/1.gltf') as { nodes: { [key: string]: THREE.Object3D } };
  const { color, material } = useStore();
  const meshNode = getFirstMeshNode(nodes);
  const patternMap = usePatternMap(pattern, color);
  const map = useTextureMap(texture);
  const logoMap = useLogoMap(logo);
  const textTexture = useTextTexture(textDesign, textFont, textFontSize, textColor);

  const groupRef = React.useRef<THREE.Group>(null);

  // Walk animation: bob up/down
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

  // Material logic: pattern > texture > color
  let vneckMaterial: JSX.Element;
  if (patternMap) {
    vneckMaterial = (
      <meshStandardMaterial color={color} map={patternMap} roughness={material === 'silk' ? 0.1 : 0.8} metalness={0} />
    );
  } else if (map) {
    vneckMaterial = (
      <meshStandardMaterial color={color} map={map} roughness={material === 'silk' ? 0.1 : 0.8} metalness={0} />
    );
  } else {
    vneckMaterial = (
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
          {vneckMaterial}
          {/* Logo as decal (if present) */}
          {logoMap && (
            <Decal
              map={logoMap}
              position={[
                (logoPosition.x - 0.5) * 1.2,
                0.7 - logoPosition.y * 1.2,
                0.13
              ]}
              rotation={[0, 0, 0]}
              scale={[logoScale * 1.2, logoScale * 1.2, 1]}
            />
          )}
          {/* Text as overlay (if present) */}
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