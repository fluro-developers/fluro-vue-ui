<template>
    <flex-column class="fluro-task-edit-modal">
        <flex-column-header class="border-bottom">
            <v-container pa-2>
                <v-layout align-center row>
                    <v-flex>
                        <h4>
                            <fluro-icon icon="square-pencil" /> {{model.name}}</h4>
                    </v-flex>
                    <v-flex shrink>
                        <v-btn class="ma-0" small color="primary" @click="close(model)">
                            Done
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </flex-column-header>
        <fluro-tabset :justified="true">
            <fluro-tab heading="Description">
                <flex-column-body>
                    <v-container>
                        <fluro-content-form @input="update" v-model="model" :fields="fields" />
                    </v-container>
                </flex-column-body>
            </fluro-tab>
            <fluro-tab :heading="completeLabel">
                <flex-column-body>
                    <v-container fluid>
                        <fluro-content-form @input="update" v-model="model" :fields="completeFields" />
                    </v-container>
                </flex-column-body>
            </fluro-tab>
            <fluro-tab :heading="pendingLabel">
                <flex-column-body>
                    <v-container fluid>
                        <fluro-content-form @input="update" v-model="model" :fields="pendingFields" />
                    </v-container>
                </flex-column-body>
            </fluro-tab>
            <fluro-tab :heading="failedLabel">
                <flex-column-body>
                    <v-container fluid>
                        <fluro-content-form @input="update" v-model="model" :fields="failedFields" />
                    </v-container>
                </flex-column-body>
            </fluro-tab>
        </fluro-tabset>
        <!-- <pre>{{model}}</pre> -->
        <flex-column-footer class="border-top">
            <v-container class="py-1 px-2">
                <v-btn block @click="dismiss()">
                    Cancel
                </v-btn>
            </v-container>
        </flex-column-footer>
    </flex-column>
</template>
<script>
import _ from 'lodash';


import ModalMixin from '../../../mixins/ModalMixin';
import FluroContentForm from '../FluroContentForm.vue';
import FluroTabset from '../../ui/tabset/FluroTabset.vue';
import FluroTab from '../../ui/tabset/FluroTab.vue';




