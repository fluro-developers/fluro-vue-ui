<template>
    <div>
        <list-group>
            <draggable :list="model" v-bind="dragOptions" ghost-class="ghost-dragging-class" @start="drag=true" @end="drag=false">
                <list-group-item v-for="(assignment, index) in model" class="pa-0" :class="currentlyExpanded[index] ? 'hover-grey' : ''" style="width:100%">
                    <v-layout align-center ma-0 py-0 px-2>
                        <v-flex xs3>
                            <strong>{{assignment.title}}</strong>
                        </v-flex>
                        <v-flex xs5>
                            <v-chip small v-for="contact in assignment.contacts">{{contact.title}}</v-chip>
                        </v-flex>
                        <v-flex xs2>
                            <v-btn style="width:100%" px-0 @click="toggleExpanded(index)">
                                <v-layout px-0>
                                    <v-flex px-0>{{!currentlyExpanded[index] ? 'More' : 'Less'}}</v-flex>
                                    <v-flex px-0 shrink class="fade">
                                        <fluro-icon :icon="!currentlyExpanded[index] ? 'angle-down' : 'angle-up'" />
                                    </v-flex>
                                </v-layout>
                            </v-btn>
                        </v-flex>
                        <v-flex py-1 xs2>
                            <fluro-confirm-button @click="remove(index)">
                                <template v-slot:default="{confirming}">
                                    <v-btn flat style="width:100%;">{{confirming ? 'Confirm?' : 'Remove'}}</v-btn>
                                </template>
                            </fluro-confirm-button>
                        </v-flex>
                    </v-layout>
                    <tabset v-if="currentlyExpanded[index]" style="width:100%">
                        <tab heading="Position Details" class="pa-2">
                            <fluro-content-form :options="options" v-model="model[index]" :fields="editFields" ref="form">
                                <template v-slot:form="{formFields, fieldHash, model, update, options}">
                                    <v-layout wrap pa-4>
                                        <v-flex xs4 sm3>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                                        </v-flex>
                                        <v-flex xs8 sm9 py-0>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.contacts" v-model="model" />
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.roles" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                </template>
                            </fluro-content-form>
                        </tab>
                        <tab heading="Advanced">
                            <v-layout wrap pa-4>
                                <v-flex xs12 sm6>
                                    <v-checkbox v-model="model[index].shareDetails" :label="`Allow ${model[index].title} to view phone numbers and emails of other group members`" hint="Should people in this position be able to see the email and phone number of other members in this group/team?" persistent-hint></v-checkbox>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-checkbox v-model="model[index].visible" label="Visible" hint="Should this group be visible to people in this slot?" persistent-hint></v-checkbox>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-checkbox v-model="model[index].exclude" :label="`Exclude ${model[index].title} from membership`" hint="If checked, these contacts will not be considered 'members' of the group. They will be excluded from reports and other statistics. Typically this would be used for an oversight or an administrative only position." persistent-hint></v-checkbox>
                                </v-flex>
                            </v-layout>
                        </tab>
                    </tabset>
                </list-group-item>
            </draggable>
        </list-group>
        <fluro-panel>
            <fluro-panel-title>Add a position</fluro-panel-title>
            <fluro-panel-body>
                <form @submit.prevent.stop="add()">
                    <fluro-content-form :options="options" v-model="proposed" :fields="addFields" ref="form">
                        <template v-slot:form="{formFields, fieldHash, model, update, options}">
                            <v-layout wrap align-center px-2>
                                <v-flex xs8 sm8>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                                </v-flex>
                                <v-flex xs4 sm4>
                                    <v-btn style="width:100%;" type="submit" @click="add()">Add</v-btn>
                                </v-flex>
                                <v-flex xs12 sm12 py-0>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.contacts" v-model="model" />
                                </v-flex>
                            </v-layout>
                        </template>
                    </fluro-content-form>
                    </v-flex>
                    </v-layout>
                </form>
            </fluro-panel-body>
        </fluro-panel>
        <!-- <pre>{{proposed}}</pre> -->
        <!-- <v-layout>
            <v-flex xs12 sm5>
                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
            </v-flex>
            <v-flex xs12 sm5>
                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
            </v-flex>
            <v-flex xs12 sm2>
                <v-btn>Add</v-btn>
            </v-flex>
        </v-layout> -->
    </div>
</template>
<script>
import FluroContentEditMixin from '../FluroContentEditMixin';
import { FluroContentForm, Layout, FluroConfirmButton } from 'fluro-vue-ui';
import draggable from 'vuedraggable'


export default {
    props: {
        value: {
            type: Array,
        },
        config: {
            required: true,
        }
    },
    mixins: [FluroContentEditMixin, Layout],
    components: {
        FluroContentForm,
        draggable,
        FluroConfirmButton

    },
    data() {
        return {
            model: this.value,
            proposed: {},
            dragOptions: {},
            currentlyExpanded: [],
            drag: false,
        }
    },
    methods: {
        add() {


            var clone = JSON.parse(JSON.stringify(this.proposed));

            if (!clone.title || !clone.title.length) {
                return;
            }

            delete clone.row;



            this.model.push(clone);
            this.currentlyExpanded.push(false);
            this.proposed = {};
        },
        remove(index) {
            this.model.splice(index, 1);
        },
        toggleExpanded(index) {
            var self = this;
            if (self.currentlyExpanded[index]) {
                self.$set(self.currentlyExpanded, index, false);
            } else {
                self.$set(self.currentlyExpanded, index, true);
            }
        }
    },
    computed: {
        addFields() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Position Name',
                minimum: 1,
                maximum: 1,
                type: 'string',
                placeholder: 'Role/Assignment'
            });


            addField('contacts', {
                title: 'People Responsible',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                directive: 'reference-select',
                params: {
                    restrictType: 'contact',
                }
            });

            // addField('title', {
            //     title: 'Grade Title',
            //     minimum: 1,
            //     maximum: 1,
            //     type: 'string',
            // });

            // addField('description', {
            //     title: 'Description',
            //     minimum: 0,
            //     maximum: 1,
            //     type: 'string',
            // });

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;
        },
        editFields() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Position Name',
                minimum: 1,
                maximum: 1,
                type: 'string',
                placeholder: 'Role/Assignment'
            });


            addField('contacts', {
                title: 'Contacts',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                directive: 'reference-select',
                params: {
                    restrictType: 'contact',
                }
            });

            addField('roles', {
                title: 'Roles / Permissions',
                description: 'Roles and permissions that should be assigned to people in this position for this group/team',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                directive: 'reference-select',
                params: {
                    restrictType: 'role',
                }
            });


            // addField('title', {
            //     title: 'Grade Title',
            //     minimum: 1,
            //     maximum: 1,
            //     type: 'string',
            // });

            // addField('description', {
            //     title: 'Description',
            //     minimum: 0,
            //     maximum: 1,
            //     type: 'string',
            // });

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;
        }
    }
}
</script>
<style lang="scss">
.ghost-dragging-class {
    opacity: 0.5;
    background: #c8ebfb;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}


.hover-grey {
    background: #fafafa;
}
</style>