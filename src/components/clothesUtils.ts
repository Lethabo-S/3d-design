import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

// Returns the first mesh node from a GLTF nodes object
export function getFirstMeshNode(nodes: { [key: string]: THREE.Object3D }): THREE.Mesh | null {
  for (const key in nodes) {
    const node = nodes[key];
    if ((node as THREE.Mesh).isMesh) {
      return node as THREE.Mesh;
    }
  }
  return null;
}

const patternImageMap: Record<string, string> = {
  stripes: '/patterns/stripes.png',
  dots: '/patterns/dots.png',
  plaid: '/patterns/plaid.png',
  solid: '', // solid means just color, no pattern
  floral: '/patterns/floral.png',
};

export function usePatternMap(pattern?: string): THREE.Texture | null {
  // Always call useLoader, but pass a dummy image if not needed
  const patternUrl = pattern && pattern !== 'solid' ? patternImageMap[pattern] : '';
  // Use a transparent 1x1 PNG as fallback
  const fallback = '/patterns/transparent.png';
  const url = patternUrl || fallback;
  const texture = useLoader(TextureLoader, url);
  // If pattern is not set or is 'solid', don't use the texture
  if (!pattern || pattern === 'solid') return null;
  return texture;
}

export function useTextureMap(texture?: string): THREE.Texture | null {
  // Implement texture logic here
  return null;
}

export function useLogoMap(logo?: string): THREE.Texture | null {
  // Implement logo texture logic here
  return null;
}

export function useTextTexture(
  text?: string,
  font?: string,
  fontSize?: number,
  color?: string
): THREE.Texture | null {
  // Implement text-to-texture logic here
  return null;
}
