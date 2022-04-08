<template>
	<v-menu @click.native.stop offset-y>
		<template v-slot:activator="{ on }">
			<div class="fluro-status-select" v-on="on">
				<fluro-status-label :value="value" />
			</div>
		</template>
		<div class="status-options">
			<div class="option-item" :class="option.value" @click="setStatus(option.value)" v-for="option in options">
				{{ option.title }}
			</div>
		</div>
		<!-- <v-card tile>
            <v-list dense>
                <v-list-tile @click="setStatus(option)" v-for="option in options">
                    <v-list-tile-content>
                        <v-list-tile-title :class="option">
                            {{option}}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card> -->
	</v-menu>
</template>
<script>
import FluroStatusLabel from '../ui/FluroStatusLabel.vue';
export default {
	components: {
		FluroStatusLabel,
	},
	props: {
		value: {
			type: String,
			default() {
				return 'active';
			},
		},
		type: {
			type: String,
		},
	},
	data() {
		return {
			status: this.value,
		};
	},
	methods: {
		setStatus(value) {
			this.status = value;
			this.$emit('input', value);
		},
	},
	computed: {
		options() {
			var self = this;
			var array = [];

			switch (self.type) {
				case 'interaction':
					array.push({ title: `Active`, value: 'active' });
					array.push({ title: `Draft / Sandbox`, value: 'draft' });
					array.push({ title: `Archived`, value: 'archived' });
					array.push({ title: `Cancelled`, value: 'cancelled' });
					break;
				case 'purchase':
					array.push({ title: `Active`, value: 'active' });
					array.push({ title: `Cancelled`, value: 'cancelled' });
					array.push({ title: `Expired`, value: 'expired' });
					break;

				case 'account':
					array.push({ title: `Active`, value: 'active' });
					array.push({ title: `Cancelled`, value: 'cancelled' });
					array.push({ title: `On Hold`, value: 'onhold' });
					array.push({ title: `Exempt`, value: 'exempt' });
					array.push({ title: `Trial`, value: 'trial' });
					break;
				case 'plan':
					array.push({ title: `Active`, value: 'active' });
					array.push({ title: `Draft`, value: 'draft' });
					array.push({ title: `Archived`, value: 'archived' });
					array.push({ title: `Template`, value: 'template' });
					break;

				case 'contact':
					array.push({ title: `Active`, value: 'active' });
					array.push({ title: `Draft / Incomplete`, value: 'draft' });
					array.push({ title: `Archived`, value: 'archived' });
					break;
				default:
					array.push({ title: `Active`, value: 'active' });
					array.push({ title: `Draft`, value: 'draft' });
					array.push({ title: `Archived`, value: 'archived' });
					break;
			}

			return array;
		},
	},
};
</script>
<style lang="scss">
.status-options {
	background: #fff;

	.option-item {
		cursor: pointer;
		font-size: 0.8em;
		padding: 10px;
		display: block;
		border-bottom: 1px solid rgba(#000, 0.1);
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 0.03em;

		&.draft,
		&.trial,
		&.sent,
		&.sandbox,
		&.scheduled,
		&.yellow,
		&.partial_refund,
		&.warning {
			background: #fff3b9 !important;
			color: #f0974e !important;
		}

		&.delivered,
		&.click,
		&.open,
		&.live,
		&.ready,
		&.active,
		&.green,
		&.success {
			background: rgba(#51d432, 0.2) !important;
			color: #51d432 !important;
		}

		&.error,
		&.failed,
		&.red,
		&.danger {
			background: rgba(#bb0010, 0.2) !important;
			color: #bb0010 !important;
		}

		&.refund,
		&.archived,
		&.unsubscribe,
		&.sent {
			background: rgba(#000, 0.05) !important;
			color: rgba(#000, 0.3) !important;
			// background: #e9ebee;
			// color: #b4b7bd;
		}
	}
}

.fluro-status-select {
	display: inline-block;
	width: 100px;
	height: 25px;
	line-height: 25px;
	// margin: 0 10px;
	vertical-align: middle;

	.status-label {
		margin: 0;
		border-radius: 3px;
		display: block;
		text-align: center;
		padding: 0;

		// line-height: 22px;
		font-size: 11px;
	}
}
</style>
