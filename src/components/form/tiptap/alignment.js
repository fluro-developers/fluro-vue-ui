import { updateMark, markInputRule } from 'tiptap-commands';
import { Mark } from 'tiptap';

export default class Alignment extends Mark {
	// eslint-disable-next-line class-methods-use-this
	get name() {
		return 'alignment';
	}

	// eslint-disable-next-line class-methods-use-this
	get schema() {
		return {
			attrs: {
				textAlign: {
					default: 'left',
				},
			},
			parseDOM: [
				{
					style: 'text-align',
					getAttrs: (value) => ({ textAlign: value }),
				},
			],
			toDOM: (mark) => ['span', { style: `text-align: ${mark.attrs.textAlign};display: block` }, 0],
		};
	}

	// eslint-disable-next-line class-methods-use-this
	commands({ type }) {
		return (attrs) => updateMark(type, attrs);
	}

	// eslint-disable-next-line class-methods-use-this
	inputRules({ type }) {
		return [markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type)];
	}
}

// // import { toggleBlockType } from 'tiptap-commands';
// // import { Node } from 'tiptap';

// // export default class Paragraph extends Node {
// //     get name() {
// //         return 'alignment';
// //     }

// //     get schema() {
// //         return {
// //             attrs: {
// //                 textAlign: {
// //                     default: 'left'
// //                 }
// //             },
// //             content: 'inline*',
// //             group: 'block',
// //             draggable: false,
// //             parseDOM: [
// //                 {
// //                     tag: 'p',
// //                     getAttrs: (node) => ({
// //                         textAlign: node.style.textAlign || 'left'
// //                     })
// //                 }
// //             ],
// //             toDOM: (node) => [ 'p', { style: `text-align: ${node.attrs.textAlign}` }, 0 ]
// //         };
// //     }

// //     commands({ type, schema }) {
// //         return (attrs) => toggleBlockType(type, schema.nodes.alignment, attrs);
// //     }
// // }

// import { Mark } from 'tiptap'
// import { updateMark, markInputRule } from 'tiptap-commands'

// export default class Alignment extends Mark {
//   get name () {
//     return 'align'
//   }

//   get schema () {
//     return {
//       attrs: {
//         textAlign: 'left'
//       },
//       parseDOM: [
//         {
//           style: 'text-align',
//           getAttrs: value => value
//         }
//       ],
//       toDOM: mark => ['span', {
//         style: `text-align: ${mark.attrs.textAlign};display: block`
//       }, 0],
//     };
//   }

//   commands ({ type }) {
//     return (attrs) => updateMark(type, attrs)
//   }

//   inputRules({ type }) {
//         return [
//             markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type),
//         ]
//     }
// }

// import { Node, Plugin } from 'tiptap'

// export default class Alignment extends Node {

//   get name() {
//     return 'alignment'
//   }

//   get schema() {
//     return {
//       inline: false,
//       // attrs: {
//       //   item: {},
//       // },
//       group: 'block',
//       draggable: false,
//       parseDOM: [
//         {
//           tag: 'div',
//           getAttrs(dom) {
//               return {
//                   item:dom.getAttribute('item'),
//               }
//           },
//           // getAttrs: dom => ({
//           //   item: dom.getAttribute('item'),
//           // }),
//         },
//       ],
//       toDOM: node => ['div', node.attrs],
//     }
//   }

//   commands({ type }) {
//     return attrs => (state, dispatch) => {
//       const { selection } = state
//       const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
//       const node = type.create(attrs)
//       const transaction = state.tr.insert(position, node)
//       dispatch(transaction)
//     }
//   }

//   get plugins() {
//     return [
//       new Plugin({
//         props: {
//           handleDOMEvents: {
//             drop(view, event) {
//               const hasFiles = event.dataTransfer
//               && event.dataTransfer.files
//               && event.dataTransfer.files.length

//               if (!hasFiles) {
//                 return
//               }

//               const images = Array
//                 .from(event.dataTransfer.files)
//                 .filter(file => (/image/i).test(file.type))

//               if (images.length === 0) {
//                 return
//               }

//               event.preventDefault()

//               const { schema } = view.state
//               const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })

//               images.forEach(image => {
//                 const reader = new FileReader()

//                 reader.onload = readerEvent => {
//                   const node = schema.nodes.image.create({
//                     src: readerEvent.target.result,
//                   })
//                   const transaction = view.state.tr.insert(coordinates.pos, node)
//                   view.dispatch(transaction)
//                 }
//                 reader.readAsDataURL(image)
//               })
//             },
//           },
//         },
//       }),
//     ]
//   }
//   /*

// }
