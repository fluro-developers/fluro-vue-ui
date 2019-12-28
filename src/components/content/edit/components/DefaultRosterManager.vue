<template>
    <div v-if="workingModel">
        <fluro-panel>
            <tabset :justified="true" :vertical="false">
                <tab :heading="getTitle(def)" v-for="(def, ind) in rosterOptions">
                    <fluro-panel-body>
                        <default-roster-component :config="config" :data="def" v-model="workingModel[def.definitionName]" />
                    </fluro-panel-body>
                </tab>
            </tabset>
            {{workingModel}}
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
        var self = this;
        var mapped = _.map(self.model, function(m) {
            return m.definitionName;
        });
        _.each(self.rosterOptions, function(val) {
            if (mapped.includes(val.definitionName)) {
                self.$set(self.workingModel, val.definitionName, _.filter(self.model, function(m) {
                    return m.definitionName == val.definitionName;
                })[0]);
            } else {
                self.$set(self.workingModel, val.definitionName, {
                    definition: val.definitionName,
                });
            }
        });
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
        }
    },
    watch: {},
}
</script>
<style lang="scss">
</style>