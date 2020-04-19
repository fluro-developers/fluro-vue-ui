<template>
    <flex-column class="contact-team-list">
        <flex-column-body>
             <v-container fluid>
        <contact-group-manager v-model="contact" />
    </v-container>
    </flex-column-body>
        <!-- <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <flex-column-body style="background: #eee;">
                <v-container v-for="group in teamGroups">
                    <h4 margin>{{group.title}}</h4>
                    <template v-for="team in group.teams">
                        <list-group-item :item="team" :firstLine="team.positions | comma">
                            <template v-slot:right>
                                <v-menu :left="true" v-model="actionIndexes[team._id]" :fixed="true" transition="slide-y-transition" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="ma-0" icon small flat v-on="on">
                                            <fluro-icon v-if="actionIndexes[team._id]" icon="times" />
                                            <fluro-icon v-else icon="ellipsis-h" />
                                        </v-btn>
                                    </template>
                                    <v-list dense>
                                        <v-list-tile @click="$actions.open([team])">
                                            <v-list-tile-content>Actions</v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile @click="leave(team)">
                                            <v-list-tile-content>Remove {{model.firstName}} from group</v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                                <v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([team])">
                                    <fluro-icon icon="ellipsis-h" />
                                </v-btn>
                            </template>
                        </list-group-item>
                    </template>
                </v-container>
            </flex-column-body>
        </template> -->
    </flex-column>
</template>
<script>
export default {
    props: {
        contact: {
            type: Object,
        }
    },
    components: {
        ContactGroupManager: () => import('../../edit/components/ContactGroupManager.vue'),
    },
    /**
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        edit(sheet) {

            var self = this;

            self.$fluro.global.edit(sheet, true)
                .then(function(response) {
                    console.log('RESPONSE!', response, sheet)
                    self.$set(sheet, 'data', response.data);
                })
        },
        create(definition) {

            var self = this;
            var options = {
                definition,
                item: self.contact,
            }

            ///////////////////////////

            var promise = self.$fluro.modal({
                    component: AddPost,
                    options,
                })
                .then(function() {
                    self.$fluro.resetCache();
                });


        },
    },
    computed: {

        teamGroups() {

            var self = this;

            ////////////////////////////////////////////////////

            var allSets = _.reduce(self.teamDefinitions, function(set, definition) {
                set[definition.definitionName] = {
                    title: definition.plural,
                    teams: [],
                    key: definition.definitionName,
                }

                return set;
            }, {
                team: {
                    title: 'Groups and Teams',
                    teams: [],
                    key: 'team',
                }
            })

            ////////////////////////////////////////////////////

            return _.chain(self.items)
                .reduce(function(set, team) {

                    var teamType = team.definition || 'team';
                    var existingGroup = set[teamType];
                    if (!existingGroup) {
                        existingGroup = set[teamType] = {
                            title: self.$fluro.types.readable(teamType, true),
                            teams: [],
                        }
                    }

                    existingGroup.teams.push(team);

                    return set;
                }, allSets)
                .values()
                .orderBy(function(set) {
                    return set.teams.length;
                })
                .reverse()
                .value();
        },


    },
    asyncComputed: {

        teamDefinitions: {
            default: [],
            get() {
                var self = this;
                return self.$fluro.types.subTypes('team')
            }
        },
        items: {
            default: [],
            get() {



                var self = this;
                self.loading = true;

                var contactID = self.$fluro.utils.getStringID(self.contact);
                if (!contactID) {
                    Promise.resolve([])
                    self.loading = false;
                }

                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/contact/${contactID}/teams`).then(function(res) {
                            resolve(res.data);
                            self.loading = false;
                        })
                        .catch(function(err) {
                            reject(err);
                            self.loading = false;

                        });
                    // https://api.staging.fluro.io/info/checkins?contact=592e50389d9129595a75cc4e
                })
            }
        }
    }
    /**/
}
</script>
<style lang="scss">
.sheet-panel {
    &.archived {
        opacity: 0.5;
    }
}
</style>