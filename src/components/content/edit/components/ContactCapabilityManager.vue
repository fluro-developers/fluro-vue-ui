<template>
    <div>
        <fluro-page-preloader v-if="loading" contain />
        <template v-else>
            <v-input class="no-flex" v-for="group in capabilityGroups">
                <v-label>{{group.title}}</v-label>
                <list-group>
                    <template v-for="capability in group.capabilities">
                        <list-group-item :item="capability">
                            <template v-slot:right>
                                <!-- <v-menu :left="true" v-model="actionIndexes[capability._id]" :fixed="true" transition="slide-y-transition" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="ma-0" icon small flat v-on="on">
                                            <fluro-icon v-if="actionIndexes[capability._id]" icon="times" />
                                            <fluro-icon v-else icon="ellipsis-h" />
                                        </v-btn>
                                    </template> -->
                                    <!-- <v-list dense>
                                        <v-list-tile @click="$actions.open([capability])">
                                            <v-list-tile-content>Actions</v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile @click="leave(capability)">
                                            <v-list-tile-content>Remove {{model.firstName}} from group</v-list-tile-content>
                                        </v-list-tile>
                                    </v-list> -->
                                <!-- </v-menu> -->
                                <!-- <v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([item])">
                                <fluro-icon icon="ellipsis-h" />
                            </v-btn> -->
                           

                            <v-btn class="ma-0" small icon @click.stop.prevent="remove(capability)">
                                <fluro-icon icon="times" />
                            </v-btn>

                             </template>
                        </list-group-item>
                    </template>
                </list-group>
                <v-btn small color="primary" @click="select(group.key)" class="ml-0">
                    Add {{group.title}}
                    <fluro-icon right icon="plus" />
                </v-btn>
                <!-- <pre>{{group.key}}</pre> -->
                <!-- <fluro-content-select-button color="primary" :type="group.key" v-model="" /> -->
            </v-input>
        </template>
    </div>
</template>
<script>
// import FluroContentSelectButton from '../../../form/contentselect/FluroContentSelectButton.vue';
import ListGroup from '../../../ui/ListGroup.vue';
import ListGroupItem from '../../../ui/ListGroupItem.vue';

import FluroContentSelectModal from '../../../form/contentselect/FluroContentSelectModal.vue';
import FluroSelector from '../../../form/contentselect/FluroSelector.vue';
import Vue from 'vue';

export default {
    props: {
        'value': {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            loading:true,
            actionIndexes: {},
            model: this.value,
        }
    },
    created() {
    },
    methods: {
        remove(item) {
            var index = this.model.indexOf(item);
            this.model.splice(index,1);
        },
        addItem(item) {

            var match = _.some(this.model, {_id:item._id});
            if(match) {
                return;
            }

            this.model.push(item);
        },
        select(type) {

            var self = this;

            //Ugly hack, but it's gotta be done unfortunately
            var SelectionManager = Vue.extend(FluroSelector);
            var instance = new SelectionManager({
                propsData: {
                    minimum: 0,
                    maximum: 0,
                }
            })

            // var isBasicType = self.$fluro.types.isBasicType(type);

            var promise = self.$fluro.modal({
                    component: FluroContentSelectModal,
                    options: {
                        allDefinitions: false, //isBasicType,
                        selector: instance, //Vue(FluroSelector),
                        type,
                        minimum: 0,
                        maximum: 0,
                    }
                })
                .then(function(items) {

                    if (!items || !items.length) {
                        return;
                    }


                    console.log('Items');

                    _.each(items, function(item) {
                        self.addItem(item);
                    })


                    // self.loading = true;

                    // //Get the ids from the capabilities
                    // var capabilityIDs = self.$fluro.utils.arrayIDs(items);

                    // //////////////////////////////////

                    // var promise = self.$batch.run({
                    //         operation: 'add to capability',
                    //         ids: [self.contactID],
                    //         capabilities: capabilityIDs,
                    //     })
                    //     .then(function(res) {

                    //         console.log('TEAMS ADDED', res);
                    //         // self.capabilities = self.capabilities.concat(items);
                    //         // self.loading = false;
                    //         self.reloadCapabilities();
                    //     })
                    //     .catch(function(err) {
                    //         console.log('TEAMS ERR', err);
                    //         self.reloadCapabilities();
                    //     });




                })
        },
    },
    components: {
        ListGroup,
        ListGroupItem,
        // FluroContentSelectButton,
        FluroContentSelectModal,
    },
    computed: {
        capabilityGroups() {

            var self = this;

            ////////////////////////////////////////////////////

            var allSets = _.reduce(self.capabilityDefinitions, function(set, definition) {
                set[definition.definitionName] = {
                    title: definition.plural,
                    capabilities: [],
                    key: definition.definitionName,
                }

                return set;
            }, {
                capability: {
                    title: 'Capabilities',
                    capabilities: [],
                    key: 'capability',
                }
            })

            ////////////////////////////////////////////////////

            return _.chain(self.model)
                .reduce(function(set, capability) {

                    var capabilityType = capability.definition || 'capability';
                    var existingGroup = set[capabilityType];
                    if (!existingGroup) {
                        existingGroup = set[capabilityType] = {
                            title: self.$fluro.types.readable(capabilityType, true),
                            capabilities: [],
                        }
                    }

                    existingGroup.capabilities.push(capability);

                    return set;
                }, allSets)
                .values()
                .value();
        },
    },
    asyncComputed: {
        capabilityDefinitions: {
            default: [],
            get() {
                var self = this;
                self.loading = true;

                return new Promise(function(resolve, reject) {

                    self.$fluro.types.subTypes('capability')
                    .then(function(res) {
                        resolve(res);
                        self.loading = false;
                    })
                    .catch(function(err) {
                        reject(err);
                        self.loading = false;
                    });
                })
                
            }
        },
    }
}
</script>
<style lang="scss">
</style>