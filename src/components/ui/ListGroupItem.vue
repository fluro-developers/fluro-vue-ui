<template>
<component :is="componentType" tag="a" class="list-group-item" :to="to" @click="clicked" :class="isSelected ? 'active selected' : ''">
        <div>
            <fluro-realm-bar v-if="item" :realm="item.realms" />
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
        <div v-if="selectable">
            <fluro-icon class="tick-icon" icon="check" />
        </div>
        <!-- WOOOOTT -->
        <!-- <pre>{{item}}</pre> -->
    </component>
</template>
<script>
import FluroItemImage from 'src/components/ui/FluroItemImage.vue';
import FluroRealmBar from 'src/components/ui/FluroRealmBar.vue';


export default {
    components: {
        FluroItemImage,
    },
    props: {
        to:{
            type:[String,Object]
        },
        item: {
            type: Object
        },
        firstLine: {
            type: String,
        },
        selectable: {
            type: Boolean,
            required: false,
            default: false,
        },
        isSelected: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        clicked() {
            this.$emit('click', this.item);
        }
    },
    created() {
        if(this.to) {
            this.componentType = 'router-link';
        } else {
            this.componentType = 'div';
        }
    },
    computed: {
        title() {
            var self = this;

            if (!self.item) {
                return;
            }

            return self.item.title;

        },
        renderFirstLine() {

            var self = this;



            if (self.firstLine && self.firstLine.length) {
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
    color:inherit;
    position: relative;
    padding: 7px 10px;
    background:  #fff;
    border-bottom: 1px solid rgba(#000, 0.1);
    display: flex;
    align-items: center;
    transition: background 0.3s;
    transition: color 0.3s;
    text-decoration: none;


    .tick-icon {
        opacity: 0;
        transition: opacity 0.3s;
    }

    &:hover {
        background: #fafafa;

        .tick-icon {
            opacity: 1;
        }
    }

    .fluro-item-image {
        margin-right: 10px !important;
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

    &.selected {
        background: $primary;
        color: #fff;

        .tick-icon {
            opacity: 1;
        }
    }
}
</style>