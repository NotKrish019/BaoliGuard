import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SpatialHotspot, SimulationStateResult, DigitalTwinMetadata } from '../types';
import { Button } from './Button';
import { fetchDigitalTwinMetadata, simulateConservationInterventions } from '../services/api';

export interface DigitalTwinViewerProps {
  className?: string;
  onNavigateReport?: () => void;
}

export const DigitalTwinViewer: React.FC<DigitalTwinViewerProps> = ({
  className = '',
  onNavigateReport,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [metadata, setMetadata] = useState<DigitalTwinMetadata | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<SpatialHotspot | null>(null);
  const [activeActions, setActiveActions] = useState<string[]>([]);
  const [simResult, setSimResult] = useState<SimulationStateResult | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [viewState, setViewState] = useState<'before' | 'after' | 'custom'>('before');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingModel, setIsLoadingModel] = useState<boolean>(true);

  // References to dynamic Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const hotspotsGroupRef = useRef<THREE.Group | null>(null);
  const stepwellMeshRef = useRef<THREE.Object3D | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const siltMeshRef = useRef<THREE.Mesh | null>(null);
  const vegetationMeshRef = useRef<THREE.Mesh | null>(null);

  // 1. Initial metadata and baseline simulation load
  useEffect(() => {
    let isMounted = true;
    const loadInitialData = async () => {
      try {
        const meta = await fetchDigitalTwinMetadata();
        if (isMounted) {
          setMetadata(meta);
          const initialSim = await simulateConservationInterventions([]);
          setSimResult(initialSim);
        }
      } catch (err) {
        if (isMounted) {
          setLoadError(err instanceof Error ? err.message : 'Failed to load 3D metadata');
        }
      }
    };
    loadInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Initialize Three.js WebGL Scene, Camera, Controls, and GLTF Model
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 560;

    // Create Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070d18);
    scene.fog = new THREE.FogExp2(0x070d18, 0.022);
    sceneRef.current = scene;

    // Create Camera
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1000);
    camera.position.set(0, 9, 24);
    cameraRef.current = camera;

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minDistance = 6;
    controls.maxDistance = 50;
    controls.target.set(0, -0.5, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.8;
    controlsRef.current = controls;

    // Lighting (Warm subterranean desert sun shafts + ambient stone bounce)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.8);
    sunLight.position.set(12, 22, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const waterBounceLight = new THREE.PointLight(0x06b6d4, 1.2, 20);
    waterBounceLight.position.set(0, -2, 2);
    scene.add(waterBounceLight);

    // Create Group for Hotspot Pins
    const hotspotsGroup = new THREE.Group();
    scene.add(hotspotsGroup);
    hotspotsGroupRef.current = hotspotsGroup;

    // Load prepared GLTF Stepwell Model
    const loader = new GLTFLoader();
    setIsLoadingModel(true);

    loader.load(
      '/models/baoli_stepwell.gltf',
      (gltf) => {
        setIsLoadingModel(false);
        const model = gltf.scene;
        stepwellMeshRef.current = model;
        scene.add(model);

        // Traverse model to find water, silt, and vegetation sub-meshes
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const matName = child.material?.name || '';
            if (matName.includes('AquiferWater')) {
              waterMeshRef.current = child;
            } else if (matName.includes('SiltDeposit')) {
              siltMeshRef.current = child;
            } else if (matName.includes('VegetationCluster')) {
              vegetationMeshRef.current = child;
            }
          }
        });
      },
      undefined,
      (err) => {
        setIsLoadingModel(false);
        console.warn('GLTF loading notice, using procedural fallback representation:', err);
      }
    );

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle water ripple animation
      if (waterMeshRef.current) {
        waterMeshRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.05;
      }

      // Hotspots pulsing animation
      if (hotspotsGroupRef.current) {
        hotspotsGroupRef.current.children.forEach((child, i) => {
          const s = 1.0 + Math.sin(elapsedTime * 3 + i) * 0.15;
          child.scale.set(s, s, s);
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  // Update autoRotate on controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // 3. Render 3D Spatial Hotspots when metadata updates
  useEffect(() => {
    if (!metadata || !hotspotsGroupRef.current || !sceneRef.current) return;

    const group = hotspotsGroupRef.current;
    // Clear previous hotspot pins
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    metadata.hotspots.forEach((spot) => {
      const isResolved = simResult?.resolved_hotspots.includes(spot.id);

      // Pin Color based on defect type & resolution state
      const pinColor = isResolved
        ? 0x10b981 // Emerald resolved
        : spot.type === 'crack'
        ? 0xf43f5e // Rose crack
        : spot.type === 'vegetation'
        ? 0x84cc16 // Lime vegetation
        : spot.type === 'spalling'
        ? 0xf59e0b // Amber spalling
        : 0x06b6d4; // Cyan inlet/silt

      // Pin Mesh (Spherical core + Outer ring)
      const pinContainer = new THREE.Group();
      pinContainer.position.set(...spot.position);
      pinContainer.userData = { hotspotData: spot };

      const coreGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: pinColor });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      pinContainer.add(coreMesh);

      const ringGeo = new THREE.RingGeometry(0.45, 0.6, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isResolved ? 0.4 : 0.85,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.lookAt(new THREE.Vector3(0, 10, 20));
      pinContainer.add(ringMesh);

      group.add(pinContainer);
    });
  }, [metadata, simResult]);

  // 4. Raycasting Click Selection on 3D Hotspot Pins
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mountRef.current || !cameraRef.current || !hotspotsGroupRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(hotspotsGroupRef.current.children, true);
    if (intersects.length > 0) {
      let targetObj: THREE.Object3D | null = intersects[0].object;
      while (targetObj && !targetObj.userData?.hotspotData && targetObj.parent) {
        targetObj = targetObj.parent;
      }
      if (targetObj?.userData?.hotspotData) {
        setSelectedHotspot(targetObj.userData.hotspotData);
        setAutoRotate(false);
      }
    }
  };

  // 5. Handle Restoration Action Toggling (Requests simulation from Backend API)
  const handleToggleAction = async (actionKey: string) => {
    const updated = activeActions.includes(actionKey)
      ? activeActions.filter((a) => a !== actionKey)
      : [...activeActions, actionKey];

    setActiveActions(updated);
    setViewState(updated.length === 4 ? 'after' : updated.length === 0 ? 'before' : 'custom');

    setIsSimulating(true);
    try {
      const outcome = await simulateConservationInterventions(updated);
      setSimResult(outcome);
    } finally {
      setIsSimulating(false);
    }
  };

  // 6. Handle Preset BEFORE vs AFTER state switch
  const handleSetStatePreset = async (targetState: 'before' | 'after') => {
    setViewState(targetState);
    const actions = targetState === 'after'
      ? ['clear_vegetation', 'restore_inlet', 'desilt', 'restore_catchment']
      : [];

    setActiveActions(actions);
    setIsSimulating(true);
    try {
      const outcome = await simulateConservationInterventions(actions);
      setSimResult(outcome);
    } finally {
      setIsSimulating(false);
    }
  };

  // 7. Preset Camera Jump Views
  const handleCameraView = (view: 'overview' | 'basin' | 'arcade' | 'inlet') => {
    if (!cameraRef.current || !controlsRef.current) return;
    setAutoRotate(false);

    switch (view) {
      case 'overview':
        cameraRef.current.position.set(0, 9, 24);
        controlsRef.current.target.set(0, -0.5, 0);
        break;
      case 'basin':
        cameraRef.current.position.set(0, -0.5, 9);
        controlsRef.current.target.set(0, -3.2, 2);
        break;
      case 'arcade':
        cameraRef.current.position.set(0, 3.5, 4);
        controlsRef.current.target.set(0, 2.5, -8);
        break;
      case 'inlet':
        cameraRef.current.position.set(-14, 2.5, 12);
        controlsRef.current.target.set(-9.8, 0.6, 6.0);
        break;
    }
    controlsRef.current.update();
  };

  return (
    <div className={`glass-panel rounded-2xl overflow-hidden border border-slate-800 ${className}`}>
      {loadError && (
        <div className="px-5 py-2 bg-amber-950/80 border-b border-amber-800 text-xs text-amber-200 font-mono flex items-center gap-2">
          <span>⚠️</span>
          <span>{loadError}</span>
        </div>
      )}
      {/* Top 3D Control Bar */}
      <div className="px-5 py-3.5 bg-heritage-950/90 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-4 select-none">
        {/* State Switcher: BEFORE vs AFTER */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => handleSetStatePreset('before')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              viewState === 'before'
                ? 'bg-rose-950 text-rose-300 border border-rose-800 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚠️</span>
            <span>BEFORE (Baseline Damage)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSetStatePreset('after')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              viewState === 'after'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>✨</span>
            <span>AFTER (IKS Consolidated)</span>
          </button>
        </div>

        {/* Camera Views & Auto-Rotate Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => handleCameraView('overview')}
              className="px-2 py-1 text-slate-400 hover:text-white rounded"
            >
              Overview
            </button>
            <button
              onClick={() => handleCameraView('basin')}
              className="px-2 py-1 text-slate-400 hover:text-white rounded"
            >
              Basin
            </button>
            <button
              onClick={() => handleCameraView('arcade')}
              className="px-2 py-1 text-slate-400 hover:text-white rounded"
            >
              Arcade
            </button>
            <button
              onClick={() => handleCameraView('inlet')}
              className="px-2 py-1 text-slate-400 hover:text-white rounded"
            >
              Inlet
            </button>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 text-[11px] bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <input
              type="checkbox"
              checked={autoRotate}
              onChange={(e) => setAutoRotate(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-sandstone-500"
            />
            <span>Auto-Rotate</span>
          </label>
        </div>
      </div>

      {/* Main 3D Viewport with HUD Overlays */}
      <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing">
        {/* Three.js Canvas Container */}
        <div
          ref={mountRef}
          onClick={handleCanvasClick}
          className="w-full h-full"
        />

        {/* Loading Spinner Indicator */}
        {isLoadingModel && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none">
            <div className="w-10 h-10 border-2 border-sandstone-500/30 border-t-sandstone-400 rounded-full animate-spin mb-3" />
            <span className="text-xs font-mono text-sandstone-300">
              Loading 3D Baoli Geometry (.gltf)...
            </span>
          </div>
        )}

        {/* Left Floating HUD: Simulation Metrics from Backend */}
        {simResult && (
          <div className="absolute top-4 left-4 z-20 pointer-events-none p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md shadow-2xl max-w-xs text-xs font-mono">
            <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-800">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider">
                Simulated Conservation Output
              </span>
              <span
                className={`text-[9.5px] px-1.5 py-0.2 rounded font-bold uppercase border ${
                  simResult.state === 'after'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : simResult.state === 'before'
                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                    : 'bg-amber-950 text-amber-300 border-amber-800'
                }`}
              >
                {simResult.state}
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] mb-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Visual Condition:</span>
                <span className={`font-bold ${simResult.visual_condition_score > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {simResult.visual_condition_score.toFixed(1)} / 100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Water Viability:</span>
                <span className={`font-bold ${simResult.water_viability_score > 75 ? 'text-jal-400' : 'text-slate-300'}`}>
                  {simResult.water_viability_score.toFixed(1)} / 100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Silt Reduction:</span>
                <span className="text-white font-bold">{simResult.silt_volume_reduction_percent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Aquifer Potential:</span>
                <span className="text-sandstone-300 text-[10px] truncate max-w-[130px] font-sans">
                  {simResult.aquifer_recharge_potential}
                </span>
              </div>
            </div>

            <p className="text-[10px] font-sans text-slate-400 leading-snug pt-1.5 border-t border-slate-800">
              {simResult.summary}
            </p>
          </div>
        )}

        {/* Right Floating HUD: Selected Hotspot Details Card */}
        {selectedHotspot && (
          <div className="absolute top-4 right-4 z-20 p-4 rounded-xl bg-slate-950/95 border border-slate-700 backdrop-blur-md shadow-2xl max-w-sm text-xs font-sans">
            <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-sandstone-400 uppercase font-bold">
                  HOTSPOT ANNOTATION
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">{selectedHotspot.name}</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedHotspot(null)}
                className="text-slate-500 hover:text-white text-base leading-none"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-3">
              <div>
                <span className="text-slate-500">Classification: </span>
                <span className="text-white capitalize">{selectedHotspot.type.replace(/_/g, ' ')}</span>
              </div>
              <div>
                <span className="text-slate-500">Confidence: </span>
                <span className="text-sandstone-300 font-bold">{(selectedHotspot.confidence * 100).toFixed(0)}%</span>
              </div>
              <div>
                <span className="text-slate-500">Pixel Area: </span>
                <span className="text-white">{selectedHotspot.pixel_area.toLocaleString()} px²</span>
              </div>
              <div>
                <span className="text-slate-500">Severity: </span>
                <span className="text-rose-400 uppercase font-bold">{selectedHotspot.severity}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {selectedHotspot.description}
            </p>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono mb-3">
              <div className="text-slate-400 mb-1">
                <span className="text-rose-400 font-bold">Baseline: </span>
                {selectedHotspot.status_before}
              </div>
              <div className="text-emerald-400">
                <span className="font-bold">Restored: </span>
                {selectedHotspot.status_after}
              </div>
            </div>

            {onNavigateReport && (
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs"
                onClick={onNavigateReport}
              >
                View Full Restoration Specification →
              </Button>
            )}
          </div>
        )}

        {/* Bottom Floating Hotspot Guide */}
        <div className="absolute bottom-3 left-4 z-10 hidden sm:flex items-center gap-3 text-[10px] font-mono text-slate-400 bg-heritage-950/80 px-3 py-1.5 rounded-lg border border-slate-800 pointer-events-none">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Crack
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-lime-500" /> Vegetation
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Spalling
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" /> Inlet/Silt
          </span>
          <span>• Click any marker to inspect</span>
        </div>
      </div>

      {/* Bottom Interactive Restoration Controls */}
      <div className="p-5 bg-heritage-950/95 border-t border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-sandstone-300 font-bold">
              CONSERVATION INTERVENTION CONTROLS
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              Toggle interventions to request real-time simulated engineering outcomes from backend logic.
            </p>
          </div>

          {/* 4 Interactive Controls Required by Phase 4 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'clear_vegetation', label: 'Clear Vegetation', icon: '🌿' },
              { id: 'restore_inlet', label: 'Restore Inlet', icon: '🚰' },
              { id: 'desilt', label: 'Desilt Basin', icon: '🧹' },
              { id: 'restore_catchment', label: 'Restore Catchment', icon: '🧱' },
            ].map((action) => {
              const isActive = activeActions.includes(action.id);
              return (
                <button
                  key={action.id}
                  type="button"
                  disabled={isSimulating}
                  onClick={() => handleToggleAction(action.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 border select-none ${
                    isActive
                      ? 'bg-emerald-950/90 border-emerald-600 text-emerald-300 shadow-md shadow-emerald-950/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span>{action.icon}</span>
                  <span className="truncate">{action.label}</span>
                  {isActive && <span className="text-emerald-400 text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
