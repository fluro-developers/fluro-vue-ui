import { Node, Plugin } from 'tiptap'
import { NodeSelection } from 'prosemirror-state';

export default class Video extends Node {

    get name() {
        return 'video'
    }

    get schema() {
        return {
            inline: true,
            attrs: {
                item: {},
                width: {
                    default: '100%'
                },
            },
            group: 'inline',
            draggable: true,
            parseDOM: [{
                tag: 'fluro-video[item][width]',
                getAttrs: dom => ({
                    item: dom.getAttribute('item'),
                    width: dom.getAttribute('width')
                }),
            },],
            toDOM: node => ['fluro-video', node.attrs],
        }
    }

    commands({ type }) {
        return attrs => (state, dispatch) => {
            const { selection } = state
            const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
            const node = type.create(attrs)
            if (_.get(selection, "node.type.name")=="video") {
                const transaction = state.tr.replaceSelectionWith(node)
                dispatch(transaction)
            } else {
                const transaction = state.tr.insert(position, node)
                dispatch(transaction)
            }
        }
    }

    get view() {
        return {
            props: ['node', 'updateAttrs', 'view', 'getPos', 'editable'],
            methods:{ 
                clicked(){
                    const { state } = this.view;
                    let tr = state.tr;
                    const selection = NodeSelection.create(state.doc, this.getPos());
                    tr = tr.setSelection(selection);
                    this.view.dispatch(tr);
                },
            },
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
            },
            template: `<div @click.stop.prevent="clicked()"><img :src='item' :width='width' :height='auto'/></div>`,
        }
    }


}