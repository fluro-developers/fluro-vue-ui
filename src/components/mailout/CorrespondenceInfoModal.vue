<template>
	<!-- <flex-column> -->
	<!-- style="max-width: 500px;" -->
	<flex-column class="modal-size">
		<flex-column-header class="border-bottom">
			<page-header type="mailout">
				<template v-slot:left>
					<h3>{{ item.firstName }} {{ item.lastName }}</h3>
				</template>
				<template v-slot:right>
					<v-btn class="ma-0" small @click="close()"> Close </v-btn>
				</template>
				<template v-slot:rightmobile>
					<v-btn class="ma-0" small @click="close()"> Close </v-btn>
				</template>
			</page-header>
		</flex-column-header>
		<flex-column-body>
			<v-container>
				<v-layout>
					<v-flex xs12 sm6>
						<div class="form-group">
							<label>First Name</label>
							<div>{{ item.firstName }}</div>
						</div>
					</v-flex>
					<v-flex xs12 sm6>
						<div class="form-group">
							<label>Last Name</label>
							<div>{{ item.lastName }}</div>
						</div>
					</v-flex>
				</v-layout>
				<div class="form-group">
					<label>Sent To</label>
					<div>{{ item.email }}</div>
				</div>
				<v-layout>
					<v-flex xs12 sm6>
						<div class="form-group">
							<label>State</label>
							<div>{{ item.state }}</div>
						</div>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex xs12 sm6>
						<div class="form-group">
							<label>Correspondence ID</label>
							<div>{{ item.correspondenceID || item._id }}</div>
						</div>
					</v-flex>
					<v-flex xs12 sm6>
						<div class="form-group">
							<label>Sending Server ID</label>
							<div>{{ item.worker }}</div>
						</div>
					</v-flex>
				</v-layout>
				<fluro-panel>
					<fluro-panel-title>Tracked Events</fluro-panel-title>
					<fluro-table
						:enableSelection="false"
						defaultSort="date"
						defaultSortType="date"
						:pageSize="25"
						style="max-height: 50vh"
						:items="item.trackedEvents"
						:columns="columns"
					/>
				</fluro-panel>
				<!-- <pre>{{item}}</pre> -->
			</v-container>
		</flex-column-body>
	</flex-column>
</template>
<script>
import FluroModalMixin from '../../mixins/ModalMixin';
import FluroTable from '../table/FluroTable.vue';
import DateCell from '../table/cells/DateCell.vue';
import TimeagoCell from '../table/cells/TimeagoCell.vue';
import Vue from 'vue';

var MailoutCorrespondenceTitleCell = Vue.extend({
	props: {
		row: {
			type: Object,
		},
		column: {
			type: Object,
		},
		data: {
			// type: Object,
		},
	},
	template: `<div>
    <strong>{{row.title}}</strong>
    <div class="muted font-xs">{{row.url}}</div>
    </div>`,
});

export default {
	props: {
		options: {
			type: Object,
		},
	},
	components: {
		FluroTable,
	},
	mixins: [FluroModalMixin],
	computed: {
		columns() {
			return [
				{
					title: 'Event',
					key: 'title',
					renderer: MailoutCorrespondenceTitleCell,
				},
				{
					title: 'Date',
					key: 'date',
					sortType: 'date',
					renderer: DateCell,
				},
				{
					title: 'When',
					key: 'date',
					sortType: 'date',
					renderer: TimeagoCell,
				},
			];
		},
		item() {
			return this.options.item;
		},
	},
};
</script>
<style lang="scss" scoped></style>
