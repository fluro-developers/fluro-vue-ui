<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<tabset v-else :justified="true" :vertical="true">
			<tab heading="Checkin Details">
				<slot>
					<flex-column-body style="background: #fff">
						<v-container>
							<constrain sm>
								<!-- <pre>{{model}}</pre> -->
								<div class="grid-list-xl">
									<fluro-content-form-field
										:form-fields="formFields"
										:outline="showOutline"
										@input="update"
										:options="options"
										:field="fieldHash.contact"
										v-model="model"
									></fluro-content-form-field>
									<fluro-content-form-field
										:form-fields="formFields"
										:outline="showOutline"
										@input="update"
										:options="options"
										:field="fieldHash.event"
										v-model="model"
									></fluro-content-form-field>
									<fluro-content-form-field
										:form-fields="formFields"
										:outline="showOutline"
										@input="update"
										:options="options"
										:field="fieldHash.location"
										v-model="model"
									></fluro-content-form-field>
									<fluro-content-form-field
										:form-fields="formFields"
										:outline="showOutline"
										@input="update"
										:options="options"
										:field="fieldHash.checkedInBy"
										v-model="model"
									></fluro-content-form-field>
									<fluro-content-form-field
										:form-fields="formFields"
										:outline="showOutline"
										@input="update"
										:options="options"
										:field="fieldHash.pinNumber"
										v-model="model"
									></fluro-content-form-field>
								</div>
							</constrain>
						</v-container>
					</flex-column-body>
				</slot>
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
		showOutline() {
			return false; //true; //false;//true;//false;//true;
		},
		fieldsOutput() {
			var self = this;
			var array = [];

			///////////////////////////////////

			addField('contact', {
				title: 'Contact',
				minimum: 1,
				maximum: 1,
				type: 'reference',
				description: 'The person who checked was checked in',
				params: {
					restrictType: 'contact',
				},
			});

			addField('event', {
				title: 'Event',
				minimum: self.model.location ? 0 : 1,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'event',
				},
			});

			addField('location', {
				title: 'Location',
				minimum: self.model.event ? 0 : 1,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'location',
				},
			});

			addField('checkedInBy', {
				title: 'Checked In By',
				minimum: 0,
				maximum: 1,
				type: 'reference',
				description: 'The person who checked this contact in',
				params: {
					restrictType: 'contact',
				},
			});

			addField('pinNumber', {
				title: 'Pin Number',
				minimum: 0,
				maximum: 1,
				type: 'password',
				description: 'The Pin Number used when checking in (If any)',
			});

			// addField('firstLine', {
			//     title: 'Description',
			//     minimum: 0,
			//     maximum: 1,
			//     type: 'string',
			//     placeholder: 'Eg. A list of my favorite people',
			// })

			// // console.log('TYPE OPTIONS', self.typeOptions);

			// addField('filterType', {
			//     title: 'Type',
			//     minimum: 0,
			//     maximum: 1,
			//     type: 'string',
			//     directive: 'select',
			//     description: 'The type of item you want to return from this query',
			//     options: self.typeOptions,
			// })

			///////////////////////////////////

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
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
