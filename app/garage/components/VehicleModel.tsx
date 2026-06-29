"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges, Html, ContactShadows } from "@react-three/drei";
import { IN_TO_M, type Vehicle } from "../lib/types";
import { getExterior, type Exterior } from "../lib/vehicles";

// Body proportions per category, as fractions of overall height/length.
const PROFILE: Record<
  Vehicle["category"],
  { lower: number; cabH: number; cabLen: number; cabZ: number; hood: number }
> = {
  Sedan: { lower: 0.55, cabH: 0.36, cabLen: 0.42, cabZ: -0.06, hood: 0.26 },
  Wagon: { lower: 0.5, cabH: 0.41, cabLen: 0.55, cabZ: -0.02, hood: 0.2 },
  "2-Row SUV": { lower: 0.52, cabH: 0.39, cabLen: 0.56, cabZ: -0.03, hood: 0.18 },
  "3-Row SUV": { lower: 0.5, cabH: 0.41, cabLen: 0.66, cabZ: -0.02, hood: 0.16 },
  Minivan: { lower: 0.45, cabH: 0.46, cabLen: 0.74, cabZ: 0, hood: 0.12 },
};

const BODY_COLOR: Record<Vehicle["category"], string> = {
  Sedan: "#2a6f97",
  Wagon: "#2d6a4f",
  "2-Row SUV": "#1a6b8a",
  "3-Row SUV": "#1d557a",
  Minivan: "#3a5a8a",
};

function Wheel({ x, z, r, t }: { x: number; z: number; r: number; t: number }) {
  return (
    <mesh position={[x, r, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[r, r, t, 24]} />
      <meshStandardMaterial color="#1a1f26" roughness={0.8} />
    </mesh>
  );
}

function Body({ v, ext }: { v: Vehicle; ext: Exterior }) {
  const p = PROFILE[v.category];
  const L = ext.length * IN_TO_M;
  const W = ext.width * IN_TO_M;
  const H = ext.height * IN_TO_M;
  const WB = ext.wheelbase * IN_TO_M;

  const r = H * 0.16; // wheel radius
  const gc = r * 0.55; // ground clearance
  const lowerH = H * p.lower;
  const cabH = H * p.cabH;
  const cabLen = L * p.cabLen;
  const cabZ = L * p.cabZ;

  const trackX = W / 2 - r * 0.6;
  const wheelT = r * 0.5;

  const cargoW = v.cargoWidth * IN_TO_M;
  const cargoH = Math.min(v.cargoHeight * IN_TO_M, lowerH + cabH - 0.05);

  return (
    <group>
      {/* Lower body */}
      <mesh position={[0, gc + lowerH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[W * 0.96, lowerH, L * 0.98]} />
        <meshStandardMaterial color={BODY_COLOR[v.category]} roughness={0.45} metalness={0.1} />
        <Edges color="#0c0f12" />
      </mesh>

      {/* Greenhouse / cabin */}
      <mesh position={[0, gc + lowerH + cabH / 2, cabZ]} castShadow>
        <boxGeometry args={[W * 0.86, cabH, cabLen]} />
        <meshStandardMaterial color="#9fb6c6" roughness={0.1} metalness={0.2} transparent opacity={0.65} />
        <Edges color="#0c0f12" />
      </mesh>

      {/* Cargo opening highlight on the rear face */}
      <mesh position={[0, gc + cargoH / 2, -L / 2 + 0.01]}>
        <planeGeometry args={[cargoW, cargoH]} />
        <meshStandardMaterial color="#2d8a6e" transparent opacity={0.5} side={2} />
        <Edges color="#ffffff" />
        <Html position={[0, cargoH / 2 + 0.08, 0]} center distanceFactor={6} style={{ pointerEvents: "none" }}>
          <div style={tagStyle("#2d8a6e")}>
            Cargo opening · {v.cargoWidth}&quot; × {v.cargoHeight}&quot;
          </div>
        </Html>
      </mesh>

      {/* Wheels */}
      <Wheel x={trackX} z={WB / 2} r={r} t={wheelT} />
      <Wheel x={-trackX} z={WB / 2} r={r} t={wheelT} />
      <Wheel x={trackX} z={-WB / 2} r={r} t={wheelT} />
      <Wheel x={-trackX} z={-WB / 2} r={r} t={wheelT} />

      {/* Dimension labels */}
      <Html position={[0, 0.02, L / 2 + 0.18]} center distanceFactor={7} style={{ pointerEvents: "none" }}>
        <div style={tagStyle("#1a6b8a")}>Length {ext.length}&quot;</div>
      </Html>
      <Html position={[W / 2 + 0.18, gc + lowerH / 2, 0]} center distanceFactor={7} style={{ pointerEvents: "none" }}>
        <div style={tagStyle("#1a6b8a")}>Width {ext.width}&quot;</div>
      </Html>
      <Html position={[-W / 2 - 0.05, H + 0.12, -L / 2]} center distanceFactor={7} style={{ pointerEvents: "none" }}>
        <div style={tagStyle("#1a6b8a")}>Height {ext.height}&quot;</div>
      </Html>
    </group>
  );
}

function tagStyle(color: string): React.CSSProperties {
  return {
    whiteSpace: "nowrap",
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
    background: color,
    padding: "2px 8px",
    borderRadius: 6,
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  };
}

export default function VehicleModel({ vehicle }: { vehicle: Vehicle }) {
  const ext = getExterior(vehicle);
  const L = ext.length * IN_TO_M;
  const W = ext.width * IN_TO_M;
  const H = ext.height * IN_TO_M;
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [L * 0.85, L * 0.5, L * 1.05], fov: 36 }}
      style={{ background: "linear-gradient(#eef3f6, #d7e0e6)" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-4, 4, -3]} intensity={0.4} />
      <Body v={vehicle} ext={ext} />
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={L * 1.5} blur={2.5} far={2} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.8}
        target={[0, H * 0.4, 0]}
        maxPolarAngle={Math.PI / 2.05}
        minDistance={1}
        maxDistance={20}
      />
    </Canvas>
  );
}
