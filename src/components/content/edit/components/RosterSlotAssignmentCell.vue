<template>
    <div class="assignment-cell-item" :class="confirmationStatus">
        <fluro-icon class="status-icon" :spin="model.sending" :icon="icon" :library="iconLibrary" /> {{model.contactName}}
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Object,
        }
    },
    data() {
        return {
            model: this.value,
        }
    },
    computed: {
        confirmationStatus() {
            return this.model.confirmationStatus;
        },
        iconLibrary() {

            var value = 'far';

            switch (this.confirmationStatus) {
                case 'confirmed':
                    value = 'far';
                    break;
                case 'denied':
                    // value = 'fas';
                    break;
                case 'proposed':
                    value = 'fas';
                    break;
                case 'unknown':

                    break;
            }

            return value;
        },
        icon() {

            var value;

            if(this.model.sending) {
                return 'spinner-third';
            }

            switch (this.confirmationStatus) {
                case 'confirmed':
                    value = 'check';
                    break;
                case 'denied':
                    value = 'times-square';
                    break;
                case 'proposed':
                    value = 'question-circle';
                    break;
                case 'unknown':
                    value = 'clock';
                    break;
            }

            return value;
        }
    }
}
</script>
<style lang="scss">
.assignment-cell-item {
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    padding: 0 10px;
    height: 26px;
    line-height: 26px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #fff;

    .status-icon {
    	font-size: 0.8em;
    }


    &.denied {
        color: darken($danger, 10%);
        border-color: rgba(darken($danger, 10%), 0.3);
        background: lighten($danger, 41%);
    }

    &.confirmed {
        color: darken($success, 10%);
        border-color: rgba(darken($success, 10%), 0.3);
        background: lighten($success, 40%);
    }

    &.warning {
        background: desaturate(rgba($warning, 0.05), 15%);
        color: desaturate(darken($warning, 10%), 15%);
        border-color: rgba(desaturate(darken($warning, 10%), 15%), 0.3);
        font-style: italic;
    }

    &.proposed {
        background: desaturate(lighten($primary, 45%), 5%);
        color: desaturate(darken($primary, 10%), 15%);
        border-color: rgba(desaturate(darken($primary, 10%), 15%), 0.3);
        animation: pulseprimary 2s infinite;

    }

    &.unknown {
    	color: rgba(#000, 0.7);
    	background: #fff;
        border-color: rgba(#000, 0.7);
    }



    


    @keyframes pulseprimary {
      0% {
        background: desaturate(lighten($primary, 30%), 5%);
      }
      50% {
          background: desaturate(lighten($primary, 40%), 5%);
      }
      100% {
          background: desaturate(lighten($primary, 30%), 5%);
      }
    }





}
</style>