<template>
    <div class="list-group-item">
        <div>
            <slot name="left" />
        </div>
        <div class="list-group-item-content">
            <slot></slot>
        </div>
        <div>
            <slot name="right" />
        </div>
    </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.list-group-item {
    position: relative;
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid rgba(#000, 0.1);
    display: flex;
    align-items: center;

    .list-group-item-content {
        flex: 1;
    }

    &:last-child {
        border-bottom: none;
        border-radius-bottom-left: 3px;
        border-radius-bottom-right: 3px;
    }

    &:first-child {
        border-radius-top-left: 3px;
        border-radius-top-right: 3px;
    }

    &.inactive {
        background: #eee;
        color: rgba(#000, 0.5);
    }
}
</style>