import { Node } from 'tiptap'
import { toggleMark, toggleBlockType, toggleWrap  } from 'tiptap-commands'


var prosemirrorCommands = require('prosemirror-commands');
var tiptapUtils = require('tiptap-utils');


export default class FluroStyle extends Node {
    get name() {
        return 'fluroStyle'
    }

    get defaultOptions() {
        return {
            classes: [{
                    title: 'Lead Text',
                    tag: 'p',
                    className: 'lead'
                },
                {
                    title: 'Small Text',
                    tag: 'span',
                    className: 'small'
                },
                {
                    title: 'Muted Text',
                    tag: 'span',
                    className: 'text-muted'
                },

            ],
        }
    }

    get schema() {
        return {
            attrs: {},
            content: 'inline*',
            group: 'block',
            defining: true,
            draggable: false,
            parseDOM: this.options.classes
                .map(cssClass => ({
                    tag: `${cssClass.tag}[class='${cssClass.className}']`,
                    // class: cssClass.className,
                })),
            toDOM: node => node.attrs,
        }
    }

    // commands({ type, schema }) {
    //   return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
    // }

    commands({ type, schema }) {
        return attrs => (state, dispatch, view) => {

            attrs.class = attrs.className
            //console.log(type, schema, attrs)
            var tag = attrs.tag
            var title = attrs.title
            var className = attrs.className

            console.log(type, schema, attrs)
            switch (tag) {
                case 'p':
                    //toggleMark(type, {tag, class: attrs.className})
                    // var isActive = tiptapUtils.nodeIsActive(state, type, attrs);

                    // if (isActive) {
                    //   return prosemirrorCommands.setBlockType(type)(state, dispatch, view);
                    // }

                    // return prosemirrorCommands.setBlockType(type, attrs)(state, dispatch, view);
                    // //  dispatch(toggleBlockType(type, schema.nodes.paragraph, attrs))
                    var newattrs = {tag,  class: className }
                    console.log(type, schema, newattrs)
                    toggleWrap(type, newattrs)

                    break
                default:
                    toggleMark(type, attrs)
                    break
            }

        }
    }

}

// keys({ type }) {
//   console.log("KEYS CALLED", "This", this, "Type", type)
//   return this.options.tokens.reduce((items, key) => ({
//     ...items,
//   }), {})
// }