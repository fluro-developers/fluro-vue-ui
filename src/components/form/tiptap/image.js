import { Node, Plugin } from 'tiptap'
import { NodeSelection } from 'prosemirror-state';


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
            console.log("TYPE", type, "SELECTION", selection)
            const node = type.create(attrs)
            console.log("Logging something", attrs, node, position)
            if (_.get(selection, "node.type.name")=="image") {
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
                    // console.log("This was clicked")
                    const { state } = this.view;
                    let tr = state.tr;
                    const selection = NodeSelection.create(state.doc, this.getPos());
                    tr = tr.setSelection(selection);
                    this.view.dispatch(tr);
                },
                onChange(event) {
                    console.log("OnChange", event)
          
                    // update the iframe url
                    // this.updateAttrs({
                    //   src: this.url,
                    // })
                  },
            },
            computed: {
                item: {
                    get() {
                        //return `https://api.fluro.io/get/${this.node.attrs.item}`
                        var imageUrl = this.$fluro.asset.imageUrl(this.node.attrs.item)
                        return imageUrl
                    },
                    set(item) {
                        // var imageMetadata = this.$fluro.get(this.node.attrs.item)
                        // console.log("imageMetadata", imageMetadata)
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
                        return this.node.attrs.height
                    },
                    set(height) {
                        this.updateAttrs({
                            height
                        })
                    }
                },
            },
            template: `<div @click.stop.prevent="clicked()" class="fluro-image-preview" ><img :src='item' :width='width' :height='height'/></div>`,
        }
    }


}