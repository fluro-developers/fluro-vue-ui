<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <!-- <template v-slot:menuprefix v-if="model._id"> -->
            <!-- <div class="event-cover-image" :style="{backgroundImage:`url(${coverImage})`}"/> -->
            <!-- <fluro-image cover :spinner="true" :height="150" :item="coverImage"/> -->
            <!-- </template> -->
            <tab heading="Event details">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container class="grid-list-xl">
                            <constrain sm>
                                <h3 margin>Event Details</h3>
                                <!-- <pre>{{model}}</pre> -->
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstLine" v-model="model"></fluro-content-form-field>
                                <!-- <p class="lead" v-if="dateModel.startDate">{{dateModel | readableEventDate}}</p> -->
                                <v-layout>
                                    <v-flex xs12 sm4>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.startDate" v-model="dateModel"></fluro-content-form-field>
                                    </v-flex>
                                    <v-flex xs12 sm4>

                                        <!-- <template> -->
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.endDate" v-model="dateModel"></fluro-content-form-field>
                                        <!-- </template> -->
                                    </v-flex>
                                    <v-flex xs12 sm4>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.timezone" v-model="model"></fluro-content-form-field>
                                    </v-flex>
                                </v-layout>
                                <!-- <v-input class="no-flex"> -->
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mainImage" v-model="model"></fluro-content-form-field>
                                <!-- </v-input> -->
                                <v-input class="no-flex">
                                    <v-label>Body</v-label>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.body" v-model="model"></fluro-content-form-field>
                                </v-input>
                                <fluro-content-form-field :override-label="definition && definition.definitionName && definition.definitionName == 'service' ? 'Service Time / Event Track' : 'Event Track' " :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.track" v-model="model"></fluro-content-form-field>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`${definition.title} details`" v-if="definition">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>{{definition.title}}</h3>
                                <!-- <pre>{{model.data}}</pre> -->
                                <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields">
                                </fluro-content-form>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`Media & Resources`">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>Media &amp; Resources</h3>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mainImage" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.images" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.videos" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.assets" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.externalLinks" v-model="model"></fluro-content-form-field>
                                <h3 margin>Social Media</h3>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.socialImages" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.socialBody" v-model="model"></fluro-content-form-field>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`Location`">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>Location</h3>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`Registrations & Ticketing`">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>Registrations &amp; Ticketing</h3>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.forms" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.expectTeams" v-model="model"></fluro-content-form-field>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`Messaging`">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>Messaging</h3>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`Checkin`">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>Checkin Settings</h3>
                                <fluro-content-form :options="options" v-model="model.checkinData" :fields="checkinFields">
                                    <template v-slot:form="{formFields, fieldHash, model, update, options}">
                                        <v-container pa-0 grid-list-xl>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm6>
                                                    <v-input class="no-flex">
                                                        <v-label>Checkin Opens</v-label>
                                                        <p class="help-block">How many minutes earlier can users checkin</p>
                                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.checkinStartOffset" v-model="model" />
                                                        <p class="help-block">No checkins before</p>
                                                        <p class="lead">
                                                            {{checkinStartDate | formatDate('h:mma dddd D MMM', model.timezone)}}
                                                            <!-- {{checkinStartDate | formatDate:'g:ia l j M':model.timezone}} -->
                                                        </p>
                                                    </v-input>
                                                </v-flex>
                                                <v-flex xs12 sm6>
                                                    <v-input class="no-flex">
                                                        <v-label>Checkin Closes</v-label>
                                                        <p class="help-block">How many minutes after this event's end time can a user still check in?</p>
                                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.checkinEndOffset" v-model="model" />
                                                        <p class="help-block">No checkins after</p>
                                                        <p class="lead">
                                                            {{checkinEndDate | formatDate('h:mma dddd D MMM', model.timezone)}}
                                                            <!-- {{checkinEndDate | formatDate:'g:ia l j M':model.timezone}} -->
                                                        </p>
                                                    </v-input>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </template>
                                </fluro-content-form>
                                <!-- <v-layout row wrap> -->
                                <!-- <v-flex xs12 sm6> -->
                                <!-- <v-input class="no-flex"> -->
                                <!-- <v-label>Checkin Opens</v-label> -->
                                <!-- <p class="help-block">How many minutes earlier can users checkin</p> -->
                                <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.checkinStartOffset" v-model="model.checkinData"></fluro-content-form-field> -->
                                <!-- <div class="input-group">
                                                <input type="number" min="0" placeholder="Defaults to 90 mins" class="form-control" ng-model="item.checkinData.checkinStartOffset" />
                                                <div class="input-group-addon">Minutes earlier</div>
                                            </div> -->
                                <!-- </v-input> -->
                                <!-- <p class="help-block">No checkins before</p> -->
                                <!-- <p class="lead"> -->
                                <!-- {{checkinStartDate | formatDate:'g:ia l j M':model.timezone}}<br /> -->
                                <!-- <em class="text-muted small">{{model.timezone}}</em> -->
                                <!-- </p> -->
                                <!-- </v-flex> -->
                                <!-- <v-flex xs12 sm6>
                                        <v-input class="no-flex">
                                            <v-label>Checkin Closes</v-label>
                                            <p class="help-block">How many minutes after this event's end time can a user still checkin</p>
                                            <div class="input-group">
                                                <input type="number" min="0" placeholder="Defaults to 90 mins" class="form-control" ng-model="model.checkinData.checkinEndOffset" />
                                                <div class="input-group-addon">Minutes later</div>
                                            </div>
                                        </v-input>
                                        <p class="help-block">No checkins after</p>
                                        <p class="lead">
                                            {{checkinEndDate | formatDate:'g:ia l j M':model.timezone}}<br />
                                            <em class="text-muted small">{{model.timezone}}</em>
                                        </p>
                                    </v-flex> -->
                                <!-- </v-layout> -->
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

