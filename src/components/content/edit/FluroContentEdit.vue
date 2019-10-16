<template>
    <flex-column class="content-edit">
        <fluro-page-preloader v-if="showLoading" contain />
        <template v-else>
            <form class="flex-column" @submit.prevent="" :disabled="state == 'processing'">
                <flex-column-header v-if="$vuetify.breakpoint.smAndUp">
                    <template v-if="state == 'error'">
                        <v-alert :value="true" type="error" style="margin:0;" @click.prevent.native="state = 'ready'">
                            {{serverErrors}}
                        </v-alert>
                        <!-- <v-btn class="mx-0" @click.prevent.native="state = 'ready'"> -->
                        <!-- Ok -->
                        <!-- </v-btn> -->
                    </template>
                </flex-column-header>
                <flex-column-header class="border-bottom">
                    <page-header :type="typeName">
                        <template v-slot:left>
                            <h3>{{title}} <span class="small text-muted">{{definitionTitle}}</span></h3>
                        </template>
                        <!-- <template v-slot:rightmobile> -->
                        <!-- </template> -->
                        <template v-slot:right>
                            <!-- <pre>{{model.realms}}</pre> -->
                            <fluro-realm-select v-model="model.realms" :type="typeName" :definition="definitionName" />
                            <v-btn v-if="model._id" icon class="mr-0" small @click="$actions.open([model])">
                            <fluro-icon icon="ellipsis-h" />
                        </v-btn>
                            <v-btn @click="cancel">
                                Close
                            </v-btn>
                            <v-btn class="mx-0" :loading="state == 'processing'" :disabled="hasErrors" @click="submit" color="primary">
                                Save
                            </v-btn>
                        </template>
                    </page-header>
                    <!-- <pre>{{model}}</pre> -->
                    <!-- <v-layout> -->
                    <!-- <v-flex></v-flex> -->
                    <!-- <v-spacer /> -->
                    <!-- <v-flex shrink> -->
                    <!-- <h5>Realms</h5>
                        <fluro-realm-select v-model="model.realms" :type="typeName" :definition="definitionName" />
                        <h5>Tags</h5>
                        <v-combobox multiple v-model="model.tags" label="Type here and press enter to add tags" append-icon chips deletable-chips class="tag-input" :search-input.sync="tagSearch"></v-combobox>
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
                                <v-btn class="mx-0" @click.prevent.native="state = 'ready'">
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
                                <v-btn class="mx-0" :disabled="hasErrors" @click="submit" type="submit" color="primary">
                                    Save
                                </v-btn>
                            </template>
                        </div> -->
                    <!-- </v-flex> -->
                    <!-- </v-layout> -->
                </flex-column-header>
                <component @errorMessages="validate" ref="form" :context="context" @input="updateModel" v-bind:is="component" :type="typeConfig" :config="config" v-model="model" :definition="definition" v-if="component"></component>
                <!-- <pre>{{model.state}} {{model.dueDate}}</pre> -->
                <template v-if="$vuetify.breakpoint.xsOnly">
                    <flex-column-footer>
                        <template v-if="state == 'error'">
                            <v-alert :value="true" type="error" style="margin:0;" @click.prevent.native="state = 'ready'">
                                {{serverErrors}}
                            </v-alert>
                        </template>
                    </flex-column-footer>
                    <flex-column-footer class="border-top">
                        <v-container py-0 px-1>
                            <fluro-realm-select block v-model="model.realms" :type="typeName" :definition="definitionName" />
                        </v-container>
                    </flex-column-footer>
                    <flex-column-footer class="border-top">
                        <v-container py-0 px-1>
                            <v-layout>
                                <v-flex>
                                    <v-btn block @click="cancel">
                                        Cancel
                                        <!-- <fluro-icon right icon="times" /> -->
                                    </v-btn>
                                </v-flex>
                                <v-spacer />
                                <v-flex>
                                    <v-btn class="mr-0" block :loading="state == 'processing'" :disabled="hasErrors" @click="submit" color="primary">
                                        Save
                                    </v-btn>
                                    <!-- <v-btn block :disabled="hasErrors" type="submit" color="primary">
                                        Save
                                        <fluro-icon right icon="check" />
                                    </v-btn> -->
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </flex-column-footer>
                </template>
                <!-- <flex-column-body style="height:300px"> -->
                <!-- <pre>{{model}}</pre> -->
                <!-- </flex-column-body> -->
                <!-- <flex-column-body> -->
                <!-- @submit.prevent="submit" -->
                <!-- <component @errorMessages="validate" ref="form" v-bind:is="component" :type="config.type" v-model="model" :definition="config.definition" v-if="component"></component> -->
                <!-- </div> -->
                <!-- </div> -->
                <!-- <v-container class="grid-list-xl" pa-0> -->
                <!-- WOOOT -->
                <!-- <fluro-tag-select :expanded="true" v-model="tags" :type="typeName" :definition="definitionName" /> -->
                <!-- </v-container> -->
                <!-- <div class="actions">
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
                            <v-btn class="mx-0" @click.prevent.native="state = 'ready'">
                                Try Again
                            </v-btn>
                            <v-btn class="mx-0" :disabled="hasErrors" type="submit" color="primary">
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
                            <v-btn class="mx-0" :disabled="hasErrors" @click="submit" type="submit" color="primary">
                                Save
                            </v-btn>
                        </template>
                    </div> -->
                <!-- <pre>{{model.details}}</pre> -->
                <!-- </flex-column-body> -->
            </form>
        </template>
    </flex-column>
