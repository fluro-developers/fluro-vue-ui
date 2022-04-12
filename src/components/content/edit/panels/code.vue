<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<!-- :vertical="true" -->
			<tabset :justified="true" v-model="tabIndex">
				<tab :heading="`${readableContentType} Details`" index="config">
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
									:field="fieldHash.syntax"
									v-model="model"
								/>
								<template v-if="definition">
									<h3 margin>{{ definition.title }} Details</h3>
									<!-- <div class="form-group" v-if="definition.data.titleGeneration != 'force'"> -->
									<!-- <label>{{titleLabel}}</label> -->
									<!-- <input class="form-control" placeholder="{{titleLabel}}" ng-model="item.title"> -->
									<!-- </div> -->
									<fluro-content-form
										:options="options"
										v-model="model.data"
										:fields="definition.fields"
									/>
								</template>
							</constrain>
						</v-container>
					</flex-column-body>
					<flex-column-body style="background: #fafafa">
						<v-container fluid>
							<constrain sm>
								<fluro-privacy-select v-model="model.privacy" />
							</constrain>
						</v-container>
					</flex-column-body>
				</tab>
				<tab :heading="codeTitle" index="code">
					<fluro-code-editor style="flex: 1 1 100%" v-model="model.body" :lang="model.syntax" />
				</tab>
			</tabset>
		</template>
		<!-- <flex-column-body> -->
		<!-- // <pre>{{model}}</pre> -->
		<!-- </flex-column-body> -->
		<!-- <flex-column-body> -->
		<!-- WOOOT -->
		<!-- <tabset v-else :justified="true" :vertical="true">
            <tab heading="Basic Details">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                    </flex-column-body>
                </slot>
            </tab>
        </tabset> -->
	</flex-column>
</template>
<script>
/////////////////////////////////

import FluroCodeEditor from '../../../form/FluroCodeEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
	components: {
		FluroCodeEditor,
	},
	mixins: [FluroContentEditMixin],
	computed: {
		codeTitle() {
			var self = this;

			switch (self.model.syntax) {
				case 'css':
					return 'CSS';
					break;
				case 'html':
					return 'HTML';
					break;
				case 'javascript':
				case 'js':
					return 'Javascript';
					break;
				case 'sass':
				case 'scss':
					return 'SCSS';
					break;
				default:
					return 'Code';
					break;
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

			addField('syntax', {
				title: 'Syntax',
				minimum: 1,
				maximum: 1,
				type: 'string',
				directive: 'select',
				options: [
					{
						name: 'HTML',
						value: 'html',
					},
					{
						name: 'SCSS',
						value: 'scss',
					},
					{
						name: 'CSS',
						value: 'css',
					},
					{
						name: 'Javascript',
						value: 'js',
					},
				],
			});

			///////////////////////////////////

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
		fullBody() {
			return this.definition && this.definition.data && this.definition.data.fullBody;
		},
		hideBody() {
			return this.definition && this.definition.data && this.definition.data.hideBody;
		},
		titleLabel() {
			return 'Title';
		},
		bodyLabel() {
			return 'Body';
		},
	},
	data() {
		return {
			tabIndex: 'code',
			editorOptions: {},
		};
	},
	created() {
		if (!this.model._id) {
			this.tabIndex = 'config';
		}
	},
};
</script>
<style lang="scss">
.fluro-editor.full-bleed {
	margin: 0;
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	.fluro-editor-textarea {
		flex: 1;

		& > div {
			border: none !important;
			border-radius: 0;
			overflow: auto;
			padding: 3%;
		}
	}

	& .editor-code-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;

		.fluro-code-editor {
			display: block;
			flex: 1;
			position: relative;

			.ace_editor {
				width: 100% !important;
				height: 100% !important;
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				top: 0;
				border-radius: 0;
			}
		}
	}
}
</style>
