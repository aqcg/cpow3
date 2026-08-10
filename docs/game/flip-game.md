# 🎮 翻轉遊戲挑戰

請點擊下方按鈕，以獨立全螢幕視窗開啟遊戲：

<script setup>
import { withBase } from 'vitepress'

const openGame = () => {
  window.open(withBase('/game/flip-game.html'), '_blank')
}
</script>

<button 
  @click="openGame"
  style="padding: 12px 24px; background-color: #238636; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 16px; cursor: pointer; margin-top: 10px;"
>
  🚀 開啟遊戲全螢幕畫面
</button>

---

## 🎯 遊戲簡介
- 點擊按鈕後會開啟獨立遊戲視窗。
- 支援完整響應式尺寸與觸控體驗。