<template>
    <flex-column>
        <fluro-page-preloader contain v-if="preflightProcessing"/>
        <flex-column-body style="background: #fafafa;" v-else>
            <v-container>
                <constrain sm>
                    <wrapper xs>
                        <template v-if="item.state == 'scheduled'">
                            <h2>Sending in {{countdown}}</h2>
                            <strong v-if="item.publishDate">{{item.publishDate | formatDate('h:mma - dddd D MMM YYYY')}}</strong>
                        </template>
                        <template v-else>
                            <h2>Preflight check</h2>
                        </template>
                        <div v-if="!preflightContacts.length">
                            <p class="lead">
                                No contacts were retrieved from selected sources, Edit this mailout and select sources so that you can publish the mailout
                            </p>
                        </div>
                        <div v-else>
                            <p class="lead">
                                Sending to {{validContacts.length}} of {{preflightContacts.length}} selected contacts
                            </p>
                        </div>
                    </wrapper>
                    <wrapper xs v-if="preflightContacts.length">
                        <v-alert v-if="invalidContacts.length" :value="true" type="warning" outline>
                            <div @click="expanded.invalid = !expanded.invalid">
                                <h5>{{invalidContacts.length}} selected contacts do not have an email address</h5>
                            </div>
                            <div v-if="expanded.invalid" style="margin-top:10px;">
                                <v-layout align-center v-for="contact in invalidSummary">
                                    <v-flex>
                                        <strong class="text-capitalize">{{contact.firstName}} {{contact.lastName}}</strong>
                                    </v-flex>
                                    <v-flex xs12 sm4 class="text-sm-right" muted>
                                        Does not have an email address
                                    </v-flex>
                                </v-layout>
                                <div v-if="invalidContacts.length > 10">
                                    <br />
                                    <em>And {{invalidContacts.length - 10}} more...</em>
                                </div>
                            </div>
                        </v-alert>
                        <v-alert v-if="validContacts.length" :value="true" type="success" outline>
                            <div @click="expanded.valid = !expanded.valid">
                                <h5>{{validContacts.length}} contact will receive this email</h5>
                            </div>
                            <div v-if="expanded.valid" style="margin-top:10px;">
                                <v-layout align-center v-for="contact in validSummary">
                                    <v-flex>
                                        <strong class="text-capitalize">{{contact.firstName}} {{contact.lastName}}</strong>
                                    </v-flex>
                                    <v-flex xs12 sm4 class="text-sm-right" muted>
                                        <span class="">From selected {{ contact.sources | comma}}</span>
                                    </v-flex>
                                </v-layout>
                                <div v-if="validContacts.length > 10">
                                    <br />
                                    <em>And {{validContacts.length - 10}} more...</em>
                                </div>
                            </div>
                        </v-alert>
                        <v-alert v-if="unsubscribedContacts.length" :value="true" type="error" outline>
                            <div @click="expanded.unsubscribed = !expanded.unsubscribed">
                                <h5><em>{{unsubscribedContacts.length}} selected contacts have unsubscribed from mail of this type </em></h5>
                            </div>
                            <div v-if="expanded.unsubscribed" style="margin-top:10px;">
                                <v-layout align-center v-for="contact in unsubscribedSummary">
                                    <v-flex>
                                        <strong class="text-capitalize">{{contact.firstName}} {{contact.lastName}}</strong>
                                    </v-flex>
                                    <v-flex xs12 sm4 class="text-sm-right" muted>
                                        <span class="">From selected {{ contact.sources | comma}}</span>
                                    </v-flex>
                                </v-layout>
                                <div v-if="unsubscribedContacts.length > 10">
                                    <br />
                                    <em>And {{unsubscribedContacts.length - 10}} more...</em>
                                </div>
                            </div>
                        </v-alert>
                    </wrapper>
                    <template v-if="item.state == 'scheduled'">
                        <v-btn class="mx-0" color="error" :loading="abortProcessing" large @click="abort()">
                            <strong>Stop / Cancel</strong>
                            <fluro-icon icon="times" right />
                        </v-btn>
                    </template>
                    <template v-else>
                        <div v-if="validContacts.length">
                            <!-- <div class="form-group">
                                            <label>Publish Date</label>
                                            <dateselect ng-label="'Immediately'" direction="up" force-date="false" rounding="true" use-time="true" ng-model="item.publishDate"></dateselect>
                                        </div> -->
                            <!-- <v-input class="no-flex" label="Publish Date" :persistent-hint="true" :hint="publishDateHint"> -->
                            <v-layout align-center>
                                <v-flex>
                                    <fluro-content-form-field :field="publishDateField" v-model="item" :persistent-hint="true"></fluro-content-form-field>
                                </v-flex>
                                <v-spacer />
                                <v-flex>
                                    <v-btn class="ma-0" block color="success" :loading="publishProcessing" large @click="publish()">
                                        <template v-if="!item.publishDate">
                                            Publish and send now
                                            <fluro-icon icon="angle-right" right />
                                        </template>
                                        <template v-else>
                                            Send {{item.publishDate | timeago}}
                                            <!-- for {{item.publishDate | formatDate('h:mma - dddd D MMM')}}  -->
                                            <fluro-icon icon="angle-right" right />
                                        </template>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <!-- </v-input> -->
                            <!-- <a class="btn btn-lg btn-success" ng-click="publish()">
                                            <i class="far fa-fw" ng-class="{'fa-mailout':!mailoutProcessing, 'fa-spinner fa-spin':mailoutProcessing}"></i>
                                        </a> -->
                        </div>
                    </template>
                </constrain>
            </v-container>
        </flex-column-body>
    </flex-column>
