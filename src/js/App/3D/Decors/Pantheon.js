import Loader from '../../../Helpers/Loader'
import * as THREE from 'three'
import PerfHelper from "../../../Helpers/Performance/PerfHelper";

export default class Pantheon {
    constructor(position) {
        this._position = position;
        this._path = './assets/3DModels/Pantheon/Pantheon_Opti.glb';
        this._object = null;
        this._isAnimated = false;
        this.hasPerf = true;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "Pantheon";

        this._object.position.set(this._position.x, this._position.y, this._position.z);

        const material = this._object.children[0].material;
        //
        // let newMat = new THREE.MeshPhongMaterial({
        //         color: material.color,
        //         specular: material.specular,
        //         emissiveMap: material.emissiveMap,
        //         alphaTest: 0,
        //         aoMapIntensity: 1,
        //         blendDst: 205,
        //         blendEquation: 100,
        //         blendSrc: 204,
        //         blending: 1,
        //         bumpScale: 1,
        //         clipIntersection: false,
        //         clipShadows: false,
        //         colorWrite: true,
        //         depthFunc: 3,
        //         depthTest: true,
        //         depthWrite: true,
        //         displacementBias: 0,
        //         displacementScale: 1,
        //         dithering: false,
        //         emissive: 0.5,
        //         emissiveIntensity: 1,
        //         envMapIntensity: 1,
        //         flatShading: true,
        //         fog: true,
        //         lightMapIntensity: 1,
        //         metalness: 1,
        //         morphNormals: false,
        //         morphTargets: false,
        //         name: "SOCLE.1",
        //         normalMapType: 0,
        //         normalScale: material.normalScale,
        //         opacity: 1,
        //         polygonOffset: false,
        //         polygonOffsetFactor: 0,
        //         polygonOffsetUnits: 0,
        //         premultipliedAlpha: false,
        //         refractionRatio: 0.98,
        //         roughness: 1,
        //         side: 0,
        //         skinning: false,
        //         stencilFail: 7680,
        //         stencilFunc: 519,
        //         stencilFuncMask: 255,
        //         stencilRef: 0,
        //         stencilWrite: false,
        //         stencilWriteMask: 255,
        //         stencilZFail: 7680,
        //         stencilZPass: 7680,
        //         toneMapped: true,
        //         transparent: false,
        //         version: 0,
        //         vertexColors: false,
        //         vertexTangents: false,
        //         visible: true,
        //         wireframe: false,
        //         wireframeLinecap: "round",
        //         wireframeLinejoin: "round",
        //         wireframeLinewidth: 1
        //     })
        // ;

        // this._object.children[0].material = newMat;
        console.log(material);

    }

    perf() {
        PerfHelper.instrumentScene(this._object)
    }


}
