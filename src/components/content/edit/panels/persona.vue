<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <template v-slot:menuprefix>
                <template v-if="context == 'edit' && $vuetify.breakpoint.smAndUp">
                    <flex-column-header style="text-align:center">
                        <div style="padding: 10px;max-width:200px;margin: auto;">
                            <fluro-avatar-update :id="model._id" type="persona" />
                        </div>
                    </flex-column-header>
                </template>
            </template>
            <tab heading="Login Details">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container class="grid-list-xl">
                            <constrain sm>
                                <!--  -->
                                <template v-if="$vuetify.breakpoint.xsOnly">
                                    <template v-if="context == 'edit'">
                                        <div style="max-width:200px;margin: auto;">
                                            <fluro-avatar-update :id="model._id" type="persona" />
                                        </div>
                                    </template>
                                </template>
                                <template v-if="model.user">
                                    <v-layout row wrap>
                                        <v-flex xs12 sm6>
                                            <v-input class="no-flex">
                                                <v-label>First Name</v-label>
                                                <Div class="lead">{{
                                                    model.user.firstName
                                                    }}</Div>
                                            </v-input>
                                        </v-flex>
                                        <v-flex xs12 sm6>
                                            <v-input class="no-flex">
                                                <v-label>Last Name</v-label>
                                                <Div class="lead">{{
                                                    model.user.lastName
                                                    }}</Div>
                                            </v-input>
                                        </v-flex>
                                    </v-layout>
                                    <v-input class="no-flex">
                                        <v-label>Email Address</v-label>
                                        <Div class="lead">{{
                                            model.user.email
                                            }}</Div>
                                    </v-input>
                                    <p></p>
                                    <p></p>
                                    <v-input class="no-flex">
                                        <v-label>Change User Details</v-label>
                                        <p class="help-block">
                                            To change {{ contextName }} password
                                            or email details click the button
                                            below, this will send an invitation
                                            to the user to create a new password
                                            and then login to the system
                                        </p>
                                        <v-btn class="mx-0" color="primary" @click="resetPassword" :loading="resetting">
                                            Send Password Reset Request
                                            <fluro-icon right icon="paper-plane" />
                                        </v-btn>
                                        <!-- <fluro-academic-select :form-fields="formFields" :outline="showOutline" :options="options" @calendar="updateAcademicCalendar" @grade="updateAcademicGrade" v-model="model" /> -->
                                        <!-- </fluro-academic-select> -->
                                    </v-input>
                                </template>
                                <template v-else>
                                    <h3 margin>Basic Details</h3>
                                    <v-layout row wrap>
                                        <v-flex xs12 sm6>
                                            <fluro-content-form-field :autofocus="true" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstName" v-model="model"></fluro-content-form-field>
                                        </v-flex>
                                        <v-flex xs12 sm6>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.lastName" v-model="model"></fluro-content-form-field>
                                        </v-flex>
                                    </v-layout>
                                    <!-- <template v-if="!model._id">
                                        <v-layout>
                                            <v-flex xs12>
                                                <v-btn block :color="createManaged ? '' : 'primary'">
                                                    Fluro User
                                                </v-btn>
                                            </v-flex>
                                            <v-spacer />
                                            <v-flex xs12>
                                                <v-btn block :color="!createManaged ? '' : 'primary'">
                                                    Whitelabelled (Managed) User
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </template> -->
                                    <template v-if="isManagedUser">
                                        <!-- <fluro-panel v-if="isManagedUser"> -->
                                        <!-- <fluro-panel-title> -->
                                        <!-- <strong>Managed User Credentials</strong> -->
                                        <!-- </fluro-panel-title> -->
                                        <!-- <fluro-panel-body> -->
                                        <v-layout row wrap>
                                            <v-flex xs12 sm6>
                                                <fluro-content-form-field :autofocus="true" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.username" v-model="model"></fluro-content-form-field>
                                            </v-flex>
                                            <v-flex xs12 sm6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.password" v-model="model"></fluro-content-form-field>
                                            </v-flex>
                                        </v-layout>
                                        <!-- </fluro-panel-body> -->
                                        <!-- </fluro-panel> -->
                                    </template>
                                    <template v-else>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.collectionEmail" v-model="model"></fluro-content-form-field>
                                        <v-btn v-if="model._id" class="mx-0" color="primary" @click="resetPassword" :loading="resetting">
                                            Resend invitation
                                            <fluro-icon right icon="paper-plane" />
                                        </v-btn>
                                    </template>
                                    <fluro-panel v-if="showAdvanced">
                                        <fluro-panel-body>
                                            <h5 margin>{{isManagedUser ? 'Whitelabel User Persona' : 'General Fluro User'}}</h5>
                                            <p v-if="isManagedUser">
                                                This user will exist only within the <strong>{{user.account.title}}</strong> account and can only sign in to <strong>{{user.account.title}}</strong> applications and websites. These kinds of user personas are typically used for white labelled apps or for young children that might not have an email address.
                                            </p>
                                            <p v-else>
                                                An email will be sent to {{model.collectionEmail}} with an invitation to create a Fluro account (if they do not have one already) they will then be able to sign in to <em>{{user.account.title}}</em> in addition to any other accounts they have been invited to on Fluro.
                                            </p>
                                            <template v-if="!model._id">
                                                <v-btn class="ma-0" tag="span" @click="createManaged = true" v-if="!isManagedUser">
                                                    Change to a Whitelabel / Managed user
                                                </v-btn>
                                                <v-btn class="ma-0" tag="span" @click="createManaged = false" v-if="isManagedUser">
                                                    Change to a General Fluro user
                                                </v-btn>
                                            </template>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                </template>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`Access Passes`">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container grid-list-xl>
                            <constrain sm>
                                <h3 margin>{{ contextName }} Access Passes</h3>
                                <fluro-access-pass-select @input="modelUpdated" :host="model" v-model="model.policies" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`Individual Permissions`">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container grid-list-xl>
                            <constrain sm>
                                <h3 margin>
                                    {{ contextName }} Individual Permissions
                                </h3>
                                <!-- <pre>{{model.permissionSets}}</pre> -->
                                <fluro-permission-select @input="modelUpdated" v-model="model.permissionSets" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroRealmSelect from "../../../form/realmselect/FluroRealmSelect.vue";
