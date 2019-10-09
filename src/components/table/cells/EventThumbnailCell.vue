<template>
    <div class="thumbnail" :style="{backgroundImage:`url(${$fluro.asset.coverUrl(data, `event`, {w:50})})`}"/>
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
    }
}
</script>
