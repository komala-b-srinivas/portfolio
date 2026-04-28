"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CUBE_POSITIONS: [number, number, number][] = [
  // Core 3×3 layer
  [0, 0, 0],      [1.1, 0, 0],     [-1.1, 0, 0],
  [0, 1.1, 0],    [1.1, 1.1, 0],   [-1.1, 1.1, 0],
  [0, 0, -1.1],   [1.1, 0, -1.1],  [-1.1, 0, -1.1],
  [0, 1.1, -1.1],
  // Extended arms
  [0.55, 0.55, 0.55],
  [-0.55, 1.65, -0.55],
  [1.65, 0.55, -0.55],
  [-1.65, 0.55, 0.55],
  [0.55, -0.55, -0.55],
  // Upper tier
  [0, 2.2, 0],
  [1.1, 2.2, -1.1],
  [-1.1, 0, -2.2],
  [2.2, 0, 0],
  [-1.1, 1.1, -1.1],
];

function CubeCluster() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const assets = useMemo(() => {
    const box = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const edgesGeom = new THREE.EdgesGeometry(box);

    // --- Neural nodes ---
    const nodeCount = 70;
    const positions = new Float32Array(nodeCount * 3);
    const nodeVecs: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 6.0,
        (Math.random() - 0.5) * 4.8,
        (Math.random() - 0.5) * 3.6
      );
      nodeVecs.push(v);
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
    }
    const baseNodeGeom = new THREE.BufferGeometry();
    baseNodeGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Reuse geometry for all bloom layers
    const midNodeGeom = baseNodeGeom.clone();
    const outerNodeGeom = baseNodeGeom.clone();

    // --- Neural edges ---
    const ev: number[] = [];
    for (let i = 0; i < nodeVecs.length; i++) {
      for (let j = i + 1; j < nodeVecs.length; j++) {
        if (nodeVecs[i].distanceTo(nodeVecs[j]) < 2.1) {
          ev.push(nodeVecs[i].x, nodeVecs[i].y, nodeVecs[i].z,
                  nodeVecs[j].x, nodeVecs[j].y, nodeVecs[j].z);
        }
      }
    }
    const edgeLineGeom = new THREE.BufferGeometry();
    edgeLineGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(ev), 3));

    // --- Purple accent nodes ---
    const purpleCount = 35;
    const purplePos = new Float32Array(purpleCount * 3);
    const purpleVecs: THREE.Vector3[] = [];
    for (let i = 0; i < purpleCount; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 4.2,
        (Math.random() - 0.5) * 3.2
      );
      purpleVecs.push(v);
      purplePos[i * 3] = v.x; purplePos[i * 3 + 1] = v.y; purplePos[i * 3 + 2] = v.z;
    }
    const purpleGeom = new THREE.BufferGeometry();
    purpleGeom.setAttribute("position", new THREE.BufferAttribute(purplePos, 3));
    const purpleMidGeom = purpleGeom.clone();

    // Purple edges
    const pev: number[] = [];
    for (let i = 0; i < purpleVecs.length; i++) {
      for (let j = i + 1; j < purpleVecs.length; j++) {
        if (purpleVecs[i].distanceTo(purpleVecs[j]) < 1.8) {
          pev.push(purpleVecs[i].x, purpleVecs[i].y, purpleVecs[i].z,
                   purpleVecs[j].x, purpleVecs[j].y, purpleVecs[j].z);
        }
      }
    }
    const purpleEdgeGeom = new THREE.BufferGeometry();
    purpleEdgeGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pev), 3));

    // --- Per-cube materials ---
    const solidMats = CUBE_POSITIONS.map((_, i) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(i % 4 === 0 ? "#0e0e2a" : i % 4 === 1 ? "#08082a" : "#0a0a20"),
        metalness: 0.98,
        roughness: 0.08,
        emissive: new THREE.Color(i % 3 === 0 ? "#001850" : i % 3 === 1 ? "#1a0040" : "#000030"),
        emissiveIntensity: 1.5,
      })
    );
    const wireMats = CUBE_POSITIONS.map((_, i) =>
      new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? "#00f2ff" : "#cc20ff",
        transparent: true,
        opacity: i % 5 === 0 ? 1.0 : i % 3 === 0 ? 0.65 : 0.35,
      })
    );

    // --- Fake bloom: 3 point layers ---
    // Core: small, fully opaque
    const coreMat = new THREE.PointsMaterial({
      color: "#00f2ff", size: 0.07, transparent: true, opacity: 1.0,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    // Mid: medium, semi-transparent
    const midMat = new THREE.PointsMaterial({
      color: "#00f2ff", size: 0.18, transparent: true, opacity: 0.28,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    // Outer: large, very transparent
    const outerMat = new THREE.PointsMaterial({
      color: "#88ffff", size: 0.38, transparent: true, opacity: 0.1,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });

    // Purple bloom layers
    const purpleCoreMat = new THREE.PointsMaterial({
      color: "#cc20ff", size: 0.06, transparent: true, opacity: 0.95,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const purpleMidMat = new THREE.PointsMaterial({
      color: "#cc20ff", size: 0.20, transparent: true, opacity: 0.22,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });

    // Edge materials
    const edgeLineMat = new THREE.LineBasicMaterial({
      color: "#00f2ff", transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const purpleEdgeMat = new THREE.LineBasicMaterial({
      color: "#cc20ff", transparent: true, opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    return {
      box, edgesGeom,
      baseNodeGeom, midNodeGeom, outerNodeGeom,
      edgeLineGeom,
      purpleGeom, purpleMidGeom, purpleEdgeGeom,
      solidMats, wireMats,
      coreMat, midMat, outerMat,
      purpleCoreMat, purpleMidMat,
      edgeLineMat, purpleEdgeMat,
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.05;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.09 + mouseRef.current.x * 0.45;
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.07 + mouseRef.current.y * 0.28;
    groupRef.current.position.y = Math.sin(t * 0.42) * 0.16;
  });

  return (
    <group ref={groupRef}>
      {/* Cube cluster */}
      {CUBE_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh geometry={assets.box} material={assets.solidMats[i]} />
          <lineSegments geometry={assets.edgesGeom} material={assets.wireMats[i]} />
        </group>
      ))}

      {/* Teal neural edges */}
      <lineSegments geometry={assets.edgeLineGeom} material={assets.edgeLineMat} />
      {/* Purple neural edges */}
      <lineSegments geometry={assets.purpleEdgeGeom} material={assets.purpleEdgeMat} />

      {/* Teal nodes — 3-layer fake bloom */}
      <points geometry={assets.outerNodeGeom} material={assets.outerMat} />
      <points geometry={assets.midNodeGeom} material={assets.midMat} />
      <points geometry={assets.baseNodeGeom} material={assets.coreMat} />

      {/* Purple nodes — 2-layer bloom */}
      <points geometry={assets.purpleMidGeom} material={assets.purpleMidMat} />
      <points geometry={assets.purpleGeom} material={assets.purpleCoreMat} />
    </group>
  );
}

export default function NeuralCubeScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.0, 8.0], fov: 52 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} color="#3355ff" />
      <directionalLight position={[6, 6, 4]} color="#00f2ff" intensity={3.5} />
      <directionalLight position={[-5, -3, 3]} color="#cc20ff" intensity={2.5} />
      <pointLight position={[0, 2, 6]} color="#00f2ff" intensity={4} distance={14} decay={2} />
      <pointLight position={[-3, 4, 2]} color="#cc20ff" intensity={2.5} distance={10} decay={2} />
      <pointLight position={[4, 1, 1]} color="#ffffff" intensity={1.2} distance={8} decay={2} />
      <CubeCluster />
    </Canvas>
  );
}
