export default {
	computed: {
	},
	methods:{
		easterComputus( y ) {

	        var date, a, b, c, m, d;

	        // Instantiate the date object.
	        date = new Date;

	        // Set the timestamp to midnight.
	        date.setHours( 0, 0, 0, 0 );

	        // Set the year.
	        date.setFullYear( y );

	        // Find the golden number.
	        a = y % 19;

	        // Choose which version of the algorithm to use based on the given year.
	        b = ( 2200 <= y && y <= 2299 ) ?
	            ( ( 11 * a ) + 4 ) % 30 :
	            ( ( 11 * a ) + 5 ) % 30;

	        // Determine whether or not to compensate for the previous step.
	        c = ( ( b === 0 ) || ( b === 1 && a > 10 ) ) ?
	            ( b + 1 ) :
	            b;

	        // Use c first to find the month: April or March.
	        m = ( 1 <= c && c <= 19 ) ? 3 : 2;

	        // Then use c to find the full moon after the northward equinox.
	        d = ( 50 - c ) % 31;

	        // Mark the date of that full moon—the "Paschal" full moon.
	        date.setMonth( m, d );

	        // Count forward the number of days until the following Sunday (Easter).
	        date.setMonth( m, d + ( 7 - date.getDay() ) );

	        // Gregorian Western Easter Sunday
	        return date;

	    },
	    pentecostSunday(y) {
	    	var easter = easterComputus(y)
	    	var pentecostSunday = moment(easter).add(50, 'days').toDate()
	    	return pentecostSunday
	    },
	    calculateRunningAverages(data) {
	    	var runningaverages = []

            _.each(data, function(series){
            	//console.log("In running average", series)
            	if(series.AOT){
	                var count = 0
	                var total = 0
	                var average = {
	                    name: `${series.name} - Average over time`,
	                    key: `${series.key}_AOT`,
	                    type: 'line',
	                    data: _.map(series.data, function(value){
	                        total = total + value
	                        count = count + 1
	                        return parseInt(total / count)
	                    })
	                }
	                runningaverages.push(average)
	            }
                //ApexCharts.exec(self.options.id, 'hideSeries', average.key);
            })

            return runningaverages

	    }
	}
}