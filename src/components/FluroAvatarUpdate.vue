<template>
    <label class="fluro-avatar-update" :class="{processing:processing}" :style="style">
        <input ref="file" type="file" @change="fileSelected($event.target.files)">
        <div class="overlay">
            <template v-if="processing">
                <v-progress-circular :value="progress"></v-progress-circular>
            </template>
            <template v-else>Click to upload new photo</template>
        </div>
    </label>
</template>
<script>
import FluroAvatar from 'src/components/FluroAvatar.vue';
import _ from 'lodash';


export default {
    components: {
        FluroAvatar,
    },
    data() {
        return {
            processing: false,
            progress:0,
            bytesLoaded:0,
            bytesTotal:0,
            cacheBuster:0,
        }
    },
    props: {
        'id': {
            type: [String, Object]
        },
        'type': {
            default: 'persona',
            type: String,
        },
    },
    computed: {
        style() {
            return {
                backgroundImage: `url("${this.$fluro.asset.avatarUrl(this.id, this.type, {w:this.width || 100, cacheBuster:this.cacheBuster}) }")`
            }
        }
    },
    methods: {
    	reset() {
    		this.processing = false;
    		this.progress = 0;
    		this.bytesLoaded = 0;
    		this.bytesTotal = 0;
    	},
        fileSelected(files) {
            var self = this;
            self.processing = true;

            var file = _.first(files);

            console.log('file selected!', file)

            ///////////////////////////////////////

            var formData = new FormData();
            formData.append('file', file, file.name)

            ///////////////////////////////////////

            var personID = self.$fluro.utils.getStringID(self.id);


            var config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {

                    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    // do whatever you like with the percentage complete
                    // maybe dispatch an action that will update a progress bar or something
                    self.progress = percentCompleted;
                    self.bytesLoaded = progressEvent.loaded;
                    self.bytesTotal = progressEvent.total;

                    ///////////////////////////////////////////////////

                    self.$forceUpdate();
                }
            };



            ///////////////////////////////////////

            return self.$fluro.api.post(`/${self.type}/${personID}/image`, formData, config)
                .then(function(res) {

                	self.cacheBuster+=1;
                    self.reset();
                })
                .catch(function(err) {
                    self.reset();
                });



        }
    }

}
</script>
<style scoped lang="scss">
.fluro-avatar-update {
    background-color: rgba(#000, 0.5);
    background-position: center;
    background-size: cover;
    display: block;
    border-radius: 100%;
    position: relative;
    width: auto;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    text-align: center;
    border: 2px solid #eee;

    .overlay {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(#000, 0.5);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        opacity: 0;
        text-align: center;
    }

    &.processing,
    &:hover {

        .overlay {
            opacity: 1;
        }
    }

    input {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }
}
</style>