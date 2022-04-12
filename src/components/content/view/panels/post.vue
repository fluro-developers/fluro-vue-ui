<template>
	<flex-column>
		<flex-column-body>
			<v-container>
				<!-- TEST WOOT WOOT -->

				<fluro-panel>
					<fluro-panel-title>
						<strong>In response to</strong>
					</fluro-panel-title>
					<list-group-item @click="view(item, true)" :item="item.parent">
						<template v-slot:right>
							<v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([item.parent])">
								<fluro-icon icon="ellipsis-h" />
							</v-btn>
						</template>
					</list-group-item>
				</fluro-panel>

				<fluro-panel>
					<fluro-panel-title>
						<strong>{{ definition.title }}</strong>
					</fluro-panel-title>
					<fluro-panel-body>
						<fluro-content-render :fields="fields" v-model="item.data" />
					</fluro-panel-body>
					<fluro-panel-body class="border-top">
						<div class="fluro-content-render-field">
							<div class="field-group">
								<label>Created</label>
								<div>
									{{ item.created | formatDate('h:mma - ddd D MMM YYYY') }} ({{
										item.created | timeago
									}})
								</div>
							</div>
						</div>
					</fluro-panel-body>
				</fluro-panel>

				<fluro-panel v-if="item.contact">
					<fluro-panel-title>
						<strong>Created by</strong>
					</fluro-panel-title>
					<list-group-item @click="view(item, true)" :item="item.contact">
						<template v-slot:right>
							<v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([item.contact])">
								<fluro-icon icon="ellipsis-h" />
							</v-btn>
						</template>
					</list-group-item>
				</fluro-panel>
				<!-- <fluro-content-view :id="item.contact._id" :definition="item.contact.definition" :embedded="true" type="contact" /> -->
				<!-- <fluro-content-view :id="item.parent._id" :definition="item.parent.definition" :embedded="true" :type="item.parent._type" /> -->
			</v-container>
		</flex-column-body>
	</flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

import FluroContentViewMixin from '../FluroContentViewMixin.js';
import FluroContentView from '../FluroContentView.vue';
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
		FluroContentView,
	},
	mixins: [FluroContentViewMixin],
	methods: {},
	computed: {
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
