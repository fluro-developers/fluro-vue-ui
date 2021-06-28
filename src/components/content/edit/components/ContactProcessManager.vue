<template>
    <div>
        <fluro-page-preloader v-if="loading" contain />
        <template v-else>

        
            <!-- <template v-if="canAdd">
                <v-btn small color="primary" @click="add()" class="ml-0">
                    Add to process
                    <fluro-icon right icon="plus" />
                </v-btn>
            </template> -->

            <template v-if="sorted.length">
                <contact-process-state @click.native="clicked(card)" :card="card" :key="card._id" v-for="card in sorted" />
            </template>
            <template v-else>
                <em>No process information is available</em>
            </template>
            <!-- <pre>{{cards}}</pre> -->
            <!-- <v-input class="no-flex" v-for="group in teamGroups">
                <v-label>{{group.title}}</v-label>
                <list-group>
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
                            </template>
                        </list-group-item>
                    </template>
                </list-group>
                <v-btn small color="primary" @click="select(group.key)" class="ml-0">
                    Add {{group.title}}
                    <fluro-icon right icon="plus" />
                </v-btn>
            </v-input> -->
        </template>
    </div>
</template>
<script>
import AddToProcessModal from '@/components/modal/modals/AddToProcessModal.vue';
import ListGroup from '../../../ui/ListGroup.vue';
import ListGroupItem from '../../../ui/ListGroupItem.vue';
import ContactProcessState from './ContactProcessState.vue';

import Vue from 'vue';

import _ from 'lodash';

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

export default {
    props: {
        'value': {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            actionIndexes: {},
            model: this.value,
            loading: true,
            cards: [],
        }
    },
    created() {
        this.reloadCards();
    },
    methods: {
        clicked(card) {
            var self = this;

            return self.$fluro.global.edit(card, true)
                .then(function(result) {
                    console.log('Result!', result);
                    self.reloadCards();
                })
                .catch(function(err) {
                    console.log('Cancelled!', err);
                });

        },
        // leave(team) {
        //     var self = this;

        //     //Get the ids from the teams
        //     var teamID = self.$fluro.utils.getStringID(team);
        //     self.loading = true;

        //     //////////////////////////////////

        //     var promise = self.$batch.run({
        //             operation: 'remove from team',
        //             ids: [self.contactID],
        //             teams: [teamID],
        //         })
        //         .then(function(res) {
        //             var index = _.findIndex(self.teams, { _id: teamID });
        //             self.teams.splice(index, 1);
        //             self.loading = false;
        //         })
        //         .catch(function(err) {
        //             console.log('TEAMS ERR', err);
        //             self.reloadTeams();
        //         });
        // },
        // select(type) {

        // var self = this;

        // //Ugly hack, but it's gotta be done unfortunately
        // var SelectionManager = Vue.extend(FluroSelector);
        // var instance = new SelectionManager({
        //     propsData: {
        //         minimum: 0,
        //         maximum: 0,
        //     }
        // })

        // // var isBasicType = self.$fluro.types.isBasicType(type);

        // var promise = self.$fluro.modal({
        //         component: FluroContentSelectModal,
        //         options: {
        //             allDefinitions: false, //isBasicType,
        //             selector: instance, //Vue(FluroSelector),
        //             type,
        //             minimum: 0,
        //             maximum: 0,
        //         }
        //     })
        //     .then(function(items) {

        //         if (!items || !items.length) {
        //             return;
        //         }

        //         self.loading = true;

        //         //Get the ids from the teams
        //         var teamIDs = self.$fluro.utils.arrayIDs(items);

        //         //////////////////////////////////

        //         var promise = self.$batch.run({
        //                 operation: 'add to team',
        //                 ids: [self.contactID],
        //                 teams: teamIDs,
        //             })
        //             .then(function(res) {

        //                 console.log('CARDS ADDED', res);
        //                 // self.teams = self.teams.concat(items);
        //                 // self.loading = false;
        //                 self.reloadCards();
        //             })
        //             .catch(function(err) {
        //                 console.log('CARDS ERR', err);
        //                 self.reloadCards();
        //             });




        //     })
        // },
        reloadCards() {
            var self = this;
            self.loading = true;

            return self.$fluro.api.get(`/process/states/${self.contactID}`)
                .then(function(res) {
                    self.cards = res.data;
                    self.loading = false;
                })
                .catch(function(err) {
                    self.cards = err;
                    self.loading = false;
                })
        },
        add() {
            var self = this;
            var promise = self.$fluro.modal({
                component: AddToProcessModal,
                options: {
                    items:[self.model],
                }
            });
        },
        canAnyOfType(permission, basicTypeName) {

            var self = this;
            var glossary = self.$fluro.types.glossary;
            if (glossary) {

                var canRunAction = _.chain(glossary)
                    .some(function(term) {
                        if (term.parentType == basicTypeName) {
                            return self.$fluro.access.can(permission, term.definitionName, basicTypeName);
                        }
                    })
                    .value();

                //If we can create a mailout of any type
                if (canRunAction) {
                    //finish here
                    return true;
                }
            }

            ///////////////////////////////////////////

            //Check if we have the create mailout permission
            var canRunActionOnBasicType = self.$fluro.access.can(permission, basicTypeName);
            if (canRunActionOnBasicType) {
                return true;
            }
        },
    },
    components: {
        ListGroup,
        ListGroupItem,
        ContactProcessState,
    },
    computed: {
        canAdd() {
            return this.canAnyOfType('create', 'process');
        },
        sorted() {
            return _.orderBy(this.cards, this.$fluro.utils.processCardPrioritySort)
        },
        contactID() {
            return this.$fluro.utils.getStringID(this.model);
        },
    },
}

</script>
<style lang="scss">
</style>
