<template>
	<div class="video-wrapper" :class="classes">
		<!-- <div class="muted" v-if="muted">
						:muted="muted"
						<fluro-icon icon="volume-mute"/>
					</div> -->
		<!-- <pre>{{connected}}</pre> -->
		<!--  -->
		<video ref="video" @volumechange="volumeChanged" @click="toggle()" playsinline></video>
		<flex-column class="controls" @click="toggle()" v-if="connected">
			<flex-column center>
				<div class="control-widgets">
					<div class="control-words">
						<a @click="toggle()">{{ playing ? 'Pause' : 'Play' }}</a>
						<a @click="toggleFullscreen()">Fullscreen</a>
						<a @click="share()" v-if="shareEnabled">Share</a>
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
								<!--  <div class="wrap" style="--min: 0;
                         --max: 100;
                         --val: 50">
                                <input id="r" class="volume" type="range" min="0" max="100" step="1" v-model="volume"></input>
                                <output for="r">50</output>
                            </div> -->
							</v-flex>
							<v-flex shrink @click="volumeFull()">
								<fluro-icon library="fas" icon="volume-up" />
							</v-flex>
						</v-layout>
					</div>
				</div>
			</flex-column>
			<!-- <flex-column-footer>
                    
                </flex-column-footer> -->
		</flex-column>
		<flex-column center class="waiting-content" v-else>
			<slot name="waiting">
				<div class="waiting-placeholder">
					<!-- <v-progress-circular color="white" indeterminate></v-progress-circular> -->
					<p>Waiting for stream to begin</p>
				</div>
			</slot>
		</flex-column>
	</div>
</template>
<script>
import RangeSlider from 'vue-range-slider';
// import 'vue-range-slider/dist/vue-range-slider.css';

