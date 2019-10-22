<template>
    <!-- grid-list-lg -->
    <v-container class="filter-condition-row" :class="{mini:mini}" pa-0>
        <v-layout row wrap>
            <v-flex xs12 sm4>
                <template v-if="fields.length">
                    <template v-if="$vuetify.breakpoint.xsOnly">
                        <!-- <v-select single-line dense :loading="loadingKeys" v-model="model.key" item-text="title" item-value="key" :items="fields" /> -->
                        <v-select single-line dense :loading="loadingKeys" :return-object="true" v-model="selectedKey" item-text="title" item-value="key" :items="fields" />
                    </template>
                    <template v-else>
                        <!-- <pre>{{fields}}</pre> -->
                        <!-- TESTING -->
                        <!-- <v-autocomplete single-line dense :loading="loadingKeys" v-model="model.key" item-text="title" item-value="key" :items="fields" /> -->
                        <!-- <v-autocomplete single-line dense :loading="loadingKeys" :return-object="true" v-model="model.test" item-text="title" item-value="key" :items="fields" /> -->
                        <v-autocomplete single-line dense :loading="loadingKeys" :return-object="true" v-model="selectedKey" item-text="title" item-value="key" :items="fields" />
                    </template>
                </template>
                <template v-else>
                    <v-text-field single-line label="" v-model="model.key"></v-text-field>
                </template>
                <!-- <pre>{{selector}}</pre> -->
            </v-flex>
            <v-flex xs12 sm4>
                <v-select single-line dense v-model="model.comparator" item-text="title" item-value="operator" :items="comparators" />
                <!-- <pre>{{model.comparator}}</pre> -->
            </v-flex>
            <template v-if="comparator">
                <template v-if="inputType == 'none'">
                </template>
                <v-flex xs12 sm4 v-else-if="inputType == 'daterange'">
                    <v-menu :fixed="true" :right="true" ref="dateSelection" :close-on-content-click="false" transition="slide-y-transition" offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn small flat block class="ma-0" v-on="on">
                                <fluro-icon library="far" icon="calendar" left /> {{readableStartDate}} - {{readableEndDate}}
                            </v-btn>
                        </template>
                        <v-card>
                            <v-layout>
                                <v-flex>
                                    <v-card-text>
                                        <label>&nbsp;</label>
                                        <v-list dense>
                                            <v-list-tile @click="selectDatePeriod(option)" v-for="option in datePeriodOptions" :key="option.value">
                                                {{option.title}}
                                            </v-list-tile>
                                        </v-list>
                                    </v-card-text>
                                </v-flex>
                                <v-flex>
                                    <v-card-text class="text-sm-center"><label>From Date</label></v-card-text>
                                    <v-date-picker v-model="startDateString" no-title scrollable></v-date-picker>
                                </v-flex>
                                <v-flex>
                                    <v-card-text class="text-sm-center"><label>To Date</label></v-card-text>
                                    <v-date-picker v-model="endDateString" no-title scrollable></v-date-picker>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-menu>
                    <!-- <v-layout>
                        <v-flex xs6>
                            <v-menu ref="daterange1" v-model="date1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="model.value" class="small-input" single-line label="From" v-on="on" />
                                </template>
                                <v-date-picker v-model="model.value" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="date1 = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.daterange1.save(model.value)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs6>
                            <v-menu ref="daterange2" v-model="date2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="model.value2" class="small-input" single-line label="To" v-on="on" />
                                </template>
                                <v-date-picker v-model="model.value2" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="date2 = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.daterange2.save(model.value2)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout> -->
                </v-flex>
                <v-flex xs12 sm4 v-else-if="inputType == 'range'">
                    <v-layout>
                        <v-flex xs6>
                            <v-text-field class="small-input" single-line label="from" v-model="model.value"></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field class="small-input" single-line label="to" v-model="model.value2"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 sm4 v-else-if="inputType == 'array' && dataType != 'date'">
                    <template v-if="simpleKey == 'realms'">
                        <fluro-realm-select :filterDiscriminator="discriminator" block small v-model="model.values" />
                    </template>
                    <template v-else>
                        <template v-if="$vuetify.breakpoint.xsOnly">
                            <v-select class="small-input" multiple dense v-model="model.values" item-text="title" item-value="_id" :loading="loadingValues" :items="possibleValues"></v-select>
                        </template>
                        <template v-else>
                            <v-autocomplete class="small-input" multiple dense v-model="model.values" item-text="title" item-value="_id" :loading="loadingValues" :items="possibleValues"></v-autocomplete>
                        </template>
                    </template>
                </v-flex>
                <v-flex xs12 sm4 v-else>
                    <template v-if="dataType == 'date'">
                        <template v-if="model.comparator == 'datesameweekday'">
                            <div>
                                <v-select single-line multiple dense v-model="model.values" item-text="title" item-value="value" :items="weekdays" />
                            </div>
                        </template>
                        <template v-else>
                            <div>
                                <v-menu ref="date1" v-model="date1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <template v-if="model.computedValue && model.computedValue.length">
                                            <v-text-field v-model="model.computedValue" class="small-input" single-line label="Relative Date"/>
                                        </template>
                                        <template v-else>
                                            <v-text-field v-model="model.value" class="small-input" single-line label="Date" :placeholder="model.computedValue" v-on="on" />
                                        </template>
                                    </template>
                                    <v-date-picker v-model="model.value" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-text-field v-model="model.computedValue" class="small-input" single-line label="Relative Date" />
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="date1 = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.date1.save(model.value)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </div>
                        </template>
                    </template>
                    <v-text-field v-else-if="dataType == 'number' || dataType == 'float' || dataType == 'decimal'" class="small-input" single-line v-model="model.value"></v-text-field>
                    <v-text-field v-else-if="dataType == 'integer'" class="small-input" single-line mask="############" v-model="model.value"></v-text-field>
                    <template v-else-if="dataType == 'reference'">
                        <template v-if="$vuetify.breakpoint.xsOnly">
                            <v-select class="small-input" dense v-model="model.value" item-text="title" item-value="_id" :loading="loadingValues" :items="possibleValues"></v-select>
                        </template>
                        <template v-else>
                            <v-autocomplete class="small-input" dense v-model="model.value" item-text="title" item-value="_id" :loading="loadingValues" :items="possibleValues"></v-autocomplete>
                        </template>
                    </template>
                    <template v-else>
                        <template v-if="requiresManualInput">
                            <v-text-field class="small-input" single-line v-model="model.value"></v-text-field>
                        </template>
                        <template v-else>
                            <template v-if="$vuetify.breakpoint.xsOnly">
                                <v-select class="small-input" dense v-model="model.value" :loading="loadingValues" :items="possibleValues"></v-select>
                            </template>
                            <template v-else>
                                <v-autocomplete class="small-input" dense v-model="model.value" :loading="loadingValues" :items="possibleValues"></v-autocomplete>
                            </template>
                        </template>
                    </template>
                </v-flex>
            </template>
        </v-layout>
        <!-- <pre>{{model}}</pre> -->
    </v-container>
