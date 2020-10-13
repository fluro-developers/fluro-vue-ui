<template>
    <div>
        <slot :volume="playerVolume" :muted="muted" :play="play" :pause="pause" :toggle="toggle" :mute="mute" :toggleMute="toggleMute" :unmute="unmute" :playing="playing" />
    </div>
    <!-- Playing: {{playing}} <br /> -->
    <!-- Volume: {{actualVolume}} <br /> -->
    <!-- <audio ref="audio" :muted="muted" :src="contentURL" controls></audio> -->
    <!-- </div> -->
</template>
<script>
// import RangeSlider from 'vue-range-slider';
// import 'vue-range-slider/dist/vue-range-slider.css';

export default {
    props: {
        value: [String, Object],
        volume: {
            type: Number,
            default () {
                return 80;
            }
        },
        global: {
            type: Boolean
        }
    },
    data() {
        return {
            mounted: false,
            model: this.value,
            actualVolume: this.volume / 100,
            isPlaying: false,
            muted: false,
            localAudio: null,
            audio: null
        };
    },
    mounted() {
        this.mount();
    },
    activated() {
        this.mount();
    },
    deactivated() {
        this.unmount();
    },
    beforeDestroy() {
        this.unmount();
    },
    watch: {
        volume(v) {
            this.playerVolume = v;
        },
        audio(newValue, oldValue) {
            var self = this;

            if (oldValue) {
                oldValue.removeEventListener("pause", self.paused);
                oldValue.removeEventListener("play", self.played);
                oldValue.removeEventListener("timeupdate", self.timeupdated);
                oldValue.removeEventListener("volumechange", self.volumechanged);
            }

            if (newValue) {
                newValue.addEventListener("pause", self.paused);
                newValue.addEventListener("play", self.played);
                newValue.addEventListener("timeupdate", self.timeupdated);
                newValue.addEventListener("volumechange", self.volumechanged);
            }
        }
    },
    computed: {
        playing() {
            var self = this;

            if (!self.isPlaying) {
                return;
            }

            if (!self.global) {
                return self.isPlaying;
            }

            if (!self.$fluro.app) {
                return;
            }

            var contentID = self.contentID;
            var globalTrackID = self.$fluro.utils.getStringID(
                self.$fluro.app.global.currentTrack
            );

            var match = contentID == globalTrackID;

            //console.log('MATCH?', contentID, globalTrackID)
            return match;
        },
        playerVolume: {
            get() {
                return this.actualVolume;
            },
            set(v) {
                v = parseInt(v);
                v = Math.max(v, 0);
                v = Math.min(v, 100);
                if (isNaN(v)) {
                    v = 0;
                }
                if (!this.audio) {
                    return;
                }
                this.actualVolume = v;
                this.audio.volume = v / 100;
            }
        },
        contentID() {
            return this.$fluro.utils.getStringID(this.value);
        },
        contentURL() {
            return this.$fluro.asset.getUrl(this.contentID);
        },
        duration() {
            if (this.audio) {
                return this.audio.duration;
            }
        },
        currentTime() {
            if (this.audio) {
                return this.audio.currentTime;
            }
        }
    },
    methods: {
        mount() {
            var self = this;
            self.mounted = true;

            if (self.global) {
                self.audio = self.$fluro.app.audioPlayer;
            } else {
                if (!self.localAudio) {
                    self.localAudio = new Audio();
                }
                self.audio = self.localAudio;
            }

            console.log("GOT AUDIO", self.$el, self.audio);
            self.audio.addEventListener("pause", self.paused);
            self.audio.addEventListener("play", self.played);
            self.audio.addEventListener("timeupdate", self.timeupdated);
            self.audio.addEventListener("volumechange", self.volumechanged);
        },
        unmount() {
            var self = this;
            self.mounted = false;
            if (!self.audio) {
                return;
            }

            self.audio.removeEventListener("pause", self.paused);
            self.audio.removeEventListener("play", self.played);
            self.audio.removeEventListener("timeupdate", self.timeupdated);
            self.audio.removeEventListener("volumechange", self.volumechanged);

            self.audio = null;
        },
        paused() {
            this.isPlaying = false;
            this.$emit("pause");
            // console.log('PAUSE');
        },
        played() {
            this.isPlaying = true;
            this.$emit("play");
            // console.log('PLAY')
        },
        volumechanged() {
            if (this.muted) {
                return;
            }

            if (!self.audio) {
                return;
            }

            var volume = self.audio.volume * 100;
            this.playerVolume = volume;
            this.$emit("volume", { volume });
        },
        timeupdated(event) {
            var self = this;
            if (!self.audio) {
                return;
            }

            var progress = parseFloat(
                (self.audio.currentTime / self.audio.duration) * 100,
                10
            );
            var data = {
                time: event.timeStamp,
                progress,
                currentTime: self.audio.currentTime,
                duration: self.audio.duration
            };
            self.$emit("time", data);
        },
        mute() {
            this.muted = true;

            if (!this.audio) {
                return;
            }
            this.audio.volume = 0;
        },
        unmute() {
            this.muted = false;

            if (!this.audio) {
                return;
            }

            var vol = Math.max(0, Math.min(Math.ceil(this.actualVolume / 100), 1));

            console.log(vol, this.actualVolume);

            this.audio.volume = vol;
        },
        toggleMute() {
            if (this.muted) {
                this.unmute();
            } else {
                this.mute();
            }
        },
        toggle() {
            var self = this;
            if (self.playing) {
                self.pause();
            } else {
                self.play();
            }
        },
        play() {
            var self = this;

            if (!self.audio) {
                return;
            }

            if (!self.contentURL) {
                return;
            }

            if (self.global && self.$fluro.app) {
                self.$set(self.$fluro.app.global, "currentTrack", self.model);
            }

            if (self.audio.src != self.contentURL) {
                self.audio.src = self.contentURL;
            }

            self.audio.play();

            console.log("AUDIO Play", self.audio.src);
        },
        pause() {
            var self = this;

            if (!self.audio) {
                return;
            }

            self.audio.pause();

            console.log("AUDIO Pause", self.audio.src);
        }
    }
};

</script>
<style lang="scss">
audio {
    display: block;
    width: 100%;
}

/**
.play-pause-button {
        width: 100% !important;
        height: 100%;
        padding: 30%;
}

.volume {
        display: block;
        cursor: pointer;
        width: 50%;
        pointer-events: all;
        color: #000;
        margin: 25px auto;

        .range-wrap {
                margin: 0 5%;
                width: 90%;

                // border: 2px solid #fff;
                background: rgba(#000, 0.2);
                border-radius: 200px;
                height: 10px;
                overflow: hidden;
                box-sizing: content-box;
                ;

        }

        .range-slider {
                // border:2px solid #fff;
                border-radius: 100px;
                background: none; //rgba(#000, 0.1);
                width: 100%;
                vertical-align: top;


                padding: 0;
                height: 100%;

                .range-slider-inner {
                        display: block;
                }

                .range-slider-rail {
                        display: none;
                        background: rgba(#000, 0.3);
                        // border-radius: 100px;
                        border-radius: 100px;

                }

                .range-slider-fill {

                        background: #fff;
                        // height:100%;
                        border-radius: 100px;
                        height: 100%;
                        // transition: all 0.3s;
                }

                .range-slider-knob {
                        display: none;
                        box-shadow: none;
                        background: #000;
                        border-radius: 100%;
                        height: auto;
                        border: none;


                }
        }
}


/**/

</style>
