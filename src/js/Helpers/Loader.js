import * as THREE from 'three'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import ScreenLoader from "./ScreenLoader";
import SceneManager from "../App/Scene/SceneManager";
import UIManager from "../App/UI/UIManager";


const Loader = {
    manager: new THREE.LoadingManager(),
    init() {
        this.manager.onStart = function (url, itemsLoaded, itemsTotal) {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
            ScreenLoader.loadScreen(true);

        };
        this.manager.onLoad = function () {
            ScreenLoader.loadScreen(false);
            SceneManager.afterLoad();
            SceneManager.currentScene.addParticlesObject()
        };
        this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            const itemPercent = Math.floor((itemsLoaded/itemsTotal *100));
            UIManager.setLoadInfos(itemPercent);
            console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
    },

    /**
     * LOAD FBX
     * @param path
     * @returns {Promise<any>}
     */
    loadFbx(path) {
        return new Promise((resolve, reject) => {
            const loader = new FBXLoader();
            loader.load(path, (obj) => {
                resolve(obj)
            }, this.onProgress, this.onError);
        });
    },

    /**
     * LOAD OBJ
     * @param path
     * @returns {Promise<any>}
     */
    loadObj(path) {
        return new Promise((resolve, reject) => {
            const loader = new OBJLoader();
            loader.load(path, (obj) => {
                resolve(obj)
            }, this.onProgress, this.onError);
        });
    },

    /**
     * LOAD GLTF
     * @param path
     * @returns {Promise<any>}
     */
    loadGLTF(path) {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader(this.manager);
            loader.load(path, (obj) => {
                resolve(obj.scene)
            }, this.onProgress, this.onError);
        });
    },


    onProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
        }
    },

    onError(e) {
        console.log(e)
    }
};
export default Loader
