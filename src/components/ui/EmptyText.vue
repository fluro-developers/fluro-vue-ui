<template>
    <flex-column class="empty-text-outer">
        <div class="empty-text-inner">
            <div class="icon">
                <fluro-icon library="fas" :type="iconType" :icon="icon" />
            </div>
            <slot></slot>
        </div>
    </flex-column>
</template>
<script>
export default {
    props:{
        type:{
            type:String,
        },
        icon:{
            type:String,
            default() {
                return 'exclamation'
            }
        }
    }
}

</script>
<style lang="scss">
.empty-text-outer {
    background: #fafafa;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: rgba(#000, 0.5);

    .icon {
        font-size: 60px;
        line-height: 60px;
        margin: 15px 0;
    }

    .empty-text-inner {
        padding: 15px;
    }
}
</style>