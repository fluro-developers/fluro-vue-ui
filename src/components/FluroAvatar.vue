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


/**
/////////////////////////////////

import axios from 'axios';
const CancelToken = axios.CancelToken;

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
    data() {
    	return {
    		cancelToken:null,
    	}
    },
    computed: {
        // classes(){
        // 	return size;
        // },
        url() {
            if (this.id) {
                return this.$fluro.asset.avatarUrl(this.id, this.type, { w: this.width});
            }
        },

        backgroundImage() {

        	if(!this.image) {
        		return;
        	}

            // return `url("${ this.image }")`;
            // return this.$fluro.asset.avatarUrl(this.id, this.type || 'contact', {w:this.width || 100}) ;
        },
    },
    beforeDestroy() {

    	var self = this;
    	if(self.cancelToken) {
			self.cancelToken.cancel('Image unmounted');
		}
    },
    asyncComputed:{
    	image:{
    		get() {

    			var self = this;

    			if(!self.url || !self.url.length) {
    				return Promise.resolve(null);
    			}

    			//////////////////////////////////

    			if(self.cancelToken) {
    				self.cancelToken.cancel('Operation canceled by the user.');
    			}

    			//////////////////////////////////

    			return new Promise(function(resolve, reject) {

    				self.cancelToken = CancelToken.source();

	    			return self.$fluro.api.get(self.url, {
		                responseType: 'arraybuffer',
		                bypassInterceptor:true,
		            })
		            .then(response => {

		            	var prefix = "data:" + response.headers["content-type"] + ";base64,";
		                const buffer = Buffer.from(response.data, 'base64');

		                // console.log('Buffer', buffer);
		                return resolve(`${prefix}${buffer.toString('base64')}`);
		            })
		            .catch(function(thrown) {
                        if (axios.isCancel(thrown)) {
                            console.log('Image canceled', thrown.message);
                        } else {
                            // handle error
                            return reject(thrown);
                        }
                    });

	            })
    		}
    	}
       
    }
}

/**/
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