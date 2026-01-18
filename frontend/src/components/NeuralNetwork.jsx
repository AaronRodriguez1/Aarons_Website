import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function CameraRig({ target, distance, mode, introActive, introDirection }) {
  const { camera } = useThree();
  const controlsRef = useRef(null);
  const targetVec = useMemo(() => new THREE.Vector3(), []);
  const goalPos = useMemo(() => new THREE.Vector3(), []);
  const isoOffset = useMemo(() => new THREE.Vector3(6.5, 5.2, 6.5), []);
  const sideOffset = useMemo(() => new THREE.Vector3(1, 0, 0), []);

  useEffect(() => {
    if (target) {
      targetVec.set(target[0], target[1], target[2]);
    }
  }, [target, targetVec]);

  useFrame(() => {
    if (!controlsRef.current) return;
    const zoomFactor = distance / 12;
    const offset = mode === 'side' ? sideOffset : isoOffset;
    goalPos.copy(targetVec).addScaledVector(offset, zoomFactor);
    camera.position.lerp(goalPos, 0.08);
    controlsRef.current.target.lerp(targetVec, 0.12);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableRotate={introActive}
      autoRotate={introActive}
      autoRotateSpeed={introDirection * 0.25}
      enableDamping
      dampingFactor={0.08}
      minDistance={6}
      maxDistance={100}
      rotateSpeed={0.6}
    />
  );
}

function NeuralNode({ node, activeLayerId, selectedNodeId, onSelect }) {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const isActive = node.layerId === activeLayerId;
  const isSelected = node.id === selectedNodeId;
  const baseScale = node.type === 'project' ? 1.1 : 0.9;

  const color = useMemo(() => {
    if (node.type === 'project') return new THREE.Color('#67d5ff');
    if (node.type === 'skill') return new THREE.Color('#f6c34a');
    if (node.type === 'contact') return new THREE.Color('#ff8a3d');
    return new THREE.Color('#b5c6ff');
  }, [node.type]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse =
      0.08 * Math.sin(clock.elapsedTime * 2.2 + node.position[0] + node.position[1]);
    const hoverBoost = hovered || isSelected ? 0.18 : 0;
    const activeBoost = isActive ? 0.08 : 0;
    const scale = baseScale + pulse + hoverBoost + activeBoost;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(node)}
      >
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 0.8 : 0.35}
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>
      {(hovered ||
        isSelected ||
        isActive ||
        (activeLayerId === 'hidden-projects' && node.layerId === 'hidden-skills')) && (
        <Html center distanceFactor={10} className="neural-label">
          <div>{node.label}</div>
        </Html>
      )}
    </group>
  );
}

function NetworkEdges({ edges, activeLayerId }) {
  return (
    <group>
      {edges.map(edge => {
        if (
          activeLayerId === 'hidden-projects' &&
          (edge.fromLayer === 'output' || edge.toLayer === 'output')
        ) {
          return null;
        }
        const isActive = edge.fromLayer === activeLayerId || edge.toLayer === activeLayerId;
        const color = isActive ? '#9ff2ff' : '#243247';
        const opacity = isActive ? 0.9 : 0.4;

        return (
          <line key={edge.id}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([...edge.from, ...edge.to])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial transparent color={color} opacity={opacity} />
          </line>
        );
      })}
    </group>
  );
}

export function NeuralNetwork({
  nodes,
  edges,
  activeLayerId,
  selectedNodeId,
  layerCenters,
  layerFocus,
  focusTarget,
  focusDistance,
  onNodeSelect,
  onClearSelection,
}) {
  const resolvedDistance = focusDistance ?? (layerFocus[activeLayerId] || 12);
  const viewMode =
    activeLayerId === 'hidden-skills' || activeLayerId === 'hidden-projects'
      ? 'side'
      : 'iso';
  const [introActive, setIntroActive] = useState(true);
  const [introDirection, setIntroDirection] = useState(1);

  useEffect(() => {
    const forwardTimer = setTimeout(() => setIntroDirection(-1), 2000);
    const stopTimer = setTimeout(() => setIntroActive(false), 4000);
    return () => {
      clearTimeout(forwardTimer);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <div className="neural-canvas">
      <Canvas
        camera={{ position: [0, 0, resolvedDistance], fov: 55 }}
        onPointerMissed={() => onClearSelection()}
      >
        <color attach="background" args={['#05060b']} />
        <fog attach="fog" args={['#05060b', 8, 24]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[6, 6, 6]} intensity={1.2} />
        <pointLight position={[-8, -6, 4]} intensity={0.6} />
        <NetworkEdges edges={edges} activeLayerId={activeLayerId} />
        {nodes.map(node => (
          <NeuralNode
            key={node.id}
            node={node}
            activeLayerId={activeLayerId}
            selectedNodeId={selectedNodeId}
            onSelect={onNodeSelect}
          />
        ))}
        <CameraRig
          target={focusTarget}
          distance={resolvedDistance}
          mode={viewMode}
          introActive={introActive}
          introDirection={introDirection}
        />
      </Canvas>
    </div>
  );
}
