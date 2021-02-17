<template>
    <div class="button-cell text-xs-center">
        <v-btn class="ma-0" small @click.stop.prevent="run" :color="color" :icon="!column.button.text" v-tippy :content="tooltip" :loading="processing">
            {{column.button.text}}
            <fluro-icon :icon="icon" :library="iconLibrary" v-if="icon" :right="column.button.text" />
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
        color() {
            if(_.isFunction(this.column.button.color)) {
                return this.column.button.color(this.row)
            }

            return this.column.button.color;
        },
        icon() {

            if(_.isFunction(this.column.button.icon)) {
                return this.column.button.icon(this.row)
            }

            return this.column.button.icon;
        },
        iconLibrary() {

            if(_.isFunction(this.column.button.iconLibrary)) {
                return this.column.button.iconLibrary(this.row)
            }

            return this.column.button.iconLibrary;
        },
        tooltip() {

            if(_.isFunction(this.column.button.tooltip)) {
                return this.column.button.tooltip(this.row)
            }

            return this.column.button.tooltip;
        }
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
