<template>
    <div class="fluro-editor">
        <editor-menu-bubble v-if="bubbleEnabled " :editor="editor" @hide="hideBubble" :keep-in-bounds="keepInBounds" v-slot="{ commands, isActive, getMarkAttrs, menu }">
            <div class="menububble" :class="{ 'active': menu.isActive }" :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">
                <template v-if="selectedImage">
                    <form class="menububble__form" @submit.prevent.stop="" v-if="isActive.image()">
                        <!-- This function stops the page being submitted -->
                        <template v-if="proEnabled">
                            <template v-if="constrain">
                                <label for="widthInput">&nbsp;Scale:&nbsp;</label>
                                <input class="number-input" type="number" v-model="objectScale" placeholder="100" ref="widthInput" @change="scaleImage(commands.image)" @blur="commands.image(selectedImage)" />
                            </template>
                            <template v-else>
                                <label for="widthInput">&nbsp;Width:&nbsp;</label>
                                <input class="number-input" type="text" v-model="selectedImage.width" placeholder="100%" ref="widthInput" @change="scaleImage(commands.image)" @blur="commands.image(selectedImage)" />
                                <label for="heightInput">&nbsp;&nbsp;Height:&nbsp;</label>
                                <input class="number-input" type="text" v-model="selectedImage.height" placeholder="100%" ref="heightInput" @change="scaleImage(commands.image)" @blur="commands.image(selectedImage)" />&nbsp;
                                <!-- <input type="submit" value="Update"> -->
                            </template>
                            <v-btn icon small flat @click.stop.prevent="constrain=!constrain">
                                <fluro-icon :icon="constrain?`lock`:`lock-open`" />
                            </v-btn>
                        </template>
                        <template v-else>
                            <label for="widthInput">&nbsp;Size:&nbsp;</label>
                            <input class="number-input" type="number" v-model="objectScale" placeholder="100" ref="widthInput" @change="scaleImage(commands.image)" @blur="commands.image(selectedImage)" />
                        </template>
                    </form>
                </template>
                <template v-else-if="selectedVideo">
                    <form class="menububble__form" v-if="isActive.video()" @submit.prevent.stop="scaleVideo(commands.video)">
                        <!-- This function stops the page being submitted -->
                        <label for="widthInput">&nbsp;Scale:&nbsp;</label>
                        <input class="number-input" type="number" v-model="objectScale" placeholder="100" ref="widthInput" @change="scaleVideo(commands.video)" @blur="commands.video(selectedVideo)" />
                    </form>
                </template>
                <template v-else>
                    <v-menu attach v-if="isEnabled('formats')" transition="slide-y-transition" offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn small icon :disabled="showSource" v-on="on">
                                <fluro-icon icon="paragraph" />
                            </v-btn>
                        </template>
                        <div style="overflow: auto; width:300px; max-height:300px;">
                            <v-list>
                                <v-list-tile :class="{ 'active': isActive.heading({ level: 1 }) }" @click.stop.prevent="commands.heading({ level: 1 })">
                                    <v-list-tile-content><span style="margin:0 !important" class="h1">Heading 1</span></v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile :class="{ 'active': isActive.heading({ level: 2 }) }" @click.stop.prevent="commands.heading({ level: 2 })">
                                    <v-list-tile-content><span style="margin:0 !important" class="h2">Heading 2</span></v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile :class="{ 'active': isActive.heading({ level: 3 }) }" @click.stop.prevent="commands.heading({ level: 3 })">
                                    <v-list-tile-content><span style="margin:0 !important" class="h3">Heading 3</span></v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile :class="{ 'active': isActive.heading({ level: 4 }) }" @click.stop.prevent="commands.heading({ level: 4 })">
                                    <v-list-tile-content><span style="margin:0 !important" class="h4">Heading 4</span></v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile :class="{ 'active': isActive.heading({ level: 5 }) }" @click.stop.prevent="commands.heading({ level: 5 })">
                                    <v-list-tile-content><span style="margin:0 !important" class="h5">Heading 5</span></v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile :class="{ 'active': isActive.typography({ level:option.level}) }" v-for="option in typographyOptions" :key="option.title" @click.stop.prevent="commands.typography({ level:option.level })">
                                    <v-list-tile-content><span style="margin:0 !important" :class="option.level">{{option.title}}</span></v-list-tile-content>
                                </v-list-tile>
                                <template v-if="false">
                                    <v-list-tile @click.stop.prevent="commands.fluroNode(option)" v-for="option in getFluroNodes()" :key="option.title">
                                        <v-list-tile-content><span style="margin:0 !important" :class="option.className">{{option.title}}</span></v-list-tile-content>
                                    </v-list-tile>
                                </template>
                                <!-- <template v-if="getFluroMarks().length"> -->
                                <template v-if="false">
                                    <v-list-tile @click.stop.prevent="commands.fluroMark(option)" v-for="option in getFluroMarks()" :key="option.title">
                                        <v-list-tile-content><span style="margin:0 !important" :class="option.class">{{option.title}}</span></v-list-tile-content>
                                    </v-list-tile>
                                </template>
                            </v-list>
                        </div>
                    </v-menu>
                    <v-btn icon small flat :class="{ 'active': isActive.bold() }" @click.stop.prevent="commands.bold">
                        <fluro-icon icon="bold" />
                    </v-btn>
                    <v-btn icon small flat :class="{ 'active': isActive.italic() }" @click.stop.prevent="commands.italic">
                        <fluro-icon icon="italic" />
                    </v-btn>
                    <v-btn icon small flat :class="{ 'active': isActive.underline() }" @click.stop.prevent="commands.underline">
                        <fluro-icon icon="underline" />
                    </v-btn>
                    <template v-if="isEnabled('alignment')">
                        <v-btn icon small flat :class="{ 'active': isActive.alignment({ textAlign: 'left' }) }" @click.stop.prevent="commands.alignment({ textAlign: 'left' })">
                            <fluro-icon icon="align-left" />
                        </v-btn>
                        <v-btn icon small flat :class="{ 'active': isActive.alignment({ textAlign: 'center' }) }" @click.stop.prevent="commands.alignment({ textAlign: 'center' })">
                            <fluro-icon icon="align-center" />
                        </v-btn>
                        <v-btn icon small flat :class="{ 'active': isActive.alignment({ textAlign: 'right' }) }" @click.stop.prevent="commands.alignment({ textAlign: 'right' })">
                            <fluro-icon icon="align-right" />
                        </v-btn>
                    </template>
                    <!-- <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkattrs)">
                        <label for="widthInput">&nbsp;URL:&nbsp;</label>
                        <input class="link-input" type="text" v-model="linkattrs.href" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu" />
                        <label for="widthInput">&nbsp;Target:&nbsp;</label>
                        <input class="link-input" type="text" v-model="linkattrs.target" placeholder="_blank" ref="linkInput" @keydown.esc="hideLinkMenu" />
                        <label for="widthInput">&nbsp;Class:&nbsp;</label>
                        <input class="link-input" type="text" v-model="linkattrs.class" placeholder="" ref="linkInput" @keydown.esc="hideLinkMenu" />
                        <v-btn icon small flat @click.stop.prevent="setLinkUrl(commands.link, linkattrs)">
                            <fluro-icon icon="check" />
                        </v-btn>
                        <v-btn icon small flat @click.stop.prevent="popupLinkSelector(commands.link)">
                            <fluro-icon icon="plus" />
                        </v-btn>
                        <v-btn small icon flat @click.stop.prevent="setLinkUrl(commands.link, null)">
                            <fluro-icon icon="unlink" />
                        </v-btn>
                    </form> -->
                    <!-- <template v-else> -->
                    <template v-if="isActive.link()">
                        <v-btn v-tippy content="Link options" small flat @click.stop.prevent="showLinkMenu(commands.link, getMarkAttrs('link'))">
                            <!-- Link Options -->
                            <!-- <span>{{ isActive.link() ? 'Update Link' : 'Link'}}</span> -->
                            <fluro-icon icon="link" />
                        </v-btn>
                    </template>
                    <v-btn v-else v-tippy content="Add link" small flat @click.stop.prevent="addLinkMenu(commands.link, getMarkAttrs('link'))">
                        <!-- Add Link -->
                        <!-- <span>{{ isActive.link() ? 'Update Link' : 'Link'}}</span> -->
                        <fluro-icon icon="link" />
                    </v-btn>
                    <!-- </template> -->
                </template>
            </div>
        </editor-menu-bubble>
        <editor-menu-bar :editor="editor" v-if="barEnabled">
            <div class="fluro-editor-toolbar" slot-scope="{ commands, isActive }">
                <v-btn v-if="isEnabled('source')" icon small flat class="hidden-xs-only" :class="{ 'is-active':showSource }" @click.stop.prevent="showSource = !showSource">
                    <fluro-icon v-if="showSource" icon="edit" />
                    <fluro-icon v-else icon="code" />
                </v-btn>
                <v-menu v-if="isEnabled('formats')" :fixed="true" transition="slide-y-transition" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn small icon :disabled="showSource" v-on="on">
                            <!-- H1 -->
                            <fluro-icon icon="paragraph" />
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile :class="{ 'active': isActive.heading({ level: 1 }) }" @click.stop.prevent="commands.heading({ level: 1 })">
                            <v-list-tile-content><span style="margin:0 !important" class="h1">Heading 1</span></v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile :class="{ 'active': isActive.heading({ level: 2 }) }" @click.stop.prevent="commands.heading({ level: 2 })">
                            <v-list-tile-content><span style="margin:0 !important" class="h2">Heading 2</span></v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile :class="{ 'active': isActive.heading({ level: 3 }) }" @click.stop.prevent="commands.heading({ level: 3 })">
                            <v-list-tile-content><span style="margin:0 !important" class="h3">Heading 3</span></v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile :class="{ 'active': isActive.heading({ level: 4 }) }" @click.stop.prevent="commands.heading({ level: 4 })">
                            <v-list-tile-content><span style="margin:0 !important" class="h4">Heading 4</span></v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile :class="{ 'active': isActive.heading({ level: 5 }) }" @click.stop.prevent="commands.heading({ level: 5 })">
                            <v-list-tile-content><span style="margin:0 !important" class="h5">Heading 5</span></v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile :class="{ 'active': isActive.typography({ level:option.level}) }" v-for="option in typographyOptions" @click.stop.prevent="commands.typography({ level:option.level })" :key="option.title">
                            <v-list-tile-content><span style="margin:0 !important" :class="option.level">{{option.title}}</span></v-list-tile-content>
                        </v-list-tile>
                        <!-- <template v-if="getFluroNodes().length"> -->
                        <template v-if="false">
                            <v-list-tile @click.stop.prevent="commands.fluroNode(option)" v-for="option in getFluroNodes()" :key="option.title">
                                <v-list-tile-content><span style="margin:0 !important" :class="option.className">{{option.title}}</span></v-list-tile-content>
                            </v-list-tile>
                        </template>
                        <!-- <template v-if="getFluroMarks().length"> -->
                        <template v-if="false">
                            <v-list-tile @click.stop.prevent="commands.fluroMark(option)" v-for="option in getFluroMarks()" :key="option.title">
                                <v-list-tile-content><span style="margin:0 !important" :class="option.class">{{option.title}}</span></v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-menu>
                <v-btn v-if="isEnabled('bold')" icon :disabled="showSource" small flat :class="{ 'active': isActive.bold() }" @click.stop.prevent="commands.bold">
                    <fluro-icon icon="bold" />
                </v-btn>
                <v-btn v-if="isEnabled('italic')" icon :disabled="showSource" small flat :class="{ 'active': isActive.italic() }" @click.stop.prevent="commands.italic">
                    <fluro-icon icon="italic" />
                </v-btn>
                <v-btn v-if="isEnabled('underline')" icon :disabled="showSource" small flat :class="{ 'active': isActive.underline() }" @click.stop.prevent="commands.underline">
                    <fluro-icon icon="underline" />
                </v-btn>
                <!-- <v-btn icon :disabled="showSource" small flat :class="{ 'active': isActive.strike() }" @click.stop.prevent="commands.strike">
                    <v-icon>format_strikethrough</v-icon>
                </v-btn> -->
                <v-menu v-if="tokens.length" :fixed="true" transition="slide-y-transition" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn small :disabled="showSource" v-on="on">
                            Tokens
                        </v-btn>
                    </template>
                    <v-list dense>
                        <v-list-tile @click="commands.token(token.key)" :key="token.key" v-for="token in tokens">
                            <v-list-tile-content><span style="margin:0 !important">{{token.title}}</span></v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-menu v-if="isEnabled('image') || isEnabled('video') || isEnabled('blockquote') || isEnabled('code_block') || isEnabled('horizontal_rule')" :fixed="true" transition="slide-y-transition" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn small icon :disabled="showSource" v-on="on">
                            <fluro-icon icon="plus" />
                        </v-btn>
                    </template>
                    <v-list dense>
                        <!-- <v-list-tile @click.stop.prevent="showAssetPrompt(commands.asset)">
                            <v-list-tile-content><span style="margin:0 !important" ><fluro-icon type="asset" />&nbsp;Add Asset Link</span></v-list-tile-content>
                        </v-list-tile> -->
                        <v-list-tile v-if="isEnabled('image')" @click.stop.prevent="showImagePrompt(commands.image)">
                            <v-list-tile-content><span style="margin:0 !important">
                                    <fluro-icon type="image" />&nbsp;Add Image</span></v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-if="isEnabled('video')" @click.stop.prevent="showVideoPrompt(commands.video)">
                            <v-list-tile-content><span style="margin:0 !important">
                                    <fluro-icon type="video" />&nbsp;Add Video</span></v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile :class="{ 'active': isActive.blockquote() }" @click.stop.prevent="commands.blockquote">
                            <v-list-tile-content><span style="margin:0 !important">
                                    <fluro-icon icon="quote-right" />&nbsp;Blockquote</span></v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile :class="{ 'active': isActive.code_block() }" @click.stop.prevent="commands.code_block">
                            <v-list-tile-content><span style="margin:0 !important">
                                    <fluro-icon icon="code" />&nbsp;Code</span></v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile :class="{ 'active': isActive.horizontal_rule() }" @click.stop.prevent="commands.horizontal_rule">
                            <v-list-tile-content><span style="margin:0 !important">
                                    <fluro-icon icon="horizontal-rule" />&nbsp;Horizontal Rule</span></v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <!-- <pre>{{typographyOptions}}</pre> -->
                <!-- <button class="menubar__button" :class="{ 'active': isActive.typography({ level: 'text-muted' }) }" @click="commands.typography({ level: 'text-muted' })">Muted</button> -->
                <!-- <button class="menubar__button" :class="{ 'active': isActive.typography({ level: 'lead' }) }" @click="commands.typography({ level: 'lead' })">Lead</button> -->
                <!-- 
                <v-btn icon :disabled="showSource" small flat :class="{ 'active': isActive.heading({ level: 1 }) }" @click.stop.prevent="commands.heading({ level: 1 })">
                    H1
                </v-btn>
                <v-btn icon :disabled="showSource" small flat :class="{ 'active': isActive.heading({ level: 2 }) }" @click.stop.prevent="commands.heading({ level: 2 })">
                    H2
                </v-btn>
                <v-btn icon :disabled="showSource" small flat :class="{ 'active': isActive.heading({ level: 3 }) }" @click.stop.prevent="commands.heading({ level: 3 })">
                    H3
                </v-btn>
                <v-btn icon :disabled="showSource" small flat :class="{ 'active': isActive.heading({ level: 4 }) }" @click.stop.prevent="commands.heading({ level: 4 })">
                    H4
                </v-btn>
                <v-btn icon :disabled="showSource" small flat :class="{ 'active': isActive.heading({ level: 5 }) }" @click.stop.prevent="commands.heading({ level: 5 })">
                    H5
                </v-btn> -->
                <!-- <v-btn icon :disabled="showSource" small flat :class="{ 'active': isActive.code_block() }" @click.stop.prevent="commands.code_block">
                        <v-icon>code</v-icon>
                    </v-btn> -->
                <!--  -->
                <!--  -->
                <v-btn icon v-if="isEnabled('list')" :disabled="showSource" small flat :class="{ 'active': isActive.bullet_list() }" @click.stop.prevent="commands.bullet_list">
                    <fluro-icon icon="list-ul" />
                </v-btn>
                <v-btn icon v-if="isEnabled('list')" :disabled="showSource" small flat :class="{ 'active': isActive.ordered_list() }" @click.stop.prevent="commands.ordered_list">
                    <fluro-icon icon="list-ol" />
                </v-btn>
                <template v-if="isEnabled('alignment')">
                    <v-btn icon small flat :disabled="showSource" :class="{ 'active': isActive.alignment({ textAlign: 'left' }) }" @click.stop.prevent="commands.alignment({ textAlign: 'left' })">
                        <fluro-icon icon="align-left" />
                    </v-btn>
                    <v-btn icon small flat :disabled="showSource" :class="{ 'active': isActive.alignment({ textAlign: 'center' }) }" @click.stop.prevent="commands.alignment({ textAlign: 'center' })">
                        <fluro-icon icon="align-center" />
                    </v-btn>
                    <v-btn icon small flat :disabled="showSource" :class="{ 'active': isActive.alignment({ textAlign: 'right' }) }" @click.stop.prevent="commands.alignment({ textAlign: 'right' })">
                        <fluro-icon icon="align-right" />
                    </v-btn>
                </template>
                <!--  -->
                <!--  <v-btn icon class="hidden-xs-only" :disabled="showSource" small flat @click.stop.prevent="commands.undo">
                    <v-icon>undo</v-icon>
                </v-btn>
                <v-btn icon class="hidden-xs-only" :disabled="showSource" small flat @click.stop.prevent="commands.redo">
                    <v-icon>redo</v-icon>
                </v-btn> -->
                <!-- <v-btn icon v-if="isEnabled('code')" :disabled="showSource" small flat :class="{ 'active': isActive.code_block() }" @click.stop.prevent="commands.code_block">
                    <fluro-icon icon="file-code" />
                </v-btn> -->
                <v-menu v-if="isEnabled('table')" :fixed="true" transition="slide-y-transition" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn small class="hidden-xs-only" icon :disabled="showSource" v-on="on">
                            <!-- <v-icon>grid_on</v-icon> -->
                            <fluro-icon icon="table" />
                        </v-btn>
                    </template>
                    <v-list dense>
                        <v-list-tile @click.stop.prevent="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })">
                            <!-- <fluro-icon icon="table"/> -->
                            <v-list-tile-title>Insert Table</v-list-tile-title>
                        </v-list-tile>
                        <span v-if="isActive.table()">
                            <!-- <v-subheader>Row</v-subheader> -->
                            <v-list-tile @click.stop.prevent="commands.addRowBefore">
                                <v-list-tile-content>
                                    Insert Row Before
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile @click.stop.prevent="commands.addRowAfter">
                                <v-list-tile-content>
                                    Insert Row After
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile @click.stop.prevent="commands.deleteRow">
                                <v-list-tile-content>
                                    Delete Row
                                </v-list-tile-content>
                            </v-list-tile>
                            <!-- <v-subheader>Column</v-subheader> -->
                            <v-list-tile @click.stop.prevent="commands.addColumnBefore">
                                <v-list-tile-content>
                                    Insert Column Before
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile @click.stop.prevent="commands.addColumnAfter">
                                <v-list-tile-content>
                                    Insert Column After
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile @click.stop.prevent="commands.deleteColumn">
                                <v-list-tile-content>
                                    Delete Column
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider></v-divider>
                            <v-divider></v-divider>
                            <!-- <v-subheader>Actions</v-subheader> -->
                            <v-list-tile @click.stop.prevent="commands.toggleCellMerge">
                                <v-list-tile-content>
                                    Combine Cells
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider></v-divider>
                            <v-list-tile @click.stop.prevent="commands.deleteTable">
                                <v-list-tile-content>
                                    Delete table
                                </v-list-tile-content>
                            </v-list-tile>
                        </span>
                    </v-list>
                </v-menu>
            </div>
        </editor-menu-bar>
        <template v-if="showSource">
            <div class="editor-code-wrapper">
                <fluro-code-editor @blur="blurCode" @focus="focusCode" class="fluro-editor-textarea" @input="sourceChange" v-model="model" lang="html" :height="codeEditorHeight"></fluro-code-editor>
            </div>
        </template>
        <template v-if="!showSource">
            <editor-content class="fluro-editor-textarea" :editor="editor" />
            <!-- Suggestions -->
            <div class="suggestion-list" v-show="showSuggestions" ref="suggestions">
                <template v-if="filteredUsers.length">
                    <!-- <pre>{{filteredUsers}}</pre> -->
                    <div v-for="(persona, index) in filteredUsers" :key="persona._id" class="suggestion-list__item" :class="{ 'is-selected': navigatedUserIndex === index }" @click.stop.prevent="selectUser(persona)">
                        <fluro-avatar left :id="persona" type="persona" />{{ persona.title }}
                    </div>
                </template>
                <div v-else class="suggestion-list__item is-empty">
                    No users found
                </div>
            </div>
        </template>
    </div>
