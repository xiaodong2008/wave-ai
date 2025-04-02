<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import Topbar from "./components/Topbar.vue";
</script>

<template>
  <div class="container">
    <Topbar />
    <div style="height: 100%; display: flex; gap: 10px">
      <Sidebar />
      <div class="view">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  padding: 10px;
  gap: 10px;
  height: 100%;
  // background-color: #f0f0f0;

  .view {
    width: 100%;
    border: 1px solid rgb(63, 63, 70);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    // padding: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
  position: absolute;
  left: 0;
  right: 0;
  // top: 10px;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from {
  transform: translateX(20px);
}

.fade-leave-to {
  transform: translateX(-20px);
}
</style>
