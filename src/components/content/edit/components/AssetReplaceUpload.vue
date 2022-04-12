<template>
	<v-input class="no-flex" :label="label">
		<div class="file-items" v-if="files.length">
			<div class="file-item" v-for="file in files">
				<v-layout row wrap>
					<v-flex grow>
						<strong>{{ file.name }}</strong>
						<div class="small">
							<span v-if="file.state == 'progress'">Uploaded {{ file.progress }}% of </span
							><span class="muted">{{ file.size | filesize }}</span>
						</div>
					</v-flex>
					<v-flex shrink>
						<template v-if="file.state == 'error'">
							<v-btn icon>
								<fluro-icon icon="exclamation" />
							</v-btn>
						</template>
						<template v-else-if="file.state == 'complete'">
							<v-hover>
								<v-btn icon @click="removeFile(file)" slot-scope="{ hover }">
									<fluro-icon v-if="hover" icon="times" />
									<fluro-icon v-else icon="check" />
								</v-btn>
							</v-hover>
						</template>
						<template v-else-if="file.state == 'uploading'">
							<v-hover>
								<v-btn icon @click="removeFile(file)" slot-scope="{ hover }">
									<v-progress-circular v-if="!hover" :value="file.progress"></v-progress-circular>
									<fluro-icon v-if="hover" icon="times" />
								</v-btn>
							</v-hover>
						</template>
						<template v-else>
							<v-btn icon @click="removeFile(file)">
								<fluro-icon icon="times" />
							</v-btn>
						</template>
					</v-flex>
				</v-layout>
			</div>
		</div>
		<!-- <pre>{{files}}</pre> -->
		<!-- <v-progress-linear class="total-progress" color="primary" v-model="progress"></v-progress-linear> -->
		<!-- <div class="dropbox" v-show="!files.length"> -->
		<!-- accept="image/*" -->

		<label
			class="file-drop"
			:class="{ active: dragging }"
			v-if="!files.length"
			@dragover.prevent.stop="fileover"
			@dragleave.prevent.stop="fileout"
			@drop.prevent.stop="filedrop"
		>
			<input ref="file" type="file" :accept="acceptedFileTypes" @change="fileSelected($event.target)" />
			{{ description }}
		</label>
	</v-input>
</template>
<script>
import _ from 'lodash';

