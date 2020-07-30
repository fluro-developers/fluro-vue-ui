<template>
    <div class="fluro-item-image">
        <template v-if="item._type == 'image'">
            <div class="thumbnail" :style="{backgroundImage:`url(${$fluro.asset.imageUrl(itemID, 50)})`}"/>
        </template>
        <template v-else-if="item._type == 'event'">
            <div class="thumbnail" :style="{backgroundImage:`url(${$fluro.asset.coverUrl(itemID, `event`, {w:50})})`}"/>
        </template>
        <template v-else-if="item._type == 'contact'">
             <fluro-avatar md :id="itemID" :type="item._type" />
            <!-- <div class="thumbnail" :style="{backgroundImage:`url(${$fluro.asset.avatarUrl(itemID, `contact`, {w:50})})`}"/> -->
        </template>
        <template v-else>
            <div class="icon-avatar">
                <fluro-icon :type="item._type"/>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        'item': {
            type: [Object,String],
            default() {
                return {}
            }
        },
    },
    computed:{
        itemID() {
            return this.$fluro.utils.getStringID(this.item);
        }
    }
}
</script>
<style scoped lang="scss">
.fluro-item-image {
    text-align: center;
    width:50px;
    margin:auto;

    .thumbnail {
        width:50px;
        height:50px;
        // 
        display: block;
        background-color: rgba(#000,0.1);
        background-repeat: no-repeat;;
        background-size: contain;
        background-position: center center;
        border-radius: 5px;
    }

    .icon-avatar {
        width:30px;
        height:30px;
        background-color: rgba(#000,0.1);
        text-align: center;
        line-height: 30px;
        display: inline-block;;
    }
}
</style>
