<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <!-- :vertical="true" -->
        <tabset v-else :justified="true">
            <template v-slot:menuprefix>
                <template v-if="context == 'edit' && $vuetify.breakpoint.mdAndUp">
                    <!-- <flex-column-header style="text-align:center"> -->
                    <!-- <div style="padding: 10px;max-width:200px;margin: auto;"> -->
                    <!-- <fluro-avatar-update :id="model._id" type="contact" /> -->
                    <!-- </div> -->
                    <!-- </flex-column-header> -->
                </template>
            </template>
            <tab heading="Card Details">
                <flex-row>
                    <v-flex xs12 sm8 class="main">
                        <flex-column-body style="background: #fafafa;">
                            <!-- <pre>{{definition.fields}}</pre> -->
                            <v-container>
                                <!-- <pre>{{model}}</pre> -->
                                <constrain sm>
                                    <template v-if="reference">
                                        <fluro-panel>
                                            <!--  <fluro-panel-title class="border-bottom">
                                                    <v-layout align-center>
                                                        <v-flex>
                                                            <h5>{{title}}</h5>
                                                        </v-flex>
                                                        <v-flex shrink>
                                                            <v-btn small v-tippy content="View" class="ma-0" icon v-if="$fluro.access.canViewItem(reference)" @click="$fluro.global.view(reference, true)">
                                                                <fluro-icon icon="external-link" />
                                                            </v-btn>
                                                            <v-btn small v-tippy content="Edit" class="ma-0" icon v-if="$fluro.access.canEditItem(reference)" @click="$fluro.global.edit(reference, true)">
                                                                <fluro-icon icon="pencil" />
                                                            </v-btn>
                                                            
                                                        </v-flex>
                                                    </v-layout>
                                                </fluro-panel-title> -->
                                            <fluro-panel-body style="padding:0;">
                                                <!-- <template v-if="reference._type == 'contact'"> -->
                                                <!-- </template> -->
                                                <!-- <template v-else> -->
                                                <!-- <pre>{{reference}}</pre> -->
                                                <flex-column-body style="max-height:50vh">
                                                    <!-- <pre>{{reference}}</pre> -->
                                                    <fluro-content-view :id="reference" :embedded="true" :definition="reference.definition" :type="reference._type" />
                                                </flex-column-body>
                                                <!-- </template> -->
                                            </fluro-panel-body>
                                        </fluro-panel>
                                    </template>
                                    <template v-else-if="definition && definition.fields && definition.fields.length">
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.title" v-model="model"/>
                                        <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields"></fluro-content-form>
                                    </template>
                                    <template v-else>
                                        <h3 margin>{{title}}</h3>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="referenceItemField" v-model="model"></fluro-content-form-field>
                                    </template>
                                    
                                    <template v-if="model.forms && model.forms.length">
                                        <!-- <h3 margin>Forms</h3> -->
                                        <v-input class="no-flex" v-if="receivedForms && receivedForms.length">
                                            <v-label>Received {{receivedForms.length}} Form Responses</v-label>
                                            <p class="help-block">These forms have not yet been submitted</p>
                                            <list-group>
                                                <list-group-item :key="index" v-for="(form, index) in receivedForms">
                                                    <strong>
                                                        <fluro-icon type="form" /> {{form.form.title}}
                                                    </strong>
                                                    <div class="sm">
                                                        <span class="status-label active">
                                                            <fluro-icon icon="check" /> Received </span> {{form.received | formatDate('h:mma ddd MMM YYYY')}} <span class="muted">{{form.received | timeago}}</span>
                                                    </div>
                                                </list-group-item>
                                            </list-group>
                                        </v-input>
                                        <v-input class="no-flex" v-if="awaitingForms && awaitingForms.length">
                                            <v-label>Awaiting {{awaitingForms.length}} Form Responses</v-label>
                                            <p class="help-block">These forms have not yet been submitted</p>
                                            <list-group>
                                                <list-group-item v-for="form in awaitingForms">
                                                    <strong>
                                                        <fluro-icon type="form" /> {{form.form.title}}
                                                    </strong>
                                                    <div class="sm">
                                                        Sent {{form.sent | timeago}} - <span class="status-label draft">
                                                            <fluro-icon icon="clock" /> Awaiting form response</span>
                                                    </div>
                                                    <template v-slot:right>
                                                        <v-btn small color="primary" @click="resend(form)" :loading="resending[form.form._id]">
                                                            Resend
                                                            <fluro-icon right icon="paper-plane" />
                                                        </v-btn>
                                                    </template>
                                                </list-group-item>
                                            </list-group>
                                        </v-input>
                                    </template>
                                    <template>
                                        <!-- <task-list ng-model="list" ng-host="item" ng-definition="definition" show-link="true" ng-repeat="list in item.taskLists"></task-list> -->
                                        <!-- <template> -->
                                        <fluro-task-list @remove="removeTaskList(index)" @input="dispatchUpdate" :card="model" v-model="model.taskLists[index]" :state="model.state" :definition="definition" v-for="(list, index) in model.taskLists"></fluro-task-list>
                                        <!-- </template> -->
                                        <!-- <pre>{{model.taskLists}}</pre> -->
                                        <span class="horizontal-rule" />
                                        <v-btn class="ml-0" @click="addTaskList()">
                                            Add Task List
                                            <fluro-icon right icon="plus" />
                                        </v-btn>
                                    </template>
                                </constrain>
                            </v-container>
                        </flex-column-body>
                    </v-flex>
                    <v-flex xs12 sm4 class="sidebar">
                        <flex-column-body>
                            <v-container>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.dueDate" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.state" v-model="model"></fluro-content-form-field>
                                <v-input class="no-flex">
                                    <v-label>Key Contacts</v-label>
                                    <p class="help-block">This card does not reference a contact, Here you can specify who should be sent Automated SMS and Mailouts as this card progresses</p>
                                    <fluro-content-form-field :form-fields="formFields" :showLabel="false" :outline="showOutline" :options="options" :field="fieldHash.contacts" v-model="model"></fluro-content-form-field>
                                </v-input>
                                <v-input class="no-flex">
                                    <v-label>Assigned To</v-label>
                                    <p class="help-block">Assign who is in charge of this card</p>
                                    <fluro-content-form-field :form-fields="formFields" :showLabel="false" :outline="showOutline" :options="options" :field="fieldHash.assignedTo" v-model="model"></fluro-content-form-field>
                                </v-input>
                            </v-container>
                        </flex-column-body>
                    </v-flex>
                </flex-row>
            </tab>
            <!-- <tab heading="Forms" v-if="model.forms && model.forms.length">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>Forms</h3>
                                <v-input class="no-flex" v-if="receivedForms && receivedForms.length">
                                    <v-label>Received {{receivedForms.length}} Form Responses</v-label>
                                    <p class="help-block">These forms have not yet been submitted</p>
                                    <list-group>
                                        <list-group-item v-for="form in receivedForms">
                                            <strong>
                                                <fluro-icon type="form" /> {{form.form.title}}
                                            </strong>
                                            <div class="sm">
                                                <fluro-icon icon="check" /> Received {{form.received | formatDate('h:mma ddd MMM YYYY')}} {{form.received | timeago}}
                                            </div>
                                        </list-group-item>
                                    </list-group>
                                </v-input>
                                <v-input class="no-flex" v-if="awaitingForms">
                                    <v-label>Awaiting {{awaitingForms.length}} Form Responses</v-label>
                                    <p class="help-block">These forms have not yet been submitted</p>
                                    <list-group>
                                        <list-group-item v-for="form in awaitingForms">
                                            <strong>
                                                <fluro-icon type="form" /> {{form.form.title}}
                                            </strong>
                                            <div class="sm">Sent {{form.sent | timeago}} - <span class="status-label draft">
                                                    <fluro-icon icon="clock" /> Awaiting form response</span>
                                            </div>
                                            <template v-slot:right>
                                                <v-btn small color="primary" @click="resend(form)" :loading="resending[form.form._id]">
                                                    Resend
                                                    <fluro-icon right icon="paper-plane" />
                                                </v-btn>
                                            </template>
                                        </list-group-item>
                                    </list-group>
                                </v-input>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab heading="Metadata" v-if="context == 'edit'">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>Metadata</h3>
                                <div v-if="model.data">
                                    <v-card>
                                        <v-card-text>
                                            <h5>Explore Metadata</h5>
                                            <json-view :deep="3"  :data="model.data" />
                                        </v-card-text>
                                    </v-card>
                                </div>
                               
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab> -->
            <!-- <tab :heading="sheet.title" v-for="sheet in sheetDefinitions">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <wrapper xs>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="sheet.field" v-model="details"></fluro-content-form-field>
                            </wrapper>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab> -->
            <!-- <tab heading="Classification">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <wrapper xs>
                                <template v-if="contactDefinitions.length">
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="definitionField" v-model="model"></fluro-content-form-field>
                                </template>
                                <fluro-realm-select :expanded="true" v-model="model.realms" type="contact" />
                            </wrapper>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab> -->
        </tabset>
        <!-- <flex-column-body> -->
        <!-- <pre>{{details}}</pre> -->
        <!-- </flex-column-body> -->
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';
import FluroContentView from 'src/components/content/view/FluroContentView.vue';
import FluroTaskList from 'src/components/form/tasklist/FluroTaskList.vue';

