<template>
    <div class="fluro-search-bar" :class="{active:isActive}">
        <v-container py-0 :class="{'pa-0': $vuetify.breakpoint.xsOnly}">
            <constrain>
                <v-layout row>
                    <v-flex class="search-wrapper">
                        <input @focus="isFocused = true" @blur="isFocused = false" :placeholder="placeholder" @input="keywordsChanged" v-model="model" />
                        <div class="icon-search icon" :class="{active:model.length}" @click="clear()">
                            <fluro-icon library="far" v-if="model.length" icon="times" />
                            <fluro-icon library="far" v-if="!model.length" icon="search" />
                        </div>
                    </v-flex>
                    <v-flex shrink>
                        <div class="icon-more icon" :class="{active:showOptions}" @click="showOptions = !showOptions">
                            <fluro-icon library="far" icon="ellipsis-v" />
                        </div>
                    </v-flex>
                </v-layout>
            </constrain>
        </v-container>
        <div class="options">
            <v-slide-y-reverse-transition>
                <v-container fluid pa-0 v-if="showOptions">
                    <v-container>
                        <slot name="options"></slot>
                    </v-container>
                </v-container>
            </v-slide-y-reverse-transition>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';

import Layout from '../../mixins/Layout';

export default {
    mixins: [Layout],
    data() {
        return {
            isFocused: false,
            model: this.value,
            showOptions: false,
            debounced:null,
        }
    },
    props: {
        'debounce': {
            type: Number,
            default: 500,
        },
        'placeholder': {
            type: String,
            default: 'Search',
        },
        'value': {
            type: String,
            default: ''
        },
    },
    created() {
        var self = this;

        self.debounced = _.debounce(function() {
            // self.model = self.words;
            console.log('DEBOUNCED', self.model)
            self.$emit('input', self.model);
        }, self.debounce);

    },
    computed: {
        isActive() {
            return (this.isFocused || this.model.length);
        },
    },
    methods: {
        keywordsChanged() {
            var self = this;
            if(!self.model || !self.model.length) {
                return self.clear();
            }
            //Call the debouncer
            self.debounced();
        },
        clear() {
            this.model = '';
            this.$emit('input', '');
        },
    },
    // methods: {
    //     change:_.debounce(function(keywords) {
    //         var self = this;

    //         console.log('Keywords changed', keywords);
    //         self.$emit('input', keywords)

    //         // _.debounce(function() {
    //         //     self.$emit('input', keywords)
    //         //     console.log('dEBOUNCED')
    //         // }, self.debounce)
    //     }, this.debounce),
    // }

}
</script>
<style scoped lang="scss">
.fluro-search-bar {
    border-top: 1px solid rgba(#000, 0.1);
    border-bottom: 1px solid rgba(#000, 0.1);

    .options {
        // border-top: 1px solid rgba(#000, 0.1);
        background: rgba(#000, 0.03);
    }

    .icon {
        height: 60px;
        width: 50px;
        line-height: 40px;
        font-size: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.5;

        &:hover {
            opacity: 0.8;
        }

        &.active {
            opacity: 1;
        }
    }

    .icon-more.active {
        background: rgba(#000, 0.03);
    }

    .search-wrapper {
        position: relative;
        display: flex;


        input {
            border: none;
            background: none;
            line-height: 60px;
            font-size: 22px;
            letter-spacing: -0.03em;
            flex: 1;
            padding-right: 50px;
            width:100%;

            &:focus {
                outline: none;
                box-shadow: none;
            }

            @media(max-width:768px) {
                padding-left: 15px;
            }
        }

        .icon-search {
            position: absolute;
            right: 0;
            top: 0;

        }


    }


    &.active {
        background: #fff;

        .icon-search {
            cursor: pointer;
        }

        input {
            &:before {
                border: 10px solid red;
                content: 'Searching for ';

            }
        }
    }

}
</style>