import FluroContentEditMixin from "../FluroContentEditMixin.js";
import FluroAccessPassSelect from "../../../form/FluroAccessPassSelect.vue";
import FluroPermissionSelect from "../../../form/FluroPermissionSelect.vue";
import FluroAvatarUpdate from "../../../FluroAvatarUpdate.vue";

/////////////////////////////////

import Vue from "vue";
import _ from 'lodash';

/////////////////////////////////

export default {
    props: {
        fields: {
            type: Array,
            default () {
                var self = this;
                var array = [];

                ///////////////////////////////////

                addField("firstName", {
                    title: "First Name",
                    minimum: 1,
                    maximum: 1,
                    type: "string",
                    placeholder: "Eg. Jessica"
                });

                addField("lastName", {
                    title: "Last Name",
                    minimum: 1,
                    maximum: 1,
                    type: "string",
                    placeholder: "Eg. Michaels"
                });

                addField("collectionEmail", {
                    title: "Email Address",
                    minimum: 1,
                    maximum: 1,
                    type: "string",
                    description: "An invitation will be sent to this email address allowing the user to confirm and accept this persona",
                    placeholder: "Eg. name@email.com"
                });



                addField("username", {
                    title: "Username / Email Address",
                    minimum: 1,
                    maximum: 1,
                    type: "email",
                    placeholder: "Eg. name@email.com"
                });

                addField("password", {
                    title: "Password",
                    minimum: 1,
                    maximum: 1,
                    type: "string",
                    directive: 'password',
                    placeholder: "******"
                });

                ///////////////////////////////////

                function addField(key, details) {
                    details.key = key;
                    array.push(details);
                }

                return array;
            }
        }
    },
    mixins: [FluroContentEditMixin],
    components: {
        FluroAccessPassSelect,
        FluroPermissionSelect,
        FluroAvatarUpdate,

        FluroRealmSelect
    },
    methods: {
        modelUpdated() {
            this.update(this.model);
        },
        resetPassword() {
            var self = this;
            self.resetting = true;

            return self.$fluro.api
                .post(`/user/reinvite/${self.itemID}`)
                .then(function(res) {
                    self.resetting = false;

                    var email = self.model.collectionEmail;

                    if (self.model.user) {
                        email = self.model.user.email;
                    }

                    ////////////////////////////////////

                    self.$fluro.notify(
                        `Instructions on how to reset password have been sent to ${email}`
                    );
                })
                .catch(function(err) {
                    self.$fluro.error(err);
                    self.resetting = false;
                });
        }
    },
    watch: {
        isManagedUser(b) {
            if (b) {
                this.model.collectionEmail = '';
            }
        },
        title(val) {
            this.$set(this.model, "title", this.title);
            this.update(this.model);
        }
    },
    created() {
        var self = this;

        if (!self.model.policies) {
            self.model.policies = []
        }
    },
    asyncComputed: {},
    computed: {
        showAdvanced() {
            if (this.isManagedUser) {
                return true;
            }

            // if (!this.model._id) {
            //     return true;
            // }

            return (!this.model._id && this.$pro && this.$pro.enabled);
        },
        isManagedUser() {
            return !!(this.model.username || this.createManaged);
        },
        title() {
            if (!this.model) {
                return "";
            }

            if (this.model.firstName) {
                return `${this.model.firstName} ${this.model.lastName || ""}`;
            }

            return "";
        },
        contextName() {
            var self = this;

            var name = this.model.firstName;

            if (!name || !name.length) {
                return "";
            }

            if (this.model.user) {
                name = `${this.model.user.firstName}`;
            }

            if (_.endsWith(name, "s")) {
                return `${name}'`;
            }
            return `${name}'s`;
        },
        showOutline() {
            return false; //true; //false;//true;//false;//true;
        }
    },
    data() {
        return {
            resetting: false,
            createManaged: false,
        };
    }
};

</script>
<style scoped lang="scss">
.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;
}

.bordered {
    border: 1px solid rgba(#000, 0.1);
    box-shadow: 0 2px 4px rgba(#000, 0.1);

    &>>>.tabset-menu {
        background: #eee;
    }
}

</style>
