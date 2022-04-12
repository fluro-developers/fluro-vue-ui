<template>
	<!-- <v-checkbox v-model="model" :label="label" @click="$emit('click')"></v-checkbox> -->
	<span class="display-inline" @click="$emit('click')">
		<span class="box" :class="isChecked ? 'ischecked' : 'isunchecked'">
			<span class="tick" :class="isChecked ? 'checked' : 'unchecked'"> </span>
		</span>
		<span class="check-label noselect">{{ label }}</span>
		<!--             <fluro-icon icon="check-square" library="fas" class="checked" v-if="isChecked" /> -->
	</span>
</template>
<script>
/////////////////////////////////

export default {
	props: {
		isChecked: {
			type: Boolean,
		},
		label: {
			type: String,
			default: '',
		},
	},
	components: {},
	data() {
		return {};
	},
	created() {},
	watch: {},
	methods: {},
	computed: {},
};
</script>
<style scoped lang="scss">
.display-inline {
	display: inline-block;
	cursor: pointer;
	transition: all 0.5s;
	position: relative;

	.ischecked {
		background: #4cc650;
	}

	.isunchecked {
		background: white;
	}

	&:hover .box {
		&.ischecked {
			background: white;
			border-color: #44c448;

			.checked {
				background: #4cc650;
				box-shadow: 2px 0 0 #4cc650, 4px 0 0 #4cc650, 4px -2px 0 #4cc650, 4px -4px 0 #4cc650, 4px -6px 0 #4cc650,
					4px -8px 0 #4cc650;
			}
		}

		&.isunchecked {
			background: #f3f3f3;
			border-color: #bfbfbf;
		}
	}
}

.check-label {
	margin-left: 25px;
}

.noselect {
	-webkit-touch-callout: none;
	/* iOS Safari */
	-webkit-user-select: none;
	/* Safari */
	-khtml-user-select: none;
	/* Konqueror HTML */
	-moz-user-select: none;
	/* Old versions of Firefox */
	-ms-user-select: none;
	/* Internet Explorer/Edge */
	user-select: none;
	/* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}

.box {
	border-radius: 3px;
	width: 18px;
	height: 18px;
	line-height: 18px;
	text-align: center;
	padding: 0;
	border: 1px solid #e2e7ee;
	margin-right: 5px;
	font-size: 12px;
	position: absolute;
	transition: all 0.5s;
}

.tick {
	content: '';
	position: absolute;
	left: 3px;
	top: 7px;
	background: white;
	width: 2px;
	height: 2px;
	z-index: 10;
	transition: all 0.5s;
	transform: rotate(45deg);
	box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;

	&.checked {
		transform: rotate(45deg), scale(1);
		opacity: 1;
	}

	&.unchecked {
		transform: rotate(0deg), scale(0);
		opacity: 0;
	}
}
</style>
