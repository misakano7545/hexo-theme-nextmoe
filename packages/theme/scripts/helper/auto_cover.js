/* global hexo */

'use strict';

// 用标题算一个稳定的色相，同一篇文章每次构建颜色一致。
hexo.extend.helper.register('coverHue', title => {
    let hue = 0;
    for (const char of String(title || '')) {
        hue = (hue * 31 + char.codePointAt(0)) % 360;
    }
    return hue;
});
