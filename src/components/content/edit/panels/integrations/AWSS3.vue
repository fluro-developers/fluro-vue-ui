<template>
				<div>
								<fluro-panel>
												<fluro-panel-title>
																<strong>AWS S3 Integration Details</strong>
												</fluro-panel-title>
												<fluro-panel-body>
																<v-container pa-0 grid-list-xl>
																				<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.accessKeyId" v-model="model.privateDetails.credentials" />
																				<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.secretAccessKey" v-model="model.privateDetails.credentials" />
																				<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.Bucket" v-model="model.privateDetails.params" />
																				<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.transcodePipeline" v-model="model.privateDetails" />
																				<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.region" v-model="model.privateDetails" />
																				<!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.apiPassword" v-model="model.privateDetails" /> -->
																				<!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.publicKey" v-model="model.publicDetails" /> -->
																</v-container>
												</fluro-panel-body>
								</fluro-panel>
				</div>
</template>
<script>
import FluroContentForm from '../../../../form/FluroContentForm.vue';
import FluroContentFormField from "../../../../form/FluroContentFormField.vue";


export default {
				components: {
								FluroContentForm,
								FluroContentFormField,
				},
				extends: FluroContentForm,
				props: {
								value: {
												type: Object,
								},
				},
				data() {
								return {
												model: this.value,
								}
				},
				created() {
								var self = this;

								if (!self.model.privateDetails.credentials) {
												self.$set(self.model.privateDetails, 'credentials', {});
								}


								if (!self.model.privateDetails.params) {
												self.$set(self.model.privateDetails, 'params', {});
								}


							

								// if (!self.model.publicDetails.credentials) {
								// 				self.$set(self.model, 'publicDetails', {});
								// }


				},
				methods: {

				},
				computed: {
								fieldsOutput() {

												var self = this;
												var array = [];


												array.push({
																key: 'accessKeyId',
																title: "Access Key ID",
																minimum: 1,
																maximum: 1,
																type: "string",
																params: {
																				persistentDescription: true,
																},
												});

												array.push({
																key: 'secretAccessKey',
																title: "Secret Access Key",
																minimum: 1,
																maximum: 1,
																type: "string",
																params: {
																				persistentDescription: true,
																},
												});


													array.push({
																key: 'Bucket',
																title: "Bucket Name",
																minimum: 1,
																maximum: 1,
																type: "string",
																params: {
																				persistentDescription: true,
																},
												});


													array.push({
																key: 'transcodePipeline',
																title: "Transcoder Pipeline ID",
																placeholder:`eg. 1532832317358-qhnz38`,
																minimum: 1,
																maximum: 1,
																type: "string",
																params: {
																				persistentDescription: true,
																},
												});

													array.push({
																key: 'region',
																title: "Region",
																placeholder:`Region name eg.(ap-southeast-2)`,
																minimum: 1,
																maximum: 1,
																type: "string",
																params: {
																				persistentDescription: true,
																},
												});




												return array;

								}
				},
}

</script>
<style lang="scss">
</style>
