import moment from 'moment';

export default {
    props: {
        dateFilterEnabled: {
            type: Boolean,
        },
        dateFilterPresets: {
            type: Array,
            default () {
                var datePeriodOptions = []

                var day = (1000 * 60 * 60 * 24);
                var week = day * 7;
                var now = new Date();


                //////////////////////////////////////////////////

                datePeriodOptions.push({
                    title: 'Today',
                    startDate: now,
                    endDate: now,
                });

                datePeriodOptions.push({
                    title: 'This Week',
                    startDate: now,
                    endDate: moment().add(1, 'weeks').toDate(),
                });

                datePeriodOptions.push({
                    title: 'Last Week',
                    startDate: moment().subtract(1, 'weeks').toDate(),
                    endDate: now,
                });

                //////////////////////////////////////////////////

                datePeriodOptions.push({
                    title: 'Next 4 weeks',
                    startDate: now,
                    endDate: moment().add(4, 'weeks').toDate(),
                });

                datePeriodOptions.push({
                    title: 'Last 4 weeks',
                    startDate: moment().subtract(4, 'weeks').toDate(),
                    endDate: now,
                });

                //////////////////////////////////////////////////

                datePeriodOptions.push({
                    title: 'Past 12 months',

                    startDate: moment().subtract(12, 'months').toDate(),
                    endDate: now,
                });




                return datePeriodOptions;
            }
        },
        dateFilterDefault: {
            type: Object,
            default () {
                var now = new Date();
                return {
                    startDate: now,
                    endDate: moment().add(3, 'months').toDate(),
                }
            }

        }
    },
    data() {
        var self = this;


        var datePeriodOptions = self.dateFilterPresets;
        var defaultDatePeriod = self.dateFilterDefault;



        return {
            datePeriodOptions,
            rawStartDate: defaultDatePeriod.startDate, //defaultStartDate,
            rawEndDate: defaultDatePeriod.endDate, //defaultEndDate,
        }
    },
    methods: {
        stringDate(date) {

            // var string = new Date(date).toISOString().substr(0, 10);
            var string = this.$fluro.date.formatDate(date, 'YYYY-MM-DD'); //new Date(date).toISOString().substr(0, 10);

            // console.log('STRING DATES', string);

            return string;
        },
        selectDatePeriod(period) {
            this.startDate = new Date(period.startDate);
            this.endDate = new Date(period.endDate);

        },
        groupByDate(rows) {

            return _.chain(rows)
                .reduce(function(set, row, index) {

                    var format = 'ddd D MMM';
                    var startDate = new moment(row.startDate);

                    if (moment().format('YYYY') != startDate.format('YYYY')) {
                        format = 'ddd D MMM YYYY';
                    }

                    var groupingKey = startDate.format(format);




                    var existing = set[groupingKey];
                    if (!existing) {
                        existing = set[groupingKey] = {
                            title: groupingKey,
                            items: [],
                            index,
                        }
                    }

                    existing.items.push(row);

                    return set;
                }, {})
                .values()
                .orderBy('index')
                .value();
        },
    },
    computed: {
    	dateFilterVisible() {
    		return this.dateFilterEnabled && (this.viewMode.value != 'calendar');
    	},
        readableDate() {

            return this.$fluro.date.readableEventDate({
                startDate: this.startDate,
                endDate: this.endDate,
            }, 'day');
        },
        readableStartDate() {
            return this.$fluro.date.formatDate(this.startDate);
        },
        readableEndDate() {
            return this.$fluro.date.formatDate(this.endDate);
        },
        startDate: {
            get() {
                if (!this.dateFilterEnabled) {
                    return;
                }
                return this.rawStartDate;
            },
            set(value) {

                var date = new Date(value);

                if (this.rawEndDate < date) {
                    this.rawEndDate = new Date(date);
                }

                return this.rawStartDate = new Date(value);
            }
        },
        endDate: {
            get() {
                if (!this.dateFilterEnabled) {
                    return;
                }
                return this.rawEndDate;
            },
            set(value) {

                var date = new Date(value);

                if (this.rawStartDate > date) {
                    this.rawStartDate = new Date(date);
                }

                return this.rawEndDate = new Date(value);
            }
        },


        startDateString: {
            get() {
                return this.stringDate(this.startDate);
            },
            set(value) {
                return this.startDate = new Date(value);
            }
        },
        endDateString: {
            get() {
                return this.stringDate(this.endDate);
            },
            set(value) {
                return this.endDate = new Date(value);
            }
        },


    }
}