</template>
<script>

import { FluroContentFormField } from 'fluro-vue-ui';

export default {
    components:{
        FluroContentFormField,
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    methods: {
        publish() {

            var self = this;

            var publishDate = this.item.publishDate ? new Date(this.item.publishDate) : null;
            self.publishProcessing = true;

            self.$fluro.api.get(`/mailout/${self.item._id}/publish`, {
                    params: {
                        date: publishDate,
                    }
                })
                .then(function(res) {
                    self.item.state = res.data.state;
                    self.item.publishDate = res.data.publishDate;
                    self.publishProcessing = false;
                    self.checkIfCountdownIsNeeded();
                    // self.checkIfResultsAreNeeded();

                    switch (res.data.state) {
                        case 'scheduled':
                            self.$fluro.notify(`Your mailout has been scheduled successfully`);
                            break;
                        case 'sent':
                            self.$fluro.notify(`Your mailout has been published`);
                            break;
                    }
                })
                .catch(function(err) {
                    self.$fluro.error(err);
                    self.publishProcessing = false;
                })
        },
        abort() {

            var self = this;

            self.abortProcessing = true;

            self.$fluro.api.get(`/mailout/${self.item._id}/abort`)
                .then(function(res) {

                    var mailout = res.data;
                    self.$fluro.notify(`Mailout schedule cancelled`);
                    self.abortProcessing = false;

                    self.item.state = mailout.state;
                    self.item.publishDate = mailout.publishDate;
                    self.checkIfCountdownIsNeeded();

                })
                .catch(function(err) {
                    self.$fluro.error(err);
                    self.abortProcessing = false;
                })
        },

        preflight() {

            var self = this;
            self.preflightProcessing = true;

            //Do a preflight check on the mailout
            self.$fluro.api.get(`/mailout/${this.item._id}/preflight`, { cache: false })
                .then(function(res) {
                    self.preflightContacts = res.data;
                    self.preflightProcessing = false;


                    ////////////////////////////

                    self.validContacts = [];
                    self.invalidContacts = [];
                    self.unsubscribedContacts = [];

                    ////////////////////////////

                    //Loop through and categorise the contacts accordingly
                    _.each(res.data, function(contact) {

                        if (!contact.emails || !contact.emails.length) {
                            return self.invalidContacts.push(contact);
                        }

                        if (contact.unsubscribed) {
                            return self.unsubscribedContacts.push(contact);
                        }

                        return self.validContacts.push(contact);
                    });
                })
                .catch(function(err) {
                    self.preflightProcessing = false;
                });
        },
        checkIfCountdownIsNeeded() {
            if (this.item.state == 'scheduled') {
                this.startCountdown();
            } else {
                this.stopCountdown();
                this.duration = 0;
            }
        },
        stopCountdown() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        startCountdown() {
            this.stopCountdown();
            this.updateCountdown();
            this.timer = setInterval(this.updateCountdown, 1000);

        },
        updateCountdown() {
            var now = new Date().getTime();
            var when = new Date(this.item.publishDate).getTime();
            var difference = when - now;
            this.duration = difference;
            // if (now > when) {
            //     this.duration = difference;
            // } else {
            //     this.stopCountdown();
            // }

        },
    },
    watch: {
        'item.state': function() {
            this.checkIfCountdownIsNeeded()
        },
    },
    created() {
        this.preflight();
    },
    mounted() {
        this.checkIfCountdownIsNeeded();
    },
    activated() {
        this.checkIfCountdownIsNeeded();
    },
    deactivated() {
        this.stopCountdown();
    },
    beforeDestroy() {
        this.stopCountdown();
    },
    computed:{
        publishDateField() {
            return {
                // title: 'When to send?',
                key: 'publishDate',
                type: 'date',
                minimum: 0,
                maximum: 1,
                directive: 'datetimepicker',
                // description: this.publishDateHint,
                placeholder: 'Send Immediately',
                // defaultValues:[new Date()],
                // directive:'datetimeselect',
            }
        },
        publishDateHint() {

            if (this.item.publishDate) {
                return `This email will be sent ${this.$fluro.date.timeago(this.item.publishDate)}`;
            } else {
                return `This email will be sent immediately`;
            }

        },
        validSummary() {
            return this.validContacts.slice(0, 10);
        },
        unsubscribedSummary() {
            return this.unsubscribedContacts.slice(0, 10);
        },
        invalidSummary() {
            return this.invalidContacts.slice(0, 10);
        },
        countdown() {
            return this.$fluro.video.readableMilliseconds(this.duration);
        },
    },
    data() {
        return {
            duration: 0,
            preflightContacts: [],
            invalidContacts: [],
            unsubscribedContacts: [],
            validContacts: [],
            publishProcessing: false,
            abortProcessing: false,
            preflightProcessing: false,
            expanded: {
                invalid: false,
                unsubscribed: false,
                valid: false,
            },
            item: this.value,
        }
    },
}
</script>
<style lang="scss" scoped>
</style>