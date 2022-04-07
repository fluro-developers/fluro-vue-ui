<template>
	<!-- <div> -->
	<!-- <pre>{{mediaID}}</pre> -->
	<div class="fluro-video" v-if="ready" :class="classes" :style="style">
		<div class="fluro-video-embed" v-if="provider == 'youtube'">
			<youtube-embed :video-id="mediaID" />
		</div>
		<div class="fluro-video-embed" v-if="provider == 'upload'">
			<video
				class="embed-responsive-item"
				:preload="preloadStyle"
				:poster="posterUrl"
				:autoplay="autoplay"
				:muted="muted"
				:playsinline="playsinline"
				:controls="controls"
			>
				<source :src="assetUrl" />
				<!-- :type="item.mimetype" -->
			</video>
		</div>
		<div class="fluro-video-embed" v-if="provider == 'embed'" v-html="item.external.embed"></div>
		<div class="fluro-video-embed" v-if="provider == 'vimeo'">
			<iframe
				:src="vimeoURL"
				width="640"
				height="360"
				frameborder="0"
				allow="autoplay; fullscreen"
				allowfullscreen
			></iframe>
			<!-- <vimeo-player ref="player" :video-id="vimeoID.id" :hash="vimeoID.hash" @ready="onReady" :player-height="height"></vimeo-player>  -->
			<!-- <vimeo-player video-id="220721944"></vimeo-player> -->
		</div>
		<!-- <pre>{{item}}</pre> -->
		<slot></slot>
	</div>
	<!-- <pre>{{mediaID}}</pre> -->
	<!-- <pre>{{item}}</pre> -->
	<!-- </div> -->
</template>
<script>
// import { vueVimeoPlayer } from 'vue-vimeo-player'
// import { Youtube } from 'vue-youtube'
import Vue from 'vue';
import _ from 'lodash';
// import { Youtube } from 'vue-youtube';// Vue.use(Youtube);
import { Youtube } from 'vue-youtube'; // Vue.use(Youtube);

import DynamicImportService from '../DynamicImportService.js';

export default {
	components: {
		// vimeoPlayer: vueVimeoPlayer,
		youtubeEmbed: Youtube,
	},
	data() {
		return {
			ready: true,
		};
	},
	props: {
		controls: {
			type: [Boolean, String],
			default: true,
		},
		autoplay: {
			type: [Boolean, String],
		},
		muted: {
			type: [Boolean, String],
			default: false,
		},
		loop: {
			type: [Boolean, String],
			default: false,
		},
		playsinline: {
			type: [Boolean, String],
			default: false,
		},
		item: Object,
		width: {
			type: Number,
		},
		height: {
			type: Number,
		},
		posterWidth: {
			type: Number,
		},
		posterHeight: {
			type: Number,
		},

		cacheKey: [String, Number],
		options: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	// beforeCreate() {
	// this.$options.components.FluroContentForm = require('./FluroContentForm.vue').default;

	//this.ready = true;
	// },
	mounted() {
		var self = this;

		if (self.provider == 'vimeo') {
			self.ready = false;

			DynamicImportService.load(
				'vue-vimeo-player',
				function () {
					return import('vue-vimeo-player');
				},
				true
			).then(function (imported) {
				self.$options.components.vimeoPlayer = imported.vueVimeoPlayer;
				console.log('Loaded vimeo player');
				self.ready = true;
			});
		}
	},
	// data() {
	//     return {
	//         style:{}
	//     }
	// },
	computed: {
		preloadStyle() {
			var self = this;

			if (self.options.preload) {
				return self.options.preload;
			}

			if (self.$fluro.app && self.$fluro.app.native) {
				return 'none';
			}

			return;
		},
		provider() {
			if (this.item) {
				return this.item.assetType;
			}
		},
		mediaID() {
			if (this.item) {
				switch (this.provider) {
					case 'upload':
						break;
					default:
						return this.$fluro.video.getAssetMediaIDFromURL(
							_.get(this, `item.external.${this.provider}`),
							this.provider
						);
						break;
				}

				// if (this.item.assetMediaID) {
				//     return this.item.assetMediaID;
				// }

				// if (this.item.external) {
				//     if (this.item.external.youtube) {
				//         return this.item.external.youtube
				//     }

				//     if (this.item.external.vimeo) {
				//         return this.item.external.vimeo
				//     }
				// }
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
			return this.width || _.get(this.item, 'width') || 1920;
		},
		computedHeight() {
			return this.height || _.get(this.item, 'height') || 1080;
		},
		aspectRatio() {
			return (this.computedHeight / this.computedWidth) * 100;
		},
		style() {
			var self = this;

			var style = {
				color: '#fff',
				backgroundColor: '#eee',
				backgroundImage: self.backgroundImage,
			};

			if (self.aspectRatio) {
				style.height = `0`;
				style.paddingBottom = `${self.aspectRatio}%`;
			}

			return style;
		},
		videoID() {
			return this.$fluro.utils.getStringID(this.item);
		},
		vimeoURL() {
			var self = this;
			if (!self.mediaID) {
				return;
			}
			var parts = self.item.external.vimeo.split('/');

			var url = `https://player.vimeo.com/video/${self.mediaID}?&title=0&byline=0&portrait=0&badge=0`;
			var hash = _.last(parts);
			if (hash != self.mediaID) {
				url = url + `&h=${hash}`;
			}
			return url;
		},
		posterUrl() {
			var self = this;
			var params = { extension: 'jpg' };
			if (self.cacheKey && String(self.cacheKey.length)) {
				params.cacheKey = self.cacheKey;
			}
			return self.$fluro.asset.posterUrl(
				self.item,
				self.posterWidth || self.computedWidth,
				self.posterHeight || self.computedHeight,
				params
			);
		},
		assetUrl() {
			var self = this;
			var params = {};

			if (self.cacheKey && String(self.cacheKey.length)) {
				params.cacheKey = self.cacheKey;
			}

			return self.$fluro.asset.getUrl(self.item, params);
		},

		backgroundImage() {
			if (this.posterUrl) {
				return `url(${this.posterUrl})`;
			} else {
				return;
			}
		},
	},
};
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
