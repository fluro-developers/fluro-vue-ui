<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab heading="Basic Info">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <div class="grid-list-xl">
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.domain" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.forwards" v-model="model" />
                                <!--  <div v-if="definition && definition.fields && definition.fields.length">
                                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields">
                                    </fluro-content-form>
                                </div> -->
                            </div>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Authentication">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <div class="grid-list-xl">
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.forceSSL" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.authenticationStyle" v-model="model" />
                                <!--  <div v-if="definition && definition.fields && definition.fields.length">
                                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields">
                                    </fluro-content-form>
                                </div> -->
                            </div>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <template v-if="model.authenticationStyle == 'application'">
            <tab heading="Application Permissions">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <h5 margin>Application Permissions</h5>
                            <p>Add permissions here that will be attributed to this application's API Key whether a user is signed in or not.</p>
                            <fluro-permission-select @input="modelUpdated" v-model="model.permissionSets" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="User Permissions">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <h5 margin>User Permissions</h5>
                            <p>Add permissions here that will be attributed to a logged in user when signed in to this application. These will be merged with any existing permissions retrieved from a user's managed persona in the '{{application.title}}' account</p>
                            <fluro-permission-select @input="modelUpdated" v-model="model.userPermissionSets" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Advanced">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <h5 margin>Advanced</h5>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.apipath" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.timezone" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.gaTrackingCode" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.supportEmail" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.favicon" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.headerInject" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.footerInject" v-model="model" />

                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
        </template>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from '../FluroContentEditMixin';
import FluroPermissionSelect from "../../../form/FluroPermissionSelect.vue";

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {


    mixins: [FluroContentEditMixin],
    components: {
        FluroPermissionSelect,
    },
    asyncComputed: {

    },
    computed: {
        showOutline() {
            return false; //true; //false;//true;//false;//true;
        },
        fieldsOutput() {

            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Title',
                minimum: 1,
                maximum: 1,
                type: 'string',
            })

            // ///////////////////////////////////

            addField('domain', {
                title: 'Domain Name',
                minimum: 1,
                maximum: 1,
                type: 'string',
                description: 'Add a domain name for this application (without https://)',
                placeholder: 'Eg. website.com',
            })

            addField('forwards', {
                title: 'Forwarding Domains',
                minimum: 0,
                maximum: 0,
                type: 'string',
                description: 'Add domain names that should redirect to the primary domain name',
                placeholder: 'Eg. www.website.com',
            })


            addField('forceSSL', {
                title: 'Force SSL',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                description: 'Check this box to redirect all requests to https://',
            })


            addField('authenticationStyle', {
                title: 'Authentication Style',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive:'select',
                options: [{
                        title: 'Application',
                        value: 'application',
                    },
                    {
                        title: 'Fluro Browser Cookie',
                        value: 'global',
                    },
                ]
            })

            addField('apipath', {
                title: 'API URL',
                minimum: 0,
                maximum: 1,
                type: 'string',
                description: 'Specify which API URL this application should use. If left blank, the default fluro api url will be used.',
                placeholder: 'https://api.fluro.io',
            })


            addField('timezone', {
                title: 'Timezone',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'timezone-select',
                description: 'Which timezone should be used for this application',
            })

            addField('gaTrackingCode', {
                title: 'Google Analytics ID',
                minimum: 0,
                maximum: 1,
                type: 'string',
                placeholder:'UA-XXXXXX',
                description: 'Paste your GA tracking code to enable google analytics to track this site',
            })

            addField('supportEmail', {
                title: 'Support Email Address',
                minimum: 0,
                maximum: 1,
                type: 'email',
                placeholder:'support@yourdomain.com',
                description: 'The default support/contact email for notifications and enquiries regarding this application',
            })

            addField('favicon', {
                title: 'Favicon',
                minimum: 0,
                maximum: 1,
                type: 'reference',
                params:{
                    restrictType:'image',
                },
                description: 'Choose an image to use for the favicon. (Recommend a 1:1 ratio and at least 1024 x 1024px)',
            })

            addField('headerInject', {
                title: 'Header Injection Code',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive:'code',
                params:{
                    syntax:'html',
                },
                description: 'Include HTML that can be injected above the closing </head> tag',
            })

            addField('footerInject', {
                title: 'Footer Injection Code',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive:'code',
                params:{
                    syntax:'html',
                },
                description: 'Include HTML that can be injected above the closing </body> tag',
            })

           




            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;

        },
    },
    methods: {
        modelUpdated() {
            this.update(this.model);
        },
    },
    data() {
        return {

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
</style>