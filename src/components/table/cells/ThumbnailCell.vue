<template>
    <v-menu lazy open-on-hover>
        <template v-slot:activator="{ on }">
            <div v-on="on" class="thumbnail" :class="{contain:contain}" :style="{backgroundImage:`url(${url})`}">
            </div>
        </template>
        <div class="large-preview">
            <fluro-image :imageWidth="1000" :item="contentID" />
        </div>
    </v-menu>
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
        content() {
            return this.data ? this.data : this.row;
        },
        contentID() {
            return this.$fluro.utils.getStringID(this.data) || this.$fluro.utils.getStringID(this.row);
        },
        contentType() {
            return this.data ? this.data._type || this.row._type : 'image';
        },
        url() {
            return this.contentType == 'video' ? this.$fluro.asset.posterUrl(this.contentID, 50) : this.$fluro.asset.imageUrl(this.contentID, 50)
        },
        // defaultURL() {
        //     return this.row._type == 'video' ? this.$fluro.asset.posterUrl(this.rowID, 50) : this.$fluro.asset.imageUrl(this.rowID, 50);
        // },
        // url() {
        //     return this.data ? this.$fluro.asset.imageUrl(this.data, 50) : this.defaultURL;
        // },

        // rowID() {
        //     return this.$fluro.utils.getStringID(this.row);
        // },
        // id() {
        //     return this.$fluro.utils.getStringID(this.data);
        // },
        contain() {
            return this.data && parseInt(this.content.height) >= parseInt(this.content.width);
        }
    }
}

</script>
<style lang="scss">
.large-preview {
    background:#fff;
    border:5px solid #fff;
    width:700px;
    max-width: 50vw;

}

</style>
<style lang="scss" scoped>
.thumbnail.contain {
    background-size: contain;
    height: 50px;
}

</style>
