---
title: Obsidian x Quartz 部署教程
description: 从零开始，将你的 Obsidian 笔记发布到网络上
publishDate: 2025-10-22
updatedDate: 2025-10-23
tags:
  - Obsidian
  - Quartz
  - Github
  - Vercel
  - 数字花园
---

> 将你的 Obsidian 笔记转化为一个精美的个人网站，分享你的知识和思想。

## 在此之前

我经常使用Obsidian笔记软件记录日常工作和生活，但这些无法在我的博客中体现，加上HEXO博客不支持像GITBOOK那般建立文档中心，于是我开始搜索如何将Obsidian笔记发布到网络上，配合现有的HEXO博客来完善我的记录能力。于是挑来挑去最终选择了Quartz，开源、风格和功能我都比较满意，所以正好写一篇笔记记录部署过程。

### 什么是 Quartz ？

Quartz 是一款快速、功能强大的静态网站生成器，可以将 Markdown 内容转换为功能齐全的网站。成千上万的学生、开发者和教师已经在使用 Quartz 在网络上发布个人笔记、网站和数字花园。

### Quartz 的主要特性

- 🔗 **Obsidian 兼容性** - 完全支持 Obsidian 的 双向链接
- 🔍 **全文搜索** - 快速搜索你的所有笔记
- 📊 **图表视图** - 可视化你的知识网络
- ⚡ **极速加载** - 基于 SPA 路由的快速页面加载
- 🎨 **高度可定制** - 灵活的主题和布局系统
- 📱 **响应式设计** - 完美适配各种设备


## 一：开始部署

### 前置要求

请确保你已经安装了以下工具：

