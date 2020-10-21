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
                            <fluro-avatar left md :id="userAvatarID" :type="userAvatarType"></fluro-avatar>    
                            <v-flex d-flex>
                                <h3 title>{{displayTitle}}</h3>
                            </v-flex>
                        </v-layout>
                    </slot>
                    <form @submit.prevent="submit" :disabled="state == 'processing'">
                        <fluro-content-form key="form" ref="form" :options="options" v-model="model.data" :fields="form.fields" />
                        <div class="actions">
                            <template v-if="state == 'processing'">
                                <template v-if="webMode">
                                    <fluro-button :loading="true" :block="mobile" :large="mobile" :disabled="true">{{saveButtonText}}</fluro-button>
                                </template>
                                <template v-else>
                                    <v-btn :block="mobile" :large="mobile" class="mx-0" :disabled="true">
                                        {{saveButtonText}}
                                        <v-progress-circular indeterminate></v-progress-circular>
                                    </v-btn>
                                </template>
                                <!-- <template v-if="webMode">
                                    <fluro-button class="mx-0" :disabled="true">
                                        Processing
                                        <v-progress-circular indeterminate></v-progress-circular>
                                    </fluro-button>
                                </template>
                                <template v-else>
                                    <v-btn class="mx-0" :disabled="true">
                                        Processing
                                        <v-progress-circular indeterminate></v-progress-circular>
                                    </v-btn>
                                </template> -->
                            </template>
                            <template v-else-if="state == 'error'">
                                <v-alert :value="true" type="error" outline>
                                    {{serverErrors}}
                                </v-alert>
                                <template v-if="webMode">
                                    <fluro-button :block="mobile" :large="mobile" @click.prevent.native="state = 'ready'">Try Again</fluro-button>
                                </template>
                                <template v-else>
                                    <v-btn :block="mobile" :large="mobile" class="mx-0" color="primary" @click.prevent.native="state = 'ready'">
                                        Try Again
                                    </v-btn>
                                </template>
                            </template>
                            <template v-else>
                                <v-alert :value="true" type="error" outline v-if="hasErrors">
                                    Please check the following issues before submitting
                                    <div v-for="error in errorMessages">
                                        <strong>{{error.title}}</strong>: {{error.messages[0]}}
                                    </div>
                                </v-alert>
                                <slot name="submit" :hasErrors="hasErrors">
                                    <template v-if="webMode">
                                        <!-- type="submit" -->
                                        <fluro-button @click.native.prevent="submit" tag="button" type="submit" :block="mobile" :large="mobile" :disabled="hasErrors">
                                            {{saveButtonText}}
                                        </fluro-button>
                                    </template>
                                    <template v-else>
                                        <v-btn :block="mobile" :large="mobile" class="mx-0" :disabled="hasErrors" type="submit" color="primary">
                                            {{saveButtonText}}
                                        </v-btn>
                                        <!-- <v-btn  class="mx-0" :disabled="hasErrors" type="submit" color="primary">{{submitText}}</v-btn> -->
                                    </template>
                                </slot>
                            </template>
                        </div>
                    </form>
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
            mounted: false,
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
        this.mounted = true;
    },
    computed: {
        // dataModel: {
        //     get() {
        //         return this.model.data;
        //     },
        //     set(d) {
        //      console.log('Set data model', d)
        //         this.model.data = d;
        //     }
        // },
        userAvatarID() {
            return this.user ? this.user.persona || this.user._id : null;
        },
        userAvatarType() {
            return this.user && this.user.persona ? 'persona' : 'user';
        },
        webMode() {

            var self = this;
            if (!self.mounted) {
                return;
            }

            if (!self.$fluro.app) {
                console.log('NO APP');
                return;
            }
            var element = self.$el;
            if (!element) {
                console.log('NO ELEMENT');
                return;
            }

            if (!element.ownerDocument) {
                console.log('NO DOCUMENT');
                return;
            }

            if (!element.ownerDocument.defaultView) {
                console.log('NO DEFAULT VIEW');
                return;
            }

            // console.log('ADMIN?', element.ownerDocument.defaultView.adminPanelMode);

            return !element.ownerDocument.defaultView.adminPanelMode;
        },
        mobile() {
            return this.$vuetify.breakpoint.xsOnly;
        },
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
            var canCreate = this.$fluro.access.can('create', this.type, 'post', this.webMode);
            var canSubmit = this.$fluro.access.can('submit', this.type, 'post', this.webMode);
            return canCreate || canSubmit;
        },
        user() {
            if (this.webMode) {
                if (this.$fluro.app) {
                    return this.$fluro.app.user;
                } else {
                    return;
                }
            } else {

                return this.$fluro.auth.getCurrentUser();
                // return this.$fluro.auth.getCurrentUser();
            }
        },
        ...mapFields('fluro', [
            'application', //The Fluro application and all of it's permissions and data
            // 'user', //The authenticated user if they log in
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
            self.$set(self.model, 'data', {});
           

            // self.$set(self.model, 'data', {});
            var form = self.$refs.form;
            if(form) {
             console.log('RESET FORM NOW')
             form.reset();
            }

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
