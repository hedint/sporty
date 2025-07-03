import { getSportsDbApi } from "@/api/sports-db/sports-db-api.ts";

export interface League {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate: string
}
export interface GetAllLeaguesResponse {
  leagues: League[]
}

export const getAllLeagues = async () => {
  const api = getSportsDbApi();
  return await api.get<GetAllLeaguesResponse>("/all_leagues.php");
};
