<template>
	<div class="fluro-signature-field">
		<v-input
			class="no-flex"
			:label="label"
			:persistent-hint="true"
			:required="required"
			:error-messages="errorMessages"
			:hint="hint"
		>
			<div class="signature-pad-wrap">
				<canvas id="signature-pad" class="signature-pad" ref="canvas"></canvas>
				<!-- <vue-signature-pad class="pad" ref="pad" :options="options" :width="width" :height="height" /> -->
				<v-btn class="clear" @click="clear()">
					Clear
					<fluro-icon right icon="times" />
				</v-btn>
			</div>
		</v-input>
	</div>
</template>
<script>
/////////////////////////////////////////////////////

//Dependencies (hopefully not too many)
import SignaturePad from 'signature_pad';

export default {
	// components:{
	// VueSignature,
	// },
	props: {
		errorMessages: {
			type: Array,
		},
		hint: {
			type: String,
		},
		required: {
			type: [Boolean, Number],
		},
		label: {
			type: String,
		},
		value: {
			type: String,
		},
		width: {
			default: '100%',
			type: [String, Number],
		},
		height: {
			default: '300px',
			type: [String, Number],
		},
		readonly: {
			type: Boolean,
		},
	},

	mounted() {
		var self = this;
		var canvas = this.$refs.canvas;
		self.pad = new SignaturePad(canvas, {
			dotSize: (0.5 + 2.5) / 2,
			minWidth: 0.5,
			maxWidth: 2.5,
			throttle: 16,
			minDistance: 5,
			backgroundColor: 'rgba(0,0,0,0)',
			penColor: 'black',
			velocityFilterWeight: 0.7,
		});

		self.pad.onBegin = function () {
			console.log('Begin!');
		};
		self.pad.onEnd = function () {
			console.log('End!');
			self.model = self.pad.toDataURL();
			self.save();
		};
		// console.log('Mounted', canvas, self.pad);
		window.addEventListener('resize', self.resizeCanvas);

		self.resizeCanvas();
	},

	data() {
		return {
			model: this.value,
			pad: null,
			// signatureData: TRANSPARENT_PNG,
			// options:{
			//     onEnd:this.save,
			// }
		};
	},
	methods: {
		resizeCanvas() {
			if (process.browser) {
				var ratio = Math.max(window.devicePixelRatio || 1, 1);
				var canvas = this.$refs.canvas;
				canvas.width = canvas.offsetWidth * ratio;
				canvas.height = canvas.offsetHeight * ratio;
				canvas.getContext('2d').scale(ratio, ratio);
				this.pad.clear(); // otherwise isEmpty() might return incorrect value
			}
		},

		// resizeCanvas() {
		//     const canvas = this.$refs.canvas;
		//     const data = this.pad.toData();

		//     const ratio = Math.max(window.devicePixelRatio || 1, 1);
		//     canvas.width = canvas.offsetWidth * ratio;
		//     canvas.height = canvas.offsetHeight * ratio;
		//     canvas.getContext('2d').scale(ratio, ratio);
		//     this.pad.clear();

		//     // this.signatureData = TRANSPARENT_PNG;
		//     this.pad.fromData(data);
		// },
		clear() {
			this.pad.clear();
			this.model = '';
			this.save();
		},
		save() {
			// var pad = this.$refs.pad;
			// const { isEmpty, data } = pad.saveSignature();
			// // console.log(isEmpty);
			// // console.log(data);

			// if(isEmpty) {
			//     this.model ='';
			// } else {
			//     this.model = data;
			// }

			this.$emit('input', this.model);
		},
	},
	beforeDestroy() {
		if (process.browser) {
			window.removeEventListener('resize', this.resizeCanvas);
		}

		//Destroy the Pad?
	},
};
</script>
<style lang="scss">
.fluro-signature-field {
	.v-input__slot {
		display: block !important;
	}
}
</style>
<style scoped lang="scss">
.signature-pad-wrap {
	flex: 1;
	position: relative;
	height: 0;
	padding-bottom: 50%;
	border: 2px solid;

	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;

	canvas {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		cursor: pointer;
	}

	.clear {
		position: absolute;
		bottom: 0;
		right: 0;
	}
}

.pad {
	border: 1px solid rgba(#000, 0.1);
	border-radius: 3px;
	box-shadow: 0 3px 3px rgba(#000, 0.2);
	background: #fff;
	margin: 5px 0 10px;
	min-height: 300px;
	width: 100%;
}
</style>
