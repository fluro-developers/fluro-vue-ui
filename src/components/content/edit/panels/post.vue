<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<tabset v-else :justified="true" :vertical="true">
			<tab :heading="`${definition.title} Information`">
				<flex-column-body style="background: #fafafa">
					<v-container>
						<constrain sm>
							<template v-if="!model._id">
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.parent"
									v-model="model"
								/>
							</template>
							<template v-else>
								<v-input class="no-flex" label="Linked to">
									<list-group>
										<list-group-item
											@click.native="$fluro.global.edit(model.parent, true)"
											:item="model.parent"
										>
											<template v-slot:right>
												<v-btn
													class="ma-0"
													icon
													small
													flat
													@click.stop.prevent="$actions.open([model.parent])"
												>
													<fluro-icon icon="ellipsis-h" />
												</v-btn>
											</template>
										</list-group-item>
									</list-group>
								</v-input>
							</template>
							<div v-if="definition && definition.fields && definition.fields.length">
								<fluro-content-form
									:options="options"
									v-model="model.data"
									:fields="definition.fields"
								/>
							</div>
							<div v-else>
								<fluro-panel>
									<fluro-panel-body>
										No fields have been defined for this type of post
									</fluro-panel-body>
								</fluro-panel>
							</div>
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
		</tabset>
	</flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from '../FluroContentEditMixin.js';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
	mixins: [FluroContentEditMixin],
	components: {},
	methods: {
		modelUpdated() {
			this.update(this.model);
		},
	},
	created() {
		var self = this;
	},
	asyncComputed: {},
	computed: {
		fieldsOutput() {
			var self = this;
			var array = [];

			var restrictedType;

			if (self.definition && self.definition.data && self.definition.data.postParentTypes) {
				var parentTypes = self.definition.data.postParentTypes;
				if (parentTypes && parentTypes.length) {
					restrictedType = parentTypes[0];
				}
			}
			///////////////////////////////////

			//We need to add more smarts here so we can
			//only attach to the correct things
			addField('parent', {
				title: 'Linked To',
				minimum: 1,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: restrictedType,
				},
			});

			///////////////////////////////////

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
		showOutline() {
			return false; //true; //false;//true;//false;//true;
		},
		// fieldsOutput() {

		//     var self = this;
		//     var array = [];

		//     ///////////////////////////////////

		//     addField('event', {
		//         title: 'Event',
		//         minimum: 1,
		//         maximum: 1,
		//         type: 'reference',
		//         params: {
		//             restrictType: 'event',
		//         },
		//     })

		//     addField('contact', {
		//         title: 'Contact',
		//         minimum: 1,
		//         maximum: 1,
		//         type: 'reference',
		//         description: 'The person who checked was checked in',
		//         params: {
		//             restrictType: 'contact',
		//         },
		//     })

		//     addField('checkedInBy', {
		//         title: 'Checked In By',
		//         minimum: 1,
		//         maximum: 1,
		//         type: 'reference',
		//         description: 'The person who checked this contact in',
		//         params: {
		//             restrictType: 'contact',
		//         },
		//     })

		//     addField('pinNumber', {
		//         title: 'Pin Number',
		//         minimum: 0,
		//         maximum: 1,
		//         type: 'password',
		//         description: 'The Pin Number used when checking in (If any)',
		//     })

		//     // addField('firstLine', {
		//     //     title: 'Description',
		//     //     minimum: 0,
		//     //     maximum: 1,
		//     //     type: 'string',
		//     //     placeholder: 'Eg. A list of my favorite people',
		//     // })

		//     // // console.log('TYPE OPTIONS', self.typeOptions);

		//     // addField('filterType', {
		//     //     title: 'Type',
		//     //     minimum: 0,
		//     //     maximum: 1,
		//     //     type: 'string',
		//     //     directive: 'select',
		//     //     description: 'The type of item you want to return from this query',
		//     //     options: self.typeOptions,
		//     // })

		//     ///////////////////////////////////

		//     function addField(key, details) {
		//         details.key = key;
		//         array.push(details)
		//     }

		//     return array;

		// },
	},
	data() {
		return {};
	},
};
</script>
<style scoped lang="scss">
.hint {
	font-size: 10px;
	opacity: 0.5;
	color: inherit;
	display: block;
}
</style>
