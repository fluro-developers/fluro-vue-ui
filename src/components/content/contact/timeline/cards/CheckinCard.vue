<template>
	<div class="checkin-timeline-entry border-top" @click="$fluro.global.edit(item.event, true)">
		<fluro-realm-bar :realm="item.realms" />
		<!-- <v-layout> -->
		<!-- <v-flex shrink> -->

		<!-- <div class="timeline-icon"> -->
		<!-- <fluro-icon type="checkin" /> -->
		<!-- </div> -->
		<!-- </v-container> -->
		<!-- </v-flex> -->
		<!-- <v-flex> -->
		<!-- <v-container pa-2 > -->
		<span class="muted">
			Checked in to <strong @click.prevent.stop="$fluro.global.view(item.event, true)">{{ eventTitle }}</strong> -
			{{ checkinTime }}
		</span>
		<!-- <div class="datestring">{{datestring}}</div> -->
		<!-- </v-container> -->
		<!-- <v-container pa-2> -->
		<!-- <div>{{item.state}}</div> -->
		<!-- <fluro-content-render :fields="definedFields" v-model="item.data" /> -->
		<!-- <pre>{{item}}</pre> -->
		<!-- <div class="summary">{{summary}}</div> -->

		<!-- </v-flex> -->
		<!-- </v-layout> -->
	</div>
</template>
<script>
import FluroRealmBar from '../../../../ui/FluroRealmBar.vue';

export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	components: {
		FluroRealmBar,
	},
	computed: {
		checkinTime() {
			return this.$filters.formatDate(this.item.event.startDate, 'h:mma');
		},
		eventTitle() {
			return this.item.event.title;
		},
		title() {
			return `Checked in to ${this.eventTitle}`;
		},
	},
};
</script>
<style lang="scss">
.checkin-timeline-entry {
	padding: 10px;
	font-style: italic;
	font-size: 0.8em;
}
</style>
