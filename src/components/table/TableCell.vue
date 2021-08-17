<template>
    <td :style="style" @click="cellclick" :class="{wrap:shouldWrap, 'text-xs-center':column.align == 'center', 'text-xs-right':column.align =='right', 'no-padding':column.padding === false}">



        <!-- <pre>{{formattedArray}}</pre> -->
        <!-- <pre>{{rawValue}} {{column.key}}</pre> -->
        <div :class="{'wrap-limit':shouldWrap}">

            <component v-if="renderer" :data="preValue" :is="renderer" :row="row" :column="column" />
            <template v-else-if="simpleArray">
                <!-- Simple Array -->
                <template v-for="(entry, i) in formattedArray">
                    <component v-if="renderer" :data="entry" :is="renderer" :row="row" :column="column" />
                    <value-render v-else :value="entry" />{{i == formattedArray.length-1 ? '' : ', '}}
                </template>
            </template>
            <div v-else-if="formattedArray" class="formatted-array">
                <template v-for="entry in formattedArray">
                    <a class="inline-tag" v-if="entry._id" @click.stop.prevent="clicked(entry)" :style="{color:entry.color, backgroundColor:entry.bgColor}">
                        <template v-if="entry._type == 'event'">
                            <fluro-icon type="event" /> {{entry.title}} <span class="text-muted">// {{entry | readableEventDate}}</span>
                        </template>
                        <template v-else-if="entry._type == 'unavailability'">
                            <fluro-icon type="event" /> {{entry.title}} <span class="">- {{entry | readableEventDate}}</span>
                        </template>
                        <template v-else-if="entry._type == 'post'">
                            <fluro-icon type="post" /> {{entry.title}} <span class="text-muted">// {{entry.managedAuthor ? entry.managedAuthor.title : ''}} {{entry.created | timeago}}</span>
                        </template>
                        <template v-else-if="entry._type == 'ticket'">
                            <fluro-icon type="ticket" /> {{entry.title}} - {{entry.event.title}}<span class="text-muted">// {{entry.event | readableEventDate}}</span>
                        </template>
                        <template v-else-if="entry._type == 'team' && entry.position" :content="entry.title" v-tippy>
                            <!-- <fluro-icon type="team" />  -->
                            {{entry.position}}
                            <!-- <fluro-icon type="team" /> {{entry.title}} <span class="text-muted" v-if="entry.position">{{entry.position}}</span> -->
                        </template>
                        <template v-else>
                            <fluro-icon v-if="entry._type" :type="entry._type" /> {{entry.title}} <template v-if="entry.appendage"> - {{entry.appendage}}</template>
                        </template>
                    </a>
                    <a class="inline-tag" v-else-if="entry._type == 'log'" @click.stop.prevent="$fluro.global.json(entry)">
                        <fluro-icon icon="clock" /> {{entry.title}} <span class="text-muted">// {{entry.created | timeago}}</span>
                    </a>
                    <component v-else-if="renderer" :data="entry" :is="renderer" :row="row" :column="column" />
                    <value-render v-else :value="entry" />
                </template>
            </div>
            <div v-else-if="complexObject">
                <template v-if="preValue._type == 'event'">
                    <a class="inline-tag" @click.stop.prevent="clicked(preValue)">
                        <fluro-icon type="event" /> {{preValue.title}} <span class="text-muted">// {{preValue | readableEventDate}}</span>
                    </a>
                </template>
                <template v-else-if="preValue._type == 'team' && preValue.position">
                    {{preValue.position}}
                </template>
                <template v-else>
                    <!--  TESTING WEIRD -->
                    <a @click.stop.prevent="clicked(preValue)" class="inline-tag" :style="{color:preValue.color, backgroundColor:preValue.bgColor}">
                        <fluro-icon v-if="preValue._type" :type="preValue._type" /> {{complexTitle}} <template v-if="complexAppendage"> - {{complexAppendage}}</template>
                    </a>
                </template>
            </div>
            <component v-else-if="renderer" :data="rawValue" :is="renderer" :row="row" :column="column" />
            <slot v-else :value="value" :row="row" :column="column">
                <!-- {{value}} -->

                <value-render :value="value" />
            </slot>
        </div>
    </td>
</template>
<script>
import _ from 'lodash';
import Vue from 'vue';

import CurrencyCell from './cells/CurrencyCell.vue';
import NumberCell from './cells/NumberCell.vue';
import BooleanCell from './cells/BooleanCell.vue';
import ButtonCell from './cells/ButtonCell.vue';
import DateCell from './cells/DateCell.vue';
import RealmDotCell from './cells/RealmDotCell.vue';
import TimeagoCell from './cells/TimeagoCell.vue';
import AvatarCell from './cells/AvatarCell.vue';
import ChartCell from './cells/ChartCell.vue';
import PhoneNumberCell from './cells/PhoneNumberCell.vue';
import EmailAddressCell from './cells/EmailAddressCell.vue';
import FilesizeCell from './cells/FilesizeCell.vue';
import ThumbnailCell from './cells/ThumbnailCell.vue';


