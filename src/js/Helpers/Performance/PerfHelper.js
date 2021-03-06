const PerfHelper = {
    instrumentObject(object, summary) {
        console.log("Register perfs for object: " + object.name);

        object.userData.perf = {};

        object.onBeforeRender = function () {
            object.userData.perf.renderTS = performance.now()
        };

        object.onAfterRender = function () {
            object.userData.perf.delta = performance.now() - object.userData.perf.renderTS
            if(object.userData.perf.delta>1){
                console.log( object.userData.perf.delta+" "+ object.name);
            }
        };

        return true
    },

    instrumentScene(scene) {
        scene.userData.perf = {}
        scene.userData.perf.objects = []

        scene.traverse((object) => {
            if (object.isMesh) {
                if (this.instrumentObject(object)) {
                    scene.userData.perf.objects.push(object)
                }
            }

        });

        scene.onBeforeRender = function () {
            this.userData.perf.renderTS = performance.now();

            this.userData.perf.objects.forEach(object => object.userData.perf.delta = NaN)
        }

        scene.onAfterRender = function () {
            let delta = performance.now() - this.userData.perf.renderTS;
            let fps = Math.min(60, 1000 / delta);

            console.log("Performance summary");
            console.log("Whole scene : " + delta.toFixed(3) + " ms (" + fps.toFixed() + " fps)");

            this.userData.perf.objects.forEach(object => {
                if (!isNaN(object.userData.perf.delta)) {
                    console.log("[" + object.name + "] : " + object.userData.perf.delta.toFixed(3) + " ms")
                }
            })
        }
    }
};

export default PerfHelper;
