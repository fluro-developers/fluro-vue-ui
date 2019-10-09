<template>
    <div class="infinite-scroll-container" ref="container">
        <div id="top" class="top-spacer" ref="top"></div>
        <fluro-infinite-page :page="page" :index="key" v-for="(page,key) in renderPages">
            <slot v-bind:page="page" />
        </fluro-infinite-page>
        <div id="bottom" class="bottom-spacer" ref="bottom"></div>
    </div>
</template>
<script>
import FluroInfinitePage from './FluroInfiniteScrollPage.vue';

export default {
    components: {
        FluroInfinitePage,
    },
    props: {
        items: {
            type: Array,
            default: function() {
                return [];
            },
        },
        perPage: {
            type: Number,
            default: 24,
        },
        scrollParent: {
            default () {
                return {}
            }
        },
        click: {
            type: Function,
        },
    },
    provide() {
        return {
            observeElement: this.observeElement,
            stopObservingElement: this.stopObservingElement,
            pages: this.pages,
            currentPage: this.currentPage,
        }
    },
    data() {
        return {
            observer: null,
            currentIndex: 0,
            parentElement: null,
            topElement: null,
            bottomElement: null,
            pages: {},
        }
    },
    destroyed() {
        this.observer.disconnect();
    },
    mounted() {

        var self = this;


        var parentElement = self.parentElement = this.$el.closest("[scroll-parent]") || this.$el.closest("body");
        var topElement = self.topElement = this.$refs.top;
        var bottomElement = self.bottomElement = this.$refs.bottom;



         // console.log('INFINITE PARENT', parentElement)
        ///////////////////////////////////////////////////////

        if (!self.observer) {
            const options = {
                root: self.parentElement,
                // threshold: 0.9,
            }

            var observer = new IntersectionObserver(self.intersectionCallback, options);
            observer.observe(topElement);
            observer.observe(bottomElement);

            self.observer = observer;
        }


        // console.log('PARENT', 
        //  self.parentElement.onscroll = function(w) {
        //  console.log('WOOOT', w)
        // }
        // })
        // setTimeout(function() {


        // window.addEventListener('resize', self.resize);
        // this.parentElement.addEventListener("scroll", self.checkScroll);
        // })
    },

    computed: {
        total() {
            return this.availablePages.length;
        },
        currentPage: {
            get() {
                return this.currentIndex;
            },
            set(integer) {
                integer = Math.max(integer, 0);
                integer = Math.min(integer, this.total - 1);
                this.currentIndex = integer;
            }
        },
        availablePages() {
            var self = this;
            return _.chunk(this.items, this.perPage)
        },
        renderPages() {
            return this.availablePages.slice(0, (this.currentPage + 4))
        }
    },
    methods: {
        observeElement(element) {
            if (this.observer) {
                // console.log('Observe element', element)
                this.observer.observe(element.$el);
            }
        },
        stopObservingElement(element) {
            if (this.observer) {
                // console.log('Unobserve element', element)
                this.observer.unobserve(element.$el);
            }
        },

        nextPage() {
            this.currentPage++;
        },
        previousPage() {
            this.currentPage--;
        },
        // resize: _.debounce(function() {

        //     var self = this;
        //     _.each(self.pageRecords, function(record, key) {
        //         record.divElement.style.height = '';
        //         record.hide = false;

        //     });
        //     self.$nextTick(function() {
        //         self.pageRecords = {};
        //         console.log('RESET CHECK SCROLL');
        //         self.checkScroll();
        //     })
        // }, 100),
        intersectionCallback(entries) {
            // : _.debounce(function(entries) {

            var self = this;
            var topElement = this.topElement
            var bottomElement = this.bottomElement;
            var hit;

            entries.forEach(entry => {

                if (entry.target == bottomElement) {
                    if (!hit) {
                        hit = true;
                        // console.log('Bottom HIT')
                        self.botSentCallback(entry);
                    }
                }

                //////////////////////////////////////////

                // if (entry.target == topElement) {
                //     if (!hit) {
                //         hit = true;
                //         // console.log('Top HIT')
                //         self.topSentCallback(entry);
                //     }
                // }

                //////////////////////////////////////////

                if(entry.target.id[0] == 'p') {

                    var target = self.pages[entry.target.id]
                    if(target) {
                        // target.active = entry.isIntersecting;
                        //THIS IS IF YOU WANT TO HIDE PAGES NOT ON THE SCREEN FOR PERFORMANCE}
                    }
                }
                
            })

            // self.pages = pageMatches;

            // console.log('ACTIVE PAGES', pageMatches);
            // }, 100),
        },
        topSentCallback() {
            // console.log('HIT TOP!')
            this.previousPage();
        },
        botSentCallback() {
            console.log('HIT BOTTOM!')
            this.nextPage();
        },
    }
}
</script>
<style scoped lang="scss">

.infinite-scroll-container {
    position: relative;

}
.bottom-spacer {
    pointer-events: none;
height:20px;
// background: #ff0066;
position: absolute;
bottom:0;
left:0;
right:0;
}

.top-spacer {
    pointer-events: none;
    height:500px;
    // background: #ff0066;
    position: absolute;
    top:0;
    left:0;
    right:0;
}
</style>