<template>
				<div>
								<fluro-panel>
												<fluro-table :enableSelection="false" :actionsEnabled="false" defaultSort="path" :pageSize="25" style="max-height:70vh;" :items="model" :columns="columns" />
								</fluro-panel>
								<v-btn class="ml-0" color="primary" @click="add()">
												Add Redirect
												<fluro-icon right icon="plus" />
								</v-btn>
				</div>
</template>
<script>
import FluroTable from '../../../table/FluroTable.vue';

export default {
				props: {
								value: {
												type: Array,
												default () {
																return [];
												}
								}
				},
				components: {
								FluroTable,
				},
				computed: {
								columns() {

												var self = this;
												var array = [];


												array.push({
																title: 'From',
																key: 'from',
																type: 'string',
												})

												array.push({
																title: 'To',
																key: 'to',
																type: 'string',
												})


												array.push({
																title: 'Status Code',
																key: 'statusCode',
																type: 'string',

												})

												// array.push({
												// 				title: '',
												// 				key: 'exclude',
												// 				renderer: 'boolean',
												// 				button: {
												// 								icon: 'trash-alt',
												// 								action(row) {
												// 												return new Promise(function(resolve, reject) {
												// 																console.log('Delete', row);
												// 																self.$fluro.confirm('Remove', `Are you sure you want to remove this redirect`, {
												// 																								confirmColor: 'error',
												// 																								confirmText: 'Confirm Remove',
												// 																				})
												// 																				.then(function() {
												// 																								self.remove(row)
												// 																				}, reject);


												// 												})

												// 								},
												// 				},
												// 				shrink: true,

												// })



												array.push({
																title: '',
																key: '_id',
																renderer: 'button',
																button: {
																				icon: 'trash-alt',
																				action(row) {
																								return new Promise(function(resolve, reject) {
																												console.log('Delete', row);
																												self.$fluro.confirm('Remove', `Are you sure you want to remove this redirect`, {
																																				confirmColor: 'error',
																																				confirmText: 'Confirm Remove',
																																})
																																.then(function() {
																																				self.remove(row)
																																}, reject);


																								})

																				},
																},
																shrink: true,

												})


												return array;
								}
				},
				data() {
								return {
												model: this.value,
								}
				},
				methods: {
								remove(item) {
												var self = this;
												var index = self.model.indexOf(item);

												if (index != -1) {
																self.model.splice(index, 1);
												}
								},
								add() {

												var self = this;


												// var transform = {
												// 				get(value) {
												// 					return value;
												// 				},
												// 				set(value) {



												// 					return value
												// 				},
												// }


												self.$fluro.prompt([{
																								title: 'Redirect from',
																								type: 'url',
																								key: 'from',
																								minimum: 1,
																								maximum: 1,
																								placeholder: 'eg. /camp',
																								params: {
																												autofocus: true,
																								},
																								// expressions: {
																								// 				transform,
																								// },
																				},

																				{
																								title: 'Redirect to',
																								type: 'url',
																								key: 'to',
																								minimum: 1,
																								maximum: 1,
																								placeholder: 'eg. /camp123 or https://camp.com',
																								// expressions: {
																								// 				transform,
																								// },
																				},

																				{
																								title: 'Status Code',
																								type: 'string',
																								key: 'statusCode',
																								minimum: 1,
																								maximum: 1,
																								directive: 'select',
																								defaultValues: ['301'],
																								placeholder: 'eg. /camp123 or https://camp.com',
																								options: [{
																																name: '301 Permanent',
																																value: '301',
																												},
																												{
																																name: '302 Temporary',
																																value: '302',
																												},
																								]
																				},

																], 'Add Redirect')
																.then(function(res) {
																				self.model.push(res);
																})
								}
				}
}

</script>
<style lang="scss">
</style>
