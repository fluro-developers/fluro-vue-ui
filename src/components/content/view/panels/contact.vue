<template>
	<flex-column-body>
		<v-container>
			<v-layout align-center row wrap>
				<v-flex shrink>
					<fluro-avatar left xl :id="item" type="contact"></fluro-avatar>
				</v-flex>
				<v-flex>
					<h3>{{ item.title }}</h3>
					<h6>{{ item.definition || item._type | definitionTitle }}</h6>
					<div class="muted">{{ item.gender }}</div>
					<div class="muted">{{ item.age }}</div>
					<Div>
						<v-btn
							v-if="$fluro.access.canViewItem(item)"
							small
							class="ma-0"
							@click="$fluro.global.view(item, true)"
						>
							View Profile
							<fluro-icon icon="view" />
						</v-btn>
						<v-btn
							v-if="$fluro.access.canEditItem(item)"
							small
							class="ma-0"
							@click="$fluro.global.edit(item, true)"
						>
							Edit Profile
							<fluro-icon icon="pencil" />
						</v-btn>
					</Div>
				</v-flex>
				<v-flex class="text-xs-center">
					<v-btn
						class="ma-0 mx-1 ml-0"
						:disabled="!canEmail"
						@click="communicate('email')"
						icon
						color="primary"
						content="Send Email"
						v-tippy
					>
						<fluro-icon library="fas" icon="envelope" />
					</v-btn>
					<template v-if="isNotSubsplash">
						<v-btn
							class="ma-0 mx-1"
							:disabled="!canSMS"
							@click="communicate('sms')"
							icon
							color="primary"
							content="Send SMS"
							v-tippy
						>
							<fluro-icon library="fas" icon="comment" />
						</v-btn>
					</template>
					<v-btn
						class="ma-0 mx-1"
						:disabled="!canCall"
						@click="communicate('phone')"
						icon
						color="primary"
						content="Call"
						v-tippy
					>
						<fluro-icon library="fas" icon="phone" />
					</v-btn>
					<v-btn
						class="ma-0 mx-1"
						:disabled="!canPost"
						@click="addPost"
						icon
						color="primary"
						content="Add Post/Note"
						v-tippy
					>
						<fluro-icon library="fas" type="post" />
					</v-btn>
					<v-btn
						class="ma-0 mx-1 mr-0"
						icon
						color="primary"
						@click="communicate('vcard')"
						content="Add to Address Book"
						v-tippy
					>
						<!-- <fluro-icon library="fas" icon="id-card" /> -->
						<fluro-icon library="fas" icon="address-book" />
					</v-btn>
				</v-flex>
			</v-layout>
			<!-- <h5></h5> -->
			<!-- <pre>{{item}}</pre> -->
		</v-container>
	</flex-column-body>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

import FluroContactCommunicateMixin from '../../../../mixins/FluroContactCommunicateMixin';
import FluroContentViewMixin from '../FluroContentViewMixin.js';
import FluroAvatar from '../../../FluroAvatar.vue';

/////////////////////////////////

export default {
	props: {
		config: {
			type: Object,
			required: true,
		},
		item: {
			type: Object,
			required: true,
		},
	},
	components: {
		FluroAvatar,
	},
	mixins: [FluroContentViewMixin, FluroContactCommunicateMixin],
	methods: {},
	computed: {
		isNotSubsplash() {
			return this.uiMode != 'subsplash';
		},
		data() {
			return this.item.data || {};
		},
		fields() {
			return this.config.definition.fields;
		},
	},
	data() {
		return {};
	},
};
</script>
<style scoped lang="scss"></style>