export default {
	props: {
		url: {
			type: String,
		},
	},
	components: {
		RangeSlider,
	},
	data() {
		return {
			muted: false,
			actualVolume: 100,
			hls: null,
			video: null,
			connected: false,
			mounted: false,
			initialized: false,
			fullscreen: false,
			playing: false,
			timer: null,
		};
	},
	computed: {
		volume: {
			get() {
				return this.actualVolume;
			},
			set(v) {
				v = parseInt(v, 10);
				v = Math.max(v, 0);
				v = Math.min(v, 100);
				if (isNaN(v)) {
					v = 0;
				}

				this.actualVolume = v;
				if (this.video) {
					this.video.volume = v / 100;
				}
			},
		},
		classes() {
			var array = [];

			if (this.connected) {
				array.push('connected');
			} else {
				array.push('disconnected');
			}

			if (this.playing) {
				array.push('playing');
			} else {
				array.push('paused');
			}

			if (this.fullscreen) {
				array.push('fullscreen');
			}

			if (this.timer) {
				array.push('waiting');
			}

			return array;
		},
		requiredPieces() {
			return `${this.connected}${this.url}`;
		},
		shareEnabled() {
			if (!this.mounted) {
				return;
			}

			if (process.browser) {
				return window.navigator.share;
			}
		},
	},
	activate() {
		this.mounted = true;
	},
	deactivate() {
		this.mounted = false;
	},
	beforeDestroy() {
		this.mounted = false;
	},
	watch: {
		url(url) {
			//console.log('STREAM PLAYER: URL', url);
			if (this.initialized) {
				console.log('Set source', url);
				this.setSource(url);
			}
		},
		connected(v) {
			if (v) {
				this.$emit('connected', true);
			} else {
				this.playing = false;
				this.$emit('disconnected');
			}
		},
		requiredPieces() {
			if (!this.url) {
				return this.stopConnectionTimer();
			}

			if (this.connected) {
				return this.stopConnectionTimer();
			}

			//run a check to see if we are connected yet
			this.startConnectionTimer();
		},
	},
	mounted() {
		var self = this;

		if (self.mounted) {
			return;
		}

		var video = self.$refs.video;
		self.video = video;

		self.mounted = true;

		// //console.log('STREAM PLAYER: MOUNTED');
		self.$fluro.utils
			.injectScript('https://cdn.jsdelivr.net/npm/hls.js@latest')
			.then(function (res) {
				console.log('Script injected successfully!', res);

				self.initialize();
			})
			.catch(function (err) {
				self.mounted = false;
				//console.log('STREAM PLAYER: ERROR', err);
			});
	},
	methods: {
		volumeChanged() {
			var volume = this.video.volume;
			this.volume = volume * 100;
		},
		volumeMute() {
			this.volume = 0;
		},
		volumeFull() {
			this.volume = 100;
		},
		stopConnectionTimer() {
			if (!this.timer) {
				return;
			}

			clearInterval(this.timer);
			this.timer = null;
			this.$emit('timerstop');
		},
		startConnectionTimer() {
			if (this.timer) {
				return;
			}

			this.timer = setInterval(this.timerTick, 2000);
			this.$emit('timerstart');
		},
		timerTick() {
			this.setSource(this.url);
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
			self.video.play();
			this.$emit('play');
		},
		pause() {
			var self = this;
			if (!self.playing) {
				return;
			}

			self.playing = false;
			self.video.pause();
			this.$emit('pause');
		},
		toggleMuted() {
			this.muted = !this.muted;
		},
		openFullscreen() {
			var self = this;
			if (self.fullscreen) {
				return;
			}
			self.fullscreen = true;
			self.video.webkitEnterFullscreen();
		},
		closeFullscreen() {
			var self = this;
			if (!self.fullscreen) {
				return;
			}
			self.fullscreen = false;
			self.video.webkitExitFullscreen();
		},
		toggleFullscreen() {
			if (this.fullscreen) {
				this.closeFullscreen();
			} else {
				this.openFullscreen();
			}
		},
		setSource(src, onlyLoad) {
			// console.log('SET SRC', src);
			var self = this;

			var video = self.video;
			if (!video) {
				// console.log('SET SRC:NOVIDEO')
				return;
			}

			if (self.hls) {
				// console.log('DESTROY HLS')
				self.hls.destroy();
			}

			///////////////////////////////////////////

			function start() {
				if (onlyLoad) {
					return;
				}
				// console.log('Start!');
				self.play();
			}

			//////////////////////////////////////////

			if (Hls.isSupported()) {
				// console.log('HLS SUPPORTED')
				var hls = (self.hls = new Hls());

				//////////////////////////////////////////

				//Listen for when we have the manifest
				hls.on(Hls.Events.MANIFEST_PARSED, start);

				//////////////////////////////////////////

				hls.on(Hls.Events.STREAM_STATE_TRANSITION, function (event, state) {
					switch (state.nextState) {
						case 'IDLE':
						case 'FRAG_LOADING':
						case 'STOPPED':
							// console.log('state', state.nextState);
							break;

						case 'PARSING':
						case 'PARSED':
							self.connected = true;
							// console.log('Connected:', state.nextState);

							break;
						case 'ERROR':
							self.connected = false;
							break;
						default:
						// pass
					}
				});

				///////////////////////////////////////////////

				hls.on(Hls.Events.ERROR, function (event, data) {
					var errorType = data.type;
					var errorDetails = data.details;
					var errorFatal = data.fatal;

					// switch (data.details) {
					//     case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
					//         self.connected = false;
					//         break;
					//     default:

					//         self.connected = false;
					//         break;
					// }

					// if (errorFatal) {
					self.connected = false;
					self.playing = false;
					// }

					// console.log('connected errorrrrrr -', self.connected)
				});
			} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
				video.addEventListener('loadedmetadata', start);
				self.connected = true;
			}

			///////////////////////////////////////////////

			if (self.hls) {
				if (src && src.length) {
					hks.loadSource(src);
					self.hls.attachMedia(video);
					// console.log('ATTACH MEDIA')
				}
			} else {
				video.src = src;
				// console.log('ATTACH SET VIDEO SRC')
			}

			this.$emit('source', src);
		},
		fullscreenChange() {
			if (typeof document == 'undefined') {
				return console.log('fullscreen can not be activated because the document is not defined yet!');
			}

			var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
			if (!state) {
				// console.log('close')
				this.closeFullscreen();
			}

			this.$emit('fullscreen', state);
		},
		initialize() {
			var self = this;
			if (self.initialized) {
				//console.log('STREAM PLAYER: ALREADY INITIALIZED');
				return;
			}

			self.initialized = true;

			//console.log('STREAM PLAYER: INITIALIZED');
			///////////////////////////////////////////

			var video = self.video;

			///////////////////////////////////////////

			video.addEventListener('loadedmetadata', function () {
				//console.log('STREAM PLAYER: META');
			});

			video.addEventListener('ended', function (e) {
				//console.log('STREAM PLAYER: END');
				// // self.playing = false;
				// self.pause();
				// self.closeFullscreen();
			});

			video.addEventListener('error', function (err) {
				//console.log('STREAM PLAYER: ERROR');
			});

			// video.addEventListener("webkitendfullscreen", function() {
			// 	//console.log('STREAM PLAYER: META');
			//     // self.closeFullscreen();
			// });

			///////////////////////////////////////////

			video.addEventListener('webkitendfullscreen', self.fullscreenChange);
			video.addEventListener('webkitfullscreenchange', self.fullscreenChange);
			video.addEventListener('mozfullscreenchange', self.fullscreenChange);
			video.addEventListener('fullscreenchange', self.fullscreenChange);

			if (self.url) {
				//self.muted = true;
				self.setSource(self.url, true);
			}
			///////////////////////////////////////////

			self.$emit('init');
		},
	},
};
</script>
<style scoped lang="scss">
.range-slider {
	display: inline-block;
	padding: 0 10px;
	height: 20px;
	width: 130px;
}

