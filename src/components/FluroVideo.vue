<template>
    <div>
        <div class="fluro-video" :class="classes" :style="style">
            <div class="fluro-video-embed" v-if="provider == 'youtube'">
                <youtube-embed :video-id="mediaID"></youtube-embed>
            </div>
            <div class="fluro-video-embed" v-if="provider == 'upload'">
                <video class="embed-responsive-item" :poster="posterUrl" controls>
                    <source :src="assetUrl" :type="item.mimetype">
                </video>
            </div>
            <div class="fluro-video-embed" v-if="provider == 'embed'" v-html="item.external.embed">
            </div>
            <div class="fluro-video-embed" v-if="provider == 'vimeo'">
                <vimeo-player :video-id='mediaID'></vimeo-player>
            </div>
            <!-- <pre>{{item}}</pre> -->
            <slot></slot>
        </div>
        <!-- <pre>{{mediaID}}</pre> -->
        <!-- <pre>{{item}}</pre> -->
    </div>
</template>
<script>
import { vueVimeoPlayer } from 'vue-vimeo-player'
import { Youtube } from 'vue-youtube'

export default {
    components: {
        vimeoPlayer: vueVimeoPlayer,
        youtubeEmbed: Youtube,
    },
    props: {
        item: Object,
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
    },
    // data() {
    //     return {
    //         style:{}
    //     }
    // },
    computed: {
        provider() {
            if (this.item) {
                return this.item.assetType;
            }
        },
        mediaID() {
            if (this.item) {

                if (this.item.assetMediaID) {
                    return this.item.assetMediaID;
                }

                if (this.item.external) {
                    if (this.item.external.youtube) {
                        return this.item.external.youtube
                    }

                    if (this.item.external.vimeo) {
                        return this.item.external.vimeo
                    }
                }
            }
        },
        classes() {

            var output = {};

            if (this.item) {
                switch (this.item.assetType) {
                    case 'youtube':
                    case 'vimeo':
                    case 's3':
                    case 'embed':
                    case 'upload':
                        var key = `fluro-video-${this.item.assetType}`;
                        output[key] = true;
                        break;
                }
            }
            return output;
        },
        computedWidth() {
            return _.get(this.item, 'width') || this.width || 1920;
        },
        computedHeight() {
            return _.get(this.item, 'height') || this.height || 1080;
        },
        aspectRatio() {
            return (this.computedHeight / this.computedWidth * 100);
        },
        style() {
            var self = this;

            var style = {
                color: '#fff',
                backgroundColor: '#eee',
                backgroundImage: self.backgroundImage,
            }

            if (self.aspectRatio) {
                style.height = `0`;
                style.paddingBottom = `${self.aspectRatio}%`;
            }

            return style;
        },
        videoID() {
            return this.$fluro.utils.getStringID(this.item);
        },
        posterUrl() {
            return this.$fluro.asset.posterUrl(this.item, null, null, { extension: 'jpg' });
        },
        assetUrl() {
            return this.$fluro.asset.getUrl(this.item);
        },

        backgroundImage() {
            if (this.posterUrl) {
                return `url(${this.posterUrl})`;
            } else {
                return;
            }
        }
    }
}
</script>
<style lang="scss">
.fluro-video {
    overflow: hidden;
    width: 100%;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    .fluro-video-embed {
        position: absolute;
        width: 100%;
        height: 100%;

        video,
        iframe {
            width: 100% !important;
            height: 100% !important;
            left: 0 !important;
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            position: absolute !important;
            display: block !important;
        }
    }


    img {
        width: 100%;
        display: block;
    }
}
</style>