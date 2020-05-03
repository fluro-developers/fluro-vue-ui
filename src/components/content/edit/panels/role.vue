<template>
    <flex-column>
        <!-- <pre>Loading? {{loading}} - {{loadingPermissions}}</pre> -->
        <template v-if="loadingAnything">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <!-- :vertical="true" -->
            <tabset :justified="true">
                <!--  <template v-slot:menuprefix>
                    <template v-if="context == 'edit' && $vuetify.breakpoint.mdAndUp">
                        <flex-column-header style="text-align:center">
                            <div style="padding: 10px; max-width:200px; margin: auto;">
                                <fluro-image  :height="200" :image-height="450" contain :item="model" :cacheKey="imageCacheKey" :spinner="true"></fluro-image>
                            </div>
                            <div>
                                {{model.width}}x{{model.height}}
                            </div>
                        </flex-column-header>
                    </template>
                </template> -->
                <tab heading="Basic Permissions">
                    <tabset :justified="true" :vertical="true" :persist="true">
                        <template v-slot:menuprefix>
                            <div class="search-box">
                                <search-input placeholder="Search permissions" v-model="search" />
                            </div>
                        </template>
                        <tab :heading="`${type.title} ${of(type)}`" :muted="!enabled(type).length" :key="type.title" v-for="type in filteredBasic">
                            <v-container>
                                <h4 margin>{{type.title}}</h4>
                                <list-group>
                                    <fluro-toggle-item @click.native="togglePermission(permission)" :key="permission.title" v-for="permission in type.permissions" :inactive="!permissionSelected(permission)">
                                        <strong>{{permission.title}}</strong>
                                        <div class="sm muted">{{permission.description}}</div>
                                    </fluro-toggle-item>
                                </list-group>
                            </v-container>
                        </tab>
                    </tabset>
                </tab>
                <tab heading="Defined Permissions">
                    <tabset :justified="true" :vertical="true" :persist="true">
                        <template v-slot:menuprefix>
                            <div class="search-box">
                                <search-input placeholder="Search permissions" v-model="search" />
                            </div>
                        </template>
                        <tab :heading="`${type.title} ${of(type)}`" :muted="!enabled(type).length" v-for="type in filteredDefined">
                            <v-container>
                                <h4 margin>{{type.title}}</h4>
                                <list-group>
                                    <fluro-toggle-item @click.native="togglePermission(permission)" v-for="permission in type.permissions" :inactive="!permissionSelected(permission)">
                                        <strong>{{permission.title}}</strong>
                                        <div class="sm muted">{{permission.description}}</div>
                                    </fluro-toggle-item>
                                </list-group>
                            </v-container>
                        </tab>
                    </tabset>
                </tab>
                <tab :heading="informationPanelTitle">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstLine" v-model="model" />
                                <template v-if="definition && definition.fields && definition.fields.length">
                                    <h4 margin>{{definition.title}} Information</h4>
                                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                                </template>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <!-- <tab heading="Developer">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                        </v-container>
                    </flex-column-body>
                </tab> -->
            </tabset>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';
import SearchInput from 'src/components/ui/SearchInput.vue';
import FluroToggleItem from 'src/components/ui/FluroToggleItem.vue';



/////////////////////////////////

import Vue from 'vue';
import _ from 'lodash';


/////////////////////////////////

export default {
    components: {
        FluroToggleItem,
        SearchInput,
        // FluroEditor,
    },
    created() {},
    data() {
        return {
            search: '',
            loadingPermissions: true,
        }
    },
    mixins: [FluroContentEditMixin],
    methods: { 

        of (type) {

            var total = type.permissions.length
            var activated = this.enabled(type);

            return activated.length ? `${activated.length} / ${total}` : '';
        },
        enabled(type) {
            var self = this;
            var values = _.map(type.permissions, 'value');
            return _.intersection(self.model.permissions, values);
        },
        togglePermission(permission) {
            var self = this;
            if (!self.model.permissions) {
                self.$set(self.model, 'permissions', []);
            }

            if (self.permissionSelected(permission)) {

                var index = self.model.permissions.indexOf(permission.value);
                if (index != -1) {
                    self.model.permissions.splice(index, 1);
                }
            } else {
                self.model.permissions.push(permission.value);
            }
        },
        permissionSelected(permission) {
            var self = this;
            return _.includes(self.model.permissions, permission.value);
        },
    },
    asyncComputed: {
        tree: {
            default: [],
            get() {

                var self = this;
                self.loadingPermissions = true;

                return new Promise(function(resolve, reject) {
                    return self.$fluro.access.retrievePermissions()
                        .then(function(permissionSets) {


                            //////////////////////////////////////

                            //Map search strings for each permission set
                            _.each(permissionSets, function(entry) {
                                // ${entry.definitionName} ${entry.parentType || ''}
                                entry.searchString =`${entry.title} ${entry.plural}`.toLowerCase();
                                entry.permissionsString = _.map(entry.permissions, function(permission) {
                                    permission.searchString = `${permission.title}`.toLowerCase();
                                    return permission.searchString;
                                }).join(' ');
                            })

                            //////////////////////////////////////

                            resolve(permissionSets);
                            console.log('GOT EM!', permissionSets);
                            self.loadingPermissions = false
                        })
                        .catch(function(err) {
                            reject(err);
                            self.loadingPermissions = false;
                        });
                })
            },
        }
    },
    computed: {
        informationPanelTitle() {
            return this.definition ? `${this.definition.title} Information` : 'Role Information';
        },
        filtered() {

            var self = this;

            if(!self.search || !self.search.length) {
                console.log('No search words')
                return self.tree;
            }

            ///////////////////////////////////////////////

            var keywords = self.search.toLowerCase();
            console.log('Filter by', keywords);

            return _.chain(self.tree)
            .map(function(entry) {

                if(entry.searchString.includes(keywords)) {
                    return entry;
                }

                if(entry.permissionsString.includes(keywords)) {

                    var copy = JSON.parse(JSON.stringify(entry))
                    copy.permissions = _.filter(copy.permissions, function(permissionSet) {
                        return permissionSet.searchString.includes(keywords);
                    })

                    if(copy.permissions.length) {
                        return copy;
                    }
                }
            })
            .compact()
            .value();
        },
        filteredBasic() {
            return _.filter(this.filtered, function(type) {
                return !type.parentType;
            })
        },
        filteredDefined() {
            return _.filter(this.filtered, function(type) {
                return type.parentType;
            })
        },
        loadingAnything() {
            return this.loading || this.loadingPermissions;
        },
        fieldsOutput() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Title',
                minimum: 1,
                maximum: 1,
                type: 'string',
            });

            ///////////////////////////////////

            addField('firstLine', {
                title: 'Description',
                description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
                minimum: 0,
                maximum: 1,
                type: 'string',
            });

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;


        },
    },
}
</script>
<style lang="scss" scoped>
.search-box {
    padding: 10px;

}
</style>