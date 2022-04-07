<template>
	<div v-if="context != 'print'">
		<template v-if="multiple">
			<template v-for="entry in data">
				<fluro-avatar v-tippy :content="entry.firstName || entry.title" md :id="entry" type="contact" />
			</template>
		</template>
		<template v-else>
			<fluro-avatar v-if="data" md v-tippy :content="data.firstName || data.title" :id="data" type="contact" />
		</template>
	</div>
	<!-- <span class="inline-tag" :content="data | timeago" v-tippy>{{data | formatDate('MMM D, YYYY')}}</span> -->
</template>
<script>
import _ from 'lodash';

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
		multiple() {
			return _.isArray(this.data);
		},
	},
};
</script>
