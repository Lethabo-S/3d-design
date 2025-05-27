import React from 'react';
import { Html, useProgress } from '@react-three/drei';

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-xl font-semibold">
        {progress.toFixed(0)}% loaded
      </div>
    </Html>
  );
}