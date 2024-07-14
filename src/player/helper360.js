// import THREE from "three";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  VideoTexture,
  LinearFilter,
  MeshBasicMaterial,
  DoubleSide,
  SphereGeometry,
  Mesh,
  Vector3,
  Euler,
  Quaternion,
} from "three";
export default class Helper360 {
  constructor(canvas, video, options) {
    this.canvas = canvas;
    this.video = video;
    this.options = options;
    this.requestId = null;
  }

  createScene() {
    const { ratio, width, height } = this.options;

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(75, ratio, 1, 1000);

    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.updateSceneSize(width, height);

    this.texture = new VideoTexture(this.video);
    this.texture.minFilter = LinearFilter;

    this.material = new MeshBasicMaterial({
      map: this.texture,
      side: DoubleSide,
    });
    this.geometry = new SphereGeometry(5, 32, 32);
    this.sphere = new Mesh(this.geometry, this.material);

    this.sphere.scale.x = -1;
    this.scene.add(this.sphere);
  }

  updateCameraQuaternion(alpha, beta, gamma, orientation) {
    const zee = new Vector3(0, 0, 1);
    const euler = new Euler();
    const q0 = new Quaternion();
    const q1 = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
    euler.set(beta, alpha, -gamma, "YXZ"); // 'ZXY' for the device, but 'YXZ' for us
    this.camera.quaternion.setFromEuler(euler); // orient the device
    this.camera.quaternion.multiply(q1); // camera looks out the back of the device, not the top
    this.camera.quaternion.multiply(q0.setFromAxisAngle(zee, -orientation)); // adjust orientation
  }

  updateOrientationScene(orientation, motion) {
    const radOrientation = Math.degToRad(orientation);
    const radAlpha = Math.degToRad(motion.alpha);
    const radBeta = Math.degToRad(motion.beta);
    const radGamma = Math.degToRad(motion.gamma);

    if (this.camera) {
      this.updateCameraQuaternion(radAlpha, radBeta, radGamma, radOrientation);
      // Render manually if the render loop is stopped
      if (!this.requestId) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }

  rotateScene(deltaX, deltaY) {
    if (this.sphere && !isNaN(deltaX) && !isNaN(deltaY)) {
      this.sphere.rotation.y += deltaX;
      this.sphere.rotation.x += deltaY;
      // Render manually if the render loop is stopped
      if (!this.requestId) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }

  updateSceneSize(width, height) {
    this.renderer.setSize(width, height, false);
  }

  renderLoop() {
    this.requestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  stopRenderLoop() {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }
}
