


<template>
	<div class="fluro-page-preloader">
   <v-progress-circular :width="1" indeterminate></v-progress-circular>
</div>
</template>
<script>

export default {
}

</script>
<style scoped lang="scss">
    .fluro-page-preloader {
    	pointer-events: none !important;
    	position: fixed;
    	width:100vw;
    	height:100vh;
    	z-index: 999;
    	left: 0;
    	top:0;
    	right:0;
    	bottom:0;



        .v-progress-circular {
            // border: 10px solid red;
            opacity: 0.1;
            width: 30% !important;
            height:30% !important;
            position: absolute;
            left:35%;
            top:50%;
            margin-top:-15%;
            // transform:translate3d(-50%, -50%, 0);
        }



        &[contain] {
            width:100%;
            height:100%;
            position: absolute;


            .v-progress-circular {
                margin-top:0;
                transform:translateY(-50%);
            }
        }



    }
</style>