<template>
    <div class="fluro-flip-card" :class="{flipped:flipped}">

        <div class="fluro-flip-card-inner">
            <div class="fluro-flip-card-front">
                <slot name="front">
                </slot>
            </div>
            <div class="fluro-flip-card-back">
                <slot name="back">
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';


//////////////////////////////////////////////////

export default {
    props: {
        flipped: {
            type: Boolean,
        },
    },
}
</script>
<style scoped lang="scss">
.fluro-flip-card {
    background-color: transparent;
    // width: 300px;
    // height: 200px;
    border: 1px solid #f1f1f1;
    perspective: 1000px;
    /* Remove this if you don't want the 3D effect */


    /* This container is needed to position the front and back side */
    .fluro-flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.3s;
        transform-style: preserve-3d;


        /* Position the front and back side */
        .fluro-flip-card-front,
        .fluro-flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
        }

        /* Style the front side (fallback if image is missing) */
        .fluro-flip-card-front {
            background-color: #bbb;
            color: black;
        }

        /* Style the back side */
        .fluro-flip-card-back {
            background-color: dodgerblue;
            color: white;
            transform: rotateY(180deg);
        }
    }


    &.flipped .fluro-flip-card-inner {
        transform: rotateY(180deg);
    }
}
</style>