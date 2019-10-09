<template>
    <div>
        <strong>{{row.title}}</strong>
        <div class="sm muted">{{email}}</div>
    </div>
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
    },
    computed: {
        email() {

            var userEmail = this.row.userEmail;
            var collectionEmail = this.row.collectionEmail;
            var username = this.row.username;

            return userEmail || collectionEmail || username;
        }
    }
}
</script>