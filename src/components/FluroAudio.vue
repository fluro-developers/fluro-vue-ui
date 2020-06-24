<template>
    <div>
        <div v-if="contentURL">
            <audio ref="audio" :src="contentURL"></audio>
            {{currentTime}}/{{duration}}
            <flex-column center>
                <div class="control-widgets">
                    <div class="control-words">
                        <v-btn fab color="primary" @click="toggle()">
                            <fluro-icon class="play-pause-button" library="fas" :icon="playing ? 'pause' : 'play'" />
                        </v-btn>
                    </div>
                    <div class="volume">
                        <v-layout align-center>
                            <v-flex shrink @click="volumeMute()">
                                <fluro-icon library="fas" icon="volume-mute" />
                            </v-flex>
                            <v-flex>
                                <div class="range-wrap">
                                    <range-slider min="0" max="100" step="1" v-model="volume"></range-slider>
                                </div>
                            </v-flex>
                            <v-flex shrink @click="volumeFull()">
                                <fluro-icon library="fas" icon="volume-up" />
                            </v-flex>
                        </v-layout>
                    </div>
                </div>
            </flex-column>
        </div>
        <div v-else>
            <h3>No Content ID</h3>
        </div>
    </div>
</template>
<script>
import RangeSlider from 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';

export default {
    props: {
        value: [String, Object],
    },
    components: {
        RangeSlider
    },
    data() {
        return {
            playing: false,
        }
    },
    computed: {
        volume: {
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

                this.actualVolume = v;
                if (this.$refs.audio) {
                    this.$refs.audio.volume = v / 100;
                }
            }
        },
        contentID() {
            return this.$fluro.utils.getStringID(this.value);
        },
        contentURL() {
            return this.$fluro.asset.getUrl(this.contentID);
        },
        audio() {
            return this.$refs.audio;
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
        volumeChanged() {
            var volume = this.$refs.audio.volume;
            this.volume = volume * 100;
        },
        volumeMute() {
            this.volume = 0;
        },
        volumeFull() {
            this.volume = 100;
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
            if (self.playing) {
                return;
            }
            self.playing = true;
            self.$refs.audio.play();
            this.$emit('play');
        },
        pause() {
            var self = this;
            if (!self.playing) {
                return;
            }

            self.playing = false;
            self.$refs.audio.pause();
            this.$emit('pause');
        },
        toggleMuted() {
            this.muted = !this.muted;
        },
    }
}

</script>
<style lang="scss">
.play-pause-button {
    width:100% !important;
    height:100%;
    padding:30%;
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

</style>
