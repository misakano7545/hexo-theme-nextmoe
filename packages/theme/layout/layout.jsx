const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        const { config, page, body, partial } = this.props;
        const language = page.lang || page.language || config.language;
        const mainHtml = body + partial('_partial/site-footer');
        // Stack 把正文卡片样式挂在 .article-page 上，归档页则隐藏右侧栏
        const isPost = page.layout === 'post' || page.__post === true;
        const showWidgets = page.archive !== true;
        return (
            <html lang={language ? language.substr(0, 2) : ''}>
                <head
                    dangerouslySetInnerHTML={{
                        __html: partial('_partial/head')
                    }}
                ></head>
                <body class={isPost ? 'article-page' : ''}>
                    <div class="container main-container flex on-phone--column extended">
                        <aside
                            class="sidebar left-sidebar sticky"
                            dangerouslySetInnerHTML={{
                                __html: partial('_layout/stack/sidebar')
                            }}
                        ></aside>
                        {showWidgets ? (
                            <aside
                                class="sidebar right-sidebar sticky"
                                dangerouslySetInnerHTML={{
                                    __html: partial('_layout/stack/widgets')
                                }}
                            ></aside>
                        ) : null}
                        <main class="main full-width" dangerouslySetInnerHTML={{ __html: mainHtml }}></main>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: partial('_partial/searchbox')
                        }}
                    ></div>
                </body>
            </html>
        );
    }
};
