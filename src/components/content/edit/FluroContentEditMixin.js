import FluroContentForm from 'src/components/form/FluroContentForm.vue';
import FluroContentFormField from "src/components/form/FluroContentFormField.vue";
import FluroPrivacySelect from "src/components/form/FluroPrivacySelect.vue";
import FluroHelp from 'src/components/FluroHelp.vue';

export default {
	props: {
		config: {
			type: Object,
			required: true,
		},
		context: {
			type: String,
			default: 'new'
		},
		save:{
			type:Function,
		},
	},
	data() {
		return {
			loading: false,
		}
	},
	mounted() {
		this.$set(this.model, '_type', this.config.type.definitionName);
	},
	extends: FluroContentForm,
	components: {
		'help': FluroHelp,
		FluroContentForm,
		FluroContentFormField,
		FluroPrivacySelect,
	},
	// mixins: [Layout],
	computed: {
		type() {
			return this.config.type;
		},
		typeName() {
			return this.type ? this.type.definitionName : '';
		},
		itemID() {
			return this.model._id;
		},
		definition() {
			return this.config.definition;
		},
		definedFields() {
			if (this.definition && this.definition.fields && this.definition.fields.length) {
				return this.definition.fields;
			}

			return [];
		},
		readableContentType() {
			return this.$fluro.types.readable(this.config.definition ? this.config.definition.definitionName : this.config.type.definitionName)
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
		}
	},
	methods: {

	}
}
