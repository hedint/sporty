<template>
  <div class="league-badge-popup">
    <Dialog :visible="isBadgePopupShown" modal :dismissable-mask="true" @update:visible="emit('close')">
      <template #header>
        <h3><I18nText path="league.badge.title" /></h3>
      </template>
      <div class="league-badge-popup__content">
        <div v-if="badgeUrl" class="league-badge-popup__img-wrapper">
          <ProgressSpinner v-if="!isImageLoaded" class="league-badge-popup__spinner" />
          <img
            v-show="isImageLoaded"
            :src="badgeUrl"
            alt="League Badge"
            class="league-badge-popup__img"
            @load="isImageLoaded = true"
            @error="isImageLoaded = false"
          >
        </div>
        <div v-else class="league-badge-popup__empty">
          <I18nText path="league.badge.empty" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import type { LeagueBadgePopupProps } from "../types/league-badge-popup.ts";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";
import { computed, ref, watch } from "vue";
import I18nText from "@/components/common/i18n/I18nText.vue";

const props = withDefaults(defineProps<LeagueBadgePopupProps>(), {
  badgeUrl: null,
});
const emit = defineEmits<{
  (e: "close"): void
}>();
const isBadgePopupShown = computed(() => {
  return props.badgeUrl !== null;
});
const isImageLoaded = ref(false);
watch(() => props.badgeUrl, () => {
  isImageLoaded.value = false;
});
</script>

<style lang="scss" scoped>
@use "../styles/league-badge-popup";
</style>
