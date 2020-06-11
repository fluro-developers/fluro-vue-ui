<template>
    <span v-if="enabled" :class="{absolute}">
        <!-- <v-menu  > -->
        <!-- :fixed="true"  -->
        <v-menu offset-y :open-on-hover="true" @click.native.stop.prevent>
            <template v-slot:activator="{ on }">
                <span v-on="on" class="dot" />
            </template>
            <div class="help-text">
                <strong>{{title}}</strong>
                <div v-html="body"></div>
            </div>
        </v-menu>
    </span>
</template>
<script>
export default {
    props: {
        uid: {
            type: String,
        },
        title: {
            type: String,
        },
        body: {
            type: String,
        },
        absolute:{
        	type:Boolean,
        }
    },
    mounted() {
        this.mount();
    },
    activated() {
        this.mount();
    },
    deactivated() {
        this.unmount();
    },
    beforeDestroy() {
        this.unmount();
    },
    data() {
        return {
            registered: false,
            id: this.$fluro.utils.guid(),
        }
    },
    computed: {
        enabled() {
            return this.registered && (this.$help && this.$help.visible);
        }
    },
    methods: {
        mount() {

            

            var self = this;

            if (!self.$help) {
                return;
            }


            self.registered = self.$help.register(self.id, self, self.uid)

            if (self.registered) {
                // console.log('Registered', self.id, self.uid);
            }
            //We're already registered
            // if (!self.registered) {
            //     self.$destroy();
            //     self.$el.parentNode.removeChild(self.$el);
            //     console.log('Destroy help element');
            // }
        },
        unmount() {


            var self = this;


            if(!self.$help) {
        		return;
        	}



            if (!self.registered) {
                // console.log('not registered', self.id, self.uid)
                return;
            }

            self.$help.unregister(self.id, self.uid)
        }
    },

}
</script>
<style scoped lang="scss">
span {

    position: fixed;
    z-index: 9999; // 2147483647 9999999999999999;

    &.absolute,
    &.absolute .dot {
    	position: absolute !important;

    }

    .dot {
        content: '';
        width: 20px;
        height: 20px;
        background: yellow;
        display: block;
        border-radius: 100%;
        border: 2px solid #fff;
        box-shadow: 0 0 20px rgba(#000, 0.5);



        &:before {
            content: '';
            position: relative;
            display: block;
            width: 300%;
            height: 300%;
            box-sizing: border-box;
            margin-left: -100%;
            margin-top: -100%;
            border-radius: 45px;
            background-color: yellow;
            animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        &:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            width: 100%;
            height: 100%;
            background-color: yellow;
            border-radius: 15px;
            box-shadow: 0 0 8px rgba(0, 0, 0, .3);
            animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite;
        }


    }
}



@keyframes pulse-ring {
    0% {
        transform: scale(.33);
    }

    80%,
    100% {
        opacity: 0;
    }
}

@keyframes pulse-dot {
    0% {
        transform: scale(.8);
    }

    50% {
        transform: scale(1);
    }

    100% {
        transform: scale(.8);
    }
}

.help-text {
    padding: 15px;
    border-radius: 5px;
    // border: 1px solid #000;
    background: #fff;
    max-width: 250px;
    position: relative;
    z-index: 99999999999999999999;
}
</style>