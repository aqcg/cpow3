<template>
  <div class="matrix-board-container">
    <div class="header">
      <div class="title">CODE × CHIP × CREATIVITY</div>
      <div class="subtitle">Digital Sandbox v1.9</div>
    </div>

    <!-- 8x8 LED 矩陣 -->
    <div
      class="matrix-board"
      ref="boardRef"
      @mouseleave="onMouseLeave"
      @touchstart.passive="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div
        v-for="(led, index) in leds"
        :key="index"
        class="led"
        :style="getLedStyle(led)"
        @mouseenter="onMouseEnter(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const boardRef = ref(null);

// 建立 64 個 LED Reactive 狀態
const leds = reactive(
  Array.from({ length: 64 }, () => ({
    active: false,
    color: '',
    timeout: null,
  }))
);

let currentTraceColor = '';
let pulseTimer = null;

// HSL 隨機彩虹色
const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 90%, 65%)`;
};

// 動態 Inline Style，保證彩虹 HSL 直接蓋過去
const getLedStyle = (led) => {
  if (led.color) {
    return {
      backgroundColor: led.color,
      boxShadow: `0 0 12px ${led.color}, 0 0 4px ${led.color} inset`,
    };
  }
  if (led.active) {
    return {
      backgroundColor: '#58a6ff',
      boxShadow: '0 0 10px #58a6ff, 0 0 3px #58a6ff inset',
    };
  }
  return {};
};

// 淡出邏輯
const fadeOut = (led) => {
  if (led.timeout) {
    clearTimeout(led.timeout);
    led.timeout = null;
  }

  led.timeout = setTimeout(() => {
    led.active = false;
    led.color = '';
    led.timeout = null;
  }, 600);
};

// 滑鼠/觸控觸發彩虹
const triggerInteractionLed = (index) => {
  if (index < 0 || index >= 64) return;
  if (!currentTraceColor) currentTraceColor = generateRandomColor();

  const led = leds[index];
  led.color = currentTraceColor;
  fadeOut(led);
};

// 自動動畫（藍光）
const triggerAutoLed = (index) => {
  if (index < 0 || index >= 64) return;
  const led = leds[index];
  led.active = true;
  led.color = '';
  fadeOut(led);
};

// 滑鼠事件
const onMouseEnter = (index) => {
  if (!currentTraceColor) currentTraceColor = generateRandomColor();
  triggerInteractionLed(index);
};

const onMouseLeave = () => {
  currentTraceColor = '';
};

// 觸控事件
const getLedIndexFromTouch = (touch) => {
  if (!boardRef.value) return -1;
  const element = document.elementFromPoint(touch.clientX, touch.clientY);
  const children = Array.from(boardRef.value.children);
  return children.indexOf(element);
};

const onTouchStart = (e) => {
  currentTraceColor = generateRandomColor();
  const index = getLedIndexFromTouch(e.touches[0]);
  if (index !== -1) triggerInteractionLed(index);
};

const onTouchMove = (e) => {
  e.preventDefault();
  const index = getLedIndexFromTouch(e.touches[0]);
  if (index !== -1) triggerInteractionLed(index);
};

const onTouchEnd = () => {
  currentTraceColor = '';
};

// 脈衝動畫
const runPulseAnimation = () => {
  const mode = Math.floor(Math.random() * 3);
  if (mode === 0) {
    for (let r = 0; r < 8; r++) {
      setTimeout(() => {
        leds.forEach((_, idx) => {
          if (Math.floor(idx / 8) === r) triggerAutoLed(idx);
        });
      }, r * 60);
    }
  } else if (mode === 1) {
    for (let c = 0; c < 8; c++) {
      setTimeout(() => {
        leds.forEach((_, idx) => {
          if (idx % 8 === c) triggerAutoLed(idx);
        });
      }, c * 60);
    }
  } else {
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        triggerAutoLed(Math.floor(Math.random() * 64));
      }, i * 40);
    }
  }
};

onMounted(() => {
  setTimeout(runPulseAnimation, 1000);
  pulseTimer = setInterval(runPulseAnimation, 5000);
});

onUnmounted(() => {
  if (pulseTimer) clearInterval(pulseTimer);
  leds.forEach((led) => led.timeout && clearTimeout(led.timeout));
});
</script>

<style scoped>
.matrix-board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  font-family: monospace;
  user-select: none;
  -webkit-user-select: none;
  pointer-events: auto !important; /* 強制穿透 VitePress 外層圖層遮罩 */
  position: relative;
  z-index: 10;
}

.header {
  text-align: center;
}

.title {
  font-size: 0.85rem;
  letter-spacing: 2px;
  color: #c9d1d9;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.75rem;
  color: #8b949e;
}

.matrix-board {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
  background-color: #161b22;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #30363d;
  width: 100%;
  aspect-ratio: 1 / 1;
  touch-action: none;
}

.led {
  background-color: #21262d;
  border-radius: 50%;
  aspect-ratio: 1;
  cursor: pointer;
  transition: background-color 0.1s ease, box-shadow 0.1s ease;
  pointer-events: auto !important;
}
</style>
