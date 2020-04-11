<template>
    <div class="avatar">
       
        <div class="avatar-inner" :style="styles"></div>
<!--         <pre>{{image}}</pre>
 -->    </div>
</template>
<script>


/////////////////////////////////


export default {
    props: {
        'id': {
            type: [String,Object]
        },
        'type': {
            type: String,
            default: 'contact',
        },
        'width': {
            type: Number,
            default: 100,
        },
    },
    computed:{
        styles() {
            
            var styleObject = {};

            if(this.url && this.url.length) {
                styleObject.backgroundImage = `url(${this.url})`;
            }

            return styleObject;
        },
        url() {

            if(this.id) {
                return  this.$fluro.asset.avatarUrl(this.id, this.type, { w: this.width});
            }

        },
    },
}


</script>
<style scoped lang="scss">
.avatar {
    display: inline-block;
    width: 24px;
    vertical-align: middle;

    &[left] {
        margin-right: 10px;
    }

    &[right] {
        margin-left: 10px;
    }

    &[md] {
        width: 34px;
    }

    &[lg] {
        width: 48px;
    }

    &[xl] {
        width: 64px;
    }
}

.avatar-inner {
    max-width: 100%;
    padding-bottom: 100%;
    position: relative;
    overflow: hidden;
    height: 0;
    border-radius: 50%;
    background-color: rgba(#222, 0.1);
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;

}
</style>