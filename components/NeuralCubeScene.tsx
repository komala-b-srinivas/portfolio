"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Cube cluster positions — isometric-style arrangement
const CUBE_POSITIONS: [number, number, number][] = [
  [0, 0, 0],     [1.05, 0, 0],    [-1.05, 0, 0],
  [0, 1.05, 0],  [1.05, 1.05, 0], [-1.05, 1.05, 0],
  [0, 0, -1.05], [1.05, 0, -1.05],[-1.05, 0, -1.05],
  [0, 1.05, -1.05],
  [0.525, 0.525, 0.525],
  [-0.525, 1.575, -0.525],
  [1.575, 0.525, -0.525],
  [-1.575, 0.525, 0.525],
  [0.525, -0.525, -0.525],
];

function CubeCluster() {
  const groupRef = useRef<THREE.Group>(null!);

  // Mouse tracking for interactive tilt
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // Normalize to -1 … +1
      mouseRef.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Build all geometries and materials once
  const assets = useMemo(() => {
    const box = new THREE.BoxGeometry(0.88, 0.88, 0.88);
    const edges = new THREE.EdgesGeometry(box);

    // Neural network nodes
    const nodeCount = 60;
    const nodePosArr = new Float32Array(nodeCount * 3);
    const nodeVecs: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 5.2,
        (Math.random() - 0.5) * 4.2,
        (Math.random() - 0.5) * 3.4
      );
      nodeVecs.push(v);
      nodePosArr[i * 3] = v.x;
      nodePosArr[i * 3 + 1] = v.y;
      nodePosArr[i * 3 + 2] = v.z;
    }
    const nodeG = new THREE.BufferGeometry();
    nodeG.setAttribute("position", new THREE.BufferAttribute(nodePosArr, 3));

    // Edges between close nodes
    const ev: number[] = [];
    const maxD = 2.0;
    for (let i = 0; i < nodeVecs.length; i++) {
      for (let j = i + 1; j < nodeVecs.length; j++) {
        if (nodeVecs[i].distanceTo(nodeVecs[j]) < maxD) {
          ev.push(
            nodeVecs[i].x, nodeVecs[i].y, nodeVecs[i].z,
            nodeVecs[j].x, nodeVecs[j].y, nodeVecs[j].z
          );
        }
      }
    }
    const edgeLineG = new THREE.BufferGeometry();
    edgeLineG.setAttribute("position", new THREE.BufferAttribute(new Float32Array(ev), 3));

    // Per-cube solid materials — brighter emissive
    const solidMats = CUBE_POSITIONS.map((_, i) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(i % 3 === 0 ? "#111130" : "#0c0c22"),
        metalness: 0.95,
        roughness: 0.1,
        emissive: new THREE.Color(i % 2 === 0 ? "#001840" : "#1a0035"),
        emissiveIntensity: 1.2,
      })
    );

    // Per-cube wireframe — brighter, more visible
    const wireMats = CUBE_POSITIONS.map((_, i) =>
      new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? "#00f2ff" : "#d020ff",
        transparent: true,
        opacity: i % 4 === 0 ? 0.85 : 0.45,
      })
    );

    // Teal nodes — larger + brighter
    const nodeMat = new THREE.PointsMaterial({
      color: "#00f2ff",
      size: 0.10,
      transparent: true,
      opacity: 1.0,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Edge lines — more visible
    const edgeLineMat = new THREE.LineBasicMaterial({
      color: "#00f2ff",
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
    });

    // Purple accent nodes
    const purpleCount = 30;
    const purplePos = new Float32Array(purpleCount * 3);
    for (let i = 0; i < purpleCount; i++) {
      purplePos[i * 3] = (Math.random() - 0.5) * 4.8;
      purplePos[i * 3 + 1] = (Math.random() - 0.5) * 3.8;
      purplePos[i * 3 + 2] = (Math.random() - 0.5) * 3.0;
    }
    const purpleNodeG = new THREE.BufferGeometry();
    purpleNodeG.setAttribute("position", new THREE.BufferAttribute(purplePos, 3));
    const purpleNodeMat = new THREE.PointsMaterial({
      color: "#d020ff",
      size: 0.07,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { box, edges, nodeG, edgeLineG, solidMats, wireMats, nodeMat, edgeLineMat, purpleNodeG, purpleNodeMat };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth mouse lerp
    mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.06;
    mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.06;

    // Base auto-rotation + mouse influence
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.1 + mouseRef.current.x * 0.4;
    groupRef.current.rotation.x = Math.sin(t * 0.28) * 0.08 + mouseRef.current.y * 0.25;
    groupRef.current.position.y = Math.sin(t * 0.45) * 0.14;
  });

  return (
    <group ref={groupRef}>
      {CUBE_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh geometry={assets.box} material={assets.solidMats[i]} />
          <lineSegments geometry={assets.edges} material={assets.wireMats[i]} />
        </group>
      ))}
      <points geometry={assets.nodeG} material={assets.nodeMat} />
      <lineSegments geometry={assets.edgeLineG} material={assets.edgeLineMat} />
      <points geometry={assets.purpleNodeG} material={assets.purpleNodeMat} />
    </group>
  );
}

export default function NeuralCubeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 7.5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%", cursor: "none" }}
    >
      {/* Brighter, richer lighting */}
      <ambientLight intensity={0.5} color="#4466ff" />
      <directionalLight position={[5, 5, 5]} color="#00f2ff" intensity={2.5} />
      <directionalLight position={[-4, -2, 3]} color="#d020ff" intensity={1.8} />
      <pointLight position={[0, 2, 5]} color="#00f2ff" intensity={3} distance={12} decay={2} />
      <pointLight position={[3, 4, 2]} color="#ffffff" intensity={1.0} distance={8} decay={2} />
      <CubeCluster />
    </Canvas>
  );
}
