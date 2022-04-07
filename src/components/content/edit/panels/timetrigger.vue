<template>
	<flex-column>
		<!-- <pre>Loading? {{loading}} - {{loadingPermissions}}</pre> -->
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<tabset :justified="true" :vertical="true">
				<tab heading="Information">
					<flex-column-body style="background: #fafafa">
						<v-container fluid>
							<constrain sm>
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.title"
									v-model="model"
								/>
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.description"
									v-model="model"
								/>
								<template v-if="definition && definition.fields && definition.fields.length">
									<h4 margin>{{ definition.title }} Information</h4>
									<fluro-content-form
										:options="options"
										v-model="model.data"
										:fields="definition.fields"
									/>
								</template>
								<v-layout>
									<v-flex xs4>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.count"
											v-model="model"
										/>
									</v-flex>
									<v-flex xs8>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.measure"
											v-model="model"
										/>
									</v-flex>
								</v-layout>
								<v-layout v-if="model.measure == 'months'">
									<v-flex xs4>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.nth"
											v-model="model"
										/>
									</v-flex>
									<v-flex xs8>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.weekday"
											v-model="model"
										/>
									</v-flex>
								</v-layout>

								<v-layout v-if="model.measure != 'hours' && model.measure != 'minutes'">
									<v-flex xs4>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.timestamp"
											v-model="model"
										/>
									</v-flex>
									<v-flex xs8>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.timezone"
											v-model="model"
										/>
									</v-flex>
								</v-layout>

								<v-layout>
									<v-flex xs12 sm4>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.nextDate"
											v-model="model"
										/>
									</v-flex>
								</v-layout>

								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.reactions"
									v-model="model"
								/>
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
	components: {
		// FluroEditor,
	},
	created() {},
	data() {
		return {};
	},
	mixins: [FluroContentEditMixin],
	methods: {},
	asyncComputed: {},
	computed: {
		measureOptions() {
			var self = this;

			if (self.model.count == 1) {
				return [
					{
						title: 'Minute',
						value: 'minutes',
					},
					{
						title: 'Hour',
						value: 'hours',
					},
					{
						title: 'Day',
						value: 'days',
					},
					{
						title: 'Week',
						value: 'weeks',
					},
					{
						title: 'Month',
						value: 'months',
					},
					{
						title: 'Year',
						value: 'years',
					},
				];
			} else {
				return [
					{
						title: 'Minutes',
						value: 'minutes',
					},
					{
						title: 'Hours',
						value: 'hours',
					},
					{
						title: 'Days',
						value: 'days',
					},
					{
						title: 'Weeks',
						value: 'weeks',
					},
					{
						title: 'Months',
						value: 'months',
					},
					{
						title: 'Years',
						value: 'years',
					},
				];
			}
		},
		fieldsOutput() {
			var self = this;
			var array = [];

			///////////////////////////////////

			addField('title', {
				title: 'Title',
				minimum: 1,
				maximum: 1,
				type: 'string',
			});

			///////////////////////////////////

			addField('description', {
				title: 'Description',
				// description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
				minimum: 0,
				maximum: 1,
				type: 'string',
			});

			///////////////////////////////////

			addField('count', {
				title: 'Recur every',
				// description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
				minimum: 0,
				maximum: 1,
				type: 'integer',
			});

			addField('measure', {
				title: '',
				minimum: 0,
				maximum: 1,
				type: 'select',
				options: self.measureOptions,
				directive: 'select',
			});

			///////////////////////////////////

			addField('nth', {
				title: 'On the',
				// description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				expressions: {
					hide() {
						return self.model.measure != 'months';
					},
				},
				options: [
					{
						title: 'Same Date',
						value: 'date',
					},
					{
						title: 'First',
						value: '1',
					},
					{
						title: 'Second',
						value: '2',
					},
					{
						title: 'Third',
						value: '3',
					},
					{
						title: 'Fourth',
						value: '4',
					},
					{
						title: 'Fifth',
						value: '5',
					},
				],
			});

			addField('weekday', {
				title: 'Weekday',
				// description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				expressions: {
					hide() {
						return self.model.nth == 'date';
					},
				},
				options: [
					{
						title: 'Sunday',
						value: 'sunday',
					},
					{
						title: 'Monday',
						value: 'monday',
					},
					{
						title: 'Tuesday',
						value: 'tuesday',
					},
					{
						title: 'Wednesday',
						value: 'wednesday',
					},
					{
						title: 'Thursday',
						value: 'thursday',
					},
					{
						title: 'Friday',
						value: 'friday',
					},
					{
						title: 'Saturday',
						value: 'saturday',
					},
				],
			});

			///////////////////////////////////

			addField('timestamp', {
				title: 'At time',
				// description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				expressions: {
					hide() {
						if (self.model.measure == 'hours' || self.model.measure == 'minutes') {
							return true;
						}
					},
				},
				options: [
					{ title: '12am (Midnight)', value: '0000' },
					{ title: '1am', value: '0100' },
					{ title: '2am', value: '0200' },
					{ title: '3am', value: '0300' },
					{ title: '4am', value: '0400' },
					{ title: '5am', value: '0500' },
					{ title: '6am', value: '0600' },
					{ title: '7am', value: '0700' },
					{ title: '8am', value: '0800' },
					{ title: '9am', value: '0900' },
					{ title: '10am', value: '1000' },
					{ title: '11am', value: '1100' },
					{ title: '12pm', value: '1200' },
					{ title: '1pm', value: '1300' },
					{ title: '2pm', value: '1400' },
					{ title: '3pm', value: '1500' },
					{ title: '4pm', value: '1600' },
					{ title: '5pm', value: '1700' },
					{ title: '6pm', value: '1800' },
					{ title: '7pm', value: '1900' },
					{ title: '8pm', value: '2000' },
					{ title: '9pm', value: '2100' },
					{ title: '10pm', value: '2200' },
					{ title: '11pm', value: '2300' },
				],
			});

			///////////////////////////////////

			addField('timezone', {
				title: 'Timezone',
				// description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'timezone-select',
				expressions: {
					hide() {
						if (self.model.measure == 'hours' || self.model.measure == 'minutes') {
							return true;
						}
					},
				},
			});

			addField('nextDate', {
				title: 'Next activation',
				description: 'When is the next time this trigger should fire?',
				minimum: 0,
				maximum: 1,
				type: 'date',
				directive: 'datetimepicker',
			});

			addField('reactions', {
				title: 'Reactions',
				description: 'Select reactions that will spark when this trigger is activated',
				minimum: 0,
				maximum: 0,
				type: 'reference',
				params: {
					restrictType: 'reaction',
				},
			});

			///////////////////////////////////

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
	},
};
</script>
<style lang="scss" scoped></style>
