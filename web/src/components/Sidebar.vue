<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const items = ref([
  { label: "Chat", icon: "pi pi-comments" },
  {
    label: "Language",
    icon: "pi pi-language",
    command: () => {
      router.push("/login");
    },
  },
  {
    label: "Homework",
    icon: "pi pi-book",
    command: () => {
      router.push("/");
    },
  },
  { label: "Setting", icon: "pi pi-search", class: "bottom" },
]);
</script>
<template>
  <div class="card flex justify-center">
    <Menu :model="items">
      <!-- <template #end>
        <button
          v-ripple
          class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200"
        >
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            class="mr-2"
            shape="circle"
          />
          <span class="inline-flex flex-col items-start">
            <span class="font-bold">Amy Elsner</span>
            <span class="text-sm">Admin</span>
          </span>
        </button>
      </template> -->
    </Menu>
  </div>
</template>

<style scoped lang="scss">
.card {
  max-width: 300px;
  height: 100%;

  :deep(.p-menu) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .p-menu-list {
      height: 100%;

      .bottom {
        margin-top: auto;
      }
    }
  }
}
</style>