import FluroContentForm from '../../form/FluroContentForm';
import FluroContentFormField from '../../form/FluroContentFormField';
import Layout from '../../../mixins/Layout';
import FluroContentPanelMixin from '../FluroContentPanelMixin';
import { FluroAvatarUpdate } from 'fluro-vue-ui';

// import { JSONView } from "vue-json-component";

/////////////////////////////////

import moment from 'moment';
import Vue from 'vue';

/////////////////////////////////

export default {
    props: {
        'fields': {
            type: Array,
            default () {


                var self = this;
                var array = [];

                console.log('SELF', self);

                ///////////////////////////////////

                addField('title', {
                    title: 'Event Title',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    placeholder: 'Event title',
                })

                addField('firstLine', {
                    title: 'Subtitle',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    placeholder: 'Eg. A great event for the whole family. Featuring Special Guest...',
                    description: 'A short one line description about this event',
                })



                ///////////////////////////////////
                ///////////////////////////////////
                ///////////////////////////////////

                addField('startDate', {
                    title: 'Start Date',
                    minimum: 1,
                    maximum: 1,
                    type: 'date',
                    directive: 'datetimepicker',

                })

                addField('endDate', {
                    title: 'End Date',
                    minimum: 0,
                    maximum: 1,
                    type: 'date',
                    directive: 'datetimepicker',

                })



                addField('timezone', {
                    title: 'Event Timezone',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'timezone-select',
                    description: 'Set a local timezone for this contact',
                })


                ///////////////////////////////////
                ///////////////////////////////////
                ///////////////////////////////////


                addField('mainImage', {
                    title: 'Main Promotional Image',
                    description: 'Select a main promotional image for this event',
                    minimum: 0,
                    maximum: 1,
                    type: 'reference',
                    directive: 'reference-select',
                    params: {
                        restrictType: 'image',
                    }
                });


                addField('track', {
                    title: 'Event Track',
                    description: 'The event track for this event',
                    minimum: 0,
                    maximum: 1,
                    type: 'reference',
                    directive: 'reference-select',
                    params: {
                        restrictType: 'eventtrack',
                    }
                });



                addField('body', {
                    title: 'Body',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'wysiwyg',
                    placeholder: '',
                    description: '',
                })

                ///////////////////////////////////
                ///////////////////////////////////
                ///////////////////////////////////


                addField('images', {
                    title: 'Additional Images',
                    description: 'Additional promotional images for this event',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    directive: 'reference-select',
                    params: {
                        restrictType: 'image',
                    }
                });

                addField('videos', {
                    title: 'Videos',
                    description: 'Additional video content for this event',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    directive: 'reference-select',
                    params: {
                        restrictType: 'video',
                    }
                });

                addField('assets', {
                    title: 'Files and Resources',
                    description: 'Additional downloadable assets and resources for this event',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    directive: 'reference-select',
                    params: {
                        restrictType: 'asset',
                    }
                });


                addField('externalLinks', {
                    title: 'External Link',
                    // description: '',
                    minimum: 0,
                    maximum: 0,
                    askCount: 0,
                    type: 'group',
                    asObject: true,
                    sameLine: true,
                    fields: [{
                        type: 'group',
                        sameLine: true,
                        fields: [{
                                title: 'Title',
                                key: 'title',
                                type: 'string',
                                minimum: 1,
                                maximum: 1,
                            },
                            {
                                title: 'URL',
                                key: 'url',
                                type: 'url',
                                minimum: 1,
                                maximum: 1,
                                placeholder: 'https://',
                            },
                        ],
                    }],
                });

                ///////////////////////////////////

                addField('socialImages', {
                    title: 'Social Media Artwork',
                    description: 'Add images and artwork that can be shared from pulse and slipstream to promote this event',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    directive: 'reference-select',
                    params: {
                        restrictType: 'image',
                    }
                });

                addField('socialBody', {
                    title: 'Social Media Blurb',
                    description: 'Add a social blurb and hashtags to use when sharing/promoting this event',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'textarea',
                });



                // addField('externalLinks', {
                //     title: 'External Links',
                //     description: 'Relevant external links and URLs for this event',
                //     minimum: 0,
                //     maximum: 0,
                //     type: '',
                //     directive: 'reference-select',
                //     params: {
                //         restrictType: 'asset',
                //     }
                // });


                ///////////////////////////////////
                ///////////////////////////////////
                ///////////////////////////////////

                addField('forms', {
                    title: 'Registration Forms',
                    description: 'Manage registration forms that can be used to register for this event',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    directive: 'reference-select',
                    params: {
                        restrictType: 'form',
                    },
                })

                addField('expectTeams', {
                    title: 'Expect Groups',
                    description: 'Select groups to expect as attendees. This will expect all active members of these groups as attending at the time of event start',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    directive: 'reference-select',
                    params: {
                        restrictType: 'team',
                    },
                })











                addField('deceased', {
                    title: 'Mark as deceased',
                    minimum: 0,
                    maximum: 1,
                    type: 'boolean',
                    directive: 'checkbox',
                })

                addField('deceasedDate', {
                    title: 'Deceased Date',
                    minimum: 0,
                    maximum: 1,
                    type: 'date',
                    directive: 'date-select',
                })









                addField('gender', {
                    title: 'Gender',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    directive: 'select',
                    placeholder: '',
                    // defaultValues: ['unknown'],
                    options: [{
                            name: 'Male',
                            value: 'male',
                        },
                        {
                            name: 'Female',
                            value: 'female',
                        },
                        {
                            name: 'Unknown',
                            value: 'unknown',
                        },
                    ]
                })

                addField('maritalStatus', {
                    title: 'Marital Status',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'select',
                    placeholder: '',
                    options: [{
                            name: 'None',
                            value: '',
                        },
                        {
                            name: 'Single',
                            value: 'single',
                        },
                        {
                            name: 'In a relationship',
                            value: 'relationship',
                        },
                        {
                            name: 'Married',
                            value: 'married',
                        },
                        {
                            name: 'Widowed',
                            value: 'widowed',
                        },
                        {
                            name: 'Seperated',
                            value: 'seperated',
                        },
                        {
                            name: 'Divorced',
                            value: 'divorced',
                        },
                    ]
                })


                ///////////////////////////////////

                addField('emails', {
                    title: 'Email Address',
                    minimum: 0,
                    maximum: 0,
                    type: 'email',
                    // directive:'select',
                    placeholder: '',
                })


                addField('phoneNumbers', {
                    title: 'Phone Number',
                    minimum: 0,
                    maximum: 0,
                    type: 'string',
                    // directive:'select',
                    placeholder: '+61 400 123 456',
                })

                ///////////////////////////////////

                // var timezones = _.map(self.$fluro.date.timezones(), function(timezone) {
                //     return { name: timezone, value: timezone };
                // });

                // timezones.unshift({
                //     name: 'Use Account Default',
                //     value: '',
                // })



                addField('countryCode', {
                    title: 'Default Country Code',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'countrycodeselect',
                })
                ///////////////////////////////////

                addField('nametagNotes', {
                    title: 'Checkin Nametag Notes',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                })

                ///////////////////////////////////

                addField('capabilities', {
                    title: 'Capabilities',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    description: 'Add capabilities for this contact',
                    params: {
                        restrictType: 'capability',
                    }
                })

                ///////////////////////////////////

                function addField(key, details) {
                    details.key = key;
                    array.push(details)
                    // // Vue.set(self.fields, key, details);

                    // if (details.enabled === false) {

                    // } else {
                    //     details.enabled = true;
                    // }


                    // var defaultValue = self.getDefaultValue(key, details);
                    // Vue.set(self.model, key, defaultValue);
                }

                return array;
            }
        }
    },
    mixins: [Layout, FluroContentPanelMixin],
    components: {
        FluroContentForm,
        FluroContentFormField,
    },
    methods: {

    },

    // beforeCreate: function() {
    // this.$options.components.FluroContentForm = require('./FluroContentForm.vue').default;
    // this.$options.components.FluroContentFormField = require('./FluroContentFormField.vue').default;
    // },
    watch: {
        'dateModel.startDate': function(value) {
            /**/
            // console.log('VALUE IS', value)
            var date = new Date(value);
            this.model.startDate = date;
            this.update(this.model);



            var endDate = this.dateModel.endDate ? new Date(this.dateModel.endDate) : false;

            if (endDate) {
                if (endDate < date) {
                    // console.log('UPDATE END DATE', endDate, ' is less than', date)
                    this.dateModel.endDate = new Date(date);

                }
            }
            /**/
        },
        'dateModel.endDate': function(value) {
            /**/
            // console.log('VALUE IS', value)
            var date = new Date(value);
            this.model.endDate = date;
            this.update(this.model);


            var startDate = this.dateModel.startDate ? new Date(this.dateModel.startDate) : false;

            if (startDate) {
                if (startDate > date) {
                    // console.log('UPDATE START DATE', startDate, ' is greater than', date)
                    this.dateModel.startDate = new Date(date);
                }
            }
            /**/
        },
    },
    created() {
        var self = this;
        if (!self.model.data) {
            self.$set(self.model, 'data', {});
        } else {
            self.dateModel.startDate = new Date(self.model.startDate);
            self.dateModel.endDate = new Date(self.model.endDate);
        }

        if (!self.model.checkinData) {
            self.$set(self.model, 'checkinData', {
                checkinStartOffset: 90,
                checkinEndOffset: 90,
            });
        }
    },
    asyncComputed: {
        // devices: {
        //     default: [],
        //     get() {

        //         var self = this;


        //         if (self.context != 'edit' || !self.itemID) {
        //             return Promise.resolve([]);
        //         }

        //         //////////////////////////////////////

        //         return new Promise(function(resolve, reject) {

        //             self.$fluro.api.get(`/contact/${self.itemID}/devices`)
        //                 .then(function(res) {
        //                     resolve(_.map(res.data, function(device) {
        //                         device.pinging = false;
        //                         return device;
        //                     }));
        //                 })
        //                 .catch(function(err) {
        //                     reject(err);
        //                 })

        //         })
        //     }
        // },
    },
    computed: {
        coverImage() {
            var self = this;
            return self.$fluro.asset.coverImage(self.model._id, 'event', { w: 150 });
        },
        checkinStartOffset() {
            var self = this;
            var originalOffsetValue = self.model.checkinData.checkinStartOffset;

            if (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {
                return 90;
            } else {
                return parseInt(originalOffsetValue);
            }
        },
        checkinStartDate() {
            var self = this;
            return moment(self.model.startDate).subtract(self.checkinStartOffset, 'minutes').toDate();
        },
        checkinEndOffset() {
            var self = this;
            var originalOffsetValue = self.model.checkinData.checkinEndOffset;

            if (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {
                return 90;
            } else {
                return parseInt(originalOffsetValue);
            }
        },
        checkinEndDate() {
            var self = this;
            return moment(self.model.startDate).add(self.checkinEndOffset, 'minutes').toDate();
        },
        checkinFields() {

            return [{
                title: 'Checkin Opens',
                description: 'How many minutes earlier can users checkin',
                key: 'checkinStartOffset',
                placeholder: "Defaults to 90 mins before event start",
                minimum: 0,
                maximum: 1,
                // suffix:'minutes',
                type: 'integer',
            }, {
                title: 'Checkin Closes',
                description: `How many minutes after this event's end time can a user still checkin`,
                key: 'checkinEndOffset',
                placeholder: "Defaults to 90 mins after event ends",
                minimum: 0,
                maximum: 1,
                // suffix:'minutes',
                type: 'integer',
            }]
        },
        showOutline() {
            return false; //true; //false;//true;//false;//true;
        },
    },
    data() {

        var existingModel = JSON.parse(JSON.stringify(this.value));

        return {
            dateModel: {
                startDate: existingModel.startDate ? new Date(existingModel.startDate) : null,
                endDate: existingModel.endDate ? new Date(existingModel.endDate) : null,
            }
        }
    },
}
</script>
<style scoped lang="scss">
.event-cover-image {
    border-radius: 5px;
    width: 90%;
    padding-bottom: 70%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: block;
    margin: 5%;
}
</style>
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

    & /deep/ .tabset-menu {
        background: #eee;
    }
}
</style>