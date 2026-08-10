import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/cpow3/', // ⚠️ 非常重要！請確認前後都有斜線，且名稱與你的 GitHub 專案庫完全一致
  title: 'Code x Chip x Creativity',
  description: '程式碼、硬體晶片與創意的實作紀錄',

  themeConfig: {
    // 頂部導覽列 (Navbar)
    nav: [
      { text: 'Scratch', link: '/scratch/' },
      { text: 'micro:bit', link: '/microbit/' },
      { text: 'Python', link: '/python/' },
      //{ text: '生成式 AI', link: '/ai/' },
      //{ text: 'HTML', link: '/html/' },
      //{ text: 'CSS', link: '/css/' },
      //{ text: 'GA4', link: '/ga4/' },
      //{ text: 'Canva', link: '/canva/' },
      //{ text: '摺紙藝術', link: '/origami/' },
      { text: '挑戰活動', link: '/game/' },
      { text: '關於', link: '/about' },
    ],

    // 左側章節目錄 (Sidebar) - 改為多分類獨立選單
    sidebar: {
      // 📍 當進入 micro:bit 專區時顯示的目錄
      '/microbit/': [
        {
          text: 'micro:bit 教學',
          collapsed: false, // 是否預設展開
          items: [
            { text: '基本介紹', link: '/microbit/' }, // 指向 docs/microbit/index.md
            { text: '程式積木', link: '/microbit/blocks' }, // 指向 docs/microbit/blocks.md
            { text: '進階積木', link: '/microbit/advanced' },
            { text: '擴展積木', link: '/microbit/extensions' },
          ],
        },
        {
          text: '範例專區',
          collapsed: false,
          items: [
            { text: '入門範例', link: '/microbit/basic-examples' },
            { text: '燈光範例', link: '/microbit/led-examples' },
            { text: '遊戲範例', link: '/microbit/game-examples' },
          ],
        },
      ],

      // 📍 當進入 Python 專區時顯示的目錄 (範例)
      '/python/': [
        {
          text: 'Python 教學',
          items: [
            { text: '環境建置', link: '/python/' },
            { text: '基礎語法', link: '/python/basics' },
            { text: '自動化腳本', link: '/python/automation' },
          ],
        },
      ],

      // 📍 當進入 Scratch 專區時顯示的目錄 (範例)
      '/scratch/': [
        {
          text: 'Scratch 教學',
          items: [
            { text: 'Scratch 簡介', link: '/scratch/' },
            { text: '基礎動畫實作', link: '/scratch/animation' },
          ],
        },
      ],
    },

    // 右上角社交連結
    socialLinks: [{ icon: 'github', link: 'https://github.com' }],

    // 頁尾
    footer: {
      message: 'Code x Chip x Creativity',
      copyright: 'Copyright © 2026',
    },
  },
});
