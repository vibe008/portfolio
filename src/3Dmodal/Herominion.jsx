"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";

export default function Herominion({props,animateOut}) {
  const group = useRef();
  const { scene } = useGLTF("/modal/scene.gltf");

  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1; // Normalize to -1 ~ 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setCursor({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth rotation
  useFrame(() => {
    if (group.current) {
      const targetX = cursor.x * 0.5; // tilt left/right
      const targetY = cursor.y * 0.3; // tilt up/down

      // Smoothly interpolate using lerp
      group.current.rotation.y += (targetX - group.current.rotation.y) * 0.1;
      // group.current.rotation.x += (targetY - group.current.rotation.x) * 0.1;
    }
  });

  return (
    <>
      <mesh position={[-0.1, -1.4, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 60]} />
        <meshBasicMaterial color="#0000" transparent opacity={0.9} />
      </mesh>

      {/* Soft yellow point light from below */}
      <pointLight
        position={[0, -0.5, 0]}
        intensity={10}
        distance={15}
        color="#f9d423"
      />

      <pointLight
        position={[-4, -0.5, 0]}
        intensity={100}
        distance={10}
        color="#b0b9c0"
      />

      <pointLight
        position={[4, -0.5, 2]}
        intensity={100}
        distance={10}
        color="#b0b9c0"
      />
      <pointLight
        position={[1, 4, 2]}
        intensity={100}
        distance={15}
        color="#b0b9c0"
      />
      <primitive
        object={scene}
        ref={group}
        position={[0, -0.7, 0]}
        // rotation={[0.14, -0.5, 0]}
        rotation={[0.25, -0, 0]}
        scale={[1, 1, 1]}
        {...props}
      />
    </>
  );
}

useGLTF.preload("/modal/scene.gltf");
