// Stack 的配色开关与手机端菜单，照上游行为的极简实现
(function () {
    var KEY = 'StackColorScheme';

    function apply(mode) {
        var dark = mode === 'dark' ||
            (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.dataset.scheme = dark ? 'dark' : 'light';
    }

    var toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            var next = document.documentElement.dataset.scheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem(KEY, next);
            apply(next);
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if ((localStorage.getItem(KEY) || 'auto') === 'auto') apply('auto');
    });

    var menuBtn = document.getElementById('toggle-menu');
    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            document.body.classList.toggle('show-menu');
            var menu = document.getElementById('main-menu');
            // shortcut: 菜单直接显隐，未复制 Stack 的高度过渡动画
            if (menu) menu.classList.toggle('show');
            menuBtn.classList.toggle('is-active');
        });
    }

    // 代码块复制按钮，照上游 main.ts 的行为；Hexo 出的是 figure.highlight
    document.querySelectorAll('.article-content .highlight').forEach(function (block) {
        var pre = block.querySelector('td.code pre') || block.querySelector('pre');
        if (!pre || !navigator.clipboard) return;
        var btn = document.createElement('button');
        btn.className = 'copyCodeButton';
        btn.textContent = 'Copy';
        block.appendChild(btn);
        btn.addEventListener('click', function () {
            navigator.clipboard.writeText(pre.textContent).then(function () {
                btn.textContent = 'Copied!';
                setTimeout(function () { btn.textContent = 'Copy'; }, 1000);
            });
        });
    });
})();
