// ESLint 9 flat config，取代仓库根的 .eslintrc.json
import hexo from 'eslint-config-hexo/eslint';
import react from 'eslint-plugin-react';
import json from 'eslint-plugin-json';

export default [
    // 与旧脚本 --ext .jsx --ext .json 的范围保持一致，不lint第三方打包的 .js
    // nexmoe/、xiaoshu/ 与 _partial/background.jsx 是未引用的旧版布局，不纳入 lint
    { ignores: ['**/*.js', '**/node_modules/**', '**/dist/**', 'packages/theme/layout/_layout/nexmoe/**', 'packages/theme/layout/_layout/xiaoshu/**', 'packages/theme/layout/_partial/background.jsx'] },
    ...hexo,
    react.configs.flat.recommended,
    json.configs.recommended,
    {
        files: ['**/*.{jsx,json}'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
                ecmaVersion: 'latest'
            }
        },
        settings: { react: { version: '16.0' } },
        rules: {
            // ES 模块本身即严格模式，hexo 配置里的 strict 规则会误报
            strict: 'off',
            // JSX 外层括号是惯用写法；该规则在 eslint 9 里对 JSX 误报，关掉
            'no-extra-parens': 'off',
            'react/jsx-uses-vars': 'error',
            indent: ['error', 4, { SwitchCase: 1 }],
            'react/no-unknown-property': ['error', {
                ignore: ['class', 'onclick', 'onload', 'onsubmit', 'crossorigin']
            }],
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'react/jsx-key': 'off',
            'react/jsx-no-target-blank': ['error', { allowReferrer: true }]
        }
    }
];
