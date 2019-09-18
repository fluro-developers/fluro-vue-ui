<template>
    <div>
        <div ref="top"></div>
        <template>
            <slot v-for="page in renderPages" v-bind:page="page"></slot>
        </template>
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


    watch: {
        items() {
            var topElement = this.$refs.top;
            if (topElement) {
                topElement.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                });
            }
        },
    },



    // computed:{
    //  pages() {
    //      var currentPage = this.currentPage;
    //      var perPage = this.perPage;
    //      return this.items.slice(currentPage, currentPage+perPage);
    //  }
    // },
    beforeMount() {
        this.currentPage = this.startPage;

    },
    mounted() {

        var self = this;
        // console.log('PARENT', 
        //  self.parentElement.onscroll = function(w) {
        //  console.log('WOOOT', w)
        // }
        // })
        // setTimeout(function() {

        console.log('PARENt', this.parentElement)
        this.parentElement.addEventListener("scroll", self.checkScroll);
        // })
    },
    beforeDestroy() {
        var self = this;
        // setTimeout(function() {


        this.parentElement.removeEventListener("scroll", self.checkScroll);
        // })
    },
    data() {
        return {
            currentPage: 1,
        }
    },
    computed: {
        parentElement() {
            return this.$el.closest("[scroll-parent]") || window;
        },
        total() {
            return this.availablePages.length;
        },
        availablePages() {
            return _.chunk(this.items, this.perPage);
        },
        renderPages() {
            return this.availablePages.slice(0, this.currentPage)
        }
    },
    methods: {
        nextPage() {
            var totalPages = this
            this.currentPage++;
        },
        checkScroll(val) {
            var self = this;

            // // var parentElement = this.scrollParent && this.scrollParent.$el ? this.scrollParent.$el : window;
            // console.log('CHECK SCROLL', this.parentElement.scrollTop, this.parentElement.scrollHeight);

            let bottomOfWindow;

            if (self.parentElement == window) {
                bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
            } else {
                bottomOfWindow = (self.parentElement.scrollTop >= (self.parentElement.scrollHeight - self.parentElement.offsetHeight));
            }


            // console.log(self.parentElement.scrollTop, self.parentElement.scrollHeight - self.parentElement.offsetHeight);

            // let bottomOfParent = this.parentElement.scrollTop + this.parentElement.innerHeight === this.parentElement.offsetHeight;



            if (bottomOfWindow) {
                // console.log('Hit the bottom!')
                self.nextPage();
            }

        }
    }
}
</script>
<style scoped lang="scss">
</style>