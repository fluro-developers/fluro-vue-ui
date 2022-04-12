<template>
	<div class="fluro-video-thumbnail" :style="style"></div>
</template>
<script>
import _ from 'lodash';

export default {
	props: {
		item: [String, Object],
		width: {
			type: Number,
		},
		height: {
			type: Number,
		},
	},
	computed: {
		computedWidth() {
			return _.get(this.item, 'width') || this.width || 1920;
		},
		computedHeight() {
			return _.get(this.item, 'height') || this.height || 1080;
		},
		aspectRatio() {
			return (this.computedHeight / this.computedWidth) * 100;
		},
		style() {
			var self = this;

			var style = {
				backgroundColor: '#eee',
				backgroundImage: self.backgroundImage,
			};

			if (self.aspectRatio) {
				style.height = `0`;
				style.paddingBottom = `${self.aspectRatio}%`;
			}

			return style;
		},
		posterUrl() {
			return this.$fluro.asset.posterUrl(this.item);
		},
		backgroundImage() {
			if (this.posterUrl) {
				return `url(${this.posterUrl})`;
			}
		},
	},
};
</script>
<style lang="scss">
.fluro-video-thumbnail {
	overflow: hidden;
	width: 100%;
	position: relative;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;

	img {
		width: 100%;
		display: block;
	}
}
</style>
