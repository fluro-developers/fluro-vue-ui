<template>
    <div>
        <fluro-page-preloader v-if="loading" contain />
        <template v-else>
            <v-layout row wrap>
                <template v-for="row in backlinks">
                    <v-flex >
                        <v-input class="no-flex">
                            <v-label>{{row.relationship | capitalize}} <span class="anniversary">{{anniversaryDate(row)}}</span></v-label>
                            <div class="faces">
                                <div @click="$fluro.global.edit(contact, true)" class="face" :class="contact.status" v-for="contact in row.contacts">
                                    <fluro-avatar lg :id="contact" />
                                    <div class="details">
                                        <div><strong>{{contact.title}}</strong></div>
                                        <div>{{contact.householdRole}}</div>
                                        <div>{{contact.gender}}</div>
                                        <div>{{contact.age}}</div>
                                        <div>{{contact.definition | definitionTitle}}</div>
                                        <fluro-status-label :value="contact.status" />
                                    </div>
                                </div>
                            </div>
                            <!-- <pre>{{model.relationships.length}}</pre> -->
                            <!-- <fluro-avatar-stack :contacts="row.contacts"/> -->
                        </v-input>
                    </v-flex>
                </template>
                <template v-for="row in model.relationships">
                    <v-flex >
                        <v-input class="no-flex">
                            <v-label>{{contextName}} {{row.relationship | capitalize}} <span class="anniversary">{{anniversaryDate(row)}}</span></v-label>
                            <div class="faces">
                                <div @click="$fluro.global.edit(contact, true)" class="face" :class="contact.status" v-for="contact in row.contacts">
                                    <fluro-avatar lg :id="contact" />
                                    <div class="details">
                                       
                                        <div><strong>{{contact.title}}</strong></div>
                                         <div>{{contact.householdRole}}</div>
                                        <div>{{contact.gender}}</div>
                                        <div>{{contact.age}}</div>
                                        <div>{{contact.definition | definitionTitle}}</div>
                                        <fluro-status-label :value="contact.status" />
                                    </div>
                                </div>
                            </div>
                            <!-- <pre>{{model.relationships.length}}</pre> -->
                            <!-- <fluro-avatar-stack :contacts="row.contacts"/> -->
                        </v-input>
                    </v-flex>
                </template>
            </v-layout>
            <fluro-panel>
                <fluro-panel-title>
                    <h4>Add a relationship</h4>
                </fluro-panel-title>
                <fluro-panel-body>
                    <form>
                        <v-layout>
                            <v-flex xs12 sm5>
                                <v-select label="Relationship" v-model="proposed.relationshipType" item-text="title" :items="relationshipTypes"></v-select>
                                <template v-if="customRelationship">
                                    <v-text-field label="Custom Relationshp" v-model="proposed.relationship" placeholder="Boss, Coworker, Friend" />
                                </template>
                                <template v-if="proposed.relationship == 'spouse'">
                                    <fluro-content-form-field :field="anniversaryField" v-model="proposed" />
                                </template>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <!-- <v-input class="no-flex"> -->
                                <!-- <v-label>Select Contacts</v-label> -->
                                <fluro-content-select-button block type="contact" v-model="proposed.contacts" />
                                <!-- </v-input> -->
                            </v-flex>
                            <v-flex xs12 sm4>
                                <v-btn block color="primary" :disabled="disabled" @click="add()">
                                    Add
                                    <fluro-icon right icon="plus" />
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </form>
                </fluro-panel-body>
            </fluro-panel>
            <!-- <pre>{{relationships}}</pre> -->
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
// import FluroContentSelectButton from '../../../form/contentselect/FluroContentSelectButton.vue';
import ListGroup from '../../../ui/ListGroup.vue';
import ListGroupItem from '../../../ui/ListGroupItem.vue';
// import FluroAvatarStack from '../../../FluroAvatarStack.vue';

import FluroContentSelectButton from '../../../form/contentselect/FluroContentSelectButton.vue';
import FluroContentFormField from '../../../form/FluroContentFormField.vue';

// import FluroContentSelectModal from '../../../form/contentselect/FluroContentSelectModal.vue';
import FluroSelector from '../../../form/contentselect/FluroSelector.vue';
import Vue from 'vue';

