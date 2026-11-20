import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PITS, type PitDefinition } from './prototypeOnlyModel';

export interface ThreeBoardRenderState {
  readonly counts: readonly number[];
  readonly selected: number;
  readonly hovered: number;
  readonly reducedMotion: boolean;
}

export interface ThreeBoardHopTransition {
  readonly fromPitIndex: number;
  readonly toPitIndex: number;
}

interface ThreeBoardCallbacks {
  readonly onHoverPit: (pitIndex: number) => void;
  readonly onSelectPit: (pitIndex: number) => void;
  readonly onContextLost?: () => void;
  readonly onContextRestored?: () => void;
}

interface PebbleSlot {
  readonly x: number;
  readonly z: number;
  readonly y: number;
  readonly scaleX: number;
  readonly scaleY: number;
  readonly scaleZ: number;
  readonly rotY: number;
  readonly colorIndex: number;
}

// Rich warm ceramic / river-stone palette anchored to Brainroot & VIS-008
const PEBBLE_COLORS = [
  0xd87956, // terracotta peach
  0x5f8f6f, // deep sage jade
  0xf0e4c8, // sunlit ivory pebble
  0x4f7b44, // garden leaf green
  0xd9a85c, // warm honey amber
] as const;

function detectSoftwareWebGL(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  try {
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? '')
      : String(gl.getParameter(gl.RENDERER) ?? '');
    return /SwiftShader|llvmpipe|Software|Mesa OffScreen/i.test(rendererStr);
  } catch {
    return false;
  }
}

/**
 * Seamless honey-oak wood grain texture (no vertical seams, warm VIS-008 tone).
 */
