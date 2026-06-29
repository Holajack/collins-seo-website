"use client";

import { useRef, useState } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Grid, Edges, Html } from "@react-three/drei";
import * as THREE from "three";
import { IN_TO_M, type CatalogItem, type PlacedItem } from "../lib/types";
import { footprint, type FitReport } from "../lib/geometry";

interface FitSceneProps {
  width: number; // inches
  length: number; // inches (depth)
  height: number; // inches
  placed: PlacedItem[];
  resolve: (id: string) => CatalogItem | undefined;
  fit: FitReport;
  selectedUid: string | null;
  onSelect: (uid: string | null) => void;
  onMove: (uid: string, x: number, z: number) => void;
}

function PlacedBox({
  item,
  placed,
  ok,
  selected,
  onDown,
}: {
  item: CatalogItem;
  placed: PlacedItem;
  ok: boolean;
  selected: boolean;
  onDown: (e: ThreeEvent<PointerEvent>) => void;
}) {
  const { w, d, h } = footprint(item, placed);
  const color = ok ? item.color : "#dc2626";
  return (
    <mesh
      position={[placed.x * IN_TO_M, (h / 2) * IN_TO_M, placed.z * IN_TO_M]}
      onPointerDown={onDown}
      castShadow
    >
      <boxGeometry args={[w * IN_TO_M, h * IN_TO_M, d * IN_TO_M]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={ok ? 0.85 : 0.6}
        roughness={0.6}
      />
      <Edges color={selected ? "#ffffff" : "#1a1f26"} lineWidth={selected ? 3 : 1} />
      <Html
        position={[0, (h / 2) * IN_TO_M + 0.04, 0]}
        center
        distanceFactor={3}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            whiteSpace: "nowrap",
            fontSize: 12,
            fontWeight: 600,
            color: ok ? "#0c0f12" : "#dc2626",
            background: "rgba(255,255,255,0.8)",
            padding: "1px 6px",
            borderRadius: 6,
          }}
        >
          {item.name.replace(/\s*\(folded\)/, "")}
        </div>
      </Html>
    </mesh>
  );
}

function SceneContents(props: FitSceneProps) {
  const { width, length, height, placed, resolve, fit, selectedUid } = props;
  const [dragging, setDragging] = useState<string | null>(null);
  const planeRef = useRef<THREE.Mesh>(null);

  const W = width * IN_TO_M;
  const L = length * IN_TO_M;
  const H = height * IN_TO_M;

  const fitMap = new Map(fit.items.map((f) => [f.uid, f.ok]));

  const handleGroundMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging) return;
    e.stopPropagation();
    const xIn = e.point.x / IN_TO_M;
    const zIn = e.point.z / IN_TO_M;
    props.onMove(dragging, xIn, zIn);
  };

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 4]} intensity={1.1} castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} />

      {/* Invisible large ground plane to capture drag movement */}
      <mesh
        ref={planeRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onPointerMove={handleGroundMove}
        onPointerUp={() => setDragging(null)}
        visible={false}
      >
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial />
      </mesh>

      {/* Cargo floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, L / 2]} receiveShadow>
        <planeGeometry args={[W, L]} />
        <meshStandardMaterial color="#c4ccd6" roughness={0.9} />
      </mesh>

      {/* Cargo volume wireframe */}
      <mesh position={[0, H / 2, L / 2]}>
        <boxGeometry args={[W, H, L]} />
        <meshBasicMaterial transparent opacity={0.05} color="#1a6b8a" />
        <Edges color="#1a6b8a" lineWidth={2} />
      </mesh>

      <Grid
        args={[W, L]}
        position={[0, 0, L / 2]}
        cellSize={6 * IN_TO_M}
        sectionSize={12 * IN_TO_M}
        cellColor="#9ca8b8"
        sectionColor="#5c6878"
        fadeDistance={30}
        infiniteGrid={false}
      />

      {/* Orientation labels */}
      <Html position={[0, 0.02, -0.12]} center distanceFactor={2.2} style={{ pointerEvents: "none" }}>
        <div style={labelStyle}>⬇ TAILGATE / OPENING</div>
      </Html>
      <Html position={[0, 0.02, L + 0.12]} center distanceFactor={2.2} style={{ pointerEvents: "none" }}>
        <div style={labelStyle}>FRONT OF VEHICLE ⬆</div>
      </Html>

      {placed.map((p) => {
        const item = resolve(p.itemId);
        if (!item) return null;
        return (
          <PlacedBox
            key={p.uid}
            item={item}
            placed={p}
            ok={fitMap.get(p.uid) ?? true}
            selected={p.uid === selectedUid}
            onDown={(e) => {
              e.stopPropagation();
              props.onSelect(p.uid);
              setDragging(p.uid);
            }}
          />
        );
      })}

      <OrbitControls
        enabled={!dragging}
        target={[0, 0.15, L / 2]}
        maxPolarAngle={Math.PI / 2.05}
        minDistance={0.6}
        maxDistance={12}
      />
    </>
  );
}

const labelStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 0.5,
  color: "#5c6878",
  background: "rgba(255,255,255,0.7)",
  padding: "2px 8px",
  borderRadius: 6,
};

export default function FitScene(props: FitSceneProps) {
  const L = props.length * IN_TO_M;
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [props.width * IN_TO_M * 0.9, 1.6, L + 1.2], fov: 45 }}
      onPointerMissed={() => props.onSelect(null)}
      style={{ background: "linear-gradient(#eef3f6, #d7e0e6)" }}
    >
      <SceneContents {...props} />
    </Canvas>
  );
}
