<template>
    <section class="fluro-panel">
        <!-- <div class="card-body"> -->
            <slot></slot>
        <!-- </div> -->
    </section>
</template>

<style lang="scss">

.fluro-panel {
    display:block;
    background: #fff;
    margin-bottom:10px;
    text-align:left;
    border-radius:4px;
    overflow:hidden;
    border: 1px solid rgba(#000,0.1);

    &[margin] {
        margin-bottom: 15px;
    }
}

</style>