</template>
<script>
import Vue from 'vue';


import FluroRealmSelect from '../../form/realmselect/FluroRealmSelect.vue';

// import Contact from './panels/Contact.vue';
// import Event from './panels/Event.vue';

export default {
    props: {
        context: {
            type: String,
            default: 'create',
        },
        'type': {
            type: String,
        },
        'value': {
            type: Object,
            default: function() {
                return {
                    realms: [],
                    tags: [],
                };
            }
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
            model: JSON.parse(JSON.stringify(this.value)),
            serverErrors: '',
            errorMessages: [],
            result: null,
            state: 'ready',
            tagSearch: '',
            loading: true,
        }
    },
    created() {
        // this.reset(true);
    },
    methods: {
        updateModel() {
            this.$emit('input', this.model);
        },
        cancel() {
            this.$emit('cancel');
        },
        touch() {
            _.each(this.formFields, function(component) {
                component.touch();
            })
        },
        validate() {
            var form = this.$refs.form;
            if (!form) {
                return [];
            }
            this.errorMessages = form.errorMessages || [];
        },
        validateAllFields() {
            var form = this.$refs.form;
            form.touch();
            this.validate();
        },
        reset(suppressEvent) {
            console.log('RESET')
            var self = this;

            /////////////////////////////////

            self.model = {
                realms: [],
                tags: [],
            }

            /////////////////////////////////

            if (self.$refs.form) {
                self.$refs.form.reset();
            }

            self.result = null;
            self.state = 'ready';

            if (!suppressEvent) {
                self.$emit('reset');
            }
        },
        preprocessCreateData(data) {

            var self = this;

            //////////////////////////////////

            switch (self.typeName) {
                case 'process':

                    //If it's a card and the card has no title
                    if (!data.title || !data.title.length) {

                        //But the card refers to an item
                        if (data.item && data.item.title && data.item.title.length) {
                            //Use the items title for the card title
                            data.title = data.item.title;
                        }
                    }
                    break;
            }

            //////////////////////////////////

            return data;
        },
        submit() {
            var self = this;
            self.validateAllFields();

            if (self.hasErrors) {
                console.log('WE HAVE ERRORS', self.errorMessages);
                //Gotta finish the stuff first!
                return;
            }

            self.state = 'processing';

            /////////////////////////////////

            var requestData = Object.assign({}, self.model);


            var definedType = requestData.definition || self.definitionName || self.typeName;
            // requestData.realms = self.realms;
            // requestData.tags = self.tags;

            /////////////////////////////////

            var context = self.context;
            if (requestData._id) {
                context = 'edit';
            }

            console.log('SENDING TO SERVER', context, self.model);

            switch (context) {
                case 'edit':

                    self.$fluro.api.put(`/content/${definedType}/${requestData._id}`, requestData)
                        .then(function(result) {

                            console.log('UPDATE SUCCESS', result)
                            self.$fluro.resetCache();



                            // self.reset(true);
                            self.$emit('success', result.data);

                            // console.log('RESULT WAS', result);
                            //Print a success message to the screen
                            self.$fluro.notify(`${result.data.title} was updated successfully`);


                        })
                        .catch(function(err) {
                            console.log('ERROR MESAGE HAPPENED')
                            //Dispatch an error
                            var humanMessage = self.$fluro.utils.errorMessage(err);
                            self.$fluro.error(err);
                            self.serverErrors = humanMessage;
                            self.state = 'error';
                            self.$emit('error', err);
                        })

                    break;
                default:

                    //Preprocess our create request
                    requestData = self.preprocessCreateData(requestData);

                    //Create a new item
                    self.$fluro.api.post(`/content/${definedType}`, requestData)
                        .then(function(result) {
                            console.log('CREATE SUCCESS', result)
                            self.reset(true);
                            self.$emit('success', result.data);

                            self.$fluro.resetCache();

                            // console.log('RESULT WAS', result);
                            //Print a success message to the screen
                            self.$fluro.notify(`${result.data.title} was created successfully`);


                        })
                        .catch(function(err) {
                            console.log('ERROR MESAGE HAPPEND')
                            //Dispatch an error
                            var humanMessage = self.$fluro.utils.errorMessage(err);
                            self.$fluro.error(err);
                            self.serverErrors = humanMessage;
                            self.state = 'error';
                            self.$emit('error', err);
                        })
                    break;
            }



        }
    },
    computed: {
        showLoading() {
            return this.loading || !this.component;
        },
        title() {

            if (this.model.title) {
                return this.model.title
            }

            return 'New';
        },
        definition() {
            return this.config.definition;
        },
        typeConfig() {
            return this.config.type;
        },
        definitionTitle() {
            return this.definition ? this.definition.title : this.typeConfig.title;
        },
        typeName() {
            return this.typeConfig.definitionName;
        },
        definitionName() {
            return this.definition ? this.definition.definitionName : ''; //this.typeConfig.definitionName;
        },
        hasErrors() {
            return this.errorMessages.length ? true : false;
        },
        component() {
            var self = this;

            if (!self.typeName) {
                return;
            }

            return () => import(`./panels/${this.typeName}.vue`)



            // switch (self.typeName) {
            //     case 'contact':
            //     case 'mailout':
            //         return 'contact';
            //         break;
            //     default:
            //         return self.typeName;
            //         break;
            // }

        }
    },
    components: {
        // Contact,
        FluroRealmSelect,
    },
    asyncComputed: {
        config: {
            get() {

                var self = this;

                //////////////////////////////////////////////

                if (!self.type || !self.type.length) {

                    Promise.reject();
                    return self.loading = false;
                }

                self.loading = true;

                //////////////////////////////////////////////

                return new Promise(function(resolve, reject) {
                    return self.$fluro.api.get(`/defined/type/${self.type}`).then(function(res) {
                        resolve(res.data);
                        return self.loading = false;
                    }, reject);
                })
            },
        }
    },
    watch: {
        value() {
            // this.model = JSON.parse(JSON.stringify(this.value));
        },
        // 'model': {
        //     handler: function(val, oldVal) {

        //         // console.log('MODEL CHANGED', val);
        //         this.$emit('input', val);
        //     },
        //     deep: true,
        // }
    },
}
</script>
<style lang="scss">
.modal-inner {
    .content-edit {
        width: 100%;
        max-width: 1200px;
        min-width: 80vw;
    }
}
</style>
<style scoped lang="scss">
.content-edit {



    // @media(max-width: 768px) {
    //     min-width: 0;
    // }

    background: #fafafa;

    & /deep/ .tabset-menu {
        background: #fff;

        a.active {
            background: #fafafa;
        }
    }

    & /deep/ .v-text-field--outline {
        .v-input__control .v-input__slot {
            border-width: 1px !important;
            border-color: rgba(#000, 0.3);
            background: #fff !important;
            box-shadow: inset 0 1px 3px rgba(#000, 0.1) !important;
        }

        &.v-input--is-focused,
        &.success--text,
        &.error--text {

            .v-input__control .v-input__slot {
                border-color: currentColor;
            }
        }
    }

    & /deep/ .v-label {
        font-weight: 500;
    }

}
</style>