<template>
  <Message severity="error">
    <I18nText :path="textKey" />
  </Message>
</template>

<script setup lang="ts">
import type { ErrorProps } from "../types/error";
import Message from "primevue/message";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import I18nText from "@/components/common/i18n/I18nText.vue";

const props = withDefaults(defineProps<ErrorProps>(), {
  errorCode: "default",
});

const { te } = useI18n();
const textKey = computed(() => {
  if (te(`errors.${props.errorCode}`)) {
    return `errors.${props.errorCode}`;
  }
  return "errors.default";
});
</script>
