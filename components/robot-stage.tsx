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
const frameBlack = "#171a1f";
const frameEdge = "#2a2f37";
const frontArc = "#d89b1d";
const boardBlue = "#2467d8";
const batteryBlack = "#101318";
const wheelGrey = "#d8dde6";
const whiteMount = "#f3f4f6";
const brass = "#9a7a42";

function getPartOffset(mode: RobotMode, offset: Vec3): Vec3 {
  return mode === "exploded" ? offset : [0, 0, 0];
}

function getVisualState(activePart: string, partIds: string[]): VisualState {
  const active = activePart === "all" || partIds.includes(activePart);
  const focused = activePart !== "all" && partIds.includes(activePart);

  return {
    opacity: active ? 1 : 0.18,
    emissive: focused ? cyan : "#000000",
    emissiveIntensity: focused ? 0.5 : 0,
  };
}

function Material({ color, state, metalness = 0.25, roughness = 0.6 }: { color: string; state: VisualState; metalness?: number; roughness?: number }) {
  return <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} transparent opacity={state.opacity} emissive={state.emissive} emissiveIntensity={state.emissiveIntensity} />;
}

function RobotModel({ mode, activePart, animate }: { mode: RobotMode; activePart: string; animate: boolean }) {
  const root = useRef<Group>(null);
  const leftWheel = useRef<Group>(null);
  const rightWheel = useRef<Group>(null);
  const ribbon = useRef<Group>(null);
  const arc = useRef<Group>(null);

  const chassisState = getVisualState(activePart, ["core"]);
  const boardState = getVisualState(activePart, ["sensor"]);
  const leftState = getVisualState(activePart, ["arm-left"]);
  const rightState = getVisualState(activePart, ["arm-right"]);
  const mobilityState = getVisualState(activePart, ["mobility"]);

  const chassisOffset = getPartOffset(mode, [0, 0, 0]);
  const boardOffset = getPartOffset(mode, [0, 0.22, -0.22]);
  const arcOffset = getPartOffset(mode, [0, 0.36, 0.42]);
  const leftOffset = getPartOffset(mode, [-0.55, 0, -0.18]);
  const rightOffset = getPartOffset(mode, [0.55, 0, -0.18]);
  const mobilityOffset = getPartOffset(mode, [0, 0.16, 0.02]);

  const glowBars = useMemo(
    () => [
      { position: [0, -0.02, 0.1] as Vec3, scale: [1.65, 0.01, 0.03] as Vec3 },
      { position: [0, -0.02, 0.72] as Vec3, scale: [1.65, 0.01, 0.03] as Vec3 },
    ],
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (root.current) {
      root.current.rotation.y = Math.sin(t * 0.24) * 0.08;
      root.current.rotation.x = -0.18 + Math.sin(t * 0.3) * 0.015;
      root.current.position.y = Math.sin(t * 0.5) * 0.015;
    }

    if (animate) {
      if (leftWheel.current) {
        leftWheel.current.rotation.z = t * 3.4;
      }
      if (rightWheel.current) {
        rightWheel.current.rotation.z = -t * 3.4;
      }
      if (ribbon.current) {
        ribbon.current.rotation.x = -0.02 + Math.sin(t * 1.6) * 0.02;
      }
      if (arc.current) {
        arc.current.rotation.z = Math.sin(t * 0.8) * 0.015;
      }
    }
  });

  return (
    <group ref={root} position={[0, -0.22, 0]}>
      <group position={chassisOffset}>
        <mesh position={[0, -0.08, 0.18]}>
          <boxGeometry args={[1.18, 0.06, 1.25]} />
          <Material color={frameBlack} state={chassisState} metalness={0.3} roughness={0.7} />
        </mesh>

        <mesh position={[-0.72, -0.04, 0.26]}>
          <boxGeometry args={[0.1, 0.08, 1.55]} />
          <Material color={frameBlack} state={chassisState} metalness={0.32} roughness={0.7} />
        </mesh>
        <mesh position={[0.72, -0.04, 0.26]}>
          <boxGeometry args={[0.1, 0.08, 1.55]} />
          <Material color={frameBlack} state={chassisState} metalness={0.32} roughness={0.7} />
        </mesh>

        <mesh position={[-0.72, -0.04, -0.42]} rotation={[0, 0, 0.62]}>
          <boxGeometry args={[0.1, 0.08, 0.48]} />
          <Material color={frameBlack} state={chassisState} metalness={0.32} roughness={0.7} />
        </mesh>
        <mesh position={[0.72, -0.04, -0.42]} rotation={[0, 0, -0.62]}>
          <boxGeometry args={[0.1, 0.08, 0.48]} />
          <Material color={frameBlack} state={chassisState} metalness={0.32} roughness={0.7} />
        </mesh>

        <mesh position={[0, -0.02, -0.48]}>
          <boxGeometry args={[1.28, 0.05, 0.18]} />
          <Material color={frameEdge} state={chassisState} metalness={0.28} roughness={0.72} />
        </mesh>

        <mesh position={[-0.72, 0.1, 0.92]}>
          <boxGeometry args={[0.08, 0.52, 0.08]} />
          <Material color={frameBlack} state={chassisState} metalness={0.34} roughness={0.62} />
        </mesh>
        <mesh position={[0.72, 0.1, 0.92]}>
          <boxGeometry args={[0.08, 0.52, 0.08]} />
          <Material color={frameBlack} state={chassisState} metalness={0.34} roughness={0.62} />
        </mesh>
      </group>

      <group position={mobilityOffset}>
        <mesh position={[0, 0.02, 0.08]}>
          <boxGeometry args={[0.74, 0.28, 0.52]} />
          <Material color={batteryBlack} state={mobilityState} metalness={0.2} roughness={0.82} />
        </mesh>
        <mesh position={[0, 0.08, -0.04]}>
          <boxGeometry args={[0.62, 0.08, 0.36]} />
          <meshStandardMaterial color="#191d24" metalness={0.18} roughness={0.86} transparent opacity={mobilityState.opacity * 0.95} />
        </mesh>
      </group>

      <group position={boardOffset}>
        <mesh position={[0, 0.02, -0.28]}>
          <boxGeometry args={[1.06, 0.06, 0.44]} />
          <Material color="#0d1117" state={boardState} metalness={0.26} roughness={0.78} />
        </mesh>
        <mesh position={[0, 0.09, -0.26]}>
          <boxGeometry args={[0.76, 0.05, 0.28]} />
          <Material color={boardBlue} state={boardState} metalness={0.2} roughness={0.58} />
        </mesh>
        <mesh position={[0.22, 0.12, -0.19]}>
          <boxGeometry args={[0.18, 0.08, 0.14]} />
          <meshStandardMaterial color="#1d2b42" metalness={0.22} roughness={0.64} transparent opacity={boardState.opacity} />
        </mesh>
        {[-0.3, -0.18, -0.06, 0.06, 0.18, 0.3].map((x) => (
          <mesh key={x} position={[x, 0.1, -0.12]}>
            <boxGeometry args={[0.025, 0.14, 0.025]} />
            <meshStandardMaterial color="#d2d6df" metalness={0.85} roughness={0.18} transparent opacity={boardState.opacity} />
          </mesh>
        ))}
        <mesh position={[-0.44, 0.1, -0.18]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#d93535" metalness={0.15} roughness={0.72} transparent opacity={boardState.opacity} emissive="#d93535" emissiveIntensity={0.12} />
        </mesh>
      </group>

      <group ref={ribbon} position={[0, 0.34, 0.34]}>
        {[
          { x: -0.12, color: "#ff4b4b" },
          { x: -0.06, color: "#ff9d2a" },
          { x: 0, color: "#ffe15a" },
          { x: 0.06, color: "#43d56d" },
          { x: 0.12, color: "#54bfff" },
        ].map((wire) => (
          <mesh key={wire.x} position={[wire.x, 0.08, 0]}>
            <boxGeometry args={[0.035, 0.92, 0.03]} />
            <meshStandardMaterial color={wire.color} metalness={0.08} roughness={0.55} transparent opacity={boardState.opacity} emissive={wire.color} emissiveIntensity={0.1} />
          </mesh>
        ))}
      </group>

      <group position={arcOffset} ref={arc}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.07, 16, 72, Math.PI]} />
          <Material color={frontArc} state={boardState} metalness={0.22} roughness={0.62} />
        </mesh>
        <mesh position={[-0.52, 0, 0]}>
          <boxGeometry args={[0.22, 0.08, 0.08]} />
          <Material color={frontArc} state={boardState} metalness={0.22} roughness={0.62} />
        </mesh>
        <mesh position={[0.52, 0, 0]}>
          <boxGeometry args={[0.22, 0.08, 0.08]} />
          <Material color={frontArc} state={boardState} metalness={0.22} roughness={0.62} />
        </mesh>
        <mesh position={[0, -0.06, -0.04]}>
          <boxGeometry args={[0.16, 0.06, 0.16]} />
          <meshStandardMaterial color="#161b21" metalness={0.2} roughness={0.7} transparent opacity={boardState.opacity} />
        </mesh>
        <mesh position={[-0.12, -0.16, -0.04]}>
          <boxGeometry args={[0.05, 0.28, 0.05]} />
          <meshStandardMaterial color="#11161d" metalness={0.25} roughness={0.68} transparent opacity={boardState.opacity} />
        </mesh>
        <mesh position={[0.12, -0.16, -0.04]}>
          <boxGeometry args={[0.05, 0.28, 0.05]} />
          <meshStandardMaterial color="#11161d" metalness={0.25} roughness={0.68} transparent opacity={boardState.opacity} />
        </mesh>
      </group>

      <group ref={leftWheel} position={leftOffset}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.24, 40]} />
          <meshStandardMaterial color={wheelGrey} metalness={0.16} roughness={0.34} transparent opacity={leftState.opacity} emissive={leftState.emissive} emissiveIntensity={leftState.emissiveIntensity} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.27, 32]} />
          <meshStandardMaterial color={brass} metalness={0.82} roughness={0.22} transparent opacity={leftState.opacity} />
        </mesh>
        <mesh position={[0.13, 0, 0.04]}>
          <boxGeometry args={[0.12, 0.14, 0.28]} />
          <meshStandardMaterial color={whiteMount} metalness={0.18} roughness={0.6} transparent opacity={leftState.opacity} />
        </mesh>
      </group>

      <group ref={rightWheel} position={rightOffset}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.24, 40]} />
          <meshStandardMaterial color={wheelGrey} metalness={0.16} roughness={0.34} transparent opacity={rightState.opacity} emissive={rightState.emissive} emissiveIntensity={rightState.emissiveIntensity} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.27, 32]} />
          <meshStandardMaterial color={brass} metalness={0.82} roughness={0.22} transparent opacity={rightState.opacity} />
        </mesh>
        <mesh position={[-0.13, 0, 0.04]}>
          <boxGeometry args={[0.12, 0.14, 0.28]} />
          <meshStandardMaterial color={whiteMount} metalness={0.18} roughness={0.6} transparent opacity={rightState.opacity} />
        </mesh>
      </group>

      {mode !== "parts" &&
        glowBars.map((bar) => (
          <mesh key={bar.position.join("-")} position={bar.position} scale={bar.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={cyan} emissive={cyan} emissiveIntensity={0.85} transparent opacity={0.12} />
          </mesh>
        ))}
    </group>
  );
}

export function RobotStage({ mode, activePart, animate }: { mode: RobotMode; activePart: string; animate: boolean }) {
  return (
    <Canvas camera={{ position: [0, 3.9, 4.7], fov: 28 }}>
      <color attach="background" args={["#07111f"]} />
      <fog attach="fog" args={["#07111f", 7, 14]} />
      <ambientLight intensity={0.92} />
      <directionalLight position={[4, 6, 4]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-3, 4, -3]} intensity={1.1} color={cyan} />
      <pointLight position={[0, 2.8, 2.2]} intensity={11} distance={8} color={orange} />
      <RobotModel mode={mode} activePart={activePart} animate={animate} />
      <mesh position={[0, -0.62, 0.12]} rotation={[-Math.PI / 2, 0, 0]} scale={[7, 7, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshStandardMaterial color="#08101a" metalness={0.28} roughness={0.9} />
      </mesh>
      <OrbitControls enablePan={false} minDistance={3.8} maxDistance={7.2} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2.15} />
    </Canvas>
  );
}