var ValueRender = Vue.extend({
    props: {
        value: {}
    },
    computed: {
        className() {
            if (!this.value) {
                return;
            }

            if (_.isArray(this.value)) {
                return;
            }
            return this.value.title || this.value.name ? 'inline-tag' : null;
        },
        computedValue() {
            var self = this

            if (this.value == undefined || this.value == null || this.value == '') {
                return
            }

            if (_.isArray(this.value)) {
                return _.reduce(this.value, function(set, value) {
                    if (value == undefined || value == null || value == '') {
                        return set;
                    }

                    set.push(value.title || value.name || value);

                    return set;
                }, []).join(', ');
            }
            

            var string = String(this.value.title || this.value.name || this.value).trim();

            // if(string[0] == '<') {
            //     string = string.replace(/<[^>]+>/g, '')
            // }
            return string;
        },
    },
    template: `<span :class="className" v-html="computedValue"></span>`,
})


/////////////////////////////////

export default {
    props: {
        'column': {
            type: Object,
        },
        'row': {
            type: [Object, Array],
        },
    },
    components: {
        ValueRender,
    },
    methods: {
        cellclick() {
            if (!this.column.click) {
                return;
            }

            this.column.click(this.row);
        },
        clicked(item) {
            if (!item._id) {
                return;
            }
            // console.log('Sub item click', item);
            this.$actions.open([item]);
            // this.$fluro.global.view(item);
        }
    },
    computed: {
        // cellStyle() {

        //     var self = this;

        //     return {
        //         'maxWidth':'300px',
        //         'white-space':self.formattedArray.length > 5 ? 'normal' : 'nowrap',
        //     }
        // },
        style() {
            return this.column.style;
        },
        characterCount() {
            return String(this.rawValue).length;
        },
        shouldWrap() {
            if ((this.formattedArray || []).length > 4) {
                return true;
            }

            return this.column.wrap || _.isString(this.rawValue) && this.characterCount > 100;
        },
        complexTitle() {
            return this.preValue.title
        },
        complexAppendage() {
            return this.subField ? _.get(this.preValue, this.subField) : null;
        },
        renderer() {

            var self = this;
            // if (this.subField) {
            //     return;
            // }
            //  && this.subFieldLength == 2 ) {
            //     // console.log('KEY RENDER', this.column.key);
            //     return;
            // }

            var renderer = self.column.renderer
            switch (self.column.renderer) {
                case 'chart':
                    return ChartCell;
                    break;
                    break;
                case 'contactAvatar':
                    return AvatarCell;
                    break;
                case 'filesize':
                    return FilesizeCell;
                    break;
                 case 'thumbnail':
                    return ThumbnailCell;
                    break;
                case 'email':
                case 'emails':
                    return EmailAddressCell;
                    break;
                case 'phoneNumber':
                case 'phoneNumbers':
                    return PhoneNumberCell;
                    break;
                case 'personaAvatar':
                    return AvatarCell;
                    break;
                case 'boolean':
                    return BooleanCell;
                    break;
                case 'button':
                    return ButtonCell;
                    break;
                case 'date':
                case 'datetime':
                    self.column.type = 'date';
                    return DateCell;
                    break;
                case 'time':
                    self.column.type = 'date';
                    self.column.format = 'h:mma';
                    return DateCell;
                    break;
                case 'weekday':
                    self.column.type = 'date';
                    self.column.format = 'dddd';
                    return DateCell;
                    break;
                case 'timeago':
                    self.column.type = 'date';
                    return TimeagoCell;
                    break;
                case 'capitalize':
                    renderer = null
                    break
                case 'realmDots':
                    renderer = RealmDotCell;
                    break
                case 'currency':
                    renderer = CurrencyCell;
                    break;
                case 'number':
                case 'integer':
                case 'decimal':
                case 'float':
                    renderer = NumberCell;
                    break;


            }

            if (renderer && typeof renderer != 'string') {
                return renderer;
            }

            switch (self.column.type) {
                case 'button':
                    return ButtonCell;
                    break;
                case 'date':
                    return DateCell;
                    break;
                case 'number':
                case 'integer':
                case 'decimal':
                case 'float':

                    if (!self.subField) {
                        return NumberCell;
                    }
                    break;
                case 'boolean':
                    return BooleanCell;
                    break;
                default:
                    return;
                    break;
            }
        },
        preArray() {
            return _.isArray(this.preValue) && this.preValue.length;
        },
        // simpleArray() {
        //     var self = this;
        //     return self.formattedArray && !_.some(self.formattedArray, function(entry) {
        //         return !_.isObject(entry);
        //     })
        // },
        formattedArray() {
            var self = this;
            if (!self.preArray) {
                return;
            }

            var subFieldPath = self.subField;

            if (subFieldPath) {
                if (subFieldPath[0] == '.') {
                    subFieldPath = subFieldPath.slice(1);
                }


                ///////////////////////////////////////////////

                function cleanEntry(entry) {
                    if (!entry) {
                        return;
                    }

                    //If it's not an object but a simple number or string
                    if (!_.isObject(entry)) {
                        return entry;
                    }

                    //Check if we have a title or name
                    var title = (entry.title || entry.name);
                    var appendage = entry.appendage || self.subField ? _.get(entry, subFieldPath) : null;

                    //If it's a reference
                    if (entry._id) {

                        //Check if it's a real complicated badboy
                        if (subFieldPath.indexOf('.')) {
                            if (!title && !appendage) {
                                return;
                            }

                            //Its a deep nested simple value
                            if (!title && appendage && subFieldPath.indexOf('.')) {
                                return appendage;
                            }
                        }

                        return {
                            title,
                            appendage,
                            _type: entry._type,
                            _id: entry._id,
                            color: entry.color,
                            bgColor: entry.bgColor,
                            startDate: entry.startDate,
                            endDate: entry.endDate,
                            created: entry.created,
                        }
                    }

                    return entry;
                }

                ///////////////////////////////////////////////

                return _.reduce(self.preValue, function(set, input) {

                    //If its an array
                    if (_.isArray(input)) {
                        //loop through each item
                        _.each(input, function(e) {
                            var output = cleanEntry(e)
                            if (output && output != 0) {

                                set.push(output);
                            }
                        })
                    } else {
                        //Add the single item
                        var output = cleanEntry(input)
                        if (output && output != 0) {
                            set.push(output);
                        }
                    }

                    ////////////////////////////

                    return set;
                }, [])






                return _.chain(self.preValue)
                    .map(function(entry) {


                        if (!entry) {
                            return;
                        }

                        //If it's not an object but a simple number or string
                        if (!_.isObject(entry)) {
                            return entry;
                        }

                        //Check if we have a title or name
                        var title = (entry.title || entry.name);
                        var appendage = entry.appendage || self.subField ? _.get(entry, subFieldPath) : null;

                        //If it's a reference
                        if (entry._id) {

                            //Check if it's a real complicated badboy
                            if (subFieldPath.indexOf('.')) {
                                if (!title && !appendage) {
                                    return;
                                }

                                //Its a deep nested simple value
                                if (!title && appendage && subFieldPath.indexOf('.')) {
                                    return appendage;
                                }
                            }

                            return {
                                title,
                                appendage,
                                _type: entry._type,
                                _id: entry._id,
                                color: entry.color,
                                bgColor: entry.bgColor,
                                startDate: entry.startDate,
                                endDate: entry.endDate,
                                created: entry.created,
                            }
                        }


                        return entry;
                    })
                    .filter(function(entry) {
                        return entry == 0 || entry;
                    })
                    .flatten()

                    .value();
            }

            return self.preValue;
        },
        simpleArray() {
            return _.some(this.formattedArray, function(e) {
                var match = !(e._id || e.title || e.name || e.id)
                // if(match) {
                //  console.log('Thing is missing', e);
                // }
                return match;
            })
            //_.isArray(this.preValue) && this.preValue[0] && (!this.preValue[0].title && !this.preValue[0].name);
        },
        // complexArray() {
        //     var self = this;

        //     return _.isArray(this.preValue) && _.some(this.preValue, function(e) {
        //         return (e._id || e.title || e.name)
        //     })

        //     // return _.isArray(this.preValue) && _.chain(this.preValue)
        //     //     .map(function(e) {
        //     //         if (self.subField) {
        //     //             e.rendered = _.get(e, self.subField);
        //     //         }

        //     //         return e;
        //     //     })
        //     //     .some(function(e) {
        //     //         return (e._id || e.title || e.name)
        //     //     })
        //     //     .value();
        //     //_.isArray(this.preValue) && this.preValue[0] && (this.preValue[0].title || this.preValue[0].name);
        // },
        complexObject() {
            // return !this.complexArray && _.isObject(this.preValue);
            return _.isObject(this.preValue);
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
            var output = val.title || val.name || val;

            if (self.column.filter) {
                return self.column.filter(output);
            }
            return output;
        },
        key() {

            //Get the basic key
            var mainKey = (String(this.column.key) || '').split('|')[0];

            //Split it out 
            return (mainKey); //.split('[]')[0];
        },
        subField() {
            var key = String(this.column.key) || '';
            var pieces = key.split('[]');

            if (pieces.length > 1) {
                pieces.shift()
                return pieces.join(''); //.split('|')[0];
            }
        },
        // subFieldLength() {
        //     var key = this.column.key || '';
        //     var pieces = key.split('[]');
        //     return pieces.length
        // },

        rawValue() {
            var self = this;

            var path = self.key;

            var pieces = path.split('[]');
            var steps = pieces.length;

            //Starter array
            if (pieces.length < 2) {
                return _.get(self.row, self.key);
            } else if (pieces.length == 2) {

                // var pathPiece = pieces[0];
                // if(_.startsWith(pathPiece,'.')) {
                //     pathPiece = pathPiece.slice(1);
                // }
                // var shallowArray = _.get(this.row, pieces[0]);
                var match = _.get(self.row, pieces[0]);

                var subFieldPath = self.subField;
                if (subFieldPath) {

                    if (subFieldPath[0] == '.') {
                        subFieldPath = subFieldPath.slice(1);
                    }

                    if (_.isArray(match)) {
                        match = _.map(match, subFieldPath);

                    } else {
                        match = _.get(match, subFieldPath);
                    }

                }


                return match;

                // if(shallowArray)
                // return shallowArray;
            } else {


                //We have multiple nested arrays in arrays
                //data.one[].two[].three
                var collated = [];

                //one[].two[].three
                var start = pieces.shift();

                ////////////////////////////////////

                //Loop through and retrieve the values
                //pieces would be ['.two', '.three]
                getChildValue(_.get(this.row, start), pieces);

                function getChildValue(array, depthTrail) {
                    //Loop through each item in this array
                    _.each(array, function(entry) {
                        //Take a copy of this trail
                        var pieces = depthTrail.slice();

                        var currentTrail = pieces.shift();
                        if (currentTrail && currentTrail[0] == '.') {
                            currentTrail = currentTrail.slice(1);
                        }

                        var childArray = _.get(entry, currentTrail);
                        if (!childArray) {
                            return;
                        }

                        // console.log('Go deeper', pieces, childArray)
                        if (pieces.length) {
                            getChildValue(childArray, pieces);
                        } else {
                            // console.log('REACHED END', path, childArray);
                            collated.push(childArray);
                        }
                    })
                }

                //////////////////////////

                return _.chain(collated)
                    .reduce(function(set, value) {
                        var val = value;
                        if (value._id) {
                            val = value._id
                        }

                        if (value.id) {
                            val = value.id
                        }

                        if (value.title) {
                            val = value.title
                        }

                        if (value.name) {
                            val = value.name;
                        }
                        set[val] = val;
                        return set;
                    }, {})
                    .values()
                    .compact()
                    .value();


                // return _.chain(collated)
                //     .compact()
                //     .uniqBy(function(value) {
                //         if (value._id) {
                //             return value._id
                //         }

                //         if (value.id) {
                //             return value.id
                //         }

                //         if (value.title) {
                //             return value.title
                //         }

                //         if (value.name) {
                //             return value.name;
                //         }

                //         return value;
                //     })
                //     .value();


            }
        },
        preValue() {
            // console.log('THIS', this.key, this.rawValue)
            var self = this;
            var val = this.rawValue;

            // console.log('RAW VAL', val);
            ///////////////////////////////

            var definitionDiscriminator = (String(this.column.key) || '').split('|')[1];

            ///////////////////////////////

            //If there is an array
            if (_.isArray(val)) {

                ///////////////////////////////

                var array = _.chain(val)
                    // .compact()
                    .filter(function(v) {
                        if (v == undefined || v == '' || v == null) {
                            return;
                        }

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
                    .filter(function(v) {
                        return (v == 0) || v;
                    })
                    .uniqBy(function(v) {
                        return (v._id || v.id || v);
                    })
                    .orderBy(function(entry) {
                        if (entry.startDate) {
                            return new Date(entry.startDate);
                        }

                        if (entry.created) {
                            return new Date(entry.created);
                        }

                        return entry.title || entry.name || ''
                    })
                    .reverse()

                    .value()

                if (!array.length) {
                    return;
                }
                //////////////////////////////


                var childLimit = Math.min(100, array.length);
                return array.slice(0, childLimit)
            }

            ///////////////////////////////

            return val;
        },
    },
    filters: {
        simple(input) {
            if (_.isArray(input)) {
                return input.join(', ');
            }

            return input;
        }
    }
}

</script>
<style scoped lang="scss">
.wrap-limit {
    // white-space: normal !important;
    max-width: 500px;
    overflow: hidden;
    white-space: pre-line;
    text-overflow: ellipsis;

    .formatted-array {
        min-width: 300px;
    }
}


.no-padding {
    padding: 0 !important;
}

td.align-bottom {
    vertical-align: bottom !important;
}

</style>
