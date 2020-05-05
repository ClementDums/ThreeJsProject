import * as THREE from 'three'

const ShaderManager = {

    ColorifyShader: {

        uniforms: {

            "tDiffuse": {type: "t", value: null},
            "color": {type: "c", value: new THREE.Color(0xffffff)}

        },

        vertexShader: [

            "varying vec2 vUv;",

            "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

            "}"

        ].join("\n"),

        fragmentShader: [

            "uniform vec3 color;",
            "uniform sampler2D tDiffuse;",

            "varying vec2 vUv;",

            "void main() {",

            "vec4 texel = texture2D( tDiffuse, vUv );",
            "gl_FragColor = vec4( vec3(texel) + color, texel.w );",

            "}"

        ].join("\n")

    }

};
export default ShaderManager;
