window.addEventListener('load', () => {
    const codeBlocks = document.querySelectorAll('figure.highlight');
    if (!codeBlocks.length) return;

    const addCopyButton = codeBlock => {
        const copyWrapper = document.createElement('div');
        copyWrapper.setAttribute('class', 'codeblock-copy-wrapper');

        let copiedTimeout = null;

        copyWrapper.addEventListener('click', () => {
            const highlightDom = copyWrapper.parentElement;
            // Hexo 7 的高亮块没有 <code>，正文在 td.code > pre 里。
            const code = highlightDom.querySelector('td.code pre') || highlightDom.querySelector('pre');
            if (!code) return;

            let copiedCode = '';

            (function traverseChildNodes(node) {
                const childNodes = node.childNodes;
                childNodes.forEach(child => {
                    switch (child.nodeName) {
                        case '#text': // 文本节点
                            copiedCode += child.nodeValue;
                            break;
                        case 'BR': // <br />
                            copiedCode += '\n';
                            break;
                        default:
                            traverseChildNodes(child);
                    }
                });
            }(code));

            navigator.clipboard.writeText(

                /* 去掉最后的换行 */
                copiedCode.slice(0, -1)
            ).then(() => {
                if (copiedTimeout) clearTimeout(copiedTimeout);

                copyWrapper.classList.add('codeblock-copy-wrapper-copied');
                copiedTimeout = setTimeout(() => {
                    copyWrapper.classList.remove('codeblock-copy-wrapper-copied');
                    copiedTimeout = null;
                }, 1500);
            });
        });
        codeBlock.appendChild(copyWrapper);
    };

    codeBlocks.forEach(addCopyButton);
});
