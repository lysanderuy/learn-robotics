"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Group } from "three";

type RobotMode = "viewer" | "parts" | "exploded";
type Vec3 = [number, number, number];

type VisualState = {
  opacity: number;
  emissive: string;
  emissiveIntensity: number;
};

const cyan = "#57d6ff";
const orange = "#ff9b62";
const shellDark = "#171c23";
const shellMid = "#272f38";
const shellPlate = "#0e141b";
const boardBlue = "#2467d8";
const batteryBlack = "#101318";
const motorGold = "#c7aa57";
const motorCap = "#d6dae1";
const wheelGrey = "#d8dde6";
const wheelHub = "#252a31";
const wireRed = "#ff6a4d";
const wireBlue = "#54bfff";
const wireYellow = "#ffd95c";

function addOffset(position: Vec3, offset: Vec3): Vec3 {
  return [position[0] + offset[0], position[1] + offset[1], position[2] + offset[2]];
}

function getPartOffset(mode: RobotMode, offset: Vec3): Vec3 {
  return mode === "exploded" ? offset : [0, 0, 0];
}

function getVisualState(activePart: string, partIds: string[], mode?: RobotMode): VisualState {
  const active = activePart === "all" || partIds.includes(activePart);
  const focused = activePart !== "all" && partIds.includes(activePart);
  const fadedCore = mode === "parts" && partIds.includes("core");

  return {
    opacity: fadedCore ? 0.16 : active ? 1 : 0.14,
    emissive: focused ? cyan : "#000000",
    emissiveIntensity: focused ? 0.42 : 0,
  };
}

function Material({ color, state, metalness = 0.25, roughness = 0.6 }: { color: string; state: VisualState; metalness?: number; roughness?: number }) {
  return <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} transparent opacity={state.opacity} emissive={state.emissive} emissiveIntensity={state.emissiveIntensity} />;
}

function WireRun({ color, state, points }: { color: string; state: VisualState; points: Vec3[] }) {
  return (
    <group>
      {points.map((point, index) => {
        if (index === points.length - 1) return null;
        const next = points[index + 1];
        const dx = next[0] - point[0];
        const dy = next[1] - point[1];
        const dz = next[2] - point[2];
        const dominant = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));
        const axis = Math.abs(dx) >= Math.abs(dz) ? "x" : "z";
        const position: Vec3 = [(point[0] + next[0]) / 2, (point[1] + next[1]) / 2, (point[2] + next[2]) / 2];
        const scale: Vec3 = axis === "x" ? [dominant, 0.018, 0.018] : [0.018, 0.018, dominant];
        const vertical = Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > Math.abs(dz);
        return (
          <mesh key={`${color}-${index}`} position={position}>
            <boxGeometry args={vertical ? [0.018, dominant, 0.018] : scale} />
            <meshStandardMaterial color={color} metalness={0.08} roughness={0.55} transparent opacity={state.opacity} emissive={color} emissiveIntensity={0.1} />
          </mesh>
        );
      })}
    </group>
  );
}

