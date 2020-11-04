<template>
    <div class="button-cell text-xs-center">
        <v-btn class="ma-0" small @click.stop.prevent="run" :color="column.button.color" :icon="!column.button.text" v-tippy :content="column.button.tooltip" :loading="processing">
            {{column.button.text}}
            <fluro-icon :icon="column.button.icon" v-if="column.button.icon" :right="column.button.text" />
        </v-btn>
    </div>
</template>
<script>
import _ from 'lodash';

export default {
    props: {
        'row': {
            type: Object,
        },
        'column': {
            type: Object,
        },
        'data': {
            // type: Object,
        },
    },
    data() {
        return {
            processing: false,
        }
    },
    methods: {
        run() {

            var self = this;

            if (self.column.button && self.column.button.action) {

                self.processing = true;

                self.column.button.action(self.row).then(function() {
                    self.processing = false;
                }, function(err) {
                    self.processing = false;
                })

            }
        }
    },
    computed: {

    }
}

</script>
<style lang="scss">
.boolean-cell {
    &.true {
        color: $success;
    }

    &.false {
        opacity: 0.3;
    }
}

</style>