</template>
<script>
import { FilterService } from 'fluro';
import FluroRealmSelect from '../realmselect/FluroRealmSelect.vue';

// import moment from 'moment';

export default {
    components: {
        FluroRealmSelect,
    },
    props: {
        type: {
            type: String,
        },
        useSample: {
            type: Boolean,
        },
        loadingKeys: {
            type: Boolean,
        },
        'value': {
            type: Object,
            required: true,
            // default() {
            //     return {}
            // },
        },
        fields: {
            type: Array,
            default () {
                return []
            },
        },
        definition: {
            type: Object,
            default () {
                return {}
            },
        },
        rows: {
            type: Array,
        },
        // columns: {
        //     type: Array,
        // },
        mini: {
            type: Boolean,
        }
    },
    beforeCreate: function() {
        this.$options.components.FilterConditionRow = require('./FilterConditionRow.vue').default;
        this.$options.components.FilterConditionGroup = require('./FilterConditionGroup.vue').default;
    },
    created() {

        var self = this;


        // if(!self.model.values) {
        //     self.model.values = [];
        // }

        self.debounced = _.debounce(function() {
            // self.model = self.words;
            console.log('FILTER ROW CHANGED', self.model)
            self.$emit('input', self.model);
        }, self.debounce);


        this.retrieveValues();
    },
    data() {


        var datePeriodOptions = []
        var week = (1000 * 60 * 60 * 24) * 7;
        var now = new Date();

        datePeriodOptions.push({
            title: 'Next 6 Weeks',
            date1: now,
            date2: new Date(new Date().setTime(new Date().getTime() + (week * 6))),
        });

        datePeriodOptions.push({
            title: 'Next 2 Weeks',
            date1: now,
            date2: new Date(new Date().setTime(new Date().getTime() + (week * 2))),
        });

        datePeriodOptions.push({
            title: 'Last 2 Weeks',
            date1: new Date(new Date().setTime(new Date().getTime() - (week * 2))),
            date2: now,
        });

        datePeriodOptions.push({
            title: 'Last 6 Weeks',
            date1: new Date(new Date().setTime(new Date().getTime() - (week * 4))),
            date2: now,
        });


        // var parsedModel = this.value;
        var parsedModel = JSON.parse(JSON.stringify(this.value));

        // console.log('MODEL START IS', parsedModel)

        return {
            sampleRefreshKey: this.$fluro.utils.guid(),
            //Date Select Stuff
            datePeriodOptions,
            // datePeriod: datePeriodOptions[1],
            debounced: null,
            debounce: 0, //500,
            possibleValues: [],
            date1: false,
            date2: false,
            loadingValues: false,
            selectedKey: parsedModel.key || '',
            model: parsedModel,
        }
    },
    computed: {
        simpleKey() {
            return String(this.model.key).split('|')[0];
        },
        discriminator() {
            return String(this.model.key).split('|')[1];
        },
        weeks() {

            var array = [];
            _.times(52, function(i) {
                array.push({ title: 'Week ' + i, value: i });
            })

            return array;
        },
        months() {

            var currentYear = new Date().getFullYear();
            return [{
                    title: 'January',
                    value: new Date(currentYear, 1, 1),
                },
                {
                    title: 'February',
                    value: new Date(currentYear, 2, 1),
                },
                {
                    title: 'March',
                    value: new Date(currentYear, 3, 1),
                },
                {
                    title: 'April',
                    value: new Date(currentYear, 4, 1),
                },
                {
                    title: 'May',
                    value: new Date(currentYear, 5, 1),
                },
                {
                    title: 'June',
                    value: new Date(currentYear, 6, 1),
                },
                {
                    title: 'July',
                    value: new Date(currentYear, 7, 1),
                },
                {
                    title: 'August',
                    value: new Date(currentYear, 8, 1),
                },
                {
                    title: 'September',
                    value: new Date(currentYear, 9, 1),
                },
                {
                    title: 'October',
                    value: new Date(currentYear, 0, 1),
                },
                {
                    title: 'November',
                    value: new Date(currentYear, 1, 11),
                },
                {
                    title: 'December',
                    value: new Date(currentYear, 1, 12),
                },
            ]
        },
        weekdays() {
            return [{
                    title: 'Sunday',
                    value: 0,
                },
                {
                    title: 'Monday',
                    value: 1,
                },
                {
                    title: 'Tuesday',
                    value: 2,
                },
                {
                    title: 'Wednesday',
                    value: 3,
                },
                {
                    title: 'Thursday',
                    value: 4,
                },
                {
                    title: 'Friday',
                    value: 5,
                },
                {
                    title: 'Saturday',
                    value: 6,
                },

            ]
        },
        readableStartDate() {
            var self = this;
            return self.$fluro.date.formatDate(self.model.value, 'D MMM YYYY');
        },
        readableEndDate() {
            var self = this;
            return self.$fluro.date.formatDate(self.model.value2, 'D MMM YYYY');
        },
        startDateString: {
            get() {
                if (!this.model.value) {
                    return '';
                }
                return new Date(this.model.value).toISOString().substr(0, 10);
            },
            set(value) {
                console.log('Set the value')
                this.$set(this.model, 'value', new Date(value));
            }
        },
        endDateString: {
            get() {

                if (!this.model.value2) {
                    return '';
                }
                return new Date(this.model.value2).toISOString().substr(0, 10);
            },
            set(value) {
                this.$set(this.model, 'value2', new Date(value));
            }
        },
        requiresManualInput() {
            switch (this.model.comparator) {
                case 'startswith':
                case 'endswith':
                case 'doesnotstartwith':
                case 'doesnotendwith':
                case 'like':
                case 'contains':
                case 'excludes':
                case 'startswith':
                case 'startswith':
                    return true;
                    break;
            }
        },
        rowChangeString() {

            var self = this;

            if (self.useSample) {
                return `${self.sampleRefreshKey}-${self.type}-${self.model.key}`;
            } else {
                // //console.log('CHANGE STRING!', this.model.key, this.rows.length)
                return `${this.discriminatorDefinition}-${this.discriminatorType}${this.discriminator}-${this.model.key}-${_.orderBy(this.$fluro.utils.arrayIDs(this.rows), function(r) {
                    return r;
                }).toString()}`;
            }

        },
        selector() {
            var key = this.model.key;

            if (!this.fields) {
                return;
            }

            return _.find(this.fields, { key });



        },

        valid() {
            return FilterService.isValidFilter(this.model);
        },
        comparator() {
            return FilterService.comparatorLookup[this.model.comparator];
        },
        inputType() {
            return this.comparator ? this.comparator.inputType : null;
        },
        dataType() {
            if (this.selector) {
                return this.selector.type || 'string';
            } else {
                return 'string';
            }
        },
        discriminatorType() {
            if (this.selector) {
                return this.selector._discriminatorType;
            } else {
                return;
            }
        },
        discriminatorDefinition() {
            if (this.selector) {
                return this.selector._discriminatorDefinition;
            } else {
                return;
            }
        },
        discriminator() {
            if (this.selector) {
                return this.selector._discriminator;
            } else {
                return;
            }
        },
        comparators() {

            var type = 'string';
            if (this.selector) {
                type = this.selector.type || 'string';
            }
            return FilterService.getComparatorsForType(type);



        }
    },
    watch: {
        dataType(val) {
            if (val) {
                this.$set(this.model, 'dataType', val);
            } else {
                this.$set(this.model, 'dataType', null);
            }

            ///////////////////////////////////////////

            //Reset the values and the selector
            this.$set(this.model, 'comparator', null);
            this.$set(this.model, 'value', null);
            this.$set(this.model, 'value2', null);
            this.$set(this.model, 'values', []);

            ///////////////////////////////////////////
        },
        selectedKey(val) {
            console.log('Select', val)
            var self = this;

            if (val) {
                this.$set(this.model, 'title', val.title);
                this.model.key = val.key;
            } else {
                this.$set(this.model, 'title', null);
                this.$set(this.model, 'dataType', null);
                this.model.key = null;
            }

            ///////////////////////////////////////////

            //Reset the values and the selector
            this.$set(this.model, 'value', null);
            this.$set(this.model, 'value2', null);
            this.$set(this.model, 'values', []);


        },
        selector() {
            if (this.selector) {
                this.model.key = this.selector.key;
            } else {
                this.model.key = '';
            }
        },
        'model': {
            handler: function() {
                this.debounced();
            },
            deep: true,
        },
        rowChangeString(d) {

            // //console.log('Got the row!');
            // this.possibleValues = [];
            this.retrieveValues();
        }
    },
    methods: {
        selectDatePeriod(option) {
            this.model.value = option.date1;
            this.model.value2 = option.date2;
        },
        retrieveValues() {



            var self = this;
            var key = this.model.key;

            //If we have no key then there are no possible values
            if (!key || !key.length) {
                //console.log('Values > No key so clear values');
                self.possibleValues = [];
                this.loadingValues = false;
                return;
            }

            ////////////////////////////////////

            if (!self.useSample) {
                //There are no rows
                if (!self.rows || !self.rows.length) {
                    //console.log('Values > No rows')
                    self.possibleValues = [];
                    this.loadingValues = false;
                    return;
                }
            }

            ////////////////////////////////
            ////////////////////////////////
            ////////////////////////////////
            ////////////////////////////////

            var dataType = self.dataType;
            // console.log('Retrieve Values', key, self.dataType)

            //For certain data types we already know
            //the options available
            switch (dataType) {
                case 'date':
                case 'number':
                case 'float':
                case 'integer':
                case 'decimal':
                    //console.log('Values > No values, numeric input')
                    return self.possibleValues = [];
                    break;
                case 'boolean':
                    //console.log('Values > Boolean Default')
                    return self.possibleValues = [true, false];
                    break;
                default:
                    switch (key) {
                        case 'definition':
                            if (self.definition && self.definition.definitions) {
                                return self.possibleValues = _.map(self.definition.definitions, function(def) {
                                    return { title: def.title, _id: def.definitionName };
                                })
                            }
                            break;
                        case 'status':

                            switch (_.get(self, 'definition.type.definitionName')) {
                                case 'contact':
                                    return self.possibleValues = ['active', 'draft', 'archived', 'deceased'];
                                    break;
                                case 'purchase':
                                    return self.possibleValues = ['active', 'cancelled', 'expired', 'failed', 'archived', ];
                                    break;
                                default:
                                    return self.possibleValues = ['active', 'draft', 'archived', 'template'];
                                    break;
                            }


                            break;
                        case 'gender':
                            return self.possibleValues = ['male', 'female', 'unknown'];
                            break;
                    }
                    break
            }

            ////////////////////////////////////

            //Show feedback to the user that we are loading
            //the values for them
            this.loadingValues = true;

            ////////////////////////////////////

            //Get the storage cache
            var valueStorageCache = this.$fluro.cache.get('filter-distinct-values');

            ////////////////////////////////////

            //Check to see if there is already a cached set of values
            //for this query
            var valueCache = valueStorageCache[self.rowChangeString];


            ////////////////////////////////////
            ////////////////////////////////////
            ////////////////////////////////////

            //If we haven't already got the values for this request
            if (!valueCache) {


                //Check to see if the rows we know about already have the data
                //we are wanting to search on, because if so we can just use those
                //values instead of having to request from the server
                //


                var rawRowsAlreadyHaveKey = _.some(self.rows, function(row) {
                    return row.hasOwnProperty(key);
                });


                // console.log('ROWS HAVE THE KEY?', rawRowsAlreadyHaveKey);
                ////////////////////////////////////

                //We need to do this so we actually load the definitions from the server not rely
                //on the content in the list
                // if(self.discriminatorDefinition || self.discriminatorType  || self.discriminator) {
                //     rawRowsAlreadyHaveKey = false;
                // }
                ////////////////////////////////////
                ////////////////////////////////////

                //If we already know the options then send them back and resolve
                if (rawRowsAlreadyHaveKey) {

                    //At this point we have a list of the nodes they are allowed to view
                    self.possibleValues = _.chain(self.rows)
                        .map(key)
                        .flatten()
                        .compact()
                        .uniqBy(function(val) {
                            return val.title || val.name || String(val)
                        })
                        .orderBy(function(val) {
                            return val.title || val.name || String(val)
                        })
                        .value();

                    ///////////////////////////

                    //Save and cache the values
                    valueCache = valueStorageCache[self.rowChangeString] = Promise.resolve(self.possibleValues);


                    console.log('We Already have the key of', key);
                } else {

                    // console.log('No rows have the key', key, self.rows);
                    //Get all the ids
                    var subSetIDs = self.$fluro.utils.arrayIDs(self.rows);

                    //We need to make an asynchronous request to the server
                    //to find out what values we can filter by
                    var options = {}


                    ///////////////////////////////////////////////////////
                    //If it's a reference type, tell Fluro to populate it
                    //so we can display a human readable title for them
                    if (self.dataType == 'reference') {
                        if (!options.params) {
                            options.params = {};
                        }
                        options.params.populate = true;
                    }

                    ///////////////////////////////////////////////////////
                    //Check if there are any discriminators that have been specified
                    var discriminatorDefinition = self.discriminatorDefinition; //_.get(self, 'selector._discriminatorDefinition');
                    if (discriminatorDefinition && discriminatorDefinition.length) {
                        if (!options.params) {
                            options.params = {};
                        }
                        options.params.definition = discriminatorDefinition;
                    }

                    ///////////////////////////////////////////////////////
                    //Check if there are any discriminators that have been specified
                    var discriminatorType = self.discriminatorType; //_.get(self, 'selector._discriminatorType');
                    if (discriminatorType && discriminatorType.length) {
                        if (!options.params) {
                            options.params = {};
                        }
                        options.params.discriminatorType = discriminatorType;
                    }

                    ///////////////////////////////////////////////////////
                    //Check if there are any discriminators that have been specified
                    var discriminator = self.discriminator; //_.get(self, 'selector._discriminator');
                    if (discriminator && discriminator.length) {
                        if (!options.params) {
                            options.params = {};
                        }
                        options.params.discriminator = discriminator;
                    }

                    ///////////////////////////////////////////////////////


                    if (self.definition && self.definition.type) {
                        options.type = self.definition.type.definitionName;
                    }


                    ///////////////////////////////////////////////////////


                    //Make the request and cache it
                    valueCache = valueStorageCache[self.rowChangeString] = self.$fluro.content.values(subSetIDs, key, options);
                }
            } else {
                // console.log('Values Cache exists', valueCache)
            }

            /////////////////////////////////////////////////////////////////

            //When the request is complete
            valueCache.then(function(res) {

                self.possibleValues = res;
                self.loadingValues = false;
            }, function(err) {

                self.possibleValues = [];
                self.loadingValues = false;


                valueStorageCache[self.rowChangeString] = null;

            });


        }
    },
    /**
    asyncComputed: {
        values: {
            default: [],
            get() {

                var self = this;
                var key = this.model.key;

                if (!key || !key.length) {
                    return Promise.resolve([]);
                }

                ////console.log('Lets go get options for', key);


                var dataType = self.dataType;
                switch (dataType) {
                    case 'number':
                    case 'float':
                    case 'integer':
                    case 'decimal':
                        return Promise.resolve([]);
                        break;
                    case 'boolean':
                        return Promise.resolve([true, false]);
                        break;
                }



                this.loadingValues = true;
                ////////////////////////////////////

                return new Promise(function(resolve, reject) {



                    if (self.rows && self.rows.length) {

                        //Check to see if the rows we know about already have the data
                        //we are wanting to search on, because if so we can just use that
                        // var rawRowsAlreadyHaveKey = _.every(self.rows, function(row) {
                        //     return row.hasOwnProperty(key);
                        // })

                        // //If we already know the options then send them back and resolve
                        // if (rawRowsAlreadyHaveKey) {
                        //     var allOptions = _.chain(self.rows)
                        //         .map(key)
                        //         .uniq()
                        //         .value();

                        //     return resolve(allOptions)
                        // }

                        //Get all the ids
                        var subSetIDs = _.map(self.rows, '_id');

                        //We need to make an asynchronous request to the server
                        //to find out what values we can filter by
                        // ////console.log('DATA TYPE', self.dataType)
                        var options = {

                        }

                        if (self.dataType == 'reference') {
                            options.params = {
                                populate: true
                            };
                        }

                        return self.$fluro.content.values(subSetIDs, key, options).then(function(res) {
                            resolve(res);
                            self.loadingValues = false;
                        }, function(err) {
                            reject(err);
                            self.loadingValues = false;
                        });
                    }

                    // return resolve([]);


                });
            },
        }
    }

    /**/
}
</script>
<style scoped lang="scss">
.filter-condition-row {
    @media(max-width: 768px) {
        // border-bottom: 3px solid #ddd;
        // padding-bottom:5px;
        // margin-bottom:5px;

    }
}

.filter-condition-row.mini {

    & /deep/ .v-select,
    & /deep/ .v-text-field {

        margin: 0;
        padding: 0;

        .v-label {
            font-size: 13px;
        }


        .v-input__slot {}


        //The slot
        .v-select__slot,
        .v-text-field__slot {
            // background: #ff0066;
            white-space: nowrap;
            font-size: 13px;
            padding: 0;
            // overflow: hidden;
        }
    }

}
</style>