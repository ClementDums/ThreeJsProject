import * as THREE from 'three'
import PostProcessingManager from '../PostProcessing/PostProcessingManager'

const RaycasterManager = {
    _raycaster: new THREE.Raycaster(),
    isActive: true,
    identifiers: [],
    INTERSECTED: null,


    getTouchedElement(mouse, camera, scene) {
        if (this.isActive) {
            this._raycaster.setFromCamera(mouse, camera);
            let intersects = this._raycaster.intersectObjects(scene.children, true);
            if (intersects.length > 0) {
                if (this.INTERSECTED !== intersects[0].object) {
                    this.INTERSECTED = intersects[0].object;
                    if (this.identifiers.includes(this.INTERSECTED.name)) {
                        PostProcessingManager.setOutlineObject(this.INTERSECTED,10)

                    }
                    else {
                        if (PostProcessingManager.outlineObject) {
                            PostProcessingManager.setOutlineStrength(5);
                        }
                    }
                }
            }
        }
    },

    getClickedOnTouchedElement() {
        if (this.INTERSECTED) {
            return this.INTERSECTED.name;
        }
    }
};

export default RaycasterManager
