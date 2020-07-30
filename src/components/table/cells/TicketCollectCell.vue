<template>
	<div>
		<div class="toggle-switch" :class="{'active':booleanTrue, 'inactive':!booleanTrue}" @click.stop.prevent="toggle()">
			<span class="on">Yes</span>
			<span class="off">No</span>
		</div>
		<fluro-help title="Collect" uid="ticket.collect.cell" body="Shows whether this ticket has been collected by the ticket holder yet or not. Click to collect/uncollect the ticket." />
	</div>
	<!-- <div class="boolean-cell text-xs-center" :class="{'true':booleanTrue, 'false':!booleanTrue}">
            <fluro-icon library="fas" v-if="booleanTrue" icon="check-circle"/>
            <fluro-icon library="far" v-else icon="times"/>
        </div> -->
</template>
<script>
import FluroHelp from '../../FluroHelp.vue';

import _ from 'lodash';

export default {
	components: {
		FluroHelp,
	},
	props: {
		'row': {
			type: Object,
		},
		'column': {
			type: Object,
		},
		'data': {
			// type: Object,
		},
	},
	data() {
		return {
			loading: false,
		}
	},
	watch: {
		loading(v) {
			this.$fluro.global.softLoading = v;
		}
	},
	methods: {
		toggle() {

			var self = this;
			var ticketID = self.$fluro.utils.getStringID(self.row);

			if (self.loading) {
				return;
			}


			self.loading = true;

			//////////////////////////

			if (!self.row.collected) {

				console.log('collect')
				self.$fluro.api.get(`/tickets/collect/${ticketID}`)
					.then(function(res) {

						self.$set(self.row, 'collected', true);
						self.loading = false;
					})
					.catch(function(err) {
						self.$fluro.error(err);
						self.loading = false;
					})
			} else {

				console.log('uncollect')
				self.$fluro.api.delete(`/tickets/collect/${ticketID}`)
					.then(function(res) {
						self.$set(self.row, 'collected', false);
						self.loading = false;
					})
					.catch(function(err) {
						self.$fluro.error(err);
						self.loading = false;
					})
			}
			// $scope.collect = function(item) {
			// 	if (!item || item.collected) {
			// 		return;
			// 	}
			// 	// console.log('COLLECT', item)
			// 	FluroContent.endpoint('tickets/collect/' + item._id).get().$promise.then(function(res) {
			// 		item.collected = true;
			// 		Notifications.status(item.title + ' was collected');
			// 	})
			// }
		}

	},
	computed: {
		booleanTrue() {
			if (_.isString(this.data)) {
				switch (String(this.data).toLowerCase()) {
					case 'true':
					case 'y':
					case 'yes':
						return true;
						break;
					case 'false':
					case 'null':
					case 'undefined':
					case 'n':
					case 'no':
					case '':
						return;
						break;
				}
				return
			}

			return this.data ? true : false;
		}
	}
}

</script>
<style scoped lang="scss">
.toggle-switch {
	flex: none;
	background: #E2E7EE;
	border-radius: 50px;
	height: 23px;
	line-height: 23px;
	min-width: 50px;
	position: relative;
	display: block;
	overflow: hidden;
	text-align: center;
	letter-spacing: 0.03em;
	font-size: 0.8em;
	font-weight: 600;
	text-transform: uppercase;
	box-shadow: inset 0px 2px 3px rgba(0, 0, 0, 0.2);
	font-style: normal;
	// border-top:1px solid rgba(#000, 0.05);
	border-bottom: 1px solid rgba(#fff, 0.5);

	.off {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 50px;
		// background: $brand-primary;
		// color: #fff;
		transform: translateX(-100%);
		transition: all 0.5s;
		pointer-events: none;
		opacity: 0.5;
	}

	.on {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 50px;
		background: $success;
		color: #fff;
		transform: translateX(0);
		transition: all 0.5s;
		pointer-events: none;
		box-shadow: inset 0px 4px 5px rgba(0, 0, 0, 0.1);
	}


	&.inactive {
		.off {
			transform: translateX(0);
		}

		.on {
			transform: translateX(100%);
		}
	}





}

</style>
