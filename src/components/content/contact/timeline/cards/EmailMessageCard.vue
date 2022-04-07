<template>
	<div @click="$fluro.global.json(item)" class="timeline-entry border-top">
		<v-layout>
			<v-flex shrink>
				<v-container pa-2>
					<div class="timeline-icon">
						<fluro-icon library="far" icon="envelope" />
					</div>
				</v-container>
			</v-flex>
			<v-flex>
				<v-container pa-2>
					<!-- <pre>{{item}}</pre> -->
					<strong>{{ item.subject }}</strong>
					<div v-html="item.body" />
					<div class="summary">
						{{ item.state == 'sent' ? 'sent (unread)' : item.state }} - Sent to:
						<strong>{{ item.toFirstName }} {{ item.toLastName }} ({{ item.toEmail }})</strong> - From:
						<strong>{{ item.fromFirstName }} {{ item.fromLastName }} ({{ item.fromEmail }})</strong> -
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
