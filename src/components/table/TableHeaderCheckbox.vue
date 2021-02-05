<template>
    <!-- <th> -->
        <v-btn small class="ma-0" icon>
            <span class="checkbox-outer" :class="{active:all, some:some}">
                <fluro-icon library="fas" :icon="icon" />
            </span>
        </v-btn>
    <!-- </th> -->
</template>
<script>
/////////////////////////////////

export default {
    props: {
        all: {
            type: Boolean,
        },
        some: {
            type: Boolean,
        },
    },
    computed: {
        icon() {
            if(!this.all && this.some) {
                return 'minus';
            }

            return 'check';
        }
    }
}
</script>
<style scoped lang="scss">


.v-btn {


    .checkbox-outer {
        background: #fff;
        border-radius: 2px;
        border: 2px solid rgba(#000, 0.2);
        width: 18px;
        height: 18px;
        display: inline-block;
        padding: 0;
        margin: 0;
        line-height: 18px;
        text-align: center;
        font-size: 12px;

        svg {
            opacity: 0;
        }

        &.some {
            color: $warning;
            svg {
                opacity: 1;
            }
        }

        &.active {
            background: $success;
            color: #fff;
            border-color: $success !important;

            svg {
                opacity: 1;
            }
        }


    }

    &:hover {
        .checkbox-outer {
            border: 2px solid rgba(#000, 0.5);
            svg {
                opacity: 0.5;
            }
        }
    }
}
</style>