<template>
    <v-dialog v-model="display" lazy full-width :width="width" :disabled="disabled">
        <!-- ACTIVATOR -->
        <!-- <v-text-field slot="activator" :outline="outline" :label="label" :value="formattedDatetime" :disabled="disabled" :loading="loading" :error-messages="errorMessages" :error-count="errorCount" :error="error" :hide-details="hideDetails" :append-icon="appendIcon" :prepend-icon="prependIcon" readonly /> -->
        <!-- <template > -->
            <!-- :value="formattedDatetime" -->
        <v-input slot="activator" class="no-flex" :label="label" :hint="hint" :persistent-hint="true"  :disabled="disabled" :loading="loading" :error-messages="errorMessages" :error-count="errorCount" :error="error" :hide-details="hideDetails">
            
                <v-btn block large color="#e0e0e0" class="mx-0">
                    <fluro-icon left icon="calendar-alt"/>{{readable}}
                </v-btn>
            
        </v-input>
        <!-- </template> -->
        <flex-column>
            <!-- <v-card> -->
            <!-- <v-card-text style="padding: 0;"> -->
            <fluro-tabset v-model="activeTab" :justified="true">
                <fluro-tab heading="Date">
                    <!-- <pre>{{typeof datetime}}</pre> -->
                    <!-- <pre>{{datePart}}</pre> -->
                    <!-- :min="min" :max="max" -->
                    <v-date-picker attach class="elevation-0" full-width v-model="datePart" scrollable :locale="locale" actions></v-date-picker>
                </fluro-tab>
                <fluro-tab heading="Time">
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
                    <v-btn color="" flat @click.native="clearHandler">{{clearText}}</v-btn>
                    <v-btn color="primary" @click="okHandler">{{okText}}</v-btn>
                </slot>
            </v-card-actions>
            <!-- </v-card> -->
        </flex-column>
    </v-dialog>
</template>
<script>
import moment from 'moment'
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
        // min: {
        //     type: String,
        // },
        // max: {
        //     type: String,
        // },
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
            type: [String, Array],
            default: () => []
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
            activeTab: 0,
            selectedDatetime: null
        }
    },
    created() {
        if (this.datetime instanceof Date) {
            this.selectedDatetime = this.datetime
        } else if (typeof this.datetime === 'string' || this.datetime instanceof String) {
            // see https://stackoverflow.com/a/9436948
            this.selectedDatetime = moment(new Date(this.datetime), this.format)
        }
    },
    computed: {
        readable() {
            return this.datetime ? this.formattedDatetime : this.placeholder;//'Select a date'
        },
        datePart: {
            get() {

                let val = this.selectedDatetime ? moment(this.selectedDatetime).format(DEFAULT_DATE_FORMAT) : ''
                return val
            },
            set(val) {
                this.dateSelected = true
                this.activeTab = 1

                let date = moment(val, DEFAULT_DATE_FORMAT)
                let hour = this.selectedDatetime ? moment(this.selectedDatetime).hour() : 0
                let minute = this.selectedDatetime ? moment(this.selectedDatetime).minute() : 0
                let input = moment().year(date.year()).month(date.month()).date(date.date()).hour(hour).minute(minute).second(0)
                this.selectedDatetime = input.toDate()
            }
        },
        timePart: {
            get() {

                let val = this.selectedDatetime ? moment(this.selectedDatetime).format(DEFAULT_TIME_FORMAT) : DEFAULT_TIME
                return val
            },
            set(val) {
                this.timeSelected = true

                let time = moment(val, DEFAULT_TIME_FORMAT)
                let input = moment(this.selectedDatetime).hour(time.hour()).minute(time.minute()).second(0)
                this.selectedDatetime = input.toDate()
            }
        },
        formattedDatetime() {
            return this.datetime ? moment(this.datetime).format(this.format) : ''
        }
    },
    methods: {
        okHandler() {
            this.display = false
            this.activeTab = 0
            if(this.$refs.timer) {
                this.$refs.timer.selectingHour = true
            }
            

            this.$emit('input', this.selectedDatetime)
        },
        clearHandler() {
            this.display = false
            this.activeTab = 0
            if(this.$refs.timer) {
                this.$refs.timer.selectingHour = true
            }
            

            this.$emit('input', null)
        }
    }
}
</script>