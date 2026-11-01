// 参考 https://chaooo.github.io/article/20161109.html
let searchData;
function loadData(arg) {
    if (!searchData) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/content.json', true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                const res = JSON.parse(this.response || this.responseText);
                searchData = res instanceof Array ? res : res.posts;
                searchkey(arg);
            } else {
                console.error(this.statusText);
            }
        };
        xhr.onerror = function() {
            console.error(this.statusText);
        };
        xhr.send();
    } else {
        searchkey(arg);
    }
}

function searchkey(keyword) {
    const seen = new Set();
    keyword.forEach(word => {
        const reg = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        searchData.forEach(post => {
            const rend = {};
            let flag = false;
            if (post.title.search(reg) !== -1) {
                rend.title = post.title.replace(reg, '<span class="keyword">$&</span>');
                flag = true;
            }
            const textpos = post.text.search(reg);
            if (textpos !== -1) {
                rend.text = `…${post.text.substring(textpos, textpos + 18)}…`;
                rend.text = rend.text.replace(reg, '<span class="keyword">$&</span>');
                flag = true;
            }
            if (flag && !seen.has(post.path)) {
                seen.add(post.path);
                rend.title = !rend.title ? post.title : rend.title;
                rend.text = !rend.text ? post.text : rend.text;
                rend.href = `/${post.path}`;
                render(rend);
            }
        });
    });
}

function render(data) {
    const ele = document.createElement('div');
    ele.className = 'search-result';
    ele.innerHTML = `<a href=${data.href}><h3>${data.title}</h3>
    <span class="content">${data.text}<br>　</span></a>`;
    document.getElementsByClassName('search-body')[0].appendChild(ele);
}

function openSearch(value) {
    const space = document.getElementById('nexmoe-search-space');
    const input = document.getElementsByClassName('search-input')[0];
    space.style.display = 'flex';
    if (value !== undefined) input.value = value;
    input.focus();
    if (input.value) sinput();
}

// 事件
function sclose() {
    document.getElementById('nexmoe-search-space').style.display = 'none';
}

function sinput() {
    document.getElementsByClassName('search-body')[0].innerHTML = '';
    loadData(format(document.getElementsByClassName('search-input')[0].value));
}

// 搜索词格式化
function format(word) {
    return word.trim().split(/\s+/).filter(Boolean);
}

// 主程序
function bindSearch() {
    const widgetInput = document.getElementById('search_value');
    if (widgetInput) {
        widgetInput.addEventListener('focus', () => openSearch(widgetInput.value));
        widgetInput.addEventListener('input', () => openSearch(widgetInput.value));
    }

    const key = new URLSearchParams(location.search).get('q');
    if (key) openSearch(key);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindSearch);
} else {
    bindSearch();
}
