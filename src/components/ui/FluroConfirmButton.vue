<template>
    <span @keyup.esc="blur" class="fluro-confirm-button" @click.stop.prevent="checkConfirm">
        <slot name="default" :confirming="confirming"/>
    </span>
</template>
<script>
/////////////////////////////////////////////////////

export default {
    data() {
        return {
            confirming:false,
            timer:null,
        }
    },
    methods: {
        checkConfirm() {
            var self = this;

            if(self.confirming) {
                return this.$emit('click');
            }

            self.confirming = true;

            if(self.timer) {
                clearTimeout(self.timer);
            }

            self.timer = setTimeout(self.blur, 3000);
        },
        blur() {
            var self = this;
            self.confirming = false;
        }
    }
}
</script>
<style lang="scss">
.fluro-confirm-button {
    .confirm-hide {
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
        display: block !important;
    }
}
</style>