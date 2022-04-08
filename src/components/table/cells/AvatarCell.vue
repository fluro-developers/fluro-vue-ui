<template>
	<div>
		<fluro-avatar v-if="context != 'print'" md :id="id" :type="type" />
		<!-- <pre>{{id}} - {{type}} - {{column.avatarType}}</pre> -->
	</div>

	<!-- <span class="inline-tag" :content="data | timeago" v-tippy>{{data | formatDate('MMM D, YYYY')}}</span> -->
</template>
<script>
export default {
	props: {
		context: {
			type: String,
		},
		row: {
			type: Object,
		},
		column: {
			type: Object,
		},
		data: {
			// type: Object,
		},
	},
	computed: {
		id() {
			switch (this.column.avatarType) {
				case 'auto':
					return this.row.managedAuthor || this.row.author;
					break;
				default:
					return this.data || this.row;
					break;
			}
		},
		type() {
			switch (this.column.avatarType) {
				case 'auto':
					return this.row.managedAuthor ? 'persona' : 'user';
					break;
				// case 'contact':
				// case 'persona':
				// case 'user':
				//     return this.column.avatarType;
				// break;
				default:
					return this.column.avatarType || this.row._type;
					break;
			}
		},
	},
};
</script>
