// import { Mark } from 'tiptap'
// import { markInputRule } from 'tiptap-commands'

// export default class AutoLinkMark extends Mark {
//   get name () {
//     return 'auto-link'
//   }

//   console.log('AutoLink Mark!');
  
//   get schema () {
//     return {
//       attrs: {
//         href: {
//           default: null
//         }
//       },
//       parseDOM: [
//         {
//           tag: 'a[href]',
//           getAttrs: dom => ({
//             href: dom.getAttribute('href')
//           })
//         }
//       ],
//       toDOM: node => [
//         'a',
//         { href: 'pasted_url' }, // how make it ?
//         0
//       ]
//     }
//   }

//   inputRules ({ type }) {
//     return [
//       markInputRule(/((((http|https):\/\/)|(www\.))[^\s]+)\s$/g, type)
//     ]
//   }
// }