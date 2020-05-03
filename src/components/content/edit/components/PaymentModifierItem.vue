<template>
    <list-group-item>
        <v-layout>
            <v-flex>
                <strong>{{model.title}}</strong>
            </v-flex>
            <v-flex shrink>
                <div class="btn-group">
                    <span class="btn" xs @click="edit" v-tippy content="Edit">
                        <fluro-icon icon="pencil" />
                    </span>
                    <span class="btn" xs @click="duplicate" v-tippy content="Duplicate">
                        <fluro-icon icon="copy" />
                    </span>
                </div>
            </v-flex>
            <v-flex shrink style="padding-left:5px;">
                <fluro-confirm-button @click="remove" v-tippy content="Remove">
                    <template v-slot:default="{confirming}">
                        <span class="btn" xs>
                            {{confirming ? 'Confirm?' : 'Remove'}}
                        </span>
                    </template>
                </fluro-confirm-button>
            </v-flex>
        </v-layout>
        <div v-html="summary"></div>
    </list-group-item>
</template>
<script>
import FluroConfirmButton from 'src/components/ui/FluroConfirmButton.vue';
import _ from 'lodash';

export default {
    components: {
        FluroConfirmButton,
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
        form: {
            type: Object,
            required: true,
        },
    },
    created() {

    },
    computed: {
        summary() {

            var self = this;
            var message;
            var action;
            var amount = self.model.expression || '';

            var condition;

            if (self.model.condition && self.model.condition.length) {
                condition = '<div class="text-muted">if <em>' + self.model.condition + '</em></div>'; //' returns true';
            }

            //If amount is a pure number
            if (!isNaN(amount)) {
                amount = `<strong>${amount}</strong>`;
            }

            switch (self.model.operation) {
                case 'set':
                    action = 'Set current total to';
                    break;
                case 'add':
                    action = 'Add';
                    amount = amount + ' to current total';
                    break;
                case 'multiply':
                    action = 'Multiply current total by';
                    break;
                case 'subtract':
                    action = 'Subtract';
                    amount = amount + ' from current total';
                    break;
                case 'divide':
                    action = 'Divide current total by';
                    break;
                default:
                    return;
                    break;
            }

            message = _.compact([condition, action, amount]).join(' ');

            return message;


        }
    },
    watch: {
        value(v) {
            this.model = v;
        },
    },
    data() {
        return {
            model: this.value,
        }
    },
    methods: {
        duplicate() {
            this.$emit('duplicate', this.model);
        },
        remove() {
            this.$emit('remove', this.model);
        },
        edit() {
            this.$emit('edit', this.model);
        },
    },
}
</script>
<style lang="scss">
</style>