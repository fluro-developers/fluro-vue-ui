<template>
    <div ref="container">
        <div id="top" style="background:#ff0066;padding:4px;" ref="top" class="top"></div>
        <div class="slider" ref="slider">
            <!-- <pre>{{renderPages.length}} {{currentPage}} {{total}}</pre> -->
            <!-- <template> -->
            <!-- <div :ref="`page${key}`" v-for="(page,key) in renderPages"> -->
            <!-- <div v-if="showPage(key)"> -->
            <!-- <keep-alive> -->
            <div :id="`page-${key}`" v-for="(page,key) in renderPages">
                <slot v-bind:page="page"></slot>
            </div>
        </div>
        <!-- </keep-alive> -->
        <!-- </div> -->
        <!-- </div>/ -->
        <!-- </template> -->
        <div id="bottom" style="background:#ff0066; padding:5px;" ref="bottom" class="bottom"></div>
    </div>
</template>
<script>
export default {
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
        startPage: {
            type: Number,
            default: 3,
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


    // watch: {
    //     items() {
    //         var topElement = this.$refs.top;
    //         if (topElement) {
    //             topElement.scrollIntoView({
    //                 block: 'center',
    //                 behavior: 'smooth',
    //             });
    //         }
    //     },
    // },



    // computed:{
    //  pages() {
    //      var currentPage = this.currentPage;
    //      var perPage = this.perPage;
    //      return this.items.slice(currentPage, currentPage+perPage);
    //  }
    // },
    beforeMount() {
        // this.currentPage = this.startPage;

    },
    data() {
        return {
            observer: null,
            currentIndex: 0,
            parentElement: null,
            sliderElement: null,
            topElement: null,
            bottomElement: null,
        }
    },
    destroyed() {
        this.observer.disconnect();
    },
    mounted() {

        var self = this;

        var parentElement = self.parentElement = this.$el.closest("[scroll-parent]") || window;
        var topElement = self.topElement = this.$refs.top;
        var bottomElement = self.bottomElement = this.$refs.bottom;
        var sliderElement = self.sliderElement = this.$refs.slider;

        ///////////////////////////////////////////////////////

        if (!self.observer) {
            const options = {
                root: self.parentElement,
                threshold:0,
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
    beforeDestroy() {
        var self = this;
        // setTimeout(function() {

        // window.removeEventListener('resize', self.resize);
        // this.parentElement.removeEventListener("scroll", self.checkScroll);
        // })
    },

    computed: {
        total() {
            return this.availablePages.length;
        },
        availablePages() {
            return _.chunk(this.items, this.perPage);
        },
        renderPages() {
            return this.availablePages.slice(this.currentIndex, this.currentIndex + 3);
        },
        currentPage: {
            get() {
                return this.currentIndex;
            },
            set(integer) {
                integer = Math.max(integer, 0);
                integer = Math.min(integer, this.total - 1);
                this.currentIndex = integer;
                console.log('CURRENT PAGE SEt', this.currentPage, this.total);
            }
        }
    },
    methods: {
        previousPage() {
            this.currentPage--;

        },
        nextPage() {
            this.currentPage++;
        },
        intersectionCallback:_.debounce(function(entries) {

            var self = this;
            var topElement = this.$refs.top;
            var bottomElement = this.$refs.bottom;

            var matched;

            entries.forEach(entry => {

                if (entry.target == bottomElement) {
                    if(!matched) {
                        matched = true;
                        self.botSentCallback(entry);
                    }
                    
                }

                if (entry.target == topElement) {
                    if(!matched) {
                        matched = true;
                        self.topSentCallback(entry);
                    }
                    
                } 
            })




            // console.log('INTERSECTION CALLBACK!!!', entries);
        },100),
        topSentCallback() {
            console.log('HIT TOP!')
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
</style>