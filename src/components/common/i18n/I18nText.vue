<template>
  <span :data-phrase-key="path" v-html="translation" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

interface I18nTextProps {
  path: string
  options?: Record<string, string>
}

const props = defineProps<I18nTextProps>();

const { t } = useI18n();

const translation = computed(() => {
  return props.options ? t(props.path, props.options) : t(props.path);
});
</script>
