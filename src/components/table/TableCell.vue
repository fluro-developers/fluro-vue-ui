<template>
    <td :class="{wrap:column.wrap, 'text-xs-center':column.align == 'center', 'text-xs-right':column.align =='right'}">
        <!-- <pre>{{key}} {{simpleArray}} {{subField}}</pre> -->
        <!-- <pre>{{subField}}</pre> -->
        <!-- <pre>{{rawValue}}</pre> -->
        <!-- <pre>{{key}}</pre> -->
        <component v-if="column.renderer" :data="rawValue" :is="column.renderer" :row="row" :column="column" />
        <div v-else-if="simpleArray">
            <!-- {{value}} -->
            <span class="inline-tag" v-for="string in rawValue">
                {{string}}
            </span>
        </div>
        <div v-else-if="complexObject">
            <template v-if="preValue._type == 'event'">
                <a class="inline-tag" @click.stop.prevent="clicked(preValue)">
                    <fluro-icon type="event" /> {{preValue.title}} <span class="text-muted">// {{preValue | readableEventDate}}</span>
                </a>
            </template>
            <template v-else>
                <a @click.stop.prevent="clicked(preValue)" class="inline-tag" :style="{color:preValue.color, backgroundColor:preValue.bgColor}">
                    <fluro-icon v-if="preValue._type" :type="preValue._type" /> {{preValue.title || preValue.name}} <template v-if="preValue[subField]"> - {{preValue[subField]}}</template>
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
            <!--   -->
            <div style="max-width: 600px; white-space: normal;">
                <template v-for="entry in preValue.slice(0, 8)">
                    <template v-if="entry._type == 'event'">
                        <a class="inline-tag" @click.stop.prevent="clicked(entry)">
                            <fluro-icon type="event" /> {{entry.title}} <span class="text-muted">// {{entry | readableEventDate}}</span>
                        </a>
                    </template>
                    <template v-else>
                        <a @click.stop.prevent="clicked(entry)" class="inline-tag" :style="{color:entry.color, backgroundColor:entry.bgColor}">
                            <fluro-icon v-if="entry._type && entry._type != 'realm'" :type="entry._type" /> {{entry.title}} <template v-if="entry[subField]"> - {{entry[subField]}}</template>
                        </a>
                    </template>
                </template>
                <template v-if="preValue.length>8">
                    <br/>
                <div class="inline-tag">+{{preValue.length - 8}} more...</div>
                 </template>
            </div>
        </div>
        <slot v-else :value="value" :row="row" :column="column">
            {{value}}
            <!-- <pre>HELLO</pre> -->
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
        simpleArray() {
            return this.preValue && _.isArray(this.preValue) && this.preValue[0] && (!this.preValue[0].title && !this.preValue[0].name);
        },
        complexArray() {
            return this.preValue && _.isArray(this.preValue) && this.preValue[0] && (this.preValue[0].title || this.preValue[0].name);
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

                if (self.subField) {
                    return _.map(val, function(entry) {
                        return entry[self.subField];
                    }).join(', ');
                } else {
                    return _.map(val, function(entry) {
                        return entry.title || entry.name || entry;
                    }).join(', ');
                }

            }

            if (self.column.sortType == 'date' || self.column.type == 'date') {

                if (self.column.format) {
                    return self.$fluro.date.formatDate(val, self.column.format);
                } else {
                    return self.$fluro.date.formatDate(val, 'D MMM YYYY')
                }
            }


            // console.log('COMPLEX', val)
            return val.title || val.name || val;
        },
        key() {

            return ((this.column.key || '').split('|')[0]).split('[]')[0];
        },
        subField() {
            var key = this.column.key;
            var pieces = key.split('[]');

            if (pieces.length > 1) {
                pieces.shift()
                return pieces.join(''); //.split('|')[0];
            }
        },
        rawValue() {

            var rawValue = _.get(this.row, this.key);
            // if(this.row.firstName == 'Cade' && this.key == 'family._children') {
            //     console.log('RAW VALUE', this.key, this.row);
            // }


            return rawValue;
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
                            object.title = (object.title || object.name);

                            // if(self.subField) {
                            //     object.title = `${object.title} (${_.get(object, self.subField)})`
                            // }
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