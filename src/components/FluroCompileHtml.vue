<template>
	<component :is="component" />
	<!-- <component :is="component" v-if="component"></component> -->
	<!-- </div> -->
</template>
<script>
import Vue from 'vue';

export default {
	props: {
		template: {
			type: String,
			default() {
				return '';
			},
		},
		context: {
			type: Object,
			default() {
				return {};
			},
		},
		inject: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			component: null,
		};
	},

	watch: {
		template: 'render',
		context: 'render',
		inject: 'render',
	},
	// mounted() {
	//     this.render();
	// },
	created() {
		// console.log('CREATED')
		this.render();
	},
	methods: {
		render() {
			// console.log('RENDER')

			var self = this;

			if (!self.template || !self.template.length) {
				// console.log('NO TEMPLATE');
				self.component = null;
				return;
			}

			// //console.log('COMPILE THE FUNCTION BEFORE', self.javascript.length)
			//     var component = Function('_', script)(_);
			//     component.props = {
			//         scroll: {
			//             type: Object,
			//             default () {
			//                 return self.scroll;
			//             },
			//         },
			//         data: {
			//             type: Object,
			//             default () {
			//                 return {};
			//             }
			//         }
			//     }

			var components;

			// console.log('PARENT', self.$parent)
			if (self.$parent && self.$parent.$options) {
				components = self.$parent.$options.components;
			}

			var dynamicComponents = Object.assign({}, components, self.inject);

			const DynamicComponent = Vue.extend({
				template: `<div>${self.template}</div>`,
				components: dynamicComponents,
				data() {
					return self.context || {};
				},
			});

			self.component = DynamicComponent;
		},
	},
};
</script>
<style scoped lang="scss"></style>
