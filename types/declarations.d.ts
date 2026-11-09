declare module 'three' {
  export class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
    copy(v: Vector2): this;
    lerp(v: Vector2, alpha: number): this;
  }
  export class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
  }
  export class Clock {
    getElapsedTime(): number;
  }
  export class Scene {
    add(object: any): void;
    remove(object: any): void;
  }
  export class OrthographicCamera {
    position: { z: number };
    constructor(left: number, right: number, top: number, bottom: number, near: number, far: number);
  }
  export class WebGLRenderer {
    domElement: HTMLCanvasElement;
    constructor(parameters?: any);
    setPixelRatio(pixelRatio: number): void;
    setSize(width: number, height: number, updateStyle?: boolean): void;
    render(scene: Scene, camera: any): void;
    dispose(): void;
    forceContextLoss(): void;
    getPixelRatio(): number;
  }
  export class ShaderMaterial {
    uniforms: any;
    constructor(parameters?: any);
    dispose(): void;
  }
  export class PlaneGeometry {
    constructor(width?: number, height?: number);
    dispose(): void;
  }
  export class Mesh {
    constructor(geometry?: any, material?: any);
  }
}
