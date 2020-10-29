<template>
    <div class="parallax">
        <div class="parallax-content">
            <slot name="default" />
        </div>
        <div class="parallax-items" :style="style">
            <slot name="items" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        options: {
            type: Object,
            default () {
                return {
                    minX: 0,
                    minY: 0,
                    maxX: 100,
                    maxY: 100,
                    enableY: true,
                    enableX: false,
                    global:false,
                }
            }
        },
        source: {
            type: String,
            default () {
                return 'scroll';
            }
        }
    },
    mounted() {
        this.mount();
    },
    beforeDestroy() {
        this.unmount();
    },
    activated() {
        this.mount();
    },
    deactivated() {
        this.unmount();
    },
    watch: {
        source() {
            if (this.mounted) {
                this.unmount();
                this.mount();
            }
        },
    },
    methods: {
        getScrollParent(node) {
            var self = this;
            const isElement = node instanceof HTMLElement;
            const overflowY = isElement && window.getComputedStyle(node).overflowY;
            const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

            if (!node) {

                var doc = (self.$el.ownerDocument || document);
                var win = doc.defaultView;
                return win;// || document.body || document;;
            } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
                return node;
            }

            return self.getScrollParent(node.parentNode);
        },
        mount() {

            var self = this;
            if (self.mounted) {
                return;
            }

            self.mounted = true;



            self.observer = new IntersectionObserver(function(entries) {



                if (entries[0]['isIntersecting'] === true) {
                    self.addListeners();
                } else {
                    self.removeListeners();
                }
                //     if (entries[0]['intersectionRatio'] === 1)
                //         document.querySelector("#message").textContent = 'Target is fully visible in screen';
                //     else if (entries[0]['intersectionRatio'] > 0.5)
                //         document.querySelector("#message").textContent = 'More than 50% of target is visible in screen';
                //     else
                //         document.querySelector("#message").textContent = 'Less than 50% of target is visible in screen';
                // } else {
                //     document.querySelector("#message").textContent = 'Target is not visible in screen';
                // }
            });


            self.observer.observe(self.$el);



        },
        unmount() {
            var self = this;
            self.removeListeners();


            if (self.observer) {
                self.observer.disconnect();
                self.observer = null;
            }

            self.mounted = false;

        },
        addListeners() {
            // console.log('Add listeners')
            var self = this;
            var element = self.$el;


            //Get the document
            var doc = (element.ownerDocument || document);
            var win = doc.defaultView;

            switch (self.source) {
                case 'mouse':
                    self.mouseparent = self.global ? doc.body : element;
                    self.mouseparent.addEventListener('mousemove', self.cursorUpdate);
                    break;
                case 'none':
                    break;
                default:
                    self.scrollparent = self.getScrollParent(element);
                    self.scrollparent.addEventListener('scroll', self.scrollUpdate);
                    self.scrollUpdate({ target: self.scrollparent });
                    break;
            }
        },
        removeListeners() {

            // console.log('Remove listeners')
            var self = this;
            var element = self.$el;

            if (self.scrollparent) {
                self.scrollparent.removeEventListener('scroll', self.scrollUpdate);
            }

            if (self.mouseparent) {
                self.mouseparent.removeEventListener('mousemove', self.cursorUpdate);
            }



        },
        scrollUpdate(e) {



            var self = this;
            var element = self.$el;

            var domRect = element.getBoundingClientRect();
            var containerRect = self.scrollparent.getBoundingClientRect();


            var scrollX = (domRect.x) * -1 + (containerRect.width + containerRect.x);
            var scrollY = (domRect.y) * -1 + (containerRect.height + containerRect.y);
            var scrollXLimit = (domRect.width) + containerRect.width;// + (domRect.x +containerRect.width)); //domRect.width;// / (e.target.scrollWidth * e.target.clientWidth);
            var scrollYLimit = (domRect.height) + containerRect.height;// + (domRect.y +containerRect.height )); //domRect.height;// - e.target.scrollTop) * 2;//domRect.height;// / (e.target.scrollHeight * e.target.clientHeight);

            if (self.global) {
                scrollY = e.target.scrollTop;
                scrollX = e.target.scrollLeft;
                scrollXLimit = e.target.scrollWidth - e.target.clientWidth;
                scrollYLimit = e.target.scrollHeight - e.target.clientHeight;
            }





            var width = scrollXLimit || 0; //element.offsetWidth;
            var height = scrollYLimit || 0; //element.offsetHeight;
            var x = scrollX || 0; //e.pageX - domRect.x) : e.offsetX;
            var y = scrollY || 0; //self.global ? (e.pageY - domRect.y) : e.offsetY;



            var percentX = x ? (x / width) * 100 : 0;
            var percentY = y ? (y / height) * 100 : 0;


            // if (!self.global) {
            //     percentX = percentX < 0 ? (percentX * -1) * 2 : percentX;
            //     percentY = percentY < 0 ? (percentY * -1) * 2 : percentY;
            // }
            // console.log(y, percentY)


            // percentX = Math.max(0, Math.min(100, percentX));
            // percentY = Math.max(0, Math.min(100, percentY));



            // var upperLimit = 100;
            // var lowerLimit = 0;
            var upperLimitX = self.maxX;
            var upperLimitY = self.maxY;
            var lowerLimitX = self.minX;
            var lowerLimitY = self.minY;


            self.x = self.enableX ? (percentX * (upperLimitX - lowerLimitX) / 100) + lowerLimitX : 50;
            self.y = self.enableY ? (percentY * (upperLimitY - lowerLimitY) / 100) + lowerLimitY : 50;


            // console.log(percentY, lowerLimitY, self.y)
        },
        cursorUpdate(e) {
            var self = this;
            var element = self.$el;

            var domRect = element.getBoundingClientRect();

            var width = element.offsetWidth;
            var height = element.offsetHeight;
            var x = self.global ? (e.pageX - domRect.x) : e.offsetX;
            var y = self.global ? (e.pageY - domRect.y) : e.offsetY;

            var percentX = (x / width) * 100;
            var percentY = (y / height) * 100;
            percentX = Math.max(0, Math.min(100, percentX));
            percentY = Math.max(0, Math.min(100, percentY));


            // var upperLimit = 100;
            // var lowerLimit = 0;
            var upperLimitX = self.maxX;
            var upperLimitY = self.maxY;
            var lowerLimitX = self.minX;
            var lowerLimitY = self.minY;
            self.x = (percentX * (upperLimitX - lowerLimitX) / 100) + lowerLimitX;
            self.y = (percentY * (upperLimitY - lowerLimitY) / 100) + lowerLimitY;


        }
    },
    data() {
        return {
            mounted: false,
            mouseparent: null,
            scrollparent: null,
            x: this.enableX ? 0 : 50,
            y: this.enableY ? (this.source == 'mouse' ? 50 : 0) : 50,
        }
    },
    computed: {
        enableX() {
            return this.options.enableX == undefined ? false : this.options.enableX;
        },
        enableY() {
            return this.options.enableY == undefined ? true : this.options.enableY;
        },

        minX() {
            return this.options.minX == undefined ? 0 : this.options.minX;
        },
        maxX() {
            return this.options.maxX == undefined ? 100 : this.options.maxX;
        },

        minY() {
            return this.options.minY == undefined ? 0 : this.options.minY;
        },
        maxY() {
            return this.options.maxY == undefined ? 100 : this.options.maxY;
        },

        global() {
            return this.source == 'mouse' ? true : this.options.global == undefined ? false : this.options.global;
        },

        style() {
            return {
                perspectiveOrigin: `${100 - this.x}% ${100-this.y}%`
            }
        }
    }
}
</script>
<style lang="scss">
.parallax {
    display: block;
    position: relative;
    //background: #ccc;

    pre {
        display: block;
        background: #000;
        color: #fff;
        position: absolute;
        z-index: 100;
    }


    .parallax-content {
        position: relative;
        z-index: 4;
    }


    .parallax-items {
        perspective: 1px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        z-index: 1;
        // transition: perspective-origin 0.1s;

        .parallax-item {
            height: 100%;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            // opacity: 0.5;
        }
    }
}
</style>