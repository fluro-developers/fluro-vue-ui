<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <tabset :justified="true" :vertical="true">
                <!--  <template v-slot:menuprefix>
                    <template v-if="context == 'edit' && $vuetify.breakpoint.mdAndUp">
                        <flex-column-header style="text-align:center">
                            <div style="padding: 10px; max-width:200px; margin: auto;">
                                <fluro-image  :height="200" :image-height="450" contain :item="model" :cacheKey="imageCacheKey" :spinner="true"></fluro-image>
                            </div>
                            <div>
                                {{model.width}}x{{model.height}}
                            </div>
                        </flex-column-header>
                    </template>
                </template> -->
                <tab heading="Details">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid grid-list-lg>
                            <constrain sm>
                                <v-layout row wrap>
                                    <!--  -->
                                    <v-flex xs12 sm12>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                    </v-flex>
                                    <!--  -->
                                    <v-flex xs12 sm6>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.emails" v-model="model"></fluro-content-form-field>
                                    </v-flex>
                                    <!--  -->
                                    <v-flex xs12 sm6>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.phoneNumbers" v-model="model"></fluro-content-form-field>
                                    </v-flex>
                                    <!-- -->
                                    <!--  -->
                                    <!-- Household Address -->
                                    <v-flex xs12 sm12>
                                        <fluro-panel>
                                            <fluro-panel-title>
                                                Home Address
                                            </fluro-panel-title>
                                            <fluro-panel-body>
                                                <address-manager v-model="model" />
                                            </fluro-panel-body>
                                        </fluro-panel>
                                    </v-flex>
                                    <v-flex xs12 sm12>
                                        <fluro-privacy-select v-model="model.privacy" />
                                    </v-flex>
                                </v-layout>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <!--  -->
                <tab heading="Rooms">
                    <v-container fluid grid-list-lg>
                        <constrain sm>
                            <room-manager v-model="model.rooms" />
                        </constrain>
                    </v-container>
                </tab>
                <tab heading="Key Contacts">
                    <v-container fluid grid-list-lg>
                        <constrain sm>
                            <key-contact-location-manager v-model="model.keycontacts" />
                        </constrain>
                    </v-container>
                </tab>
                <tab :heading="`${definition.title} Information`" v-if="definition && definition.fields && definition.fields.length">
                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                </tab>
            </tabset>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////
import RoomManager from '../components/RoomManager.vue';
import FluroContentEditMixin from '../FluroContentEditMixin';
import AddressManager from '../components/AddressManager.vue';
import KeyContactLocationManager from '../components/KeyContactLocationManager.vue';
import { FluroIcon, Layout } from 'fluro-vue-ui'

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        AddressManager,
        RoomManager,
        KeyContactLocationManager,
    },
    created() {},
    mixins: [FluroContentEditMixin, Layout],
    computed: {
        fieldsOutput() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Title',
                placeholder: 'Location Name',
                minimum: 1,
                maximum: 1,
                type: 'string',
            });

            ///////////////////////////////////

            addField('phoneNumbers', {
                title: 'Phone Numbers',
                minimum: 0,
                maximum: 0,
                type: 'string',
            });

            addField('emails', {
                title: 'Emails',
                minimum: 0,
                maximum: 0,
                type: 'string',
            });



            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;
        },
    },
    methods: {},
    data() {
        return {}
    },
    asyncComputed: {}
}
</script>
<style lang="scss">
.no-border-no-background .toggle-item {
    border: none !important;
    background: none !important;
    font-size: 14px;
    padding: 0px;
}
</style>