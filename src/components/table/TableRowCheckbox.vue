<template>
    <th class="checkbox-cell">
        <v-btn small class="ma-0" icon>
            <span class="checkbox-outer" :class="{active:checked}">
                <!-- :library="library" -->
                <!-- <fluro-icon  :icon="icon"/> -->
                <fluro-icon library="fas"  icon="check" />
            </span>
        </v-btn>
    </th>
</template>
<script>
/////////////////////////////////

export default {
    props: {
        'checked': {
            type: Boolean,
        },
    },
    data() {
        return {
        }
    },
    computed: {
        library() {
            if (this.checked) {
                return 'fas';
            } else {
                return;
            }
        },
        icon() {
            if (this.checked) {
                return 'check-square';
            } else {
                return 'square';
            }
        },
        // selected() {
        //     return this.$selection.isSelected(this.value)
        // }
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

        &.active {
            background: $success; // #4cc650;
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