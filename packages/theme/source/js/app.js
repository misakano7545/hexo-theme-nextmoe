// image lightbox
const initLightbox = () => {
    if (!window.Fancybox) return;
    Fancybox.bind('article img', {
        groupAll: true,
        Image: {
            // 4.0.26 把 maxScale 改成 origWidth/fitWidth，小图比值正好是 1，缩放直接失效
            Panzoom: {
                maxScale: function () {
                    const { origWidth, fitWidth } = this.content;
                    return fitWidth > 0 ? Math.max(4, origWidth / fitWidth) : 4;
                }
            }
        }
    });
};
if (document.readyState === 'complete') {
    initLightbox();
} else {
    window.addEventListener('load', initLightbox);
}

// tabble gallery
document.querySelectorAll('table:has(img)').forEach(item => {
    item.classList.add('nexmoe-album');
});

// search
function search() {
    window.open(
        document.querySelector('#search_form').getAttribute('action_e')
			+ ' '
			+ document.querySelector('#search_value').value
    );
    return false;
}

// catalog
document.addEventListener('click', ev => {
    const button = ev.target.closest('.nexmoe-catalog > .catalog');
    if (button) {
        button.parentElement.classList.toggle('nexmoe-toc-open');
        return;
    }
    if (!ev.target.closest('.nexmoe-toc')) {
        document.querySelectorAll('.nexmoe-toc-open').forEach(el => {
            el.classList.remove('nexmoe-toc-open');
        });
    }
});

document.querySelectorAll('a.toc-link').forEach(item => {
    item.addEventListener('click', function(ev) {
        ev.preventDefault();
        const title = this.getAttribute('href');
        window.scroll({
            top: document.querySelector(decodeURI(title)).offsetTop - 24,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('copy', () => {
    if (!window.copyTip) {
        return;
    }
    const sel = document.getSelection();
    const ele = document.createElement('div');
    ele.innerHTML
		= '<div style="position: fixed;opacity: 0;white-space: pre;">'
		+ sel
		+ '\n\n'
		+ window.copyTip.replaceAll('%url', document.location.href)
		+ ' </div>';
    document.body.appendChild(ele);
    sel.selectAllChildren(ele);
    setTimeout(() => {
        document.body.removeChild(ele);
    });
});

function imgOnError(_this) {
    _this.src = 'data:image/png;base64,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';
    _this.onerror = null;
}

document
    .querySelectorAll('.nexmoe-post-cover.absolute')
    .forEach(item => {
        item.style.minHeight = item.childNodes[3].clientHeight + 'px';
    });

window.onload = function() {
    lax.init();

    // Add a driver that we use to control our animations
    lax.addDriver('scrollY', () => {
        return window.scrollY;
    });

    // Add animation bindings to elements
    lax.addElements('.backtop', {
        scrollY: {
            opacity: [
                ['screenHeight', 'screenHeight+300', 'screenHeight+600'],
                [0, 0, 1]
            ]
        }
    });

    lax.addElements('.nexmoe-post-cover', {
        scrollY: {
            opacity: [
                ['elInY', 'elInY+200'],
                [0, 1]
            ]
        }
    });
};

// 深浅色切换：没存过偏好就跟随系统，点了才写 localStorage。
// app.js 是 async 加载的，DOM 可能还没解析完，所以两种时机都要接。
const initThemeToggle = () => {
    const root = document.documentElement;
    const btn = document.getElementById('nexmoe-theme-toggle');
    if (!btn) return;

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const effective = () => root.dataset.theme || (query.matches ? 'dark' : 'light');
    const sync = () => {
        const mode = effective();
        btn.dataset.mode = mode;
        const label = mode === 'dark' ? '切换到亮色模式' : '切换到深色模式';
        btn.setAttribute('aria-label', label);
        btn.title = label;
    };

    let switchTimer;

    btn.addEventListener('click', () => {
        const next = effective() === 'dark' ? 'light' : 'dark';
        // 先挂 class 再改属性，否则第一帧就已经是新配色，没有渐变可看
        root.classList.add('nexmoe-theme-switching');
        root.dataset.theme = next;
        try {
            localStorage.setItem('nexmoe-theme', next);
        } catch (e) {
            // 隐私模式下写不进去就只在本次会话生效
        }
        sync();
        // 必须撤掉，否则之后所有 hover 的颜色变化都会变成 0.35s 慢动作
        clearTimeout(switchTimer);
        switchTimer = setTimeout(() => root.classList.remove('nexmoe-theme-switching'), 400);
    });

    query.addEventListener('change', sync);
    sync();
};
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}
