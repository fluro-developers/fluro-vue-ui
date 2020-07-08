<template>
				<div class="fluro-academic-select">
								<!-- <pre>ACADEMIC {{model}}</pre> -->
								<v-input class="no-flex" :label="label" :required="required" :error-messages="errorMessages" :hint="hint">
												<v-layout row wrap class="fluro-academic-field">
																<v-flex xs12 sm6>
																				<v-select :outline="showOutline" :success="success" :required="required" label="School / Institution" no-data-text="No options available" v-model="model.academicCalendar" item-text="title" item-value="_id" :items="calendars" :return-object="true" :error-messages="errorMessages" @input="calendarChanged" />
																</v-flex>
																<v-flex xs12 sm6 v-if="model.academicCalendar">
																				<v-autocomplete :outline="showOutline" :success="success" :required="required" label="Grade / Year Level" :persistent-hint="true" :hint="gradeHint" no-data-text="No options available" v-model="model.academicGrade" item-text="title" item-value="key" :items="grades" @input="gradeChanged" :error-messages="errorMessages" />
																</v-flex>
												</v-layout>
												<!-- <pre>{{model.academicCalendar}}</pre> -->
												<!-- <pre>{{selectedCalendar}}</pre> -->
												<!-- <pre>{{grades}}</pre> -->
												<!-- <pre>{{model.academicGrade}}</pre> -->
												<!-- <pre>{{model.academicCalendar}}</pre> -->
								</v-input>
				</div>
</template>
<script>
/////////////////////////////////////////////////////

export default {
				// components:{
				// VueSignature,
				// },
				props: {
								'outline': {
												type: Boolean,
								},
								'hint': {
												type: String
								},
								'required': {
												type: [Boolean, Number],
								},
								'label': {
												type: String,
								},
								'value': {
												type: Object,
								},
								'success': {
												type: Boolean,
								},
								'options': {
												default: function() {
																return {}
												},
												type: Object,
								},
								'formFields': {
												type: Array,
								},
				},
				data() {
								return {
												model: this.value,
								}
				},
				watch: {
								value(v) {
												this.model = v;
												this.createVariables(v);
								},
								'model.academicCalendar': function() {
												this.$emit('calendar', this.model.academicCalendar);
								},
								'model.academicGrade': function() {
												this.$emit('grade', this.model.academicGrade);
								},

				},
				computed: {
								errorMessages() {
												return [];
								},
								gradeHint() {

												return `(As of ${new Date().getFullYear()})`;
								},
								showOutline() {
												return this.outline || this.options.outline;
								},
								grades() {
												var self = this;
												return self.model.academicCalendar ? self.model.academicCalendar.grades : []
								}
				},
				created() {
								if (this.formFields) {
												this.$set(this.formFields, this.formFields.length, this);
								}

								this.createVariables();

								////////////////////////////////////////////

								//Emit itself being created
								this.$emit('created', this);
				},
				beforeDestroy() {
								if (this.formFields) {
												this.formFields.splice(this.formFields.indexOf(this), 1);
								}
				},
				methods: {
								gradeChanged(v) {
												this.$set(this.model, 'academicGrade', v);
												this.valueChanged();
								},
								calendarChanged(v) {
												this.$set(this.model, 'academicCalendar', v);
												this.valueChanged();
								},
								createVariables() {
												if (!this.model.academicCalendar) {
																this.$set(this.model, 'academicCalendar', undefined);
												}

												if (!this.model.academicGrade) {
																this.$set(this.model, 'academicGrade', undefined);
												}
								},
								valueChanged() {
												this.$emit('value', this.model);
								},
								reset() {
												// console.log('RESET')
												// this.model.academicGrade = null;
												// this.model.academicCalendar = null;
								},
				},
				asyncComputed: {
								calendars: {
												default: [],
												get() {
																var self = this;
																return new Promise(function(resolve, reject) {

																				self.$fluro.api.get(`/contact/schools`, {
																								searchInheritable: true,
																								allDefinitions: true,
																				}).then(function(res) {


																								var options = res.data;

																								options.unshift({
																												title: 'None',
																												_id: '',
																								})




																								resolve(options);


																								// self.grades = self.selectedCalendar.grades;
																				}, reject);
																})
												}
								},
				}
}

</script>
<style lang="scss">
</style>
