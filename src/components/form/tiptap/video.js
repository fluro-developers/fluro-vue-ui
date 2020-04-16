import { Node, Plugin } from 'tiptap'

export default class Video extends Node {

    get name() {
        return 'video'
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
                tag: 'fluro-video[item]',
                getAttrs: dom => ({
                    item: dom.getAttribute('item'),
                }),
            }, ],
            toDOM: node => ['fluro-video', node.attrs],
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

                return this.$fluro.asset.posterUrl(this.node.attrs.item)
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