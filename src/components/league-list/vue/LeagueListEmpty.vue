<template>
  <Panel class="league-list-empty">
    <template #header>
      <h3 class="league-list-empty__title">
        <I18nText path="league.empty.title" />
      </h3>
    </template>
    <div class="league-list-empty__content">
      <p class="league-list-empty__description">
        <I18nText path="league.empty.description" />
      </p>
      <Button @click="emit('clearFilters')">
        <I18nText path="league.empty.button" />
      </Button>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Panel from "primevue/panel";

import I18nText from "@/components/common/i18n/I18nText.vue";

const emit = defineEmits<{
  (e: "clearFilters"): void
}>();
</script>
