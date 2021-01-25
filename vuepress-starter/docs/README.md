---
home: true
heroImage: 
heroText: 欢迎来到我的博客
tagline: 在这里我会分享关于编程、写作、思考相关的任何内容，希望可以给来到这儿的人有所帮助 ...
actionText: 进入我的笔记 →
actionLink: /note/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: 网站信息 - 苏ICP备2020053803号-1 - 网站内容 - -博客/个人空间
---

```markdown
.
├── docs
│   ├── .vuepress (可选的)  →  官方标注可选,不过一般都会用这个文件夹,核心文件夹
│   │   ├── components (可选的)  →  这个文件夹一些以.vue结尾的vue组件,可以在markdown文件里使用
│   │   ├── theme (可选的)   →  可以配置自己的博客
│   │   │   └── Layout.vue
│   │   ├── public (可选的)   →   放一些公共静态资源 使用方式 /xxx, 请必须以 `/` 开始表示根
│   │   ├── styles (可选的)  →  样式
│   │   │   ├── index.styl   →  自定义样式
│   │   │   └── palette.styl   →  用于重写默认颜色常量，或者设置新的 stylus 颜色常量
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html  →  用于开发环境的 HTML 模板文件
│   │   │   └── ssr.html  →  构建时基于 Vue SSR 的 HTML 模板文件
│   │   ├── config.js (可选的)   →   配置文件的入口文件，也可以是 YML 或 toml
│   │   └── enhanceApp.js (可选的)   →  客户端应用的增强
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```