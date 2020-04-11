import { Mark } from "tiptap";
// import { updateMark } from "tiptap-commands";
import { toggleMark, updateMark } from "tiptap-commands";

export default class Typography extends Mark {
    get name() {
        return "typography";
    }

    get defaultOptions() {
        return {
            levels: [{
                    title: 'Muted',
                    level: "text-muted"
                }, 
                // {
                //     title: 'Lead',
                //     level: "lead"
                // }, 
                {
                    title: 'Normal',
                    level: ''
                },

                {
                    title: 'Extra Small',
                    level: 'font-xs'
                },

                {
                    title: 'Small',
                    level: 'font-sm'
                },

                {
                    title: 'Large',
                    level: 'font-lg'
                },

                {
                    title: 'Extra Large',
                    level: 'font-xl'
                },

            ]
        };
    }

    get schema() {
        return {
            attrs: {
                level: {
                    default: ""
                }
            },
            parseDOM: [{
                // tag: "span.typography",
                tag: "span",
                getAttrs(dom) {
                    console.log(dom.classList[1]);
                    return { level: dom.classList[1] };
                }
            }],
            toDOM: mark => {
                return ["span", { class: `${mark.attrs.level}` }, 0];
            }
        };
    }

    commands({ type }) {
        return attrs => toggleMark(type, attrs);
    }
}