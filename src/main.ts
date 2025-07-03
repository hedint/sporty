import Material from "@primeuix/themes/material";

import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n/i18n";

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Material,
  },
});

app.mount("#app");
