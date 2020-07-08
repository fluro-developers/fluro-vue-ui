<template>
				<div class="accordion">
								<!-- <pre>{{reactive.activePanelIndex}} -- {{reactive.panels.length}}</pre> -->
								<slot></slot>

								
				</div>
</template>
<script>

export default {
				props: {
								options: {
												type: Object
								},
								activePanel: {
												type: Number,
								}
				},
				provide() {
								return {reactive:this.reactive};
				},
				data() {

								var self = this;

								return {
												reactive: {
																panels: [],
																activePanelIndex: self.activePanel || 0,
																//selectPanel: self.selectPanel,
																selectPanel(index) {

																				index = Math.max(index, 0);
																				index = Math.min(index, self.reactive.panels.length - 1);

																				console.log('SELECT PANEL', index);
																				self.reactive.activePanelIndex = index;
																				// menuElement.scrollTo({
																				//     // top: 100,
																				//     left: target,
																				//     behavior: 'smooth'
																				// });

																				// _.each(self.panels, function(tab, index) {
																				//     tab.active = (index == self.activePanelIndex);
																				// })
																}
												}
								}
				},
				watch: {
								activePanel: 'reactive.selectPanel',
				},
}

</script>
<style lang="scss">
.accordion {}

</style>
