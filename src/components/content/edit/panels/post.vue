<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab :heading="`${definition.title} Information`" v-if="definition && definition.fields && definition.fields.length">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from '../FluroContentEditMixin';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {


    mixins: [FluroContentEditMixin],
    components: {},
    methods: {
        modelUpdated() {
            this.update(this.model);
        },
    },
    created() {
        var self = this;
    },
    asyncComputed: {

    },
    computed: {
        showOutline() {
            return false; //true; //false;//true;//false;//true;
        },
        // fieldsOutput() {

        //     var self = this;
        //     var array = [];

        //     ///////////////////////////////////

        //     addField('event', {
        //         title: 'Event',
        //         minimum: 1,
        //         maximum: 1,
        //         type: 'reference',
        //         params: {
        //             restrictType: 'event',
        //         },
        //     })

        //     addField('contact', {
        //         title: 'Contact',
        //         minimum: 1,
        //         maximum: 1,
        //         type: 'reference',
        //         description: 'The person who checked was checked in',
        //         params: {
        //             restrictType: 'contact',
        //         },
        //     })

        //     addField('checkedInBy', {
        //         title: 'Checked In By',
        //         minimum: 1,
        //         maximum: 1,
        //         type: 'reference',
        //         description: 'The person who checked this contact in',
        //         params: {
        //             restrictType: 'contact',
        //         },
        //     })

        //     addField('pinNumber', {
        //         title: 'Pin Number',
        //         minimum: 0,
        //         maximum: 1,
        //         type: 'password',
        //         description: 'The Pin Number used when checking in (If any)',
        //     })

        //     // addField('firstLine', {
        //     //     title: 'Description',
        //     //     minimum: 0,
        //     //     maximum: 1,
        //     //     type: 'string',
        //     //     placeholder: 'Eg. A list of my favorite people',
        //     // })


        //     // // console.log('TYPE OPTIONS', self.typeOptions);



        //     // addField('filterType', {
        //     //     title: 'Type',
        //     //     minimum: 0,
        //     //     maximum: 1,
        //     //     type: 'string',
        //     //     directive: 'select',
        //     //     description: 'The type of item you want to return from this query',
        //     //     options: self.typeOptions,
        //     // })

        //     ///////////////////////////////////

        //     function addField(key, details) {
        //         details.key = key;
        //         array.push(details)
        //     }

        //     return array;

        // },
    },
    data() {
        return {

        }
    },
}
</script>
<style scoped lang="scss">
.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;
}
</style>