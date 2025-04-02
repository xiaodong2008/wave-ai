import "./style.scss";
import "primeicons/primeicons.css";

import App from "./App.vue";
import Aura from "@primeuix/themes/aura";
import Button from "primevue/button";
import { Card } from "primevue";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import PrimeVue from "primevue/config";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import { createApp } from "vue";
import { definePreset } from "@primeuix/themes";
import router from "./router";

const WavePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{sky.50}",
      100: "{sky.100}",
      200: "{sky.200}",
      300: "{sky.300}",
      400: "{sky.400}",
      500: "{sky.500}",
      600: "{sky.600}",
      700: "{sky.700}",
      800: "{sky.800}",
      900: "{sky.900}",
      950: "{sky.950}",
    },
  },
});

const app = createApp(App);
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: WavePreset,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});
app.use(ToastService);
app.use(router);
app.component("Button", Button);
app.component("Card", Card);
app.component("InputText", InputText);
app.component("Toast", Toast);
app.component("Menu", Menu);
app.mount("#app");
