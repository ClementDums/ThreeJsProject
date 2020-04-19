import OutSideScene from "./OutSide/OutSideScene";
import InsideScene from "./Museum/InsideScene";
import CameraManager from "../Camera/CameraManager";
import * as THREE from 'three'


export default class SceneManager {
    constructor(cameraManager, cameraMove) {
        this.cameraMove = cameraMove;
        this.currentScene = new InsideScene();
        this.cameraManager = cameraManager;
        this.init()
    }

    init() {
        this._threeScene = this.currentScene.scene;
        this._sceneObjects = this.currentScene.objects;
        this._huds = this.currentScene.huds;
        this._meteos = this.currentScene.meteo;

        this.currentScene.init();
        this.cameraMove.init();

        this._threeScene.add(this.cameraMove.splineParent);

        let flashLight = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 7, 20), new THREE.MeshPhongMaterial({color: 0x000000}));
        flashLight.rotateX(Math.PI / 2);
        this.cameraManager.mainCamera.camera.add(flashLight);

        let spotLight = new THREE.SpotLight(0xffffff, 0.5, 150);
        spotLight.power = 50;
        spotLight.angle = 0.4;
        spotLight.decay = 2;
        spotLight.penumbra = 0.5;
        spotLight.distance = 1500;
        spotLight.castShadow = true;
        spotLight.rotateX(Math.PI / 2);

        let spotLight2 = new THREE.SpotLight(0xCCCCCC, 0.5, 150);
        spotLight2.power = 25;
        spotLight2.angle = 0.55;
        spotLight2.decay = 2;
        spotLight2.penumbra = 0.5;
        spotLight2.distance = 800;
        spotLight2.castShadow = true;
        spotLight2.rotateX(Math.PI / 2);

        let spotLight3 = new THREE.SpotLight(0xFFFFFF, 0.5, 150);
        spotLight3.power = 4000;
        spotLight3.angle = 0.6;
        spotLight3.decay = 2.5;
        spotLight3.penumbra = 0.1;
        spotLight3.distance = 200;
        spotLight3.castShadow = true;
        spotLight3.rotateX(Math.PI / 2);

        flashLight.add(spotLight);
        flashLight.add(spotLight.target);
        flashLight.add(spotLight2);
        flashLight.add(spotLight2.target);


        this.loadSceneModels();
    }

    loadSceneModels() {

        this._sceneObjects.forEach((item) => {
            item.load().then((obj) => {
                item._object = obj;
                item.setup();
                if (!item._isHud) {
                    this._threeScene.add(obj);
                } else {
                    this.cameraManager.mainCamera.camera.add(obj)
                }
            })
        })
    }


    animateSceneModels() {
        this._sceneObjects.forEach((item) => {
            if (item._isAnimated) {
                item.animate()
            }
        });

        this._huds.forEach((item) => {
        })
    }


    get scene() {
        return this._threeScene;
    }
}
