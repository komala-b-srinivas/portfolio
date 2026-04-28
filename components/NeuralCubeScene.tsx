"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Reduced to 12 cubes (was 20) — same visual cluster, much fewer draw calls
const CUBE_POSITIONS: [number, number, number][] = [
  [0, 0, 0],     [1.1, 0, 0],    [-1.1, 0, 0],
  [0, 1.1, 0],   [1.1, 1.1, 0],  [-1.1, 1.1, 0],
  [0, 0, -1.1],  [1.1, 0, -1.1],
  [0, 1.1, -1.1],
  [0.55, 0.55, 0.55],
  [1.65, 0.55, -0.55],
  [-1.65, 0.55, 0.55],
];

function CubeCluster() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const fpsRef = useRef(0);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const assets = useMemo(() => {
    const box = new THREE.BoxGeometry(0.88, 0.88, 0.88);
    const edgesGeom = new THREE.EdgesGeometry(box);

    // Single node cloud — 35 nodes (was 70 + 35 + clones = 6 point clouds)
    const nodeCount = 35;
    const nodePos = new Float32Array(nodeCount * 3);
    const nodeVecs: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 4.2,
        (Math.random() - 0.5) * 3.2
      );
      nodeVecs.push(v);
      nodePos[i * 3] = v.x;
      nodePos[i * 3 + 1] = v.y;
      nodePos[i * 3 + 2] = v.z;
    }
    const nodeGeom = new THREE.BufferGeometry();
    nodeGeom.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));

    // Edges
    const ev: number[] = [];
    for (let i = 0; i < nodeVecs.length; i++) {
      for (let j = i + 1; j < nodeVecs.length; j++) {
        if (nodeVecs[i].distanceTo(nodeVecs[j]) < 2.0) {
          ev.push(nodeVecs[i].x, nodeVecs[i].y, nodeVecs[i].z,
                  nodeVecs[j].x, nodeVecs[j].y, nodeVecs[j].z);
        }
      }
    }
    const edgeLineGeom = new THREE.BufferGeometry();
    edgeLineGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(ev), 3));

    // Per-cube materials (shared geometry, unique materials)
    const solidMats = CUBE_POSITIONS.map((_, i) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(i % 2 === 0 ? "#0d0d28" : "#090920"),
        metalness: 0.95,
        roughness: 0.1,
        emissive: new THREE.Color(i % 3 === 0 ? "#001840" : "#0f0030"),
        emissiveIntensity: 1.0,
      })
    );
    const wireMats = CUBE_POSITIONS.map((_, i) =>
      new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? "#00f2ff" : "#cc20ff",
        transparent: true,
        opacity: i % 3 === 0 ? 0.9 : 0.4,
      })
    );

    // Single point material — larger size compensates for no bloom layers
    const nodeMat = new THREE.PointsMaterial({
      color: "#00f2ff",
      size: 0.12,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const edgeLineMat = new THREE.LineBasicMaterial({
      color: "#00f2ff",
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    return { box, edgesGeom, nodeGeom, edgeLineGeom, solidMats, wireMats, nodeMat, edgeLineMat };
  }, []);

  useFrame((state) => {
    // Cap to ~30fps to prevent lag
    const now = state.clock.elapsedTime;
    if (now - fpsRef.current < 0.033) return;
    fpsRef.current = now;

    if (!groupRef.current) return;
    mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.05;

    groupRef.current.rotation.y = now * 0.09 + mouseRef.current.x * 0.4;
    groupRef.current.rotation.x = Math.sin(now * 0.25) * 0.07 + mouseRef.current.y * 0.25;
    groupRef.current.position.y = Math.sin(now * 0.42) * 0.14;
  });

  return (
    <group ref={groupRef}>
      {CUBE_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh geometry={assets.box} material={assets.solidMats[i]} />
          <lineSegments geometry={assets.edgesGeom} material={assets.wireMats[i]} />
        </group>
      ))}
      <lineSegments geometry={assets.edgeLineGeom} material={assets.edgeLineMat} />
      <points geometry={assets.nodeGeom} material={assets.nodeMat} />
    </group>
  );
}

export default function NeuralCubeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 7.5], fov: 52 }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}           // cap pixel ratio — huge perf win on Retina
      style={{ width: "100%", height: "100%" }}
    >
      {/* 2 lights only (was 5-6) */}
      <ambientLight intensity={0.5} color="#3355ff" />
      <directionalLight position={[5, 5, 4]} color="#00f2ff" intensity={3.0} />
      <directionalLight position={[-4, -2, 3]} color="#cc20ff" intensity={2.0} />
      <CubeCluster />
    </Canvas>
  );
}
