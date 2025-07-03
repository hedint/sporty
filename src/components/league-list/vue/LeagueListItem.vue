<template>
  <Card class="league-list-item" @click="emit('click', league.idLeague)">
    <template #header>
      <Tag
        v-if="league.strSport"
        :value="league.strSport"
        severity="info"
      />
    </template>
    <template #title>
      {{ league.strLeague }}
    </template>
    <template #subtitle>
      {{ league.strLeagueAlternate }}
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { LeagueListItemProps } from "../types/league-list-item.ts";
import Card from "primevue/card";
import Tag from "primevue/tag";

defineProps<LeagueListItemProps>();
// Though we are able to show a badge for the league right here,
// it's always a good idea to keep the component flexible for future enhancements.
const emit = defineEmits<{
  (e: "click", leagueId: string): void
}>();
</script>

<style lang="scss" scoped>
@use "../styles/league-list-item";
</style>
