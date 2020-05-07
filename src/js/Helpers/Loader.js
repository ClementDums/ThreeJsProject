import * as THREE from 'three'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import ScreenLoader from "./ScreenLoader";


const Loader = {
    manager: new THREE.LoadingManager(),
    init() {
        this.manager.onStart = function (url, itemsLoaded, itemsTotal) {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
            ScreenLoader.loadScreen(true);

        };
        this.manager.onLoad = function () {
            ScreenLoader.loadScreen(false);
        };
        this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            console.log(itemsLoaded/itemsTotal *100);
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
