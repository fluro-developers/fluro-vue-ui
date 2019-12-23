<template>
    <div>
        <div class="all-selection">
            <fluro-checkbox :isChecked="workingModel[0]" :label="allLabel" @click="toggle(0)" />
        </div>
        <div class="individual-selection" v-for="(option, index) in otherOptions">
            <fluro-checkbox :isChecked="workingModel[index + 1]" :label="otherOptions[index]" @click="toggle(index+1)" />
        </div>
    </div>
</template>
<script>
import _ from 'lodash';

import { Layout, FluroIcon } from 'fluro-vue-ui';
import FluroCheckbox from './FluroCheckbox.vue';

/////////////////////////////////

export default {
    props: {
        allLabel: {
            type: String,
            default: '',
        },
        otherOptions: {
            type: Array,
            default: [],
        },
        value: {
            type: Array,
            default: [''],
        }
    },
    components: {
        FluroCheckbox,
    },
    data() {
        return {
            model: this.value,
            workingModel: [true],
        }
    },
    created() {
        var self = this;
        self.maintainWorkingModel();
        // if (self.model != ['']) {
        // 	self.workingModel = [false];
        // 	_.each(self.model)
        // }
    },
    watch: {
        'otherOptions': function() {
            return this.maintainWorkingModel();
        }
    },
    methods: {
        maintainWorkingModel() {
            var self = this;
            var workingLength = self.workingModel.length;
            var optionsLength = self.otherOptions.length + 1;
            if (workingLength > optionsLength) {
                console.log('FluroExclusiveSelector: length-mismatch - workingLength greater than optionsLength', workingLength, optionsLength);
            }
            for (let i = 0; i < (optionsLength - workingLength); i++) {
                self.workingModel.push(false);
            }
        },
        toggle(ind) {
            var self = this;
            if (ind == 0) {
                self.$set(self.workingModel, 0, true);
                for (let i = 1; i < self.workingModel.length; i++) {
                    self.$set(self.workingModel, i, false);
                }
            } else {
                self.$set(self.workingModel, ind, !self.workingModel[ind]);
                if (!self.workingModel.slice(1).includes(true)) {
                    self.$set(self.workingModel, 0, true);
                } else {
                    self.$set(self.workingModel, 0, false);
                }
            }
        }
    },
    computed: {
        computedModel() {
            var self = this;
            if (self.workingModel[0]) {
            	self.model = [''];
            	return self.model;
            }
            else {
            	self.model = [];
            	_.each(self.workingModel.slice(1), function(bool, ind) {
            		if(bool) {
            			self.model.push(self.otherOptions[ind].toLowerCase());
            		}
            	})
            	return self.model;
            }
        }
    },
}
</script>
<style>
</style>