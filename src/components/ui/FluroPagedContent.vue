<template>
    <flex-column>
        <flex-column-body>
            <div ref="top"></div>
            <slot v-bind:page="page"></slot>
        </flex-column-body>
        <flex-column-footer>
            <div class="footer-stats">
                <v-layout row wrap>
                    <template v-if="!totalPages">
                        <v-flex class="text-muted">
                            No matches
                        </v-flex>
                    </template>
                    <template v-else>
                        <v-flex xs6 align-center d-flex class="text-muted">
                            {{startOffset + 1 | numberWithCommas}} to {{endOffset | numberWithCommas}} of {{filteredTotal | numberWithCommas}} matches
                            <!-- </div> -->
                        </v-flex>
                        <v-flex xs6 align-center d-flex class="text-xs-right">
                            <div>
                                <span v-if="$vuetify.breakpoint.smAndUp" class="text-muted">Page {{currentPage}} of {{totalPages}}</span>
                                <span class="ml-3">
                                    <template>
                                        <v-btn class="ma-0" :disabled="previousPageDisabled" icon @click="firstPage()">
                                            <fluro-icon icon="arrow-to-left" />
                                        </v-btn>
                                        <v-btn class="ma-0" :disabled="previousPageDisabled" icon @click="previousPage()">
                                            <fluro-icon icon="arrow-left" />
                                        </v-btn>
                                    </template>
                                    <template>
                                        <v-btn class="ma-0" :disabled="nextPageDisabled" icon @click="nextPage()">
                                            <fluro-icon icon="arrow-right" />
                                        </v-btn>
                                        <v-btn class="ma-0" :disabled="nextPageDisabled" icon @click="lastPage()">
                                            <fluro-icon icon="arrow-to-right" />
                                        </v-btn>
                                    </template>
                                </span>
                            </div>
                        </v-flex>
                    </template>
                </v-layout>
            </div>
            <!-- <div class="pager" v-if="total > 1">
                <v-pagination v-model="currentPage" :total-visible="totalVisible" @input="pageChanged()" :length="total"></v-pagination>
            </div> -->
        </flex-column-footer>
    </flex-column>
</template>
<script>
export default {
    props: {
        top: {
            type: Boolean,
        },
        items: {
            type: Array,
            default: function() {
                return [];
            },
        },
        perPage: {
            type: Number,
            default: 24,
        },
        startPage: {
            type: Number,
            default: 1,
        },
        click: {
            type: Function,
        },
    },
    data() {
        return {
            currentPage: this.startPage,
        }
    },
    filters: {
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
    watch: {
        'items': 'checkPage',
    },
    computed: {
    	previousPageDisabled() {
            return this.currentPage <= 1;

        },
        nextPageDisabled() {
            return this.currentPage == this.totalPages;
        },
        totalVisible() {
            if (this.$vuetify.breakpoint.smAndDown) {
                return 0
            } else {
                return 15;
            }
        },
        totalPages() {
            return this.availablePages.length;
        },
        availablePages() {
            return _.chunk(this.items, this.perPage);
        },
        page() {
            if (this.currentPage > this.totalPages) {
                return _.first(this.availablePages);
            } else {
                return this.availablePages[this.currentPage - 1];
            }
        },
        startOffset() {
            return Math.floor((this.currentPage - 1) * this.perPage);
        },
        endOffset() {
            return Math.min(this.startOffset + this.perPage, this.filteredTotal);
        },
        filteredTotal() {
        	return this.items ? this.items.length : 0;
        }
    },
    methods: {
        checkPage() {
            this.currentPage = 1;


            // if(this.currentPage >= this.availablePages.length) {
            // 	this.currentPage = this.availablePages.length;
            this.pageChanged();
            // }
        },
        pageChanged() {
            var topElement = this.$refs.top;
            if (topElement) {
                topElement.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                });
            } else {
                console.log('No top')
            }

            // document.getElementsByTagName('h2')[3].scrollIntoView();
            this.$emit('change', this.currentPage);


        },
        firstPage() {
            this.currentPage = 1;

        },
        lastPage() {
            this.currentPage = this.totalPages;
        },
        nextPage() {
            var total = this.totalPages;

            this.currentPage < total ? this.currentPage++ : this.currentPage = total;
            this.pageChanged();
        },
        previousPage() {
            var total = this.totalPages;
            this.currentPage > 1 ? this.currentPage-- : this.currentPage = 1;
            this.pageChanged();
        },
    }
}
</script>
<style scoped lang="scss">

.footer-stats {
    padding: 5px 10px;
    font-size: 0.9em;
}


.pager {
    text-align: center;
    padding: 15px 0;

    .v-pagination-item {
        font-weight: 700;
    }

	
}
</style>