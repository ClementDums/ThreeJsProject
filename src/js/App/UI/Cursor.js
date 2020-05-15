import TWEEN from "@tweenjs/tween.js"
import * as THREE from 'three'

const Cursor = {
        init() {
            this.follower = document.querySelector(".follow");
            this.scale = 1;
            this._position = new THREE.Vector2();
            this.outFollow = document.querySelector('.outFollow');
            this.outerWidth = this.outFollow.offsetWidth;
            this.innerWidth = this.follower.offsetWidth;
            this.clientX = -100;
            this.clientY = -100;
            this.initParams();
            this.initInteraction();
            this.initHovers();
        },
        initInteraction() {
            document.addEventListener("mousemove", e => {
                this.clientX = e.clientX;
                this.clientY = e.clientY;
            });
        //     document.addEventListener('mousedown', e => {
        //        new TWEEN.Tween(this.outFollow)
        //             .to({width: 45}, 200)
        //             .easing(TWEEN.Easing.Quadratic.Out)
        //             .onUpdate(() => {
        //                 this.outFollow.style.setProperty('width', '' + this.outFollow.width + 'px');
        //                 this.outFollow.style.setProperty('height', '' + this.outFollow.width + 'px');
        //             })
        //             .start();
        //     });
        //
        //     document.addEventListener('mouseup', e => {
        //        new TWEEN.Tween(this.outFollow)
        //             .to({width: 70}, 200)
        //             .easing(TWEEN.Easing.Quadratic.Out)
        //             .onUpdate(() => {
        //                 this.outFollow.style.setProperty('width', '' + this.outFollow.width + 'px');
        //                 this.outFollow.style.setProperty('height', '' + this.outFollow.width + 'px');
        //             })
        //             .start();
        //     });
        // },

        initParams() {
            this.outFollow.width = 70;
            this.outFollow.opacity = 0.2;
        },

        animate() {
            this.follower.style.transform = "translate(" + (this.clientX - this.innerWidth / 2) + "px," + (this.clientY - this.innerWidth / 2) + "px)";
            new TWEEN.Tween(this._position)
                .to({x: this.clientX - this.outFollow.width / 2, y: this.clientY - this.outFollow.width / 2}, 15)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                    this.outFollow.style.setProperty('transform', 'translate(' + this._position.x + 'px, ' + this._position.y + 'px)');
                })
                .start();

        },
        initHovers() {
            const handleMouseEnter = e => {
                this.isStuck = true;
                this.outFollow.style.setProperty('width', '' + 100 + 'px');
                this.outFollow.style.setProperty('height', '' + 100 + 'px');
                this.outFollow.style.setProperty('opacity', '0.4');

                new TWEEN.Tween(this.outFollow)
                    .to({width: 100, opacity: 0.4}, 200)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                        this.outFollow.style.setProperty('width', '' + this.outFollow.width + 'px');
                        this.outFollow.style.setProperty('height', '' + this.outFollow.width + 'px');
                        this.outFollow.style.setProperty('opacity', this.outFollow.opacity);
                    })
                    .start();

            };

            const handleMouseLeave = e => {
                new TWEEN.Tween(this.outFollow)
                    .to({width: 70, opacity: 0.2}, 200)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                        this.outFollow.style.setProperty('width', '' + this.outFollow.width + 'px');
                        this.outFollow.style.setProperty('height', '' + this.outFollow.width + 'px');
                        this.outFollow.style.setProperty('opacity', this.outFollow.opacity);
                    })
                    .start();
            };

            document.querySelectorAll('.hover').forEach((button) => {
                button.addEventListener('mouseover', handleMouseEnter);
                button.addEventListener('mouseout', handleMouseLeave);
            });
        },
    }
;

export default Cursor