</template>
<script>
// Import the editor

import tippy, { sticky } from 'tippy.js'
import FluroCodeEditor from './FluroCodeEditor.vue';
import Mention from './tiptap/mentions.js';
import FluroNode from './tiptap/fluroNode';
import FluroMark from './tiptap/fluroMark';
import Asset from './tiptap/asset';
import Image from './tiptap/image';
import Video from './tiptap/video';
import Token from './tiptap/token';
import Alignment from './tiptap/alignment';
import Typography from './tiptap/typography';

// import FluroEditorLinkModal from './FluroEditorLinkModal.vue';
import Link from './tiptap/customlink.js'

// import hljs from 'highlight.js/lib/highlight';
// import html from 'highlight.js/lib/languages/html';

/**
import scss from 'highlight.js/lib/languages/scss';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
/**/


import { Editor, EditorContent, EditorMenuBubble, EditorMenuBar, EditorFloatingMenu, Mark } from 'tiptap'
import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    // Mention,
    HorizontalRule,
    OrderedList,
    // Image,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    //Link,  //Use the CustomLink class instead
    Strike,
    Underline,
    History,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    Placeholder,
    CodeBlockHighlight,
} from 'tiptap-extensions';


export default {
    data() {
        return {
            constrain: true,
            keepInBounds: true,
            showSource: false,
            model: this.value,
            editor: null,
            //Mentions
            query: null,
            suggestionRange: null,
            filteredUsers: [],
            navigatedUserIndex: 0,
            insertMention: () => {},

            // observer: null,
            linkattrs: {
                href: null,
                target: null,
                class: null
            },
            linkMenuIsActive: false,
            TypographyPlugin: new Typography(),
            FluroNodePlugin: new FluroNode(),
            FluroMarkPlugin: new FluroMark(),
            selectedImage: null,
            selectedVideo: null,
            scale: 100,
            selectedNode: null,
        }
    },
    computed: {
        objectScale: {
            get() {
                return this.scale
            },
            set(scale) {
                scale = Math.min(scale, 200)
                scale = Math.max(scale, 0)
                this.scale = scale
            }
        },
        proEnabled() {
            return this.$pro && this.$pro.enabled
        },
        typographyOptions() {
            return this.TypographyPlugin.options.levels;
        },
        tokens() {
            return this.options.tokens || [];
        },
        barEnabled() {
            return !(this.options.disable && this.options.disable.bar);
        },
        bubbleEnabled() {
            return !(this.options.disable && this.options.disable.bubble);
        },
        showSuggestions() {
            return this.query || this.hasResults
        },
        specialityBubbleMenu() {
            return this.selectedImage || this.selectedVideo
        }
    },
    methods: {
        isEnabled(tool) {

            //If we've specified a toolset
            if (this.options.toolset) {
                return _.includes(this.options.toolset, tool);
            } else {

                switch (tool) {
                    case 'image':
                    case 'video':
                        if (this.$fluro.global.select) {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                }
                return true;
            }
        },
        select() {
            //console.log('SELECT EDITOR')
        },
        hideBubble() {
            this.hideLinkMenu();
            this.hideImageMenu();
            this.hideVideoMenu();
        },
        addFluroNode(cssClass) {
            var pluginOptions = this.FluroNodePlugin.options.classes
            if (pluginOptions.indexOf(cssClass) === -1) {
                pluginOptions.push(cssClass)
            }
        },
        getFluroNodes() {
            return this.FluroNodePlugin.options.classes
        },
        addFluroMark(cssClass) {
            var pluginOptions = this.FluroMarkPlugin.options.classes
            if (pluginOptions.indexOf(cssClass) === -1) {
                pluginOptions.push(cssClass)
            }
        },
        getFluroMarks() {
            return this.FluroMarkPlugin.options.classes
        },
        addLinkMenu(command, attrs) {

            var self = this;



            self.$fluro.options([{
                        title: 'Website or URL',
                        value: ''
                    },
                    {
                        title: 'Asset / File',
                        value: 'asset',
                    },
                    {
                        title: 'Audio file',
                        value: 'audio',
                    },
                    // {
                    //     title: 'Video',
                    //     value: 'video',
                    // },
                    // {
                    //     title: 'Image',
                    //     value: 'image',
                    // },

                ], 'Add Link')
                .then(function(res) {
                    //console.log('RES', res)

                    switch (res.value) {
                        case 'asset':
                        case 'image':
                        case 'audio':
                        case 'video':

                            return self.$fluro.global.select(res.value, {
                                    title: 'Select file',
                                    minimum: 1,
                                    maximum: 1,
                                    allDefinitions: true,
                                }, true)
                                .then(function(files) {

                                    var firstFile = files[0];
                                    var href = self.$fluro.asset.downloadUrl(firstFile, { withoutToken: true })

                                    //console.log('HREF IS', href)
                                    self.showLinkMenu(command, attrs, {
                                        href,
                                        target: attrs.target,
                                        class: attrs.class,
                                    });
                                })

                            break;
                        default:
                            self.showLinkMenu(command, attrs, {
                                href: '',
                                target: attrs.target,
                                class: attrs.class,
                            });
                            break;
                    }
                });
        },
        showLinkMenu(command, attrs, model) {

            if (!model) {
                model = {
                    href: attrs.href,
                    target: attrs.target,
                    class: attrs.class,
                }
            }


            var self = this;

            self.$fluro.prompt([{
                        title: 'URL',
                        key: 'href',
                        type: 'url',
                        placeholder: 'https://www.something.com/',
                        minimum: 1,
                        maximum: 1,
                        defaultValues: ['https://'],
                        params: {
                            autofocus: true,
                        },
                        //directive:'url',
                    },

                    {
                        title: 'Open in',
                        key: 'target',
                        type: 'string',
                        directive: 'select',
                        minimum: 0,
                        maximum: 1,
                        defaultValues: [''],
                        options: [{
                                name: 'Same Window',
                                value: '',
                            },
                            {
                                name: 'New Window',
                                value: '_blank',
                            },
                        ]
                    },

                    {
                        title: 'Style',
                        key: 'class',
                        type: 'string',
                        directive: 'select',
                        minimum: 0,
                        maximum: 1,
                        options: [{
                                name: 'None',
                                value: '',
                            },
                            {
                                name: 'Extra Small Button',
                                value: 'btn btn-standard btn-primary btn-xs',
                            },
                            {
                                name: 'Small Button',
                                value: 'btn btn-standard btn-primary btn-sm',
                            },
                            {
                                name: 'Regular Button',
                                value: 'btn btn-standard btn-primary btn-md',
                            },
                            {
                                name: 'Large Button',
                                value: 'btn btn-standard btn-primary btn-lg',
                            },
                            {
                                name: 'Extra Large Button',
                                value: 'btn btn-standard btn-primary btn-xl',
                            },


                        ]
                    },
                ], 'Link Options', model)
                .then(function(res) {


                    if (!res.target) {
                        res.target = '';
                    }

                    if (!res.class) {
                        res.class = '';
                    }


                    self.setLinkUrl(command, res);
                    // this.linkattrs = attrs
                    // this.linkMenuIsActive = true
                    // this.$nextTick(() => {
                    //     this.$refs.linkInput.focus()
                    // })

                })





            // this.linkattrs = attrs
            // this.linkMenuIsActive = true
            // this.$nextTick(() => {
            //     this.$refs.linkInput.focus()
            // })

            // self.$fluro.modal({
            //     component: FluroEditorLinkModal,
            //     options: {
            //         attrs,
            //         // selector: instance, //Vue(FluroSelector),
            //         // type: definedType,
            //         // allDefinitions: options.allDefinitions,
            //         // searchInheritable: options.searchInheritable,
            //         // filter: options.filter,
            //     }
            // })



            // self.$fluro.
            // this.linkattrs = attrs
            // this.linkMenuIsActive = true
            // this.$nextTick(() => {
            //     this.$refs.linkInput.focus()
            // })
        },
        hideLinkMenu() {
            this.linkattrs = {
                href: null,
                class: null,
                target: null
            }
            this.linkMenuIsActive = false
        },
        // popupLinkSelector(command) {
        //     var self = this
        //     self.$fluro.global.select('asset', {
        //             title: 'Select an Image/Photo',
        //             minimum: 1,
        //             maximum: 1,
        //             allDefinitions: true,
        //         }, true)
        //         .then(function(res) {
        //             if (res) {
        //                 ////console.log("res", res)
        //                 var first = _.first(res)

        //                 self.setLinkUrl(command, {
        //                     href: self.$fluro.asset.downloadUrl(first, { withoutToken: true }),
        //                     class: null,
        //                     target: null,
        //                 })
        //             }
        //         })


        // },
        setLinkUrl(command, linkattrs) {
            command(linkattrs)
            this.hideLinkMenu()
            this.editor.focus()
        },
        showImageMenu(attrs) {
            ////console.log("Image attrs",attrs)
            if (attrs.width.includes("%")) {
                this.scale = parseInt(attrs.width)
            }
            this.selectedImage = attrs
        },
        hideImageMenu() {
            this.selectedImage = null;
            this.selectedNode = null
        },
        updateImage(command) {
            ////console.log("performing Update")
            command(this.selectedImage)
            this.hideImageMenu()
            this.editor.focus()
        },
        scaleImage(command) {
            this.selectedImage.width = `${this.scale}%`
            this.selectedImage.height = 'auto'
            this.selectedNode.height = this.selectedImage.height
            this.selectedNode.width = this.selectedImage.width
        },
        showVideoMenu(attrs) {
            if (attrs.width.includes("%")) {
                this.scale = parseInt(attrs.width)
            }
            this.selectedVideo = attrs
        },
        hideVideoMenu() {
            this.selectedVideo = null;
            this.selectedNode = null
        },
        updateVideo(command) {
            ////console.log("performing Update")
            command(this.selectedVideo)
            this.hideVideoMenu()
            this.editor.focus()
        },
        scaleVideo(command) {
            this.selectedVideo.width = `${this.scale}%`
            this.selectedNode.width = this.selectedVideo.width
        },
        blurEditor($event) {
            // //console.log('BLUR EDITOR')
            this.$emit('blur');

        },
        focusEditor($event) {
            // //console.log('FOCUS EDITOR')
            this.$emit('focus');

        },

        blurCode($event) {
            // //console.log('BLUR CODE')
            this.$emit('blur');

        },
        focusCode($event) {
            // //console.log('FOCUS CODE')
            this.$emit('focus');

        },


        sourceChange(input) {
            this.model = input;
        },
        showAssetPrompt(command) {
            var self = this;

            self.$fluro.global.select('asset', {
                    title: 'Select assets',
                    minimum: 0,
                    maximum: 0,
                    allDefinitions: true,
                }, true)
                .then(function(res) {
                    if (res) {

                        // var first = _.first(res)
                        _.each(res, function(item) {
                            command({ item })
                        })

                    }
                })


            // const src = prompt('Enter the url of your image here')
            // if (src !== null) {
            //     command({ src })
            // }
        },
        showImagePrompt(command) {
            var self = this;

            self.hideImageMenu()

            self.$fluro.global.select('image', {
                    title: 'Select an Image/Photo',
                    minimum: 1,
                    maximum: 1,
                    allDefinitions: true,
                }, true)
                .then(function(res) {
                    if (res) {
                        ////console.log("res", res)
                        var first = _.first(res)

                        command({
                            item: first._id,
                            width: "100%",
                            height: "auto",
                        })
                    }
                })


            // const src = prompt('Enter the url of your image here')
            // if (src !== null) {
            //     command({ src })
            // }
        },
        showVideoPrompt(command) {
            var self = this;

            self.$fluro.global.select('video', {
                    title: 'Select a Video',
                    minimum: 1,
                    maximum: 1,
                    allDefinitions: true,
                }, true)
                .then(function(res) {
                    if (res) {
                        var first = _.first(res)
                        command({ item: first._id, width: "100%" })
                    }
                })


            // const src = prompt('Enter the url of your image here')
            // if (src !== null) {
            //     command({ src })
            // }
        },
        addToken(command, key) {
            command(key)

        },
        // navigate to the previous item
        // if it's the first item, navigate to the last one
        upHandler() {
            this.navigatedUserIndex = ((this.navigatedUserIndex + this.filteredUsers.length) - 1) % this.filteredUsers.length
        },
        // navigate to the next item
        // if it's the last item, navigate to the first one
        downHandler() {
            this.navigatedUserIndex = (this.navigatedUserIndex + 1) % this.filteredUsers.length
        },
        enterHandler() {
            const user = this.filteredUsers[this.navigatedUserIndex]
            if (user) {
                this.selectUser(user)
            }

            this.popup = null;
        },
        // we have to replace our suggestion text with a mention
        // so it's important to pass also the position of your suggestion text
        selectUser(user) {

            ////console.log('SELECT USER', user);

            this.insertMention({
                range: this.suggestionRange,
                attrs: {
                    id: user._id,
                    mentionID: user.mentionID,
                    label: user.firstName,
                },
            })
            this.editor.focus()
        },



        // renderPopup(node) {
        //     if (this.popup) {
        //         return
        //     }
        //     // ref: https://atomiks.github.io/tippyjs/v6/all-props/
        //     this.popup = tippy('.page', {
        //         content: this.$refs.suggestions,
        //         getReferenceClientRect: node.getBoundingClientRect(),
        //         appendTo: () => document.body,
        //         interactive: true,
        //         sticky: true, // make sure position of tippy is updated when content changes
        //         plugins: [sticky],
        //         content: this.$refs.suggestions,
        //         trigger: 'mouseenter', // manual
        //         showOnCreate: true,
        //         theme: 'dark',
        //         placement: 'top-start',
        //         inertia: true,
        //         duration: [400, 200],
        //     })
        // },
        renderPopup(node) {


            var self = this;

            if (self.popup) {
                return
            }

            var referenceElement = this.$refs.suggestions;
            // //console.log('Reference Element', referenceElement)
            // ref: https://atomiks.github.io/tippyjs/v6/all-props/



            var suggestionElement = document.querySelector('.mention-suggestion') || node;
            var textArea = self.$el || document.body;
            var domRect = suggestionElement.getBoundingClientRect();
            if (!domRect) {
                return;
            }






            // //console.log('NODE', node);
            // '.fluro-editor-textarea',
            this.popup = tippy('.mention-suggestion', {
                content: referenceElement,
                offset: [domRect.x + domRect.width, domRect.y + domRect.height],
                //getReferenceClientRect: suggestionElement.getBoundingClientRect,
                // appendTo: () => textArea,
                appendTo: document.body,
                interactive: true,
                sticky: true, // make sure position of tippy is updated when content changes
                plugins: [sticky],
                // trigger: 'mouseenter', // manual
                showOnCreate: true,
                theme: 'dark',
                // placement: 'bottom-end',
                inertia: true,
                duration: [400, 200],
                allowHTML: true,
                zIndex: 999999999999,
            })
        },
        destroyPopup() {

            if (this.popup) {
                if (this.popup[0]) {
                    this.popup[0].destroy();
                }
            }

            this.popup = null

            console.log('DESTROY')
        },



    },
    props: {
        'codeEditorHeight': {
            default: 600,
            type: Number,
        },
        'value': {
            default: '',
            type: String,
        },
        'placeholder': {
            type: String,
        },
        'options': {
            default: function() {
                return {}
            },
            type: Object,
        },
    },
    // watch: {
    //     "selectedImage.width+selectedImage.height": function(){
    //         console.log("New stuff", this.selectedImage, this.commands.image)
    //         this.updateImage(this.commands.image)
    //     },
    //     "selectedImage": function(){
    //         console.log("New stuff", this.selectedImage, this.commands.image)
    //         this.updateImage(this.commands.image)
    //     }
    // },
    components: {
        EditorMenuBar,
        EditorContent,
        FluroCodeEditor,
        EditorFloatingMenu,
        EditorMenuBubble,
        FluroNode,
        FluroMark,
    },
    created() {
        var self = this;
        var placeholderText = self.placeholder;


        ////////////////////////////////////////////

        /**
                var MentionPlugin = new Mention({
                    // a list of all suggested items
                    items: function() {
                        return [];
                    },
                    onEnter(props) {
                        var {
                            items,
                            query,
                            range,
                            command,
                            virtualNode,
                        } = props;

                        self.query = query
                        self.filteredUsers = items
                        self.suggestionRange = range
                        self.renderPopup(virtualNode)
                        // we save the command for inserting a selected mention
                        // self allows us to call it inside of our custom popup
                        // via keyboard navigation and on click
                        self.insertMention = command
                        console.log('onEnter');
                    },
                    // is called when a suggestion has changed
                    onChange(props) {

                        var {
                            items,
                            query,
                            range,
                            command,
                            virtualNode,
                        } = props;

                        var mentionInstance = this;

                        console.log('On Change')

                        self.$fluro.content.mention(query, self.options.mentions).then(function(personas) {
                                mentionInstance.query = query
                                mentionInstance.filteredUsers = personas
                                mentionInstance.suggestionRange = range
                                mentionInstance.navigatedUserIndex = 0
                                mentionInstance.renderPopup(virtualNode)
                            })
                            .catch(function(err) {
                                console.log('Error', err);
                                // this.query = query
                                // this.filteredUsers = items
                                // this.suggestionRange = range
                                // this.navigatedUserIndex = 0
                                // this.renderPopup(virtualNode)
                            });
                    },
                    // is called when a suggestion is cancelled
                    onExit() {

                        console.log('onExit')
                        // reset all saved values
                        self.query = null
                        self.filteredUsers = []
                        self.suggestionRange = null
                        self.navigatedUserIndex = 0
                        self.destroyPopup()
                    },
                    // is called on every keyDown event while a suggestion is active
                    onKeyDown(props) {
                        var { event } = props;
                        // pressing up arrow
                        if (event.keyCode === 38) {
                            self.upHandler()
                            return true
                        }
                        // pressing down arrow
                        if (event.keyCode === 40) {
                            self.downHandler()
                            return true
                        }
                        // pressing enter
                        if (event.keyCode === 13) {
                            self.enterHandler()
                            return true
                        }
                        return false
                    },
                });

        /**/



        var MentionExtension = new Mention({
            // a list of all suggested items
            // items: async () => {
            //     await new Promise(resolve => {
            //         setTimeout(resolve, 500)
            //     })
            //     return [
            //         // { id: 1, name: '' },
            //         // { id: 2, name: 'Patrick Baber' },
            //         // { id: 3, name: 'Nick Hirche' },
            //         // { id: 4, name: 'Philip Isik' },
            //         // { id: 5, name: 'Timo Isik' },
            //         // { id: 6, name: 'Philipp Kühn' },
            //         // { id: 7, name: 'Hans Pagel' },
            //         // { id: 8, name: 'Sebastian Schrama' },
            //     ]
            // },
            items() {
                return [];
            },
            // allowSpaces: false,
            // is called when a suggestion starts
            onEnter: ({
                items,
                query,
                range,
                command,
                virtualNode,
            }) => {

                //console.log('EVENT > ON ENTER')
                this.query = query
                this.filteredUsers = items
                this.suggestionRange = range
                this.renderPopup(virtualNode)
                // we save the command for inserting a selected mention
                // this allows us to call it inside of our custom popup
                // via keyboard navigation and on click
                this.insertMention = command
            },
            // is called when a suggestion has changed
            onChange: _.debounce(async ({
                items,
                query,
                range,
                virtualNode,
            }) => {

                var scope = this;

                return new Promise(function(resolve, reject) {


                    self.$fluro.content.mention(query, self.options.mentions)
                        .then(function(items) {
                            //console.log('EVENT > ON CHANGE')
                            scope.query = query
                            scope.filteredUsers = items
                            scope.suggestionRange = range
                            scope.navigatedUserIndex = 0
                            scope.renderPopup(virtualNode)

                            resolve();
                        })
                        .catch(reject);
                })
            }, 400),
            // is called when a suggestion is cancelled
            onExit: () => {

                //console.log('EVENT > ON EXIT')
                // reset all saved values
                this.query = null
                this.filteredUsers = []
                this.suggestionRange = null
                this.navigatedUserIndex = 0
                this.destroyPopup()
            },
            // is called on every keyDown event while a suggestion is active
            onKeyDown: ({ event }) => {
                if (event.key === 'ArrowUp') {
                    this.upHandler()
                    return true
                }
                if (event.key === 'ArrowDown') {
                    this.downHandler()
                    return true
                }
                if (event.key === 'Enter') {
                    this.enterHandler()
                    return true
                }
                return false
            },
            // is called when a suggestion has changed
            // this function is optional because there is basic filtering built-in
            // you can overwrite it if you prefer your own filtering
            // in this example we use fuse.js with support for fuzzy search
            onFilter(items, query) {
                return items;
            }
            // onFilter:_.debounce(async (items, query) => {


            //     if (!query) {
            //         return []
            //     }
            //     // await new Promise(resolve => {
            //     //     setTimeout(resolve, 500)
            //     // })

            //     //console.log('On Filter', query)

            //     // var mentionInstance = this;

            //     return Promise.resolve(self.$fluro.content.mention(query, self.options.mentions));

            //     // return new Promise(function(resolve, reject) {

            //     //     self.$fluro.content.mention(query, self.options.mentions)
            //     //         .then(function(personas) {
            //     //             // self.query = query
            //     //             // self.filteredUsers = personas
            //     //             // self.suggestionRange = range
            //     //             // self.navigatedUserIndex = 0
            //     //             // self.renderPopup(virtualNode)

            //     //             resolve(personas);
            //     //         })
            //     //         .catch(function(err) {
            //     //             //console.log('Error', err);
            //     //             // this.query = query
            //     //             // this.filteredUsers = items
            //     //             // this.suggestionRange = range
            //     //             // this.navigatedUserIndex = 0
            //     //             // this.renderPopup(virtualNode)

            //     //             reject(err);
            //     //         });

            //     // })
            //     // return Promise.resolve(items);
            //     // resolve(items);

            //     // });

            //     // return items;
            //     // const fuse = new Fuse(items, {
            //     //     threshold: 0.2,
            //     //     keys: ['name'],
            //     // })
            //     // return fuse.search(query).map(item => item.item)
            // }, 900),
        })
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////

        var enabledExtensions = [

            new Bold(),
            new Italic(),
            new Strike(),
            new Underline(),
            new Link(),

            new Alignment(),
            new HorizontalRule(),
            new Blockquote(),
            new CodeBlock(),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3, 4] }),
            new BulletList(),
            new OrderedList(),
            new ListItem(),
            new Image(),
            new Asset(),
            new Video(),
            new Code(),
            new History(),
            new Table(),
            new TableHeader(),
            new TableCell(),
            new TableRow(),
            new Token(),
            MentionExtension,
            this.FluroNodePlugin,
            this.FluroMarkPlugin,
            this.TypographyPlugin,
            // MentionPlugin,
            new Placeholder({
                emptyClass: 'placeholder-text',
                emptyNodeText: self.placeholder,
                showOnlyWhenEditable: true,
            }),
            // new TodoItem(),
            // new TodoList()
            // new AutoLinkMark(),
            /**
            
            
            
            
            
           
            ,
            
            
            
            
            

            
            /**/
        ];
        ///////////////////////////////////


        if (process.browser) {

            if (window.hljs) {



                var json = function() { return window.hljs.getLanguage('json'); }
                var javascript = function() { return window.hljs.getLanguage('javascript'); }
                var scss = function() { return window.hljs.getLanguage('scss'); }

                // // //console.log('Got him', window.hljs, window.hljs.listLanguages());
                // // var json = window.hljs.registerLanguage('json');
                // var json1 = window.hljs.getLanguage('json');
                // // var scss = window.hljs.registerLanguage('scss');
                // // var javascript = window.hljs.registerLanguage('javascript');

                // //console.log('JSON 1', json1);
                // //console.log('JSON 2', json2);

                // var highlightLanguages = {
                //     scss,
                //     javascript,
                //     json,

                // }

                // var highlightLanguages = {
                //     javascript,
                //     json,
                //     scss,
                //     html,
                // }

                // //console.log('GOT Languages', window, highlightLanguages)
                //Add Code highlighting to the extension list
                enabledExtensions.push(new CodeBlockHighlight({
                    languages: [json, javascript, scss],
                }))
            }
        }

        ///////////////////////////////////


        //Create and set the editor
        this.editor = new Editor({
            // editorProps:[{
            //     transformPastedHTML:function(string) {
            //         ////console.log('FUNNEL', string)
            //         return string;
            //     }
            // }],
            extensions: enabledExtensions,
            onUpdate: ({ getHTML }) => {
                var HTML = getHTML();
                self.model = HTML;
                // self.$emit('input', HTML);
            },
            onBlur(event) {
                self.blurEditor();
            },
            // : self.blur,
            onFocus(event) {
                self.focusEditor();
            },
            onTransaction: (data) => {
                // //console.log(data)
                var state = data.state
                var transaction = data.transaction

                if (_.get(state, 'selection.node.type.name') == 'image') {
                    this.showImageMenu(_.get(state, 'selection.node.attrs'))
                    this.selectedNode = _.get(state, 'selection.node')
                }
                if (_.get(state, 'selection.node.type.name') == 'video') {
                    this.showVideoMenu(_.get(state, 'selection.node.attrs'))
                    this.selectedNode = _.get(state, 'selection.node')
                }

                // //console.log(JSON.stringify(this.selectedNode))
                ////console.log("OnTransaction State", state)
                // if(!_.get(this, "options.disable.bubble")) {
                //     _.set(this, "options.disable.bubble", false)
                // }
            },
            // : self.focus,
        })


        //Add the model by default
        self.editor.setContent(self.model)
    },

    watch: {
        value(val) {
            this.model = val;
        },
        placeholder(newValue) {
            this.editor.extensions.options.placeholder.emptyNodeText = newValue
        },
        model(value) {

            // so cursor doesn't jump to start on typing
            if (value !== this.editor.getHTML()) {
                ////console.log('SET CONTENT TO', this.model)
                this.editor.setContent(value)
            }

            this.$emit('input', value);



        }
    },

    beforeDestroy() {
        this.destroyPopup()

        this.editor.destroy()
    },
}

