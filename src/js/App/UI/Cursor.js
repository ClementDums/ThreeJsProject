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
            document.addEventListener('mousedown', () => this.pressIn());
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
        },

        pressOut() {


        },

        move(event) {
            this._position.x = (event.clientX / window.innerWidth) * 2 - 1;
            this._position.y = -(event.clientY / window.innerHeight) * 2 + 1;

            document.querySelector('.follow').style.transform = "translate(" + (event.clientX - 7) + "px," + (event.clientY - 7) + "px)";
        }
    }
;

export default Cursor
