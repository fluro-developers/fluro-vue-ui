<template>
    <div class="list-group-item">
        <div>
            <slot name="left">
                <fluro-item-image v-if="item" :item="item" />
            </slot>
        </div>
        <div class="list-group-item-content">
            <slot>
                <strong>{{title}}</strong>
                <div class="muted small" v-if="firstLine">{{firstLine}}</div>
            </slot>
        </div>
        <div>
            <slot name="right">
            </slot>
        </div>
    </div>
</template>
<script>

import FluroItemImage from './FluroItemImage.vue';

export default {
    components:{
        FluroItemImage,
    },
    props: {
        item: {
            type: Object
        },
    },
    computed: {
        title() {
            var self = this;

            if(!self.item) {
                return;
            }
            
            return self.item.title;
            
        },
        firstLine() {

            var self = this;
            if (!self.item) {
                return;
            }

            ////////////////////////

            switch (self.item._type) {
                default:
                    if (self.item.firstLine && self.item.firstLine.length) {
                        return self.item.firstLine;
                    }
                    break;
            }
        }
    }
}
</script>
<style lang="scss">
.list-group-item {
    position: relative;
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid rgba(#000, 0.1);
    display: flex;
    align-items: center;

    .fluro-item-image {
        margin-right:10px;
    }

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