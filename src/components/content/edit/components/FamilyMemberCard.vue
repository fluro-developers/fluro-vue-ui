<template>
	<v-container fluid grid-lines-sm class="card" :class="model.status" v-if="model">
		<fluro-content-form @input="save" v-model="model" :fields="fields">
			<template v-slot:form="{ formFields, fieldHash, model, update, options }">
				<v-layout column>
					<v-flex class="avatar-flex">
						<fluro-avatar class="avatar-icon" :id="model._id" type="contact" />
					</v-flex>
					<v-flex class="text-centered less-padding">
						<h4>{{ contactName }}</h4>
					</v-flex>
					<v-flex class="less-padding status-flex">
						<fluro-status-select v-model="model.status" />
					</v-flex>
					<v-flex class="text-centered less-padding">
						<p class="muted" style="margin-bottom: 0px">{{ contactGender }} {{ contactAge }}</p>
					</v-flex>
					<v-flex class="less-padding">
						<fluro-content-form-field
							:form-fields="formFields"
							@input="update"
							:options="options"
							:field="fieldHash.householdRole"
							v-model="model"
						></fluro-content-form-field>
					</v-flex>
					<v-flex class="less-padding" v-if="contactDefinitions && contactDefinitions.length">
						<fluro-content-form-field
							:form-fields="formFields"
							@input="update"
							:options="options"
							:field="fieldHash.definition"
							v-model="model"
						></fluro-content-form-field>
					</v-flex>
				</v-layout>
				<v-layout align-center justify-center>
					<v-btn class="mr-1 my-0 pa-1" v-tippy content="Edit" @click="editContact()">
						<fluro-icon icon="pencil" />
					</v-btn>
					<v-btn class="mx-2 my-0 pa-1" v-tippy content="View" @click="viewContact()">
						<fluro-icon icon="user" />
					</v-btn>
					<v-btn class="ml-1 my-0 pa-1" v-tippy content="Remove" @click="removeContact()">
						<fluro-icon icon="times" />
					</v-btn>
				</v-layout>
			</template>
		</fluro-content-form>
	</v-container>
</template>

<script>
import FluroContentForm from '../../../form/FluroContentForm.vue';
import FluroContentFormField from '../../../form/FluroContentFormField.vue';
import FluroStatusSelect from '../../../form/FluroStatusSelect.vue';
import FluroAvatar from '../../../FluroAvatar.vue';
import _ from 'lodash';

export default {
	props: {
		value: {
			type: Object,
			default: {},
		},
		contactDefinitions: {
			type: Array,
		},
	},
	components: {
		FluroContentForm,
		FluroContentFormField,
		FluroStatusSelect,
		FluroAvatar,
	},
	data() {
		return {
			model: this.value,
		};
	},
	created() {
		var self = this;
		if (!self.model.definition) {
			self.model.definition = '';
		}
		if (!self.model.householdRole) {
			self.model.householdRole = '';
		}
	},
	watch: {
		contactStatus: function () {
			this.save();
		},
	},
	methods: {
		removeContact() {
			var self = this;

			var contactName = self.model.title;
			var options = {
				confirmText: 'Confirm Remove',
				confirmColor: 'error',
			};

			self.$fluro
				.confirm(`Are you sure you want to remove ${contactName} from this household?`, null, options)
				.then(function (res) {
					console.log(`Confirm!!!`, res);

					self.$emit('delete', self.model);
				});
		},
		editContact() {
			var self = this;
			self.$fluro.global.edit(self.model, true).then(function (res) {
				_.assign(self.model, res);
				console.log('Update');
			});
		},
		viewContact() {
			var self = this;
			self.$fluro.global.view(self.model, true);
		},
		save: _.debounce(function () {
			console.log('TRIGGER UPDATE');
			var self = this;
			var data = {
				householdRole: self.model.householdRole,
				definition: self.model.definition,
				status: self.model.status,
			};

			self.$fluro.api
				.put(`content/contact/${self.model._id}`, data)
				.then(function (res) {
					self.$fluro.notify(`${self.model.title} was successfully updated!`);
				})
				.catch(function (err) {
					self.$fluro.error(err);
				});
		}, 100),
	},
	computed: {
		contactName() {
			return this.model.title;
		},
		contactAge() {
			return this.model.age;
		},
		contactGender() {
			if (this.model.gender) {
				return this.model.gender;
			}
		},
		contactStatus() {
			return this.model.status;
		},
		fields() {
			var self = this;
			var array = [];

			addField('householdRole', {
				title: 'Family Role',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				defaultValues: [''],
				options: [
					{
						name: 'None / Other',
						value: '',
					},
					{
						name: 'Parent',
						value: 'parent',
					},
					{
						name: 'Guardian',
						value: 'guardian',
					},
					{
						name: 'Child',
						value: 'child',
					},
				],
			});

			addField('definition', {
				title: 'Definition',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				defaultValues: [''],
				options: self.contactDefinitions,
			});

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
	},
};
</script>
<style>
.card {
	width: 100%;
	height: 100%;
}

.avatar-icon {
	width: 80% !important;
	display: block;
}

.avatar-flex {
	display: flex;
	width: 100%;
	justify-content: center;
}

.status-flex {
	display: flex;
	width: 100%;
	justify-content: center;
}

.text-centered {
	text-align: center;
}

.less-padding {
	padding: 4px 8px !important;
}
</style>
