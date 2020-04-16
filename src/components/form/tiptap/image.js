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
            },
            group: 'inline',
            draggable: true,
            parseDOM: [{
                tag: 'fluro-image[item]',
                getAttrs: dom => ({
                    item: dom.getAttribute('item'),
                }),
            }, ],
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
                return this.$fluro.asset.imageUrl(this.node.attrs.item)
              },
              set(item) {
                this.updateAttrs({
                  item,
                })
              },
            },
          },
          template: `<div><img :src='item' /></div>`,
        }
      }


}