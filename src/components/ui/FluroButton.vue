<template>
				<component :is="tagType" :disabled="disabled" :loading="loading" :type="type" :to="to" :href="href" :target="target" @click="click" class="btn" :style="style" :class="classes">
								<div class="spinner" v-if="loading">
												<fluro-icon icon="spinner-third" spin />
								</div>
								<div class="btn-interior">
												<slot />
								</div>
				</component>
</template>
<script>
import _ from 'lodash';

export default {
				props: {
								'to': {
												type: [String, Object],
								},
								href: {
												type: String,
								},
								target: {
												type: String,
								},
								loading: {
												type: Boolean,
								},
								disabled: {
												type: Boolean,
								},

								block: {
												type: Boolean,
								},
								size: {
												type: String,
								},
								color: {
												type: String,
								},
								outline: {
												type: Boolean,
								},
								link: {
												type: Boolean,
								},
								type: {
												type: String,
								},
								round: {
												type: Number,
								},
								options: {
												type: Object,
												default () {
																return {}
												}
								},
								type: {
												type: String,
								},
				},
				computed: {
								tagType() {
												switch (this.type) {
																case 'span':
																				return 'span';
																				break;
																case 'submit':
																case 'button':
																				return 'button';
																				break;
												}

												return 'fluro-link';
								},
								radius() {
												return this.round || _.get(this.$fluro, 'app.site.scss.buttons.radius') || 0;
								},
								style() {

												var style = {
																borderRadius: `${this.radius}em`,
												}

												if (this.specificColor) {
																switch (this.actualType) {
																				case 'standard':
																								style.backgroundColor = this.specificColor;
																								break;
																				case 'outline':
																								style.borderColor = this.specificColor;
																								break;
																}

												}

												return style;

								},
								actualSize() {
												return this.size || this.options.size || 'md';
								},
								actualType() {
												var type = this.type || this.options.type || 'standard';

												if (this.link) {
																type = 'link';
												}

												if (this.outline) {
																type = 'outline';
												}

												return type;
								},
								chosenColor() {
												return this.color || this.options.color || 'default';
								},
								specificColor() {
												return this.chosenColor && !this.themeColor ? this.chosenColor : null;
								},
								themeColor() {
												switch (this.chosenColor) {
																case 'primary':
																case 'secondary':
																case 'accent':
																case 'danger':
																case 'error':
																case 'success':
																case 'default':
																				return this.chosenColor;
																				break;
												}

												return;


								},
								classes() {
												var array = [];

												// array.push(`btn-type-${this.actualType}`)
												if (this.actualType == 'outline') {
																array.push('btn-outline');
												} else if (this.actualType == 'link') {
																array.push('btn-link');
												} else {
																array.push('btn-standard');
												}

												if (this.themeColor) {
																array.push(`btn-${this.themeColor}`)
												}

												array.push(`btn-${this.actualSize}`);

												if (this.block) {
																array.push(`btn-block`)
												}

												if (this.loading) {
																array.push('processing');
												}

												if (this.disabled) {
																array.push('disabled');
												}
												return array;
								},
				},
				methods: {
								click(event) {
												this.$emit('click', event);
								}
				},
}

</script>
<style lang="scss" scoped>
.disabled {
				pointer-events: none !important;
}

.processing {
				position: relative;
				pointer-events: none !important;

				.btn-interior {
								opacity: 0;
				}

				.spinner {
								display: flex;
								position: absolute;
								left: 0;
								right: 0;
								bottom: 0;
								top: 0;
								width: 100%;
								height: 100%;
								align-items: center;
								justify-content: center;
								opacity: 1 !important;
				}
}

</style>
