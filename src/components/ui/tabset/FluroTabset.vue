<template>
    <flex-column class="tabset" :class="{justified, vertical}">
        <flex-column-header class="tabset-header" v-if="enabledTabs.length > 1">
            <slot name="menuprefix"></slot>
            <div class="tabset-menu" ref="outer">
                <div class="tabset-menu-inner" ref="inner">
                    <a flat v-for="(tab, index) in enabledTabs" :class="{active:index == activeTabIndex}" @click="selectTab(index)">
                        {{tab.heading}}
                    </a>
                </div>
            </div>
            <slot name="menusuffix"></slot>
        </flex-column-header>
        <flex-column class="tabset-content">
            <slot />
        </flex-column>
    </flex-column>
</template>
<script>
export default {
    props: {
        value: {
            type: Number,
        },
        options: {
            type: Object
        },
        justified: {
            type: Boolean,
        },
        vertical: {
            type: Boolean,
        },
    },
    provide() {
        return {
            tabs: this.tabs,
            activeTabIndex: this.activeTabIndex,
        }
    },
    data() {
        return {
            tabs: [],
            activeTabIndex: this.value || 0,
        }
    },
    watch: {
        value: 'selectTab',
        activeTabIndex(val) {
            this.$emit('input', val);
        },
    },
    computed:{
        enabledTabs() {
            var self = this;
            return _.filter(self.tabs, {enabled:true});
        },
    },
    methods: {
        selectTab(index) {


            var self = this;


            index = Math.max(index, 0);
            index = Math.min(index, self.tabs.length - 1);

            self.activeTabIndex = index;

            var menuElement = self.$refs.outer;
            var containerElement = self.$refs.inner;
            var childElement = containerElement.children[self.activeTabIndex];

            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////

            var parentPos = containerElement.getBoundingClientRect();
            var childPos = childElement.getBoundingClientRect();
            var relativePos = {};

            relativePos.top = childPos.top - parentPos.top,
                relativePos.right = childPos.right - parentPos.right,
                relativePos.bottom = childPos.bottom - parentPos.bottom,
                relativePos.left = childPos.left - parentPos.left;

            ////////////////////////////////////////////////


            var menuWidth = menuElement.offsetWidth;
            var childWidth = childElement.offsetWidth;
            var scrollWidth = menuElement.scrollWidth;
            var target = relativePos.left - ((menuWidth / 2) - (childWidth / 2)); //relativePos.left;
            // var target = relativePos.left; //relativePos.left;
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////



            // var target = relativePos.left; //(menuElement.offsetWidth/2) - relativePos.left;

            // console.log('TEST', menuWidth, scrollWidth, target);


            menuElement.scrollTo({
                // top: 100,
                left: target,
                behavior: 'smooth'
            });


            // menuElement.scrollLeft = target;
            // console.log(relativePos);
            // something like: {top: 50, right: -100, bottom: -50, left: 100}
            // 
            // 
            // 

            // console.log(menuElement);​


            // var menuWidth = menuElement.offsetWidth;
            // var childPosition = childElement.clientLeft;
            // var half = menuWidth /2;


            // var target = childPosition - half;

            // if(target < half) {
            //     target = 0;
            // }

            // console.log('TARGEt', self.$refs, target);
            // menuElement.scrollLeft =target
            // var contentWidth = menuElement.scrollWidth;
            // var childPosition = childElement.offsetLeft;


            // var halfWidth = menuWidth/2;


            // console.log('MENU', '____', menuWidth, contentWidth, childPosition)

            // menuElement.scrollLeft = childPosition - halfWidth;// childPosition;

            // var maxLimit = menuElement.scrollWidth - menuElement.offsetWidth;
            // var scrollTarget = maxLimit - childElement.offsetLeft;
            // console.log(self.$refs, scrollTarget, menuElement.scrollWidth - menuElement.offsetWidth);


            // menuElement.scrollLeft = scrollTarget;







            _.each(self.tabs, function(tab) {
                tab.active = tab.index == self.activeTabIndex;
            })


        }
    },
    //     act() {
    //         var self = this;

    //         //Run a batch
    //         var promise = self.$batch.run({
    //             operation: 'add tag',
    //             ids: self.ids,
    //             tags: self.$fluro.utils.arrayIDs(self.selectedTags),
    //         });

    //         //Close the modal with the promise
    //         return self.close(promise)


    //     },

    // }
}
</script>
<style lang="scss">
.tabset {
    flex: 1;
    // border: 1px solid rgba(#000, 0.05);

    .tabset-menu {
        flex: none;
        overflow: hidden;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        @extend .no-select;
        // display: flex;
        -webkit-overflow-scrolling: touch;



        a {
            display: inline-block;
            color: inherit;
            opacity: 0.5;
            // display: block;
            padding: 15px 35px;
            font-size: 0.8em;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: 500;
            flex: 1;
            text-align: center;

            border-top: 3px solid transparent;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
            border-bottom: 1px solid rgba(#000, 0.05);
            position: relative;
            transition: opacity 0.2s, background 0.2s;

            &.active {
                opacity: 1;
                background: #fff;
                border-left: 1px solid rgba(#000, 0.05);
                border-right: 1px solid rgba(#000, 0.05);
                border-top: 3px solid $primary;
                border-bottom: 1px solid transparent;
            }
        }
    }

    .tabset-content {
        flex: 1;
        // background: #fff;
        position: relative;
        // border: 1px solid rgba(#000, 0.05);
    }

    &.justified {

        .tabset-menu a {
            padding: 15px 17px;
        }

        .tabset-menu-inner {
            display: flex;
        }
    }


    &.vertical {

        @media(min-width: 768px) {
            display: flex;
            flex-direction: row;

            &>.tabset-header {
                min-width: 200px;
                max-width: 300px;
                width: 25%;
                display: flex;
                flex-direction: column;
                background: rgba(#000, 0.05);

                .tabset-menu {
                    background: none;
                    flex: 1;
                    white-space: normal;
                    overflow-x: hidden;
                    overflow-y: auto;

                    .tabset-menu-inner {
                        display: block;

                        a {
                            background: none;
                            border: none;
                            display: block;
                            border-left: 3px solid transprent;
                            text-align: left;
                            text-transform: none;
                            letter-spacing: 0;
                            font-size: 1.1em;
                            padding: 10px 5px 10px 15px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            flex: none;

                            &.active {
                                background: #fafafa;
                                border-left: 3px solid $primary;
                            }
                        }

                    }


                }
            }
        }

    }
}
</style>