function createWoodGrainTexture(anisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Rich golden honey oak gradient vertically (seamless horizontally)
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#C78E54');
    grad.addColorStop(0.5, '#BA7F46');
    grad.addColorStop(1, '#A96E38');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Periodic seamless wood fibers running cleanly along X
    for (let i = 0; i < 130; i += 1) {
      const baseY = (i / 130) * 512;
      ctx.beginPath();
      for (let x = 0; x <= 512; x += 16) {
        const theta = (x / 512) * Math.PI * 2;
        const wave =
          Math.sin(theta * 2 + i * 0.45) * 4.2 +
          Math.cos(theta * 3 - i * 0.25) * 2.1;
        if (x === 0) ctx.moveTo(x, baseY + wave);
        else ctx.lineTo(x, baseY + wave);
      }
      ctx.strokeStyle =
        i % 3 === 0 ? 'rgba(92, 50, 18, 0.22)' : 'rgba(255, 232, 198, 0.14)';
      ctx.lineWidth = i % 5 === 0 ? 2.4 : 1.15;
      ctx.stroke();
    }

    // Subtle handcrafted wood pores
    ctx.fillStyle = 'rgba(84, 44, 16, 0.12)';
    for (let i = 0; i < 240; i += 1) {
      const px = (i * 73) % 512;
      const py = (i * 137) % 512;
      ctx.fillRect(px, py, 10 + (i % 14), 1.2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = Math.min(8, anisotropy);
  texture.needsUpdate = true;
  return texture;
}

function createTableMatTexture(anisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Warm sunlit sage-ivory woven garden mat
    const grad = ctx.createRadialGradient(170, 140, 30, 256, 256, 380);
    grad.addColorStop(0, '#F5EFE1');
    grad.addColorStop(0.55, '#E7E2D0');
    grad.addColorStop(1, '#D3DACA');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(104, 128, 98, 0.09)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 512; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.anisotropy = Math.min(4, anisotropy);
  texture.needsUpdate = true;
  return texture;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 512, 256);
    const grad = ctx.createRadialGradient(256, 128, 40, 256, 128, 236);
    grad.addColorStop(0, 'rgba(42, 31, 18, 0.48)');
    grad.addColorStop(0.65, 'rgba(54, 41, 24, 0.24)');
    grad.addColorStop(1, 'rgba(54, 41, 24, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createStadiumShape(halfW: number, halfD: number, cornerRadius: number): THREE.Shape {
  const r = Math.min(cornerRadius, halfW, halfD);
  const shape = new THREE.Shape();
  shape.moveTo(-halfW + r, -halfD);
  shape.lineTo(halfW - r, -halfD);
  shape.quadraticCurveTo(halfW, -halfD, halfW, -halfD + r);
  shape.lineTo(halfW, halfD - r);
  shape.quadraticCurveTo(halfW, halfD, halfW - r, halfD);
  shape.lineTo(-halfW + r, halfD);
  shape.quadraticCurveTo(-halfW, halfD, -halfW, halfD - r);
  shape.lineTo(-halfW, -halfD + r);
  shape.quadraticCurveTo(-halfW, -halfD, -halfW + r, -halfD);
  return shape;
}

/**
 * Create a clockwise elliptical cutout Path in shape XY space.
 * Note: After `geometry.rotateX(-Math.PI / 2)`, shape (x, y) maps to world (x, -z),
 * so to match pit world (pit.x, pit.z) we center the hole at (pit.x, -pit.z).
 */
function createPitHolePath(pit: PitDefinition): THREE.Path {
  const path = new THREE.Path();
  path.absellipse(
    pit.x,
    -pit.z,
    pit.rx * 0.96,
    pit.rz * 0.96,
    0,
    Math.PI * 2,
    true,
    0,
  );
  return path;
}

function computePebbleSlot(pit: PitDefinition, seedIndex: number, total: number): PebbleSlot {
  if (pit.isQuan && seedIndex === 0) {
    return {
      x: pit.x,
      z: pit.z,
      y: 0.26,
      scaleX: 0.34,
      scaleY: 0.23,
      scaleZ: 0.45,
      rotY: 0.22,
      colorIndex: pit.id === 'quan-left' ? 1 : 0,
    };
  }

  const effectiveIdx = pit.isQuan ? seedIndex - 1 : seedIndex;
  const ringCapacity = pit.isQuan ? 6 : 5;
  const layer = Math.floor(effectiveIdx / ringCapacity);
  const inRing = effectiveIdx % ringCapacity;
  const ringCount = Math.min(
    ringCapacity,
    Math.max(1, total - (pit.isQuan ? 1 : 0) - layer * ringCapacity),
  );
  const angle = (inRing / ringCount) * Math.PI * 2 + layer * 0.65 + pit.x * 0.2;
  const radiusScale = total <= 1 ? 0 : Math.min(0.46, 0.28 + layer * 0.04);

  return {
    x: pit.x + Math.cos(angle) * pit.rx * radiusScale,
    z: pit.z + Math.sin(angle) * pit.rz * radiusScale,
    y: 0.21 + layer * 0.16,
    scaleX: 0.18 + ((seedIndex * 13) % 4) * 0.012,
    scaleY: 0.125 + ((seedIndex * 7) % 3) * 0.008,
    scaleZ: 0.16 + ((seedIndex * 11) % 4) * 0.012,
    rotY: angle + seedIndex * 0.45,
    colorIndex: (seedIndex + (pit.x > 0 ? 1 : 0) + (pit.z > 0 ? 2 : 0)) % PEBBLE_COLORS.length,
  };
}

export class ThreeBoardRenderer {
  private readonly container: HTMLElement;
  private readonly callbacks: ThreeBoardCallbacks;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly pmremGenerator: THREE.PMREMGenerator;
  private readonly envRT: THREE.WebGLRenderTarget;
  private readonly boardGroup: THREE.Group;
  private readonly pebblesGroup: THREE.Group;
  private readonly pitRings: THREE.Mesh[] = [];
  private readonly pitHitMeshes: THREE.Mesh[] = [];
  private readonly pebbleGeom: THREE.SphereGeometry;
  private readonly pebbleMaterials: THREE.MeshStandardMaterial[] = [];
  private readonly flyingPebble: THREE.Mesh;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointerNdc = new THREE.Vector2();
  private readonly disposables: Array<{ dispose: () => void }> = [];

  private readonly isSoftwareGl: boolean;
  private state: ThreeBoardRenderState;
  private rafId: number | null = null;
  private disposed = false;
  private contextLost = false;
  private cameraYaw = 0;
  private cameraPitch = 0.88;
  private isDragging = false;
  private dragMoved = false;
  private dragStartX = 0;
  private dragStartY = 0;

  private hopAnim: {
    startMs: number;
    durationMs: number;
    from: THREE.Vector3;
    to: THREE.Vector3;
  } | null = null;

  constructor(
    container: HTMLElement,
    initialState: ThreeBoardRenderState,
    callbacks: ThreeBoardCallbacks,
  ) {
    this.container = container;
    this.state = initialState;
    this.callbacks = callbacks;

    const probeCanvas = document.createElement('canvas');
    const probeGl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    this.isSoftwareGl = probeGl ? detectSoftwareWebGL(probeGl) : false;
    if (probeGl) {
      probeGl.getExtension('WEBGL_lose_context')?.loseContext();
    }

    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.94;
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(
      this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2),
    );
    this.renderer.domElement.className = 'oq3d-three-canvas';
    this.renderer.domElement.setAttribute(
      'aria-label',
      'Bàn gỗ Ô ăn quan xanh 3D tương tác (chế độ thử nghiệm)',
    );
    container.innerHTML = '';
    container.appendChild(this.renderer.domElement);

    // Warm garden backdrop
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeae3d2);

    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    const roomEnv = new RoomEnvironment();
    this.envRT = this.pmremGenerator.fromScene(roomEnv, 0.05);
    this.scene.environment = this.envRT.texture;
    this.scene.environmentIntensity = 0.55;
    roomEnv.dispose();

    this.camera = new THREE.PerspectiveCamera(34, 16 / 10, 0.5, 60);
    this.updateCameraPose();

    // Balanced golden-hour lighting rig (rich wood depth + soft pebble gleam)
    const hemi = new THREE.HemisphereLight(0xf3f5ea, 0x8a6948, 0.55);
    this.scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffe9c8, 1.55);
    keyLight.position.set(-7.2, 10.8, 6.2);
    if (!this.isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 2;
      keyLight.shadow.camera.far = 28;
      keyLight.shadow.camera.left = -8;
      keyLight.shadow.camera.right = 8;
      keyLight.shadow.camera.top = 5;
      keyLight.shadow.camera.bottom = -5;
      keyLight.shadow.bias = -0.0005;
    }
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xbad6c2, 0.48);
    rimLight.position.set(7.5, 5.8, -6.8);
    this.scene.add(rimLight);

    this.boardGroup = new THREE.Group();
    this.scene.add(this.boardGroup);

    this.pebblesGroup = new THREE.Group();
    this.boardGroup.add(this.pebblesGroup);

    this.pebbleGeom = new THREE.SphereGeometry(1, 20, 14);
    this.disposables.push(this.pebbleGeom);

    for (const hex of PEBBLE_COLORS) {
      const mat = new THREE.MeshStandardMaterial({
        color: hex,
        roughness: 0.34,
        metalness: 0.05,
      });
      this.pebbleMaterials.push(mat);
      this.disposables.push(mat);
    }

    this.flyingPebble = new THREE.Mesh(this.pebbleGeom, this.pebbleMaterials[0]);
    this.flyingPebble.scale.set(0.2, 0.14, 0.18);
    this.flyingPebble.visible = false;
    this.flyingPebble.castShadow = !this.isSoftwareGl;
    this.boardGroup.add(this.flyingPebble);

    this.buildTabletopScene();
    this.rebuildPebbles();
    this.syncHighlightRings();
    this.resize();
    this.bindEvents();
    this.requestRender();
  }

  private buildTabletopScene(): void {
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();

    // 1. Sunlit woven garden mat
    const matTex = createTableMatTexture(maxAniso);
    const matGeo = new THREE.PlaneGeometry(36, 26);
    const matMaterial = new THREE.MeshStandardMaterial({
      map: matTex,
      roughness: 0.94,
      metalness: 0.0,
    });
    const tablePlane = new THREE.Mesh(matGeo, matMaterial);
    tablePlane.rotation.x = -Math.PI / 2;
    tablePlane.position.y = -0.34;
    tablePlane.receiveShadow = !this.isSoftwareGl;
    this.scene.add(tablePlane);
    this.disposables.push(matTex, matGeo, matMaterial);

    // 2. Soft grounding contact shadow beneath the board
    const shadowTex = createContactShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(13.4, 6.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0.18, -0.33, 0.22);
    this.scene.add(shadowPlane);
    this.disposables.push(shadowTex, shadowGeo, shadowMat);

    // 3. Lower solid walnut base slab (forms authentic dark oiled-walnut pit bottoms!)
    const baseShape = createStadiumShape(5.68, 2.24, 1.36);
    const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.1,
      bevelSegments: 4,
      curveSegments: 24,
    });
    baseGeo.rotateX(-Math.PI / 2);
    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0x6f4625,
      roughness: 0.68,
      metalness: 0.02,
    });
    const baseMesh = new THREE.Mesh(baseGeo, walnutMat);
    baseMesh.position.y = -0.22;
    baseMesh.castShadow = !this.isSoftwareGl;
    baseMesh.receiveShadow = !this.isSoftwareGl;
    this.boardGroup.add(baseMesh);
    this.disposables.push(baseGeo, walnutMat);

    // 4. Upper sculpted honey-oak deck WITH TRUE CARVED 3D PIT HOLES!
    const woodTex = createWoodGrainTexture(maxAniso);
    const deckShape = createStadiumShape(5.74, 2.3, 1.4);
    for (const pit of PITS) {
      deckShape.holes.push(createPitHolePath(pit));
    }
    const deckGeo = new THREE.ExtrudeGeometry(deckShape, {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.055,
      bevelSize: 0.055,
      bevelSegments: 4,
      curveSegments: 28,
    });
    deckGeo.rotateX(-Math.PI / 2);
    // Clean normalized UVs spanning [0, 1] across the entire board (zero seams!)
    const pos = deckGeo.attributes.position;
    const uvs = deckGeo.attributes.uv;
    for (let i = 0; i < pos.count; i += 1) {
      const px = pos.getX(i);
      const pz = pos.getZ(i);
      uvs.setXY(i, (px + 5.85) / 11.7, (pz + 2.42) / 4.84);
    }
    uvs.needsUpdate = true;

    const woodMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.52,
      metalness: 0.03,
    });
    const deckMesh = new THREE.Mesh(deckGeo, woodMat);
    deckMesh.position.y = 0.08; // top bevel reaches y ≈ 0.375; walnut floor visible inside holes at y ≈ 0.14!
    deckMesh.castShadow = !this.isSoftwareGl;
    deckMesh.receiveShadow = !this.isSoftwareGl;
    this.boardGroup.add(deckMesh);
    this.disposables.push(woodTex, deckGeo, woodMat);

    // 5. Sage botanical inlaid frame along the upper board perimeter
    const trimShape = createStadiumShape(5.58, 2.14, 1.3);
    const trimHole = createStadiumShape(5.44, 2.02, 1.22);
    trimShape.holes.push(trimHole);
    const trimGeo = new THREE.ShapeGeometry(trimShape, 28);
    trimGeo.rotateX(-Math.PI / 2);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x678d62,
      roughness: 0.62,
      metalness: 0.02,
    });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.position.y = 0.379;
    trimMesh.receiveShadow = !this.isSoftwareGl;
    this.boardGroup.add(trimMesh);
    this.disposables.push(trimGeo, trimMat);

    // 6. Raised central wooden spine separating top & bottom Dân rows
    const ribGeo = new THREE.BoxGeometry(7.72, 0.06, 0.11);
    const ribMat = new THREE.MeshStandardMaterial({
      color: 0x8f5d32,
      roughness: 0.54,
      metalness: 0.02,
    });
    const ribMesh = new THREE.Mesh(ribGeo, ribMat);
    ribMesh.position.set(0, 0.39, 0);
    ribMesh.castShadow = !this.isSoftwareGl;
    ribMesh.receiveShadow = !this.isSoftwareGl;
    this.boardGroup.add(ribMesh);
    this.disposables.push(ribGeo, ribMat);

    // 7. Recessed inner pit shading discs + crisp selection rings + generous raycast hit volumes
    const innerDiscGeo = new THREE.CircleGeometry(0.92, 32);
    innerDiscGeo.rotateX(-Math.PI / 2);
    const innerDanMat = new THREE.MeshStandardMaterial({
      color: 0x5c391d,
      roughness: 0.78,
      metalness: 0.01,
    });
    const innerQuanMat = new THREE.MeshStandardMaterial({
      color: 0x4f341b,
      roughness: 0.76,
      metalness: 0.01,
    });
    const ringGeo = new THREE.RingGeometry(0.98, 1.11, 40);
    ringGeo.rotateX(-Math.PI / 2);
    const hitGeo = new THREE.CylinderGeometry(1.06, 1.06, 0.6, 20);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    this.disposables.push(
      innerDiscGeo,
      innerDanMat,
      innerQuanMat,
      ringGeo,
      hitGeo,
      hitMat,
    );

    PITS.forEach((pit, index) => {
      // Recessed warm walnut floor disc visible inside the carved cavity
      const disc = new THREE.Mesh(
        innerDiscGeo,
        pit.isQuan ? innerQuanMat : innerDanMat,
      );
      disc.position.set(pit.x, 0.145, pit.z);
      disc.scale.set(pit.rx, 1, pit.rz);
      disc.receiveShadow = !this.isSoftwareGl;
      this.boardGroup.add(disc);

      // Selection / hover rim ring cleanly framing the top edge of the carved cavity
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xd96e46,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      this.disposables.push(ringMat);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(pit.x, 0.384, pit.z);
      ring.scale.set(pit.rx, 1, pit.rz);
      this.boardGroup.add(ring);
      this.pitRings.push(ring);

      // Raycast hit cylinder
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(pit.x, 0.38, pit.z);
      hitMesh.scale.set(pit.rx, 1, pit.rz);
      hitMesh.userData.pitIndex = index;
      this.boardGroup.add(hitMesh);
      this.pitHitMeshes.push(hitMesh);
    });

    // 8. Subtle decorative botanical leaves resting outside the board
    const leafGeo = new THREE.SphereGeometry(0.32, 16, 12);
    const leafSageMat = new THREE.MeshStandardMaterial({
      color: 0x6b9360,
      roughness: 0.58,
    });
    const leafPeachMat = new THREE.MeshStandardMaterial({
      color: 0xdc825f,
      roughness: 0.54,
    });
    this.disposables.push(leafGeo, leafSageMat, leafPeachMat);

    const leafPositions: Array<[number, number, number, number, boolean]> = [
      [-6.45, -0.28, -2.5, 0.45, true],
      [-6.05, -0.29, -2.86, -0.35, false],
      [6.42, -0.28, 2.52, -0.55, true],
      [6.04, -0.29, 2.86, 0.3, false],
    ];
    for (const [lx, ly, lz, rot, isSage] of leafPositions) {
      const leaf = new THREE.Mesh(leafGeo, isSage ? leafSageMat : leafPeachMat);
      leaf.position.set(lx, ly, lz);
      leaf.scale.set(1.32, 0.15, 0.6);
      leaf.rotation.y = rot;
      leaf.receiveShadow = !this.isSoftwareGl;
      this.scene.add(leaf);
    }
  }

  private rebuildPebbles(): void {
    while (this.pebblesGroup.children.length > 0) {
      this.pebblesGroup.remove(this.pebblesGroup.children[0]);
    }

    PITS.forEach((pit, pitIndex) => {
      const count = Math.min(20, Math.max(0, this.state.counts[pitIndex] ?? 0));
      const isSelected = pitIndex === this.state.selected;
      const liftY = isSelected ? 0.045 : 0;

      for (let i = 0; i < count; i += 1) {
        const slot = computePebbleSlot(pit, i, count);
        const mesh = new THREE.Mesh(
          this.pebbleGeom,
          this.pebbleMaterials[slot.colorIndex],
        );
        mesh.position.set(slot.x, slot.y + liftY, slot.z);
        mesh.scale.set(slot.scaleX, slot.scaleY, slot.scaleZ);
        mesh.rotation.y = slot.rotY;
        mesh.castShadow = !this.isSoftwareGl;
        mesh.receiveShadow = !this.isSoftwareGl;
        this.pebblesGroup.add(mesh);
      }
    });
  }

  private syncHighlightRings(): void {
    this.pitRings.forEach((ring, index) => {
      const mat = ring.material as THREE.MeshBasicMaterial;
      if (index === this.state.selected) {
        mat.color.setHex(0xd96e46);
        mat.opacity = 0.94;
      } else if (index === this.state.hovered) {
        mat.color.setHex(0x4e7c44);
        mat.opacity = 0.65;
      } else {
        mat.opacity = 0;
      }
    });
  }

  private updateCameraPose(): void {
    const aspectScale = Math.max(1, 1.58 / Math.max(0.75, this.camera.aspect));
    const distance = 12.0 * aspectScale;
    const x = Math.sin(this.cameraYaw) * Math.cos(this.cameraPitch) * distance;
    const y = Math.sin(this.cameraPitch) * distance;
    const z = Math.cos(this.cameraYaw) * Math.cos(this.cameraPitch) * distance;
    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 0.12, 0.12);
  }

  public updateState(
    nextState: ThreeBoardRenderState,
    hop?: ThreeBoardHopTransition,
  ): void {
    const countsChanged =
      nextState.counts !== this.state.counts ||
      nextState.selected !== this.state.selected;
    this.state = nextState;

    if (countsChanged) {
      this.rebuildPebbles();
    }
    this.syncHighlightRings();

    if (hop && !nextState.reducedMotion) {
      const fromPit = PITS[hop.fromPitIndex];
      const toPit = PITS[hop.toPitIndex];
      if (fromPit && toPit) {
        this.hopAnim = {
          startMs: performance.now(),
          durationMs: 320,
          from: new THREE.Vector3(fromPit.x, 0.34, fromPit.z),
          to: new THREE.Vector3(toPit.x, 0.34, toPit.z),
        };
        this.flyingPebble.visible = true;
      }
    } else {
      this.hopAnim = null;
      this.flyingPebble.visible = false;
    }

    this.requestRender();
  }

  public resetCamera(): void {
    this.cameraYaw = 0;
    this.cameraPitch = 0.88;
    this.updateCameraPose();
    this.requestRender();
  }

  public resize(): void {
    if (this.disposed) return;
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(220, Math.round(rect.width));
    const height = Math.max(180, Math.round(rect.height));
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.updateCameraPose();
    this.renderer.setSize(width, height, false);
    this.requestRender();
  }

  private requestRender(): void {
    if (this.disposed || this.contextLost || this.rafId !== null) return;
    this.rafId = window.requestAnimationFrame(this.renderFrame);
  }

  private readonly renderFrame = (nowMs: number): void => {
    this.rafId = null;
    if (this.disposed || this.contextLost) return;

    let continueLoop = false;
    if (this.hopAnim) {
      const elapsed = nowMs - this.hopAnim.startMs;
      const t = Math.min(1, Math.max(0, elapsed / this.hopAnim.durationMs));
      const eased = 1 - Math.pow(1 - t, 3);
      const pos = new THREE.Vector3().lerpVectors(
        this.hopAnim.from,
        this.hopAnim.to,
        eased,
      );
      pos.y += Math.sin(t * Math.PI) * 0.92;
      this.flyingPebble.position.copy(pos);
      this.flyingPebble.visible = t < 1;

      if (t < 1) {
        continueLoop = true;
      } else {
        this.hopAnim = null;
        this.flyingPebble.visible = false;
      }
    }

    this.renderer.render(this.scene, this.camera);
    if (this.isSoftwareGl) {
      this.renderer.getContext().finish();
    }

    if (continueLoop) {
      this.requestRender();
    }
  };

  private pickPitAtClient(clientX: number, clientY: number): number {
    const rect = this.renderer.domElement.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return -1;
    this.pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointerNdc, this.camera);
    const hits = this.raycaster.intersectObjects(this.pitHitMeshes, false);
    if (hits.length === 0) return -1;
    const idx = hits[0].object.userData.pitIndex;
    return typeof idx === 'number' ? idx : -1;
  }

  private readonly handlePointerDown = (e: PointerEvent): void => {
    this.isDragging = true;
    this.dragMoved = false;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.renderer.domElement.setPointerCapture(e.pointerId);
  };

  private readonly handlePointerMove = (e: PointerEvent): void => {
    if (this.isDragging) {
      const dx = e.clientX - this.dragStartX;
      const dy = e.clientY - this.dragStartY;
      if (Math.hypot(dx, dy) > 5) {
        this.dragMoved = true;
        this.cameraYaw = Math.max(
          -0.28,
          Math.min(0.28, this.cameraYaw - dx * 0.0032),
        );
        this.cameraPitch = Math.max(
          0.66,
          Math.min(1.12, this.cameraPitch + dy * 0.0028),
        );
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
        this.updateCameraPose();
        this.requestRender();
      }
      return;
    }

    const pit = this.pickPitAtClient(e.clientX, e.clientY);
    this.renderer.domElement.style.cursor = pit >= 0 ? 'pointer' : 'grab';
    if (pit !== this.state.hovered) {
      this.callbacks.onHoverPit(pit);
    }
  };

  private readonly handlePointerUp = (e: PointerEvent): void => {
    if (this.renderer.domElement.hasPointerCapture(e.pointerId)) {
      this.renderer.domElement.releasePointerCapture(e.pointerId);
    }
    const wasDragging = this.dragMoved;
    this.isDragging = false;
    this.dragMoved = false;

    if (!wasDragging) {
      const pit = this.pickPitAtClient(e.clientX, e.clientY);
      if (pit >= 0) {
        this.callbacks.onSelectPit(pit);
      }
    }
  };

  private readonly handlePointerLeave = (): void => {
    this.isDragging = false;
    if (this.state.hovered !== -1) {
      this.callbacks.onHoverPit(-1);
    }
  };

  private readonly handleContextLost = (e: Event): void => {
    e.preventDefault();
    this.contextLost = true;
    this.callbacks.onContextLost?.();
  };

  private readonly handleContextRestored = (): void => {
    this.contextLost = false;
    this.callbacks.onContextRestored?.();
    this.requestRender();
  };

  private bindEvents(): void {
    const dom = this.renderer.domElement;
    dom.addEventListener('pointerdown', this.handlePointerDown);
    dom.addEventListener('pointermove', this.handlePointerMove);
    dom.addEventListener('pointerup', this.handlePointerUp);
    dom.addEventListener('pointerleave', this.handlePointerLeave);
    dom.addEventListener('webglcontextlost', this.handleContextLost, false);
    dom.addEventListener('webglcontextrestored', this.handleContextRestored, false);
  }

  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    const dom = this.renderer.domElement;
    dom.removeEventListener('pointerdown', this.handlePointerDown);
    dom.removeEventListener('pointermove', this.handlePointerMove);
    dom.removeEventListener('pointerup', this.handlePointerUp);
    dom.removeEventListener('pointerleave', this.handlePointerLeave);
    dom.removeEventListener('webglcontextlost', this.handleContextLost);
    dom.removeEventListener('webglcontextrestored', this.handleContextRestored);

    for (const item of this.disposables) {
      item.dispose();
    }
    this.envRT.dispose();
    this.pmremGenerator.dispose();
    this.renderer.dispose();
    if (dom.parentNode === this.container) {
      this.container.removeChild(dom);
    }
  }
}
