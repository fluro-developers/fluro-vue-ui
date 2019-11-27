<template>
    <span :class="value" class="status-label">{{text || value}}</span>
</template>
<script>
export default {
    props: {
        'value': {
            type: String,
        },
        'text':{
            type:String,
        }
    },
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
    border-radius: 50px;
    margin:0 2px 2px 2px;

    background: rgba(#000, 0.01);
    color: rgba(#000, 0.1);

    &.draft,
    &.sandbox {
        background: #fff3b9;
        color: #f0974e;
    }

    &.live,
    &.active {

        background: rgba(#51d432, 0.2);
        color: #51d432;
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