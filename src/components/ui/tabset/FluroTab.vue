<template>
    <transition name="slide">
        <!-- <flex-column> -->
        <!-- {{key}} {{active}} -->

        <flex-column v-if="active">
            <slot />
        </flex-column>
       
        <!-- </flex-column> -->
    </transition>
</template>
<script>
import _ from 'lodash';

export default {
    props: {
        muted: {
            type: Boolean,
        },
        enabled: {
            type: Boolean,
            default: true,
        },
        heading: {
            type: String
        },
        tooltip: {
            type: String,
            default () {
                return null;
            }
        },
        index: {
            type: String,
        },
        iconType: {
            type: String
        },
        icon: {
            type: Object
        },
    },
    inject: ['tabs', 'tabset', 'addTab', 'getActiveTabIndex', 'removeTab'],
    created() {
        // console.log('THISIIIIITY', this.tabs)

        var self = this;

        if (!self.index) {
            self.key = self.$fluro.utils.guid();
        } else {
            self.key = self.index;
        }

        // self.tabs.push(self);
        // self.key = self.tabs.length;
        self.addTab(self);

        // var activeTabIndex = this.getActiveTabIndex();
        // console.log('CHECK ACTIVE?', activeTabIndex, self.key);
        self.active = (self.key == self.tabset.activeTabIndex);

    },
    watch: {
        'tabset.activeTabIndex': function(index) {
            this.active = this.key == index;
            console.log('Active is now', index, this.active)
        },
        active: 'emitActive',
    },
    beforeDestroy() {
        this.removeTab(this);
        // _.pull(this.tabs, this);
        // .splice(this.index, 1);
    },
    methods: {
        emitActive(val) {
            if (this.active) {
                this.$emit('activeTab');
            }
        },
    },
    data() {
        return {
            key: null,
            active: false,
        }
    },
    // methods: {
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
.slide-leave-active,
.slide-enter-active {
    transition: 0.2s;
}

.slide-enter {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    position: absolute;
    transform: translate(15px, 0);
    opacity: 0;
}

.slide-leave-to {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    position: absolute;
    transform: translate(-15px, 0);
    opacity: 0;
}

/**

.swipe-enter-active, .swipe-leave-active {
  transition: all 0.3s;//opacity .5s;

}
.swipe-enter, .swipe-leave-to  {
  opacity: 0;
  transform: scale(0.9);
}
/**/

</style>
