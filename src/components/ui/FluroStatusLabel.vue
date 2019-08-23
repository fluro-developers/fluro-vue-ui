<template>
    <span :class="value" class="label">{{value}}</span>
</template>
<script>
export default {
    props: {
        'value': {
            type: String,
        },
    },
}
</script>
<style lang="scss" scoped>
.label {
    
    display: inline-block;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: .05em;
    font-size: .6em;
    padding: 2px 5px;
    line-height: inherit;
    border-radius: 50px;

    background: rgba(#000, 0.01);
    color: rgba(#000, 0.1);

    &.draft,
    &.sandbox {
        background: #fff3b9;
        color: #f0974e;
    }

    &.archived {
        background: rgba(#000, 0.05);
        color: rgba(#000, 0.3);
        // background: #e9ebee;
        // color: #b4b7bd;
    }

    &[right] {
        float:right;
    }

}
</style>