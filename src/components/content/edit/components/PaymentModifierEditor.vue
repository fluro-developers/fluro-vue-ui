<template>
    <div class="payment-modifier-editor">
        <list-group v-if="model.length">
            <draggable v-model="model" v-bind="dragOptions" @sort="sorted" @start="drag=true" @end="drag=false">
                <payment-modifier-item :form="form" @remove="remove" @duplicate="duplicate" @edit="edit" v-model="model[index]" v-for="(modifier, index) in model"/>
            </draggable>
        </list-group>
        <v-btn class="ma-0" color="primary" @click="add()">
            Add Payment Modifier
            <fluro-icon icon="plus" right />
        </v-btn>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import PaymentModifierItem from './PaymentModifierItem.vue';
import PaymentModifierModal from './PaymentModifierModal.vue';

export default {
    components: {
        // draggable,
        draggable,
        PaymentModifierItem,
    },
    props: {
        value: {
            type: Array,
            required: true,
            default() {
                return [];
            },
        },
        form: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            model: this.value,
            drag: false,
            dragOptions: {

            }
        }
    },
    methods: {
        sorted() {
            var self = this;
            self.$emit('input', self.model)
        },
        duplicate(modifier) {

        	var self = this;

        	var copy = JSON.parse(JSON.stringify(modifier));
        	var getCurrentIndex = _.indexOf(self.model, modifier);
        	var insertIndex = getCurrentIndex;
        	self.model.splice(insertIndex, 0, copy);
        	self.edit(copy, true);

        	// console.log('Push copy!')
            self.$emit('input', self.model);
        },
        remove(modifier) {
        	var self = this;
            console.log('REMOVE', modifier);
            var index = this.model.indexOf(modifier);
            this.model.splice(index, 1)
            self.$emit('input', self.model);
        },
        edit(item, cancelEnabled) {
        	var self = this;
            var promise = self.$fluro.modal({
                component: PaymentModifierModal,
                options: {
                    item,
                    form:self.form,
                    cancelEnabled,
                }
            })
            .catch(function(err) {
            	self.remove(item);
            });
        },
        add() {
        	var self = this;
        	var insert = {};
        	self.model.push(insert);
        	self.edit(insert, true);
            self.$emit('input', self.model);
        },
    },
}
</script>
<style lang="scss">
</style>