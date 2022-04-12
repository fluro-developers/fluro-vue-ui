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
				<tab heading="Details">
					<flex-column-body style="background: #fafafa">
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
								/>
								<!-- -->
								<grade-manager v-model="model.grades" />
								<!--  -->
								<fluro-panel>
									<fluro-panel-title>
										<div class="no-border-no-background" @click="toggleAutoGraduate()">
											<fluro-toggle-item :inactive="!model.autoGraduate"
												>Auto-Graduate Students</fluro-toggle-item
											>
										</div>
									</fluro-panel-title>
									<fluro-panel-body v-if="model.autoGraduate">
										<v-layout column>
											<v-flex>
												<fluro-content-form-field
													:form-fields="formFields"
													:outline="showOutline"
													@input="update"
													:options="options"
													:field="fieldHash.graduationDate"
													v-model="model"
												/>
											</v-flex>
											<v-flex>
												<fluro-content-form-field
													:form-fields="formFields"
													:outline="showOutline"
													@input="update"
													:options="options"
													:field="fieldHash.graduatesTo"
													v-model="model"
												/>
											</v-flex>
										</v-layout>
									</fluro-panel-body>
								</fluro-panel>
								<!--  -->
								<!-- <pre>{{model}}</pre> -->
							</constrain>
						</v-container>
					</flex-column-body>
				</tab>
				<tab
					:heading="`${definition.title} Information`"
					v-if="definition && definition.fields && definition.fields.length"
				>
					<fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
				</tab>
				<tab heading="Student Graduation" v-if="model.autoGraduate">
					<flex-column-body style="background: #fafafa">
						<v-container fluid>
							<constrain sm>
								<h4 margin>Graduation Details</h4>
								<div>
									<v-label>Automatic Graduation:</v-label>
									<p>
										{{ model.graduationDate | formatDate('h:mma D MMM YYYY') }}
										<span class="muted">{{ model.graduationDate | timeago }}</span>
									</p>
								</div>
								<search-input
									style="background: #fff"
									@click.native.stop.prevent
									placeholder="Search contacts"
									v-model="keywords"
								/>
								<fluro-panel v-if="filtered.length">
									<fluro-table :columns="columns" :items="filtered" />
								</fluro-panel>
								<!-- <fluro-panel v-if="test && test.contacts.length">
                                 <fluro-panel-body class="border-top" v-for="contact in test.contacts">
                                  <v-layout>
                                   <v-flex>
                                    {{}}
                                   </v-flex>
                                   <v-flex></v-flex>
                                  </v-layout>
                                 </fluro-panel-body>
                                </fluro-panel>
 -->
							</constrain>
						</v-container>
					</flex-column-body>
				</tab>
				<!-- <tab heading="Advanced / Metadata" v-if="hasMeta">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                               
                                <fluro-panel v-if="model.data.iptc">
                                    <fluro-panel-title>
                                        <h5>IPTC Data</h5>
                                    </fluro-panel-title>
                                    <fluro-panel-body>
                                        <json-view :deep="3" :data="model.data.iptc" />
                                    </fluro-panel-body>
                                </fluro-panel>
                                
                               
                                <fluro-panel v-if="model.data.exif">
                                    <fluro-panel-title>
                                        <h5>EXIF Data</h5>
                                    </fluro-panel-title>
                                    <fluro-panel-body>
                                        <json-view :deep="3" :data="model.data.exif" />
                                    </fluro-panel-body>
                                </fluro-panel>
                                
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab> -->
			</tabset>
		</template>
	</flex-column>
</template>
<script>
/////////////////////////////////

import FluroEditor from '../../../form/FluroEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';
import GradeManager from '../components/GradeManager.vue';
import FluroTable from '../../../table/FluroTable.vue';
import SearchInput from '../../../ui/SearchInput.vue';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
	components: {
		FluroEditor,
		GradeManager,
		FluroTable,
		SearchInput,
	},
	data() {
		return {
			keywords: '',
			loading: false,
		};
	},
	created() {},
	mixins: [FluroContentEditMixin],
	asyncComputed: {
		contacts: {
			default: [],
			get() {
				var self = this;

				if (!self.model._id || !self.model.autoGraduate) {
					self.loading = false;
					return Promise.resolve([]);
				}

				self.loading = true;
				return new Promise(function (resolve, reject) {
					self.$fluro.api
						.get(`/contact/schools/graduation/${self.model._id}`)
						.then(function (res) {
							resolve(res.data);

							self.loading = false;
						})
						.catch(function (err) {
							reject(err);
							self.loading = false;
						});
				});
			},
		},
	},
	computed: {
		lowercaseKeywords() {
			return String(this.keywords).toLowerCase();
		},
		filtered() {
			var self = this;
			var contacts = self.contacts;

			if (self.lowercaseKeywords && self.lowercaseKeywords.length) {
				contacts = _.filter(contacts, function (contact) {
					return String(contact.title).toLowerCase().includes(self.lowercaseKeywords);
				});
			}

			var ordered = _.orderBy(contacts, 'title');

			return ordered;
		},
		columns() {
			var self = this;
			var array = [];

			array.push({
				title: 'Contact',
				key: 'title',
				type: 'string',
			});

			array.push({
				title: 'From',
				key: 'from',
				type: 'string',
			});

			array.push({
				title: 'To',
				key: 'to',
				type: 'string',
			});

			return array;
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
				params: {
					autofocus: !self.model.title,
				},
			});

			var now = new Date();
			addField('graduationDate', {
				title: 'Graduation Date',
				minimum: 0,
				maximum: 1,
				type: 'date',
				directive: 'datetimepicker',
				defaultValues: [now],
			});

			addField('graduatesTo', {
				title: 'Graduate To',
				description:
					'Which academic calendar does a contact graduate to if they reach the end of the grades in this calendar',
				minimum: 0,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'academic',
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
	methods: {
		toggleAutoGraduate() {
			console.log('TOGGLE');
			var self = this;
			if (!self.model.autoGraduate) {
				self.$set(self.model, 'autoGraduate', true);
			} else {
				self.$set(self.model, 'autoGraduate', false);
			}
		},
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
