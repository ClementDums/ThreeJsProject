//Setup Camera position, rotation, attaché au personnage
import * as THREE from 'three'
import Loader from '../../../Helpers/Loader'

export default class OutSideScene {
    constructor() {
        this._scene = new THREE.Scene();
        this._scene.name = "Outside";

        this.init()
    }

    init() {

        const geometry = new THREE.BoxGeometry(10000, 10000, 10000);

        var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
        var mat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(geo, mat);
        plane.position.y = -10;
        plane.rotateX(-Math.PI / 2);


        var ambientLight = new THREE.AmbientLight(0x404040);
        this._scene.add(ambientLight);
        this._scene.add(plane);

        const objsPromise = Loader.loadGLTF('./assets/3DModels/LowPoly_head_2.glb');
        objsPromise.then(obj => {
            this._scene.add(obj);
        });
    }

    get scene() {
        return this._scene
    }


    createDebrisFromBreakableObject(object) {

        object.castShadow = true;
        object.receiveShadow = true;

        var shape = createConvexHullPhysicsShape(object.geometry.attributes.position.array);
        shape.setMargin(margin);

        var body = createRigidBody(object, shape, object.userData.mass, null, null, object.userData.velocity, object.userData.angularVelocity);

        // Set pointer back to the three object only in the debris objects
        var btVecUserData = new Ammo.btVector3(0, 0, 0);
        btVecUserData.threeObject = object;
        body.setUserPointer(btVecUserData);

    }

}
