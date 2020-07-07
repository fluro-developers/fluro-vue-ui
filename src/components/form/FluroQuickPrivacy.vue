<template>
	<!-- <div class="privacy-select"> -->
	<!-- <v-menu :close-on-content-click="false" @click.native.stop offset-y> -->
	<!-- <template v-slot:activator="{ on }"> -->
	<!-- v-on="on" -->
	<v-btn @click="toggle()" v-tippy :content="tooltip" :small="small" :block="block">
		<span :class="{'text-muted':model.privacy == 'public'}">
			<fluro-icon :icon="icon" :library="model.privacy  =='public' ? 'far' : 'fas'" /></span>
	</v-btn>
	<!-- </template> -->
	<!-- <v-card tile>
				<v-list dense>
					<v-list-tile @click="model = 'secure'">
						<v-layout>
							<v-flex>
								Secure
							</v-flex>
							<v-flex shrink>
								<fluro-icon icon="lock-alt" right />
							</v-flex>
						</v-layout>
					</v-list-tile>
					<v-list-tile  @click="model = 'public'">
						<v-layout>
							<v-flex>
								Public (anyone can view)
							</v-flex>
							<v-flex shrink>
								<fluro-icon icon="unlock-alt" right />
							</v-flex>
						</v-layout>
					</v-list-tile>
					<!-- <v-divider />
				</v-list>
			</v-card>
		</v-menu> -->
	<!-- <pre>{{type}} {{definition}}</pre> -->
	<!-- </div> -->
</template>
<script>
import Vue from 'vue';
import _ from 'lodash';

///////////////////////////////////////////////

export default {
	props: {
		small: {
			type: Boolean,
		},
		block: {
			type: Boolean,
		},
		'value': {
			type: Object,
			required: true,
		},
	},
	methods: {
		toggle() {
			if (this.model.privacy == 'public') {
				this.$set(this.model, 'privacy', 'secure')
			} else {
				this.$set(this.model, 'privacy', 'public')
			}
		}
	},
	computed: {
		definitionTitle() {

			return this.$fluro.types.readable(this.model.definition || this.model._type || 'node');

		},
		tooltip() {
			return this.model.privacy == 'public' ? `Public - Anyone can view this ${this.definitionTitle}` : `Secure - This ${this.definitionTitle} is secured by permissions`;
		},
		icon() {
			return this.model.privacy == 'public' ? 'lock-open' : 'lock-alt';
		}
	},
	data() {
		return {
			model: this.value,
		}
	},
	watch: {
		'model': function(val) {
			this.$emit('input', val);
		},
		value(v) {
			if (this.model != v) {
				this.model = v;
			}
		}
	},
}

</script>
<style scoped lang="scss">
</style>
