<template>
				<div ref="outer" class="fluro-code-editor" v-if="ready">
								<code-editor v-model="model" @init="editorInit" :lang="syntax" theme="tomorrow_night_eighties" :height="100"></code-editor>
				</div>
</template>
<script>
// import CodeEditor from 'vue2-ace-editor';
// import js_beautify from 'js-beautify';

import DynamicImportService from 'src/DynamicImportService.js';



// console.log('BEAUTIFY', js_beautify.html);

export default {

				props: {
								'autoformat': {
												type: Boolean,
												default: true,
								},
								'value': {
												type: String,
												default: '',
								},
								'lang': {
												type: String,
												default: 'html',
								},
								'height': {
												default: 300,
												type: Number,
								},
								'readonly': {
												type: Boolean,
								},
				},

				data() {
								return {
												ready: false,
												editor: null,
												model: this.value,
												beautifier: null,
								}
				},
				computed: {
								syntax() {
												switch (this.lang) {
																case 'css':
																case 'sass':
																case 'scss':
																				return 'scss';
																				break;
																case 'js':
																				return 'javascript';
																				break;
																case 'html':
																				return 'html';
																				break;
																default:
																				return `${this.lang}`;
																				break;
												}
								}
				},
				methods: {
								beautify() {

												var self = this;

												if (!self.autoformat) {
																return;
												}

												if (!self.editor) {
																return;
												}

												if (self.beautifier) {
																runBeautify();
												} else {

																return import('js-beautify')
																				.then(function(res) {
																								self.beautifier = res;
																								runBeautify();
																				})
												}

												function runBeautify() {
																console.log('Beautify!!!')
																//Get the current string
																var input = self.editor.session.getValue() || '';

																//Remove leading spaces
																var array = input.split(/\n/);
																array[0] = array[0].trim();
																input = array.join("\n");


																switch (self.syntax) {
																				case 'html':
																								input = self.beautifier.html(input); //, {extra_liners:'p, br'})
																								break;
																				case 'json':
																				case 'javascript':
																								console.log('TESTING', self.beautifier)
																								// input = self.beautifier.js(input);
																								break;
																				case 'scss':
																								input = self.beautifier.css(input)
																								break;
																}

																// console.log('BEAUTIFIED')
																// console.log('Set code editor with new input', input);
																//Change current text to formatted text
																self.editor.session.setValue(input);
												}
								},
								editorInit: function(editor) {

												var self = this;
												self.editor = editor;

												//             editor.setOptions({
												//     maxLines: Infinity
												// });

												var editorDiv = self.$refs.outer;
												var doc = editor.getSession().getDocument();
												editor.on("change", function() {
																var lineHeight = editor.renderer.lineHeight;
																editorDiv.style.height = lineHeight * doc.getLength() + "px";
																editor.resize();
												});

												//     var editor = ace.edit("editor");                   // the editor object
												// var editorDiv = document.getElementById("editor");     // its container
												// var doc = editor.getSession().getDocument();  // a reference to the doc


												////////////////////////////////////////

												if (self.readonly) {
																editor.setReadOnly(true);
																editor.renderer.setShowGutter(false);
												} else {
																editor.on('blur', self.beautify);
												}


												self.beautify();



												////////////////////////////////////////

												// editor.setOptions({

												//     // autoScrollEditorIntoView: true,
												//     // copyWithEmptySelection: true,
												// });

												// editor.setReadOnly(true);
												// editor.setMode(this.computedSyntax);
												// console.log('Initialize the editor', editor);
												// })

								},
				},

				beforeDestroy() {
								this.editor.off('blur', self.beautify);
				},
				mounted() {

								// import CodeEditor from 'vue2-ace-editor';

								var self = this;

								DynamicImportService.load('vue2-ace-editor', function() {
												return import('vue2-ace-editor')
								}).then(function(imported) {
												self.$options.components.CodeEditor = imported;
												console.log('Loaded code editor')

												Promise.all([

																				import('brace/ext/searchbox'),
																				import('brace/ext/language_tools'),
																				import('brace/mode/html'),
																				import('brace/mode/json'),
																				import('brace/mode/javascript'),
																				import('brace/mode/ejs'),
																				import('brace/mode/scss'),
																				import('brace/theme/tomorrow_night_eighties'),
																				import('brace/snippets/javascript'),
																])
																.then(function(results) {
																				console.log('Loaded code editor extras')
																				self.ready = true;
																				self.beautify();
																}, function(err) {
																				self.ready = true;
																				self.beautify();
																});

								});


				},
				components: {
								// CodeEditor,
				},
				watch: {
								value(value) {

												var self = this;
												// so cursor doesn't jump to start on typing
												if (value !== this.model) {
																this.editor.session.setValue(value);
												}
								},
								model(value) {

												// so cursor doesn't jump to start on typing
												if (value != this.model) {
																this.editor.setContent(this.model)
												}

												// console.log('NEw Code', value)
												this.$emit('input', this.model)
								}
				},
}

</script>
<style scoped lang="scss">
.fluro-code-editor {

				// border: 10px solid #ff0066;
				min-height: 200px;
				display: flex;
				flex-direction: column;

				&>div {
								flex: 1
				}
}

</style>
