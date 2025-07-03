import type { GetAllLeaguesResponse, League } from "@/api/sports-db/methods/get-all-leagues.ts";
import type { SearchAllSeasonsResponse, Season } from "@/api/sports-db/methods/search-all-seasons.ts";
import { getAllLeagues } from "@/api/sports-db/methods/get-all-leagues.ts";
import { searchAllSeasons } from "@/api/sports-db/methods/search-all-seasons.ts";

export {
  getAllLeagues,
  type GetAllLeaguesResponse,
  type League,
  searchAllSeasons,
  type SearchAllSeasonsResponse,
  type Season,
};
