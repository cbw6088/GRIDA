"use client";

import { ContactShadows, Edges, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import {
  ACESFilmicToneMapping,
  CanvasTexture,
  DoubleSide,
  LinearFilter,
  LinearMipmapLinearFilter,
  RepeatWrapping,
  SRGBColorSpace,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { getGrainCanvas, GRAIN_TILE_METERS } from "@/lib/wallpaper-grains";
import {
  getPreviewFinish,
  type PreviewSpaceId,
  type WallpaperPreviewSelection,
} from "@/lib/wallpaper-preview";

type RoomSpec = {
  id: PreviewSpaceId;
  width: number;
  depth: number;
  height: number;
  base: number;
  camera: [number, number, number];
  target: [number, number, number];
  fov: number;
  minDistance: number;
  maxDistance: number;
  floor: "warm" | "cool";
};

const ROOMS: Record<PreviewSpaceId, RoomSpec> = {
  villa: {
    id: "villa",
    width: 3.55,
    depth: 3.05,
    height: 2.38,
    base: 0.1,
    camera: [-0.42, 1.26, 2.2],
    target: [0.45, 0.7, -0.12],
    fov: 50,
    minDistance: 0.65,
    maxDistance: 4.4,
    floor: "warm",
  },
  apartment: {
    id: "apartment",
    width: 6.8,
    depth: 5.2,
    height: 2.92,
    base: 0.1,
    camera: [-1.35, 1.46, 3.35],
    target: [0.7, 0.95, -0.65],
    fov: 46,
    minDistance: 0.9,
    maxDistance: 8.2,
    floor: "cool",
  },
  studio: {
    id: "studio",
    width: 2.7,
    depth: 3.55,
    height: 2.3,
    base: 0.08,
    camera: [0.02, 1.34, 2.72],
    target: [0, 0.88, -0.25],
    fov: 48,
    minDistance: 0.6,
    maxDistance: 4.2,
    floor: "warm",
  },
  office: {
    id: "office",
    width: 5.2,
    depth: 4.0,
    height: 2.7,
    base: 0.08,
    camera: [0.15, 1.48, 3.45],
    target: [0.05, 1.0, -0.25],
    fov: 42,
    minDistance: 0.75,
    maxDistance: 6.2,
    floor: "cool",
  },
};

const RoomContext = createContext<RoomSpec>(ROOMS.villa);

function useRoom() {
  return useContext(RoomContext);
}

const TRIM = "#f7f4ef";
const WOOD = "#c4a077";
const WOOD_DARK = "#8d6b4a";
const EDGE = "#3a342e";

type SurfaceKind = "wood" | "fabric" | "paint" | "metal" | "stone";

const surfaceTextures = new Map<SurfaceKind, CanvasTexture>();

function surfaceTexture(kind: SurfaceKind, anisotropy: number) {
  const cached = surfaceTextures.get(kind);
  if (cached) return cached;

  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const map = new CanvasTexture(canvas);
  map.colorSpace = SRGBColorSpace;
  map.wrapS = RepeatWrapping;
  map.wrapT = RepeatWrapping;
  map.anisotropy = Math.min(anisotropy, 8);
  map.magFilter = LinearFilter;
  map.minFilter = LinearMipmapLinearFilter;
  const context = canvas.getContext("2d");
  if (!context) {
    surfaceTextures.set(kind, map);
    return map;
  }

  const image = context.createImageData(size, size);
  const data = image.data;
  for (let y = 0; y < size; y += 1) {
    const v = y / size;
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      let tone = 236;
      if (kind === "wood") {
        const band = Math.sin(v * Math.PI * 2 * 16) * 9 + Math.sin(v * Math.PI * 2 * 3 + 0.8) * 7;
        const fiber = Math.sin((u * 4 + v * 110) * Math.PI * 2) * 5;
        tone = 228 + band + fiber;
      } else if (kind === "fabric") {
        const warp = Math.sin(u * Math.PI * 2 * 42);
        const weft = Math.sin(v * Math.PI * 2 * 42);
        tone = 226 + warp * weft * 16 + (warp + weft) * 5;
      } else if (kind === "paint") {
        tone = 246 + Math.sin(u * 90 + v * 54) * Math.sin(v * 70 + 0.6) * 5;
      } else if (kind === "metal") {
        tone = 238 + Math.sin(v * Math.PI * 2 * 80) * 6 + Math.sin(u * Math.PI * 2 * 3) * 3;
      } else {
        tone =
          224 +
          Math.sin(u * Math.PI * 2 * 2.4) * Math.sin(v * Math.PI * 2 * 1.8) * 14 +
          Math.sin((u * 3 + v) * Math.PI * 2 * 7) * 5;
      }
      const value = Math.max(0, Math.min(255, tone));
      const index = (y * size + x) * 4;
      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  const repeat = kind === "fabric" ? 3.2 : kind === "metal" ? 5 : kind === "paint" ? 1.4 : 2;
  map.repeat.set(repeat, repeat);
  map.needsUpdate = true;
  surfaceTextures.set(kind, map);
  return map;
}

function FaceMaterial({
  kind,
  color,
  roughness,
  metalness = 0,
  emissive,
  emissiveIntensity = 0,
  side,
}: {
  kind: SurfaceKind;
  color: string;
  roughness: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  side?: typeof DoubleSide;
}) {
  const anisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy());
  const map = useMemo(() => surfaceTexture(kind, anisotropy), [anisotropy, kind]);

  return (
    <meshStandardMaterial
      map={map}
      color={color}
      roughness={roughness}
      metalness={metalness}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
      side={side}
    />
  );
}

function SketchEdges({ threshold = 30 }: { threshold?: number }) {
  return (
    <Edges
      threshold={threshold}
      color={EDGE}
      lineWidth={1.15}
      polygonOffset
      polygonOffsetFactor={-2}
      polygonOffsetUnits={-2}
    />
  );
}

function Crisp({
  args,
  position,
  rotation,
  color,
  kind = "paint",
  roughness = 0.55,
  metalness = 0,
  castShadow = true,
  receiveShadow = false,
  emissive,
  emissiveIntensity,
}: {
  args: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  kind?: SurfaceKind;
  roughness?: number;
  metalness?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow={receiveShadow}>
      <boxGeometry args={args} />
      <FaceMaterial
        kind={kind}
        color={color}
        roughness={roughness}
        metalness={metalness}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
      <SketchEdges />
    </mesh>
  );
}

function RoundPiece({
  args,
  position,
  rotation,
  color,
  kind = "wood",
  roughness = 0.46,
  metalness = 0,
  open = false,
  side,
  castShadow = true,
  receiveShadow = false,
  emissive,
  emissiveIntensity,
}: {
  args: [number, number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  kind?: SurfaceKind;
  roughness?: number;
  metalness?: number;
  open?: boolean;
  side?: typeof DoubleSide;
  castShadow?: boolean;
  receiveShadow?: boolean;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow={receiveShadow}>
      <cylinderGeometry args={[args[0], args[1], args[2], args[3], 1, open]} />
      <FaceMaterial
        kind={kind}
        color={color}
        roughness={roughness}
        metalness={metalness}
        side={side}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
      <SketchEdges threshold={26} />
    </mesh>
  );
}

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
        clearcoatRoughness={0.4}
      />
    </mesh>
  );
}

function RoomWalls({ selection }: { selection: WallpaperPreviewSelection }) {
  const room = useRoom();
  const wallHeight = room.height - room.base;
  const y = room.base + wallHeight / 2;
  const backColor = selection.accent === "color" ? selection.accentColor : selection.color;

  return (
    <group>
      <WallpaperPlane
        size={[room.width, wallHeight]}
        position={[0, y, -room.depth / 2]}
        rotation={[0, 0, 0]}
        selection={selection}
        color={backColor}
      />
      <WallpaperPlane
        size={[room.depth, wallHeight]}
        position={[-room.width / 2, y, 0]}
        rotation={[0, Math.PI / 2, 0]}
        selection={selection}
        color={selection.color}
      />
      <WallpaperPlane
        size={[room.depth, wallHeight]}
        position={[room.width / 2, y, 0]}
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
  const room = useRoom();
  const finish = getPreviewFinish(selection.finishId);
  if (finish.seam !== "hapji") return null;

  const wallHeight = room.height - room.base;
  const y = room.base + wallHeight / 2;
  const across: number[] = [];
  const along: number[] = [];
  for (let meter = finish.rollWidth; meter < room.width - 0.04; meter += finish.rollWidth) {
    across.push(Number(meter.toFixed(3)));
  }
  for (let meter = finish.rollWidth; meter < room.depth - 0.04; meter += finish.rollWidth) {
    along.push(Number(meter.toFixed(3)));
  }

  return (
    <group>
      {across.map((meter) => (
        <SeamLine
          key={`back-${meter}`}
          args={[0.004, wallHeight]}
          position={[-room.width / 2 + meter, y, -room.depth / 2 + 0.012]}
        />
      ))}
      {along.map((meter) => (
        <SeamLine
          key={`left-${meter}`}
          args={[0.004, wallHeight]}
          position={[-room.width / 2 + 0.012, y, -room.depth / 2 + meter]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
      {along.map((meter) => (
        <SeamLine
          key={`right-${meter}`}
          args={[0.004, wallHeight]}
          position={[room.width / 2 - 0.012, y, room.depth / 2 - meter]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      ))}
      {across.map((meter) => (
        <SeamLine
          key={`ceiling-${meter}`}
          args={[0.004, room.depth]}
          position={[-room.width / 2 + meter, room.height - 0.01, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      ))}
    </group>
  );
}

function Ceiling({ selection }: { selection: WallpaperPreviewSelection }) {
  const room = useRoom();
  if (room.id === "apartment") return <CofferedCeiling selection={selection} />;

  const color = selection.ceiling === "color" ? selection.ceilingColor : selection.color;

  return (
    <WallpaperPlane
      size={[room.width, room.depth]}
      position={[0, room.height - 0.002, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      selection={selection}
      color={color}
    />
  );
}

function RecessedLight({ x, z }: { x: number; z: number }) {
  const room = useRoom();

  return (
    <group position={[x, room.height - 0.02, z]}>
      <mesh>
        <cylinderGeometry args={[0.085, 0.085, 0.014, 28]} />
        <meshStandardMaterial color="#f3efe8" metalness={0.28} roughness={0.38} />
      </mesh>
      <mesh position={[0, -0.009, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.048, 24]} />
        <meshBasicMaterial color="#fff6d4" />
      </mesh>
      <FixtureGlow position={[0, -0.04, 0]} intensity={0.55} distance={0.4} />
    </group>
  );
}

function CofferedCeiling({ selection }: { selection: WallpaperPreviewSelection }) {
  const room = useRoom();
  const color = selection.ceiling === "color" ? selection.ceilingColor : selection.color;
  const border = 0.72;
  const rise = 0.14;
  const yTop = room.height - 0.002;
  const ySoffit = yTop - rise;
  const innerW = room.width - border * 2;
  const innerD = room.depth - border * 2;
  const yRise = yTop - rise / 2;
  const lights = [
    [-1.7, -1.05],
    [0, -1.05],
    [1.7, -1.05],
    [-1.7, 0.85],
    [0, 0.85],
    [1.7, 0.85],
  ] as const;

  return (
    <group>
      <WallpaperPlane
        size={[innerW, innerD]}
        position={[0, yTop, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        selection={selection}
        color={color}
      />
      <WallpaperPlane
        size={[room.width, border]}
        position={[0, ySoffit, -room.depth / 2 + border / 2]}
        rotation={[Math.PI / 2, 0, 0]}
        selection={selection}
        color={color}
      />
      <WallpaperPlane
        size={[room.width, border]}
        position={[0, ySoffit, room.depth / 2 - border / 2]}
        rotation={[Math.PI / 2, 0, 0]}
        selection={selection}
        color={color}
      />
      <WallpaperPlane
        size={[border, innerD]}
        position={[-room.width / 2 + border / 2, ySoffit, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        selection={selection}
        color={color}
      />
      <WallpaperPlane
        size={[border, innerD]}
        position={[room.width / 2 - border / 2, ySoffit, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        selection={selection}
        color={color}
      />
      <Crisp args={[innerW, rise, 0.025]} position={[0, yRise, -innerD / 2]} color={TRIM} kind="paint" roughness={0.5} />
      <Crisp args={[innerW, rise, 0.025]} position={[0, yRise, innerD / 2]} color={TRIM} kind="paint" roughness={0.5} />
      <Crisp args={[0.025, rise, innerD]} position={[-innerW / 2, yRise, 0]} color={TRIM} kind="paint" roughness={0.5} />
      <Crisp args={[0.025, rise, innerD]} position={[innerW / 2, yRise, 0]} color={TRIM} kind="paint" roughness={0.5} />
      {lights.map(([x, z]) => (
        <RecessedLight key={`${x}-${z}`} x={x} z={z} />
      ))}
    </group>
  );
}

function useWoodFloor() {
  const room = useRoom();
  const gl = useThree((state) => state.gl);
  const texture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.magFilter = LinearFilter;
    map.minFilter = LinearMipmapLinearFilter;
    map.anisotropy = gl.capabilities.getMaxAnisotropy();
    map.repeat.set(room.width / 1.6, room.depth / 1.6);
    const context = canvas.getContext("2d");
    if (!context) return map;

    const warm = room.floor === "warm";
    context.fillStyle = warm ? "#e8d4b6" : "#ddd6c8";
    context.fillRect(0, 0, size, size);
    const plank = 96;
    for (let y = 0; y < size; y += plank) {
      const row = y / plank;
      const tone = (warm ? 196 : 186) + (row % 5) * 8;
      context.fillStyle = warm
        ? `rgb(${tone + 34}, ${tone - 4}, ${tone - 46})`
        : `rgb(${tone + 6}, ${tone + 2}, ${tone - 6})`;
      context.fillRect(0, y + 1, size, plank - 2);
      context.strokeStyle = "rgba(112, 76, 44, 0.16)";
      context.lineWidth = 1;
      for (let line = 10; line < plank - 8; line += 8) {
        const wave = ((row * 13 + line) % 7) - 3;
        context.beginPath();
        context.moveTo(0, y + line);
        context.bezierCurveTo(size * 0.35, y + line + wave, size * 0.68, y + line - wave, size, y + line + 1);
        context.stroke();
      }
      context.strokeStyle = "rgba(92, 64, 38, 0.38)";
      context.strokeRect(0.5, y + 0.5, size - 1, plank - 2);
      const seam = ((row * 173) % (size - 80)) + 40;
      context.beginPath();
      context.moveTo(seam, y + 2);
      context.lineTo(seam, y + plank - 3);
      context.stroke();
    }
    map.needsUpdate = true;
    return map;
  }, [gl, room.depth, room.floor, room.width]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return texture;
}

function WoodFloor() {
  const room = useRoom();
  const texture = useWoodFloor();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[room.width, room.depth]} />
      <meshStandardMaterial map={texture} roughness={0.62} />
    </mesh>
  );
}

function TrimBox({
  args,
  position,
  rotation,
  color = TRIM,
}: {
  args: [number, number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}) {
  return (
    <Crisp
      args={args}
      position={position}
      rotation={rotation}
      color={color}
      kind="paint"
      roughness={0.62}
      receiveShadow
    />
  );
}

function Baseboards() {
  const room = useRoom();
  const depth = 0.055;
  return (
    <group>
      <TrimBox
        args={[room.width, room.base, depth]}
        position={[0, room.base / 2, -room.depth / 2 + depth / 2]}
      />
      <TrimBox
        args={[depth, room.base, room.depth]}
        position={[-room.width / 2 + depth / 2, room.base / 2, 0]}
      />
      <TrimBox
        args={[depth, room.base, room.depth]}
        position={[room.width / 2 - depth / 2, room.base / 2, 0]}
      />
    </group>
  );
}

function Cornice() {
  const room = useRoom();
  const lip = 0.05;
  const y = room.height - lip / 2;
  return (
    <group>
      <TrimBox args={[room.width, lip, lip]} position={[0, y, -room.depth / 2 + lip / 2]} />
      <TrimBox args={[lip, lip, room.depth]} position={[-room.width / 2 + lip / 2, y, 0]} />
      <TrimBox args={[lip, lip, room.depth]} position={[room.width / 2 - lip / 2, y, 0]} />
    </group>
  );
}

function useSkyTexture() {
  const gl = useThree((state) => state.gl);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 400;
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    map.magFilter = LinearFilter;
    map.minFilter = LinearMipmapLinearFilter;
    map.anisotropy = gl.capabilities.getMaxAnisotropy();
    const context = canvas.getContext("2d");
    if (!context) return map;

    const sky = context.createLinearGradient(0, 0, 0, 400);
    sky.addColorStop(0, "#e8f3fb");
    sky.addColorStop(0.7, "#d6e6f2");
    sky.addColorStop(1, "#e4eee6");
    context.fillStyle = sky;
    context.fillRect(0, 0, 640, 400);
    context.fillStyle = "rgba(186, 198, 196, 0.72)";
    [28, 108, 196, 270, 360, 448, 530].forEach((x, index) => {
      const height = 48 + (index % 3) * 22;
      context.fillRect(x, 400 - height, 78, height);
    });
    map.needsUpdate = true;
    return map;
  }, [gl]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return texture;
}

function Window({
  position,
  width,
  height,
  panes,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  panes: number;
}) {
  const sky = useSkyTexture();
  const mullions = Array.from({ length: panes - 1 }, (_, index) => {
    return -width / 2 + ((index + 1) * width) / panes;
  });

  return (
    <group position={position}>
      <mesh position={[0, 0, 0.012]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={sky}
          roughness={0.28}
          metalness={0.02}
          emissive="#d5e6f2"
          emissiveIntensity={0.16}
        />
        <SketchEdges threshold={20} />
      </mesh>
      <TrimBox args={[width + 0.14, 0.07, 0.06]} position={[0, height / 2 + 0.02, 0.03]} />
      <TrimBox args={[width + 0.14, 0.07, 0.06]} position={[0, -height / 2 - 0.02, 0.03]} />
      <TrimBox args={[0.07, height + 0.1, 0.06]} position={[-width / 2 - 0.02, 0, 0.03]} />
      <TrimBox args={[0.07, height + 0.1, 0.06]} position={[width / 2 + 0.02, 0, 0.03]} />
      {mullions.map((x) => (
        <TrimBox key={x} args={[0.03, height, 0.045]} position={[x, 0, 0.036]} />
      ))}
      <Crisp
        args={[width + 0.28, 0.045, 0.14]}
        position={[0, -height / 2 - 0.08, 0.08]}
        color={TRIM}
        kind="paint"
        roughness={0.55}
        receiveShadow
      />
    </group>
  );
}

function Curtain({ position, height }: { position: [number, number, number]; height: number }) {
  return (
    <group position={position}>
      <RoundPiece
        args={[0.012, 0.012, 0.52, 12]}
        position={[0.18, height / 2 + 0.02, 0]}
        rotation={[0, 0, Math.PI / 2]}
        color="#cfc6ba"
        kind="metal"
        metalness={0.45}
        roughness={0.38}
      />
      {[0, 1, 2, 3, 4, 5, 6].map((index) => (
        <mesh
          key={index}
          position={[index * 0.055, -0.02, (index % 2) * 0.02]}
          rotation={[0, index % 2 === 0 ? 0.22 : -0.08, 0]}
          castShadow
        >
          <boxGeometry args={[0.07, height, 0.016]} />
          <FaceMaterial kind="fabric" color={index % 2 === 0 ? "#f4efe6" : "#e7ddd0"} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Door({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <TrimBox args={[0.98, 2.12, 0.06]} position={[0, 0, 0.02]} />
      <Crisp args={[0.84, 2.02, 0.04]} position={[0, -0.02, 0.055]} color="#fbf9f6" kind="paint" roughness={0.48} />
      <Crisp args={[0.62, 0.72, 0.012]} position={[0, 0.42, 0.082]} color="#f3eee6" kind="paint" roughness={0.55} />
      <Crisp args={[0.62, 0.72, 0.012]} position={[0, -0.52, 0.082]} color="#f3eee6" kind="paint" roughness={0.55} />
      <RoundPiece
        args={[0.012, 0.012, 0.12, 12]}
        position={[0.32, 0.02, 0.095]}
        rotation={[0, 0, Math.PI / 2]}
        color="#b7ab9e"
        kind="metal"
        roughness={0.32}
        metalness={0.62}
      />
    </group>
  );
}

function Sofa({
  position,
  rotation,
  width,
  fabric,
  pillow,
  pillow2,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width: number;
  fabric: string;
  pillow?: string;
  pillow2?: string;
}) {
  const depth = 0.8;
  const gap = 0.03;
  const inner = width - 0.24;
  const cushion = (inner - gap * 2) / 3;
  const seats = [-cushion - gap, 0, cushion + gap];

  return (
    <group position={position} rotation={rotation}>
      {[
        [-width / 2 + 0.12, -depth / 2 + 0.08],
        [width / 2 - 0.12, -depth / 2 + 0.08],
        [-width / 2 + 0.12, depth / 2 - 0.1],
        [width / 2 - 0.12, depth / 2 - 0.1],
      ].map(([x, z]) => (
        <RoundPiece
          key={`${x}-${z}`}
          args={[0.02, 0.026, 0.11, 12]}
          position={[x, 0.055, z]}
          color="#4e463f"
          kind="wood"
          roughness={0.5}
        />
      ))}
      <RoundedBox
        args={[width, 0.1, depth * 0.9]}
        radius={0.025}
        smoothness={3}
        position={[0, 0.15, 0]}
        castShadow
        receiveShadow
      >
        <FaceMaterial kind="fabric" color="#d4cdc3" roughness={0.82} />
        <SketchEdges threshold={24} />
      </RoundedBox>
      {seats.map((x) => (
        <RoundedBox
          key={`seat-${x}`}
          args={[cushion, 0.13, depth * 0.7]}
          radius={0.04}
          smoothness={4}
          position={[x, 0.27, 0.03]}
          castShadow
        >
          <FaceMaterial kind="fabric" color={fabric} roughness={0.88} />
          <SketchEdges threshold={24} />
        </RoundedBox>
      ))}
      <RoundedBox
        args={[width - 0.08, 0.28, 0.12]}
        radius={0.04}
        smoothness={4}
        position={[0, 0.4, -depth * 0.36]}
        castShadow
      >
        <FaceMaterial kind="fabric" color={fabric} roughness={0.88} />
        <SketchEdges threshold={24} />
      </RoundedBox>
      {seats.map((x) => (
        <RoundedBox
          key={`back-${x}`}
          args={[cushion * 0.92, 0.22, 0.11]}
          radius={0.045}
          smoothness={5}
          position={[x, 0.42, -depth * 0.2]}
          rotation={[-0.12, 0, 0]}
          castShadow
        >
          <FaceMaterial kind="fabric" color={fabric} roughness={0.86} />
          <SketchEdges threshold={24} />
        </RoundedBox>
      ))}
      {[-1, 1].map((side) => (
        <RoundedBox
          key={side}
          args={[0.12, 0.28, depth * 0.84]}
          radius={0.05}
          smoothness={4}
          position={[(side * (width - 0.12)) / 2, 0.34, 0.01]}
          castShadow
        >
          <FaceMaterial kind="fabric" color={fabric} roughness={0.88} />
          <SketchEdges threshold={24} />
        </RoundedBox>
      ))}
      {pillow ? (
        <RoundedBox
          args={[0.32, 0.2, 0.1]}
          radius={0.04}
          smoothness={4}
          position={[width * 0.22, 0.4, 0.06]}
          rotation={[0.15, 0.35, 0.2]}
          castShadow
        >
          <FaceMaterial kind="fabric" color={pillow} roughness={0.88} />
          <SketchEdges threshold={24} />
        </RoundedBox>
      ) : null}
      {pillow2 ? (
        <RoundedBox
          args={[0.28, 0.18, 0.1]}
          radius={0.04}
          smoothness={4}
          position={[-width * 0.18, 0.4, 0.04]}
          rotation={[0.1, -0.4, -0.12]}
          castShadow
        >
          <FaceMaterial kind="fabric" color={pillow2} roughness={0.88} />
          <SketchEdges threshold={24} />
        </RoundedBox>
      ) : null}
    </group>
  );
}

function RectangularTable({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Crisp
        args={[0.96, 0.028, 0.52]}
        position={[0, 0.34, 0]}
        color={WOOD}
        kind="wood"
        roughness={0.4}
        receiveShadow
      />
      {[
        [-0.4, -0.18],
        [0.4, -0.18],
        [-0.4, 0.18],
        [0.4, 0.18],
      ].map(([x, z]) => (
        <RoundPiece
          key={`${x}-${z}`}
          args={[0.016, 0.016, 0.32, 12]}
          position={[x, 0.16, z]}
          color={WOOD_DARK}
          kind="wood"
          roughness={0.46}
        />
      ))}
      <Crisp args={[0.22, 0.016, 0.16]} position={[-0.18, 0.364, 0.02]} color="#efe8df" kind="paint" roughness={0.7} />
      <RoundPiece
        args={[0.04, 0.034, 0.05, 20]}
        position={[0.16, 0.372, -0.04]}
        color="#f4f1ea"
        kind="paint"
        roughness={0.4}
      />
    </group>
  );
}

function RoundTable({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RoundPiece
        args={[0.46, 0.46, 0.032, 48]}
        position={[0, 0.36, 0]}
        color="#6d6560"
        kind="stone"
        roughness={0.32}
        metalness={0.04}
        receiveShadow
      />
      <RoundPiece
        args={[0.04, 0.048, 0.32, 16]}
        position={[0, 0.18, 0]}
        color="#c8bba4"
        kind="metal"
        metalness={0.55}
        roughness={0.32}
      />
      <RoundPiece
        args={[0.22, 0.22, 0.018, 32]}
        position={[0, 0.03, 0]}
        color="#c8bba4"
        kind="metal"
        metalness={0.5}
        roughness={0.34}
        receiveShadow
      />
    </group>
  );
}

function Rug({
  position,
  size,
  fill,
  edge,
}: {
  position: [number, number, number];
  size: [number, number];
  fill: string;
  edge: string;
}) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={size} />
        <FaceMaterial kind="fabric" color={edge} roughness={0.94} />
        <SketchEdges threshold={20} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]} receiveShadow>
        <planeGeometry args={[size[0] - 0.12, size[1] - 0.12]} />
        <FaceMaterial kind="fabric" color={fill} roughness={0.92} />
      </mesh>
    </group>
  );
}

function Television({ width, height }: { width: number; height: number }) {
  return (
    <group>
      <Crisp args={[width, height, 0.018]} color="#1a1a1a" kind="paint" roughness={0.32} metalness={0.35} />
      <mesh position={[0, 0, 0.011]}>
        <planeGeometry args={[width - 0.036, height - 0.036]} />
        <meshStandardMaterial
          color="#243044"
          roughness={0.14}
          metalness={0.4}
          emissive="#172433"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

function VillaMedia({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <Crisp args={[0.92, 0.08, 0.36]} position={[0, 0.04, 0]} color="#6e533c" kind="wood" roughness={0.5} receiveShadow />
      <Crisp args={[0.9, 0.28, 0.34]} position={[0, 0.22, -0.005]} color={WOOD_DARK} kind="wood" roughness={0.48} />
      {[-0.22, 0.22].map((x) => (
        <Crisp
          key={x}
          args={[0.4, 0.24, 0.016]}
          position={[x, 0.22, 0.172]}
          color="#a88864"
          kind="wood"
          roughness={0.46}
        />
      ))}
      <Crisp args={[0.98, 0.028, 0.4]} position={[0, 0.4, 0]} color="#d9c4a4" kind="wood" roughness={0.38} />
      <group position={[0, 0.68, -0.08]}>
        <Television width={0.72} height={0.42} />
        <Crisp args={[0.08, 0.04, 0.03]} position={[0, -0.24, 0.01]} color="#2a2a2a" kind="metal" roughness={0.35} metalness={0.5} />
        <Crisp
          args={[0.16, 0.012, 0.018]}
          position={[-0.12, -0.3, 0.02]}
          rotation={[0, 0, 0.35]}
          color="#3a3a3a"
          kind="metal"
          roughness={0.35}
          metalness={0.55}
        />
        <Crisp
          args={[0.16, 0.012, 0.018]}
          position={[0.12, -0.3, 0.02]}
          rotation={[0, 0, -0.35]}
          color="#3a3a3a"
          kind="metal"
          roughness={0.35}
          metalness={0.55}
        />
      </group>
    </group>
  );
}

function ApartmentMedia({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <Crisp args={[1.35, 0.08, 0.38]} position={[0, 0.04, 0]} color="#5c4634" kind="wood" roughness={0.5} receiveShadow />
      <Crisp args={[1.32, 0.34, 0.36]} position={[0, 0.26, -0.006]} color="#6e543c" kind="wood" roughness={0.46} />
      {[-0.32, 0.32].map((x) => (
        <Crisp
          key={x}
          args={[0.6, 0.3, 0.016]}
          position={[x, 0.26, 0.18]}
          color="#8b6a48"
          kind="wood"
          roughness={0.44}
        />
      ))}
      <Crisp args={[1.42, 0.028, 0.42]} position={[0, 0.48, 0]} color="#d7c3a4" kind="wood" roughness={0.36} />
      <group position={[0, 0.86, -0.06]}>
        <Television width={1.05} height={0.6} />
      </group>
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RoundPiece
        args={[0.11, 0.086, 0.16, 24]}
        position={[0, 0.09, 0]}
        color="#f3efe8"
        kind="paint"
        roughness={0.6}
      />
      <RoundPiece args={[0.012, 0.014, 0.18, 8]} position={[0, 0.22, 0]} color="#6d7a5c" kind="wood" roughness={0.7} />
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <mesh
          key={index}
          position={[
            Math.sin(index * 1.15) * 0.11,
            0.36 + (index % 3) * 0.05,
            Math.cos(index * 1.15) * 0.08,
          ]}
          rotation={[0.7, index * 0.8, 0.4]}
          scale={[1, 0.28, 0.62]}
          castShadow
        >
          <sphereGeometry args={[0.1, 16, 10]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#6f8f72" : "#87a388"} roughness={0.72} />
        </mesh>
      ))}
    </group>
  );
}

function FixtureGlow({
  position,
  distance,
  intensity,
}: {
  position?: [number, number, number];
  distance: number;
  intensity: number;
}) {
  return (
    <pointLight
      position={position}
      color="#fff3d4"
      intensity={intensity}
      distance={distance}
      decay={2}
    />
  );
}

function FloorLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RoundPiece
        args={[0.14, 0.16, 0.028, 28]}
        position={[0, 0.02, 0]}
        color="#c6b396"
        kind="metal"
        metalness={0.55}
        roughness={0.32}
        receiveShadow
      />
      <RoundPiece
        args={[0.012, 0.012, 1.64, 12]}
        position={[0, 0.86, 0]}
        color="#c6b396"
        kind="metal"
        metalness={0.6}
        roughness={0.3}
      />
      <RoundPiece
        args={[0.16, 0.22, 0.26, 28]}
        position={[0, 1.68, 0]}
        color="#fff8ee"
        kind="fabric"
        roughness={0.62}
        open
        side={DoubleSide}
        emissive="#fff1cc"
        emissiveIntensity={1.6}
      />
      <mesh position={[0, 1.64, 0]}>
        <sphereGeometry args={[0.045, 16, 12]} />
        <meshBasicMaterial color="#fff6d8" />
      </mesh>
      <FixtureGlow position={[0, 1.64, 0]} intensity={1.4} distance={0.55} />
    </group>
  );
}

function CeilingLight() {
  const room = useRoom();
  return (
    <group position={[0.05, room.height - 0.01, -0.05]}>
      <RoundPiece args={[0.07, 0.07, 0.016, 24]} color="#f4f1ea" kind="paint" roughness={0.42} />
      <mesh position={[0, -0.05, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.12, 28, 16, 0, Math.PI * 2, 0, Math.PI * 0.46]} />
        <FaceMaterial kind="paint" color="#fffdf8" emissive="#fff4d2" emissiveIntensity={2.2} roughness={0.28} />
        <SketchEdges threshold={24} />
      </mesh>
      <mesh position={[0, -0.07, 0]}>
        <sphereGeometry args={[0.04, 16, 12]} />
        <meshBasicMaterial color="#fff6d4" />
      </mesh>
      <FixtureGlow position={[0, -0.08, 0]} intensity={1.1} distance={0.6} />
    </group>
  );
}

function Bed({
  position,
  rotation,
  length = 1.95,
  width = 1.05,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  length?: number;
  width?: number;
}) {
  return (
    <group position={position} rotation={rotation}>
      {[
        [-width / 2 + 0.08, -length / 2 + 0.1],
        [width / 2 - 0.08, -length / 2 + 0.1],
        [-width / 2 + 0.08, length / 2 - 0.08],
        [width / 2 - 0.08, length / 2 - 0.08],
      ].map(([x, z]) => (
        <RoundPiece
          key={`${x}-${z}`}
          args={[0.02, 0.022, 0.1, 10]}
          position={[x, 0.05, z]}
          color={WOOD_DARK}
          kind="wood"
          roughness={0.5}
        />
      ))}
      <Crisp args={[width + 0.04, 0.08, length - 0.02]} position={[0, 0.12, 0.02]} color="#c4a888" kind="wood" roughness={0.5} />
      <Crisp
        args={[width + 0.08, 0.5, 0.05]}
        position={[0, 0.38, -length / 2 + 0.03]}
        color="#c4a888"
        kind="wood"
        roughness={0.48}
      />
      <Crisp
        args={[width * 0.62, 0.3, 0.012]}
        position={[0, 0.4, -length / 2 + 0.062]}
        color="#f6f1e8"
        kind="paint"
        roughness={0.55}
      />
      <RoundedBox
        args={[width, 0.14, length * 0.92]}
        radius={0.03}
        smoothness={3}
        position={[0, 0.22, 0.04]}
        castShadow
        receiveShadow
      >
        <FaceMaterial kind="fabric" color="#f7f4ef" roughness={0.84} />
        <SketchEdges threshold={24} />
      </RoundedBox>
      <RoundedBox
        args={[width - 0.08, 0.06, length * 0.5]}
        radius={0.025}
        smoothness={3}
        position={[0, 0.32, 0.2]}
        castShadow
      >
        <FaceMaterial kind="fabric" color="#e4dbd1" roughness={0.88} />
        <SketchEdges threshold={24} />
      </RoundedBox>
      {[-0.18, 0.18].map((x) => (
        <RoundedBox
          key={x}
          args={[0.38, 0.07, 0.24]}
          radius={0.03}
          smoothness={3}
          position={[x, 0.38, -length / 2 + 0.28]}
          castShadow
        >
          <FaceMaterial kind="fabric" color="#f7f4ef" roughness={0.78} />
          <SketchEdges threshold={24} />
        </RoundedBox>
      ))}
    </group>
  );
}

function Desk({
  position,
  rotation,
  width = 1.15,
  top = "#d9c4a4",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  top?: string;
}) {
  const pedestal = Math.min(0.4, width * 0.36);
  const drawers = [0.56, 0.4, 0.24];

  return (
    <group position={position} rotation={rotation}>
      <Crisp
        args={[width, 0.032, 0.6]}
        position={[0, 0.74, 0]}
        color={top}
        kind="wood"
        roughness={0.4}
        receiveShadow
      />
      {[-1, 1].map((side) => (
        <Crisp
          key={side}
          args={[pedestal, 0.7, 0.52]}
          position={[side * (width / 2 - pedestal / 2 - 0.02), 0.35, 0]}
          color={top}
          kind="wood"
          roughness={0.46}
        />
      ))}
      {drawers.map((y) => (
        <Crisp
          key={y}
          args={[pedestal - 0.06, 0.12, 0.012]}
          position={[-(width / 2 - pedestal / 2 - 0.02), y, 0.266]}
          color={top}
          kind="wood"
          roughness={0.42}
        />
      ))}
    </group>
  );
}

function OfficeChair({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {[0, 1, 2, 3, 4].map((index) => (
        <group key={index} rotation={[0, (index * Math.PI * 2) / 5, 0]}>
          <Crisp
            args={[0.24, 0.016, 0.032]}
            position={[0.12, 0.045, 0]}
            color="#8d8a86"
            kind="metal"
            metalness={0.65}
            roughness={0.32}
          />
          <mesh position={[0.25, 0.028, 0]}>
            <sphereGeometry args={[0.018, 12, 8]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.55} />
          </mesh>
        </group>
      ))}
      <RoundPiece
        args={[0.018, 0.02, 0.32, 12]}
        position={[0, 0.22, 0]}
        color="#9a9692"
        kind="metal"
        metalness={0.7}
        roughness={0.3}
      />
      <Crisp args={[0.46, 0.05, 0.44]} position={[0, 0.46, 0.02]} color="#3a3e44" kind="fabric" roughness={0.62} />
      <Crisp args={[0.44, 0.4, 0.045]} position={[0, 0.72, -0.18]} color="#3a3e44" kind="fabric" roughness={0.62} />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Crisp
            args={[0.028, 0.16, 0.028]}
            position={[side * 0.24, 0.56, 0.02]}
            color="#8d8a86"
            kind="metal"
            metalness={0.6}
            roughness={0.34}
          />
          <Crisp
            args={[0.04, 0.018, 0.26]}
            position={[side * 0.24, 0.64, 0.04]}
            color="#2f3338"
            kind="paint"
            roughness={0.42}
          />
        </group>
      ))}
    </group>
  );
}

function Kitchenette({
  position,
  rotation,
  length = 1.45,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  length?: number;
}) {
  const door = length / 2 - 0.04;

  return (
    <group position={position} rotation={rotation}>
      <Crisp args={[length, 0.08, 0.5]} position={[0, 0.04, 0]} color="#e5ded4" kind="paint" roughness={0.6} receiveShadow />
      <Crisp args={[length - 0.02, 0.72, 0.48]} position={[0, 0.44, -0.01]} color="#f7f4ef" kind="paint" roughness={0.52} />
      {[-1, 1].map((side) => (
        <Crisp
          key={side}
          args={[door, 0.64, 0.016]}
          position={[side * (door / 2 + 0.012), 0.44, 0.236]}
          color="#fbf9f6"
          kind="paint"
          roughness={0.48}
        />
      ))}
      {[-1, 1].map((side) => (
        <RoundPiece
          key={`handle-${side}`}
          args={[0.008, 0.008, 0.09, 10]}
          position={[side * 0.04, 0.44, 0.25]}
          rotation={[Math.PI / 2, 0, 0]}
          color="#b7ab9e"
          kind="metal"
          metalness={0.65}
          roughness={0.3}
        />
      ))}
      <Crisp
        args={[length + 0.04, 0.035, 0.56]}
        position={[0, 0.84, 0.01]}
        color="#e4ddd4"
        kind="stone"
        roughness={0.38}
        receiveShadow
      />
      <Crisp args={[0.36, 0.02, 0.26]} position={[0.12, 0.868, 0.04]} color="#c5ced4" kind="metal" metalness={0.35} roughness={0.28} />
    </group>
  );
}

function Wardrobe({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <Crisp args={[0.82, 0.08, 0.5]} position={[0, 0.04, 0]} color="#e6dfd6" kind="paint" roughness={0.58} receiveShadow />
      <Crisp args={[0.78, 1.74, 0.46]} position={[0, 0.95, -0.008]} color="#f4f1eb" kind="paint" roughness={0.5} />
      {[-0.185, 0.185].map((x) => (
        <Crisp
          key={x}
          args={[0.35, 1.62, 0.016]}
          position={[x, 0.98, 0.23]}
          color="#fbf9f6"
          kind="paint"
          roughness={0.46}
        />
      ))}
      {[-0.04, 0.04].map((x) => (
        <RoundPiece
          key={x}
          args={[0.008, 0.008, 0.11, 10]}
          position={[x, 0.98, 0.248]}
          rotation={[Math.PI / 2, 0, 0]}
          color="#b7ab9e"
          kind="metal"
          metalness={0.65}
          roughness={0.3}
        />
      ))}
      <Crisp args={[0.84, 0.03, 0.5]} position={[0, 1.84, 0]} color="#f7f4ef" kind="paint" roughness={0.5} />
    </group>
  );
}

function Blinds({
  position,
  width,
  height,
}: {
  position: [number, number, number];
  width: number;
  height: number;
}) {
  const count = 9;
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, index) => (
        <Crisp
          key={index}
          args={[width, 0.012, 0.018]}
          position={[0, height / 2 - ((index + 0.5) * height) / count, 0.03]}
          color="#f4f2ee"
          kind="paint"
          roughness={0.62}
        />
      ))}
    </group>
  );
}

function PanelLight() {
  const room = useRoom();
  return (
    <group position={[0, room.height - 0.015, -0.1]}>
      <Crisp
        args={[1.35, 0.02, 0.32]}
        color="#fffdf8"
        kind="paint"
        roughness={0.35}
        emissive="#fff4d2"
        emissiveIntensity={1.8}
      />
      <mesh position={[0, -0.018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.15, 0.18]} />
        <meshBasicMaterial color="#fff6d4" side={DoubleSide} />
      </mesh>
      <FixtureGlow position={[0, -0.06, 0]} intensity={0.8} distance={0.45} />
    </group>
  );
}

function VillaFurnishings() {
  const room = useRoom();
  const back = -room.depth / 2;
  return (
    <group>
      <Window position={[0.28, 1.28, back + 0.03]} width={1.05} height={0.92} panes={2} />
      <Curtain position={[-0.55, 1.32, back + 0.08]} height={1.15} />
      <Curtain position={[0.78, 1.32, back + 0.08]} height={1.15} />
      <Door position={[-1.22, 1.08, back + 0.03]} />
      <CeilingLight />
      <FloorLamp position={[1.42, 0, -0.95]} />
      <Rug position={[0.05, 0.012, 0.22]} size={[2.05, 1.55]} fill="#e7d3be" edge="#c9a888" />
      <RectangularTable position={[0.05, 0, 0.22]} />
      <VillaMedia position={[room.width / 2 - 0.26, 0, -0.05]} rotation={[0, -Math.PI / 2, 0]} />
      <Sofa
        position={[-room.width / 2 + 0.44, 0, 0.28]}
        rotation={[0, Math.PI / 2, 0]}
        width={1.5}
        fabric="#ead8c4"
        pillow="#d7b49a"
        pillow2="#c98b6a"
      />
    </group>
  );
}

function ApartmentFurnishings() {
  const room = useRoom();
  const back = -room.depth / 2;
  return (
    <group>
      <Window position={[-0.15, 1.62, back + 0.03]} width={3.6} height={1.9} panes={3} />
      <Curtain position={[1.75, 1.7, back + 0.08]} height={1.85} />
      <Door position={[room.width / 2 - 0.04, 1.15, 1.35]} rotation={[0, -Math.PI / 2, 0]} />
      <FloorLamp position={[-2.35, 0, -2.15]} />
      <Plant position={[-2.9, 0, -2.35]} />
      <Rug position={[-1.45, 0.012, -0.7]} size={[2.3, 2.7]} fill="#f4f1ec" edge="#d9d3cb" />
      <RoundTable position={[-1.15, 0, -0.55]} />
      <ApartmentMedia position={[room.width / 2 - 0.28, 0, -0.7]} rotation={[0, -Math.PI / 2, 0]} />
      <Sofa
        position={[-room.width / 2 + 0.46, 0, -0.75]}
        rotation={[0, Math.PI / 2, 0]}
        width={2.55}
        fabric="#e6e2dc"
      />
    </group>
  );
}

function StudioFurnishings() {
  const room = useRoom();
  const back = -room.depth / 2;
  return (
    <group>
      <Window position={[0.05, 1.22, back + 0.03]} width={0.85} height={0.78} panes={1} />
      <Curtain position={[0.48, 1.22, back + 0.07]} height={0.9} />
      <Door position={[-room.width / 2 + 0.04, 1.05, 0.85]} rotation={[0, Math.PI / 2, 0]} />
      <CeilingLight />
      <Bed position={[-0.28, 0, -0.35]} length={1.85} width={0.95} />
      <Kitchenette position={[room.width / 2 - 0.28, 0, 0.35]} rotation={[0, -Math.PI / 2, 0]} length={1.35} />
    </group>
  );
}

function OfficeFurnishings() {
  const room = useRoom();
  const back = -room.depth / 2;
  return (
    <group>
      <Window position={[0.2, 1.55, back + 0.03]} width={2.4} height={1.25} panes={3} />
      <Blinds position={[0.2, 1.55, back + 0.05]} width={2.25} height={1.15} />
      <Door position={[room.width / 2 - 0.04, 1.12, 0.9]} rotation={[0, -Math.PI / 2, 0]} />
      <PanelLight />
      <Desk position={[0, 0, 0.05]} width={1.7} top="#4a4744" />
      <OfficeChair position={[0, 0, 0.72]} />
      <OfficeChair position={[-0.85, 0, -0.55]} rotation={[0, 0.4, 0]} />
      <Wardrobe position={[-1.7, 0, back + 0.4]} />
    </group>
  );
}

function Furnishings() {
  const room = useRoom();
  switch (room.id) {
    case "villa":
      return <VillaFurnishings />;
    case "apartment":
      return <ApartmentFurnishings />;
    case "studio":
      return <StudioFurnishings />;
    case "office":
      return <OfficeFurnishings />;
  }
}

function Scene({
  selection,
  resetSignal,
}: {
  selection: WallpaperPreviewSelection;
  resetSignal: number;
}) {
  const room = useRoom();
  const span = Math.max(room.width, room.depth);

  return (
    <>
      <color attach="background" args={["#f6f4f0"]} />
      <ambientLight intensity={1.15} color="#ffffff" />
      <hemisphereLight args={["#ffffff", "#f4efe8", 0.85]} />
      <directionalLight
        position={[2.4, 3.4, 1.6]}
        intensity={1.05}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00018}
        shadow-camera-near={0.4}
        shadow-camera-far={14}
        shadow-camera-left={-span}
        shadow-camera-right={span}
        shadow-camera-top={span}
        shadow-camera-bottom={-span}
      />
      <directionalLight position={[-1.4, 2.2, 2.4]} intensity={0.55} color="#ffffff" />
      <directionalLight position={[-0.2, 2.4, -3.2]} intensity={0.45} color="#ffffff" />

      <WoodFloor />
      <Ceiling selection={selection} />
      <Baseboards />
      <Cornice />
      <RoomWalls selection={selection} />
      <WallSeams selection={selection} />
      <Furnishings />
      <ContactShadows
        position={[0.1, 0.004, 0.35]}
        opacity={0.08}
        scale={span + 1.2}
        blur={2.1}
        far={1.5}
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
        minDistance={room.minDistance}
        maxDistance={room.maxDistance}
        target={room.target}
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
  const room = ROOMS[selection.spaceId];

  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 2]}
      camera={{ position: room.camera, fov: room.fov, near: 0.08, far: 40 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <RoomContext.Provider value={room}>
        <Scene selection={selection} resetSignal={resetSignal} />
      </RoomContext.Provider>
    </Canvas>
  );
}
