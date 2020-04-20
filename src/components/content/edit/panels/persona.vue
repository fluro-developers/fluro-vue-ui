<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <template v-slot:menuprefix>
                <template
                    v-if="context == 'edit' && $vuetify.breakpoint.smAndUp"
                >
                    <flex-column-header style="text-align:center">
                        <div
                            style="padding: 10px;max-width:200px;margin: auto;"
                        >
                            <fluro-avatar-update
                                :id="model._id"
                                type="persona"
                            />
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
                                        <div
                                            style="max-width:200px;margin: auto;"
                                        >
                                            <fluro-avatar-update
                                                :id="model._id"
                                                type="persona"
                                            />
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
                                        <v-btn
                                            class="mx-0"
                                            color="primary"
                                            @click="resetPassword"
                                            :loading="resetting"
                                        >
                                            Send Reset Request
                                            <fluro-icon
                                                right
                                                icon="paper-plane"
                                            />
                                        </v-btn>
                                        <!-- <fluro-academic-select :form-fields="formFields" :outline="showOutline" :options="options" @calendar="updateAcademicCalendar" @grade="updateAcademicGrade" v-model="model" /> -->
                                        <!-- </fluro-academic-select> -->
                                    </v-input>
                                </template>
                                <template v-else>
                                    <h3 margin>Basic Details</h3>
                                    <v-layout row wrap>
                                        <v-flex xs12 sm6>
                                            <fluro-content-form-field
                                                :autofocus="true"
                                                :form-fields="formFields"
                                                :outline="showOutline"
                                                @input="update"
                                                :options="options"
                                                :field="fieldHash.firstName"
                                                v-model="model"
                                            ></fluro-content-form-field>
                                        </v-flex>
                                        <v-flex xs12 sm6>
                                            <fluro-content-form-field
                                                :form-fields="formFields"
                                                :outline="showOutline"
                                                @input="update"
                                                :options="options"
                                                :field="fieldHash.lastName"
                                                v-model="model"
                                            ></fluro-content-form-field>
                                        </v-flex>
                                    </v-layout>
                                    <fluro-content-form-field
                                        :form-fields="formFields"
                                        :outline="showOutline"
                                        @input="update"
                                        :options="options"
                                        :field="fieldHash.collectionEmail"
                                        v-model="model"
                                    ></fluro-content-form-field>
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
                                <fluro-access-pass-select
                                    @input="modelUpdated"
                                    :host="model"
                                    v-model="model.policies"
                                />
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
                                <fluro-permission-select
                                    @input="modelUpdated"
                                    v-model="model.permissionSets"
                                />
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

import FluroRealmSelect from "src/components/form/realmselect/FluroRealmSelect.vue";
import FluroContentEditMixin from "src/components/content/edit/FluroContentEditMixin.js";
import FluroAccessPassSelect from "src/components/form/FluroAccessPassSelect.vue";
import FluroPermissionSelect from "src/components/form/FluroPermissionSelect.vue";
import FluroAvatarUpdate from "src/components/FluroAvatarUpdate.vue";

/////////////////////////////////

import Vue from "vue";

/////////////////////////////////

export default {
    props: {
        fields: {
            type: Array,
            default() {
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
                    description:
                        "An invitation will be sent to this email address allowing the user to confirm and accept this persona",
                    placeholder: "Eg. name@email.com"
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
        title(val) {
            this.$set(this.model, "title", this.title);
            this.update(this.model);
        }
    },
    created() {
        var self = this;

        if (!self.model.policies) {
            self.model.policies = [];
        }
    },
    asyncComputed: {},
    computed: {
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
            resetting: false
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

    & >>> .tabset-menu {
        background: #eee;
    }
}
</style>
