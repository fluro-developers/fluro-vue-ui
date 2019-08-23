<template>
    <div class="content-panel">
        <template v-if="config">
            <!-- @submit.prevent="submit" -->
            <form :disabled="state == 'processing'">
                <component @errorMessages="validate" ref="form" v-bind:is="component" :type="config.type" v-model="model" :definition="config.definition" v-if="component"></component>
                <h5>Realms</h5>
                <!-- <v-container class="grid-list-xl" pa-0> -->
                    <!-- <fluro-realm-select :expanded="true" v-model="realms" :type="typeName" :definition="definitionName" /> -->
                <!-- </v-container> -->
                <fluro-realm-select v-model="realms" :type="typeName" :definition="definitionName" />
                <!-- <h5>Tags</h5> -->

                <!-- <div class="block border-bottom"> -->
                    <!-- <div class="form-group"> -->
                        <!-- <label>Tags <span class="text-muted">{{tags | comma}}</span></label> -->
                         <h5>Tags</h5>
                        <v-combobox multiple v-model="tags" label="Type here and press enter to add tags" append-icon chips deletable-chips class="tag-input" :search-input.sync="tagSearch"></v-combobox>
                    <!-- </div> -->
                <!-- </div> -->



                <v-container class="grid-list-xl" pa-0>
                    <fluro-tag-select :expanded="true" v-model="tags" :type="typeName" :definition="definitionName" />
                </v-container>



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
                        <!-- <v-btn class="mx-0" :disabled="hasErrors" type="submit" color="primary">
                                Try Again
                            </v-btn> -->
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
                </div>
                <!-- <pre>{{model}}</pre> -->
            </form>
        </template>
        <template v-else>No definition</template>
    </div>
</template>
<script>
import Vue from 'vue';
import ContactPanel from './ContactPanel.vue';
import FluroRealmSelect from '../form/FluroRealmSelect.vue';





export default {
    props: {
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
            realms: [],
            tags: [],
            model: this.value,
            serverErrors: '',
            errorMessages: [],
            result: null,
            state: 'ready',
            tagSearch:'',
        }
    },
    created() {
        this.reset(true);
    },
    methods: {
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
            var self = this;

            /////////////////////////////////

            self.model = {};
            self.realms = [];
            self.tags = [];

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
        submit() {
            var self = this;
            self.validateAllFields();

            if (self.hasErrors) {
                //Gotta finish the stuff first!
                return;
            }

            self.state = 'processing';

            /////////////////////////////////

            var requestData = self.model;
            requestData.realms = self.realms;
            requestData.tags = self.tags;

            /////////////////////////////////

            //Create the post
            self.$fluro.api.post(`/content/${self.type}`, requestData)
                .then(function(result) {
                    self.reset(true);
                    self.$emit('success', result.data);

                    // console.log('RESULT WAS', result);
                    //Print a success message to the screen
                    self.$fluro.dispatch('notification', {
                        message:`${result.data.title} was saved successfully`,
                        options:{
                            type:'success',
                        }
                    });


                }, function(err) {
                    //Dispatch an error
                    var humanMessage = self.$fluro.utils.errorMessage(err);
                    self.$fluro.error(err);
                    self.serverErrors = humanMessage;
                    self.state = 'error';
                    self.$emit('error', err);


                    //Print the error to the screen
                    self.$fluro.dispatch('notification', {
                        message:humanMessage,
                        options:{
                            type:'error',
                        }
                    });


                    console.log('SWITCH STATE TO', err, self)

                })


        }
    },
    computed: {
        typeName() {
            return _.get(this.config, 'type.definitionName')
        },
        definitionName() {
            return _.get(this.config, 'definition.definitionName')
        },
        hasErrors() {
            return this.errorMessages.length ? true : false;
        },
        component() {
            var self = this;

            if (!self.type) {
                return;
            }

            switch (self.type) {
                case 'contact':
                    return 'contact-panel';
                    break;
            }

        }
    },
    components: {
        ContactPanel,
        FluroRealmSelect,
    },
    asyncComputed: {
        config: {
            get() {

                var self = this;

                //////////////////////////////////////////////

                if (!self.type || !self.type.length) {
                    return Promise.resolve(null);
                }

                //////////////////////////////////////////////

                return new Promise(function(resolve, reject) {
                    return self.$fluro.api.get(`/defined/type/${self.type}`).then(function(res) {
                        return resolve(res.data);
                    }, reject);
                })
            },
        }
    },
    watch: {
        'model': {
            handler: function(val, oldVal) {
                this.$emit('input', val);
            },
            deep: true,
        }
    },
}
</script>
<style scoped lang="scss">
.content-panel {

    // & /deep/ .grid-list-xl {
    //     .layout {
    //         &>.flex {
    //             padding-top: 0;
    //             padding-bottom: 0;
    //             margin-bottom: 5px;

    //         }
    //     }
    // }

    & /deep/ .additions {
        margin-top: -15px;
    }



    // & /deep/ .grid-list-xl .layout .flex .layout {
    //     margin-top: 0 !important;
    // }





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