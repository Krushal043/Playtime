'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Sparkles,
  ShieldCheck,
  EyeOff,
  Package,
  Layers,
  Zap,
  Maximize2
} from 'lucide-react';

type ShowcaseMode = 'bottle' | 'box';

export default function Interactive3DShowcase() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<ShowcaseMode>('bottle');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [unboxed, setUnboxed] = useState(false);

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bottleGroupRef = useRef<THREE.Group | null>(null);
  const boxGroupRef = useRef<THREE.Group | null>(null);
  const lidMeshRef = useRef<THREE.Mesh | null>(null);
  const innerBottleRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.0); // Gold rim
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x88bbff, 1.2);
    fillLight.position.set(-4, 3, 4);
    scene.add(fillLight);

    // -------------------------------------------------------------------------
    // Helper to create the 3D Luxury Bottle Model
    // -------------------------------------------------------------------------
    function createBottleMesh(): THREE.Group {
      const group = new THREE.Group();

      // Matte Black Body
      const bodyGeo = new THREE.CylinderGeometry(0.85, 0.85, 3.2, 48);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x111622,
        roughness: 0.35,
        metalness: 0.25,
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.position.y = 0;
      group.add(bodyMesh);

      // Gold Shoulder Ring
      const shoulderGeo = new THREE.CylinderGeometry(0.72, 0.85, 0.35, 48);
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.92,
        roughness: 0.18,
      });
      const shoulderMesh = new THREE.Mesh(shoulderGeo, goldMat);
      shoulderMesh.position.y = 1.75;
      group.add(shoulderMesh);

      // Gold Metallic Spray Cap
      const capGeo = new THREE.CylinderGeometry(0.7, 0.72, 1.1, 48);
      const capMesh = new THREE.Mesh(capGeo, goldMat);
      capMesh.position.y = 2.45;
      group.add(capMesh);

      // Spray Nozzle indent
      const nozzleGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 16);
      const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.8 });
      const nozzleMesh = new THREE.Mesh(nozzleGeo, nozzleMat);
      nozzleMesh.rotation.z = Math.PI / 2;
      nozzleMesh.position.set(0.68, 2.45, 0);
      group.add(nozzleMesh);

      // Embossed Luxury Label Plate
      const labelGeo = new THREE.CylinderGeometry(0.86, 0.86, 1.8, 48, 1, true, -Math.PI / 3, (2 * Math.PI) / 3);
      const labelMat = new THREE.MeshStandardMaterial({
        color: 0x090f1e,
        roughness: 0.2,
        metalness: 0.1,
      });
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = 0;
      group.add(labelMesh);

      // Gold Accent Band on Base
      const baseBandGeo = new THREE.CylinderGeometry(0.86, 0.86, 0.08, 48);
      const baseBandMesh = new THREE.Mesh(baseBandGeo, goldMat);
      baseBandMesh.position.y = -1.55;
      group.add(baseBandMesh);

      return group;
    }

    // -------------------------------------------------------------------------
    // Helper to create the 3D Plain Discreet Parcel Box
    // -------------------------------------------------------------------------
    function createBoxMesh(): { boxGroup: THREE.Group; lidMesh: THREE.Mesh; innerBottle: THREE.Group } {
      const boxGroup = new THREE.Group();

      // Cardboard Material
      const cardboardMat = new THREE.MeshStandardMaterial({
        color: 0xaa8255, // Natural Kraft Brown
        roughness: 0.85,
        metalness: 0.05,
      });

      // Tamper-proof Black Security Tape Material
      const tapeMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.4,
        metalness: 0.1,
      });

      // Box Base (Lower Half)
      const boxBaseGeo = new THREE.BoxGeometry(2.6, 2.2, 2.6);
      const boxBase = new THREE.Mesh(boxBaseGeo, cardboardMat);
      boxBase.position.y = -0.7;
      boxGroup.add(boxBase);

      // Black Security Seal Tape across base
      const tapeGeo = new THREE.BoxGeometry(0.45, 2.22, 2.62);
      const tape = new THREE.Mesh(tapeGeo, tapeMat);
      tape.position.y = -0.7;
      boxGroup.add(tape);

      // Box Lid (Hinged at back)
      const lidGeo = new THREE.BoxGeometry(2.68, 0.4, 2.68);
      const lidMesh = new THREE.Mesh(lidGeo, cardboardMat);
      lidMesh.position.set(0, 0.6, 0);
      boxGroup.add(lidMesh);

      // Shipping Label Sticker on top of lid
      const stickerGeo = new THREE.PlaneGeometry(1.6, 1.2);
      const stickerMat = new THREE.MeshStandardMaterial({
        color: 0xf5f5f5,
        roughness: 0.9,
      });
      const sticker = new THREE.Mesh(stickerGeo, stickerMat);
      sticker.rotation.x = -Math.PI / 2;
      sticker.position.set(0, 0.81, 0);
      boxGroup.add(sticker);

      // Inside Nestled Bottle
      const innerBottle = createBottleMesh();
      innerBottle.scale.set(0.65, 0.65, 0.65);
      innerBottle.position.set(0, -0.4, 0);
      boxGroup.add(innerBottle);

      return { boxGroup, lidMesh, innerBottle };
    }

    const bottleGroup = createBottleMesh();
    bottleGroupRef.current = bottleGroup;
    scene.add(bottleGroup);

    const { boxGroup, lidMesh, innerBottle } = createBoxMesh();
    boxGroupRef.current = boxGroup;
    lidMeshRef.current = lidMesh;
    innerBottleRef.current = innerBottle;
    boxGroup.visible = false;
    scene.add(boxGroup);

    // -------------------------------------------------------------------------
    // Animation Loop
    // -------------------------------------------------------------------------
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const targetGroup = mode === 'bottle' ? bottleGroupRef.current : boxGroupRef.current;

      if (targetGroup) {
        if (autoRotate && !isDraggingRef.current) {
          targetGroup.rotation.y += 0.007;
        }

        // Gentle floating bob
        targetGroup.position.y = Math.sin(Date.now() * 0.002) * 0.12;
      }

      // Smooth unboxing lid animation
      if (lidMeshRef.current) {
        const targetLidAngle = unboxed ? -Math.PI * 0.65 : 0;
        const targetLidY = unboxed ? 1.6 : 0.6;
        lidMeshRef.current.rotation.x = THREE.MathUtils.lerp(lidMeshRef.current.rotation.x, targetLidAngle, 0.08);
        lidMeshRef.current.position.y = THREE.MathUtils.lerp(lidMeshRef.current.position.y, targetLidY, 0.08);
      }

      // Elevate inner bottle when unboxed
      if (innerBottleRef.current) {
        const targetInnerY = unboxed ? 0.35 : -0.4;
        innerBottleRef.current.position.y = THREE.MathUtils.lerp(innerBottleRef.current.position.y, targetInnerY, 0.08);
      }

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------------------
    // Mouse & Touch Orbit Controls
    // -------------------------------------------------------------------------
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      const activeGroup = mode === 'bottle' ? bottleGroupRef.current : boxGroupRef.current;
      if (activeGroup) {
        activeGroup.rotation.y += deltaX * 0.009;
        activeGroup.rotation.x = Math.max(-0.4, Math.min(0.4, activeGroup.rotation.x + deltaY * 0.005));
      }

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Responsive resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 480;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, [mode, autoRotate, unboxed]);

  // Mode switcher
  const handleSwitchMode = (newMode: ShowcaseMode) => {
    setMode(newMode);
    if (bottleGroupRef.current && boxGroupRef.current) {
      if (newMode === 'bottle') {
        bottleGroupRef.current.visible = true;
        boxGroupRef.current.visible = false;
      } else {
        bottleGroupRef.current.visible = false;
        boxGroupRef.current.visible = true;
      }
    }
  };

  const handleResetView = () => {
    const active = mode === 'bottle' ? bottleGroupRef.current : boxGroupRef.current;
    if (active) {
      active.rotation.set(0, 0, 0);
    }
  };

  return (
    <section className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 w-full overflow-hidden">
      
      {/* Decorative luxury radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Interactive 3D Canvas Viewport */}
        <div className="lg:col-span-7 relative">
          <div
            className="relative w-full h-[420px] sm:h-[520px] rounded-3xl glass-card-elevated border border-white/90 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* 3D WebGL Canvas Mount */}
            <div ref={mountRef} className="w-full h-full" />

            {/* Floating Top Control Pill */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-1.5 p-1 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm">
                <button
                  type="button"
                  onClick={() => handleSwitchMode('bottle')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    mode === 'bottle'
                      ? 'bg-[#0a193d] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0a193d]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>3D Canister</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSwitchMode('box')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    mode === 'box'
                      ? 'bg-[#0a193d] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0a193d]'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 text-rose-500" />
                  <span>Discreet Box</span>
                </button>
              </div>

              {/* Reset Angle Button */}
              <button
                type="button"
                onClick={handleResetView}
                title="Reset Angle"
                className="p-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-600 hover:text-[#0a193d] border border-slate-200/90 shadow-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Interaction Guide */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold shadow-lg pointer-events-none">
              <Maximize2 className="w-3 h-3 text-amber-400" />
              <span>Drag to Orbit 360° • Metallic Shimmer</span>
            </div>

            {/* Unbox Trigger when viewing Box */}
            {mode === 'box' && (
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setUnboxed(!unboxed)}
                  className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{unboxed ? 'Close Box' : 'Peel Security Seal & Open Box'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Product & Discretion Storytelling */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-black uppercase tracking-wider shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive 3D Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0a193d] tracking-tight leading-tight">
            Sensory Science Meets Flawless Privacy.
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Rotate our micro-mist canister in real-time 3D. Every bottle is crafted with medical-grade dark UV-glass and gold-plated seals to safeguard botanical active clove molecules and Himalayan Shilajit from ambient oxidation.
          </p>

          {/* Feature Highlights Grid */}
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/90 flex items-start gap-3 shadow-2xs">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0a193d]">Micro-Encapsulated Lavang Satva</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                  Absorbs in 10 minutes without skin numbness or partner transfer.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/90 flex items-start gap-3 shadow-2xs">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <EyeOff className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0a193d]">100% Unmarked Kraft Box Delivery</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                  Sender reads strictly &ldquo;PT Logistics&rdquo;. Zero outer branding or adult terms.
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA button */}
          <div className="pt-2">
            <a
              href="#catalog-section"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all"
            >
              <span>Explore Formulations &rarr;</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
