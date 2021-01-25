module.exports = {
  title: '山南水北的博客',
  description: 'Just playing around',
  themeConfig: {
    logo: '/img/logo.png', // 导航栏 Logo
    // navbar: false, // 禁用导航栏
    lastUpdated: 'Last Updated',// 文档更新时间：每个文件git最后提交的时间,
    // 导航栏，导航栏可能包含你的页面标题、搜索框、 导航栏链接、多语言切换、仓库链接，它们均取决于你的配置。
    nav: [
      { text: '首页', link: '/' },  // 导航栏链接
      {
        text: '文章', 
        items:[
          { text: '笔记' , link:'/note/'},
          { text: 'webgl' , link:'/webgl/'}
        ]
      },
      { text: '导航', link: '/guide/', target:'_self' },
      { text: '百度', link: 'https://baidu.com', target:'_blank', rel:'' }, // 外部链接 <a> 标签的特性将默认包含target="_blank" rel="noopener noreferrer"，你可以提供 target 与 rel，它们将被作为特性被增加到 <a> 标签上：
      {
        text: '语言',
        ariaLabel: 'Language Menu',
        items: [
          // 当你提供了一个 items 数组而不是一个单一的 link 时，它将显示为一个 下拉列表 ：
          { text: 'Group1', link: '/language/japanese/'},
          { text: '测试下拉分组1', items: [ // 通过嵌套的 items 来在 下拉列表 中设置分组：
              { text: 'Chinese', link: '/language/chinese/' },
              { text: 'Japanese', link: '/language/japanese/'}
            ] 
          },
          { text: '测试下拉分组2', items: [
            { text: 'Chinese', link: '/language/chinese/' },
            { text: 'Japanese', link: '/language/japanese/'}
          ] 
        }
        ]
      }
    ],
    // 侧边栏
    sidebar: {
      '/note/': [
        '',
        '本地Redis Desktop Manager连接阿里云中docker下Redis',
        '将主机项目war包部署到虚拟机中',
        'Docker容器内解决apt 速度过慢问题',
        'MyBatis-Plus条件构造器和常用接口'
      ],
      '/webgl/': ['']
    }
  }
}
