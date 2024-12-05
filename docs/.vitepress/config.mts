import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Gezhe Craft Mod Wiki",
  base: "/gcmwiki/",
  description: "dddddgz gcm wiki mod",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      {
        text: '编写须知',
        items: [
          { text: '编写标准', link: '/wiki-standard' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: '物品',
        items: [
          { text: '日历', link: '/item/calendar' },
          { text: '绿宝石桶', link: '/item/emerald_bucket' }
        ]
      }
    ],
    sidebar: [
      {
        text: '编写须知',
        items: [
          { text: '编写标准', link: '/wiki-standard' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: '物品',
        items: [
          { text: '日历', link: '/item/calendar' },
          { text: '绿宝石桶', link: '/item/emerald_bucket' }
        ]
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dddddgz/gezhecraftmod' }
    ],
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    }
  }
})
