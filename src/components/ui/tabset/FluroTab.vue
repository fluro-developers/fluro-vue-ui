<template>
    <transition name="slide">
        <flex-column v-show="active">
            <slot />
        </flex-column>
    </transition>
</template>
<script>
export default {
    props: {
        heading: {
            type: String
        },
    },
    inject: ['tabs'],
    created() {
        // console.log('THISIIIIITY', this.tabs)
        this.index = this.tabs.length;
        this.active = this.index == 0;
        this.tabs.push(this);
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
    // right:0;
    // bottom:0;
    width: 100%;
    position: absolute;
    transform: translate(15px, 0);
    opacity: 0;
}

.slide-leave-to {
    top:0;
    left:0;
    // right:0;
    // bottom:0;
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