const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        const { config, theme, url_for } = this.props;

        return (
            <div id="nexmoe-background">
                {/* 液态玻璃的折射层：位移贴图让背景沿边缘轻微弯折，scale 越大越像凸透镜。 */}
                <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
                    <filter id="lg-refract" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
                        <feTurbulence type="fractalNoise" baseFrequency="0.005 0.011" numOctaves="2" seed="11" result="noise" />
                        <feGaussianBlur in="noise" stdDeviation="4" result="smooth" />
                        <feDisplacementMap in="SourceGraphic" in2="smooth" scale="14" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </svg>
                <div
                    class="nexmoe-bg"
                    style={`background-image: url(${theme.background.path})`}
                ></div>
                <div class="mdui-appbar mdui-shadow-0">
                    <div class="mdui-toolbar">
                        <a
                            // eslint-disable-next-line react/no-unknown-property
                            mdui-drawer="{target: '#drawer', swipe: true}"
                            title="menu"
                            class="mdui-btn mdui-btn-icon mdui-ripple"
                        >
                            <i class="mdui-icon nexmoefont icon-menu"></i>
                        </a>
                        <div class="mdui-toolbar-spacer"></div>
                        <a
                            href={url_for()}
                            title={config.author || config.title}
                            class="mdui-btn mdui-btn-icon"
                        >
                            <img
                                src={theme.avatar }
                                alt={config.author || config.title}
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
};
