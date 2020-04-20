<template>
    <td :class="{wrap:shouldWrap, 'text-xs-center':column.align == 'center', 'text-xs-right':column.align =='right'}">
        <!-- {{rawValue.length}} {{shouldWrap}} -->

        
        <div :class="{'wrap-limit':shouldWrap}">
        <component v-if="renderer" :data="preValue" :is="renderer" :row="row" :column="column" />
        <template v-else-if="simpleArray">
            <template v-for="entry in formattedArray">
                <component v-if="renderer" :data="entry" :is="renderer" :row="row" :column="column" />
                <div v-else>
                    <span class="inline-tag">
                        {{entry | simple}}
                    </span>
                </div>
            </template>
        </template>
        <div v-else-if="formattedArray" style="max-width: 600px; white-space: normal;">
            <template v-for="entry in formattedArray">
                <a class="inline-tag" v-if="entry._id" @click.stop.prevent="clicked(entry)" :style="{color:entry.color, backgroundColor:entry.bgColor}">
                   
                    <template v-if="entry._type == 'event'">
                        <fluro-icon type="event" /> {{entry.title}} <span class="text-muted">// {{entry | readableEventDate}}</span>
                    </template>
                    <template v-if="entry._type == 'post'">
                        <fluro-icon type="post" /> {{entry.title}} <span class="text-muted">// {{entry.managedAuthor ? entry.managedAuthor.title : ''}} {{entry.created | timeago}}</span>
                    </template>
                    <template v-else-if="entry._type == 'ticket'">
                        <fluro-icon type="ticket" /> {{entry.title}} - {{entry.event.title}}<span class="text-muted">// {{entry.event | readableEventDate}}</span>
                    </template>
                    <template :content="entry.title" v-tippy v-else-if="entry._type == 'team' && entry.position">
                        
                        <!-- <fluro-icon type="team" />  -->
                        {{entry.position}}
                        <!-- <fluro-icon type="team" /> {{entry.title}} <span class="text-muted" v-if="entry.position">{{entry.position}}</span> -->
                    </template>
                    <template v-else>
                        
                        <fluro-icon v-if="entry._type" :type="entry._type" /> {{entry.title}} <template v-if="entry.appendage"> - {{entry.appendage}}</template>
                    </template>
                </a>
                <template v-else-if="renderer">
                    <component :data="entry" :is="renderer" :row="row" :column="column" />
                </template>
                <template v-else>{{entry}}</template>
            </template>
            <!-- <template>{{formattedArray.length}} in total</template> -->
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
            {{value}}
        </slot>
    </div>
    </td>
</template>
<script>

import NumberCell from 'src/components/table/cells/NumberCell.vue';
import BooleanCell from 'src/components/table/cells/BooleanCell.vue';
import DateCell from 'src/components/table/cells/DateCell.vue';
import RealmDotCell from 'src/components/table/cells/RealmDotCell.vue';
import TimeagoCell from 'src/components/table/cells/TimeagoCell.vue';



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
            if (!item._id) {
                return;
            }
            console.log('Sub item click', item);
            this.$actions.open([item]);
            // this.$fluro.global.view(item);
        }
    },
    computed: {
        characterCount() {
            return String(this.rawValue).length;
        },
        shouldWrap() {
            return this.column.wrap || _.isString(this.rawValue) && this.characterCount > 100;
        },
        complexTitle() {
            return this.preValue.title
        },
        complexAppendage() {
            return this.subField ? _.get(this.preValue, this.subField) : null;
        },
        renderer() {

            // if (this.subField) {
            //     return;
            // }
            //  && this.subFieldLength == 2 ) {
            //     // console.log('KEY RENDER', this.column.key);
            //     return;
            // }

            var renderer = this.column.renderer
            switch(this.column.renderer) {
                case 'date':
                case 'datetime':
                    this.column.type = 'date';
                    return DateCell;
                    break;
                case 'timeago':
                    this.column.type = 'date';
                    return TimeagoCell;
                    break;
                case 'capitalize':
                    renderer = null
                    break
                case 'realmDots':
                    renderer = RealmDotCell;
                    break

            }

            if (renderer) {
                return renderer;
            }
            
            switch (this.column.type) {
                case 'date':
                    return DateCell;
                    break;
                case 'number':
                case 'integer':
                case 'decimal':
                case 'float':

                    if(!this.subField) {
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
                        var appendage = self.subField ? _.get(entry, subFieldPath) : null;

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
                                created:entry.created,
                            }
                        }

                        ////////////////////////////////////////////



                        ////////////////////////////////////////////

                        return entry;
                    })
                    .compact()

                    .value();
            }

            return self.preValue;
        },
        simpleArray() {
            return _.some(this.formattedArray, function(e) {
                return !(e._id || e.title || e.name || e.id)
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
            return val.title || val.name || val;
        },
        key() {

            //Get the basic key
            var mainKey = (this.column.key || '').split('|')[0];

            //Split it out 
            return (mainKey); //.split('[]')[0];
        },
        subField() {
            var key = this.column.key || '';
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
                var match =  _.get(self.row, pieces[0]);

                 var subFieldPath = self.subField;
                if(subFieldPath) {

                    if (subFieldPath[0] == '.') {
                        subFieldPath = subFieldPath.slice(1);
                    }
                    
                    if(_.isArray(match)) {
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

            ///////////////////////////////

            var definitionDiscriminator = (this.column.key || '').split('|')[1];

            ///////////////////////////////

            //If there is an array
            if (_.isArray(val)) {

                ///////////////////////////////

                var array = _.chain(val)
                    // .compact()
                    .filter(function(v) {
                        if (!v) {
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
                    .compact()
                    .uniqBy(function(v) {
                        return v._id || v;
                    })
                    .orderBy(function(entry) {
                        if(entry.startDate) {
                            return new Date(entry.startDate);
                        }

                        if(entry.created) {
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
    filters:{
        simple(input) {
            if(_.isArray(input)) {
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
    max-width:500px;
    overflow: hidden;
    white-space: pre-line;
    text-overflow: ellipsis;
}
</style>