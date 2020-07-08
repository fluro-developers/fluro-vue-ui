<template>
	<div>
		<strong>{{row.title}}</strong><br />
		<em class="muted font-xs">{{readableEventDate}}</em>
		<div v-if="row.firstLine"><em class="muted font-xs">{{row.firstLine | limit(100)}}</em> </div>
		<div v-if="row.rooms && row.rooms.length" class="muted font-xs"><strong>Rooms:</strong> <em>{{row.rooms | comma('title')}}</em></div>
	</div>
</template>
<script>
export default {
	props: {
		'row': {
			type: Object,
		},
		'column': {
			type: Object,
		},
		'data': {
			// type: Object,
		},
	},
	computed: {
		readableEventDate() {
			return this.$fluro.date.readableEventDate(this.row);
		},
	},
}

</script>
<style lang="scss">
</style>
