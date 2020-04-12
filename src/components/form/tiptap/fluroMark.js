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
                        id: "xs",
                        title: 'Extra Small',
                        tag: 'span',
                        class: 'text-xs'
                    },
                    {
                        id: "sm",
                        title: 'Small',
                        tag: 'span',
                        class: 'text-sm'
                    },

                    {
                        id: "muted",
                        title: 'Muted',
                        tag: 'span',
                        class: 'text-muted'
                    },

                    {
                        id: "lg",
                        title: 'Large',
                        tag: 'span',
                        class: 'text-lg'
                    },

                    {
                        id: "xl",
                        title: 'Extra Large',
                        tag: 'span',
                        class: 'text-xl'
                    },
                // {
                //     id: "small",
                //     title: 'Small Text',
                //     tag: 'span',
                //     class: 'small'
                // },
                // {
                //     id: "muted",
                //     title: 'Muted Text',
                //     tag: 'span',
                //     class: 'text-muted'
                // },

            ],
        }
    }

   

   get schema() {
    return {
      attrs: {
        level: {
          default: ""
        }
      },
      parseDOM: [
        {
          tag: "span.typography",
          getAttrs(dom) {
            // console.log(dom.classList[1]);
            return { level: dom.classList[1] };
          }
        }
      ],
      toDOM: mark => {
        return ["span", { class: `typography ${mark.attrs.level}` }, 0];
      }
    };
  }

  commands({ type }) {
    return attrs => toggleMark(type, attrs);
  }

  /**


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
  /**/

}
