<template>
    <td :class="{wrap:column.wrap, 'text-xs-center':column.align == 'center', 'text-xs-right':column.align =='right'}">
        
        <!-- <pre>{{column.type}}</pre> -->
        <component v-if="column.renderer" :data="rawValue" :is="column.renderer" :row="row" :column="column" />
        <div v-else-if="complexObject">
            <template v-if="preValue._type == 'event'">
                <a @click.stop.prevent="clicked(preValue)">
                    {{preValue.title}} <span class="text-muted">// {{preValue | readableEventDate}}</span>
                </a>
            </template>
            <template v-else>
                
                <a @click.stop.prevent="clicked(preValue)" class="inline-tag" :style="{color:preValue.color, backgroundColor:preValue.bgColor}">
                    <fluro-icon v-if="preValue._type" :type="preValue._type" /> {{preValue.title}}
                </a>
            
            </template>
            <!-- if (_.isObject(val)) {
            return val
            if (val._type == 'event') {
            return val.title + '<span class="text-muted"> // ' + this.$fluro.formatDate(val.startDate, 'h:mma dddd D MMM, Y') + '</span>';
            }
            return `<span class="inline-tag">${val.title || val.name}</span>`;
            }
            return val; -->
        </div>
        <div v-else-if="complexArray">
            <div style="max-width: 300px; white-space: normal;">
            <a @click.stop.prevent="clicked(entry)" class="inline-tag" v-for="entry in preValue" :style="{color:entry.color, backgroundColor:entry.bgColor}">
                <fluro-icon v-if="entry._type && entry._type != 'realm'" :type="entry._type" /> {{entry.title}}
            </a>
        </div>
        </div>
        <slot v-else :value="value" :row="row" :column="column">
            {{value}}
        </slot>
    </td>
</template>
<script>
/////////////////////////////////

export default {
    props: {
        'column': {
            type: Object,
        },
        'row': {
            type: Object,
        },
    },
    methods: {
        clicked(item) {
            console.log('Sub item click', item);
            this.$actions.open([item]);
            // this.$fluro.global.view(item);
        }
    },
    computed: {
        complexArray() {
            return this.preValue && _.isArray(this.preValue) && this.preValue[0] && this.preValue[0].title;
        },
        complexObject() {
            return !this.complexArray && _.isObject(this.preValue);

        },
        value() {

            var self = this;

            var val = self.preValue;
            if (!val) {
                return;
            }

            if (val.join) {
                return _.map(val, 'title').join(', ');
            }

            if(self.column.sortType == 'date' || self.column.type =='date') {

                if(self.column.format) {
                    return self.$fluro.date.formatDate(val, self.column.format);
                } else {
                    return self.$fluro.date.formatDate(val, 'D MMM YYYY')
                }
            }

            return val.title || val.name || val;
        },
        key() {
            return (this.column.key || '').split('|')[0];
        },
        rawValue() {
            return _.get(this.row, this.key);
        },
        preValue() {
            // console.log('THIS', this.key, this.rawValue)
            var self = this;
            var val = this.rawValue;

            ///////////////////////////////

            var definitionDiscriminator = (this.column.key || '').split('|')[1];

            ///////////////////////////////

            //If there is an array
            if (_.isArray(val)) {

                ///////////////////////////////

                var array = _.chain(val)
                    .compact()
                    .filter(function(v) {
                        if (definitionDiscriminator) {
                            return v.definition == definitionDiscriminator || v._discriminator == definitionDiscriminator || v._discriminatorType == definitionDiscriminator
                        }

                        return true;
                    })
                    .map(function(object) {
                        if (object.title || object.name) {
                            object.title = object.title || object.name;
                            return object;
                        }

                        return object;
                    })
                    .compact()
                    .uniqBy(function(v) {
                        return v._id || v;
                    })
                    .value()

                if (!array.length) {
                    return;
                }
                //////////////////////////////

                var childLimit = Math.min(10, array.length);
                return array.slice(0, childLimit)
            }

            ///////////////////////////////

            return val;
        },
    }
}
</script>
<style scoped lang="scss">

.wrap {
    white-space: normal !important;
}
</style>