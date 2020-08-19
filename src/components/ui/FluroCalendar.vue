<template>
    <flex-column class="fluro-events-calendar">
        <flex-column-header class="border-bottom">
            <div class="calendar-header">
                <v-layout align-center>
                    <v-flex>
                        <h3>{{title}}</h3>
                    </v-flex>
                    <v-flex shrink>
                        <v-menu v-model="viewModeOptionsShowing">
                            <template v-slot:activator="{ on }">
                                <v-btn small v-on="on">
                                    <fluro-icon :icon="calendar.icon" left /> {{calendar.title}}
                                </v-btn>
                            </template>
                            <v-list dense>
                                <v-list-tile @click="calendar = viewMode" v-for="viewMode in viewModes">
                                    <fluro-icon :icon="viewMode.icon" left /> {{viewMode.title}}
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </v-flex>
                    <v-flex shrink>
                        <v-btn small @click="today()">
                            Today
                        </v-btn>
                        <v-btn small icon @click="previous()">
                            <fluro-icon icon="arrow-left" />
                        </v-btn>
                        <v-btn small icon @click="next()">
                            <fluro-icon icon="arrow-right" />
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </flex-column-header>
        <flex-column>
            <!-- <pre>{{eventMap}}</pre> -->
            <v-calendar ref="calendar" v-model="nowDateString" :type="calendar.value" color="primary">
                <template v-slot:day="{ date }">
                    <template v-for="event in eventMap[date]">
                        <div class="event-month-item" @click="selectEvent(event)">
                            <!-- <pre>{{event}}</pre> -->
                            <v-layout>
                                <v-flex shrink>
                                    <fluro-realm-dots :realms="event.filteredRealms" />
                                </v-flex>
                                <v-flex>
                                    <span class="time">{{event.readableTime}} </span> <strong>{{event.title}}</strong>
                                </v-flex>
                            </v-layout>
                        </div>
                    </template>
                </template>
                <!-- the events at the top (all-day) -->
                <template v-slot:dayHeader="{ date }">
                    <template v-for="event in eventMap[date]" v-if="event.multiDay">
                        <!-- all day events don't have time -->
                        <!-- <v-menu :key="event._id" v-model="event.open" full-width offset-x> -->
                        <!-- <template v-slot:activator="{ on }"> -->
                        <!-- v-on="on" -->
                        <div v-ripple :style="{backgroundColor:event.bgColor, borderColor:event.borderColor, color:event.color}" :class="{open:event.open}" @click="selectEvent(event)" class="event-calendar-pill single-line">
                            <!-- <fluro-realm-dots :realms="event.realms" /> -->
                            {{event.title}}
                            <span class="time">{{event | readableEventTime}} </span>
                        </div>
                        <!-- </template> -->
                        <!-- <v-card color="grey lighten-4" min-width="350px" flat>
                                            <v-toolbar color="primary" dark>
                                                <v-btn icon>
                                                    <v-icon>edit</v-icon>
                                                </v-btn>
                                                <v-toolbar-title v-html="event.title"></v-toolbar-title>
                                                <v-spacer></v-spacer>
                                                <v-btn icon>
                                                    <v-icon>favorite</v-icon>
                                                </v-btn>
                                                <v-btn icon>
                                                    <v-icon>more_vert</v-icon>
                                                </v-btn>
                                            </v-toolbar>
                                            <v-card-title primary-title>
                                                <span v-html="event.details"></span>
                                            </v-card-title>
                                            <v-card-actions>
                                                <v-btn flat color="secondary">
                                                    Cancel
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card> -->
                        <!-- </v-menu> -->
                    </template>
                </template>
                <!-- the events at the bottom (timed) -->
                <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
                    <template v-if="timeMap[date]">
                        <div class="timeslot" v-for="block in timeMap[date].slots" :style="{ top: timeToY(block.time) + 'px', height: minutesToPixels(block.duration) + 'px'}" :class="[`indent-${block.indent}`]">
                            <!-- full-width -->
                            <!-- <v-menu :key="block.guid" v-model="block.open" full-width offset-x> -->
                            <!-- <template v-slot:activator="{ on }"> -->
                            <v-layout>
                                <!-- <pre v-for="event in block[block.time].events">{{event}}</pre> -->
                                <v-flex :key="event.guid" v-for="event in block.events">
                                    <div class="event-calendar-pill" @click="selectEvent(event)" :style="{backgroundColor:event.bgColor, borderColor:event.borderColor, color:event.color, height: minutesToPixels(event.duration) + 'px'}">
                                        {{event.title}}
                                        <div class="time" v-if="!event.multiDay">{{event.startDate | formatDate('h:mma')}} </div>
                                        <div class="time" v-else>{{event | readableEventDate}} </div>
                                        <!-- {{event.time}} - {{event.duration}} -->
                                    </div>
                                </v-flex>
                            </v-layout>
                        </div>
                        <!-- <template> -->
                        <!-- <div> -->
                        <!-- <v-toolbar dense> -->
                        <!-- <v-toolbar-title>{{block.title}}</v-toolbar-title> -->
                        <!-- </v-toolbar> -->
                        <!-- <fluro-list-item @click.native="selectEvent(event)" style="{cursor: pointer;}" :item="event" v-for="event in block.events"></fluro-list-item> -->
                        <!-- <calendar-card :event="event" v-for="event in block.events"></calendar-card> -->
                        <!-- </div> -->
                        <!-- </template> -->
                        <!-- </v-menu> -->
                    </template>
                </template>
            </v-calendar>
        </flex-column>
        <!-- <flex-column-body> -->
        <!-- <pre>{{timeMap}}</pre> -->
        <!-- </flex-column-body> -->
    </flex-column>
