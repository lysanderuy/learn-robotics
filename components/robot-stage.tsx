"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Group, Mesh } from "three";

type RobotMode = "viewer" | "parts" | "exploded";

type RobotPart = {
  id: string;
  label: string;
  position: [number, number, number];
  exploded: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  shape: "box" | "cylinder" | "sphere";
};

const parts: RobotPart[] = [
  {
    id: "core",
    label: "Core Chassis",
    position: [0, 0, 0],
    exploded: [0, 0, 0],
    scale: [1.8, 0.7, 1.2],
    color: "#d9dee8",
    shape: "box",
  },
  {
    id: "sensor",
    label: "Vision Mast",
    position: [0, 1.15, 0.2],
    exploded: [0, 1.8, 0.45],
    scale: [0.35, 0.35, 0.35],
    color: "#57d6ff",
    shape: "sphere",
  },
  {
    id: "arm-left",
    label: "Left Servo Arm",
    position: [-1.35, 0.4, 0],
    exploded: [-2.05, 0.95, 0.1],
    scale: [0.35, 1.4, 0.35],
    rotation: [0, 0, 0.45],
    color: "#ff9b62",
    shape: "box",
  },
  {
    id: "arm-right",
    label: "Right Servo Arm",
    position: [1.35, 0.4, 0],
    exploded: [2.05, 0.95, 0.1],
    scale: [0.35, 1.4, 0.35],
    rotation: [0, 0, -0.45],
    color: "#ff9b62",
    shape: "box",
  },
  {
    id: "mobility",
    label: "Mobility Base",
    position: [0, -1.05, 0],
    exploded: [0, -1.9, 0],
    scale: [1.25, 0.45, 1.25],
    color: "#7d8aa8",
    shape: "cylinder",
  },
];

function PartMesh({
  part,
  mode,
  activePart,
  animate,
}: {
  part: RobotPart;
  mode: RobotMode;
  activePart: string;
  animate: boolean;
}) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    const target = mode === "exploded" ? part.exploded : part.position;
    ref.current.position.x += (target[0] - ref.current.position.x) * 0.08;
    ref.current.position.y += (target[1] - ref.current.position.y) * 0.08;
    ref.current.position.z += (target[2] - ref.current.position.z) * 0.08;

    if (animate && (part.id === "arm-left" || part.id === "arm-right")) {
      const direction = part.id === "arm-left" ? 1 : -1;
      ref.current.rotation.z = direction * (0.45 + Math.sin(state.clock.elapsedTime * 1.8) * 0.25);
    } else if (part.rotation) {
      ref.current.rotation.set(part.rotation[0], part.rotation[1], part.rotation[2]);
    }

    if (animate && part.id === "sensor") {
      ref.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });

  const opacity = activePart === "all" || activePart === part.id ? 1 : 0.25;
  const emissive = activePart === part.id ? "#57d6ff" : "#000000";

  if (part.shape === "sphere") {
    return (
      <mesh ref={ref} position={part.position} scale={part.scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={part.color} emissive={emissive} emissiveIntensity={0.6} transparent opacity={opacity} />
      </mesh>
    );
  }

  if (part.shape === "cylinder") {
    return (
      <mesh ref={ref} position={part.position} scale={part.scale}>
        <cylinderGeometry args={[1, 1, 1, 48]} />
        <meshStandardMaterial color={part.color} emissive={emissive} emissiveIntensity={0.45} metalness={0.55} roughness={0.35} transparent opacity={opacity} />
      </mesh>
    );
  }

  return (
    <mesh ref={ref} position={part.position} scale={part.scale} rotation={part.rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={part.color} emissive={emissive} emissiveIntensity={0.45} metalness={0.5} roughness={0.25} transparent opacity={opacity} />
    </mesh>
  );
}

function RobotAssembly({
  mode,
  activePart,
  animate,
}: {
  mode: RobotMode;
  activePart: string;
  animate: boolean;
}) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  const beams = useMemo(
    () =>
      [
        [-1.5, 0, 0],
        [1.5, 0, 0],
        [0, 1.35, 0],
        [0, -1.35, 0],
      ] as const,
    [],
  );

  return (
    <group ref={group}>
      {parts.map((part) => (
        <PartMesh key={part.id} part={part} mode={mode} activePart={activePart} animate={animate} />
      ))}

      {beams.map((beam) => (
        <mesh key={beam.join("-")} position={beam as [number, number, number]} scale={[0.06, 3.1, 0.06]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#57d6ff" emissive="#57d6ff" emissiveIntensity={0.9} transparent opacity={0.22} />
        </mesh>
      ))}
    </group>
  );
}

export function RobotStage({
  mode,
  activePart,
  animate,
}: {
  mode: RobotMode;
  activePart: string;
  animate: boolean;
}) {
  return (
    <Canvas camera={{ position: [4.4, 2.9, 5.4], fov: 42 }}>
      <color attach="background" args={["#07111f"]} />
      <fog attach="fog" args={["#07111f", 7, 14]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-2, 2, -3]} intensity={1.2} color="#57d6ff" />
      <pointLight position={[0, 2, 3]} intensity={12} distance={8} color="#ff9b62" />
      <RobotAssembly mode={mode} activePart={activePart} animate={animate} />
      <mesh position={[0, -1.95, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[10, 10, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshStandardMaterial color="#08101a" metalness={0.4} roughness={0.85} />
      </mesh>
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={9}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
