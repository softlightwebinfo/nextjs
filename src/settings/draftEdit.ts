import {Editor, fontSize, bold, italic, underline, strikethrough, monospace, superscript, subscript} from 'react-draft-wysiwyg';

export const toolbar = {
    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
    inline: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
        bold: {icon: bold, className: undefined},
        italic: {icon: italic, className: undefined},
        underline: {icon: underline, className: undefined},
        strikethrough: {icon: strikethrough, className: undefined},
        monospace: {icon: monospace, className: undefined},
        superscript: {icon: superscript, className: undefined},
        subscript: {icon: subscript, className: undefined},
    },
    blockType: {
        inDropdown: true,
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
    },
    fontSize: {
        icon: fontSize,
        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
    },
}
