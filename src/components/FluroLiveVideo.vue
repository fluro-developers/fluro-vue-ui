<template>
	<div class="fluro-live-stream">Live stream</div>
</template>
<script>
import FluroVideo from './FluroVideo.vue';

export default {
	props: {
		value: {
			type: Object,
			/**
        	default() {
        		return {
        			startDate:4326236,
        			endDate:43623462346,
        			allowFullscreen:true,
        			
        			//Can pass through a url to stream
        			url:'rtmp.fluro.io/34262346/index.m3u8',
        			
        			//Or can pass through an id of a video
        			video:{
						_id:'FLUROID',
						external:{
							youtube:'32462346234'
						}
        			},
        		}
        	}
        	/**/
		},
	},
};
</script>
<style lang="scss">
.fluro-live-stream {
	// overflow: hidden;
	// width: 100%;
	// position: relative;
	// background-size: cover;
	// background-repeat: no-repeat;
	// background-position: center center;

	// .fluro-video-embed {
	//     position: absolute;
	//     width: 100%;
	//     height: 100%;

	//     video,
	//     iframe {
	//         width: 100% !important;
	//         height: 100% !important;
	//         left: 0 !important;
	//         top: 0 !important;
	//         right: 0 !important;
	//         bottom: 0 !important;
	//         position: absolute !important;
	//         display: block !important;
	//     }
	// }

	// img {
	//     width: 100%;
	//     display: block;
	// }
}
</style>
