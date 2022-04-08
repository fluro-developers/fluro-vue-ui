<template>
	<div @click="$fluro.global.json(item)" class="timeline-entry border-top">
		<v-layout>
			<v-flex shrink>
				<v-container pa-2>
					<div class="timeline-icon">
						<fluro-icon library="far" icon="mobile-alt" />
					</div>
				</v-container>
			</v-flex>
			<v-flex>
				<v-container pa-2>
					<!-- <pre>{{item}}</pre> -->
					<strong>SMS Message</strong>
					<div>{{ item.message }}</div>
					<div class="summary">
						To: <strong>{{ item.number }}</strong> - From: <strong>{{ item.senderName }}</strong> -
						{{ item.date | formatDate('h:mma') }}
					</div>
				</v-container>
			</v-flex>
		</v-layout>
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
	computed: {},
};
</script>
<style scoped lang="scss">
.timeline-entry {
	cursor: pointer;
}
</style>
