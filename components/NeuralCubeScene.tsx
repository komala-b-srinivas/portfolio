"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Cube cluster positions — isometric-style arrangement
const CUBE_POSITIONS: [number, number, number][] = [
  [0, 0, 0],      [1.05, 0, 0],   [-1.05, 0, 0],
  [0, 1.05, 0],   [1.05, 1.05, 0],[-1.05, 1.05, 0],
  [0, 0, -1.05],  [1.05, 0, -1.05],[-1.05, 0, -1.05],
  [0, 1.05, -1.05],
  [0.525, 0.525, 0.525],
  [-0.525, 1.575, -0.525],
  [1.575, 0.525, -0.525],
  [-1.575, 0.525, 0.525],
  [0.525, -0.525, -0.525],
];

function CubeCluster() {
  const groupRef = useRef<THREE.Group>(null!);

  // Build all geometries and materials once
  const assets = useMemo(() => {
    const box = new THREE.BoxGeometry(0.88, 0.88, 0.88);
    const edges = new THREE.EdgesGeometry(box);

    // Neural network nodes
    const nodeCount = 50;
    const nodePosArr = new Float32Array(nodeCount * 3);
    const nodeVecs: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 5.0,
        (Math.random() - 0.5) * 4.0,
        (Math.random() - 0.5) * 3.2
      );
      nodeVecs.push(v);
      nodePosArr[i * 3] = v.x;
      nodePosArr[i * 3 + 1] = v.y;
      nodePosArr[i * 3 + 2] = v.z;
    }
    const nodeG = new THREE.BufferGeometry();
    nodeG.setAttribute("position", new THREE.BufferAttribute(nodePosArr, 3));

    // Build edges between close nodes
    const ev: number[] = [];
    const maxD = 1.9;
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

    // Per-cube solid materials
    const solidMats = CUBE_POSITIONS.map((_, i) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(i % 3 === 0 ? "#0d0d26" : "#09091c"),
        metalness: 0.9,
        roughness: 0.15,
        emissive: new THREE.Color(i % 2 === 0 ? "#000520" : "#0a001a"),
        emissiveIntensity: 0.8,
      })
    );

    // Per-cube wireframe materials
    const wireMats = CUBE_POSITIONS.map((_, i) =>
      new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? "#00f2ff" : "#bc13fe",
        transparent: true,
        opacity: i % 4 === 0 ? 0.7 : 0.28,
      })
    );

    // Node point material
    const nodeMat = new THREE.PointsMaterial({
      color: "#00f2ff",
      size: 0.065,
      transparent: true,
      opacity: 0.92,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Edge line material
    const edgeLineMat = new THREE.LineBasicMaterial({
      color: "#00f2ff",
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });

    // Purple nodes (second layer, offset)
    const purpleNodeCount = 25;
    const purplePos = new Float32Array(purpleNodeCount * 3);
    for (let i = 0; i < purpleNodeCount; i++) {
      purplePos[i * 3] = (Math.random() - 0.5) * 4.5;
      purplePos[i * 3 + 1] = (Math.random() - 0.5) * 3.6;
      purplePos[i * 3 + 2] = (Math.random() - 0.5) * 2.8;
    }
    const purpleNodeG = new THREE.BufferGeometry();
    purpleNodeG.setAttribute("position", new THREE.BufferAttribute(purplePos, 3));
    const purpleNodeMat = new THREE.PointsMaterial({
      color: "#bc13fe",
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return {
      box, edges, nodeG, edgeLineG,
      solidMats, wireMats, nodeMat, edgeLineMat,
      purpleNodeG, purpleNodeMat,
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.07;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.14;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cube cluster */}
      {CUBE_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh geometry={assets.box} material={assets.solidMats[i]} />
          <lineSegments geometry={assets.edges} material={assets.wireMats[i]} />
        </group>
      ))}

      {/* Neural nodes — teal */}
      <points geometry={assets.nodeG} material={assets.nodeMat} />

      {/* Neural edges */}
      <lineSegments geometry={assets.edgeLineG} material={assets.edgeLineMat} />

      {/* Neural nodes — purple */}
      <points geometry={assets.purpleNodeG} material={assets.purpleNodeMat} />
    </group>
  );
}

export default function NeuralCubeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 7.5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.35} color="#6060ff" />
      <directionalLight position={[5, 5, 5]} color="#00f2ff" intensity={1.2} />
      <directionalLight position={[-4, -2, 3]} color="#bc13fe" intensity={0.8} />
      <pointLight position={[0, 3, 4]} color="#ffffff" intensity={0.6} />
      <CubeCluster />
    </Canvas>
  );
}
