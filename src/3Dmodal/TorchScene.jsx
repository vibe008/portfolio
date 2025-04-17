// TorchScene.jsx
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { SpotLightHelper } from "three";
import { useRef, useEffect } from "react";

function TorchLight() {
  const spotlight = useRef();
  const beam = useRef();
  const { mouse, viewport, scene } = useThree();

  useEffect(() => {
    if (!spotlight.current) return;
    const helper = new SpotLightHelper(spotlight.current);
    scene.add(helper);
    return () => scene.remove(helper);
  }, [scene]);

  useFrame(() => {
    const x = mouse.x * viewport.width * 0.5;
    const y = mouse.y * viewport.height * 0.5;

    if (spotlight.current) {
      spotlight.current.position.set(x, y, 3);
      spotlight.current.target.position.set(x, y, 0);
      spotlight.current.target.updateMatrixWorld();
    }

    if (beam.current) {
      beam.current.position.set(x, y, 3);
      beam.current.lookAt(x, y, 0);
    }
  });

  return (
    <>
      <spotLight
        ref={spotlight}
        angle={0.3}
        penumbra={0.5}
        distance={10}
        intensity={3}
        color="white"
        castShadow
      />
      {spotlight.current?.target && (
        <primitive object={spotlight.current.target} />
      )}
      <mesh ref={beam}>
        <coneGeometry args={[1, 4, 32]} />
        <meshBasicMaterial color="white" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

// Make sure this is default export or used directly in your App.jsx
export default function TorchScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }} shadows>
      <ambientLight intensity={0.1} />
      <TorchLight />
      {/* Add other 3D objects here */}
    </Canvas>
  );
}
