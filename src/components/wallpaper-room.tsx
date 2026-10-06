"use client";

import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  ACESFilmicToneMapping,
  CanvasTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  RepeatWrapping,
  SRGBColorSpace,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { getGrainCanvas, GRAIN_TILE_METERS } from "@/lib/wallpaper-grains";
import {
  getPreviewFinish,
  type WallpaperPreviewSelection,
} from "@/lib/wallpaper-preview";

const ROOM = {
  width: 4.6,
  depth: 3.6,
  height: 2.5,
  base: 0.1,
};

function useWallTexture(
  selection: WallpaperPreviewSelection,
  wallWidth: number,
  wallHeight: number,
  color: string,
) {
  const gl = useThree((state) => state.gl);
  const finish = getPreviewFinish(selection.finishId);
  const texture = useMemo(() => {
    const canvas = getGrainCanvas(selection.grainId);
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.magFilter = LinearFilter;
    map.minFilter = LinearMipmapLinearFilter;
    map.generateMipmaps = true;
    map.anisotropy = gl.capabilities.getMaxAnisotropy();
    map.repeat.set(wallWidth / GRAIN_TILE_METERS, wallHeight / GRAIN_TILE_METERS);
    map.needsUpdate = true;
    return map;
  }, [selection.grainId, wallWidth, wallHeight, gl]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return { texture, color, roughness: finish.roughness, clearcoat: finish.clearcoat };
}

function WallpaperPlane({
  size,
  position,
  rotation,
  selection,
  color,
}: {
  size: [number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  selection: WallpaperPreviewSelection;
  color: string;
}) {
  const material = useWallTexture(selection, size[0], size[1], color);

  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={size} />
      <meshPhysicalMaterial
        map={material.texture}
        color={material.color}
        roughness={material.roughness}
        clearcoat={material.clearcoat}
        clearcoatRoughness={0.42}
      />
    </mesh>
  );
}

function RoomWalls({ selection }: { selection: WallpaperPreviewSelection }) {
  const wallHeight = ROOM.height - ROOM.base;
  const y = ROOM.base + wallHeight / 2;
  const backColor = selection.accent === "color" ? selection.accentColor : selection.color;

  return (
    <group>
      <WallpaperPlane
        size={[ROOM.width, wallHeight]}
        position={[0, y, -ROOM.depth / 2]}
        rotation={[0, 0, 0]}
        selection={selection}
        color={backColor}
      />
      <WallpaperPlane
        size={[ROOM.depth, wallHeight]}
        position={[-ROOM.width / 2, y, 0]}
        rotation={[0, Math.PI / 2, 0]}
        selection={selection}
        color={selection.color}
      />
      <WallpaperPlane
        size={[ROOM.depth, wallHeight]}
        position={[ROOM.width / 2, y, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        selection={selection}
        color={selection.color}
      />
    </group>
  );
}

function SeamLine({
  args,
  position,
  rotation,
}: {
  args: [number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={args} />
      <meshBasicMaterial color="#ddd6cc" transparent opacity={0.42} depthWrite={false} />
    </mesh>
  );
}

function WallSeams({ selection }: { selection: WallpaperPreviewSelection }) {
  const finish = getPreviewFinish(selection.finishId);
  if (finish.seam !== "hapji") return null;

  const wallHeight = ROOM.height - ROOM.base;
  const y = ROOM.base + wallHeight / 2;
  const across: number[] = [];
  const along: number[] = [];
  for (let meter = finish.rollWidth; meter < ROOM.width - 0.04; meter += finish.rollWidth) {
    across.push(Number(meter.toFixed(3)));
  }
  for (let meter = finish.rollWidth; meter < ROOM.depth - 0.04; meter += finish.rollWidth) {
    along.push(Number(meter.toFixed(3)));
  }

  return (
    <group>
      {across.map((meter) => (
        <SeamLine
          key={`back-${meter}`}
          args={[0.004, wallHeight]}
          position={[-ROOM.width / 2 + meter, y, -ROOM.depth / 2 + 0.012]}
        />
      ))}
      {along.map((meter) => (
        <SeamLine
          key={`left-${meter}`}
          args={[0.004, wallHeight]}
          position={[-ROOM.width / 2 + 0.012, y, -ROOM.depth / 2 + meter]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
      {along.map((meter) => (
        <SeamLine
          key={`right-${meter}`}
          args={[0.004, wallHeight]}
          position={[ROOM.width / 2 - 0.012, y, ROOM.depth / 2 - meter]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      ))}
      {across.map((meter) => (
        <SeamLine
          key={`ceiling-${meter}`}
          args={[0.004, ROOM.depth]}
          position={[-ROOM.width / 2 + meter, ROOM.height - 0.01, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      ))}
    </group>
  );
}

function Ceiling({ selection }: { selection: WallpaperPreviewSelection }) {
  const color = selection.ceiling === "color" ? selection.ceilingColor : selection.color;

  return (
    <WallpaperPlane
      size={[ROOM.width, ROOM.depth]}
      position={[0, ROOM.height - 0.002, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      selection={selection}
      color={color}
    />
  );
}

const TRIM = "#f6f3ee";
const WOOD = "#c9aa84";
const WOOD_DARK = "#b08968";

function useWoodFloor() {
  const texture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.repeat.set(2.4, 2.4);
    map.anisotropy = 8;
    if (!context) return map;

    context.fillStyle = "#edd7b8";
    context.fillRect(0, 0, size, size);
    const plank = 64;
    for (let y = 0; y < size; y += plank) {
      const tone = 214 + ((y / plank) % 4) * 8;
      context.fillStyle = `rgb(${tone + 18}, ${tone - 8}, ${tone - 42})`;
      context.fillRect(0, y + 1, size, plank - 3);
      context.strokeStyle = "rgba(120, 86, 52, 0.28)";
      context.strokeRect(0.5, y + 0.5, size - 1, plank - 1);
    }
    map.needsUpdate = true;
    return map;
  }, []);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return texture;
}

function WoodFloor() {
  const texture = useWoodFloor();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[ROOM.width, ROOM.depth]} />
      <meshStandardMaterial map={texture} roughness={0.72} />
    </mesh>
  );
}

function TrimBox({
  args,
  position,
}: {
  args: [number, number, number];
  position: [number, number, number];
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={TRIM} roughness={0.72} />
    </mesh>
  );
}

function Baseboards() {
  const depth = 0.05;
  return (
    <group>
      <TrimBox
        args={[ROOM.width, ROOM.base, depth]}
        position={[0, ROOM.base / 2, -ROOM.depth / 2 + depth / 2]}
      />
      <TrimBox
        args={[depth, ROOM.base, ROOM.depth]}
        position={[-ROOM.width / 2 + depth / 2, ROOM.base / 2, 0]}
      />
      <TrimBox
        args={[depth, ROOM.base, ROOM.depth]}
        position={[ROOM.width / 2 - depth / 2, ROOM.base / 2, 0]}
      />
    </group>
  );
}

function Cornice() {
  const lip = 0.045;
  const y = ROOM.height - lip / 2;
  return (
    <group>
      <TrimBox args={[ROOM.width, lip, lip]} position={[0, y, -ROOM.depth / 2 + lip / 2]} />
      <TrimBox args={[lip, lip, ROOM.depth]} position={[-ROOM.width / 2 + lip / 2, y, 0]} />
      <TrimBox args={[lip, lip, ROOM.depth]} position={[ROOM.width / 2 - lip / 2, y, 0]} />
    </group>
  );
}

function Window() {
  return (
    <group position={[0.15, 1.48, -ROOM.depth / 2 + 0.03]}>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[1.72, 1.18]} />
        <meshStandardMaterial color="#d5e6f2" emissive="#9ec0d8" emissiveIntensity={0.55} />
      </mesh>
      <TrimBox args={[1.88, 0.07, 0.05]} position={[0, 0.64, 0.03]} />
      <TrimBox args={[1.88, 0.07, 0.05]} position={[0, -0.64, 0.03]} />
      <TrimBox args={[0.07, 1.32, 0.05]} position={[-0.9, 0, 0.03]} />
      <TrimBox args={[0.07, 1.32, 0.05]} position={[0.9, 0, 0.03]} />
      <TrimBox args={[0.035, 1.18, 0.04]} position={[0, 0, 0.034]} />
      <mesh position={[0, -0.7, 0.08]} receiveShadow>
        <boxGeometry args={[1.96, 0.045, 0.12]} />
        <meshStandardMaterial color={TRIM} roughness={0.68} />
      </mesh>
      {[0, 1, 2, 3, 4].map((index) => (
        <mesh
          key={index}
          position={[1.02 + index * 0.055, 0.02 + (index % 2) * 0.01, 0.05 + (index % 2) * 0.012]}
          rotation={[0, index % 2 === 0 ? 0.18 : -0.12, 0]}
        >
          <boxGeometry args={[0.07, 1.26, 0.012]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#f7f3ec" : "#efe8de"} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Door() {
  return (
    <group position={[-1.62, 1.12, -ROOM.depth / 2 + 0.03]}>
      <TrimBox args={[0.98, 2.12, 0.06]} position={[0, 0, 0.02]} />
      <mesh position={[0, -0.02, 0.055]} castShadow>
        <boxGeometry args={[0.84, 2.02, 0.04]} />
        <meshStandardMaterial color="#fbf9f6" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.42, 0.078]}>
        <boxGeometry args={[0.62, 0.78, 0.012]} />
        <meshStandardMaterial color="#f3efe8" roughness={0.62} />
      </mesh>
      <mesh position={[0, -0.52, 0.078]}>
        <boxGeometry args={[0.62, 0.78, 0.012]} />
        <meshStandardMaterial color="#f3efe8" roughness={0.62} />
      </mesh>
      <mesh position={[0.32, 0.02, 0.09]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.11, 12]} />
        <meshStandardMaterial color="#b7ab9e" roughness={0.35} metalness={0.45} />
      </mesh>
      <mesh position={[0.32, 0.02, 0.1]}>
        <sphereGeometry args={[0.016, 12, 12]} />
        <meshStandardMaterial color="#b7ab9e" roughness={0.35} metalness={0.45} />
      </mesh>
    </group>
  );
}

function CeilingLight() {
  return (
    <group position={[0.05, ROOM.height - 0.01, -0.05]}>
      <mesh>
        <cylinderGeometry args={[0.06, 0.06, 0.015, 20]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.045, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.11, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
        <meshStandardMaterial color="#fffdf8" emissive="#fff4dc" emissiveIntensity={0.7} roughness={0.35} />
      </mesh>
      <pointLight position={[0, -0.08, 0]} intensity={0.55} distance={7} decay={2} color="#fff8ee" />
    </group>
  );
}

function Sofa() {
  const fabric = "#e4ddd4";
  const legs = [
    [-0.7, -0.26],
    [0.7, -0.26],
    [-0.7, 0.26],
    [0.7, 0.26],
  ] as const;

  return (
    <group position={[0.28, 0, 0.92]}>
      {legs.map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.05, z]} castShadow>
          <cylinderGeometry args={[0.025, 0.03, 0.1, 12]} />
          <meshStandardMaterial color="#5e564e" roughness={0.55} />
        </mesh>
      ))}
      <RoundedBox args={[1.58, 0.12, 0.66]} radius={0.03} smoothness={3} position={[0, 0.16, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#ddd6cc" roughness={0.88} />
      </RoundedBox>
      <RoundedBox args={[1.42, 0.12, 0.58]} radius={0.05} smoothness={4} position={[0, 0.26, -0.02]} castShadow>
        <meshStandardMaterial color={fabric} roughness={0.92} />
      </RoundedBox>
      {[-0.46, 0, 0.46].map((x) => (
        <RoundedBox
          key={x}
          args={[0.44, 0.34, 0.11]}
          radius={0.04}
          smoothness={4}
          position={[x, 0.48, 0.26]}
          rotation={[-0.18, 0, 0]}
          castShadow
        >
          <meshStandardMaterial color={fabric} roughness={0.92} />
        </RoundedBox>
      ))}
      {[-0.76, 0.76].map((x) => (
        <RoundedBox
          key={x}
          args={[0.12, 0.26, 0.6]}
          radius={0.05}
          smoothness={4}
          position={[x, 0.34, 0]}
          castShadow
        >
          <meshStandardMaterial color={fabric} roughness={0.92} />
        </RoundedBox>
      ))}
    </group>
  );
}

function CoffeeTable() {
  const legs = [
    [-0.38, -0.18],
    [0.38, -0.18],
    [-0.38, 0.18],
    [0.38, 0.18],
  ] as const;

  return (
    <group position={[0.05, 0, -0.08]}>
      <RoundedBox args={[0.92, 0.028, 0.5]} radius={0.012} smoothness={3} position={[0, 0.32, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD} roughness={0.48} />
      </RoundedBox>
      {legs.map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.15, z]} castShadow>
          <cylinderGeometry args={[0.012, 0.014, 0.3, 12]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.15, 0.012, 0.28]} receiveShadow>
      <planeGeometry args={[2.15, 1.45]} />
      <meshStandardMaterial color="#efe8df" roughness={0.95} />
    </mesh>
  );
}

function MediaUnit() {
  return (
    <group position={[1.48, 0, -1.38]}>
      <mesh position={[0, 0.03, 0.02]} receiveShadow>
        <boxGeometry args={[0.86, 0.04, 0.3]} />
        <meshStandardMaterial color="#8d7358" roughness={0.6} />
      </mesh>
      <RoundedBox args={[0.9, 0.32, 0.34]} radius={0.015} smoothness={2} position={[0, 0.22, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD_DARK} roughness={0.58} />
      </RoundedBox>
      <mesh position={[0, 0.22, 0.172]}>
        <boxGeometry args={[0.008, 0.22, 0.004]} />
        <meshStandardMaterial color="#8d7358" roughness={0.5} />
      </mesh>
      <RoundedBox args={[0.96, 0.02, 0.38]} radius={0.006} smoothness={2} position={[0, 0.39, 0]} castShadow>
        <meshStandardMaterial color="#d7c3a6" roughness={0.45} />
      </RoundedBox>
      <group position={[0, 0.72, -0.12]}>
        <RoundedBox args={[0.7, 0.4, 0.018]} radius={0.006} smoothness={2} castShadow>
          <meshStandardMaterial color="#1c1c1c" roughness={0.4} metalness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0, 0.011]}>
          <planeGeometry args={[0.64, 0.34]} />
          <meshStandardMaterial color="#2c3340" roughness={0.2} metalness={0.35} emissive="#1a2433" emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[0, -0.24, 0]}>
          <boxGeometry args={[0.05, 0.07, 0.02]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.45} metalness={0.3} />
        </mesh>
        <mesh position={[-0.16, -0.3, 0.01]} rotation={[0, 0, 0.35]}>
          <boxGeometry args={[0.16, 0.012, 0.012]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0.16, -0.3, 0.01]} rotation={[0, 0, -0.35]}>
          <boxGeometry args={[0.16, 0.012, 0.012]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.4} metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({
  selection,
  resetSignal,
}: {
  selection: WallpaperPreviewSelection;
  resetSignal: number;
}) {
  return (
    <>
      <color attach="background" args={["#f6f3ee"]} />
      <ambientLight intensity={1.05} />
      <hemisphereLight args={["#fffaf4", "#efe4d4", 0.55]} />
      <directionalLight
        position={[2.2, 3.1, 1.4]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.4}
        shadow-camera-far={12}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-1.6, 2.4, 2.6]} intensity={0.7} color="#fffaf3" />

      <WoodFloor />
      <Ceiling selection={selection} />

      <Baseboards />
      <Cornice />
      <RoomWalls selection={selection} />
      <WallSeams selection={selection} />
      <Window />
      <Door />
      <CeilingLight />
      <Rug />
      <CoffeeTable />
      <MediaUnit />
      <Sofa />
      <ContactShadows
        position={[0, 0.002, 0.55]}
        opacity={0.16}
        scale={7}
        blur={2.2}
        far={1.6}
      />
      <ViewMemory resetSignal={resetSignal} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        minPolarAngle={0.85}
        maxPolarAngle={Math.PI / 2 + 0.28}
        minAzimuthAngle={-0.7}
        maxAzimuthAngle={0.9}
        minDistance={0.72}
        maxDistance={5.6}
        target={[0.12, 1.0, -0.42]}
      />
    </>
  );
}

function ViewMemory({ resetSignal }: { resetSignal: number }) {
  const controls = useThree((state) => state.controls) as OrbitControlsImpl | null;
  const ready = useRef(false);

  useEffect(() => {
    if (!controls || ready.current) return;
    controls.saveState();
    ready.current = true;
  }, [controls]);

  useEffect(() => {
    if (!resetSignal || !controls) return;
    controls.reset();
  }, [controls, resetSignal]);

  return null;
}

export function WallpaperRoom({
  selection,
  resetSignal,
}: {
  selection: WallpaperPreviewSelection;
  resetSignal: number;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0.15, 1.38, 3.15], fov: 42, near: 0.08, far: 30 }}
      gl={{ antialias: true, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.08 }}
    >
      <Scene selection={selection} resetSignal={resetSignal} />
    </Canvas>
  );
}
