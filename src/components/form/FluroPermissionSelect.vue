<template>
    <div class="permission-select">
        <!-- <pre>{{model}}</pre> -->
        <template v-if="model.length">
            <table class="table">
                <thead>
                    <tr>
                        <th class="column">Role</th>
                        <th class="column">Realms</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in model">
                        <td>
                            <!-- @click="$actions.open([role])" -->
                            <div v-for="role in entry.roles">
                                <fluro-icon type="role" left /> <strong>{{role.title}}</strong> <v-btn icon small v-if="canEditRoles" @click="editRole(role)"><fluro-icon icon="pencil"/></v-btn>
                            </div>
                        </td>
                        <td>
                            <!-- @click="$actions.open([realm])" -->
                            <div v-for="realm in entry.realms">
                                <fluro-icon icon="circle" library="fas" :style="{color:realm.bgColor}" /> {{realm.title}}
                            </div>
                            <!-- <fluro-realm-tags :realms="entry.realms" /> -->
                        </td>
                        <td class="text-xs-right">
                            <v-btn class="ma-0" small icon @click="remove(entry)">
                                <fluro-icon icon="times" />
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
        <fluro-card>
            <fluro-card-title class="border-bottom">
                <h5>Add permissions</h5>
                <!-- <v-label>Add permissions</v-label> -->
                <p class="help-block">
                    Select a combination of roles and realms then click add to grant permissions.
                </p>
            </fluro-card-title>
            <fluro-card-body>
                <v-container pa-0 class="grid-list-md">
                <!-- <v-input class="no-flex"> -->
                <v-layout row wrap>
                    <v-flex xs12 md4>
                        <v-input class="no-flex">
                            <v-label>Select a Role</v-label>
                            <p class="help-block">Select a role</p>
                            <fluro-content-select-button block type="role" :allDefinitions="true" :searchInheritable="true" v-model="proposed.roles" />
                        </v-input>
                    </v-flex>
                    <v-flex xs12 md5>
                        <v-input class="no-flex">
                            <v-label>Select a Realm</v-label>
                            <p class="help-block">Select where this role can be used</p>
                            <!-- :type="typeName" :definition="definitionName" -->
                            <fluro-realm-select block v-model="proposed.realms" />
                        </v-input>
                    </v-flex>
                    <v-flex xs12 md3>
                        <v-input class="no-flex">
                            <template v-if="$vuetify.breakpoint.mdAndUp">
                            <v-label>&nbsp;</v-label>
                            <p class="help-block">&nbsp;</p>
                            </template>
                            <v-btn class="ma-0" :disabled="!valid" block color="primary" @click="add">
                                Add
                                <fluro-icon right icon="plus" />
                            </v-btn>
                        </v-input>
                    </v-flex>
                </v-layout>
            </v-container>
                <!-- </v-input> -->
            </fluro-card-body>
        </fluro-card>
        <!-- <v-input class="no-flex" v-if="selected.length">
            <h5 margin>{{selected.length}} selected</h5>
            <list-group>
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                    <list-group-item :key="pass._id" v-for="pass in selected">
                        <template v-slot:left>
                            <fluro-realm-bar :realm="pass.realms" />
                        </template>
                        <template v-slot:default>
                            <strong>{{pass.title}}</strong>
                            <div class="muted sm">{{pass.description}}</div>
                        </template>
                        <template v-slot:right>
                            <v-btn class="ma-0" small icon @click="deselect(pass)">
                                <fluro-icon icon="times" />
                            </v-btn>
                        </template>
                    </list-group-item>
                </transition-group>
            </list-group>
        </v-input>
        <p></p>
        <v-input class="no-flex">
            <h5>Available passes</h5>
            <p class="help-block">Add passes to {{contextName}} by selecting from available passes below</p>
            <list-group>
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                <list-group-item :key="pass._id" class="inactive" v-for="pass in notSelected">
                    <template v-slot:left>
                        <fluro-realm-bar :realm="pass.realms" />
                    </template>
                    <template v-slot:default>
                        <strong>{{pass.title}}</strong>
                        <div class="muted sm">{{pass.description}}</div>
                    </template>
                    <template v-slot:right>
                        <v-btn class="ma-0" color="primary" small @click="select(pass)">
                            Add
                            <fluro-icon right icon="plus" />
                        </v-btn>
                    </template>
                </list-group-item>
                </transition-group>
            </list-group>
        </v-input> -->
    </div>
</template>
<script>
import Vue from 'vue';
import _ from 'lodash';

import FluroRealmSelect from 'src/components/form/realmselect/FluroRealmSelect.vue';
import FluroContentSelectButton from 'src/components/form/contentselect/FluroContentSelectButton.vue';

///////////////////////////////////////////////

export default {
    components: {
        FluroRealmSelect,
        FluroContentSelectButton,
    },
    mixins: [],
    props: {
        'value': {
            type: Array,
            default: function() {
                return [];
            },
        },
    },
    data() {
        return {
            model: JSON.parse(JSON.stringify(this.value)),
            loading: true,
            proposed: {
                roles: [],
                realms: [],
            },
        }
    },
    computed: {
    	canEditRoles() {
    		return this.$fluro.access.can('edit', 'role');
    	},
        valid() {
            if (!this.proposed.roles || !this.proposed.roles.length) {
                return;
            }

            if (!this.proposed.realms || !this.proposed.realms.length) {
                return;
            }

            return true;
        },
    },
    asyncComputed: {
        // policies: {
        //     default: [],
        //     get() {

        //         var self = this;

        //         return new Promise(function(resolve, reject) {
        //             self.$fluro.api.get('/content/policy')
        //                 .then(function(res) {
        //                     resolve(res.data);
        //                     self.loading = false;
        //                 })
        //                 .catch(function(err) {
        //                     reject(err);
        //                     self.loading = false;
        //                 })

        //         })
        //     }
        // }
    },

    watch: {
        'value': function(val) {
            //Set the value so update the selection
            this.model = val;
        },
        'model': function() {
            var self = this;
            //Emit the change
            this.$emit('input', self.model);

        }
    },
    methods: {
    	editRole(role) {
    		this.$fluro.global.edit(role, true)
    		.then(function(res) {
    			_.assign(res, role);
    		})
    	},
        add() {
            console.log('ADD')
            var copy = JSON.parse(JSON.stringify(this.proposed));
            this.model.push(copy);
            // this.model.splice(index, 1);

            this.proposed = {
                realms: [],
                roles: [],
            }


        },
        remove(entry) {
            var index = this.model.indexOf(entry);
            this.model.splice(index, 1);
        }
    }
}
</script>
<style scoped lang="scss">
.table {
    background: #fff;
    width: 100%;
    border-collapse: collapse;
    padding: 0;
    margin: 0;
    border: 1px solid rgba(#000, 0.1);
    box-shadow: 0 1px 1px rgba(#000, 0.1);
    margin-bottom: 25px;

    thead {
        text-transform: uppercase;
        letter-spacing: 0.03em;
        font-weight: 500;
        font-size: 12px;
    }

    th,
    td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid rgba(#000, 0.1);
        vertical-align: middle;

        &.column {
            width: 50%;
        }
    }

    th {
        background: rgba(#000, 0.05);
    }

    tbody {}
}
</style>