import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import MatrixBoard from './components/MatrixBoard.vue';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(MatrixBoard),
    });
  },
};
