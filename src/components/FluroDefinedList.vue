<template>
	<div class="fluro-defined-list" v-if="grouped && grouped.length">
		<v-input v-for="(group, i) in grouped" class="no-flex" :key="i">
			<v-label>{{ group.plural }}</v-label>
			<!-- <pre>{{group}}</pre> -->
			<div class="inline-tags">
				<a
					class="inline-tag"
					:style="{ backgroundColor: entry.bgColor, color: entry.color }"
					@click="clicked(entry)"
					v-for="(entry, j) in group.entries"
					:key="j"
				>
					<fluro-icon :type="type" v-if="type" /> {{ entry.title }}
				</a>
			</div>
		</v-input>
	</div>
</template>
<script>
import _ from 'lodash';

//////////////////////////////////////////////////

export default {
	props: {
		label: {
			type: String,
		},
		type: {
			type: String,
			default() {
				return 'item';
			},
		},
		items: {
			type: Array,
		},
	},
	methods: {
		clicked(item) {
			this.$emit('click', item);
		},
	},
	computed: {
		grouped() {
			var self = this;
			var mapped = self.$fluro.types.mapDefinitionItems(_.orderBy(self.items, 'title'), self.type);

			return mapped;
		},
	},
};
</script>
<style scoped lang="scss">
.fluro-content-form {
}

.fluro-content-render {
	flex: 1;
}
</style>
