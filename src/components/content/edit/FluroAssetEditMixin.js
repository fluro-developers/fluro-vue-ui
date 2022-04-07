import AssetReplaceUpload from './components/AssetReplaceUpload.vue';

export default {
	data() {
		return {
			file: null,
			dragging: false,
		};
	},
	methods: {
		fileSelected(file) {
			var self = this;
			console.log('file selected inside asset form!');
			self.file = file;
			self.$emit('file', file);
		},
		fileDropped(file) {
			var self = this;

			if (self.model.assetType != 'upload') {
				self.model.assetType = 'upload';
			}
			self.$nextTick(function () {
				console.log('DROPPED', self.$refs.replaceForm);
				if (!self.$refs.replaceForm || !self.$refs.replaceForm.fileSelected) {
					return console.log('DROP ERROR NO REPLACE FORM');
				}

				self.$refs.replaceForm.filesSelected([file]);
			});
		},
		filedrop(e) {
			console.log('FILEDROP AT EDIT LEVEL');
			var self = this;
			if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
				e.preventDefault();
				e.stopPropagation();
				self.fileDropped(e.dataTransfer.files[0]);
			}
			this.dragging = false;
		},
		fileout() {
			console.log('FILEOUT AT EDIT LEVEL');
			this.dragging = false;
		},
		fileover(e) {
			console.log('FILEOVER AT EDIT LEVEL');

			if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
				// console.log('FILE OVER', e.dataTransfer);
				e.preventDefault();
				e.stopPropagation();
			}
			this.dragging = true;
		},
	},
	components: {
		AssetReplaceUpload,
	},
	computed: {
		uploadSave() {
			return !this.itemID && this.item.assetType == 'upload';
		},
	},
};