export default {
    components: {
        FluroContentForm,
        FluroTabset,
        FluroTab,
    },
    props: {
        options: {
            type: Object
        }
    },
    mixins: [ModalMixin],
    data() {

        var copy = JSON.parse(JSON.stringify(this.options.task));

        if (!copy.instructions) {
            copy.instructions = {};
        }
        return {
            model: copy,
            fields: [{
                    title: 'Task name',
                    key: 'name',
                    type: 'string',
                    minimum: 0,
                    maximum: 1,
                },
                {
                    title: 'Description',
                    description: 'Optional extra detail for how to complete this task',
                    placeholder: 'Optional extra detail for how to complete this task',
                    key: 'description',
                    type: 'string',
                    // directive: 'wysiwyg',
                    directive: 'textarea',
                    minimum: 0,
                    maximum: 1,
                },

            ]
        }
    },
    methods: {
        update() {
            console.log('Update occurred!');
            this.options.callback(this.model);
            // this.$emit('input', this.model);
            // this.$emit('input')
        }
    },
    asyncComputed: {
        postTypes: {
            default: [],
            get() {

                //TODO Filter this so it only shows posts that can be attached to
                //process, the definition of the process and the kinds of things that can be added to the process

                var self = this;
                return self.$fluro.types.subTypes('post');


                // var types = []

                // return self.$fluro.api.post('/post/types?list=true', {
                //         types:['proce'],

                //     })
                //     .then(function(res) {
                //         resolve(res.data);
                //         cachedValue = valueStorageCache.set(typesAsString, res.data);
                //         self.loadingPosts = false;
                //     })
                //     .catch(function(err) {
                //         cachedValue = valueStorageCache.set(typesAsString, null);
                //         reject(err);
                //         self.loadingPosts = false;
                //     });

            },
        },
    },
    computed: {
        postOptions() {
            var array = _.chain(this.postTypes)
                .map(function(postType) {
                    return {
                        name: postType.title,
                        value: postType.definitionName,
                    }
                })
                .orderBy(function(postType) {
                    return postType.name
                })
                .value();


            array.unshift({
                name: 'None',
                value: '',
            })

            return array;
        },
        postAttachOptions() {
            return [{
                    name: 'The Referenced Item',
                    value: '',
                },
                {
                    name: 'The Primary Key Contact',
                    value: 'contact',
                },
                {
                    name: 'Each Key Contact',
                    value: 'contacts',
                },
                {
                    name: 'The Card Itself',
                    value: 'card',
                }
            ]
        },
        completeFields() {
            var self = this;

            return [{
                    type: 'group',
                    asObject: true,
                    minimum: 1,
                    maximum: 1,
                    askCount: 1,
                    key: 'instructions',
                    fields: [{
                            title: 'Complete Label',
                            description: 'Set what label should be used when referring to this task being complete',
                            key: 'completeLabel',
                            type: 'string',
                            minimum: 0,
                            maximum: 1,
                            params: {
                                persistentDescription: true,
                            },
                        },
                        {
                            title: 'Instructions',
                            description: 'Add extra detail about what this task means when it is marked as complete',
                            key: 'completeDescription',
                            type: 'string',
                            directive: 'textarea',
                            minimum: 0,
                            maximum: 1,
                            params: {
                                persistentDescription: true,
                            }
                        },




                    ]
                }, {
                    title: 'Complete Post Type',
                    description: 'Ask for a post to be created for extra details when this task is marked as complete',
                    params: {
                        persistentDescription: true,
                    },
                    key: 'postComplete',
                    type: 'string',
                    directive: 'select',
                    minimum: 0,
                    maximum: 1,
                    options: self.postOptions,
                },

                {
                    title: 'Complete Post Attach',
                    description: 'Where should the post be attached to?',
                    params: {
                        persistentDescription: true,
                    },
                    key: 'postCompleteAttach',
                    type: 'string',
                    directive: 'select',
                    minimum: 1,
                    maximum: 1,
                    options: self.postAttachOptions,
                    expressions: {
                        show() {
                            return self.model.postComplete
                        }
                    },
                },
            ]
        },
        pendingFields() {
            var self = this;

            return [{
                    type: 'group',
                    asObject: true,
                    minimum: 1,
                    maximum: 1,
                    askCount: 1,
                    key: 'instructions',
                    className: 'form-group',
                    fields: [{
                            title: `Disable '${self.pendingLabel}' Option`,
                            description: `Disable the ability for this task to be marked as '${self.pendingLabel}'`,
                            key: 'pendingDisabled',
                            type: 'boolean',
                            minimum: 0,
                            maximum: 1,
                        },
                        {
                            type: 'group',
                            expressions: {
                                hide: 'model.pendingDisabled'
                            },
                            fields: [{
                                    title: 'Pending Label',
                                    description: 'Set what label should be used when referring to this task being in progress or',
                                    key: 'pendingLabel',
                                    params: {
                                        persistentDescription: true,
                                    },
                                    type: 'string',
                                    minimum: 0,
                                    maximum: 1,
                                },
                                {
                                    title: 'Instructions',
                                    description: 'Add extra detail about what this task means when it is marked as pending',
                                    key: 'pendingDescription',
                                    params: {
                                        persistentDescription: true,
                                    },
                                    type: 'string',
                                    directive: 'textarea',
                                    minimum: 0,
                                    maximum: 1,
                                },
                            ]
                        }
                    ]

                }, {
                    title: 'Pending Post Type',
                    description: 'Ask for a post to be created for extra details when this task is marked as pending',
                    key: 'postPending',
                    params: {
                        persistentDescription: true,
                    },
                    type: 'string',
                    directive: 'select',
                    minimum: 0,
                    maximum: 1,
                    options: self.postOptions,
                    expressions: {
                        hide: 'data.instructions.pendingDisabled',
                    },
                },

                {
                    title: 'Pending Post Attach',
                    description: 'Where should the post be attached to?',
                    params: {
                        persistentDescription: true,
                    },
                    key: 'postPendingAttach',
                    type: 'string',
                    directive: 'select',
                    minimum: 1,
                    maximum: 1,
                    options: self.postAttachOptions,
                    expressions: {
                        show() {
                            return self.model.postPending
                        }
                    },
                },
            ]
        },

        failedFields() {

            var self = this;

            return [{
                    type: 'group',
                    asObject: true,
                    minimum: 1,
                    maximum: 1,
                    askCount: 1,
                    key: 'instructions',
                    fields: [{
                            title: `Disable '${self.failedLabel}' Option`,
                            description: `Disable the ability for this task to be marked as '${self.failedLabel}'`,
                            key: 'failedDisabled',
                            type: 'boolean',
                            minimum: 0,
                            maximum: 1,
                        },
                        {
                            type: 'group',
                            expressions: {
                                hide: 'model.failedDisabled'
                            },
                            fields: [{
                                    title: 'Label',
                                    description: `Set what label should be used when referring to this task being '${self.failedLabel}'`,
                                    key: 'failedLabel',
                                    type: 'string',
                                    params: {
                                        persistentDescription: true,
                                    },
                                    minimum: 0,
                                    maximum: 1,
                                },
                                {
                                    title: 'Instructions',
                                    description: `Add extra detail about what this task means when it is marked as '${self.failedLabel}'`,
                                    key: 'failedDescription',
                                    type: 'string',
                                    params: {
                                        persistentDescription: true,
                                    },
                                    directive: 'textarea',
                                    minimum: 0,
                                    maximum: 1,
                                },
                            ]
                        },


                    ]
                }, {
                    title: 'Failed Post Type',
                    description: `Ask for a post to be created for extra details when this task is marked as '${self.failedLabel}'`,
                    params: {
                        persistentDescription: true,
                    },
                    key: 'postFailed',
                    expressions: {
                        hide: 'data.instructions.failedDisabled',
                    },
                    type: 'string',
                    directive: 'select',
                    minimum: 0,
                    maximum: 1,
                    options: self.postOptions,
                },
                {
                    title: 'Failed Post Attach',
                    description: 'Where should the post be attached to?',
                    params: {
                        persistentDescription: true,
                    },
                    key: 'postFailedAttach',
                    type: 'string',
                    directive: 'select',
                    minimum: 1,
                    maximum: 1,
                    options: self.postAttachOptions,
                    expressions: {
                        show() {
                            return self.model.postFailed
                        }
                    },
                },
            ]
        },
        instructions() {
            return this.model.instructions || {};
        },
        completeLabel() {
            return this.instructions.completeLabel || 'Complete';
        },
        pendingLabel() {
            return this.instructions.pendingLabel || 'Pending';
        },
        failedLabel() {
            return this.instructions.failedLabel || 'Failed';
        },
        // task() {
        //     return this.options.task;
        // },
        // // title() {
        // //     return this.task.name;
        // // },
        // description() {
        //     return this.task.description;
        // },
    },
}

</script>
<style lang="scss">
.fluro-task-edit-modal {

    min-width: 300px;

    @media(min-width: 768px) {
        max-width: 500px;
    }

    .fluro-editor-textarea {
        background: #fff;
    }

    .tabset-menu a.active {
        background: #fafafa;
    }

    .tabset-content {
        background: #fafafa;
    }


    .bordered {
        border: 1px solid rgba(#000, 0.05);
    }

    .fluro-content-form-field-checkbox {
        margin-bottom: 25px;

        .v-input__slot {
            margin-bottom: 5px;
        }
    }

}

</style>
