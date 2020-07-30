<template>
    <div>
        <template v-if="form">
            <template v-if="!allowed">
                <template v-if="user">
                    <slot name="authenticated" :form="form"></slot>
                </template>
                <template v-if="!user">
                    <slot name="unauthenticated" :form="form"></slot>
                </template>
            </template>
            <template v-if="allowed">
                <div class="fluro-post-form">
                    <!-- :targetID="targetID" -->
                    <slot name="header" :title="displayTitle" :form="form" :targetID="targetID">
                        <v-layout>
                            <fluro-avatar left md :id="user.persona" type="persona"></fluro-avatar>    
                            <v-flex d-flex>
                                <h3 title>{{displayTitle}}</h3>
                            </v-flex>
                        </v-layout>
                    </slot>
                    <form @submit.prevent="submit" :disabled="state == 'processing'">
                        <fluro-content-form ref="form" :options="options" v-model="model.data" :fields="form.fields" />
                        <div class="actions">
                            <template v-if="state == 'processing'">
                                <v-btn class="mx-0" :disabled="true">
                                    Processing
                                    <v-progress-circular indeterminate></v-progress-circular>
                                </v-btn>
                            </template>
                            <template v-else-if="state == 'error'">
                                <v-alert :value="true" type="error" outline>
                                    {{serverErrors}}
                                </v-alert>
                                <v-btn class="mx-0" color="primary" @click.prevent.native="state = 'ready'">
                                    Try Again
                                </v-btn>
                            </template>
                            <template v-else>
                                <v-alert :value="true" type="error" outline v-if="hasErrors">
                                    Please check the following issues before submitting
                                    <div v-for="error in errorMessages">
                                        <strong>{{error.title}}</strong>: {{error.messages[0]}}
                                    </div>
                                </v-alert>
                                <slot name="submit" :hasErrors="hasErrors">
                                    <v-btn class="mx-0" :disabled="hasErrors" type="submit" color="primary">
                                        {{saveButtonText}}
                                    </v-btn>
                                </slot>
                            </template>
                        </div>
                    </form>

                    <!-- <pre>{{model}}</pre> -->
                    <!-- <a @click="clear()">Clear</a> -->
                </div>
            </template>
        </template>
    </div>
</template>
<script>
import FluroContentForm from './FluroContentForm.vue';
import _ from 'lodash';
import Vue from 'vue';




import { mapFields } from 'vuex-map-fields';


//////////////////////////////////////////////////

export default {
    props: {
        'title': {
            type: String,
        },
        'type': {
            type: String,
        },
        'cancelButtonText': {
            type: String,
        },
        'saveButtonText': {
            type: String,
            default: 'Submit',
        },
        'target': {
            type: [Object, String],
        },
        'options': {
            default: function() {
                return {}
            },
            type: Object,
        },
    },
    data() {
        return {
            model: {
                data: {},
            },
            serverErrors: '',
            errorMessages: [],
            thread: [],
            state: 'ready',
        }
    },
    created() {

    },
    mounted() {
        var self = this;
        self.$watch(function() {
            return _.get(self.$refs, 'form.errorMessages');
        }, self.validate);
        self.validate();
    },
    computed: {
        targetID() {
            return this.$fluro.utils.getStringID(this.target);
        },
        hasErrors() {
            // console.log('Has Errors?', this.errorMessages)
            return this.errorMessages.length ? true : false;
        },

        displayTitle() {

            if (this.title) {
                return this.title;
            }
            return `Add ${this.form.title}`;
        },
        allowed() {
            var canCreate = this.$fluro.access.can('create', this.type, 'post');
            var canSubmit = this.$fluro.access.can('submit', this.type, 'post');

            return canCreate || canSubmit;

        },
        ...mapFields('fluro', [
            'application', //The Fluro application and all of it's permissions and data
            'user', //The authenticated user if they log in
        ]),
    },
    components: {
        FluroContentForm,
    },
    asyncComputed: {
        form: {
            default: [],
            get() {
                return this.$fluro.content.type(this.type);
            }
        }
    },
    methods: {
        validate() {
            this.errorMessages = _.get(this.$refs, 'form.errorMessages');
        },
        clear() {
            this.reset()
        },
        reset() {
            var self = this;
            //Reset the model
            // Vue.set(self.model, 'data', {});
            self.$set(self.model, 'data', {});

            self.state = 'ready';
            self.$emit('reset');
        },
        submit() {


            // console.log('SUBMIT NOW', this)


            var self = this;

            self.validate();


            self.state = 'processing';

            //Create the post
            self.$fluro.content.submitPost(this.target, this.type, this.model)
                .then(function(post) {
                    // console.log('Created the post!', post);

                    self.$emit('created', post);
                    self.$emit('success', post);
                    self.reset();

                }, function(err) {
                    //Dispatch an error
                    self.$fluro.error(err);
                    self.state = 'error';
                    self.$emit('error', err);
                    self.serverErrors = self.$fluro.utils.errorMessage(err);
                    
                })


        }
    }
}
</script>
<style scoped lang="scss">
.fluro-post-form {

    .v-btn {
        .v-progress-circular {
            width: 15px !important;
            height: 15px !important;
            margin-left: 15px;
        }
    }
}
</style>