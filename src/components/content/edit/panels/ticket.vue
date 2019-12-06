<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab>
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <v-layout column grid-list-xl>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.email" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.contact" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.value" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.event" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.interaction" v-model="model"></fluro-content-form-field>
                                <fluro-panel>
                                    <fluro-panel-title>
                                        <div class="no-border-no-background" @click="toggleCollected()">
                                            <fluro-toggle-item :inactive="!model.collected">Ticket has been collected</fluro-toggle-item>
                                        </div>
                                    </fluro-panel-title>
                                    <fluro-panel-body v-if="model.collected">
                                        <v-layout row wrap>
                                            <v-flex xs-12 sm6 px-1>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.collectedBy" v-model="model"></fluro-content-form-field>
                                            </v-flex>
                                            <v-flex xs-12 sm6 px-1>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.collectionDate" v-model="model"></fluro-content-form-field>
                                            </v-flex>
                                        </v-layout>
                                    </fluro-panel-body>
                                </fluro-panel>
                            </v-layout>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from '../FluroContentEditMixin';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    mixins: [FluroContentEditMixin],
    components: {},
    methods: {
        toggleCollected() {
            console.log('INIT TOGGLE');
            var self = this;
            if (!self.model.collected) {
                console.log('COLLECTED IS FALSY', self.model.collected);
                return self.model.collected = true;
            } else {
                console.log('COLLECTED IS TRUTHY', self.model.collected);
                return self.model.collected = false;
            }
        },
    },
    created() {
        var self = this;
        if (!self.model._id) {
            self.model.collected = false;
        }
    },
    asyncComputed: {

    },
    computed: {
        showOutline() {
            return false;
        },
        fieldsOutput() {

            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Ticket Title',
                minimum: 0,
                maximum: 1,
                type: 'string',
            })

            addField('email', {
                title: 'Primary Email Address',
                minimum: 0,
                maximum: 1,
                type: 'email',
            })

            addField('contact', {
                title: 'Contact',
                description: 'The contact this ticket is linked to',
                minimum: 1,
                maximum: 1,
                type: 'reference',
                params: {
                    restrictType: 'contact',
                },
            })

            addField('value', {
                title: 'Value',
                minimum: 0,
                maximum: 1,
                type: 'number',
            })


            addField('event', {
                title: 'Event',
                description: 'The event this ticket is valid for',
                minimum: 0,
                maximum: 1,
                type: 'reference',
                params: {
                    restrictType: 'event',
                },
            })


            addField('interaction', {
                title: 'Interaction',
                description: 'The original form submission that was used to create this ticket',
                minimum: 0,
                maximum: 1,
                type: 'reference',
                params: {
                    restrictType: 'interaction',
                },
            })



            //////////////////////////////////////



            addField('collectedBy', {
                title: 'Collected By',
                description: 'The name of the person that collected the ticket',
                minimum: 0,
                maximum: 1,
                type: 'string',
            })



            addField('collectionDate', {
                title: 'Collection Date',
                description: 'The date this ticket was collected',
                minimum: 0,
                maximum: 1,
                type: 'date',
                directive: 'timedatepicker'
            })


            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;

        },
    },
    data() {
        return {

        }
    },
}
</script>
<style scoped lang="scss">
.no-border-no-background .toggle-item {
    border: none !important;
    background: none !important;
    font-size: 14px;
    padding: 0px;
}

.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;
}
</style>