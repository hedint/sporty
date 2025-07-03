<template>
  <div class="league-list">
    <LeagueListItem
      v-for="league in leagueList"
      :key="league.idLeague"
      :league="league" @click="onLeagueClick"
    />
  </div>
</template>

<script setup lang="ts">
import type { LeagueListProps } from "../types/league-list.ts";
import LeagueListItem from "./LeagueListItem.vue";

defineProps<LeagueListProps>();
const emit = defineEmits<{
  (e: "pickLeague", leagueId: string): void
}>();
const onLeagueClick = (leagueId: string) => {
  emit("pickLeague", leagueId);
};
</script>

<style lang="scss" scoped>
@use "../styles/league-list";
</style>
