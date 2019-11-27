<template>
    <div class="fluro-expression-editor">
        <code-editor v-model="model" @init="editorInit" lang="javascript" :height="30"></code-editor>
    </div>
</template>
<script>
import CodeEditor from 'vue2-ace-editor';
import js_beautify from 'js-beautify';

// console.log('BEAUTIFY', js_beautify.html);

export default {
    props: {
        'value': {
            type: String,
            default: '',
        },
        'readonly': {
            type: Boolean,
        },
    },

    data() {
        return {
            editor: null,
            model: this.value,
        }
    },
    methods: {
        editorInit: function(editor) {



            // $rootScope.singleLineAce = function(editor) {
            //     // remove newlines in pasted text
            //     editor.on("paste", function(e) {
            //         e.text = e.text.replace(/[\r\n]+/g, " ");
            //     });


            //     // disable Enter Shift-Enter keys
            //     editor.commands.bindKey("Enter|Shift-Enter", "null")
            // }



            var self = this;
            require('brace/mode/javascript') //language
            // require('brace/theme/tomorrow_night_eighties')
            self.editor = editor;



            editor.on("paste", function(e) {
                e.text = e.text.replace(/[\r\n]+/g, " ");
            });


            // make mouse position clipping nicer
            editor.renderer.screenToTextCoordinates = function(x, y) {
                var pos = this.pixelToScreenCoordinates(x, y);
                return this.session.screenToDocumentPosition(
                    Math.min(this.session.getScreenLength() - 1, Math.max(pos.row, 0)),
                    Math.max(pos.column, 0)
                );
            };

            editor.commands.bindKey("Enter|Shift-Enter", "null")

            ////////////////////////////////////////

            editor.renderer.setShowGutter(false);

            if (this.readonly) {
                editor.setReadOnly(true);
            }
        },
    },
    components: {
        CodeEditor,
    },
    watch: {
        value(value) {

            var self = this;
            // so cursor doesn't jump to start on typing
            if (value !== this.model) {
                this.editor.session.setValue(value);
            }
        },
        model(value) {
            // so cursor doesn't jump to start on typing
            if (value != this.model) {
                this.editor.setContent(this.model)
            }

            // console.log('NEw Code', value)
            this.$emit('input', this.model)
        }
    },
}
</script>
<style lang="scss">
.fluro-expression-editor {

    // border: 10px solid #ff0066;
    min-height: 30px;
    max-height: 30px;
    display: flex;
    border-radius: 4px;
    border: 1px solid #ddd;
    overflow: hidden;
    flex-direction: column;
    margin-bottom: 5px;

    // &>div {
    //     flex: 1
    // }


    div.ace_scroller > div.ace_content {
        // margin: 0 !important;
        margin-top: 0 !important;
        overflow: hidden !important;

        .ace_line,
        .ace_active-line,
        .ace_cursor  {
            line-height: 30px !important;
            height: 30px !important;
            // background: red !important;
        }
    }


}
</style>