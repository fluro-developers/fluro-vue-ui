<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab>
                <flex-row>
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
                    <flex-column v-if="qrCodeURL" style="max-width: 300px; width: 25%; background: #eee;" class="border-left">
                        <v-container fluid>
                            <img class="qrcode" :src="qrCodeURL" />
                        </v-container>
                    </flex-column>
                </flex-row>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from "../FluroContentEditMixin.js";

/////////////////////////////////

import Vue from "vue";

/////////////////////////////////

export default {
    mixins: [FluroContentEditMixin],
    components: {},
    methods: {
        toggleCollected() {
            console.log("INIT TOGGLE");
            var self = this;
            if (!self.model.collected) {
                var currentUserName = self.user ? `${self.user.firstName} ${self.user.lastName}` : "";

                console.log("COLLECTED IS FALSY", self.model.collected);
                self.$set(self.model, "collected", true);
                self.$set(self.model, "collectedBy", currentUserName);
                self.$set(self.model, "collectionDate", new Date());
            } else {
                console.log("COLLECTED IS TRUTHY", self.model.collected);
                return self.$set(self.model, "collected", false);
            }
        },
    },
    created() {
        var self = this;
        if (!self.model._id) {
            return self.$set(self.model, "collected", false);
        }
    },
    asyncComputed: {},
    computed: {
        qrCodeURL() {
            var self = this;

            if (!self.model._id) {
                return;
            }
            var interactionID = self.$fluro.utils.getStringID(self.model.interaction);
            var ticketID = self.$fluro.utils.getStringID(self.model);
            if (interactionID) {
                return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;
            } else {
                return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/ticket/${ticketID}`;
            }

            // $scope.ticketCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/ticket/' + ticketID;
            // $scope.interactionCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/interaction/' + interactionID;
        },
        showOutline() {
            return false;
        },
        fieldsOutput() {
            var self = this;
            var array = [];

            ///////////////////////////////////

            addField("title", {
                title: "Ticket Title",
                minimum: 0,
                maximum: 1,
                type: "string",
            });

            addField("email", {
                title: "Primary Email Address",
                minimum: 0,
                maximum: 1,
                type: "email",
            });

            addField("contact", {
                title: "Contact",
                description: "The contact this ticket is linked to",
                minimum: 1,
                maximum: 1,
                type: "reference",
                params: {
                    restrictType: "contact",
                },
            });

            addField("value", {
                title: "Value",
                minimum: 0,
                maximum: 1,
                type: "number",
            });

            addField("event", {
                title: "Event",
                description: "The event this ticket is valid for",
                minimum: 0,
                maximum: 1,
                type: "reference",
                params: {
                    restrictType: "event",
                },
            });

            addField("interaction", {
                title: "Interaction",
                description: "The original form submission that was used to create this ticket",
                minimum: 0,
                maximum: 1,
                type: "reference",
                params: {
                    restrictType: "interaction",
                },
            });

            //////////////////////////////////////

            addField("collectedBy", {
                title: "Collected By",
                description: "The name of the person that collected the ticket",
                minimum: 0,
                maximum: 1,
                type: "string",
            });

            addField("collectionDate", {
                title: "Collection Date",
                description: "The date this ticket was collected",
                minimum: 0,
                maximum: 1,
                type: "date",
                directive: "timedatepicker",
            });

            function addField(key, details) {
                details.key = key;
                array.push(details);
            }

            return array;
        },
    },
    data() {
        return {};
    },
};
</script>
<style scoped lang="scss">
.no-border-no-background .toggle-item {
    border: none !important;
    background: none !important;
    font-size: 14px;
    padding: 0px;
}

.qrcode {
    width: 100%;
    height: auto;
    border: 5px solid #000;
    border-radius: 4px;
}

.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;
}
</style>
