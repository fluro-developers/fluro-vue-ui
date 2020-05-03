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

	import _ from 'lodash';

import FluroInfinitePage from 'src/components/ui/FluroInfiniteScrollPage.vue';

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
            default: 4,
        },
        buffer: {
            type: Number,
            default: 4,
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
            atBottom: false,
            atTop: false,
            busy: false,
        }
    },
    destroyed() {
        var self = this;
        self.observer.disconnect();
        self.parentElement.removeEventListener('scroll', self.updateScroll);
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

        self.parentElement.addEventListener('scroll', self.updateScroll);
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
                console.log('PAGE', integer)
            }
        },
        availablePages() {
            var self = this;
            return _.chunk(this.items, this.perPage)
        },
        renderPages() {

            var start = Math.max(0, (this.currentPage - this.buffer))
            var end = this.currentPage + this.buffer;



            // console.log('RENDER ', start, end, this.total)
            return this.availablePages.slice(start, end)
        }
    },
    methods: {
        updateScroll() {
            var self = this;

            if (self.busy) {
                // console.log('Busy!!')
                return;
            }


            if (self.atBottom) {
                // console.log('force bottom');
                return self.botSentCallback();

            }

            if (self.atTop) {
                // console.log('force top');
                return self.topSentCallback();

            }
        },
        // }, 100),
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


            var atBottom;
            var atTop;


            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    if (entry.target == bottomElement) {
                        atBottom = true;
                        // if (!hit) {
                        //     hit = true;
                        //     self.botSentCallback(entry);
                        // }

                    }

                    //////////////////////////////////////////

                    if (entry.target == topElement) {
                        atTop = true;

                        // if (!hit) {
                        //     hit = true;
                        //     self.topSentCallback(entry);
                        // }
                    }

                    //////////////////////////////////////////

                    if (entry.target.id[0] == 'p') {
                        var target = self.pages[entry.target.id]
                        if (target) {
                            // target.active = entry.isIntersecting;
                            //THIS IS IF YOU WANT TO HIDE PAGES NOT ON THE SCREEN FOR PERFORMANCE}
                        }
                    }
                }

            })


            self.atBottom = atBottom;
            self.atTop = atTop;

            //Reset
            // self.hitBottom = false;
            // self.hitTop = false;

            // self.pages = pageMatches;

            // console.log('ACTIVE PAGES', pageMatches);
            // }, 100),
        },
        topSentCallback() {
            var self = this;

            // console.log('AT TOP')
            self.busy = true;

            self.currentPage--;
            if (self.currentPage > 0) {
                self.parentElement.scrollTop = self.parentElement.scrollTop + (self.parentElement.clientHeight / 3);
            }
            setTimeout(function() {
                self.busy = false;
            }, 500)

        },

        botSentCallback() {
            var self = this;

            // console.log('AT BOTTOM')
            self.busy = true;

            self.currentPage++;
            if (self.currentPage < self.total - 1) {
                self.parentElement.scrollTop = self.parentElement.scrollHeight - (self.parentElement.clientHeight / 3);
            }

            setTimeout(function() {
                self.busy = false;
            }, 500)

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
    height: 1px;
    background: #ff0066;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.1;
}

.top-spacer {
    pointer-events: none;
    height: 1px;
    background: #ff0066;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0.1;
}
</style>