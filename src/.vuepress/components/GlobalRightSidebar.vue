<template>
  <!-- 添加移动端折叠按钮 -->
  <div class="mobile-toggle" v-show="isMobile" @click="toggleMobileMenu">
    <i :class="['fas', isExpanded ? 'fa-times' : 'fa-bars']"></i>
  </div>

  <!-- 修改原侧边栏,添加动态类 -->
  <div class="global-right-sidebar" :class="{ 'mobile-expanded': isExpanded }">
    <!-- <div class="sidebar-item" @click="toggleToc">
      <i class="fas fa-list"></i>
      <span>目录</span>
    </div>
    <div class="sidebar-item" @click="toggleSidebar">
      <i class="fas fa-chevron-left"></i>
      <span>侧边栏</span>
    </div> -->
    <div class="sidebar-item" @click="toggleDarkMode">
      <i class="fas fa-moon"></i>
      <span>夜间</span>
    </div>
    <div class="sidebar-item" @click="showModal('wechat')">
      <i class="fab fa-weixin"></i>
      <span>技术群</span>
    </div>
    <a class="sidebar-item" href="/训练营/介绍.html">
      <i class="fas fa-graduation-cap"></i>
      <span>训练营</span>
    </a>
    <!-- <a class="sidebar-item" href="你的面试鸭链接" target="_blank">
      <i class="fas fa-comments"></i>
      <span>面试鸭</span>
    </a> -->
    <!-- <a class="sidebar-item" href="/算法">
      <i class="fas fa-code"></i>
      <span>算法</span>
    </a> -->
    <div class="sidebar-item" @click="showModal('material')">
      <i class="fas fa-cloud-download-alt"></i>
      <span>资料</span>
    </div>
    <a class="sidebar-item" href="https://space.bilibili.com/302188068" target="_blank">
      <i class="fab fa-youtube"></i>
      <span>看视频</span>
    </a>
    <a class="sidebar-item" href="https://www.niumianoffer.com/?ref=gxzingpx" target="_blank">
      <i class="fas fa-robot"></i>
      <span>AI牛面</span>
    </a>
  </div>

  <!-- 通用弹窗组件 -->
  <div class="qr-modal" v-if="currentModal" @click="hideModal">
    <div class="qr-content" @click.stop>
      <img :src="modalConfig[currentModal].imgSrc" :alt="modalConfig[currentModal].alt" />
      <p>{{ modalConfig[currentModal].text }}</p>
    </div>
  </div>
</template>

<script>
import { withBase, useRoute } from 'vuepress/client'

export default {
  name: 'GlobalRightSidebar',
  data() {
    return {
      currentModal: null,
      modalConfig: {
        wechat: {
          imgSrc: withBase('/weixinerweima.png'),
          alt: '微信技术群二维码',
          text: '扫码备注「加群」加入技术交流群'
        },
        material: {
          imgSrc: withBase('/weixingongzhonghao.png'),
          alt: '公众号二维码',
          text: '扫码关注公众号回复「网络」获取资料'
        }
      },
      isMobile: false,
      isExpanded: false
    }
  },
  setup() {
    const route = useRoute()
    return {
      withBase,
      route
    }
  },
  mounted() {
    // 检测是否为移动设备
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    toggleToc() {
      // 切换目录显示
      const toc = document.querySelector('.toc-wrapper');
      if (toc) {
        toc.style.display = toc.style.display === 'none' ? 'block' : 'none';
      }
    },
    toggleSidebar() {
      // 切换左侧边栏
      document.body.classList.toggle('hide-sidebar');
    },
    toggleDarkMode() {
      // 切换暗黑模式
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    },
    showModal(type) {
      this.currentModal = type;
    },
    hideModal() {
      this.currentModal = null;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 719
      if (!this.isMobile) {
        this.isExpanded = false
      }
    },
    toggleMobileMenu() {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style>
.global-right-sidebar {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
  padding: 10px 0;
  transition: all 0.3s ease;
}

/* 修改移动端折叠按钮样式 */
.mobile-toggle {
  display: none;
  position: fixed;
  right: auto;
  left: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: var(--theme-color);
  color: white;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 101;
  transition: all 0.3s ease;
}

.mobile-toggle i {
  font-size: 16px;
}

/* 移动端样式 */
@media (max-width: 719px) {
  .mobile-toggle {
    display: flex;
  }

  .global-right-sidebar {
    right: -100px;
    opacity: 0;
    pointer-events: none;
  }

  .global-right-sidebar.mobile-expanded {
    right: 20px;
    opacity: 1;
    pointer-events: auto;
  }
}

/* 暗黑模式适配 */
html[data-theme='dark'] .mobile-toggle {
  background: var(--theme-color);
  color: var(--bg-color-dark);
}

/* 添加动画效果 */
.mobile-toggle:hover {
  transform: scale(1.1);
}

.mobile-toggle:active {
  transform: scale(0.95);
}

.sidebar-item {
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: var(--text-color);
  text-decoration: none;
}

.sidebar-item:hover {
  background-color: var(--bg-color-secondary);
}

.sidebar-item i {
  font-size: 16px;
  margin-bottom: 4px;
}

/* 暗黑模式样�� */
html[data-theme='dark'] .global-right-sidebar {
  background: var(--bg-color-dark);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

html[data-theme='dark'] .sidebar-item {
  color: var(--text-color-dark);
}

/* 二维码弹窗样式 */
.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.qr-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 300px;
}

.qr-content img {
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
}

.qr-content p {
  margin: 0;
  color: #666;
}

html[data-theme='dark'] .qr-content {
  background: var(--bg-color-dark);
}

html[data-theme='dark'] .qr-content p {
  color: var(--text-color-dark);
}
</style> 
