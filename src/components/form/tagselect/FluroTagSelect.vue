<template>
    <div class="tag-select">
        <v-menu :close-on-content-click="false" @click.native.stop offset-y>
            <template v-slot:activator="{ on }">
                <!-- @click.native="showModal" -->
                <v-btn v-on="on" :small="small" :block="block" class="pill mx-0">
                    {{model.length ? model.length : null}}
                    <fluro-icon :right="model.length > 0" type="tag" />
                    <slot></slot>
                </v-btn>
            </template>
            <v-card tile>
                <flex-column  style="max-width:320px; max-height:80vh;">
                    <flex-column-body>
                        <v-container>
                            <!-- <pre>{{tagGroups}}</pre> -->
                            <v-input class="no-flex" v-for="group in tagGroups">
                                <v-label>{{group.title}}</v-label>
                                <div class="inline-tags">
                                    <span class="inline-tag" @click="removeTag(tag)" v-for="tag in group.tags">
                                        {{tag.title}}
                                        <fluro-icon right class="off" icon="tag" />
                                        <fluro-icon right class="on" icon="times" />
                                    </span></div>
                                <fluro-content-select-button block :type="group.key" v-model="model" />
                            </v-input>
                            <!-- <fluro-content-select-button :allDefinitions="true" block type="tag" v-model="model" /> -->
                            <!-- <pre> {{model}}</pre> -->
                        </v-container>
                    </flex-column-body>
                </flex-column>
            </v-card>
        </v-menu>
        <!-- <pre>{{type}} {{definition}}</pre> -->
    </div>
</template>
<script>
import Vue from 'vue';
import _ from 'lodash';


///////////////////////////////////////////////

import TagSelectModal from './TagSelectModal.vue';
import FluroContentSelectButton from '../contentselect/FluroContentSelectButton.vue';

///////////////////////////////////////////////

export default {
    asyncComputed: {
        tagDefinitions: {
            default: [],
            get() {
                var self = this;
                return self.$fluro.types.subTypes('tag')
            }
        },
    },
    computed: {
        tagGroups() {

            var self = this;

            ////////////////////////////////////////////////////

            var allSets = _.reduce(self.tagDefinitions, function(set, definition) {
                set[definition.definitionName] = {
                    title: definition.title,
                    tags: [],
                    key: definition.definitionName,
                }

                return set;
            }, {
                tag: {
                    title: 'Tags',
                    tags: [],
                    key: 'tag',
                }
            })

            ////////////////////////////////////////////////////

            return _.chain(this.model)
                .reduce(function(set, tag) {

                    var tagType = tag.definition || 'tag';
                    var existingGroup = set[tagType];
                    if (!existingGroup) {
                        existingGroup = set[tagType] = {
                            title: self.$fluro.types.readable(tagType, true),
                            tags: [],
                        }
                    }

                    existingGroup.tags.push(tag);

                    return set;
                }, allSets)
                .values()
                .value();
        },
    },
    methods: {
        removeTag(tag) {
            var self = this;
            var index = self.model.indexOf(tag);
            self.model.splice(index, 1);

            console.log('Remove', index);
        },
    },
    components: {
        FluroContentSelectButton,
        // FluroRealmSelectItem,
        // FluroRealmDots,
    },
    props: {
        small: {
            type: Boolean,
        },
        block: {
            type: Boolean,
        },
        'value': {
            type: Array,
            default: function() {
                return [];
            },
        },
    },
    data() {
        return {
            loading: true,
            model: this.value,
        }
    },
    watch: {
        'model': function(val) {
            this.$emit('input', val);
        }
    },
}

</script>
<style scoped lang="scss">
.inline-tag {
    cursor: pointer;

    .on {
        display: none;
    }

    .off {
        display: inline-block;
    }

    &:hover {
        .off {
            display: none;
        }

        .on {
            display: inline-block;
        }
    }
}

</style>
