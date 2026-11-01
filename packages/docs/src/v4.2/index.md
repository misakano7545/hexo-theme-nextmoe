# 快速入门

:::tip
你可以参考 <https://github.com/nexmoe/nexmoe.com> 进行配置
:::

在使用 NextMoe 之前，您应该阅读 [Hexo Docs](https://hexo.io/docs/index.html)，完成 Hexo 的安装并通过编辑 `config.yml` 初始化项目。

## 安装 NextMoe

本项目是个人主题，未发布到 npm。安装时指向本仓库的 `packages/theme`：

```shell
npm install --install-links /path/to/hexo-theme-nextmoe/packages/theme hexo-renderer-inferno
```

## 使用 NextMoe

1. 方法1 在项目的根目录中编辑 `_config.yml`。将名为 `theme` 的键的值更改为 `nextmoe`。
2. 方法2
  
```shell
hexo config theme nextmoe
```

## 配置 NextMoe

在项目的根目录中编辑 `_config.nextmoe.yml`。

## 运行 Nexmoe

使用以下命令运行 Nexmoe：

```shell
hexo server --debug
```

:::tip
在服务启动期间，查看命令行输出中的任何异常消息，这将帮助其他人在遇到问题时更好地查找错误。
:::
当命令行输出以下内容时，表示 Hexo 正在本地机器上的端口 4000 上侦听。使用浏览器访问 `http://localhost:4000/` 检查站点是否正常运行

```shell
INFO  Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.
```

:::tip
如果您在使用它时遇到问题，请尝试搜索文档或提出 [问题](https://github.com/misakano7545/hexo-theme-nextmoe/issues/new) 在 GitHub 上
:::

## 更新 NextMoe

运行以下命令更新 NextMoe：

```shell
git pull && npm install --install-links /path/to/hexo-theme-nextmoe/packages/theme
```

更新后，您应该在变更日志中看到更改的内容。并编辑 `_config.nextmoe.yml` 以匹配新版本。

配置文件在此处参考：<https://github.com/misakano7545/hexo-theme-nextmoe/blob/master/packages/theme/source/_config.yml>