export default {
	props: {
		value: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			files: [],
			dragging: false,
		};
	},
	computed: {
		acceptedFileTypes() {
			switch (this.value._type) {
				case 'image':
					return ' image/*';
					break;
				case 'video':
					return ' video/*';
					break;
				case 'audio':
					return ' audio/*';
					break;
				default:
					break;
			}
		},
		description() {
			if (this.value._id) {
				// Drag and drop a file or click to select
				return `Click or drag here to upload a new ${this.type} file`;
			} else {
				return `Click or drag here to upload a new ${this.type} file`;
			}
		},
		label() {
			if (this.value._id) {
				return `Replace with file`;
			} else {
				return `Select ${this.value._type || ''} File`;
			}
		},
		type() {
			return this.value._type || '';
		},
	},
	methods: {
		removeFile(file) {
			var self = this;

			//If the file is halfway through uploading
			if (file.cancelToken) {
				//Cancel the file
				file.cancelToken.cancel('Operation canceled by the user.');
			}

			//////////////////////////////////

			//Remove it from the list
			self.files.splice(self.files.indexOf(file), 1);

			self.$emit('file', null);
			// self.mapFilesToValues();
		},
		filedrop(e) {
			console.log('FILEDROP AT FIELD LEVEL');
			var self = this;
			if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
				e.preventDefault();
				e.stopPropagation();
				self.filesSelected(e.dataTransfer.files);
			}
			this.dragging = false;
		},
		fileout() {
			console.log('FILEOUT AT FIELD LEVEL');
			this.dragging = false;
		},
		fileover(e) {
			console.log('FILEOVER AT FIELD LEVEL');

			if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
				// console.log('FILE OVER', e.dataTransfer);
				e.preventDefault();
				e.stopPropagation();
			}

			this.dragging = true;
		},
		filesSelected(list) {
			var self = this;
			self.dragging = false;
			/////////////////////////////////////////

			//Update our files list
			var newFiles = _.map(list, function (file) {
				return {
					file,
					data: {},
					name: file.name,
					size: file.size,
				};
			});

			//Update the files
			self.files = _.chain(self.files.concat(newFiles))
				.compact()
				.uniqBy(function (file) {
					return file.name;
				})
				.value();

			//Only allow a single file
			self.files = self.files.slice(0, 1);
			self.$emit('file', self.files[0]);

			//Clear out the files
			self.$refs.file.value = null;

			if (self.value._id) {
				self.upload();
			}
		},

		fileSelected(field) {
			console.log('FILE SELECTED', field);
			var self = this;

			var list = field.files;
			if (!list.length) return;

			self.filesSelected(list);
		},
		upload() {
			var self = this;
			var file = this.files[0];

			switch (file.state) {
				case 'complete':
				case 'uploading':
					//Stop here if it's already in uploading or complete
					return;
					break;
				default:
					break;
			}

			/////////////////////////////////////////////

			//Change the state to uploading
			file.state = 'uploading';

			//Create a new form object
			var formData = new FormData();
			var jsonData = {};

			if (self.value && self.value._id) {
				jsonData._id = self.value._id;
			}

			formData.append('json', JSON.stringify(jsonData));
			formData.append('file', file.file, file.name);

			/////////////////////////////////////////////

			self.$forceUpdate();

			var body = formData;
			var config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
					// do whatever you like with the percentage complete
					// maybe dispatch an action that will update a progress bar or something
					file.progress = percentCompleted;
					file.bytesLoaded = progressEvent.loaded;
					file.bytesTotal = progressEvent.total;

					///////////////////////////////////////////////////

					//Update the bytes loaded from all the files in the array
					self.bytesLoaded = _.reduce(
						self.files,
						function (set, file) {
							if (file.state == 'complete') {
								set += file.size || file.bytesTotal || 0;
							} else {
								set += file.bytesLoaded || 0;
							}
							return set;
						},
						0
					);

					///////////////////////////////////////////////////

					self.$forceUpdate();
				},
			};

			///////////////////////////////////////////////////

			const CancelToken = self.$fluro.api.CancelToken;
			const source = CancelToken.source();
			config.cancelToken = source.token;
			file.cancelToken = source;

			//Set headers to undefined content type
			config.headers = {
				'Content-Type': undefined,
			};

			///////////////////////////////////////////////////

			// console.log('Uploading to ', self.field.params)
			return this.$fluro.api
				.post(`/file/upload`, body, config)
				.then(function (res) {
					//console.log('UPLOAD RESPONSE', res);
					file.state = 'complete';
					file.result = res.data;
					file.cancelToken = null;
					self.$emit('input', res.data);
				})
				.catch(function (err) {
					//console.log('UPLOAD Error', err);
					file.state = 'error';
					file.cancelToken = null;
					self.$fluro.error(err);
				});
		},
	},
};
</script>
<style lang="scss">
.file-drop {
	display: block;
	position: relative;
	border: 1px dashed rgba(#000, 0.2);
	background: rgba(#000, 0.05);
	padding: 10px;
	border-radius: 10px;
	text-align: center;
	min-height: 60px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.8;
	font-style: italic;
	color: rgba(#000, 0.5);
	margin-bottom: 5px;

	&:hover,
	&:focus,
	&:active,
	&.active {
		background: rgba($primary, 0.1); //#fff;
		color: $primary;
		border-color: $primary;
	}

	input {
		display: block;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		opacity: 0; //.8; //.5;
		// background: #000;
		/* invisible but it's there! */
		width: 100%;
		height: 100%;
		// height: 200px;
		position: absolute;
		cursor: pointer;
	}
}

.file-items {
	margin-bottom: 15px;

	.file-item {
		position: relative;
		padding: 5px 5px 5px 15px;
		border: 1px solid rgba(#000, 0.2);
		border-bottom: none;
		background: #fff;
		font-size: 0.9em;

		&:first-child {
			border-radius: 5px 5px 0 0;
		}

		&:last-child {
			border-bottom: 1px solid rgba(#000, 0.2);
			border-radius: 0 0 5px 5px;
		}
	}
}
</style>
