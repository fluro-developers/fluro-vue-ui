<template>
	<flex-column style="background: #ccc; position: relative">
		<fluro-page-preloader contain v-if="!loaded" />
		<iframe ref="iframe" @load="loaded = true" class="mailout-preview-frame" :src="url" />
	</flex-column>
</template>
<script>
export default {
	props: {
		mailout: {
			type: String,
		},
		cacheKey: {
			type: [String, Number],
		},
		live: {
			type: Boolean,
		},
		definition: {
			type: String,
		},
	},
	data() {
		return {
			loaded: false,
		};
	},
	computed: {
		currentUser() {
			return this.$fluro.auth.getCurrentUser();
		},
		currentToken() {
			var userToken = this.currentUser ? this.currentUser.token : null;
			var applicationToken = this.$fluro.applicationToken;

			return userToken || applicationToken;
		},
		params() {
			return {
				mailout: this.mailout,
				cb: this.cacheKey,
				live: this.live,
				access_token: this.currentToken,
			};
		},
		url() {
			this.loaded = false;
			var url = `${this.$fluro.apiURL}/mailout/render/${this.definition}`;
			var queryParameters = this.$fluro.utils.mapParameters(this.params);
			return `${url}?${queryParameters}`;
		},
	},
};
</script>
<style lang="scss" scoped>
iframe.mailout-preview-frame {
	border: none;
	flex: 1;
	min-height: 80vh;
}
</style>
