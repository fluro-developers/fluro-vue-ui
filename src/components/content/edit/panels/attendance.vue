<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<flex-column-body style="background: #fff">
				<v-container fluid>
					<constrain sm>
						<!--  -->
						<fluro-content-form-field
							:form-fields="formFields"
							:outline="showOutline"
							@input="update"
							:options="options"
							:field="fieldHash.title"
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
							:field="fieldHash.count"
							v-model="model"
						></fluro-content-form-field>
						<br class="mt-3 mb-5" />

						<!-- -->
						<h4 class="ml-3">Area Counts</h4>
						<p class="ml-3">Add counts for individual rooms/areas</p>
						<area-count-manager v-model="model.areas" />
						<br class="my-4" />
						<!--  -->
						<fluro-content-form-field
							:form-fields="formFields"
							:outline="showOutline"
							@input="update"
							:options="options"
							:field="fieldHash.body"
							v-model="model"
						></fluro-content-form-field>
						<template v-if="definition && definition.fields && definition.fields.length">
							<br class="mt-3 mb-4" />
							<h2>{{ `${definition.title} Information` }}</h2>
							<fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
						</template>
					</constrain>
				</v-container>
			</flex-column-body>
		</template>
	</flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from '../FluroContentEditMixin.js';
import AreaCountManager from '../components/AreaCountManager.vue';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
	components: {
		AreaCountManager,
	},
	created() {},
	mixins: [FluroContentEditMixin],
	computed: {
		fieldsOutput() {
			var self = this;
			var array = [];

			///////////////////////////////////

			addField('title', {
				title: 'Title',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: 'Optional Title',
			});

			addField('event', {
				title: 'Event',
				minimum: 1,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'event',
				},
			});

			addField('count', {
				title: 'Event Total',
				description: 'Number of people counted in total for this event',
				minimum: 0,
				maximum: 1,
				type: 'number',
			});

			addField('body', {
				title: 'Information, Notes and Comments',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'wysiwyg',
			});

			///////////////////////////////////

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
	},
	methods: {
		toggleAutoGraduate() {
			var self = this;
			if (!self.model.autoGraduate) {
				self.model.autoGraduate = true;
			} else {
				self.model.autoGraduate = false;
			}
		},
	},
	data() {
		return {};
	},
};
</script>
<style lang="scss">
.no-border-no-background .toggle-item {
	border: none !important;
	background: none !important;
	font-size: 14px;
	padding: 0px;
}
</style>
