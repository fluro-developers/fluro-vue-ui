


import AssetReplaceUpload from 'src/components/content/edit/components/AssetReplaceUpload.vue';



export default {
	data() {
		return {
			file:null,
		}
	},
	methods:{
		fileSelected(file) {
			var self = this;
			console.log('file selected inside asset form!');
			self.file = file;
			self.$emit('file', file);
		},
	},
    components: {
        AssetReplaceUpload,
    },
    computed: {
        uploadSave() {
            return !this.itemID && this.item.assetType == 'upload';
        }
    },
}