<template>
    <flex-column>
        <flex-column-body>
            <!-- TEST TEST TEST -->
            <v-container v-if="item">

                <pre>{{item}}</pre>
                <!-- <fluro-dynamic-table :changeKey="changeKey" :availableKeys="availableKeys" :startDate="startDate" :endDate="endDate" :grouping="activeGroupingFunction" :includeArchivedByDefault="includeArchivedByDefault" :allDefinitions="allDefinitions" :searchInheritable="searchInheritable" :clicked="rowClicked" :search="search" :data-type="type" :init-page="$route.query.page" :filter-config="filterConfig" :init-sort="initialSort" @raw="rowsChanged" @filtered="filteredChanged" @page="pageChanged" @sort="sortChanged" :columns="columns">
                    <template v-slot:optionsabove>
                        <v-container pa-2 class="border-bottom" v-for="option in groupingOptions">
                            <v-switch @click.native.stop.prevent="toggleGroupingFunction(option)" :value="option.key == activeGroupingFunctionKey" :label="option.title"></v-switch>
                        </v-container>
                    </template>
                    <template v-slot:emptytext>
                        <empty-text :type="type">
                            <p class="lead">
                                No {{type | definitionTitle(true)}} were found matching your criteria
                            </p>
                            <v-btn large color="primary" @click="$fluro.global.create(type)">
                                Create a new {{type | definitionTitle}}
                                <fluro-icon icon="arrow-right" right />
                            </v-btn>
                        </empty-text>
                    </template>
                </fluro-dynamic-table> -->
            </v-container>
        </flex-column-body>
    </flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

import FluroContentViewMixin from '../FluroContentViewMixin';
import FluroContentRender from '../../../FluroContentRender.vue';

/////////////////////////////////

export default {
    props: {
        config: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    components: {
        FluroContentRender,
    },
    mixins: [FluroContentViewMixin],
    methods: {},
    computed: {
        data() {
            return this.item.data || {}
        },
        fields() {

            // var array = [];

            // array.push({
            //     title: 'Linked Contacts',
            //     key: 'contacts',
            //     type: 'reference',
            //     minimum: 0,
            //     maximum: 0,
            // })

            return array;
        },
        definedFields() {
            return this.config.definition.fields;
        }
    },
    data() {
        return {}
    },
    created() {
        console.log('THIS RENDERER', this)
    }
}
</script>
<style scoped lang="scss">
</style>