/////////////////////////////////

import Vue from 'vue';
import _ from 'lodash';


import { mapFields } from 'vuex-map-fields';


/////////////////////////////////

export default {

    props: {
        // 'fields': {
        //     type: Array,
        //     default () {

        //         var array = [];

                



        //         ///////////////////////////////////

        //         function addField(key, details) {
        //             details.key = key;
        //             array.push(details)
        //             // // Vue.set(self.fields, key, details);

        //             // if (details.enabled === false) {

        //             // } else {
        //             //     details.enabled = true;
        //             // }


        //             // var defaultValue = self.getDefaultValue(key, details);
        //             // Vue.set(self.model, key, defaultValue);
        //         }

        //         //Update fields to use the default fields we set above
        //         return array;
        //     }
        // }
    },

    created() {


        if (!this.model.data) {
            this.model.data = {};
        }
    },
    mixins: [FluroContentEditMixin],
    components: {
        FluroContentView,
        FluroTaskList,
        // FluroAvatarUpdate,
        // FluroContentForm,
        // FluroRealmSelect,
        // FluroContentFormField,
        // FluroAcademicSelect,
    },
    methods: {
        removeTaskList(index) {

            var self = this;
            var lists = self.model.taskLists;

            self.$delete(lists, index)

            self.$set(self.model, 'taskLists', lists.slice());
            // self.model.taskLists = self.model.taskLists.splice(index, 1);
            self.dispatchUpdate();
        },
        addTaskList() {
            var self = this;
            if (!self.model.taskLists) {
                self.$set(self.model, 'taskLists', []);
            }

            var newList = {
                autofocus: true,
                tasks: [
                    // {
                    //     name: 'New Task',
                    //     description: '',
                    //     required: true,
                    //     guid: self.$fluro.utils.guid(),
                    // }
                ],
            }

            /////////////////////////////////////////////
            /////////////////////////////////////////////

            var currentState = self.currentState;

            var proposedTitle;

            if (currentState && currentState.title) {
                proposedTitle = `${currentState.title} tasks`;
                newList.state = currentState.key;
            }

            //Check if there is already a task list with this title
            var existingList = _.find(self.model.taskLists, {
                title: proposedTitle,
            })

            //If there is no title or there is already a task list for this state
            if (!proposedTitle || !proposedTitle.length || existingList) {
                proposedTitle = `${self.user.firstName}'s tasks`;
            }


            //Check if there is already a task list with this title
            var existingList = _.find(self.model.taskLists, {
                title: proposedTitle,
            })

            /////////////////////////////////////////////

            if (existingList) {
                proposedTitle = 'Additional Tasks'
                // console.log('Already exists', proposedTitle);
                // return;
            }

            //Use our proposed title
            newList.title = proposedTitle;

            /////////////////////////////////////////////
            /////////////////////////////////////////////

            self.model.taskLists.push(newList);

            // console.log('SELF MODEL', self.model)
            // self.update(self.model)
            self.dispatchUpdate();

        },


        resend(form) {

            var self = this;
            var cardID = self.$fluro.utils.getStringID(self.model);
            var formID = self.$fluro.utils.getStringID(form.form);
            self.$set(self.resending, formID, true);

            return self.$fluro.api.put(`/process/resend/${cardID}/${formID}`)
                .then(function(res) {
                    self.$fluro.notify('Form was resent');
                    self.$set(self.resending, formID, false);
                })
                .catch(function(err) {
                    self.$fluro.error(err);
                    self.$set(self.resending, formID, false);
                })




            // this.resending[]
            // this.$set(form, 'resending', true);
        },
        dispatchUpdate(newModel) {
            this.update(this.model);
        },

    },
    asyncComputed: {
        // devices: {
        //     default: [],
        //     get() {

        //         var self = this;


        //         if (self.context != 'edit' || !self.itemID) {
        //             return Promise.resolve([]);
        //         }

        //         //////////////////////////////////////

        //         return new Promise(function(resolve, reject) {

        //             self.$fluro.api.get(`/contact/${self.itemID}/devices`)
        //                 .then(function(res) {
        //                     resolve(_.map(res.data, function(device) {
        //                         device.pinging = false;
        //                         return device;
        //                     }));
        //                 })
        //                 .catch(function(err) {
        //                     reject(err);
        //                 })

        //         })
        //     }
        // },
    },
    computed: {
        // ...mapState('fluro', {
        //     application: state => state.application,
        //     user: state => state.user,
        // }),
        ...mapFields('fluro', [
            'application', //The Fluro application and all of it's permissions and data
            'user', //The authenticated user if they log in
        ]),

        fieldsOutput() {

            var self = this;
            var array = [];

            ///////////////////////////////////

                addField('title', {
                    title: 'Title',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    placeholder: '',
                })

                ///////////////////////////////////

                addField('contacts', {
                    title: 'Key Contacts',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    params: {
                        restrictType: 'contact',
                    }
                })





                ///////////////////////////////////

                addField('dueDate', {
                    title: 'Due Date',
                    minimum: 0,
                    maximum: 1,
                    type: 'date',
                    directive: 'datetime-select',
                    params: {

                    }
                })

                addField('state', {
                    title: 'Current State',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'select',
                    options: _.map(self.states, function(state) {
                        return {
                            name: state.title,
                            value: state.key,
                        }
                    })
                })




                ///////////////////////////////////

                addField('assignedTo', {
                    title: 'Assigned To',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    params: {
                        restrictType: 'contact',
                    }
                })

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            // console.log('DO THE OUTPUT!!!');
            return array;

        },
        referenceItemField() {

            var self = this;

            

            var processTypes = _.chain(this.definition)
                .get('data.processTypes')
                .map(function(type) {
                    return { name: self.$fluro.types.readable(type), value: type };
                })
                .value();

               
            return {
                key: 'item',
                title: 'Referenced Item',
                description: 'Select an item to add to this process',
                minimum: 0,
                maximum: 1,
                type: 'reference',
                // params:{
                //     restrictType
                // }
            }
        },
        currentStateName() {
            return this.model.state;
        },
        currentState() {
            return _.find(this.states, { key: this.currentStateName });
        },
        reference() {
            return this.model.item;
        },

        title() {
            if (this.model) {
                if (this.model.title && this.model.title.length) {
                    return this.model.title;
                }

                if (this.model.item && this.model.item.title) {
                    return this.model.item.title
                }
            }

            return 'New Card';
        },
        states() {
            return _.get(this.definition, 'data.states');
            // this.definition && this.definition.data ? this.definition.data.states : []
        },
        awaitingForms() {
            var self = this;

            return _.filter(self.model.forms, function(entry) {
                return !entry.interaction;
            })

        },
        receivedForms() {
            var self = this;

            return _.filter(self.model.forms, function(entry) {
                return entry.interaction;
            })

        },
        showOutline() {
            return false; //true; //false;//true;//false;//true;
        },
    },

    data() {
        return {
            resending: {},
        }
    },
}
</script>
<style scoped lang="scss">
.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;

}


.sidebar,
.main {
    flex: 1;
    // border:2px solid pink;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.horizontal-rule {
    display: block;
    border-radius: 20px;
    height: 3px;
    background: rgba(#000, 0.1);
    margin: 10px 0;
}

.sidebar {

    background: rgba(#000, 0.02);

    @media(min-width: 769px) {
        border-left: 1px solid rgba(#000, 0.05);
    }
}

.bordered {
    border: 1px solid rgba(#000, 0.1);
    box-shadow: 0 2px 4px rgba(#000, 0.1);

    & >>> .tabset-menu {
        background: #eee;
    }
}
</style>