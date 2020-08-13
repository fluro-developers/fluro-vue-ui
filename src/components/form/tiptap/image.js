import { Node, Plugin } from 'tiptap'

export default class Image extends Node {

    get name() {
        return 'image'
    }

    get schema() {
        return {
            inline: true,
            attrs: {
                item: {},
                width: {
                    default: '100%'
                },
                height: {
                    default: '100%'
                }
            },
            group: 'inline',
            draggable: true,
            parseDOM: [{
                tag: 'fluro-image[item][width][height]',
                getAttrs: dom => ({
                    item: dom.getAttribute('item'),
                    width: dom.getAttribute('width'),
                    height: dom.getAttribute('height')
                }),
            },],
            toDOM: node => ['fluro-image', node.attrs],
        }
    }

    commands({ type }) {
        return attrs => (state, dispatch) => {
            const { selection } = state
            const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
            const node = type.create(attrs)
            const transaction = state.tr.insert(position, node)
            dispatch(transaction)
        }
    }

    get view() {
        return {
            props: ['node', 'updateAttrs', 'view'],
            computed: {
                item: {
                    get() {
                        //return `https://api.fluro.io/get/${this.node.attrs.item}`
                        var imageUrl = this.$fluro.asset.imageUrl(this.node.attrs.item)
                        return imageUrl
                    },
                    set(item) {
                        var imageMetadata = this.$fluro.get(this.node.attrs.item)
                        console.log("imageMetadata", imageMetadata)
                        this.width = imageMetadata.width
                        this.updateAttrs({
                            item
                        })
                    },
                },
                width: {
                    get() {
                        return this.node.attrs.width
                    },
                    set(width) {
                        this.updateAttrs({
                            width
                        })
                    }
                },
                height: {
                    get() {
                        return this.node.attrs.width
                    },
                    set(width) {
                        this.updateAttrs({
                            width
                        })
                    }
                },
            },
            template: `<div class="fluro-image-preview"><img :src='item' :width='width' :height='height'/></div>`,
        }
    }
}