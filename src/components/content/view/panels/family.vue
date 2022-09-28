<template>
	<flex-column>
		<flex-column-body style="background: #fff">
			<v-container fluid grid-list-lg>
				<constrain sm>
					<v-layout row wrap>
						<v-flex xs12 sm6 v-if="item.emails && item.emails.length">
							<v-input class="no-flex">
								<v-label>Email Addresses</v-label>
								<div v-for="email in item.emails" :key="email._id">
									<a :href="`mailto:${email}`">
										<fluro-icon icon="envelope" left />
										{{ email }}
									</a>
								</div>
							</v-input>
						</v-flex>
						<v-flex xs12 sm6 v-if="item.phoneNumbers && item.phoneNumbers.length">
							<v-input class="no-flex">
								<v-label>Phone Numbers</v-label>
								<div v-for="number in item.phoneNumbers" :key="number._id">
									<a :href="`tel:${number}`">
										<fluro-icon icon="phone" left />
										{{ number }}
									</a>
								</div>
							</v-input>
						</v-flex>
					</v-layout>
					<!-- <fluro-panel> -->
					<!-- <fluro-panel-title> -->
					<h4>{{ activeContacts.length }} Family Members</h4>
					<!-- </fluro-panel-title> -->
					<list-group>
						<!-- <fluro-panel-body> -->
						<list-group-item
							:item="contact"
							:key="contact._id"
							@click="$fluro.global.view(contact, true)"
							v-for="contact in activeContacts"
						>
							<template v-slot:right>
								<v-btn class="ma-0" icon small flat @click.stop.prevent="$actions.open([contact])">
									<fluro-icon icon="ellipsis-h" />
								</v-btn>
							</template>
						</list-group-item>
						<!-- </fluro-panel-body> -->
					</list-group>
					<!-- </fluro-panel> -->
					<fluro-panel v-if="item.address">
						<fluro-panel-title>Home Address</fluro-panel-title>
						<fluro-panel-body>
							<v-input class="no-flex" v-if="item.address.addressLine1">
								<v-label>Address Line 1</v-label>
								<div>{{ item.address.addressLine1 }}</div>
							</v-input>
							<v-input class="no-flex" v-if="item.address.addressLine2">
								<v-label>Address Line 2</v-label>
								<div>{{ item.address.addressLine2 }}</div>
							</v-input>
							<v-layout row wrap>
								<v-flex xs12 sm3 v-if="item.address.suburb">
									<v-input class="no-flex">
										<v-label>Suburb</v-label>
										<div>{{ item.address.suburb }}</div>
									</v-input>
								</v-flex>
								<v-flex xs12 sm3 v-if="item.address.state">
									<v-input class="no-flex">
										<v-label>State</v-label>
										<div>{{ item.address.state }}</div>
									</v-input>
								</v-flex>
								<v-flex xs12 sm3 v-if="item.address.postalCode">
									<v-input class="no-flex">
										<v-label>Postal Code</v-label>
										<div>{{ item.address.postalCode }}</div>
									</v-input>
								</v-flex>
								<v-flex xs12 sm3 v-if="item.address.country">
									<v-input class="no-flex">
										<v-label>Country</v-label>
										<div>{{ item.address.country }}</div>
									</v-input>
								</v-flex>
							</v-layout>
						</fluro-panel-body>
					</fluro-panel>
					<template v-if="item.postalAddress">
						<fluro-panel v-if="!item.samePostal">
							<fluro-panel-title>Postal Address</fluro-panel-title>
							<fluro-panel-body>
								<v-input class="no-flex" v-if="item.postalAddress.addressLine1">
									<v-label>Address Line 1</v-label>
									<div>{{ item.postalAddress.addressLine1 }}</div>
								</v-input>
								<v-input class="no-flex" v-if="item.postalAddress.addressLine2">
									<v-label>Address Line 2</v-label>
									<div>{{ item.postalAddress.addressLine2 }}</div>
								</v-input>
								<v-layout row wrap>
									<v-flex xs12 sm3 v-if="item.postalAddress.suburb">
										<v-input class="no-flex">
											<v-label>Suburb</v-label>
											<div>{{ item.postalAddress.suburb }}</div>
										</v-input>
									</v-flex>
									<v-flex xs12 sm3 v-if="item.postalAddress.state">
										<v-input class="no-flex">
											<v-label>State</v-label>
											<div>{{ item.postalAddress.state }}</div>
										</v-input>
									</v-flex>
									<v-flex xs12 sm3 v-if="item.postalAddress.postalCode">
										<v-input class="no-flex">
											<v-label>Postal Code</v-label>
											<div>{{ item.postalAddress.postalCode }}</div>
										</v-input>
									</v-flex>
									<v-flex xs12 sm3 v-if="item.postalAddress.country">
										<v-input class="no-flex">
											<v-label>Country</v-label>
											<div>{{ item.postalAddress.country }}</div>
										</v-input>
									</v-flex>
								</v-layout>
							</fluro-panel-body>
						</fluro-panel>
					</template>
					<template v-if="fields && fields.length">
						<fluro-content-render :fields="fields" v-model="item.data" />
					</template>
					<h4>Posts</h4>
					<item-post-thread :item="item" />
				</constrain>
			</v-container>
		</flex-column-body>
	</flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

import FluroContentViewMixin from '../FluroContentViewMixin.js';
import ItemPostThread from '../../ItemPostThread';
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
		ItemPostThread,
	},
	mixins: [FluroContentViewMixin],
	methods: {},
	computed: {
		activeContacts() {
			var self = this;
			return _.filter(self.item.items, function (contact) {
				return contact.status != 'deleted' && contact.status != 'deceased';
			});
		},
	},
	data() {
		return {};
	},
};
</script>
<style scoped lang="scss">
a {
	color: inherit;
	text-decoration: none;
	cursor: pointer;
}
</style>
