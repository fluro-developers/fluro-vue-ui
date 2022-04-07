<template>
	<div class="slot-placeholder" :class="className">
		{{ message }}
	</div>
</template>
<script>
export default {
	props: {
		value: {
			type: Object,
		},
	},
	data() {
		return {
			model: this.value,
		};
	},
	computed: {
		className() {
			if (!this.model) {
				return;
			}

			if (this.model.minimum) {
				return 'needed';
			}
		},
		message() {
			var self = this;

			if (!self.model) {
				return;
			}

			if (self.model.assignments.length) {
				if (self.model.minimum) {
					return `${this.model.minimum} needed for '${this.model.title}'`;
				}
			} else {
			}

			// return this.model.title;
		},
	},
};
</script>
<style lang="scss">
.slot-placeholder {
	font-style: italic;
	font-size: 13px;
	line-height: 28px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	// font-size: 13px;
	// font-weight: 500;
	// padding: 0 10px;
	height: 28px;
	// line-height: 28px;
	// white-space: nowrap;
	// overflow: hidden;
	// text-overflow: ellipsis;
	// background: #fff;

	// .status-icon {
	//  font-size: 0.8em;
	// }

	// &.denied {
	//     color: darken($danger, 10%);
	//     border-color: rgba(darken($danger, 10%), 0.3);
	//     background: lighten($danger, 41%);
	// }

	// &.confirmed {
	//     color: darken($success, 10%);
	//     border-color: rgba(darken($success, 10%), 0.3);
	//     background: lighten($success, 40%);
	// }

	&.needed {
		//background: #fdf6df; //desaturate(rgba($warning, 0.05), 15%);
		color: #c59626;
		// border-color: rgba(desaturate(darken($warning, 10%), 15%), 0.3);
		font-style: italic;
	}

	// &.proposed {
	//     background: desaturate(lighten($primary, 45%), 5%);
	//     color: desaturate(darken($primary, 10%), 15%);
	//     border-color: rgba(desaturate(darken($primary, 10%), 15%), 0.3);
	// }

	// &.unknown {
	//  color: rgba(#000, 0.5);
	//  background: #fff;
	// }
}
</style>
