<template>
    <div class="flex-column">
        <slot></slot>
    </div>
</template>
<script>

export default {
}


</script>
<style lang="scss">
.flex-column {
    display: flex;
    overflow: hidden;
    flex: 1;
    flex-direction: column;

    &[center] {
    	align-items: center;
    	justify-content: center;
    }
}

</style>