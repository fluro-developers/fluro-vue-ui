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
    box-shadow: 0 1px 1px rgba(#000, 0.1);
    margin: 15px 0;

    &[margin] {
        margin-bottom: 30px;
    }
}

</style>