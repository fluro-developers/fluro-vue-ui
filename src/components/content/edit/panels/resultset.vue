<template>
	<flex-column>
		<template v-if="saving">
			<fluro-page-preloader contain />
		</template>
		<tabset v-else :justified="true" :vertical="true">
			<tab heading="Details">
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
									:field="fieldHash.title"
									v-model="model"
								></fluro-content-form-field>
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.firstLine"
									v-model="model"
								></fluro-content-form-field>
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.parent"
									v-model="model"
								></fluro-content-form-field>
								<!-- <fluro-content-form-field
                  :form-fields="formFields"
                  :outline="showOutline"
                  @input="update"
                  :options="options"
                  :field="fieldHash.realms"
                  v-model="model"
                ></fluro-content-form-field> -->
								<!-- <fluro-content-form-field
                  :form-fields="formFields"
                  :outline="showOutline"
                  @input="update"
                  :options="options"
                  :field="fieldHash.tags"
                  v-model="model"
                ></fluro-content-form-field> -->
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.integrations"
									v-model="model"
								></fluro-content-form-field>
							</div>
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab heading="Export Times">
				<flex-column-body style="background: #fff">
					<v-container grid-list-xl>
						<constrain sm>
							<v-layout row>
								<v-flex shrink sm3>
									<fluro-content-form-field
										:form-fields="formFields"
										:outline="showOutline"
										@input="update"
										:options="options"
										:field="fieldHash.count"
										v-model="model"
									></fluro-content-form-field>
								</v-flex>
								<v-flex grow sm9>
									<fluro-content-form-field
										:form-fields="formFields"
										:outline="showOutline"
										@input="update"
										:options="options"
										:field="fieldHash.measure"
										v-model="model"
									></fluro-content-form-field>
								</v-flex>
							</v-layout>
							<!-- <pre>{{model}}</pre> -->
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.nth"
								v-model="model"
							></fluro-content-form-field>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.weekday"
								v-model="model"
							></fluro-content-form-field>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.timestamp"
								v-model="model"
							></fluro-content-form-field>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.timezone"
								v-model="model"
							></fluro-content-form-field>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.nextDate"
								v-model="model"
							></fluro-content-form-field>
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab heading="Permissions">
				<slot>
					<flex-column-body style="background: #fff">
						<v-container grid-list-xl>
							<constrain sm>
								<h3 margin>Permissions</h3>
								<fluro-permission-select @input="modelUpdated" v-model="model.permissionSets" />
								<!-- <pre>{{model.permissionSets}}</pre> -->
							</constrain>
						</v-container>
					</flex-column-body>
				</slot>
			</tab>
			<tab heading="Notifications">
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
									:field="fieldHash.sendContacts"
									v-model="model"
								></fluro-content-form-field>
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.sendTeams"
									v-model="model"
								></fluro-content-form-field>
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
import FluroPermissionSelect from '../../../form/FluroPermissionSelect.vue';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
	mixins: [FluroContentEditMixin],
	components: { FluroPermissionSelect },
	methods: {
		modelUpdated() {
			this.update(this.model);
		},
	},
	created() {
		var self = this;
	},
	asyncComputed: {},
	props: {
		value: {
			type: Object,
		},
	},
	computed: {
		showOutline() {
			return false; //true; //false;//true;//false;//true;
		},
		fieldsOutput() {
			var self = this;
			var array = [];

			///////////////////////////////////
			addField('title', {
				title: 'The Title of this result set.',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: 'Eg. My Awesome Resultset',
			});

			addField('firstLine', {
				title: 'Description',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: 'Eg. A list of my favorite people',
			});

			addField('parent', {
				title: 'Query',
				minimum: 1,
				maximum: 1,
				type: 'reference',
				description: 'The query or report that this result set is attached to',
				params: {
					restrictType: 'query',
				},
			});

			addField('realms', {
				title: 'Realms',
				minimum: 1,
				maximum: 0,
				type: 'reference',
				directive: 'realm-select',
				params: {
					restrictType: 'realm',
				},
			});

			addField('tags', {
				title: 'Tags',
				minimum: 1,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'tag',
				},
			});

			addField('sendContacts', {
				title: 'Notify Contacts',
				minimum: 0,
				maximum: 0,
				type: 'reference',
				description: 'The contacts to send a copy of the data from this Result Set to',
				params: {
					restrictType: 'contact',
				},
			});

			addField('integrations', {
				title: 'Integrations',
				minimum: 0,
				maximum: 0,
				type: 'reference',
				params: {
					restrictType: 'integration',
				},
			});

			addField('sendTeams', {
				title: 'Notify Groups/Teams',
				minimum: 0,
				maximum: 0,
				type: 'reference',
				description: 'The contacts from a group or team to send a copy of the data from this Result Set to',
				params: {
					restrictType: 'team',
				},
			});

			addField('count', {
				title: 'Run Every',
				minimum: 0,
				maximum: 1,
				type: 'number',
			});

			addField('measure', {
				//title: "Period",
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				description: 'Days? Weeks? Months? between the times when this result set is run.',
				options: [
					{ title: 'Day', value: 'days' },
					{ title: 'Week', value: 'weeks' },
					{ title: 'Month', value: 'months' },
					{ title: 'Year', value: 'years' },
				],
			});

			addField('nth', {
				title: 'On The',
				minimum: 0,
				maximum: 1,
				type: 'text',
				directive: 'select',
				options: [
					{ title: 'Same Date', value: 'date' },
					{ title: 'First', value: '1' },
					{ title: 'Second', value: '2' },
					{ title: 'Third', value: '3' },
					{ title: 'Forth', value: '4' },
					{ title: 'Sifth', value: '5' },
				],
				expressions: {
					hide() {
						return self.model.measure != 'months';
					},
				},
			});

			addField('weekday', {
				title: 'Day of week that this executes',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				options: [
					{ title: 'Monday', value: 'monday' },
					{ title: 'Tuesday', value: 'tuesday' },
					{ title: 'Wednesday', value: 'wednesday' },
					{ title: 'Thursday', value: 'thursday' },
					{ title: 'Friday', value: 'friday' },
					{ title: 'Saturday', value: 'saturday' },
					{ title: 'Sunday', value: 'sunday' },
				],
				expressions: {
					hide() {
						return self.model.measure != 'months' && self.model.nth == 'date';
					},
				},
			});

			addField('timestamp', {
				title: 'At time',
				// description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				// expressions: {
				//     hide() {
				//         if(self.model.measure == 'hours' || self.model.measure == 'minutes') {
				//             return true;
				//         }
				//     }
				// },
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
					{ title: '12am', value: '1200' },
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

			addField('nextDate', {
				title: 'Next Activation',
				minimum: 0,
				maximum: 1,
				type: 'date',
				directive: 'datetimepicker',
				description: 'The next date this result set is scheduled to export',
			});

			addField('timezone', {
				title: 'Timezone',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'timezone-select',
			});

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
		return {
			model: this.value,
			saving: false,
		};
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
