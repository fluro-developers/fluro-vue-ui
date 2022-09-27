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

		&:hover {
			background-color: #fafbfc;
		}

		&:active {
			background-color: #f5f6f7;
		}
	}
}

.fluro-status-select {
	cursor: pointer;
	display: inline-block;
	height: 25px;
	line-height: 25px;
	vertical-align: middle;
	width: 100px;

	.status-label {
		border-radius: 24px;
		display: block;
		font-size: 11px;
		margin: 0;
		padding: 0;
		text-align: center;
	}
}
</style>
