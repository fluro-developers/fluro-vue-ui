<template>
	<div>
		<template v-if="isArray">
			<span class="inline-tag" v-for="date in rendered" :content="dateTooltip(date)" v-tippy>{{
				formatted(date)
			}}</span>
		</template>
		<template v-else-if="rendered">
			<span :class="{ 'inline-tag': !column.format }" v-if="rendered" :content="dateTooltip(rendered)" v-tippy>{{
				formatted(rendered)
			}}</span>
		</template>
		<div class="font-xs muted" v-if="showTimezone">{{ row.timezone }}</div>
	</div>
</template>
<script>
import _ from 'lodash';

function mapDate(entry) {
	if (!entry) {
		return;
	}
	var date = new Date(entry);
	var isValid = date instanceof Date && !isNaN(date);
	if (isValid) {
		return date;
	} else {
		return `Invalid date ${entry}`;
	}
}

export default {
	props: {
		row: {
			type: Object,
		},
		column: {
			type: Object,
		},
		data: {},
	},
	methods: {
		dateTooltip(date) {
			var self = this;
			if (self.column.key === 'dateOfBirth') return this.$fluro.date.moment(date).utc().endOf('day').fromNow();

			return `${self.$fluro.date.formatDate(date, 'h:mma')} - ${self.$fluro.date.timeago(date)}`;
		},
		formatted(date) {
			var self = this;
			const adjustedDate =
				self.column.key === 'dateOfBirth' ? self.$fluro.date.moment(date).utc() : self.$fluro.date.moment(date);

			if (self.showTimezone) {
				return adjustedDate.format(self.format, self.timezone);
			} else {
				return adjustedDate.format(self.format);
			}
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
		format() {
			if (this.column && this.column.format) {
				return this.column.format;
			}

			return 'MMM D, YYYY';
		},
		isArray() {
			return _.isArray(this.data);
		},
		rendered() {
			var self = this;

			if (!self.data) {
				return;
			}

			if (_.isArray(self.data)) {
				var array = _.chain(self.data).compact().map(mapDate).value();

				if (array.length) {
					return array;
				} else {
					return;
				}
			} else {
				return self.data ? mapDate(self.data) : false;
			}
		},
	},
};
</script>
<style scoped lang="scss">
span {
	white-space: nowrap;
}
</style>
