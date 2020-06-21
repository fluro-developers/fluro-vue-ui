<template>
    <flex-column class="fluro-events-calendar">
        <flex-column-header class="border-bottom">
            <div class="calendar-header">
                <v-layout align-center>
                    <v-flex>
                        <h3>{{title}}</h3>
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
        <v-calendar ref="calendar" v-model="nowDateString" :type="calendar.value" color="primary">
            <template v-slot:day="{ date }">
                <template v-for="event in mappedEvents[date]">
                    <!-- <div v-ripple :style="{backgroundColor:event.bgColor, borderColor:event.borderColor, color:event.color}" class="event-pill single-line"> -->
                    <!-- <div v-ripple class="event-pill single-line"> -->
                    	<div class="event-month-item" @click="$actions.open([event])">
                        <v-layout>
                        	<v-flex shrink >
                                <fluro-realm-dots :realms="event.filteredRealms"/>
                            </v-flex>
                            <v-flex>
                                <span class="time">{{event.readableTime}} </span> <strong>{{event.title}}</strong>
                            </v-flex>
                           <!--  <v-flex shrink>
                                <span class="time">{{event | readableEventTime}} </span>
                            </v-flex> -->
                        </v-layout>
                    </div>
                        <!-- <pre>{{event}}</pre> -->
                    <!-- </div> -->
                    <!-- <pre>{{event}}</pre> -->
                    <!-- <strong>{{event.title}}</strong> -->
                    <!-- <div class="muted font-sm">{{event.firstLine}} </div> -->
                    <!-- <div class="muted font-sm">{{ event | readableEventDate}}</div> -->
                </template>
            </template>
        </v-calendar>
        <!-- <pre>{{calendar}}</pre> -->
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
        format: 'dddd D MMMM YYYY'
    },
    {
        title: 'Week',
        value: 'week',
        format: '[Week] W YYYY'
    },
    {
        title: 'Month',
        value: 'month',
        format: 'MMMM YYYY'
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
        defaultView: {
            type: String,
            default: 'month',
        },
        date: {
            type: Date,
            default () {
                return new Date();
            }
        }
    },
    data() {
        var defaultCalendarOption = _.find(calendarOptions, {
            value: this.defaultView,
        });


        return {
            nowDate: this.date, //now,
            calendar: defaultCalendarOption,
        }
    },
    watch:{
    	nowDate(date) {

    		var moment = this.$fluro.date.moment;
    		var start = date;
    		var end = date;

    		switch(this.calendar.value) {
    			// /case 'month':
    			default:

    				start = moment(date).startOf('month').subtract(7, 'days').toDate();
    				end = moment(date).endOf('month').add(60, 'days').endOf('month').toDate();
    				this.$emit('start', start);
    				this.$emit('end', end);
    			break;
    		}

    	}
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

            var mapped = _.chain(self.events)
                .reduce(function(set, event, index) {

                    var dateString = self.stringDate(event.startDate);

                    //////////////////////////////////////////////////////

                    var event = Object.assign({}, event);

                    var filteredRealms = _.chain(event.realms)
                        .filter(function(realm) {
                            return realm.bgColor;
                        })

                        .value()
                        .slice(0,1);

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
                    event.readableTime =  self.$fluro.date.formatDate(event.startDate, 'h:mma');
                    //event.date = self.stringDate(event.startDate);
                    //event.open = false;
                    event.borderColor = borderColor;
                    event.bgColor = bgColor;
                    event.color = color;
                    //event.datestamp = startDate;
                    event.index = self.events.length - index;
                    //event.guid = event._id;

                    // if (event.title == 'State Youth Games Weekend') {
                    event.multiDay = self.$fluro.date.isMultiDayEvent(event);

                    //////////////////////////////////////////////////////

                    //event.duration = '';
                    //event.time = '';

                    var group = set[dateString];
                    if (!group) {
                        group = set[dateString] = [];
                    }

                    group.push(event);


                    return set;
                }, {})
                .value();

            return mapped;
        }
    },
    methods: {
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
            var data = _.chain(events)
                .map(function(event) {

                    if (!event.multiDay) {
                        return event;
                    }

                    var days = self.enumerateDaysBetweenDates(event.startDate, event.endDate);
                    // days.push(self.stringDate(event.endDate))

                    // console.log('DAYS', event.title, self.stringDate(event.endDate), '||', days);

                    return _.map(days, function(day) {
                        var e = _.clone(event);

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


                    // /////////////////////////////////////////////////

                    // var existingMonthDateEntry = set.months[month].dates[monthDate];
                    // if (!existingMonthDateEntry) {
                    //     existingMonthDateEntry =
                    //         set.months[month].dates[monthDate] = {};   
                    // }

                    // //Add the event
                    // set.months[month].dates[monthDate][event._id] = event;




                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////
                    /////////////////////////////////////////////////



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
    }

    /**/
}
</script>
<style lang="scss">
.fluro-events-calendar {
    //     flex: 1;

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
		padding:3px;
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
			background: rgba(#000,0.05);
		}
	}

    .event-pill {
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
        	padding-left: 5px;
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