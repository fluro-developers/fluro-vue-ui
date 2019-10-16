<template>
    <div class="image-cell">
        <template v-if="row._type == 'image'">
            <div class="thumbnail" :style="{backgroundImage:`url(${$fluro.asset.imageUrl(row._id, 50)})`}"/>
        </template>
        <template v-else-if="row._type == 'event'">
            <div class="thumbnail" :style="{backgroundImage:`url(${$fluro.asset.coverUrl(row._id, `event`, {w:50})})`}"/>
        </template>
        <template v-else-if="row._type == 'contact'">
             <fluro-avatar md :id="row._id" :type="row._type" />
            <!-- <div class="thumbnail" :style="{backgroundImage:`url(${$fluro.asset.avatarUrl(row._id, `contact`, {w:50})})`}"/> -->
        </template>
        <template v-else>
            <div class="icon-avatar">
                <fluro-icon :type="row._type"/>
            </div>
        </template>
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
    }
}
</script>
<style scoped lang="scss">
    .image-cell {
        text-align: center;
        width:50px;
        margin:auto;

        .icon-avatar {
            width:30px;
            height:30px;
            background: rgba(#000, 0.05);
            text-align: center;
            line-height: 30px;
            display: inline-block;;
        }
    }
</style>
