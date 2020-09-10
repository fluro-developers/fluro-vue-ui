<template>
    <div class="tick-cell" :class="{active:total, absent:absent}" v-tippy :content="tooltip" v-if="total || absent">
        <fluro-icon library="fas" :icon="absent ? 'times' : 'check-circle'" :class="absent ? 'cross' : 'tick'"/>
    </div>
</template>
<script>
export default {
    props: {
        'row': {
            type: Object,
        },
        'column': {
            type: Object,
        },
        'data': {
            // type: Object,
        },
    },
    computed: {
        absent() {
            return this.data ? this.data.absent && !this.data.total: false;
        },
        total() {
            return this.data ? this.data.total : false;
        },
        tooltip() {
            return this.data ? this.data.tooltip : null;
        },
    },
};
</script>
<style scoped lang="scss">

.tick-cell {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

}

.dot-cell {
    background: #ccc;

    &.active {
        background: #fff;
    }
}


.tick-cell {
    &.active {
        background: rgba($success, 0.1);
    }

    &.absent {
        background: rgba($danger, 0.1);
    }
}

.tick {
    color: $success !important;
    text-align: center;
}

.cross {
    color: $danger !important;
    text-align: center;
}

.tiny {
    font-size: 10px !important;
}

</style>