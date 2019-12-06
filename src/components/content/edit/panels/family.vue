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
                                                <address-manager v-model="model.address" />
                                            </fluro-panel-body>
                                        </fluro-panel>
                                    </v-flex>
                                    <!--  -->
                                    <!--  -->
                                    <!--  -->
                                    <!-- Postal Address -->
                                    <v-flex>
                                        <fluro-panel>
                                            <fluro-panel-title>
                                                <div class="no-border-no-background" @click="toggleSamePostal()">
                                                    <fluro-toggle-item :inactive="!model.samePostal">Different Postal Address</fluro-toggle-item>
                                                </div>
                                            </fluro-panel-title>
                                            <fluro-panel-body v-if="model.samePostal">
                                                <address-manager v-model="model.postalAddress" />
                                            </fluro-panel-body>
                                        </fluro-panel>
                                    </v-flex>
                                </v-layout>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <!-- -->
                <!--  -->
                <tab :heading="`${membersLength} Members`" v-if="model._id">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid grid-list-lg>
                            <constrain sm>
                                <v-layout row wrap justify-space-around fill-height style="overflow-x:scroll">
                                    <div v-for="(contact, index) in model.items" class="cards border">
                                        <family-member-card :contactDefinitions="contactDefinitionOptions" v-model="model.items[index]" />
                                    </div>
                                    <div class="ghost-card" @click="create">
                                        <div class="add-contact ghost">
<!--                                             <div class="avatar-flex"> -->
                                                <div class="add-circle">
                                                    <fluro-icon class="add-icon" icon="plus"/>
                                                </div>
                                                <h5 class="add-contact-text">Add Contact</h5>
                                            <!-- </div> -->
                                        </div>
                                    </div>
                                </v-layout>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                    <!--                     <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
 -->
                </tab>
                <!--  -->
                <!--  -->
                <tab :heading="`${definition.title} Information`" v-if="definition && definition.fields && definition.fields.length">
                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                </tab>
            </tabset>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FamilyMemberCard from '../components/FamilyMemberCard.vue';
import FluroContentEditMixin from '../FluroContentEditMixin';
import AddressManager from '../components/AddressManager.vue';
import { FluroIcon, Layout } from 'fluro-vue-ui'

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        AddressManager,
        FamilyMemberCard
    },
    created() {},
    mixins: [FluroContentEditMixin, Layout],
    computed: {
        fieldsOutput() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Title/Family Name',
                placeholder: 'Family Name',
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
        membersLength() {
            var self = this;
            if (_.get(self.model, 'items')) {
                return self.model.items.length;
            } else {
                return 0;
            }
        },
        contactDefinitionOptions() {
            var self = this;
            var arr = [];
            var defs = self.definitions;
            _.forEach(defs, function(obj) {
                return arr.push({ name: obj.title, value: obj.definitionName });
            });
            arr.splice(0, 0, { name: 'Contact', value: '' });
            return arr;
        }
    },
    methods: {
        toggleSamePostal() {
            var self = this;
            if (!self.model.samePostal) {
                self.model.samePostal = true;
            } else {
                self.model.samePostal = false;
            }
        },
        create() {
            var self = this;
            //self.$fluro.global.create

            var template = {
                    family: self.model,
                    lastName: self.model.title,
                };


                console.log('Create new contact', template)
            self.$fluro.global.create('contact', {
                template,
            }, true)
                .then(function(res) {
                    self.model.items.push(res);
                });
        }
    },
    data() {
        return {}
    },
    asyncComputed: {
        definitions: {
            default: [],
            get() {
                var self = this;
                return new Promise(function(resolve, reject) {
                    return self.$fluro.api
                        .get('defined/types/contact')
                        .then(function(res) {
                            resolve(res.data);
                            return self.loading = false;
                        })
                        .catch(function(err) {
                            console.log(err);
                            self.$fluro.notify(err);

                            return reject(err);
                        });
                });
            }
        }
    }
}
</script>
<style lang="scss">
.no-border-no-background .toggle-item {
    border: none !important;
    background: none !important;
    font-size: 14px;
    padding: 0px;
}

.cards {
    width: 200px !important;
    background-color: white;
    margin: 10px;

}

.border {
    border-color: rgba(0, 0, 0, 0.05);
    border-style: solid;
    border-width: 1px;
}

.ghost-card {
    padding: 16px;
    width: 200px !important;
    margin: 10px;
    border: 1px dashed #ccc;
    color: inherit;
    background-color: transparent;
    transition: background-color 0.3s;
    &:hover {
        background-color: white;
    }
}

.add-circle {
    border: 1px dashed #ccc;
    border-radius: 50%;
    height: 132.8px;
    width:132.8px;
    padding: 8px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.filler-ghost {
    height: 100%;
    display: block;
}

.add-icon {
    width:100%;
    height:100%;
}

.add-contact-text {
    text-align: center;
    padding-top: 16px;
}
</style>