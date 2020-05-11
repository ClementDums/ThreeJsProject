import TWEEN from "@tweenjs/tween.js"
import * as THREE from 'three'

const Cursor = {
    init() {
        this.initInteraction();
        this.pressed = false;
        this.follower = document.querySelector(".follow");
        this.scale = 1;
        this._position = new THREE.Vector2();

    },
    initInteraction() {
        document.querySelectorAll('.hover').forEach((button) => {
            button.addEventListener('mouseover', () => this.hoverClickable());
            button.addEventListener('mouseout', () => this.outClickable());
        });
        window.addEventListener('mousemove', this.move.bind(this), false);
        // document.addEventListener('mousedown', () => this.pressIn());
        // document.addEventListener('mouseup', () => this.pressOut());
    },

    hoverClickable() {
        this.follower.classList.add("big");
    },

    outClickable() {
        this.follower.classList.remove("big");
    },

    pressIn() {
        // this.pressed = true;
        // new TWEEN.Tween(this)
        //     .to({scale: 0.5}, 1000)
        //     .easing(TWEEN.Easing.Quadratic.Out)
        //     .onUpdate(() => { // Called after tween.js updates 'coords'.
        //         console.log(this.scale);
        //         this.follower.style.setProperty('transform', 'scale(' + this.scale + ')')
        //     })
        //     .start();
    },

    pressOut() {

    },

    move(event) {
        this._position.x = (event.clientX / window.innerWidth) * 2 - 1;
        this._position.y = -(event.clientY / window.innerHeight) * 2 + 1;
        const relX = event.pageX;
        const relY = event.pageY;

        document.querySelector('.follow').style.transform = "translate(" + (event.clientX - 7) + "px," + (event.clientY - 7) + "px)";
    }
};

export default Cursor
