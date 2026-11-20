import { PITS, type PitDefinition } from './prototypeOnlyModel';

type Vec3 = [number, number, number];
const identity = (n: number) => Array<number>(n).fill(0);
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const normalize = (a: Vec3): Vec3 => { const d = Math.hypot(...a) || 1; return [a[0] / d, a[1] / d, a[2] / d]; };
const subtract = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
function mul(a: number[], b: number[]): number[] {
  const c = identity(16);
  for (let col = 0; col < 4; col++) for (let row = 0; row < 4; row++) {
    for (let k = 0; k < 4; k++) c[col * 4 + row] += a[k * 4 + row] * b[col * 4 + k];
  }
  return c;
}
function cameraMatrix(): number[] {
  const eye: Vec3 = [7.7, 9.8, 12.2], target: Vec3 = [0, -0.1, 0], up: Vec3 = [0, 1, 0];
  const forward = normalize(subtract(eye, target));
  const right = normalize(cross(up, forward));
  const trueUp = cross(forward, right);
  return [right[0], trueUp[0], forward[0], 0,
    right[1], trueUp[1], forward[1], 0,
    right[2], trueUp[2], forward[2], 0,
    -dot(right, eye), -dot(trueUp, eye), -dot(forward, eye), 1];
}
function ortho(aspect: number): number[] {
  const width = Math.max(13.7, 8.3 * aspect), height = width / aspect;
  const left = -width / 2, right = width / 2, bottom = -height / 2, top = height / 2;
  const near = 0.1, far = 100;
  return [2 / (right - left), 0, 0, 0, 0, 2 / (top - bottom), 0, 0,
    0, 0, -2 / (far - near), 0, -(right + left) / (right - left),
    -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1];
}
const vertexSource = [
  '#version 300 es', 'precision highp float;',
  'layout(location=0) in vec3 aPosition;',
  'layout(location=1) in vec3 aNormal;',
  'layout(location=2) in vec3 aColor;',
  'uniform mat4 uMvp;', 'out vec3 vColor;', 'out vec3 vNormal;',
  'void main(){gl_Position=uMvp*vec4(aPosition,1.0);vColor=aColor;vNormal=aNormal;}',
].join('\n');
const fragmentSource = [
  '#version 300 es', 'precision highp float;',
  'in vec3 vColor;', 'in vec3 vNormal;', 'out vec4 outColor;',
  'void main(){vec3 l=normalize(vec3(-0.5,1.0,0.7));',
  'float d=max(dot(normalize(vNormal),l),0.0);',
  'vec3 tint=vec3(1.0,0.975,0.925);',
  'outColor=vec4(vColor*(0.56+0.44*d)*tint,1.0);}',
].join('\n');
function rgb(hex: string): Vec3 {
  return [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255].slice(0,3) as Vec3;
}
const wood = rgb('#BF8962'), woodDark = rgb('#916649'), grass = rgb('#728E69');
const seedPalette = [rgb('#B6D9A6'), rgb('#D98F72'), rgb('#F0CC8D'), rgb('#E7E7CC')];
function depthAt(x: number, z: number): number {
  let y = 0.08;
  for (const pit of PITS) {
    const r = ((x - pit.x) / pit.rx) ** 2 + ((z - pit.z) / pit.rz) ** 2;
    if (r < 1) y = Math.min(y, 0.08 - (pit.isQuan ? 0.44 : 0.39) * (1 - r) ** 2);
  }
  return y;
}
class MeshBuilder {
  data: number[] = [];
  push(p: Vec3, normal: Vec3, color: Vec3) { this.data.push(...p, ...normal, ...color); }
  triangle(a: Vec3, b: Vec3, c: Vec3, color: Vec3) {
    const n = normalize(cross(subtract(b, a), subtract(c, a)));
    this.push(a, n, color); this.push(b, n, color); this.push(c, n, color);
  }
  quad(a: Vec3, b: Vec3, c: Vec3, d: Vec3, color: Vec3) {
    this.triangle(a, b, c, color); this.triangle(a, c, d, color);
  }
  box(x: number, y: number, z: number, w: number, h: number, d: number, color: Vec3) {
    const p = (dx: number, dy: number, dz: number): Vec3 => [x + dx * w / 2, y + dy * h / 2, z + dz * d / 2];
    this.quad(p(-1,1,-1),p(1,1,-1),p(1,1,1),p(-1,1,1),color);
    this.quad(p(-1,-1,1),p(1,-1,1),p(1,-1,-1),p(-1,-1,-1),color);
    this.quad(p(-1,-1,-1),p(1,-1,-1),p(1,1,-1),p(-1,1,-1),color);
    this.quad(p(1,-1,1),p(-1,-1,1),p(-1,1,1),p(1,1,1),color);
    this.quad(p(-1,-1,1),p(-1,-1,-1),p(-1,1,-1),p(-1,1,1),color);
    this.quad(p(1,-1,-1),p(1,-1,1),p(1,1,1),p(1,1,-1),color);
  }
  ring(pit: PitDefinition, color: Vec3, thickness = 0.05) {
    const steps = 56, radius = 1.025;
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * Math.PI * 2, t2 = ((i + 1) / steps) * Math.PI * 2;
      const a = (scale: number, angle: number): Vec3 => [pit.x + Math.cos(angle) * pit.rx * scale, 0.097, pit.z + Math.sin(angle) * pit.rz * scale];
      this.quad(a(radius,t),a(radius,t2),a(radius+thickness,t2),a(radius+thickness,t),color);
    }
  }
  pebble(x: number, y: number, z: number, r: number, color: Vec3) {
    const pts: Vec3[] = [
      [x,y+r*.82,z],[x,y-r*.52,z],
      [x-r,y,z],[x+r,y,z],[x,y,z-r*.82],[x,y,z+r*.82],
    ];
    const triangles = [[0,2,4],[0,4,3],[0,3,5],[0,5,2],[1,4,2],[1,3,4],[1,5,3],[1,2,5]];
    for (const [a,b,c] of triangles) this.triangle(pts[a], pts[b], pts[c], color);
  }
  boardSurface(selected: number | null) {
    const nx = 124, nz = 52, minX = -5.45, maxX = 5.45, minZ = -2.22, maxZ = 2.22;
    const sample = (x: number, z: number) => {
      const y = depthAt(x, z);
      const h = Math.max(0, (0.08 - y) / 0.44);
      const col: Vec3 = [wood[0] * (1-h*.36), wood[1] * (1-h*.44), wood[2] * (1-h*.44)];
      const dx = (depthAt(x + .018,z) - depthAt(x - .018,z)) / .036;
      const dz = (depthAt(x,z + .018) - depthAt(x,z - .018)) / .036;
      return { p: [x,y,z] as Vec3, n: normalize([-dx,1,-dz]), col };
    };
    for(let iz=0; iz<nz; iz++) for(let ix=0; ix<nx; ix++) {
      const x = minX+(maxX-minX)*ix/nx, z = minZ+(maxZ-minZ)*iz/nz;
      const x2 = minX+(maxX-minX)*(ix+1)/nx, z2 = minZ+(maxZ-minZ)*(iz+1)/nz;
      const a=sample(x,z), b=sample(x2,z), c=sample(x2,z2), d=sample(x,z2);
      for(const v of [[a,b,c],[a,c,d]]) for(const q of v) this.push(q.p, q.n, q.col);
    }
    PITS.forEach((p,i)=> this.ring(p, selected === i ? rgb('#EDF6B6') : rgb('#EBC7A0'), selected === i ? 0.11 : 0.044));
  }
  board(counts: readonly number[], selected: number | null) {
    this.box(0,-0.78,0,12.3,.5,5.9,rgb('#B48A66'));
    this.box(0,-1.04,0,11.4,.12,5.2,rgb('#D5A37A'));
    this.box(0,-.29,0,11.15,.42,4.56,woodDark);
    this.box(0,-.55,0,11.35,.08,4.68,rgb('#63894C'));
    this.boardSurface(selected);
    for(let i=0;i<counts.length;i++) {
      const p=PITS[i], count=Math.min(24, Math.max(0, counts[i]));
      for(let j=0;j<count;j++) {
        const angle=j*2.39996 + i*.19, rad=.08 + Math.sqrt((j+.5)/Math.max(1,count))*.43;
        const x=p.x+Math.cos(angle)*p.rx*rad, z=p.z+Math.sin(angle)*p.rz*rad;
        const y=depthAt(x,z)+.16+(j%3)*.025+(selected === i ? .07 : 0);
        this.pebble(x,y,z,p.isQuan ? .21 : .145,seedPalette[(i+j)%seedPalette.length]);
      }
    }
    for (const x of [-4.5,4.5]) {
      this.box(x,-1.24,-1.9,.35,.44,.32,woodDark);
      this.box(x,-1.24,1.9,.35,.44,.32,woodDark);
    }
    this.pebble(-5.02,.12,-1.72,.16,grass);
    this.pebble(5.02,.12,1.72,.16,grass);
  }
}
function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader=gl.createShader(type);
  if (!shader) throw new Error('Không tạo được shader');
  gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {
    const error=gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);throw new Error(error || 'Shader compile failed');
  }
  return shader;
}
export class BoardRenderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private buffer: WebGLBuffer;
  private mvp: number[] = identity(16);
  private lastCounts: readonly number[] = [];
  private lastSelection: number | null = null;
  constructor(private canvas: HTMLCanvasElement) {
    const gl=canvas.getContext('webgl2',{antialias:true,alpha:true,powerPreference:'low-power'});
    if(!gl) throw new Error('Thiết bị không hỗ trợ WebGL2');
    const vs=compile(gl,gl.VERTEX_SHADER,vertexSource),fs=compile(gl,gl.FRAGMENT_SHADER,fragmentSource);
    const program=gl.createProgram();if(!program)throw new Error('Không tạo được chương trình WebGL');
    gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
    gl.deleteShader(vs);gl.deleteShader(fs);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program)||'WebGL link failed');
    const buffer=gl.createBuffer();if(!buffer)throw new Error('Không tạo được buffer WebGL');
    this.gl=gl;this.program=program;this.buffer=buffer;
  }
  render(counts: readonly number[], selected: number | null) {
    if(this.gl.isContextLost())return;
    this.lastCounts=counts;this.lastSelection=selected;
    const gl=this.gl,rect=this.canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
    const width=Math.max(1,Math.round(rect.width*dpr)),height=Math.max(1,Math.round(rect.height*dpr));
    if(this.canvas.width!==width || this.canvas.height!==height){this.canvas.width=width;this.canvas.height=height;}
    gl.viewport(0,0,width,height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
    this.mvp=mul(ortho(width/height),cameraMatrix());
    const mesh=new MeshBuilder();mesh.board(counts,selected);
    gl.useProgram(this.program);gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(mesh.data),gl.DYNAMIC_DRAW);
    for(let i=0;i<3;i++){
      gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,3,gl.FLOAT,false,36,i*12);
    }
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program,'uMvp'),false,new Float32Array(this.mvp));
    gl.drawArrays(gl.TRIANGLES,0,mesh.data.length/9);
  }
  redraw() { this.render(this.lastCounts,this.lastSelection); }
  pick(clientX: number,clientY: number): number | null {
    const rect=this.canvas.getBoundingClientRect();if(!rect.width||!rect.height)return null;
    const px=clientX-rect.left,py=clientY-rect.top;
    let nearest: number|null=null,best=Infinity;
    PITS.forEach((p,i)=>{
      const v=[p.x,0.09,p.z,1];
      const projected=identity(4);
      for(let row=0;row<4;row++)for(let k=0;k<4;k++)projected[row]+=this.mvp[k*4+row]*v[k];
      if(projected[3]===0)return;
      const sx=(projected[0]/projected[3]*.5+.5)*rect.width;
      const sy=(.5-projected[1]/projected[3]*.5)*rect.height;
      const d=Math.hypot((px-sx)/Math.max(23,rect.width*.042),(py-sy)/Math.max(23,rect.height*.085));
      if(d<best){best=d;nearest=i;}
    });
    return best<1.45?nearest:null;
  }
  destroy() {this.gl.deleteBuffer(this.buffer);this.gl.deleteProgram(this.program);}
}
