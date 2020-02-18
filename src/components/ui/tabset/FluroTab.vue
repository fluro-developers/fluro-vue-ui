<template>
    <transition name="slide">
        <flex-column v-if="active">
            <slot />
        </flex-column>
    </transition>
</template>
<script>
export default {
    props: {
        muted:{
            type:Boolean,
        },
        enabled:{
            type:Boolean,
            default:true,
        },
        heading: {
            type: String
        },
        icon: {
            type: Object
        },
    },
    inject: ['tabs', 'addTab', 'activeTabIndex', 'removeTab'],
    created() {
        // console.log('THISIIIIITY', this.tabs)

        
        // this.tabs.push(this);

        
        this.index = this.tabs.length;
        this.addTab(this);
        this.active = this.index == this.activeTabIndex;


    },
    watch: {
        active: 'emitActive',
    },
    beforeDestroy() {
        this.removeTab(this);
        // _.pull(this.tabs, this);
        // .splice(this.index, 1);
    },
    methods: {
        emitActive(val) {
            if(this.active) {
                this.$emit('activeTab');
            }
        },
    },
    data() {
        return {
            index: 0,
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
    top:0;
    left:0;
    right:0;
    bottom:0;
    width: 100%;
    position: absolute;
    transform: translate(15px, 0);
    opacity: 0;
}

.slide-leave-to {
    top:0;
    left:0;
    right:0;
    bottom:0;
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