<template>
    <flex-column class="fluro-conversation-box">
    	<flex-column-body>
    		Message list in here
    	</flex-column-body>
        <flex-column-footer>
        	Chat post in here
        </flex-column-footer>   
    </flex-column>
</template>
<script>

export default {
    components:{
    },
    props: {
        value:{
        	type:Object,
        	default() {
        		return  {}
        	}
        }
    },
    computed: {
        
    }
}
</script>
<style lang="scss">

</style>