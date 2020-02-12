<template>
    <div>
        <template v-if="isArray">
            <span class="inline-tag" v-for="date in rendered" :content="date | timeago" v-tippy>{{date | formatDate('MMM D, YYYY')}}</span>
        </template>
        <template v-else-if="rendered">
            <span class="inline-tag" v-if="rendered" :content="rendered | timeago" v-tippy>{{rendered | formatDate('MMM D, YYYY')}}</span>
        </template>
    </div>
</template>
<script>
function mapDate(entry) {
    if(!entry) {
        return;
    }
    var date = new Date(entry);
    var isValid = date instanceof Date && !isNaN(date);
    if (isValid) {
        return date;
    } else {
        // console.log('ENTRY', entry);
        return `Invalid date ${entry}`
    }
}


export default {
    props: {
        'row': {
            type: Object,
        },
        'column': {
            type: Object,
        },
        'data': {
            // type: Object,
        },
    },
    computed: {
        isArray() {
            return _.isArray(this.data);
        },
        rendered() {
           

            var self = this;

            if (!self.data) {
                return;
            }


            // ////////////////////////
            // ////////////////////////


            if(_.isArray(self.data)) {
                var array = _.chain(self.data)
                    .compact()
                    .map(mapDate)
                    .value();

                if (array.length) {
                    return array;
                } else {
                    return;
                }
            } else {
               
                return self.data ? mapDate(self.data) : false;
            }

        },
    }
}
</script>
<style scoped lang="scss">
    span {
    white-space: nowrap;
    }
</style>