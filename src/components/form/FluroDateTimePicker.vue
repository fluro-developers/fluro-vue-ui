<template>
    <v-dialog v-model="display" lazy full-width :width="width" :disabled="disabled">
        <!-- ACTIVATOR -->
        <!-- <v-text-field slot="activator" :outline="outline" :label="label" :value="formattedDatetime" :disabled="disabled" :loading="loading" :error-messages="errorMessages" :error-count="errorCount" :error="error" :hide-details="hideDetails" :append-icon="appendIcon" :prepend-icon="prependIcon" readonly /> -->
        <!-- <template > -->
        <!-- :value="formattedDatetime" -->
        <v-input @click.native="$emit('touched')" slot="activator" class="no-flex" @blur="$emit('blur')" @focus="$emit('focus')" :label="label" :required="required" :hint="hint" :persistent-hint="true" :disabled="disabled" :loading="loading" :error-messages="errorMessages" :error-count="errorCount" :error="error" :hide-details="hideDetails">
            <template v-if="isWebMode">
                <fluro-button block color="#e0e0e0" class="mx-0">
                    <fluro-icon left icon="calendar-alt" />Web Mode {{readable}}
                </fluro-button>
            </template>
            <template v-else>
                <v-btn block :large="large" color="#e0e0e0" class="mx-0">
                    <fluro-icon left icon="calendar-alt" />Not Web Mode {{readable}}
                </v-btn>
            </template>
        </v-input>
        <!-- </template> -->
        <flex-column>
            <!-- <v-card> -->
            <!-- <v-card-text style="padding: 0;"> -->
            <fluro-tabset v-model="activeTab" :justified="true">
                <fluro-tab heading="Date" index="date">
                    <!-- <pre>{{typeof datetime}}</pre> -->
                    <!-- <pre>{{datePart}}</pre> -->
                    <!--  -->
                    <v-date-picker attach class="elevation-0" :min="minDateString" :max="maxDateString" full-width v-model="datePart" scrollable :locale="locale" actions></v-date-picker>
                </fluro-tab>
                <fluro-tab heading="Time" index="time">
                    <!-- <pre>{{typeof datetime}}</pre> -->
                    <!-- <pre>{{timePart}}</pre> -->
                    <v-time-picker ref="timer" attach full-width class="v-time-picker-custom elevation-0" v-model="timePart" scrollable :format="timePickerFormat" actions></v-time-picker>
                </fluro-tab>
            </fluro-tabset>
            <!-- <v-tabs fixed-tabs v-model="activeTab">
                    <v-tab key="calendar">
                        <slot name="dateIcon">
                            Date
                        </slot>
                    </v-tab>
                    <v-tab key="timer" :disabled="!dateSelected">
                        <slot name="timeIcon">
                            Time
                        </slot>
                    </v-tab>
                    <v-tab-item key="calendar">
                        <v-date-picker attach class="elevation-0" full-width v-model="datePart" scrollable :locale="locale" actions>
                        </v-date-picker>
                    </v-tab-item>
                    <v-tab-item key="timer">
                        <v-time-picker ref="timer" attach full-width class="v-time-picker-custom elevation-0" v-model="timePart" scrollable :format="timePickerFormat" actions>
                        </v-time-picker>
                    </v-tab-item>
                </v-tabs> -->
            <!-- </v-card-text> -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <slot name="actions" :parent="this">
                    <template v-if="isWebMode">
                        <fluro-button @click="clearHandler">{{clearText}}</fluro-button>
                        <fluro-button @click="okHandler">{{okText}}</fluro-button>
                    </template>
                    <template v-else>
                        <v-btn color="" flat @click.native="clearHandler">{{clearText}}</v-btn>
                        <v-btn color="primary" @click="okHandler">{{okText}}</v-btn>
                    </template>
                </slot>
            </v-card-actions>
            <!-- </v-card> -->
        </flex-column>
    </v-dialog>
</template>
<script>
import FluroTab from '../ui/tabset/FluroTab.vue'
import FluroTabset from '../ui/tabset/FluroTabset.vue'

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
const DEFAULT_TIME_FORMAT = 'HH:mm'
const DEFAULT_TIME = '00:00'

