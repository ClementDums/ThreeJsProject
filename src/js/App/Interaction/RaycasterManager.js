import * as THREE from 'three'

const RaycasterManager = {
        _raycaster: new THREE.Raycaster(),
        isActive: false,
        identifier: null,
        INTERSECTED: null,


        getTouchedElement(mouse, camera, scene) {
            if (this.isActive) {
                this._raycaster.setFromCamera(mouse, camera);
                let intersects = this._raycaster.intersectObjects(scene.children, true);
                if (intersects.length > 0) {
                    if (this.INTERSECTED !== intersects[0].object) {
                        if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
                        this.INTERSECTED = intersects[0].object;
                        if (this.INTERSECTED.name === this.identifier) {
                            this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                            this.INTERSECTED.material.emissive.setHex(0xff0000);
                        }
                        else {
                            this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

                            this.INTERSECTED = null;

                        }
                    }
                }
            }
        }
        ,

        getClickedOnTouchedElement() {
            if(this.INTERSECTED){
                return this.INTERSECTED.name;
            }
        }
    }
;

export default RaycasterManager
