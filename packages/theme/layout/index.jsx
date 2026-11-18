const { Component, Fragment } = require('inferno');

module.exports = class extends Component {
    render() {
        const { page, partial } = this.props;
        return (
            <Fragment>
                <section
                    class="article-list"
                    dangerouslySetInnerHTML={{ __html: partial('_index/list') }}
                ></section>
                {
                    page.total > 1
                        ? <nav class="pagination" dangerouslySetInnerHTML={{ __html: partial('_index/pagination') }}></nav>
                        : ''
                }
            </Fragment>
        );
    }
};
