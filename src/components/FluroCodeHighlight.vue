<template>
   
      <code ref="code" class="fluro-code-highlight"><slot/></code>
      
</template>
<script>
export default {

    props: {
        'lang': {
            type: String,
            default: 'javascript',
        },
    },
    mounted() {

// console.log('MOUNTED')
        var block = this.$refs.code;

        if (window.hljs) {
          console.log(block)
            window.hljs.highlightBlock(block);
        }

    }
}

//   deep: true,
//   bind: function(el, binding) {
//     // on first bind, highlight all targets
//     let targets = el.querySelectorAll('code')
//     targets.forEach((target) => {
//       // if a value is directly assigned to the directive, use this
//       // instead of the element content.
//       if (binding.value) {
//         target.textContent = binding.value
//       }
//       hljs.highlightBlock(target)
//     })
//   },
//   componentUpdated: function(el, binding) {
//     // after an update, re-fill the content and then highlight
//     let targets = el.querySelectorAll('code')
//     targets.forEach((target) => {
//       if (binding.value) {
//         target.textContent = binding.value
//         hljs.highlightBlock(target)
//       }
//     })
//   }

// }
</script>
<style lang="scss">


/* Tomorrow Night Eighties Theme */
/* Original theme - https://github.com/chriskempson/tomorrow-theme */
/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

/* Tomorrow Comment */
.hljs-comment,
.hljs-quote {
  color: #999999;
}

/* Tomorrow Red */
.hljs-variable,
.hljs-template-variable,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-regexp,
.hljs-deletion {
  color: #f2777a;
}

/* Tomorrow Orange */
.hljs-number,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params,
.hljs-meta,
.hljs-link {
  color: #f99157;
}

/* Tomorrow Yellow */
.hljs-attribute {
  color: #ffcc66;
}

/* Tomorrow Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet,
.hljs-addition {
  color: #99cc99;
}

/* Tomorrow Blue */
.hljs-title,
.hljs-section {
  color: #6699cc;
}

/* Tomorrow Purple */
.hljs-keyword,
.hljs-selector-tag {
  color: #cc99cc;
}

.hljs {
  display: block;
  overflow-x: auto;
  background: #2d2d2d;
  color: #cccccc;
  padding: 0.5em;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
</style>