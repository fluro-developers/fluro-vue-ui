<template>
    <div v-if="workingModel">
        <fluro-panel>
            <tabset :justified="true" :vertical="false">
                <tab :heading="getTitle(def)" :muted="muted(workingModel[def.definitionName])" :icon="iconObject(workingModel[def.definitionName])" v-for="(def, ind) in rosterOptions">
                    <fluro-panel-body>
                        <default-roster-component @input="updateModel" :config="config" :data="def" v-model="workingModel[def.definitionName]" />
                    </fluro-panel-body>
                </tab>
            </tabset>
        </fluro-panel>
    </div>
</template>
<script>
import DefaultRosterComponent from './DefaultRosterComponent.vue';


export default {
    props: {
        value: {
            type: Array,
        },
        config: {
            type: Object,
            required: true,
        },
        rosterOptions: {
            type: Array,
            required: true,
        },
    },
    created() {
        // var self = this;
        // var mapped = _.map(self.model, function(m) {
        //     return m.definition;
        // });
        // if (!self.value) {
        //     self.model = [];
        // } else {
        //     self.model = self.value;
        // }
        // _.each(self.rosterOptions, function(val) {
        //     if (mapped.includes(val.definitionName)) {
        //         self.$set(self.workingModel, val.definitionName, _.filter(self.model, function(m) {
        //             return m.definition == val.definitionName;
        //         })[0]);
        //     } else {
        //         self.$set(self.workingModel, val.definitionName, {
        //             definition: val.definitionName,
        //         });
        //     }
        // });
    },
    components: { DefaultRosterComponent },
    data() {
        return {
            model: this.value,
            workingModel: {},
        }
    },
    methods: {
        getTitle(def) {
            return _.get(def, 'title');
        },
        updateModel(val) {
            var self = this;
            //console.log('HELLO');
            var find = _.find(self.model, function(o) {
                return val.definition == o.definition;
            });
            //console.log('FIND',find, self.model[find])
            if (!find && val.create) {
                self.model.push(val);
            } else if (val.create) {
                self.model[find] = val;
            } else {
                self.model.splice(find, 1);
            }
        },
        iconObject(model) {
            var self = this;
            if (model.create) {
                return {
                    icon: 'check-circle',
                    library: 'fas',
                    color: '#4cc650',
                }
            } else return;
        },
        muted(model) {

            return !model.create

        },
    },
    watch: {},
}
</script>
<style lang="scss">
</style>