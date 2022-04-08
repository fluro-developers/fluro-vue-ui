<template>
	<div class="statbox">
		<div class="value">
			{{ end }}<sup v-if="average">({{ average }} avg)</sup>
		</div>
		<label><fluro-icon icon="circle" library="fas" :style="style" />&nbsp;{{ label }}</label>
		<div class="subtitle">
			<strong :class="className"> <fluro-icon :icon="icon" /> {{ swing }}</strong>
			&nbsp;
			<span class="muted">({{ start }} to {{ end }})</span>
		</div>
		<div class="subtitle">
			<strong :class="classNameAvg"> <fluro-icon :icon="iconAvg" /> {{ swingAverage }}</strong>
			&nbsp;
			<span class="muted">({{ average }} to {{ end }})</span>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		label: {
			type: String,
		},
		color: {
			type: String,
		},
		start: {
			default: 0,
			type: Number,
		},
		end: {
			default: 0,
			type: Number,
		},
		mean: {
			type: Number,
		},
	},
	data() {
		return {};
	},
	computed: {
		average() {
			if (!this.mean) {
				return;
			}

			return `${Math.round(this.mean)}`;
		},
		style() {
			return {
				color: this.color,
			};
		},
		icon() {
			if (this.increased) {
				return 'caret-square-up';
			}

			if (this.decreased) {
				return 'caret-square-down';
			}

			return 'square';
		},
		iconAvg() {
			if (this.increasedAvg) {
				return 'caret-square-up';
			}

			if (this.decreasedAvg) {
				return 'caret-square-down';
			}

			return 'square';
		},
		className() {
			if (this.increased) {
				return 'success--text';
			}

			if (this.decreased) {
				return 'error--text';
			}

			return '';
		},
		classNameAvg() {
			if (this.increasedAvg) {
				return 'success--text';
			}

			if (this.decreasedAvg) {
				return 'error--text';
			}

			return '';
		},
		value() {
			return ((this.end - this.start) / this.start) * 100;
		},
		valueAverage() {
			return ((this.end - this.mean) / this.mean) * 100;
		},
		swing() {
			return parseFloat(this.value).toFixed(2) + '%';
		},
		swingAverage() {
			return parseFloat(this.valueAverage).toFixed(2) + '%';
		},
		increased() {
			return this.end > this.start;
		},
		decreased() {
			return this.end < this.start;
		},
		increasedAvg() {
			return this.end > this.mean;
		},
		decreasedAvg() {
			return this.end < this.mean;
		},
		subtitle() {
			return 'Growth';
		},
	},
};
</script>
<style scoped lang="scss">
.statbox {
	padding: 15px;
	// width: 150px;
}

label {
	font-weight: bold;
	// text-transform: uppercase;
	// letter-spacing: 0.05em;
	margin-bottom: 10px;
	display: block;
}

.value {
	font-size: 3em;
	font-weight: 800;
	line-height: 1em;

	sup {
		font-weight: normal;
		opacity: 0.5;
		font-size: 0.3em;
	}
}

.subtitle {
	font-size: 0.9em;
	// opacity: 0.5;
}
</style>
