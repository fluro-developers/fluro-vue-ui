<template>
	<div>
		<span class="clickable" v-if="canEdit" @click.prevent.stop="edit()">{{ readable }}</span>
		<span v-else>{{ readable }}</span>
	</div>
</template>
<script>
export default {
	props: {
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
	methods: {
		edit() {
			var self = this;
			self.$fluro.types.terms().then(function (glossary) {
				var match = glossary[self.row.definition];
				if (match) {
					self.$fluro.global.edit(match, true);
				}
			});
		},
	},
	computed: {
		canEdit() {
			return this.$fluro.access.can('edit', 'definition');
		},
		readable() {
			var value = this.data || this.row.definition || this.row._type;
			return this.$fluro.types.readable(value);
		},
	},
};
</script>
<style scoped lang="scss">
.clickable {
	cursor: pointer;

	&:hover {
		opacity: 0.8;
	}
}
</style>
