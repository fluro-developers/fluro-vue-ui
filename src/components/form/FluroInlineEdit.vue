<template>
    <span @keyup.esc="blur" class="fluro-inline-edit" @click="enableEdit">
        <template v-if="enabled">
            <span :class="{'inline-hide':!props.editing}">
                <slot name="edit" :props="props" :blur="blur" :focus="focus">
                </slot>
            </span>
            <span :class="{'inline-hide':props.editing}">
                <slot name="default" :props="props" :blur="blur" :focus="focus">
                </slot>
            </span>
        </template>
        <template v-else>
            <slot name="default" :props="props" :blur="blur" :focus="focus">
            </slot>
        </template>
    </span>
</template>
<script>
/////////////////////////////////////////////////////

export default {
    props: {
        autofocus: {
            type: Boolean,
        },
        enabled: {
            type: Boolean,
            default:true,
        },
    },
    data() {
        return {
            props: {
                editing: false,
            }
        }
    },
    mounted() {
        if (this.autofocus) {
            console.log('AUTOFOCUS!!')
            this.enableEdit();
        }
    },
    methods: {
        enableEdit() {

            var self = this;
            var element = self.$el.querySelector('input, textarea');

            if (element) {
                element.focus();
            }

            if (self.enabled) {
                self.props.editing = true;
            }
        },
        focus(event) {
            if (self.enabled) {


                this.props.editing = true;
                event.target.select()
            }
        },
        blur() {
            this.props.editing = false;
        }
    }
}
</script>
<style lang="scss">
.fluro-inline-edit {
    // position: relative;
    // background: rgba(#000, 0.1);
    // border-radius: 3px;

    .inline-hide {
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
        display: block !important;
    }

    input {
        border: none;
        background: #fff; //rgba(#000, 0.05);
        border-radius: 3px;
        padding: 5px 10px;
        appearance: none;
        border: 1px solid $primary;
        display: inline-block;
        height: 36px;
        line-height: 36px;

        &[block] {
            display: block;
            width: 100%;
        }
    }
}
</style>