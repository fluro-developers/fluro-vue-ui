<template>
    <div class="modal-outer" :class="{center:!fixed, top, fixed, full}">
        <!-- @click.stop="dismiss()"  -->
        <div class="blanket" @click="dismiss"/>
        <div class="modal-inner">
            <component :options="modal.options" @close="close" @dismiss="dismiss" :is="modal.component" />
            <!-- <component :is="dialogView" :options="options" @close="close"></component> -->
        </div>
    </div>
</template>
<script>
export default {
    props: {
        modal: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            // active:true,
        }
    },
    computed: {
        top() {
            return this.modal.options.fixed || this.modal.options.top;
        },
        full() {
            return this.modal.options.full;
        },
        fixed() {
            return this.modal.options.fixed;
        },
    },
    methods: {
        dismiss(err) {
            var self = this;
            console.log('Dismiss', self.modal)
            self.$fluro.closeModal(self.modal.modalID);
            self.modal.reject(err);
        },
        close(value) {
            var self = this;
            console.log('CLOSE', self.modal)
            self.$fluro.closeModal(self.modal.modalID);
            self.modal.resolve(value);
        }
    },
}
</script>
<style lang="scss">
.modal-outer {
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    justify-content: center;
    padding:5%;


    &.center {
        align-items: center;
    }

    .blanket {
        position: absolute;
        background: rgba(#33373e, 0.5);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        // z-index: 999999;
    }

    .modal-inner {
        display: flex;
        max-height: 100% !important;
        max-width: 100% !important;
        overflow: hidden;
        // min-width:500px;

        @media(max-width: 768px) {
            min-width: 0;
            width: 100%;
            // max-width: none;
        }

        border-radius: 5px;
        // overflow: hidden;
        box-shadow: 0 4px 15px rgba(#000, 0.2);
        background: #fff;
        // width: 300px;
        // height: 300px;
        // 
        // display: block;
        z-index: 99999999;
    }


    &.fixed {
        padding: 25px;
        display: block;
        text-align: center;

        .modal-inner {
            // flex:none;
            flex:none;
            display: inline-block;
            text-align: left;
            position: relative;
        }
        // // display: inline-block;
        //     text-align: left;
        //     flex:none;
        //     margin:auto;
        //     width:auto;
        //     height:auto;
        //     position: relative;
        // }
    }


    &.top {
        align-items: baseline;
        // border:10px solid #ff0066;
    }

    &.full {
        background: #ff0066;
        padding:0;

        .modal-inner {
            left: 0;
            right:0;
            bottom:0;
            top:0;
            width: 100%;
            height: 100%;
            border-radius: 0;
        }
    }


    @media(max-width: 768px) {
        display: flex !important;
        padding: 10px 10px 60px 10px !important;

        .modal-inner {
            display: flex !important;
            flex:1 !important;
            // overflow: hidden !important;
            max-height: 100% !important;
        }
    }
}
</style>