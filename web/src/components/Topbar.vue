<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <div class="topbar">
    <div>
      <span class="wave-font">Wave</span>
    </div>
    <div>
      <RouterLink to="/login">
        <Button label="Login" />
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  border: 1px solid rgb(63, 63, 70);
  border-radius: 9px;
  background-color: #242424;
  box-shadow: 0;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: rgb(24, 24, 27);

    .wave-font {
      font-family: "Pacifico", sans-serif;
      font-size: 28px;
      color: #27aaae89;
      text-shadow: 0 0 5px #73f3ff, 0 0 10px #b8fff7, 0 0 15px #1f7d38;
      transition: all 0.2s ease-in-out;
    }
  }

  .wave-font {
    font-family: "Pacifico", sans-serif;
    font-size: 28px;
    color: #27a9ae28;
    text-shadow: 0 0 1px #73f3ff25, 0 0 2px #b8fff785, 0 0 8px #1f7d3825;
    transition: all 0.3s ease-in-out;
  }

  div:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    opacity: 0.7;
    transition: all 0.5s ease-in-out;
    transition-delay: 0.2s;
  }

  &:hover div:last-child {
    opacity: 1;
  }
}

@media (prefers-color-scheme: light) {
  .topbar {
    background-color: #f8f9fa;
    border: 1px solid rgb(226, 232, 240);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: #e6e6e6ac;
      border: 1px solid #525252;
    }
  }
}
</style>