- **Node.js v22+** - [下载地址](https://nodejs.org/)
- **Git** - [下载地址](https://git-scm.com/)
- **GitHub 账户** - 用于代码托管和提交部署
- **Vercel 账户** - 用于项目构建和公网发布
### 1. 在Github中fork Quartz 的官方仓库

点击 [Quartz 仓库](https://github.com/jackyzha0/quartz) 右上角的 "Fork" 按钮，将仓库 fork 到你的 GitHub 账户下。官方仓库是PUBLIC仓库，如果你想转为Private仓库，可以参考这里...

### 2. 克隆你fork的仓库到本地

在本地打开终端，执行以下命令：

```bash
git clone https://github.com/你的项目地址/quartz.git
cd quartz
```

安装依赖
```bash
npm i
```

### 3. 本地预览

文章来自于仓库的content目录,由于官方content中不存在md文件，我们首先创建一个index.md文件用作网站首页。

打开content目录，创建index.md文件，内容如下：

```bash
---
title: 欢迎来到我的数字花园 🌱
---
这是基于 Quartz + Obsidian 构建的个人数字花园 —— 一个不断生长、随时修剪、记录思考与连接想法的空间。
我把它当作长期的笔记库，随手写作、偶现灵感、日记都会放到这里。

## 入口导航

## 花园理念（Garden Principles）

1. 可成长：这不是博客的最终稿，而是持续迭代的思维殿堂。
2. 可互联：尽量把笔记互相链接，形成知识网络。
3. 可裁剪：允许笔记被合并、拆分与重写。保留历史比完美更重要。
4. 透明：记录思考过程，而不仅是结论。
5. 轻量：先写后修，优先记录想法。

## 最近更新

正在建设中...
```

在项目根目录执行以下命令进行本地预览：
```bash
npx quartz build --serve
```

打开浏览器访问 `http://localhost:8080`，你应该就能看到你的网站了！

![pVX9qZd.png](https://s21.ax1x.com/2025/10/23/pVX9qZd.png)

### 4. 配置网站

即使你不懂任何代码，Quartz 也具备极高的可配置性。你所需的大部分配置都可以通过编辑 quartz.config.ts 或更改 quartz.layout.ts 中的布局来完成。

这是 Quartz 的主配置文件quartz.config.ts，位于项目根目录。主要配置项包括：

```typescript
const config: QuartzConfig = {
  configuration: {
    pageTitle: "网站标题",
    pageTitleSuffix: " | 我的数字花园",
    enableSPA: true,
    enablePopovers: true,
    locale: "zh-CN",
    baseUrl: "your-domain.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    theme: {
      colors: {
        lightMode: {
          light: "#faf8f8",
          dark: "#2b2b2b",
          // ... 更多颜色配置
        },
      },
    },
  },
  // ... 插件配置
}
```

更多配置请参考[官方文档](https://quartz.jzhao.xyz/configuration)

## 二：Vercel部署

### 1. 修复URL

在部署到 Vercel 之前，项目目录的根目录下需要一个 vercel.json 文件。该文件需要包含以下配置，以便 URL 不需要 .html 扩展名，否则访问部署好的网站将会出现404错误。在根目录下创建 vercel.json 文件，内容如下：
```bash
{
  "cleanUrls": true
}
```

记得使用commit将新增的 vercel.json 文件提交到github仓库中，否则下一步仍会出现问题。

### 2. 项目部署

1. 登录到 [Vercel Dashboard](https://vercel.com/dashboard) 并点击 "Add New..." > Project
2. 选择导入Github中你fork的quartz仓库
3. 编辑配置项，确保下面的选项正确

| Configuration option      | Value            |
| ------------------------- | ---------------- |
| Framework Preset          | Other            |
| Build and Output Settings | npx quartz build |
一切准备就绪后点击**Deploy**，Vercel会自动进行代码拉取和项目构建，约3min后项目即部署在互联网上。但需注意，Vercel默认域名已被国内封锁，需绑定自定义域名才能够在国内正常访问。

### 3. 配置域名

进入 Vercel 项目页 → **Settings → Domains → Add Domain**，添加你的域名，并将 DNS 的 CNAME 记录指向 `cname.vercel-dns.com`（点击 **Refresh** 按钮将会自动在CloudFlare中配置DNS解析）。同时，别忘了将 `quartz.config.ts` 中的 `baseUrl` 字段改为你的正式域名，并提交代码更新。

至此，基于Obsidian & Quartz 的在线数字花园就部署完成了，之后每次 `git push`，Vercel 都会自动触发构建并发布，无需手动干预，真正实现了**一键写作、自动上线**的无感化写作体验。

## 三：工作流

### 1. Obsidian库 的迁移

我直接将Obsidian整个库移动到了 Quartz 的 content目录下，只要保留库中的.obsidian文件夹就能完全无损的移动，能够完全保留插件、设置等所有库信息，这样也可以直接在 Quartz 中build，完全没有影响。

### 2. 笔记隐私

由于原本的Obsidian包含了非常多的敏感信息，所以在移动到Quartz后，我在quartz.config.ts中添加了[ignorePatterns](https://quartz.jzhao.xyz/features/private-pages)来忽略这些目录，这样就能够在Obsidian中正常书写，同时不会被发布到网站上。但仍需注意不要将其提交到Github中，否则仍然存在泄露风险，可以通过配置.gitignore来实现。

### 3. 日常书写

直接使用Obsidian书写，觉得OK了就直接commit提交即可，如果觉得流程还是麻烦，可以在Obsidian中使用 [[obsidian-git](https://github.com/Vinzent03/obsidian-git)](https://github.com/Vinzent03/obsidian-git)插件，即可解放双手。

## 四：常见问题

1. 访问Vercel部署好的[xxxxxx-ten-sooty.vercel.app](https://xxxxxx-ten-sooty.vercel.app/)时，总是下载一个叫做 **下载** 的文件，访问不了主页面？或者网页返回404？这是因为你的URL没有成功修复，检查Github的仓库，查看根目录的  vercel.json 文件是否存在。
2. 如何部署到其他的服务商中？具体可以参考[官方部署文档](https://quartz.jzhao.xyz/hosting)