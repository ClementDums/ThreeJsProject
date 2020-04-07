import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

const Loader = {
    loadFbx(path) {
        return new Promise((resolve, reject) => {
            var loader = new FBXLoader();
            loader.load(path, (obj)=> {
                resolve(obj)
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
