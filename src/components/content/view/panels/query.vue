<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <tabset :justified="true" :vertical="true">
                <tab heading="Results">
                    <fluro-table :showFooter="true" trackingKey="_id" :pageSize="100" :items="results" :columns="columns" />
                   
                </tab>
                <tab :heading="`${definition.title} Details`" v-if="definedFields.length">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <h3 margin>{{definition.title}} Details</h3>
                                <fluro-content-render :fields="definedFields" v-model="item.data" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
            </tabset>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////


import FluroContentViewMixin from '../FluroContentViewMixin';
import FluroTable from '../../../table/FluroTable.vue';
import RealmDotCell from '../../../table/cells/RealmDotCell.vue';
import TitleCell from '../../../table/cells/TitleCell.vue';
import DefinitionCell from '../../../table/cells/DefinitionCell.vue';

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
        FluroTable,
        RealmDotCell,
        TitleCell,
        DefinitionCell,
    },
    mixins: [FluroContentViewMixin],
    methods: {},
    asyncComputed: {
        results: {
            default: [],
            get() {
                var self = this;
                self.loading = true
                return new Promise(function(resolve, reject) {
                    self.$fluro.content.query(self.item, {}).then(function(result) {
                        resolve(result)
                        self.loading = false
                    }).catch(reject)
                })
            }
        }

    },
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
            return this.config.definition ? this.config.definition.fields || [] : []
        },
        columns() {
            if (!this.item.columns.length) {
                return [
                    { title: '', shrink: true, align: "center", key: 'realms', renderer: RealmDotCell },
                    { title: 'Title', key: 'title', renderer: TitleCell, additionalFields: ['firstLine'] }, {
                        title: "Type",

                        renderer: DefinitionCell,
                        shrink: true,
                    },
                    {
                        title: "Created",
                        key: 'created',
                        type: 'date',
                        shrink: true,
                    },
                    {
                        title: "Updated",
                        key: 'updated',
                        type: 'date',
                        shrink: true,

                    }
                ]
            }
            return this.item.columns
        }
    },
    data() {
        return {
            loading: true
        }
    },
    created() {
        console.log('THIS RENDERER', this)
    }
}
</script>
<style scoped lang="scss">
</style>