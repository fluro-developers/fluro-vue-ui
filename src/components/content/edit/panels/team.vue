<template>
    <flex-column>
        <template v-if="!model">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab heading="Information">
                <flex-column-body style="background: #fafafa;">
                    <v-container class="grid-list-xl">
                        <constrain sm>
                            <h3 margin>Group/Team Information</h3>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstLine" v-model="model" />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mainImage" v-model="model" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`${definition.title} details`" v-if="definition && definition.fields && definition.fields.length">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <h3 margin>{{definition.title}}</h3>
                            <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields">
                            </fluro-content-form>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`${model.assignments.length} Position${model.assignments.length == 1 ? '' : 's'}`">
                <flex-column-body style="background: #fafafa;">
                    <v-container class="grid-list-xl">
                        <constrain md>
                            <h3>Assigned Positions</h3>
                            <p>Assign contacts to specified positions eg. (Leader, Co-leader, Guitarist) below:</p>
                            <group-role-manager v-model="model.assignments" :config="config" />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.shareContactDetails" v-model="model" />
                            <v-checkbox v-model="hiddenAssigned" label="Hide from assigned contacts" hint="Should assigned contacts know they are in the group?" persistent-hint></v-checkbox>
                            <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mainImage" v-model="model" /> -->
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`${model.provisionalMembers.length} Member${model.provisionalMembers.length == 1 ? '' : 's'}`">
                <flex-column-body style="background: #fafafa;">
                    <v-container class="grid-list-xl">
                        <constrain sm>
                            <h3>Provisional Members</h3>
                            <p>Add contacts as provisional members of this group, these are usually the people who attend, belong to, or have subscribed to this group. People can become members of this group from your website, checkin system or other apps.</p>
                            <fluro-content-form-field class="py-2" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.provisionalRoles" v-model="model" />
                            <fluro-content-form-field class="py-2" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.allowProvisional" v-model="model" />
                            <fluro-content-form-field class="py-2" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.shareContactDetailsProvisional" v-model="model" />
                            <fluro-content-form-field class="pt-2 pb-4" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.visibleMembers" v-model="model" />
                            <fluro-content-form-field class="py-3" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.provisionalMembers" v-model="model" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Notifications">
                <flex-column-body style="background: #fafafa;">
                    <v-container class="grid-list-xl">
                        <constrain md>
                            <notification-team-manager v-model="model.notifications" :config="config" :allPositions="allPositions"/>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import GroupRoleManager from '../components/GroupRoleManager.vue';
import NotificationTeamManager from '../components/NotificationTeamManager.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';

// import { JSONView } from "vue-json-component";

/////////////////////////////////

import moment from 'moment';
import Vue from 'vue';

/////////////////////////////////

export default {
    components: { NotificationTeamManager, GroupRoleManager },
    mixins: [FluroContentEditMixin],
    created() {
        var self = this;

        if (!self.model.assignments) {
            self.$set(self.model, 'assignments', []);
        }

        if (!self.model.visibleAssigned) {
            self.$set(self.model, 'visibleAssigned', false);
        }

        if (!self.model.notifications) {
            self.$set(self.model, 'notifications', []);
        }

        // if (!self.model.provisionalMembers) {
        //     self.$set(self.model, 'provisionalMembers', []);
        // }

        // if (!self.model.defaultRooms) {
        //     self.$set(self.model, 'defaultRooms', []);
        // }

        // if (!self.model.defaultRosters) {
        //     self.$set(self.model, 'defaultRosters', []);
        // }
    },
    methods: {},
    computed: {
        fieldsOutput() {

            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Track Title',
                minimum: 1,
                maximum: 1,
                type: 'string',
                placeholder: 'Title',
            });

            addField('firstLine', {
                title: 'Subtitle',
                minimum: 0,
                maximum: 1,
                type: 'string',
                placeholder: 'Subtitle',
                description: 'A short one line description for this event track',
            });



            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////


            addField('mainImage', {
                title: 'Image',
                description: 'Default image for events in this track',
                minimum: 0,
                maximum: 1,
                type: 'reference',
                directive: 'reference-select',
                params: {
                    restrictType: 'image',
                }
            });


            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////


            addField('shareContactDetails', {
                title: 'Share phone and email details with assigned contacts',
                description: "Grant any contact with an assigned position be able to view other group members phone and email address?",
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                defaultValues: [true],
            });


            // addField('visibleAssigned', {
            //     title: 'Hide from assigned contacts',
            //     description: "Should assigned contacts know they are in the group?",
            //     minimum: 0,
            //     maximum: 0,
            //     type: 'boolean',
            // });


            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////


            addField('provisionalRoles', {
                title: 'Roles / Permissions',
                description: 'Roles and permissions that should be granted to provisional members for this group/team',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                directive: 'reference-select',
                params: {
                    restrictType: 'role',
                }
            });


            ///////////////////////////////////


            addField('allowProvisional', {
                title: 'Allow Provisional Membership (Allow members to join or leave)',
                description: 'Set whether or not people can publicly join and leave this group without approval from applications like checkin or through your website',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            });


            addField('shareContactDetailsProvisional', {
                title: 'Allow Provisional Members to view other group members\' phone numbers and emails',
                description: 'Should provisional members be allowed to view other group members phone and email address?',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            });


            addField('visibleMembers', {
                title: 'Visible to Members',
                description: 'Should members of this group know that they are in this group?',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            });


            ///////////////////////////////////


            addField('provisionalMembers', {
                title: 'Group Members',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                directive: 'reference-select',
                params: {
                    restrictType: 'contact',
                }
            });


            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////


            function addField(key, details) {
                details.key = key;
                array.push(details)
                // // Vue.set(self.fields, key, details);

                // if (details.enabled === false) {

                // } else {
                //     details.enabled = true;
                // }


                // var defaultValue = self.getDefaultValue(key, details);
                // Vue.set(self.model, key, defaultValue);
            }

            return array;
        },
        hiddenAssigned: {
            get() {
                return !this.model.visibleAssigned;
            },
            set(value) {
                this.$set(this.model, 'visibleAssigned', !value);
            }
        },
        showOutline() {
            return false; //true; //false;//true;//false;//true;
        },
        allPositions() {
            return _.map(this.model.assignments, 'title');
        }
    },
}
</script>
<style>
.no-border-no-background .toggle-item {
    border: none !important;
    background: none !important;
    font-size: 14px;
    padding: 0px;
}
</style>