function RobotModel({ mode, activePart, animate }: { mode: RobotMode; activePart: string; animate: boolean }) {
  const root = useRef<Group>(null);
  const leftWheel = useRef<Group>(null);
  const rightWheel = useRef<Group>(null);

  const chassisState = getVisualState(activePart, ["core"], mode);
  const boardState = getVisualState(activePart, ["sensor"]);
  const leftState = getVisualState(activePart, ["arm-left"]);
  const rightState = getVisualState(activePart, ["arm-right"]);
  const mobilityState = getVisualState(activePart, ["mobility"]);

  const shellOffset = getPartOffset(mode, [0, 0.12, 0.14]);
  const coverOffset = getPartOffset(mode, [0, 0.38, 0.14]);
  const boardOffset = getPartOffset(mode, [0, 0.16, 0.0]);
  const batteryOffset = getPartOffset(mode, [0, 0.05, 0.3]);
  const leftMotorOffset = getPartOffset(mode, [-0.52, 0.0, 0.12]);
  const rightMotorOffset = getPartOffset(mode, [0.52, 0.0, 0.12]);
  const leftWheelOffset = getPartOffset(mode, [-0.86, -0.02, 0.08]);
  const rightWheelOffset = getPartOffset(mode, [0.86, -0.02, 0.08]);

  const glowBars = useMemo(
    () => [
      { position: [0, -0.24, 0.02] as Vec3, scale: [2.05, 0.01, 0.05] as Vec3 },
      { position: [0, -0.24, 0.72] as Vec3, scale: [2.05, 0.01, 0.05] as Vec3 },
    ],
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (root.current) {
      root.current.rotation.y = Math.sin(t * 0.22) * 0.11;
      root.current.rotation.x = -0.1 + Math.sin(t * 0.28) * 0.01;
      root.current.position.y = Math.sin(t * 0.4) * 0.012;
    }

    if (animate) {
      if (leftWheel.current) leftWheel.current.rotation.z = t * 3.1;
      if (rightWheel.current) rightWheel.current.rotation.z = -t * 3.1;
    }
  });

  return (
    <group ref={root} position={[0, -0.18, 0]}>
      <group position={shellOffset}>
        <mesh position={[0, -0.2, 0.08]}>
          <boxGeometry args={[1.58, 0.08, 1.08]} />
          <Material color={shellDark} state={chassisState} metalness={0.28} roughness={0.72} />
        </mesh>
        <mesh position={[0, -0.01, 0.46]}>
          <boxGeometry args={[1.58, 0.24, 0.08]} />
          <Material color={shellMid} state={chassisState} metalness={0.28} roughness={0.66} />
        </mesh>
        <mesh position={[0, -0.01, 0.06]}>
          <boxGeometry args={[1.58, 0.24, 0.08]} />
          <Material color={shellMid} state={chassisState} metalness={0.28} roughness={0.66} />
        </mesh>
        <mesh position={[-0.75, -0.01, 0.26]}>
          <boxGeometry args={[0.08, 0.24, 0.48]} />
          <Material color={shellMid} state={chassisState} metalness={0.28} roughness={0.66} />
        </mesh>
        <mesh position={[0.75, -0.01, 0.26]}>
          <boxGeometry args={[0.08, 0.24, 0.48]} />
          <Material color={shellMid} state={chassisState} metalness={0.28} roughness={0.66} />
        </mesh>
        <mesh position={[0, 0.0, -0.42]} rotation={[-0.55, 0, 0]}>
          <boxGeometry args={[1.38, 0.05, 0.42]} />
          <Material color={shellPlate} state={chassisState} metalness={0.24} roughness={0.74} />
        </mesh>
        <mesh position={[0, 0.06, -0.58]}>
          <boxGeometry args={[1.3, 0.08, 0.08]} />
          <Material color={shellMid} state={chassisState} metalness={0.28} roughness={0.66} />
        </mesh>
        <mesh position={[0, 0.06, -0.63]}>
          <boxGeometry args={[0.34, 0.09, 0.05]} />
          <meshStandardMaterial color="#1c2530" metalness={0.3} roughness={0.62} transparent opacity={chassisState.opacity} emissive={activePart === "core" ? cyan : "#000000"} emissiveIntensity={activePart === "core" ? 0.12 : 0} />
        </mesh>
      </group>

      <group position={coverOffset}>
        <mesh>
          <boxGeometry args={[1.28, 0.04, 0.72]} />
          <meshStandardMaterial color="#222a34" metalness={0.34} roughness={0.5} transparent opacity={mode === "parts" ? 0.04 : chassisState.opacity * 0.86} emissive={activePart === "core" ? cyan : "#000000"} emissiveIntensity={activePart === "core" ? 0.18 : 0} />
        </mesh>
      </group>

      <group position={boardOffset}>
        <mesh position={[0, 0.02, 0.05]}>
          <boxGeometry args={[0.78, 0.04, 0.32]} />
          <Material color={boardBlue} state={boardState} metalness={0.18} roughness={0.56} />
        </mesh>
        <mesh position={[0.18, 0.065, 0.03]}>
          <boxGeometry args={[0.28, 0.06, 0.16]} />
          <meshStandardMaterial color="#1e3047" metalness={0.2} roughness={0.58} transparent opacity={boardState.opacity} />
        </mesh>
        <mesh position={[-0.18, 0.075, 0.02]}>
          <boxGeometry args={[0.18, 0.08, 0.24]} />
          <meshStandardMaterial color="#1b2432" metalness={0.22} roughness={0.6} transparent opacity={boardState.opacity} />
        </mesh>
        {[-0.27, -0.17, -0.07, 0.03, 0.13, 0.23, 0.33].map((x) => (
          <mesh key={x} position={[x, 0.085, 0.16]}>
            <boxGeometry args={[0.022, 0.12, 0.022]} />
            <meshStandardMaterial color="#d7dce6" metalness={0.85} roughness={0.2} transparent opacity={boardState.opacity} />
          </mesh>
        ))}
        <mesh position={[-0.32, 0.065, -0.03]}>
          <boxGeometry args={[0.08, 0.05, 0.07]} />
          <meshStandardMaterial color="#b6243f" metalness={0.18} roughness={0.62} transparent opacity={boardState.opacity} emissive="#b6243f" emissiveIntensity={0.1} />
        </mesh>
      </group>

      <group position={batteryOffset}>
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.82, 0.12, 0.28]} />
          <Material color={batteryBlack} state={mobilityState} metalness={0.16} roughness={0.82} />
        </mesh>
        <mesh position={[-0.18, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.085, 0.085, 0.56, 28]} />
          <meshStandardMaterial color="#12161d" metalness={0.22} roughness={0.72} transparent opacity={mobilityState.opacity} />
        </mesh>
        <mesh position={[0.18, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.085, 0.085, 0.56, 28]} />
          <meshStandardMaterial color="#12161d" metalness={0.22} roughness={0.72} transparent opacity={mobilityState.opacity} />
        </mesh>
      </group>

      <group position={leftMotorOffset}>
        <mesh>
          <boxGeometry args={[0.26, 0.16, 0.14]} />
          <meshStandardMaterial color={motorGold} metalness={0.64} roughness={0.28} transparent opacity={leftState.opacity} emissive={leftState.emissive} emissiveIntensity={leftState.emissiveIntensity} />
        </mesh>
        <mesh position={[-0.16, 0, 0]}>
          <boxGeometry args={[0.09, 0.1, 0.1]} />
          <meshStandardMaterial color={motorCap} metalness={0.22} roughness={0.48} transparent opacity={leftState.opacity} />
        </mesh>
      </group>

      <group position={rightMotorOffset}>
        <mesh>
          <boxGeometry args={[0.26, 0.16, 0.14]} />
          <meshStandardMaterial color={motorGold} metalness={0.64} roughness={0.28} transparent opacity={rightState.opacity} emissive={rightState.emissive} emissiveIntensity={rightState.emissiveIntensity} />
        </mesh>
        <mesh position={[0.16, 0, 0]}>
          <boxGeometry args={[0.09, 0.1, 0.1]} />
          <meshStandardMaterial color={motorCap} metalness={0.22} roughness={0.48} transparent opacity={rightState.opacity} />
        </mesh>
      </group>

      <group ref={leftWheel} position={leftWheelOffset}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.19, 40]} />
          <meshStandardMaterial color={wheelGrey} metalness={0.14} roughness={0.34} transparent opacity={mobilityState.opacity} emissive={mobilityState.emissive} emissiveIntensity={mobilityState.emissiveIntensity} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.21, 32]} />
          <meshStandardMaterial color={wheelHub} metalness={0.42} roughness={0.34} transparent opacity={mobilityState.opacity} />
        </mesh>
      </group>

      <group ref={rightWheel} position={rightWheelOffset}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.19, 40]} />
          <meshStandardMaterial color={wheelGrey} metalness={0.14} roughness={0.34} transparent opacity={mobilityState.opacity} emissive={mobilityState.emissive} emissiveIntensity={mobilityState.emissiveIntensity} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.21, 32]} />
          <meshStandardMaterial color={wheelHub} metalness={0.42} roughness={0.34} transparent opacity={mobilityState.opacity} />
        </mesh>
      </group>

      <WireRun color={wireRed} state={boardState} points={[addOffset([0.26, 0.05, 0.02], boardOffset), addOffset([0.38, 0.05, 0.02], boardOffset), addOffset([0.38, 0.09, 0.06], batteryOffset)]} />
      <WireRun color={wireBlue} state={boardState} points={[addOffset([-0.24, 0.05, 0.05], boardOffset), addOffset([-0.42, 0.05, 0.05], boardOffset), addOffset([0.06, 0.0, 0.0], leftMotorOffset)]} />
      <WireRun color={wireYellow} state={boardState} points={[addOffset([0.08, 0.05, 0.05], boardOffset), addOffset([0.42, 0.05, 0.05], boardOffset), addOffset([-0.06, 0.0, 0.0], rightMotorOffset)]} />

      {mode !== "parts" &&
        glowBars.map((bar) => (
          <mesh key={bar.position.join("-")} position={bar.position} scale={bar.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={cyan} emissive={cyan} emissiveIntensity={0.85} transparent opacity={0.1} />
          </mesh>
        ))}
    </group>
  );
}

export function RobotStage({ mode, activePart, animate }: { mode: RobotMode; activePart: string; animate: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2.95, 5.2], fov: 26 }}>
      <color attach="background" args={["#07111f"]} />
      <fog attach="fog" args={["#07111f", 7, 14]} />
      <ambientLight intensity={0.96} />
      <directionalLight position={[4, 6, 4]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-3, 4, -3]} intensity={1.2} color={cyan} />
      <pointLight position={[0, 2.6, 2.2]} intensity={9} distance={8} color={orange} />
      <RobotModel mode={mode} activePart={activePart} animate={animate} />
      <mesh position={[0, -0.68, 0.18]} rotation={[-Math.PI / 2, 0, 0]} scale={[7.8, 7.8, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshStandardMaterial color="#08101a" metalness={0.28} roughness={0.9} />
      </mesh>
      <OrbitControls enablePan={false} minDistance={4} maxDistance={7.4} minPolarAngle={Math.PI / 5.7} maxPolarAngle={Math.PI / 2.08} />
    </Canvas>
  );
}
