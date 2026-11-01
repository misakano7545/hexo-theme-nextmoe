/* global hexo */

'use strict';

// Fluid 的 note 类型，保持旧文章不用改写。
const NOTE_TYPES = new Set([
    'default', 'secondary', 'primary', 'success', 'info', 'warning', 'danger', 'light'
]);

hexo.extend.tag.register(
    'note',
    (args, content) => {
        const type = (args[0] || 'info').toLowerCase();
        const className = NOTE_TYPES.has(type) ? type : 'info';
        const body = hexo.render.renderSync({ text: content, engine: 'markdown' });

        return `<div class="note note-${className}" role="note">
            <i class="nexmoefont icon-info-circle" aria-hidden="true"></i>
            <div class="note-body">${body}</div>
        </div>`;
    },
    { ends: true }
);
