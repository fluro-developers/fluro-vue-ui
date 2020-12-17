<template>
    <span :class="classes" class="status-label">{{output}}</span>
</template>
<script>
export default {
    props: {
        'value': {
            type: String,
        },
        'text': {
            type: String,
        },
        'large': {
            type: Boolean,
        },
    },
    computed: {
        output() {


            var value = this.text || this.value;

            switch (value) {
                case 'refund':
                    value = 'Refunded'
                    break;
                case 'partial_refund':
                    value = 'Partial Refund'
                    break;
            }

            return value;
        },
        classes() {
            var array = [this.value];

            if (this.large) {
                array.push('large');
            }

            return array;
        }
    }
}

</script>
<style lang="scss">
.status-label {

    display: inline-block;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: .05em;
    font-size: .6em;
    padding: 2px 5px;
    line-height: inherit;
    border-radius: 150px;
    margin: 0 2px 2px 2px;

    background: rgba(#000, 0.01);
    color: rgba(#000, 0.1);

    &.large {
        font-size: 1em;
        letter-spacing: 0.03em;
        padding: 0.5em .8em;
        line-height: 1;
        margin: 0 0.2em 0.2em 0;

    }

    &.draft,
    &.trial,
    &.sent,
    &.sandbox,
    &.scheduled,
    &.yellow,
    &.partial_refund,
    &.warning {
        background: #fff3b9 !important;
        color: #f0974e !important;
    }

    &.delivered,
    &.click,
    &.open,
    &.live,
    &.ready,
    &.active,
    &.green,
    &.success {

        background: rgba(#51d432, 0.2) !important;
        color: #51d432 !important;
    }


    &.error,
    &.failed,
    &.red,
    &.danger {

        background: rgba(#bb0010, 0.2) !important;
        color: #bb0010 !important;
    }

    &.refund,
    &.archived,
    &.unsubscribe,
    &.sent {
        background: rgba(#000, 0.05) !important;
        color: rgba(#000, 0.3) !important;
        // background: #e9ebee;
        // color: #b4b7bd;
    }

    &[right] {
        float: right;
    }

}

</style>