</script>
<style lang="scss">
$color-black: #000;
$color-white: #fff;


.fluro-editor {


    * {
        margin: 0;
        padding: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-touch-callout: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }




    margin-bottom: 15px;


    .text-muted {
        color: inherit;
        opacity: 0.5;
    }

    .font-xs {
        font-size: 0.7em;
    }

    .font-sm {
        font-size: 0.8em;
    }

    .font-lg {
        font-size: 1.3em;
    }

    .font-xl {
        font-size: 1.6em;
    }

    .font-xxl {
        font-size: 2em;
    }






    table {
        width: 100% !important;
        border-collapse: collapse;

        th,
        td {
            border: 1px dotted rgba(#000, 0.1) !important;
        }
    }

    .ace_editor {
        border-radius: 5px;
        overflow: hidden;
    }





    .menububble {
        position: absolute;
        display: flex;
        z-index: 20;
        background: #000;
        border-radius: 5px;
        padding: .3rem;
        margin-bottom: .5rem;
        transform: translateX(-50%);
        visibility: hidden;
        opacity: 0;
        transition: opacity .2s, visibility .2s;
        color: $color-white !important;

        &.active {
            opacity: 1;
            visibility: visible;
        }

        .v-btn {
            margin: 0;
            color: #fff;
        }


        .number-input,
        .link-input {
            background: rgba(#fff, 0.2);
            color: #fff;
            // border: 1px solid #fff;
            border-radius: 3px;
            font-size: 0.8em;
            padding: 2px 4px;
            color: #fff !important;

            &::placeholder {
                /* Firefox, Chrome, Opera */
                color: rgba(#fff, 0.5);
            }

            &:-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: rgba(#fff, 0.5);
            }

            &::-ms-input-placeholder {
                /* Microsoft Edge */
                color: rgba(#fff, 0.5);
            }
        }

        .number-input {
            width: 40px;
        }
    }


    .fluro-video-preview,
    .fluro-image-preview {
        max-width: 100%;

        img {
            display: block;
        }

        display: inline-block;
    }

    .fluro-video-preview {
        position: relative;
    }

    .fluro-video-preview::before {
        content: '\f4e1';
        z-index: 5;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 3px 15px 3px 25px;
        color: white;
        font-family: 'FontAwesome';
        font-size: 50px !important;
        background-color: rgba(23, 35, 34, 0.75);
        border-radius: 5px 5px 5px 5px;
    }

    ul,
    ol {
        padding-left: 24px;
    }

    user agent stylesheet div {
        display: block;
    }

    html {
        font-family: -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif;
        font-size: 18px;
        color: #000;
        line-height: 1.5;
    }

    .floating-menu {
        position: absolute;
        margin-top: -0.25rem;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.2s, visibility 0.2s;

        &.is-active {
            opacity: 1;
            visibility: visible;
        }
    }
}

.fluro-editor-toolbar {
    // margin-bottom: 10px;

    .v-menu {
        display: inline;
    }

    // .active {
    //     color: #ff0066;
    // }

    .v-btn {
        margin: 3px;
    }
}

.fluro-editor-textarea {
    display: flex;
    flex-direction: column;
    min-height: 200px;
    overflow: hidden;
    resize: vertical;

    .selectedCell {
        background: rgba($primary, 0.1);
    }

    &>div {
        flex: 1;
        padding: 15px;
        outline: none;
        border: 1px solid rgba(#000, 0.1);
        border-radius: 5px;
        overflow: auto;

        &:focus {
            // background: #fff;
            border: 1px solid rgba(#000, 0.4);

        }
    }

    .is-empty {
        &:before {
            opacity: 0.4;
            // display: block;
            // position: relative;
            background: #ff0066;
            content: attr(data-empty-text);
            float: left;
            // color: #aaa;
            pointer-events: none;
            height: 0;
            font-style: italic;
        }
    }



    // box-shadow: 0 2px 3px rgba(#000, 0.2);



    // ul[data-type="todo_list"] {
    //     padding-left: 0;
    // }

    // li[data-type="todo_item"] {
    //     display: flex;
    //     flex-direction: row;
    // }

    // .todo-checkbox {
    //     border: 2px solid $color-black;
    //     height: 0.9em;
    //     width: 0.9em;
    //     box-sizing: border-box;
    //     margin-right: 10px;
    //     margin-top: 0.3rem;
    //     user-select: none;
    //     -webkit-user-select: none;
    //     cursor: pointer;
    //     border-radius: 0.2em;
    //     background-color: transparent;
    //     transition: 0.4s background;
    // }

    // .todo-content {
    //     flex: 1;
    // }

    // li[data-done="true"] {
    //     text-decoration: line-through;
    // }

    // li[data-done="true"] .todo-checkbox {
    //     background-color: $color-black;
    // }

    // li[data-done="false"] {
    //     text-decoration: none;
    // }



    .tableWrapper {
        display: block;
        width: 100%;
        // background: #ff0066;

        table {
            width: 100%;
            border-collapse: collapse;


            tr,
            td {
                // outline: 1px solid #ddd;
                border: 1px solid rgba(#000, 0.2);
                padding: 10px;
            }
        }
    }

    .btn {
        text-decoration: none;
        background: rgba(#000, 0.05);
        border-radius: 100px;
    }

    .btn-xxs {
        font-size: 0.7em;
        padding: 0.25em 0.5em;
    }

    .btn-xs {
        font-size: 0.8em;
        padding: 0.5em 1em;
    }

    .btn-sm {
        font-size: 0.9em;
        padding: 0.85em 1.5em;
    }

    .btn-md {
        font-size: 1em;
        padding: 1em 2em;
    }

    .btn-lg {
        font-size: 1.2em;
        padding: 1.25em 2.5em;
    }

    .btn-xl {
        font-size: 1.3em;
        padding: 1.5em 3em;
    }

    .btn-xxl {
        font-size: 1.5em;
        padding: 1.515em 3.3em;
    }


    .mention,
    mention {
        display: inline;
        background: rgba($color-black, 0.1);
        color: rgba($color-black, 0.6);
        font-size: 0.9rem;
        font-weight: 500;
        border-radius: 9px;
        padding: 0.3rem 0.5rem;
        white-space: nowrap;
    }




    pre {
        box-shadow: none;
        border: none;
        margin: 15px 0;

        &::before {
            content: attr(data-language);
            text-transform: uppercase;
            display: block;
            text-align: right;
            font-weight: bold;
            font-size: 0.6rem;
        }

        code {
            box-shadow: none !important;
            background: #333 !important;
            color: #ccc !important;
            padding: 15px;
            display: block;


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
        }
    }



}

.mention-suggestion {
    // color: rgba($color-black, 0.6);
    border: 1px dotted $primary;
    //background: rgba($primary, 0.1);
    color: $primary;
    padding: 2px;
    border-radius: 9px;
}

.suggestion-list {
    font-family: 'font-proxima';
    padding: 0.2rem;
    border: 2px solid rgba($color-black, 0.1);
    font-size: 0.8rem;
    font-weight: bold;
    background: rgba(#000, 0.05);
    background: #fff;

    .suggestion-list__no-results {
        // &__no-results {
        padding: 0.2rem 0.5rem;
    }

    .suggestion-list__item {
        // &__item {
        border-radius: 5px;
        padding: 0.2rem 0.5rem;
        margin-bottom: 0.2rem;
        cursor: pointer;
        font-weight: normal;

        &:last-child {
            margin-bottom: 0;
        }

        &.is-selected,
        &:hover {
            font-weight: bold;
            background-color: rgba($primary, 0.1); // rgba($color-white, 0.2);
            color: $primary;
        }

        &.is-empty {
            opacity: 0.5;
        }
    }
}

.tippy-tooltip.dark-theme {
    background-color: $color-black;
    padding: 0;
    font-size: 1rem;
    text-align: inherit;
    color: $color-white;
    border-radius: 5px;

    .tippy-backdrop {
        display: none;
    }

    .tippy-roundarrow {
        fill: $color-black;
    }

    .tippy-popper[x-placement^=top] & .tippy-arrow {
        border-top-color: $color-black;
    }

    .tippy-popper[x-placement^=bottom] & .tippy-arrow {
        border-bottom-color: $color-black;
    }

    .tippy-popper[x-placement^=left] & .tippy-arrow {
        border-left-color: $color-black;
    }

    .tippy-popper[x-placement^=right] & .tippy-arrow {
        border-right-color: $color-black;
    }
}

</style>
