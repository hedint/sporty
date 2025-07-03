import type { League, Season } from "@/api/sports-db";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { FetchError } from "@/api/common/fetch-wrapper.ts";
import { getAllLeagues, searchAllSeasons } from "@/api/sports-db";
import { dataCache } from "@/utils/cache/data-cache.ts";

const DEFAULT_ERROR_CODE = 500;
const DEFAULT_CACHE_DURATION = 5 * 60; // 5 minutes
interface LocalLeague extends League {}
export const useLeagueStore = defineStore("counter", () => {
  const leagueList = ref<LocalLeague[]>([]);
  const leagueMap = computed<Record<string, LocalLeague>>(() => {
    return leagueList.value.reduce((map, league) => {
      map[league.idLeague] = league;
      return map;
    }, {} as Record<string, LocalLeague>);
  });
  const requestErrorCode = ref<number | null>(null);
  const isInited = ref(false);

  const handleRequestError = (error: unknown | FetchError) => {
    if (error instanceof FetchError) {
      requestErrorCode.value = error.status;
    } else {
      requestErrorCode.value = DEFAULT_ERROR_CODE;
    }
  };

  const getLeagues = async (forceRefresh = false) => {
    const cacheKey = "leagues";
    if (!forceRefresh && dataCache.check(cacheKey)) {
      leagueList.value = dataCache.get<LocalLeague[]>(cacheKey) || [];
      return;
    }
    try {
      const response = await getAllLeagues();
      leagueList.value = response.leagues;
      // It makes no sense to cache an empty list, so we only cache if we have leagues.
      if (leagueList.value && leagueList.value.length > 0) {
        dataCache.set<LocalLeague[]>(cacheKey, response.leagues, DEFAULT_CACHE_DURATION);
      }
    } catch (error) {
      handleRequestError(error);
    }
  };
  const getLeagueBadge = async (leagueId: string, forceRefresh = false): Promise<string> => {
    const league = leagueMap.value[leagueId];
    if (!league) {
      return "";
    }
    const cacheKey = `badge-${leagueId}`;
    if (!forceRefresh && dataCache.check(cacheKey)) {
      return dataCache.get<string>(cacheKey) || "";
    }
    try {
      const response = await searchAllSeasons({ badge: 1, id: leagueId });
      if (!response.seasons || !Array.isArray(response.seasons) || response.seasons.length === 0) {
        return "";
      }
      let badge = "";
      for (let i = response.seasons.length - 1; i >= 0; i--) {
        const season = response.seasons[i] as Season;
        if (season.strBadge) {
          badge = season.strBadge;
          break;
        }
      }
      if (badge) {
        dataCache.set<string>(cacheKey, badge, DEFAULT_CACHE_DURATION);
      }
      return badge;
    } catch (error) {
      handleRequestError(error);
    }
    return "";
  };
  const init = async () => {
    if (isInited.value) {
      return;
    }
    await getLeagues();
    isInited.value = true;
  };
  return {
    getLeagues,
    requestErrorCode,
    leagueList,
    leagueMap,
    getLeagueBadge,
    init,
    isInited,
  };
});
