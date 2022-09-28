<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<tabset v-else :justified="true">
			<tab heading="Code">
				<flex-row class="code-panels">
					<flex-column class="code-panel" :class="{ 'panel-collapsed': collapsed.js }">
						<div class="code-heading" @click="togglePanel('js')">
							<v-layout>
								<v-flex>
									<label>
										<fluro-icon icon="caret-right" library="fas" left />
										<strong>Javascript</strong>
									</label>
								</v-flex>
								<v-flex
									shrink
									v-tippy
									content="Expand"
									class="arrow-expander"
									@click.stop.prevent="togglePanel('js', true)"
								>
									<fluro-icon icon="expand-alt" />
								</v-flex>
							</v-layout>
						</div>
						<flex-column class="code-panel-column">
							<fluro-code-editor style="flex: 1 1 100%" v-model="model.js" lang="javascript" />
						</flex-column>
					</flex-column>
					<flex-column class="code-panel" :class="{ 'panel-collapsed': collapsed.html }">
						<div class="code-heading" @click="togglePanel('html')">
							<v-layout>
								<v-flex>
									<label>
										<fluro-icon icon="caret-right" library="fas" left />
										<strong>HTML</strong>
									</label>
								</v-flex>
								<v-flex
									shrink
									v-tippy
									content="Expand"
									class="arrow-expander"
									@click.stop.prevent="togglePanel('html', true)"
								>
									<fluro-icon icon="expand-alt" />
								</v-flex>
							</v-layout>
						</div>
						<flex-column class="code-panel-column">
							<fluro-code-editor style="flex: 1 1 100%" v-model="model.html" lang="html" />
						</flex-column>
					</flex-column>
					<flex-column class="code-panel" :class="{ 'panel-collapsed': collapsed.css }">
						<div class="code-heading" @click="togglePanel('css')">
							<v-layout>
								<v-flex>
									<label>
										<fluro-icon icon="caret-right" library="fas" left />
										<strong>SCSS</strong>
									</label>
								</v-flex>
								<v-flex
									shrink
									v-tippy
									content="Expand"
									class="arrow-expander"
									@click.stop.prevent="togglePanel('css', true)"
								>
									<fluro-icon icon="expand-alt" />
								</v-flex>
							</v-layout>
						</div>
						<!--  -->
						<flex-column class="code-panel-column">
							<fluro-code-editor
								:autoformat="false"
								style="flex: 1 1 100%"
								v-model="model.css"
								lang="scss"
							/>
						</flex-column>
					</flex-column>
				</flex-row>
			</tab>
			<tab heading="Component Fields">
				<fluro-field-editor v-model="model.fields" :item="model" />
			</tab>
			<tab :heading="`${readableContentType} Details`">
				<flex-column-body style="background: #fff">
					<v-container fluid>
						<constrain sm>
							<h3 margin>{{ readableContentType }} Details</h3>
							<template v-if="definedFields.length">
								<fluro-content-form :options="options" v-model="model.data" :fields="definedFields" />
							</template>
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
		</tabset>
	</flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';
import FluroFieldEditor from '../../../fields/FluroFieldEditor.vue';
import FluroCodeEditor from '../../../form/FluroCodeEditor.vue';
/////////////////////////////////

export default {
	mixins: [FluroContentEditMixin],
	components: {
		FluroFieldEditor,
		FluroCodeEditor,
	},
	methods: {
		togglePanel(syntax, isolate) {
			console.log('TOGGLE', syntax);

			var self = this;

			if (isolate) {
				for (var key in self.collapsed) {
					self.$set(self.collapsed, key, true);
				}
			}

			self.$set(self.collapsed, syntax, !self.collapsed[syntax]);

			// this.collapsed[syntax] = !this.collapsed[syntax];
		},
	},
	created() {
		if (!this.model.fields) {
			this.$set(this.model, 'fields', []);
		}
	},
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
				placeholder: 'Eg. My Awesome List',
			});

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
			collapsed: {
				js: false,
				html: false,
				css: false,
			},
		};
	},
};
</script>
<style scoped lang="scss">
.code-heading {
	line-height: 30px;
	height: 30px;
	padding: 0 15px;
	background: #555;
	color: rgba(#fff, 0.8);
	white-space: nowrap;
	border: 1px solid rgba(#000, 0.1);
	cursor: pointer !important;
	position: relative;

	&:hover {
		background: #444;
		color: #fff;
	}

	label {
		display: block;
		text-transform: uppercase;
		margin: 0;
		padding: 0;
		letter-spacing: 0.05em;
		font-size: 12px;
		pointer-events: none;
	}

	.arrow-expander {
		opacity: 0.5;
		cursor: pointer;

		&:hover {
			opacity: 1;
		}
	}
}

.code-panels {
	background: #262626;
}

.code-panel {
	.code-panel-column {
		border-left: 1px solid rgba(#000, 0.1);
		border-right: 1px solid rgba(#000, 0.1);
	}
}

.panel-collapsed {
	width: 30px !important;
	flex: none;
	background: #fafafa;

	.arrow-expander {
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		text-align: center;
	}

	.code-heading {
		flex: 1;
		height: auto;

		label {
			transform: rotate(90deg);
		}
	}

	.code-panel-column {
		display: none;
	}
}
</style>
