import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import { Shirt, Blazer, Pants } from './components/Clothes';
import { Customizer } from './components/Customizer';
import { Loader } from './components/Loader';
import { useStore } from './store';
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { activeItem } = useStore();
  const controlsRef = useRef(null);

  // Add state for logo, texture, and pattern to pass to Shirt
  const [logo, setLogo] = React.useState<string | null>(null);
  const [texture, setTexture] = React.useState<string | null>(null);
  const [pattern, setPattern] = React.useState<string | null>(null);
  const [logoPosition, setLogoPosition] = React.useState<{ x: number; y: number }>({ x: 0.5, y: 0.3 });
  const [logoScale, setLogoScale] = React.useState<number>(0.25);
  // Animation state
  const [animation, setAnimation] = React.useState<string>('static');
  const [animationSpeed, setAnimationSpeed] = React.useState<number>(0.5);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={
          <div className="h-screen w-full flex relative overflow-hidden">
            {/* Animated, colorful background for wow effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-blue-300 via-fuchsia-200 to-yellow-200 opacity-60 rounded-full blur-3xl left-[-20vw] top-[-20vw] animate-pulse" />
              <div className="absolute w-96 h-96 bg-pink-200 opacity-30 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse delay-200" />
              <div className="absolute w-80 h-80 bg-blue-200 opacity-20 rounded-full blur-2xl bottom-10 left-10 animate-pulse delay-500" />
              <div className="absolute w-64 h-64 bg-yellow-200 opacity-20 rounded-full blur-2xl bottom-0 right-10 animate-pulse delay-700" />
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Sparkles effect using SVG */}
              <svg className="absolute w-full h-full blur-[0.5px]">
                {[...Array(30)].map((_, i) => (
                  <circle
                    key={i}
                    cx={Math.random() * 100 + '%'}
                    cy={Math.random() * 100 + '%'}
                    r={Math.random() * 2 + 1}
                    fill="#fff"
                    opacity={Math.random() * 0.5 + 0.3}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;0.8;0.2"
                      dur={`${Math.random() * 2 + 2}s`}
                      repeatCount="indefinite"
                      begin={`${Math.random() * 2}s`}
                    />
                  </circle>
                ))}
              </svg>
            </div>
            <div className="relative z-10 flex-1">
              <Canvas
                shadows
                camera={{ position: [0, 0, 2.5], fov: 50 }}
                gl={{ preserveDrawingBuffer: true }}
              >
                <Suspense fallback={<Loader />}>
                  <Stage environment="city" intensity={0.5}>
                    {activeItem === 'shirt' && (
                      <Shirt
                        logo={logo || undefined}
                        texture={texture || undefined}
                        pattern={pattern || undefined}
                        logoPosition={logoPosition}
                        logoScale={logoScale}
                        animation={animation}
                        animationSpeed={animationSpeed}
                      />
                    )}
                    {activeItem === 'blazer' && <Blazer />}
                    {activeItem === 'pants' && <Pants />}
                  </Stage>
                  <OrbitControls 
                    ref={controlsRef}
                    enablePan={false}
                    enableZoom={true}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                    autoRotate={true}
                    autoRotateSpeed={2}
                  />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
            {/* Customizer Panel */}
            <Customizer
              setLogo={setLogo}
              setTexture={setTexture}
              setPattern={setPattern}
              logoPosition={logoPosition}
              setLogoPosition={setLogoPosition}
              logoScale={logoScale}
              setLogoScale={setLogoScale}
              setAnimation={setAnimation}
              setAnimationSpeed={setAnimationSpeed}
              animation={animation}
              animationSpeed={animationSpeed}
            />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;