import * as THREE from 'three'

const AudioHelpers = {
    listener: null,
    audioLoader: new THREE.AudioLoader(),
    sounds: [],
    masterVolume: 1,


    setListener(listener) {
        this.listener = listener;
    },

    addSound(name, path, loop) {
        const sound = {
            name: "",
            path: "",
            audio: null
        };
        sound.audio = new THREE.Audio(this.listener);
        sound.name = name;
        sound.path = path;
        sound.audio.setLoop(loop);
        sound.audio.setVolume(0.5);
        this.sounds.push(sound);
    },

    setSoundVolume(name, v) {
        const sound = this.sounds.find(item => item.name === name);
        if (!sound) {
            console.log("Sound not found");
            return
        }
        sound.audio.setVolume(v);
        console.log(sound)
    },
    unmuteMaster() {
        this.listener.setMasterVolume(this.masterVolume);
    },
    muteMaster() {
        this.listener.setMasterVolume(0);
    },
    playSound(name) {
        const sound = this.sounds.find(item => item.name === name);
        if (!sound) {
            console.log("Sound not found");
            return
        }
        this.audioLoader.load(sound.path, function (buffer) {
            sound.audio.setBuffer(buffer);
            sound.audio.play();
        });
    },

    resetSound(name) {
        const sound = this.sounds.find(item => item.name === name);
        if (!sound) {
            console.log("Sound not found");
            return
        }
        sound.audio.pause();
        sound.audio.currentTime = 0;
    },
    pauseSound(name) {
        const sound = this.sounds.find(item => item.name === name);
        if (!sound) {
            console.log("Sound not found");
            return
        }
        sound.audio.pause();
    }
};
export default AudioHelpers;
