<template>
    <div class="toggle-item" :class="{inactive:inactive}">
        <div class="toggle-item-content">
            <slot />
        </div>
        <div class="toggle-switch" />
    </div>
</template>
<script>
export default {
    props: {
        inactive: {
            type: Boolean,
        },
    },
    computed: {
        filtered() {
            return _.chain(this.realms)
                .filter(function(realm) {
                    if (realm._discriminatorType) {
                        return;
                    }

                    return true;
                })
                .orderBy(function(realm) {
                    return realm.title;
                })
                .value();


        },
        // colouredRealms() {
        //     var coloured = _.filter(this.filtered, 'bgColor');
        //     if(!coloured.length) {
        //         return this.filtered.slice(0,1);
        //     }
        // }
    }
}
</script>
<style lang="scss">
.toggle-items {
    border: 1px solid rgba(#000, 0.1);
    border-radius: 3px;
}

.toggle-item {
    font-size: 0.9em;
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid rgba(#000, 0.1);
    cursor: pointer;
    display: flex;

    .toggle-item-content {
        flex: 1;
    }

    &:hover {
        background: #fafafa;
    }

    &:last-child {
        border-bottom: none;
        border-radius-bottom-left: 3px;
        border-radius-bottom-right: 3px;
    }

    &:first-child {
        border-radius-top-left: 3px;
        border-radius-top-right: 3px;
    }

    .toggle-switch {
        flex: none;
        background: #E2E7EE;
        border-radius: 50px;
        height: 23px;
        line-height: 23px;
        min-width: 50px;
        position: relative;
        display: block;
        overflow: hidden;
        text-align: center;
        letter-spacing: 0.03em;
        font-size: 0.8em;
        font-weight: 600;
        text-transform: uppercase;
        box-shadow: inset 0px 2px 3px rgba(0, 0, 0, 0.2);
        font-style: normal;
        // border-top:1px solid rgba(#000, 0.05);
        border-bottom: 1px solid rgba(#fff, 0.5);

        &:before {
            content: 'Off';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50px;
            // background: $brand-primary;
            // color: #fff;
            transform: translateX(-100%);
            transition: all 0.5s;
            pointer-events: none;
            opacity: 0.5;
        }

        &:after {
            content: 'On';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50px;
            background: $success;
            color: #fff;
            transform: translateX(0);
            transition: all 0.5s;
            pointer-events: none;
            box-shadow: inset 0px 4px 5px rgba(0, 0, 0, 0.1);
        }





    }


    &.inactive {
        // opacity: 0.2;
        font-style:italic;
        color: rgba(#000, 0.3);
        background: none;

        .toggle-switch {
            &:before {
                transform: translateX(0);
            }

            &:after {
                transform: translateX(100%);
            }
        }
    }
}
</style>