export default {
    name: 'datetime-picker',
    model: {
        prop: 'datetime',
        event: 'input'
    },
    components: {
        FluroTab,
        FluroTabset,
    },
    props: {
        webMode: {
            type: Boolean,
        },
        datetime: {
            type: [Date, String],
            default: null
        },
        label: {
            type: String,
            default: ''
        },
        hint: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Select a date'
        },
        required: {
            type: Boolean,
        },
        min: {
            type: Date,
        },
        max: {
            type: Date,
        },
        outline: {
            type: Boolean,
        },
        width: {
            type: Number,
            default: 320
        },
        format: {
            type: String,
            default: 'YYYY-MM-DD HH:mm:ss'
        },
        timePickerFormat: {
            type: String,
            default: '24hr'
        },
        locale: {
            type: String,
            default: 'en-us'
        },
        clearText: {
            type: String,
            default: 'CLEAR'
        },
        large: {
            type: Boolean,
            default: true,
        },
        okText: {
            type: String,
            default: 'OK'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        errorMessages: {
            type: Array,
        },
        errorCount: {
            type: [Number, String],
            default: 1
        },
        error: {
            type: Boolean,
            default: false
        },
        hideDetails: {
            type: Boolean,
            default: false
        },
        appendIcon: {
            type: String
        },
        prependIcon: {
            type: String
        }
    },
    data() {
        return {
            display: false,
            dateSelected: false,
            timeSelected: false,
            activeTab: 'date',
            selectedDatetime: null
        }
    },
    created() {

        var self = this;

        if (self.datetime) {
            if (self.datetime instanceof Date) {
                self.selectedDatetime = self.datetime
            } else if (typeof self.datetime === 'string' || self.datetime instanceof String) {
                // see https://stackoverflow.com/a/9436948
                self.selectedDatetime = self.$fluro.date.moment(new Date(self.datetime), self.format)
            }
        }
    },
    watch: {
        datetime(v) {
            var self = this;
            if (v instanceof Date) {
                self.selectedDatetime = v
            } else if (typeof v === 'string' || v instanceof String) {
                // see https://stackoverflow.com/a/9436948
                self.selectedDatetime = self.$fluro.date.moment(new Date(v), self.format)
            }
        },
    },
    computed: {
        isWebMode() {

            var self = this;

            if(self.webMode) {
             return true;
            }

            if (!self.$fluro.app) {
                return;
            }

            var element = self.$el;
            if (!element) {
                return;
            }

            if (!element.ownerDocument) {
                return;
            }

            if (!element.ownerDocument.defaultView) {
                return;
            }

            return !element.ownerDocument.defaultView.adminPanelMode;
        },
        minDateString() {
            var self = this;
            return self.min ? self.$fluro.date.moment(self.min).format(DEFAULT_DATE_FORMAT) : null;
        },
        maxDateString() {
            var self = this;
            return self.max ? self.$fluro.date.moment(self.max).format(DEFAULT_DATE_FORMAT) : null;
        },
        readable() {
            return this.datetime ? this.formattedDatetime : this.placeholder; //'Select a date'
        },
        datePart: {
            get() {

                var self = this;

                let val = self.selectedDatetime ? self.$fluro.date.moment(self.selectedDatetime).format(DEFAULT_DATE_FORMAT) : ''
                return val
            },
            set(val) {
                var self = this;
                self.dateSelected = true
                self.activeTab = 'time'

                var moment = self.$fluro.date.moment;
                let date = moment(val, DEFAULT_DATE_FORMAT)
                let hour = self.selectedDatetime ? moment(self.selectedDatetime).hour() : 0
                let minute = self.selectedDatetime ? moment(self.selectedDatetime).minute() : 0
                let input = moment().year(date.year()).month(date.month()).date(date.date()).hour(hour).minute(minute).second(0)
                self.selectedDatetime = input.toDate()
            }
        },
        timePart: {
            get() {

                var self = this;

                let val = self.selectedDatetime ? self.$fluro.date.moment(self.selectedDatetime).format(DEFAULT_TIME_FORMAT) : DEFAULT_TIME
                return val
            },
            set(val) {
                var self = this;
                self.timeSelected = true

                let time = self.$fluro.date.moment(val, DEFAULT_TIME_FORMAT)
                let input = self.$fluro.date.moment(self.selectedDatetime).hour(time.hour()).minute(time.minute()).second(0)
                self.selectedDatetime = input.toDate()
            }
        },
        formattedDatetime() {
            var self = this;
            return self.datetime ? self.$fluro.date.moment(self.datetime).format(self.format) : ''
        }
    },
    methods: {
        okHandler() {
            this.display = false
            this.activeTab = 'date';
            if (this.$refs.timer) {
                this.$refs.timer.selectingHour = true
            }


            this.$emit('input', this.selectedDatetime)
        },
        clearHandler() {
            this.display = false
            this.activeTab = 'date'
            if (this.$refs.timer) {
                this.$refs.timer.selectingHour = true
            }


            this.$emit('input', null)
        }
    }
}

</script>