</template>
<script>
import _ from 'lodash';
////////////////////////////////////////////////////////////

var day = 86400 * 1000;
var buffer = 60 * day;

var calendarOptions = [{
        title: 'Day',
        value: 'day',
        format: 'dddd D MMMM YYYY',
        icon: 'calendar-day',
    },
    {
        title: 'Week',
        value: 'week',
        format: '[Week] W YYYY (MMM)',
        icon: 'calendar-week',
    },
    {
        title: 'Month',
        value: 'month',
        format: 'MMMM YYYY',
        icon: 'calendar-alt',
    },
    // {
    //     title: 'List',
    //     value: 'list',
    //     format: 'MMMM YYYY'
    // },
]

////////////////////////////////////////////////////////////


export default {
    props: {
        events: {
            type: Array,
        },
        view: {
            type: String,
            default: 'month',
        },
        value: {
            type: Date,
            default () {
                return new Date();
            }
        }
    },
    data() {
        var defaultCalendarOption = _.find(calendarOptions, {
            value: this.view,
        });


        return {
            nowDate: this.value, //now,
            calendar: defaultCalendarOption,
            eventMap: {},
            timeMap: {},
            monthMap: {},
            viewModes: calendarOptions,
            viewModeOptionsShowing: false,
        }
    },
    watch: {

        view(v) {
            var calendarOption = _.find(calendarOptions, {
                value: this.view,
            });

            if (calendarOption) {
                this.calendar = calendarOption;
            }
        },
        calendar() {
            this.$emit('view', this.calendar.value)
        },

        value(date) {

            var currentValue = this.stringDate(this.nowDate);
            var newValue = this.stringDate(date);

            if (currentValue != newValue) {
                this.nowDate = date;
            }
        },
        nowDate(date) {

            var moment = this.$fluro.date.moment;
            var start = date;
            var end = date;

            switch (this.calendar.value) {
                // /case 'month':
                default:

                    start = moment(date).startOf('month').subtract(7, 'days').toDate();
                    end = moment(date).endOf('month').add(60, 'days').endOf('month').toDate();
                    this.$emit('start', start);
                    this.$emit('end', end);
                    break;
            }

            console.log('DATE CHANGED', date);
            this.$emit('input', date);

        },
        mappedEvents: 'remap',
    },
    computed: {
        title() {
            return this.$fluro.date.formatDate(this.now, this.calendar.format);
        },
        now: {
            get() {
                return this.nowDate;
            },
            set(date) {

                var dateString = this.stringDate(date);
                // this.$router.push({ query: Object.assign({}, this.$route.query, { date: dateString }) });
                this.nowDate = date;
            },
        },
        nowDateString: {
            get() {
                return this.stringDate(this.now);
            },
            set(value) {
                return this.now = new Date(value);
            }
        },
        start() {
            return this.stringDate(new Date());
        },
        end() {
            return this.stringDate(new Date());
        },
        mappedEvents() {
            var self = this;

            return _.map(self.events, function(event, index) {

                var dateString = self.stringDate(event.startDate);

                //////////////////////////////////////////////////////

                var event = Object.assign({}, event);

                var filteredRealms = _.chain(event.realms)
                    .filter(function(realm) {
                        return realm.bgColor;
                    })

                    .value()
                    .slice(0, 1);

                var firstRealm = _.last(filteredRealms);

                var bgColor = _.get(firstRealm, 'bgColor');
                var color = _.get(firstRealm, 'color');
                var borderColor = color;

                /////////////////////////////////////////////////////////////////////

                var time = self.$fluro.date.formatDate(event.startDate, 'HH:mm');

                /////////////////////////////////////////////////////////////////////

                var startDate = new Date(event.startDate).getTime();
                var endDate = new Date(event.endDate).getTime();

                /////////////////////////////////////////////////////////////////////

                var duration = (endDate - startDate) / 1000 / 60;
                if (startDate == endDate) {
                    duration = 90;
                }

                /////////////////////////////////////////////////////////////////////

                event.duration = duration;
                event.time = time;
                event.filteredRealms = filteredRealms;
                event.readableTime = self.$fluro.date.formatDate(event.startDate, 'h:mma');
                event.date = self.stringDate(event.startDate);
                //event.open = false;
                event.borderColor = borderColor;
                event.bgColor = bgColor;
                event.color = color;
                //event.datestamp = startDate;
                event.index = self.events.length - index;
                //event.guid = event._id;

                // if (event.title == 'State Youth Games Weekend') {
                event.multiDay = self.$fluro.date.isMultiDayEvent(event);

                return event;
            });
        }
    },
    methods: {
        enumerateDaysBetweenDates(startDate, endDate) {

            startDate = new Date(startDate);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(endDate);
            endDate.setHours(0, 0, 0, 0);


            //////////////////////////////

            var self = this;
            var now = new Date(startDate);
            var dates = [];

            //////////////////////////////

            while (now <= endDate) {
                dates.push(self.stringDate(now));
                now.setDate(now.getDate() + 1);
                // now.add(1, 'days');
            }

            //////////////////////////////

            return dates;
        },
        remap(events) {

            var self = this;

            console.log('events', events.length)
            var data = _.chain(events)
                .map(function(event) {

                    if (!event.multiDay) {
                        return event;
                    }

                    ////////////////////////////////////////////////////////////////////////////

                    var days = self.enumerateDaysBetweenDates(event.startDate, event.endDate);

                    return _.map(days, function(day) {

                        var e = Object.assign({}, event)
                        var firstDay = (day == self.stringDate(event.startDate));
                        var lastDay = (day == self.stringDate(event.endDate));

                        //If it's not the first day of the multi day event
                        //then the start is the start of the day
                        if (!firstDay) {
                            e.time = '00:00';
                        }

                        // console.log(firstDay, lastDay, event.title,  self.stringDate(event.endDate), day, event.endDate);
                        //If it's the last day
                        if (lastDay) {

                            //Get the start of the last day
                            var start = new Date(event.endDate);
                            start.setHours(0, 0, 0, 0);

                            //Get the end of the event
                            var end = new Date(event.endDate);


                            //The duration should be the end minus the start
                            e.duration = (end - start) / 1000 / 60;
                            // console.log('START AND END', start, end, e.duration)
                        }

                        e.guid = self.$fluro.utils.guid();
                        e.date = day;
                        return e;
                    });
                })
                .flatten()
                .orderBy(function(event) {
                    return new Date(event.startDate);
                })
                .reduce(function(set, event) {

                    //Get the date of the event
                    var eventDate = event.date;
                    var eventTime = event.time;
                    var startDate = event.startDate;
                    var endDate = event.endDate;

                    /////////////////////////////////////////////////

                    //Add the month as a key so we can group it later
                    var month = self.$fluro.date.formatDate(event.startDate, 'MMM YYYY');
                    // var monthDate = self.$fluro.date.formatDate(event.startDate, 'D MMM YYYY');
                    event.month = month;


                    var existingMonthEntry = set.months[month];
                    if (!existingMonthEntry) {
                        existingMonthEntry =
                            set.months[month] = {
                                title: month,
                                dates: {},
                            }
                    }

                    /////////////////////////////////////////////////

                    var existingDateEntry = set.events[eventDate];
                    if (!existingDateEntry) {
                        existingDateEntry =
                            set.events[eventDate] =
                            set.months[month].dates[eventDate] = [];
                    }

                    //Add the event
                    existingDateEntry.push(event);

                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////

                    var existingDateTimeEntry = set.times[eventDate];
                    if (!existingDateTimeEntry) {
                        existingDateTimeEntry = set.times[eventDate] = {
                            slots: [],
                            map: {},
                        }
                    }

                    /////////////////////////////////////////////////

                    var blockTitle = self.$fluro.date.formatDate(event.startDate, 'h:mma dddd D MMMM')

                    /////////////////////////////////////////////////

                    var previousSlots = existingDateTimeEntry.slots;

                    var existingTimeSlot = existingDateTimeEntry.map[eventTime];
                    if (!existingTimeSlot) {

                        existingTimeSlot = existingDateTimeEntry.map[eventTime] = {
                            guid: self.$fluro.utils.guid(),
                            title: blockTitle,
                            time: eventTime,
                            events: [],
                            endDate,
                            startDate,
                            indent: 0,
                            open: false,

                        };


                        //Check if there is a clash with another event so we can indent if we need to
                        var clash = _.findLast(previousSlots, function(slot) {
                            return slot.endDate > existingTimeSlot.startDate;
                        })

                        /////////////////////////////////////////////////
                        if (clash) {
                            existingTimeSlot.indent = (clash.indent + 1);
                        }

                        /////////////////////////////////////////////////

                        existingDateTimeEntry.slots.push(existingTimeSlot);
                    }

                    /////////////////////////////////////////////////

                    if (endDate > existingTimeSlot.endDate) {
                        existingTimeSlot.endDate = endDate;
                    }

                    /////////////////////////////////////////////////

                    //Add the timeslot
                    existingTimeSlot.events.push(event);

                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////


                    return set;
                }, { events: {}, times: {}, months: {}, })
                .value();



            ///////////////////////////////////////////////////////

            self.eventMap = data.events;
            self.timeMap = data.times;
            self.monthMap = data.months;


        },
        selectEvent(event) {
            console.log('SELECT', this, event)
            this.$emit('select', event);
        },
        today() {
            this.now = new Date();
        },
        stringDate(date) {

            // var string = new Date(date).toISOString().substr(0, 10);
            var string = this.$fluro.date.formatDate(date, 'YYYY-MM-DD'); //new Date(date).toISOString().substr(0, 10);

            // console.log('STRING DATES', string);

            return string;
        },

        previous() {

            var self = this;
            var newMoment;
            switch (self.calendar.value) {
                case 'week':
                    //Get the earlier date
                    newMoment = self.$fluro.date.moment(self.now).subtract(1, 'weeks');
                    break;
                case 'list':
                case 'month':
                    //Get the earlier date
                    newMoment = self.$fluro.date.moment(self.now).subtract(1, 'months');
                    break;
                case 'day':
                    //Get the earlier date
                    newMoment = self.$fluro.date.moment(self.now).subtract(1, 'day');
                    break;
            }
            console.log('NEW MOMENT', self.now, newMoment.toDate());

            if (!newMoment) {
                return;
            }

            self.now = newMoment.toDate();
        },
        next() {

            var self = this;
            var newMoment;
            switch (self.calendar.value) {
                case 'week':
                    //Get the earlier date
                    newMoment = self.$fluro.date.moment(self.now).add(1, 'weeks');
                    break;
                case 'list':
                case 'month':
                    //Get the earlier date
                    newMoment = self.$fluro.date.moment(self.now).add(1, 'months');
                    break;
                case 'day':
                    //Get the earlier date
                    newMoment = self.$fluro.date.moment(self.now).add(1, 'day');
                    break;
            }
            console.log('NEW MOMENT', self.now, newMoment.toDate());

            if (!newMoment) {
                return;
            }

            self.now = newMoment.toDate();

        },
    },
    /**
    data() {
        return {}
    },
    /**
    methods: {
        stringDate(date) {

            // var string = new Date(date).toISOString().substr(0, 10);
            var string = this.$fluro.date.formatDate(date, 'YYYY-MM-DD'); //new Date(date).toISOString().substr(0, 10);

            // console.log('STRING DATES', string);

            return string;
        },
        
        
       
        
    }

    /**/
}
</script>
<style lang="scss">
.fluro-events-calendar {
    //     flex: 1;

    .v-calendar-daily_head-weekday,
    .v-calendar-weekly__head-weekday {
        text-transform: uppercase;
        ;
        font-weight: 500;
        font-size: 10px;
    }

    .timeslot {
        position: absolute !important;
        width: 100%;
    }

    .v-calendar-monthly {
        .v-calendar-weekly__week {
            overflow: hidden;

            .v-calendar-weekly__day {
                overflow: auto !important;
            }
        }


        .v-calendar-weekly__day-label {
            font-size: 20px;
            font-weight: 100;
        }

        .v-calendar-weekly__day-month {
            text-transform: uppercase;
            font-weight: 500;
            letter-spacing: 0.05em;
            font-size: 10px;
        }
    }




    .calendar-header {
        padding: 5px 15px;
    }



    .event-month-item {
        padding: 3px;
        border-radius: 1000px;
        cursor: pointer;
        font-size: 11px;
        white-space: nowrap;
        overflow: hidden;

        .time {
            opacity: 0.5;
            font-size: 0.9em;
        }

        strong {
            font-weight: 500 !important;
        }

        &:hover {
            background: rgba(#000, 0.05);
        }
    }

    .event-calendar-pill {
        position: relative;
        margin: 2px;
        overflow: hidden;
        min-height: 25px;
        // white-space: nowrap;
        border-radius: 3px;
        // border:0px solid transparent;
        background-color: #fff;
        // color: #ffffff;
        // border: 1px solid #1867c0;
        font-size: 12px;
        padding: 3px 5px;
        cursor: pointer;
        margin-bottom: 1px;
        // box-shadow: 1px 1px 1px rgba(#000, 0.3);
        transition: all 0.3s;

        &.single-line {
            white-space: nowrap;
        }


        &.with-time {
            position: absolute;
            // max-width: 100%;
            // overflow: hidden;
            // right: 4px;
            // margin-right: 0px;
            white-space: nowrap;
        }

        .time {
            // padding-left: 5px;
            font-size: 0.9em;
            opacity: 0.5;
        }

        &:hover {
            opacity: 0.9;
            // box-shadow: 1px 1px 1px rgba(#000, 0.5);
            //     .time {
            //         opacity: 1;
            //     }
        }

    }

}
</style>