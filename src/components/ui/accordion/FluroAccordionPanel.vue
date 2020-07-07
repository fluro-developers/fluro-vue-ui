<template>
	<div class="accordion-panel" :class="{expanded:active}">
		<div class="accordion-panel-title" @click="selectPanel(index)">
			<v-layout>
				<v-flex> {{heading}} </v-flex>
				<v-flex shrink>
					<fluro-icon :icon="field.expanded ? `angle-up` : `angle-down`" />
				</v-flex>
			</v-layout>
		</div>
		<div class="accordion-panel-body">
			<v-container fluid>
				<slot></slot>
			</v-container>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		heading: {
			type: String
		},
	},
	inject: ['panels', 'activePanelIndex', 'selectPanel'],
	created() {
		// console.log('THISIIIIITY', this.panels)
		this.index = this.panels.length;
		// this.active = this.index == 0;
		this.panels.push(this);
	},
	computed: {
		active() {
			return this.index == this.activePanelIndex;
		}
	},
	data() {
		return {
			index: 0,
			// active: false,
		}
	},
	// methods: {
	//  act() {
	//   var self = this;
	//   //Run a batch
	//   var promise = self.$batch.run({
	//    operation: 'add tag',
	//    ids: self.ids,
	//    tags: self.$fluro.utils.arrayIDs(self.selectedTags),
	//   });
	//   //Close the modal with the promise
	//   return self.close(promise)
	//  },
	// }
}

</script>
<style lang="scss">
.accordion-panel {
	border: 1px solid rgba(#000, 0.1);
	margin-bottom: 4px;

	.accordion-panel-title {
		padding: 10px;
		background: #eee;
	}

	.accordion-panel-body {
		max-height: 0;
		overflow: hidden;
		// padding: 15px;
		transition: all 0.3s;
	}

	&.expanded {
		.accordion-panel-body {
			max-height: 100vh;
			overflow: auto;
		}
	}
}

</style>
