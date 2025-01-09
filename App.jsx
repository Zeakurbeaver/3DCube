import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const SpinningCube = () => {
  const [targetRotation, setTargetRotation] = useState(0); // Target rotation value
  const meshRef = useRef();

  // Function to handle cube click
  const handleCubeClick = () => {
    setTargetRotation((prev) => prev + Math.PI / 4); // Increase target rotation on click
  };

  // Smooth animation using useFrame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += (targetRotation - meshRef.current.rotation.y) * 0.2; // Smooth transition
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]} // Center the cube
      scale={[5, 5, 5]} // Larger cube
      onClick={handleCubeClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      {/* Combine wireframe and solid material */}
      <meshStandardMaterial color="green" />
      <meshBasicMaterial wireframe color="green" />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 15], // Move the camera back to fit the larger cube
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={true} enableRotate={true} /> {/* Add OrbitControls */}
      <SpinningCube />
    </Canvas>
  );
};

export default App;
