<template>
    <div class="parallax-item" :style="style">
        <slot />
    </div>
</template>
<script>
export default {
    props: {
        scale: {
            type: Number,
            default: 1,
        },
        depth: {
            type: Number,
            default: 1,
        },
        inverseScale: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {

        }
    },
    computed: {
        style() {

            var self = this;
            // var scaleFactor = (1 + (-self.depth * -1) / 1) + self.depth;



            var minScaleFactor = ((1 + self.depth) / 1) + self.depth;
            var scale = minScaleFactor;


            // var parentX = self.inverseScale ? 100 - self.$parent.x : self.$parent.x; // /100;
            var parentY = self.inverseScale ? 100 - self.$parent.y : self.$parent.y; // /100;

          
            if (self.scale != 1 && self.$parent.source != 'mouse') {
                var upperLimitY = minScaleFactor * self.scale;
                var lowerLimitY = minScaleFactor;

                // var upperLimitX = minScaleFactor * self.scale;
                // var lowerLimitX = minScaleFactor;

                // var scaleX = (parentX * (upperLimitX - lowerLimitX) / 100) + lowerLimitX;
                var scaleY = (parentY * (upperLimitY - lowerLimitY) / 100) + lowerLimitY;

                // if (self.$parent.enableX && self.$parent.enableY) {
                // scale = `${scaleX}, ${scaleY}`;
                // } else if (self.$parent.enableX) {
                // scale = `${scaleX}`;
                // } else if (self.$parent.enableY) {
                scale = `${scaleY}`;
                // }
            }

            return {
                transform: `translateZ(-${self.depth}px) scale(${scale})`,
            }
        }
    }
}
</script>
<style lang="scss">
.parallax-item {

    width: 100%;

    &:before {
        content: '';
        position: absolute;
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background: #000;
        left: 0;
        top: 0;
    }

    &:after {
        content: '';
        position: absolute;
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background: #000;
        right: 0;
        bottom: 0;
    }
}
</style>