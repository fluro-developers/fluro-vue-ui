<template>
    <input @focus="$emit('focus')" @blur="blur" @keyup.enter="blur" pattern="[0-9]*" placeholder="Duration (mins)" inputmode="numeric" v-model.lazy="number" />
</template>
<script>
export default {
    props: {
        'value': {
            type: [Number, String],
        },
    },
    data() {
        return {
            model: parseInt(this.value || 0),
        }
    },
    methods: {
        focus() {
            this.$emit('focus');
        },
        blur() {
            this.$emit('blur');

        }
    },
    computed: {
        number: {
            get() {
                return this.$fluro.utils.hhmmss(this.model);
            },
            set(input) {
                if (!input) {
                    input = '00:00:00';
                }

                var pieces = input.split(':');
                if (!pieces.length) {
                    pieces = ['00', '00', '00'];
                }



                if (pieces.length == 1) {
                    pieces.unshift('00');
                    pieces.push('00');
                } else if(pieces.length == 2) {
                    pieces.unshift('00');
                }
                    
                // } else if (pieces.length < 2) {
                //     pieces.unshift('00');
                //     pieces.unshift('00');
                // }

                //Ensure we have 2 digits
                input = _.map(pieces, function(piece) {
                    if (piece.length < 2) {
                        return `0${piece}`;
                    } else {
                        return piece.slice(0, 2);
                    }
                }).join(':')




                var matches = input.match(/^(\d{2}):([0-5]\d):([0-5]\d)$/);
                if (matches) {
                    input = +matches[1] * (60 * 60) + +matches[2] * 60 + +matches[3];

                    this.model = input;
                    this.$emit('input', this.model);
                }

                // var matches = input.match(/^(\d{2}):([0-5]\d):([0-5]\d)$/);
                // if (matches) {
                //     
                //     this.model = input;
                //     this.$emit('input', this.model);
                // } else {
                //     console.log('INPUIT', input);
                //     input.split(':');
                //     if(input)
                // }

                // console.log('INPUT MATCH', matches)

            }
        }
    },
}
</script>
<style lang="scss" scoped>
input {
    width: 100%;
    min-width: 70px;
    text-align: center;
    font-size: 0.9em;
    padding: 5px;
}
</style>