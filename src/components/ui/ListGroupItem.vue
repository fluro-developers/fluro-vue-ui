<template>
    <div class="list-group-item">
        <div>
            <fluro-realm-bar v-if="item" :realm="item.realms"/>
            <slot name="left">
                <fluro-item-image v-if="item" :item="item" />
            </slot>
        </div>
        <div class="list-group-item-content">
            <slot>
                <strong>{{title}}</strong>
                <div class="muted sm" v-if="renderFirstLine">{{renderFirstLine}}</div>
            </slot>
        </div>
        <div>
            <slot name="right">
            </slot>
        </div>

    <!-- WOOOOTT -->
        <!-- <pre>{{item}}</pre> -->
    </div>
</template>
<script>

import FluroItemImage from './FluroItemImage.vue';
import FluroRealmBar from './FluroRealmBar.vue';

export default {
    components:{
        FluroItemImage,
    },
    props: {
        item: {
            type: Object
        },
        firstLine:{
            type:String,
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
        renderFirstLine() {

            var self = this;



            if(self.firstLine && self.firstLine.length) {
                return self.firstLine;
            }
            
            if (!self.item) {
                return;
            }

            ////////////////////////

            switch (self.item._type) {
                case 'event':
                    if (self.item.firstLine && self.item.firstLine.length) {
                        return `${self.$fluro.date.readableEventDate(self.item)} - ${self.item.firstLine}`;
                    } else {

                        return self.$fluro.date.readableEventDate(self.item);
                    
                    }
                break;
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
    padding: 7px 10px;
    background: #fff;
    border-bottom: 1px solid rgba(#000, 0.1);
    display: flex;
    align-items: center;

    &:hover {
        background: #fafafa;
    }

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