<template>
				<div class="fluro-image" :class="{loaded:loaded, cover:cover, contain:contain}" :style="style">
								<img v-if="longpress" class="holder" :src="url" />
								<div :style="spacer"></div>
								<!-- <transition name="fade"> -->
								<!-- <pre>{{placeholder}} - {{spinner}}</pre> -->
								<div class="placeholder" v-if="!loaded && placeholder" :style="{backgroundImage:placeholderImage}"></div>
								<!-- </transition> -->
								<v-progress-circular v-if="!loaded && spinner" indeterminate color="rgba(180,180,180,0.5)"></v-progress-circular>
								<slot></slot>
				</div>
				<!-- <pre>{{url}}</pre> -->
</template>
<script>
import _ from 'lodash';


export default {
				props: {
								longpress: {
												type: Boolean,
								},
								contain: {
												type: Boolean,
								},
								cover: {
												type: Boolean,
								},
								spinner: {
												type: Boolean,
												default: true,
								},
								placeholder: {
												type: Boolean,
												default: true,
								},
								item: [String, Object],
								width: {
												type: Number,
								},
								height: {
												type: Number,
								},
								imageWidth: {
												type: Number,
								},
								imageHeight: {
												type: Number,
								},
								from: {
												type: [String, Object],
								},
								cacheKey: [String, Number],

				},
				data() {
								return {
												timer: null,
												loadedImageWidth: 0,
												loadedImageHeight: 0,
												loaded: false,
								}
				},
				watch: {
								'url': 'load',
				},
				mounted() {

								var self = this;
								// self.timer = setTimeout(function() {
								self.load();
								// }, 100)

				},
				// beforeDestroy() {
				// clearTimeout(this.timer);
				// },
				methods: {
								load() {

												//console.log('Start Loading')
												var self = this;
												self.loaded = false;

												if (!self.url) {
																return;
												}

												var url = self.url;

												// console.log('LOAD THE URL', self.url);

												//Create a new image
												var img = new Image;

												//Once the image has loaded
												img.onload = function($event) {

																// console.log('IMAGE LOAD', url, $event);
																self.loaded = true;
																self.$emit('load', $event);
																self.loadedImageWidth = img.width;
																self.loadedImageHeight = img.height;
												}

												//Once the image has loaded
												img.onerror = function($event) {
																// console.log('IMAGE ERROR', url, $event);
																self.$emit('error', $event);
												}

												// img.src = '';
												img.src = url;
								}
				},
				computed: {
								style() {
												var styles = {
																backgroundImage: this.backgroundImage,
												}

												if (this.width) {
																styles.width = `${this.width}px`;
												} else {
																styles.width = '100%';
												}

												if (this.height) {
																styles.height = `${this.height}px`;
												} else {
																styles.height = 'auto';
												}



												return styles;
								},
								computedWidth() {
												return this.imageWidth || this.loadedImageWidth || this.width || _.get(this.item, 'width') || 1;
								},
								computedHeight() {
												return this.imageHeight || this.loadedImageHeight || this.height || _.get(this.item, 'height') || 1;
								},
								aspectRatio() {
												return (this.computedHeight / this.computedWidth * 100);
								},
								spacer() {
												var self = this;

												var style = {}

												if (self.aspectRatio) {
																style.height = `0`;
																style.paddingBottom = `${self.aspectRatio}%`;
												}

												return style;
								},
								imageID() {
												return this.$fluro.utils.getStringID(this.item);
								},
								url() {

												var self = this;

												if (self.imageID) {
																//Allow the Fluro API to decide the best dimensions based on screensize
																var requestWidth = self.imageWidth || (self.width ? self.width * 2 : null);
																var requestHeight = self.imageHeight || (self.height ? self.height * 2 : null);


																var params = { includePublic: true };

																if (self.cacheKey && String(self.cacheKey.length)) {
																				params.cacheKey = self.cacheKey;
																}

																if (self.from) {
																				params.from = self.$fluro.utils.getStringID(self.from);
																}

																var outputURL = self.$fluro.asset.imageUrl(self.imageID, requestWidth, requestHeight, params);

																// console.log('OUTPUT URL', outputURL);
																return outputURL;
												} else {
																return;
												}
								},
								placeholderImage() {

												var self = this;

												if (self.imageID) {

																var params = { includePublic: true };

																if (self.cacheKey && String(self.cacheKey.length)) {
																				params.cacheKey = self.cacheKey;
																}

																if (self.from) {
																				params.from = self.$fluro.utils.getStringID(self.from);
																}


																var placeholderUrl = self.$fluro.asset.imageUrl(self.imageID, 50, null, params);
																return `url(${placeholderUrl})`;
												} else {
																return;
												}
								},
								backgroundImage() {

												if (!this.url) {
																return;
												}

												return `url(${this.url})`;

								}
				}
}

</script>
<style lang="scss">
.fluro-image {
				overflow: hidden;
				max-width: 100%;
				position: relative;
				// background-color: #eee;
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position: center center;
				color: #fff;
				flex: 1 0 auto;


				.fade-enter-active,
				.fade-leave-active {
								transition: opacity .8s;
				}

				.fade-enter,
				.fade-leave-to {
								opacity: 0;
				}

				.holder {
								// background: #ff0066;
								// border:2px solid green;
								display: block;
								position: absolute;
								left: 0;
								top: 0;
								right: 0;
								bottom: 0;
								opacity: 0;
				}

				.v-progress-circular {
								position: absolute;
								left: 50%;
								top: 50%;
								transform: translate3d(-50%, -50%, 0);
				}

				.spacer {
								position: relative;
				}

				.placeholder {
								position: absolute;
								left: 0;
								right: 0;
								top: 0;
								bottom: 0;
								// transition: opacity 0.2s;
								background-size: 100% auto;
								background-repeat: no-repeat;
								background-position: center center;
								// filter:blur(5px);
				}

				&[contain],
				&.contain {

								&,
								.placeholder {
												background-size: contain;
								}
				}

				&[cover],
				&.cover {

								&,
								.placeholder {
												background-size: cover;
								}
				}

				// &.loaded {
				//     .placeholder {
				//         opacity: 0;
				//     }
				// }

				img {
								width: 100%;
								display: block;
				}
}

</style>
