<template>
    <div class="button-cell text-xs-center" >

        <v-btn class="ma-0" :disabled="disabled" v-if="!hidden" small @click.stop.prevent="run" :color="color" :icon="!buttonText" v-tippy :content="tooltip" :loading="processing">
            {{buttonText}}
            <fluro-icon :icon="icon" :library="iconLibrary" v-if="icon" :right="buttonText" />
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
        hidden() {

            if(_.isFunction(this.column.button.hidden)) {
                return this.column.button.hidden(this.row)
            }

            return this.column.button.hidden;
        },
        disabled() {

            if(_.isFunction(this.column.button.disabled)) {
                return this.column.button.disabled(this.row)
            }

            return this.column.button.disabled;
        },
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
        buttonText() {

            if(_.isFunction(this.column.button.text)) {
                return this.column.button.text(this.row)
            }

            return this.column.button.text;
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
