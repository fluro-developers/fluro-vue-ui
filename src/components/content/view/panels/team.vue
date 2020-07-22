<template>
				<flex-column>
								<tabset :justified="true" :vertical="true">
												<tab heading="Info">
																<flex-column-body>
																				<v-container fluid>
																								<constrain sm>
																												<search-input placeholder="Search Members" :autofocus="true" v-model="keywords" />
																												<fluro-panel v-for="group in item.assignments">
																																<fluro-panel-title>
																																				<strong>{{group.contacts.length}} {{group.title}}</strong>
																																</fluro-panel-title>
																																<fluro-table :items="group.contacts" :columns="columns">
																																</fluro-table>
																																<!-- <fluro-panel> -->
																																<!-- </fluro-panel> -->
																												</fluro-panel>
																												<fluro-panel>
																																<fluro-panel-title>
																																				<strong>{{item.provisionalMembers.length}} Provisional Members</strong>
																																</fluro-panel-title>
																																<fluro-table :items="item.provisionalMembers" :columns="columns">
																																</fluro-table>
																																<!-- <fluro-panel> -->
																																<!-- </fluro-panel> -->
																												</fluro-panel>
																												<fluro-content-render :fields="definedFields" v-model="item.data" />
																								</constrain>
																				</v-container>
																</flex-column-body>
												</tab>
												<tab heading="Metrics">
																<flex-column-body>
																				<v-container fluid>
																								<!-- <constrain sm> -->
																								<team-metrics-dashboard :id="item" type="team" />
																								<!-- </constrain> -->
																				</v-container>
																</flex-column-body>
												</tab>
								</tabset>
				</flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';
import TeamMetricsDashboard from "src/components/TeamMetricsDashboard.vue";
import FluroTable from "src/components/table/FluroTable.vue";
import SearchInput from "src/components/ui/SearchInput.vue";
import ContactAvatar from "src/components/table/cells/AvatarCell.vue";

/////////////////////////////////

export default {
				components: {
								ContactAvatar,
								SearchInput,
								FluroTable,
								TeamMetricsDashboard,
				},
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
				// components: {
				//     FluroContentRender,
				// },
				mixins: [FluroContentViewMixin],
				methods: {},
				computed: {
								groups() {
												var self = this;


												return self.model.assignments;
								},
								columns() {
												var array = [];


												array.push({
																title: '',
																key: '_id',
																shrink:true,
																renderer:ContactAvatar,
												})


												array.push({
																title: 'Name',
																key: 'title',
												})


												return array;
								},
								data() {
												return this.item.data || {}
								},
								definedFields() {
												return this.definition ? this.definition.fields : null;
								}
				},
				data() {
								return {
												keywords: '',
								}
				},
}

</script>
<style scoped lang="scss">
</style>
