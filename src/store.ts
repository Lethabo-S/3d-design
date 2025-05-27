import { create } from 'zustand';

interface StoreState {
  activeItem: 'shirt' | 'blazer' | 'pants' | 'vneck';
  color: string;
  pattern: string;
  material: string;
  size: string;
  setActiveItem: (item: 'shirt' | 'blazer' | 'pants' | 'vneck') => void;
  setColor: (color: string) => void;
  setPattern: (pattern: string) => void;
  setMaterial: (material: string) => void;
  setSize: (size: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  activeItem: 'shirt',
  color: '#2563eb',
  pattern: 'solid',
  material: 'cotton',
  size: 'M',
  setActiveItem: (item) => set({ activeItem: item }),
  setColor: (color) => set({ color }),
  setPattern: (pattern) => set({ pattern }),
  setMaterial: (material) => set({ material }),
  setSize: (size) => set({ size }),
}));