<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<!-- :vertical="true" -->
			<tabset :justified="true" :vertical="true">
				<!--  <template v-slot:menuprefix>
                    <template v-if="context == 'edit' && $vuetify.breakpoint.mdAndUp">
                        <flex-column-header style="text-align:center">
                            <div style="padding: 10px; max-width:200px; margin: auto;">
                                <fluro-image  :height="200" :image-height="450" contain :item="model" :cacheKey="imageCacheKey" :spinner="true"></fluro-image>
                            </div>
                            <div>
                                {{model.width}}x{{model.height}}
                            </div>
                        </flex-column-header>
                    </template>
                </template> -->
				<tab heading="Conversation Info">
					<!-- <slot> -->
					<flex-column-body style="background: #fff">
						<v-container fluid>
							<constrain sm>
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.title"
									v-model="model"
								></fluro-content-form-field>
								<fluro-privacy-select v-model="model.privacy" />
								<template v-if="definedFields && definedFields.length">
									<fluro-content-form
										:options="options"
										v-model="model.data"
										:fields="definedFields"
									/>
								</template>
							</constrain>
						</v-container>
					</flex-column-body>
				</tab>
			</tabset>
		</template>
	</flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from '../FluroContentEditMixin.js';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
	components: {},
	created() {},
	mixins: [FluroContentEditMixin],
	computed: {
		fieldsOutput() {
			var self = this;
			var array = [];

			///////////////////////////////////

			addField('title', {
				title: 'Title',
				minimum: 1,
				maximum: 1,
				type: 'string',
				params: {
					autofocus: !self.model._id,
				},
			});

			// addField('firstLine', {
			//     title: 'Short Description',
			//     minimum: 0,
			//     maximum: 1,
			//     type: 'string',
			//     placeholder: 'Optional short description describing the collection',
			// });

			// addField('weight', {
			//     title: 'Weight',
			//     minimum: 0,
			//     maximum: 1,
			//     type: 'integer',
			//     placeholder: '',
			// });

			// addField('items', {
			//     title: 'Items',
			//     minimum: 0,
			//     maximum: 0,
			//     type: 'reference',
			//     // params: {
			//     //     restrictType: 'ticket',
			//     // },
			// })

			///////////////////////////////////

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
	},
	methods: {},
	data() {
		return {};
	},
};
</script>
<style lang="scss"></style>