export default {
    props: {
        'value': {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            anniversaryField: {
                key: 'anniversary',
                type: 'date',
                title: 'Anniversary Date',
            },
            actionIndexes: {},
            model: this.value,
            loading: true,
            backlinks: [],
            proposed: {
                checkinAuthorised: true,
                relationshipType: null,
                relationship: null,
                anniversary: null,
                contacts: [],
            }
        }
    },
    created() {
        console.log('RELOAD TEAMS')
        this.reloadRelationships();
        this.resetProposed();
    },
    methods: {
        anniversaryDate(row) {
            if (row.anniversary) {
                return `${this.$fluro.date.formatDate(row.anniversary, 'D MMM')} (${this.$fluro.date.timeago(row.anniversary)})`;
            }
        },
        add() {

            var self = this;

            // console.log('RELATIONSHIP', self.proposed);
            var proposed = self.proposed;

            if (!self.model.relationships || !self.model.relationships.length) {
                self.$set(self.model, 'relationships', []);
            }

            self.model.relationships.push(proposed);

            // self.$fluro.api.put(`/contact/${self.contactID}/relationships`)

            self.resetProposed();
        },
        resetProposed() {
            this.proposed = {
                checkinAuthorised: true,
                relationshipType: null,
                relationship: null,
                anniversary: null,
                contacts: [],
            }
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
        //             self.reloadRelationships();
        //         });
        // },
        // select(type) {

        //     var self = this;

        //     //Ugly hack, but it's gotta be done unfortunately
        //     var SelectionManager = Vue.extend(FluroSelector);
        //     var instance = new SelectionManager({
        //         propsData: {
        //             minimum: 0,
        //             maximum: 0,
        //         }
        //     })

        //     // var isBasicType = self.$fluro.types.isBasicType(type);

        //     var promise = self.$fluro.modal({
        //             component: FluroContentSelectModal,
        //             options: {
        //                 allDefinitions: false, //isBasicType,
        //                 selector: instance, //Vue(FluroSelector),
        //                 type,
        //                 minimum: 0,
        //                 maximum: 0,
        //             }
        //         })
        //         .then(function(items) {

        //             if (!items || !items.length) {
        //                 return;
        //             }

        //             self.loading = true;

        //             //Get the ids from the teams
        //             var teamIDs = self.$fluro.utils.arrayIDs(items);

        //             //////////////////////////////////

        //             var promise = self.$batch.run({
        //                     operation: 'add to team',
        //                     ids: [self.contactID],
        //                     teams: teamIDs,
        //                 })
        //                 .then(function(res) {

        //                     // self.teams = self.teams.concat(items);
        //                     // self.loading = false;
        //                     self.reloadRelationships();
        //                 })
        //                 .catch(function(err) {
        //                     self.reloadRelationships();
        //                 });




        //         })
        // },
        reloadRelationships() {

            var self = this;
            self.loading = true;

            if (!self.contactID) {
                self.loading = false;
                return;
            }

            self.$fluro.api.get(`/contact/${self.contactID}/relationships`, {
                    params: {
                        backlinks: true,
                    }
                })
                .then(function(res) {
                    self.backlinks = res.data;
                    self.loading = false;
                })
                .catch(function(err) {
                    self.loading = false;
                });
        },
    },
    components: {
        FluroContentFormField,
        FluroContentSelectButton,
        // FluroAvatarStack,
        ListGroup,
        ListGroupItem,
        // FluroContentSelectButton,
        // FluroContentSelectModal,
    },
    watch: {
        'proposed.relationshipType': function(value) {

            var self = this;

            //////////////////////////////

            if (!self.customRelationship) {
                self.proposed.relationship = value;
            }

            // //////////////////////////////

            // switch(value) {
            //     case 'other':
            //     break;
            //     default:
            //         self.proposed.relationship = value;
            //     break;
            // }
        }
    },
    computed: {
        relationships() {
            // return this.
            return this.backlinks;
        },
        customRelationship() {
            return this.proposed.relationshipType == 'other';
        },
        disabled() {
            var invalid = !this.proposed.contacts || !this.proposed.contacts.length || !this.proposed.relationship || !this.proposed.relationship.length;

            if (invalid) {
                return true;
            }

            if (this.customRelationship && (!this.proposed.relationship || !this.proposed.relationship.length)) {
                return true;
            }
        },
        contextName() {

            var name = this.model.preferredName || this.model.firstName || '';
            if (!name || !name.length) {
                return '';
            }

            if (_.endsWith(name, 's')) {
                return `${name}'`
            }
            return `${name}'s`;
        },
        relationshipTypes() {


            var contextName = this.contextName;

            return [{
                    title: `${contextName} Parents`,
                    value: `parents`,
                },
                {
                    title: `${contextName} Guardians`,
                    value: `guardians`,
                },
                {
                    title: `${contextName} Children`,
                    value: `children`,
                },
                {
                    title: `${contextName} Siblings`,
                    value: `siblings`,
                },
                {
                    title: `${contextName} Spouse`,
                    value: `spouse`,
                },
                {
                    title: `${contextName} Partner`,
                    value: `partner`,
                },
                {
                    title: `${contextName} Grandparents`,
                    value: `grandparents`,
                },
                {
                    title: `${contextName} Grandchildren`,
                    value: `grandchildren`,
                },
                {
                    title: `${contextName} Aunt/Uncle`,
                    value: `auntuncle`,

                },
                {
                    title: `${contextName} Niece/Nephew`,
                    value: `niecenephew`,
                },
                {
                    title: `Other`,
                    value: `other`,
                },
            ]
        },
        contactID() {
            if (!this.model._id) {
                return;
            }

            return this.$fluro.utils.getStringID(this.model);
        },
    },
    filters: {
        capitalize(str) {
            return _.startCase(str);
        }
    }
}
</script>
<style lang="scss">
.anniversary {
    font-weight: normal;
    opacity: 0.5;
}

.faces {
    display: block;

    .face {

        

        width: 23%;
        padding: 10px;
        background: #fff;
        border: 1px solid rgba(#000, 0.1);
        border-radius: 4px;
        margin: 0 1% 1% 0;
        display: inline-block;
        text-align: center;
        font-size: 14px;
        cursor: pointer;

        &:hover {
            background: #fafafa;
        }
        // font-weight: 600;
        
        &.archived {
            opacity: 0.5;
            border: 1px solid rgba(#000, 0.1);
            background: none;
        }

        .details {
            padding:5px 0;
            text-transform: capitalize;;
            font-size: 0.8em;
            opacity: 0.8;
        }
    }
}
</style>