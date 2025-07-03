import { getSportsDbApi } from "@/api/sports-db/sports-db-api.ts";

export interface League {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate: string
}

export interface SearchAllSeasonsRequest {
  /** The league ID to search for seasons */
  id: string
  badge?: number
  poster?: number
}
export interface Season {
  strSeason: string
  strPoster?: string | null
  strBadge?: string | null
}
export interface SearchAllSeasonsResponse {
  seasons: Season[] | null
}

export const searchAllSeasons = async (params: SearchAllSeasonsRequest) => {
  const api = getSportsDbApi();
  return await api.get<SearchAllSeasonsResponse, SearchAllSeasonsRequest>("/search_all_seasons.php", {
    params,
  });
};
