<template>
  <div class="league-board">
    <Panel>
      <template #header>
        <h2><I18nText path="league.header" /></h2>
      </template>
      <div class="league-board__content">
        <div class="league-board-toolbar">
          <Toolbar>
            <template #start>
              <div class="league-board-toolbar__content">
                <IconField>
                  <InputIcon class="pi pi-search" />
                  <InputText v-model="leagueSearchQuery" :placeholder="$t('league.toolbar.search_placeholder')" />
                </IconField>
                <Select v-model="sportCategory" show-clear :options="sportCategories" :placeholder="$t('league.toolbar.category_placeholder')" />
              </div>
            </template>
          </Toolbar>
        </div>
        <div class="league-board__list">
          <Error v-if="requestErrorCode" :error-code="requestErrorCode" />
          <ProgressSpinner v-if="isSpinnerShown" aria-label="Loading" />
          <template v-else>
            <LeagueList v-if="shownLeagueList.length" :league-list="shownLeagueList" @pick-league="onPickLeague" />
            <LeagueListEmpty v-else @clear-filters="onClearFilters" />
          </template>
        </div>
      </div>
      <LeagueBadgePopup :badge-url="activeBadge" @close="onBadgePopupClose" />
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";

import Panel from "primevue/panel";
import ProgressSpinner from "primevue/progressspinner";
import Select from "primevue/select";
import Toolbar from "primevue/toolbar";
import { computed, onBeforeMount, ref } from "vue";
import Error from "@/components/common/error/vue/Error.vue";
import I18nText from "@/components/common/i18n/I18nText.vue";
import LeagueBadgePopup from "@/components/league-badge/vue/LeagueBadgePopup.vue";
import LeagueList from "@/components/league-list/vue/LeagueList.vue";
import LeagueListEmpty from "@/components/league-list/vue/LeagueListEmpty.vue";
import { useLeagueStore } from "@/stores/league.ts";

const leagueStore = useLeagueStore();
const { leagueList, requestErrorCode, isInited } = storeToRefs(leagueStore);

const isLoading = ref(true);
const isSpinnerShown = computed(() => {
  return isLoading.value || !isInited.value;
});

const sportCategory = ref<null | string>();
const leagueSearchQuery = ref("");

const sportCategories = computed(() => {
  return Array.from(new Set(leagueList.value.map(league => league.strSport)));
});

const shownLeagueList = computed(() => {
  let filteredLeagues = leagueList.value;
  if (leagueSearchQuery.value) {
    filteredLeagues = filteredLeagues.filter(league =>
      league.strLeague.toLowerCase().includes(leagueSearchQuery.value.toLowerCase()),
    );
  }
  if (sportCategory.value) {
    filteredLeagues = filteredLeagues.filter(league => league.strSport === sportCategory.value);
  }
  return filteredLeagues;
});

const activeBadge = ref<string | null>(null);
const onBadgePopupClose = () => {
  activeBadge.value = null;
};
const onPickLeague = async (leagueId: string) => {
  activeBadge.value = await leagueStore.getLeagueBadge(leagueId);
};
const onClearFilters = () => {
  sportCategory.value = null;
  leagueSearchQuery.value = "";
};
onBeforeMount(async () => {
  isLoading.value = true;
  await leagueStore.init();
  isLoading.value = false;
});
</script>

<style scoped lang="scss">
@use "../styles/league-board";
</style>
