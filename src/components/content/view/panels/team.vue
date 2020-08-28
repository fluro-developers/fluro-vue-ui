<template>
  <flex-column>
    <tabset :justified="true" :vertical="true">
      <tab :heading="`${readableTypeName} Details`" v-if="fields.length">
        <flex-column-body style="background: #fafafa;">
          <v-container fluid>
            <constrain sm>
              <h3>{{item.title}}</h3>
              <div class="font-sm muted">{{item.firstLine}}</div>
              <br />
              <br />
              <template v-if="fields.length">
                <fluro-content-render :fields="fields" v-model="item.data" />
              </template>
            </constrain>
          </v-container>
        </flex-column-body>
      </tab>
      <tab heading="Members">
        <flex-column-body>
          <v-container fluid>
            <constrain sm>
              <search-input placeholder="Search Members" :autofocus="true" v-model="keywords" />
              <fluro-panel v-for="group in groups">
                <fluro-panel-title>
                  <strong>{{group.contacts.length}} {{group.title}}</strong>
                  <span class="muted" v-if="searchWords">Matching: '{{searchWords}}'</span>
                </fluro-panel-title>
                <fluro-table
                  :pageSize="20"
                  :scrollable="false"
                  :items="group.contacts"
                  :columns="columns"
                ></fluro-table>
                <!-- <fluro-panel> -->
                <!-- </fluro-panel> -->
              </fluro-panel>
              <fluro-panel v-if="members.length">
                <fluro-panel-title>
                  <strong>{{members.length}} Provisional Members</strong>
                  <span class="muted" v-if="searchWords">Matching: '{{searchWords}}'</span>
                </fluro-panel-title>
                <fluro-table :pageSize="20" :scrollable="false" :items="members" :columns="columns"></fluro-table>
                <!-- <fluro-panel> -->
                <!-- </fluro-panel> -->
              </fluro-panel>
              <!-- <fluro-content-render :fields="definedFields" v-model="item.data" /> -->
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

import Vue from "vue";
import FluroContentViewMixin from "../FluroContentViewMixin.js";
import TeamMetricsDashboard from "../../../TeamMetricsDashboard.vue";
import FluroTable from "../../../table/FluroTable.vue";
import SearchInput from "../../../ui/SearchInput.vue";
import ContactAvatar from "../../../table/cells/AvatarCell.vue";

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
    readableTypeName() {
      return this.definition
        ? this.$fluro.types.readable(this.definition.title)
        : "Team";
    },
    searchWords() {
      return this.keywords.toLowerCase();
    },
    members() {
      var self = this;

      if (!self.searchWords) {
        return self.item.provisionalMembers || [];
      }

      return _.filter(self.item.provisionalMembers, function (member) {
        return String(member.title).toLowerCase().includes(self.searchWords);
      });
    },
    groups() {
      var self = this;

      var searchWords = self.searchWords;

      var groups = _.chain(self.item.assignments)
        .map(function (assignment) {
          if (!searchWords) {
            return assignment;
          }

          if (assignment.title.toLowerCase().includes(searchWords)) {
            return assignment;
          }

          var contacts = _.filter(assignment.contacts, function (member) {
            return String(member.title).toLowerCase().includes(searchWords);
          });

          if (!contacts.length) {
            return;
          }

          return Object.assign({}, assignment, { contacts });
        })
        .compact()
        .value();

      return groups;
    },
    columns() {
      var array = [];

      array.push({
        title: "",
        key: "_id",
        shrink: true,
        renderer: ContactAvatar,
      });

      array.push({
        title: "Name",
        key: "title",
      });

      return array;
    },
    data() {
      return this.item.data || {};
    },
    definedFields() {
      return this.definition ? this.definition.fields : null;
    },
  },
  data() {
    return {
      keywords: "",
    };
  },
};
</script>
<style scoped lang="scss">
</style>
