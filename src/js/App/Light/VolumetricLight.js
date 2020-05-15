import * as THREE from 'three'
import VolumetricLightHelper from '../../Helpers/Light/VolumetricLightHelper';
import SpotLightHelper from '../../Helpers/Light/SpotLightHelper';

export default class VolumetricLight {

    getMainSpotLight() {

        //--------------------Volumetric light start
        //cylinder data
        let cylinderData = {
            radiusTop: 20,
            radiusBottom: 380,
            height: 2600,
            radiusSegment: 32*2,
            heightSegments: 50,
            openEnded: true
        };
        //volumetric data
        let volumetricLightData = {
            name: "MainVolumetricLight",
            cylinderData: cylinderData,
            position: {x: 0, y: 2375, z: -200},
            lookAt: {x: 0, y: 0, z: -200}
        };
        //volumetric light
        let volumetric = new VolumetricLightHelper(volumetricLightData).getVolumetricLight();
        //--------------------Volumetric light end

        //--------------------Spotlight start
        //spotlight data
        let spotlightData = {
            name: "MainSpotlight",
            position: {x: 0, y: 2000, z: -200},
            target: {x: -20, y: 0,z: -280},
            color: new THREE.Color(1, 1, 1),
            angle: Math.PI/16,
            intensity: 0.9,
            penumbra: 0.2
        };

        //spotlight
        let spot = new SpotLightHelper(spotlightData).getSpotLight();
        //--------------------Spotlight end

        return {
            volumetric: volumetric,
            spot: spot,
            spotTarget: spot.target
        }
    }
}