.range-slider.disabled {
	opacity: 0.5;
}

.range-slider-inner {
	display: inline-block;
	position: relative;
	height: 100%;
	width: 100%;
}

.range-slider-rail,
.range-slider-fill {
	display: block;
	position: absolute;
	top: 50%;
	left: 0;
	height: 4px;
	border-radius: 2px;
	-webkit-transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);
}

.range-slider-rail {
	width: 100%;
	background-color: #e2e2e2;
}

.range-slider-fill {
	background-color: #21fb92;
}

.range-slider-knob {
	display: block;
	position: absolute;
	top: 50%;
	left: 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	height: 20px;
	width: 20px;
	border: 1px solid #f5f5f5;
	border-radius: 50%;
	background-color: #fff;
	-webkit-box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
	box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	cursor: pointer;
}

.range-slider-hidden {
	display: none;
}

.video-wrapper {
	width: 100%;
	position: relative;
	background: #000;
	height: 0;
	padding-bottom: 56.25%;
	overflow: hidden;

	-webkit-touch-callout: none;
	/* iOS Safari */
	-webkit-user-select: none;
	/* Safari */
	-khtml-user-select: none;
	/* Konqueror HTML */
	-moz-user-select: none;
	/* Firefox */
	-ms-user-select: none;
	/* Internet Explorer/Edge */
	user-select: none;
	/* Non-prefixed version, currently supported by Chrome and Opera */

	video {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.controls {
		background: rgba(#000, 0.7);
		backdrop-filter: blur(2px);
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		position: absolute;
		z-index: 20;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.control-widgets {
		width: 100%;
		transform: scale(0.95);
		opacity: 0;
		transition: all 0.4s;
	}

	.waiting-content {
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 21;
		position: absolute;
		color: #fff;
		text-align: center;

		.waiting-placeholder {
			width: 100%;

			p {
				margin: 15px 0;
				font-weight: bold;
			}
		}
	}

	&.paused,
	&:hover {
		.controls {
			opacity: 1;
		}

		.control-widgets {
			transform: scale(1);
			opacity: 1;
		}
	}

	.volume {
		display: block;

		cursor: pointer;
		width: 50%;
		pointer-events: all;
		color: #fff;
		margin: 25px auto;

		.range-wrap {
			margin: 0 5%;
			width: 90%;

			// border: 2px solid #fff;
			background: rgba(#fff, 0.2);
			border-radius: 200px;
			height: 10px;
			overflow: hidden;
			box-sizing: content-box;
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
				background: rgba(#fff, 0.3);
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
				background: #fff;
				border-radius: 100%;
				height: auto;
				border: none;
			}
		}
	}

	.control-words {
		width: 100%;
		text-align: center;
		pointer-events: all;

		a {
			padding: 10px;
			margin: 0 20px;
			display: inline-block;
			opacity: 0.8;
			color: #fff;
			font-size: 30px;
			font-weight: bold;

			&:hover {
				opacity: 1;
			}
		}
	}
}
</style>
