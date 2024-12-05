import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Gezhe Craft Mod Wiki",
  base: "/gcmwiki/",
  description: "dddddgz模组的Wiki",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'VitePress Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'VitePress Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dddddgz05/gezhecraftmod' }
    ]
  }
})
