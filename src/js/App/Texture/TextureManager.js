import * as THREE from 'three'

const TextureManager = {
  init(){
      this.rtTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBFormat
        });
  }
};

export default TextureManager;
