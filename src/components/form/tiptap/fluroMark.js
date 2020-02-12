import { Mark } from 'tiptap'
import { toggleMark  } from 'tiptap-commands'


var tiptapUtils = require('tiptap-utils');

export default class FluroMark extends Mark {
    get name() {
        return 'fluroMark'
    }

    get defaultOptions() {
        return {
            classes: [
                {
                    id: "small",
                    title: 'Small Text',
                    tag: 'span',
                    class: 'small'
                },
                {
                    id: "muted",
                    title: 'Muted Text',
                    tag: 'span',
                    class: 'text-muted'
                },

            ],
        }
    }

    get schema() {
        return {
            attrs: {
              class: {},
            },
            content: 'inline*',
            group: 'block',
            draggable: false,
            parseDOM: this.options.classes
                .map(cssClass => ({
                    //tag: 'p',
                    //getAttrs (node) {
                    //    console.log("parseDOM", node)
                    //    return {
                            class: cssClass.class
                    //    }
                    //}
                })),
            toDOM (node) {
                console.log("Node toDOM", node)
                return  [ 'span', { class: node.attrs.class }, 0 ]
            },

        }
    }

  commands({ type }) {
    return attrs => toggleMark(type)
  }

}
