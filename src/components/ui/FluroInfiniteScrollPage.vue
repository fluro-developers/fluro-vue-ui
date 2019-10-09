<template>
    <div class="infinite-page" :id="`page-${index}`">
        <!-- <template v-if="isActive(index)"> -->
        <!-- <flex-column v-show="active"> -->
        <!-- {{active}} - {{currentPage}} - {{index}} -->
        <slot v-if="active" v-bind:page="page" />
        <!-- </flex-column> -->
        <!-- </template> -->
    </div>
</template>
<script>
export default {
    props: {
        page: {
            required: true,
        },
        index: {
            required: true,
        },
    },
    data() {
        return {
            //THIS IS IF YOU WANT TO HIDE PAGES NOT ON THE SCREEN FOR PERFORMANCE}
            active: true,//false,
        }
    },
    inject: ['pages', 'observeElement', 'stopObservingElement', 'currentPage'],
    computed: {
        pageID() {
            return `page-${this.index}`;
        },
        // active() {
        // return false;
        // return this.pages[this.pageID]
        // }
        // isActive() {
        //     var self = this;
        //     var active = self.$isActive()(self.index);
        //     console.log('ACTIVE?', active, self.index);
        //     return active;
        // }
    },
    mounted() {
        var self = this;
        window.addEventListener('resize', self.resize);
        // console.log('ELEMENT', [self.$el])
        self.$nextTick(function() {

            self.observeElement(self);
            self.pages[self.pageID] = self;
            // console.log('Page Mounted!', self.pages.length)

            setTimeout(function() {
                self.$el.style.minHeight = self.$el.offsetHeight + 'px';
            }, 100);


        })
    },
    methods:{
        resize() {
            var self = this;
            self.$el.style.minHeight = null;

            
            self.$nextTick(function() {
                setTimeout(function() {
                    self.$el.style.minHeight = self.$el.offsetHeight + 'px';
                }, 100);
            });
        }
    },
    // updated() {
    //     // console.log('UPDATED!')
    //     // setTimeout(function() {

    //         // }, 100);
    // },
    beforeDestroy() {
        var self = this;
        window.removeEventListener('resize', self.resize);
        self.$nextTick(function() {
            // self.pages.splice(self.pages.indexOf(self), 1);
            self.stopObservingElement(self);
            delete self.pages[self.pageID];
            // console.log('Page removed!');
        })
    }
}
</script>
<style scoped lang="scss">
</style>