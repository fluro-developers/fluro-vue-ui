<template>
	<div>
		<div>
			<strong>{{ rendered }}</strong>
		</div>
		<div class="font-xs muted" v-if="showTimezone">{{ row.timezone }}</div>
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
	computed: {
		showTimezone() {
			var timezone = this.row.timezone;
			if (!timezone) {
				return;
			}

			return this.$fluro.date.isDifferentTimezoneThanUser(timezone);
		},
		timezone() {
			return this.row.timezone;
		},
		rendered() {
			var self = this;
			var startDate = self.data;

			if (self.showTimezone) {
				return self.$fluro.date.formatDate(self.data, 'dddd', self.timezone);
			} else {
				return self.$fluro.date.formatDate(self.data, 'dddd');
			}
		},
	},
};
</script>
<style lang="scss"></style>
